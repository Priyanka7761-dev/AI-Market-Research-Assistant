from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Market Research Assistant API"}

@app.get("/test")
def test():
    return {"status": "Backend Connected Successfully"}

@app.get("/generate-report")
def generate_report(topic: str):

    prompt = f"""
    Create a market research report on {topic}.

    Include:
    1. Market Overview
    2. Key Trends
    3. Top Competitors
    4. Opportunities
    5. Challenges

    Keep the report concise and professional.
    """

    response = model.generate_content(prompt)

    return {
        "topic": topic,
        "report": response.text
    }

@app.get("/models")
def list_models():
    models = []

    for m in genai.list_models():
        models.append(m.name)

    return {"models": models}