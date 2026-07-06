from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Gemini Model
model = genai.GenerativeModel("gemini-2.5-flash")

# FastAPI App
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Market Research Assistant API is Running 🚀"
    }


@app.get("/test")
def test():
    return {
        "status": "Backend Connected Successfully"
    }


@app.get("/generate-report")
def generate_report(topic: str):

    prompt = f"""
You are a professional Market Research Analyst.

Generate a detailed market research report on:

{topic}

Return ONLY valid GitHub Markdown.

Rules:
- Do NOT use fake dates.
- Do NOT write "Prepared For".
- Do NOT use decorative separators like ---.
- Use Markdown headings properly.
- Use bullet points where appropriate.
- Use concise and professional language.
- Do not mention that you are an AI.

Format:

# {topic} Market Research Report

## Market Overview

## Key Trends

## Market Size

## Top Competitors

## Opportunities

## Challenges

## AI Recommendations

Provide useful and realistic business insights.
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

    return {
        "models": models
    }