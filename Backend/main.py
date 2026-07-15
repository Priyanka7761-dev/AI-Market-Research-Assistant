import time
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

## Executive Summary

Write a concise executive summary (150–200 words) highlighting the key findings, market outlook, major competitors, opportunities, and recommendations.

## Market Overview

## Key Trends

## Market Size

## Top Competitors

## Opportunities

## Challenges

## AI Recommendations

Provide useful and realistic business insights.
"""

    try:
        response = None

        for attempt in range(2):
            try:
                response = model.generate_content(prompt)
                break

            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {e}")

                if attempt == 0:
                    print("Retrying in 3 seconds...")
                    time.sleep(3)
                else:
                    raise

        return {
            "success": True,
            "topic": topic,
            "report": response.text
        }

    except Exception as e:

        error_message = str(e)

    if "429" in error_message or "ResourceExhausted" in error_message:
        user_message = "⚠️ AI service is currently busy. Please try again in a minute."

    elif "timeout" in error_message.lower():
        user_message = "⏳ Request timed out. Please try again."

    elif "connection" in error_message.lower():
        user_message = "🌐 Network connection problem. Please check your internet."

    else:
        user_message = "⚠️ Unable to generate the report. Please try again later."

    return {
        "success": False,
        "topic": topic,
        "report": "",
        "message": user_message,
        "error": error_message
    }

@app.get("/models")
def list_models():
    models = []

    for m in genai.list_models():
        models.append(m.name)

    return {
        "models": models
    }