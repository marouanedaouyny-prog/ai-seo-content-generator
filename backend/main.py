from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Validate API key on startup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required. Please set it in your .env file.")

app = FastAPI(title="AI SEO Content Generator API")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

class ContentRequest(BaseModel):
    keyword: str = Field(..., min_length=2, max_length=200, description="Target SEO keyword")
    tone: str = Field(default="professional", description="Content tone (professional, casual, friendly, etc.)")
    length: int = Field(default=1000, ge=100, le=5000, description="Target word count (100-5000)")

@app.get("/")
async def root():
    return {"status": "online", "message": "AI SEO Content Generator API is running."}

@app.post("/generate")
async def generate_content(request: ContentRequest):
    """Generate SEO-optimized blog content based on keyword and parameters."""
    try:
        prompt = f"""
        Write a {request.length}-word SEO-optimized blog post for the keyword: '{request.keyword}'.
        Tone: {request.tone}
        Include:
        - An H1 title
        - Meta description
        - At least 3 H2 headers
        - Bullet points for key takeaways
        - A conclusion with a CTA
        Format the output as clean Markdown.
        """

        response = model.generate_content(prompt)
        return {
            "keyword": request.keyword,
            "content": response.text,
            "metadata": {
                "tone": request.tone,
                "length": request.length
            },
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate content: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
