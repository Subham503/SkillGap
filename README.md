# ⚡ Skill Gap — AI Career Intelligence Platform

> Discover your skill gaps, get career matches, and land your dream role with GPT-4o guidance.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)
![GPT-4o](https://img.shields.io/badge/GPT--4o-Powered-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Problem Statement

75% of resumes never reach a human recruiter due to ATS rejection.
Students graduate without knowing which skills they're missing for
their dream career. There is no single platform that combines skill
assessment, career matching, resume analysis, and AI coaching.

**Skill Gap solves all of this in one place.**

---

## ✨ Features

### 🧠 Smart Assessment
- Rate 70+ in-demand skills with proficiency levels
- 7-dimension aptitude evaluation
- 3-step guided wizard

### 🎯 Career Match Engine
- Matches against 15+ career profiles
- Weighted scoring based on skill proficiency
- Shows exact missing skills per career
- Bar chart + Radar chart visualization

### 🤖 AI Career Coach
- Powered by GPT-4o
- Personalized advice based on your results
- Quick question suggestions
- Real-time chat interface

### 📄 Resume Analyzer
- Upload PDF or DOCX
- Real AI-powered ATS scoring
- Specific improvement suggestions
- Career match from your resume

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS |
| State | Zustand |
| Charts | Recharts |
| Auth | NextAuth + Google OAuth |
| AI | GPT-4o (OpenAI) |
| Deployment | Vercel |

---
## 🗺️ Project Workflow

[![View Flowchart](https://img.shields.io/badge/Figma-View%20Flowchart-purple?logo=figma)](https://www.figma.com/board/AufRwNtpfvgFhYJqh8Zr3h/Skill-Gap-%E2%80%94-Project-Workflow?node-id=0-1&t=nvneljp2kTkZbkv6-1)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- OpenAI API Key
- Google OAuth Credentials

### Installation
```bash
# Clone the repo
git clone https://github.com/YOURNAME/skillgap.git

# Go into project
cd skillgap/skillgap

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` with:
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure
```
skillgap/
├── app/
│   ├── page.jsx          # Landing page
│   ├── login/            # Google OAuth login
│   ├── dashboard/        # User dashboard
│   ├── assessment/       # 3-step assessment wizard
│   ├── results/          # Career match results + AI coach
│   ├── resume/           # Resume analyzer
│   └── api/              # Backend API routes
├── components/
│   ├── ui/               # Reusable UI components
│   └── layout/           # Navbar, Providers
├── store/
│   └── appStore.js       # Zustand global state
├── constants/
│   ├── skills.js         # 200+ skills database
│   └── careers.js        # Career profiles
└── lib/
    └── scorer.js         # Career matching algorithm
```

## 🗺 Roadmap

- [ ] Real PDF parsing with AI
- [ ] LinkedIn profile import
- [ ] Learning resource recommendations
- [ ] Progress tracking over time
- [ ] Mobile app (React Native)
- [ ] Company job matching

---

## 📄 License

MIT License — feel free to use and modify.

---

<p align="center">Built for students, by students. ⚡</p>
