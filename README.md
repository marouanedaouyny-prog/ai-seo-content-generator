# AI SEO Content Generator

A SaaS platform that automates the generation of SEO-optimized blog posts using the Gemini API.

![AI SEO Content Generator Demo](./demo.png)

## ✨ Features

- **Keyword-to-Article:** Generate full articles from a single keyword
- **Tone Customization:** Professional, Conversational, Friendly, or Technical tones
- **SEO Ready:** Automatically generates H1, H2, meta descriptions, and CTAs
- **Length Control:** Adjustable word count (100-5000 words)
- **FastAPI Backend:** High-performance API with automatic validation
- **Modern Frontend:** Built with Next.js 14, Tailwind CSS, and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Backend Setup (Python)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

6. Run the server:
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📡 API Documentation

### GET /

Health check endpoint.

**Response:**
```json
{
  "status": "online",
  "message": "AI SEO Content Generator API is running."
}
```

### POST /generate

Generate SEO-optimized blog content based on keyword and parameters.

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
  ```json
  {
    "keyword": "digital marketing",
    "tone": "professional",
    "length": 1000
  }
  ```

**Request Schema:**
```typescript
{
  keyword: string;      // 2-200 characters, target SEO keyword
  tone?: string;        // Content tone (default: "professional")
  length?: number;      // Target word count 100-5000 (default: 1000)
}
```

**Response:**
```json
{
  "keyword": "digital marketing",
  "content": "# Digital Marketing Guide\n\n## Introduction\n...",
  "metadata": {
    "tone": "professional",
    "length": 1000
  },
  "status": "success"
}
```

**Error Response:**
```json
{
  "detail": "Failed to generate content: API error message"
}
```

### Example with cURL

```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "digital marketing",
    "tone": "professional",
    "length": 1000
  }'
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Google Gemini API** - AI content generation
- **Pydantic** - Data validation with Field constraints
- **python-dotenv** - Environment variable management

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Markdown** - Markdown rendering

## 📁 Project Structure

```
ai-seo-content-generator/
├── backend/
│   ├── main.py           # FastAPI application with validation
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment variables template
├── frontend/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable React components
│   └── package.json
├── LICENSE
└── README.md
```

## 🔒 Security Notes

- API key validation is performed on startup
- Input validation with Pydantic Field constraints
- Keyword length: 2-200 characters
- Content length: 100-5000 words
- CORS is restricted to specific origins in production
- Proper error handling without exposing internal details

## 🎯 Use Cases

- **Content Marketing Agencies:** Generate blog posts at scale
- **SEO Specialists:** Create optimized content for clients
- **E-commerce:** Generate product descriptions
- **Social Media Managers:** Create engaging posts
- **Freelance Writers:** Overcome writer's block

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Google Gemini API](https://ai.google.dev/)
- UI components from [Lucide Icons](https://lucide.dev/)
