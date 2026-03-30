import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app

client = TestClient(app)

def test_root_endpoint():
    """Verify the API status endpoint is online."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "online", "message": "AI SEO Content Generator API is running."}

@patch("main.model.generate_content")
def test_generate_content_success(mock_generate):
    """Test successful content generation with a mocked Gemini response."""
    # Mock the Gemini response object
    mock_response = MagicMock()
    mock_response.text = "# Mocked Blog Post\nThis is a test post about Python."
    mock_generate.return_value = mock_response

    payload = {
        "keyword": "Python Automation",
        "tone": "professional",
        "length": 500
    }
    
    response = client.post("/generate", json=payload)
    
    assert response.status_code == 200
    data = response.json()
    assert data["keyword"] == "Python Automation"
    assert "Mocked Blog Post" in data["content"]
    assert data["metadata"]["tone"] == "professional"

def test_generate_content_invalid_payload():
    """Test the API's response to an invalid payload."""
    response = client.post("/generate", json={"invalid": "data"})
    assert response.status_code == 422  # Unprocessable Entity
