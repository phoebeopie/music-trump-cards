require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API endpoint to analyze songs
app.post('/api/analyze-song', async (req, res) => {
    const { songTitle, artistName } = req.body;

    if (!songTitle || !artistName) {
        return res.status(400).json({ error: 'Song title and artist name are required' });
    }

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                messages: [{
                    role: 'user',
                    content: `Analyze the song "${songTitle}" by ${artistName} and provide the following information in JSON format:

{
  "mood": ["adjective1", "adjective2", "adjective3"],
  "danceability": <number 0-100>,
  "energy": <number 0-100>,
  "dynamics": "<one sentence describing dynamics>",
  "rhythm": "<one sentence describing rhythm>"
}

The mood should be 3 adjectives that describe the overall feeling of the song.
Danceability and energy should be ratings from 0-100.
Use these definitions:
- Dynamics: the degrees of loudness or softness in music and the variation of volume within a performance
- Rhythm: the patterned arrangement of sounds and silences in time, characterized by the duration and accentuation of musical notes

Only respond with valid JSON, no other text.`
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message || 'API Error');
        }

        // Extract the JSON from Claude's response
        let analysisText = data.content[0].text;
        
        // Remove markdown code blocks if present
        analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        const analysis = JSON.parse(analysisText.trim());

        res.json(analysis);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to analyze song'
        });
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
