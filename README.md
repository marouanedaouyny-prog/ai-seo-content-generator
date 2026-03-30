# AI SEO Content Generator

A SaaS platform that automates the generation of SEO-optimized blog posts using the Gemini API.

## Features
- **Keyword-to-Article:** Generate full articles from a single keyword.
- **Tone Customization:** Professional, Conversational, or Technical tones.
- **SEO Ready:** Automatically generates H1, H2, meta descriptions, and CTAs.

## Setup

### Backend (Python)
1. Go to `backend/`
2. Install dependencies: `pip install fastapi uvicorn google-generativeai python-dotenv`
3. Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.
4. Run the server: `python main.py`

### Frontend (Next.js)
1. Go to `frontend/`
2. Run `npm install`
3. Run `npm run dev`

## Tech Stack
- **Backend:** Python, FastAPI, Gemini 1.5 Flash
- **Frontend:** Next.js, Tailwind CSS, Lucide React
