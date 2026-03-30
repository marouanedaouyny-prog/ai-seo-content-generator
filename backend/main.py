from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI SEO Content Generator API")

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

class ContentRequest(BaseModel):
    keyword: str
    tone: str = "professional"
    length: int = 1000

@app.get("/")
async def root():
    return {"status": "online", "message": "AI SEO Content Generator API is running."}

@app.post("/generate")
async def generate_content(request: ContentRequest):
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
    
    try:
        response = model.generate_content(prompt)
        return {
            "keyword": request.keyword,
            "content": response.text,
            "metadata": {
                "tone": request.tone,
                "length": request.length
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
