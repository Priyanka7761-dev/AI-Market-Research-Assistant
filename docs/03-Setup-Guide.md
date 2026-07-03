# 📄 Project Setup Guide

**Project Name:** AI Market Research Assistant

**Current Version:** v1.0.0

**Author:** Priyanka Kumari

**Last Updated:** 03 July 2026

---

# 🎯 Purpose

This document explains how to set up and run the project on a new machine.

---

# 🖥️ System Requirements

- Windows 10/11
- Python 3.11+
- Node.js 20+
- npm
- Git
- VS Code

---

# 📥 Clone Repository

```bash
git clone https://github.com/Priyanka7761-dev/AI-Market-Research-Assistant.git
```

Move into project

```bash
cd AI-Market-Research-Assistant
```

---

# ⚙️ Backend Setup

Move into backend folder

```bash
cd Backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment (Windows)

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install fastapi uvicorn python-dotenv google-generativeai
```

Create `.env`

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run Backend

```bash
uvicorn main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

---

# 🌐 Frontend Setup

Move into frontend

```bash
cd ../Frontend
```

Install packages

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 🔍 Test APIs

Home

```
GET /
```

Test

```
GET /test
```

Generate Report

```
GET /generate-report?topic=Electric Vehicles in India
```

Models

```
GET /models
```

---

# 📦 Project Dependencies

## Backend

- fastapi
- uvicorn
- google-generativeai
- python-dotenv

## Frontend

- react
- axios
- react-markdown

---

# 🐞 Common Errors & Solutions

## Backend not starting

- Check virtual environment
- Verify Python installation

---

## API Key Error

- Verify `.env` file
- Check Gemini API key

---

## Frontend not loading

- Run `npm install`
- Check Node.js version

---

## CORS Error

- Verify FastAPI CORS configuration

---

# 🚀 Future Improvements

- Docker Support
- One-click Setup
- Deployment Guide

---

# 🎤 Interview Questions

1. How do you configure environment variables?

2. Why use a virtual environment?

3. Why is `.env` ignored in Git?

4. Why should `node_modules` not be uploaded?

5. Explain the project setup process.

---

# 📚 Learning Outcomes

- Virtual Environment
- Package Management
- Dependency Installation
- Environment Variables
- Project Configuration

---

# 📄 Document History

| Version | Description | Author |
|---------|-------------|--------|
| v1.0.0 | Initial setup guide created | Priyanka Kumari |