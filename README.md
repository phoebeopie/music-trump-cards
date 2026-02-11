# Music Trump Cards Web App

A web application that generates "trump card" style visualizations of songs using AI analysis. Enter a song title and artist to get mood descriptors, danceability/energy scores, and detailed rhythm and dynamics descriptions.

## Features

- 🎵 AI-powered music analysis using Claude
- 🎨 Beautiful, animated trump card interface
- 📊 Danceability and energy metrics (0-100)
- 🎼 Professional dynamics and rhythm descriptions
- 📱 Fully responsive mobile design

## Prerequisites

- Node.js (v16 or higher)
- An Anthropic API key ([Get one here](https://console.anthropic.com/))

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
PORT=3000
```

### 3. Run the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

### 4. Open in Browser

Navigate to:
```
http://localhost:3000
```

## Project Structure

```
music-trump-cards/
├── server.js           # Express backend server
├── package.json        # Node.js dependencies
├── .env                # Environment variables (create this)
├── .env.example        # Environment template
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── public/
    └── index.html     # Frontend interface
```

## How It Works

1. **Frontend**: User enters song title and artist in the web interface
2. **Backend**: Node.js server receives the request and calls Claude API
3. **AI Analysis**: Claude analyzes the song and returns structured data
4. **Display**: Frontend renders a beautiful trump card with the results

## API Endpoint

### POST `/api/analyze-song`

Request body:
```json
{
  "songTitle": "Bohemian Rhapsody",
  "artistName": "Queen"
}
```

Response:
```json
{
  "mood": ["dramatic", "epic", "emotional"],
  "danceability": 45,
  "energy": 78,
  "dynamics": "Features dramatic dynamic shifts from soft piano ballad sections to powerful operatic and hard rock crescendos.",
  "rhythm": "Complex rhythmic structure with multiple tempo changes, from slow ballad to uptempo rock sections with driving beats."
}
```

## Deployment Options

### Option 1: Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variable: `ANTHROPIC_API_KEY`

### Option 2: Deploy to Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Railway will auto-detect and deploy

### Option 3: Deploy to Heroku

1. Create a new app on [Heroku](https://heroku.com)
2. Connect your GitHub repository
3. Add config var: `ANTHROPIC_API_KEY`
4. Deploy from the Heroku dashboard

### Option 4: Deploy to Vercel (Serverless)

Vercel requires a slightly different setup for serverless functions. Let me know if you want instructions for this!

## Local Testing

To test the app locally without deploying:

```bash
# Install dependencies
npm install

# Create .env file with your API key
echo "ANTHROPIC_API_KEY=your-key-here" > .env

# Start the server
npm start

# Open browser to http://localhost:3000
```

## Troubleshooting

**"Module not found" errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"API key not found" errors**
- Make sure you created a `.env` file
- Verify your API key is correct
- Restart the server after adding the API key

**Port already in use**
- Change the PORT in `.env` to a different number
- Or kill the process using port 3000:
  ```bash
  # On Mac/Linux
  lsof -ti:3000 | xargs kill
  
  # On Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

## License

MIT

## Support

If you encounter any issues, please check:
1. Node.js version is 16 or higher
2. All dependencies are installed (`npm install`)
3. `.env` file exists with valid API key
4. Port 3000 is available
