# JobJesus

An AI-powered mock interview application built for the AI2k23 Hackathon.

Live Demo: https://job-jesus.vercel.app

---

## Overview

JobJesus is a voice-based mock interview simulator powered by GPT-3.5. It asks the user 10 interview questions, listens to spoken answers via microphone, evaluates responses in real time, and provides a final grade with improvement feedback at the end of the session.

---

## How It Works

1. The AI interviewer presents a question and reads it aloud
2. The user clicks Start and speaks their answer
3. The speech is transcribed in real time
4. GPT-3.5 evaluates the answer and either asks a follow-up question or moves on
5. After 10 questions, the interviewer provides an overall grade out of 10 and specific improvement notes

---

## Features

- Voice input via Web Speech API
- Text-to-speech output so the interviewer speaks back to the user
- Dynamic cross-questioning when answers are incomplete
- Final performance review with a grade and actionable feedback
- Real-time speech transcription displayed on screen

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| AI | OpenAI GPT-3.5-turbo |
| Speech-to-Text | react-speech-recognition (Web Speech API) |
| Text-to-Speech | react-speech-kit |
| UI | PrimeReact |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 16+
- An OpenAI API key

### Installation

```bash
git clone https://github.com/sajalshlan/JobJesus.git
cd JobJesus
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Run

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Usage

1. Open the application
2. Click **Start** to activate the microphone
3. Speak your answer to the displayed question
4. Click **Stop** when done
5. Wait for the AI to respond and ask the next question
6. After 10 questions, receive your final grade and feedback

---

## Limitations

- Best supported on Google Chrome (Web Speech API compatibility)
- Interview questions are currently scoped to frontend and web development topics
- Requires an OpenAI API key
