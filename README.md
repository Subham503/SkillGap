# ⚡ Skill Gap — AI Career Intelligence Platform

> Discover your skill gaps, get career matches, and land your dream role with AI guidance.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)
![Groq](https://img.shields.io/badge/Groq-LLaMA3.3-orange)
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
- Rate 200+ in-demand skills with proficiency levels (Beginner → Expert)
- 7-dimension aptitude evaluation with descriptions
- 3-step guided wizard with keyboard navigation
- ✨ AI Skill Analysis powered by Groq LLaMA 3.3 70B
- Smart warnings for insufficient skills
- Autocomplete search with 200+ skills database

### 🎯 Career Match Engine
- AI-powered matching against 15+ career profiles
- Weighted scoring based on skill proficiency levels
- Shows exact missing skills per career
- Bar chart + Radar chart visualization (Recharts)
- Fallback local scorer if AI unavailable

### 🤖 AI Career Coach
- Powered by Groq LLaMA 3.3 70B (ultra fast)
- Personalized advice based on your career results
- Quick question suggestions
- Real-time chat interface
- Accessible directly from navbar

### 📄 Resume Analyzer
- Upload PDF or DOCX (max 10MB)
- Drag and drop interface
- Real AI-powered ATS scoring (0-100)
- Skills, education, certification extraction
- 5 specific improvement suggestions with point gains
- 4 career matches based on actual resume content
- Powered by Groq LLaMA 3.3 70B + pdf-parse

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS |
| State Management | Zustand |
| Charts | Recharts (Bar + Radar) |
| Auth | NextAuth + Google OAuth |
| AI Chat | Groq LLaMA 3.3 70B |
| AI Resume | Groq LLaMA 3.3 70B |
| PDF Parsing | pdf-parse + mammoth |
| Deployment | Vercel |

---

## 🗺️ Project Workflow

[![View Flowchart](https://img.shields.io/badge/Figma-View%20Flowchart-purple?logo=figma)](https://www.figma.com/board/AufRwNtpfvgFhYJqh8Zr3h/Skill-Gap-%E2%80%94-Project-Workflow?node-id=0-1&t=nvneljp2kTkZbkv6-1)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Groq API Key (free at console.groq.com)
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
GROQ_API_KEY=your_groq_api_key
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
│   ├── page.jsx              # Landing page
│   ├── login/                # Google OAuth login
│   ├── dashboard/            # User dashboard
│   ├── assessment/           # 3-step assessment wizard
│   ├── results/              # Career match results + AI coach
│   ├── resume/               # Resume analyzer
│   └── api/
│       ├── auth/             # NextAuth Google OAuth
│       ├── chat/             # Groq AI career coach + skill analysis
│       └── resume/           # Groq resume analyzer endpoint
├── components/
│   ├── ui/                   # Navbar, Providers
│   └── layout/               # Layout components
├── store/
│   └── appStore.js           # Zustand global state
├── constants/
│   ├── skills.js             # 200+ skills database
│   └── careers.js            # 15+ career profiles
└── lib/                      # Utility functions
```

---

## 🎯 User Flow
```
Landing Page
    ↓
Google Login (OAuth)
    ↓
Dashboard
    ↓
3-Step Assessment
(Academic → Skills + Proficiency → Aptitude)
    ↓
✨ AI Skill Analysis (optional, Groq)
    ↓
Career Match Results
(AI-powered + Bar Chart + Radar Chart)
    ↓
AI Career Coach Chat (Groq LLaMA)
    ↓
Resume Analyzer
(Upload → ATS Score → Suggestions → Career Match)
```

---

## 🤖 AI Features

| Feature | Model | Description |
|---------|-------|-------------|
| Skill Analysis | Groq LLaMA 3.3 70B | Analyzes skills → suggests careers |
| Career Matching | Groq LLaMA 3.3 70B | AI-powered compatibility scores |
| Career Coach | Groq LLaMA 3.3 70B | Personalized career advice chat |
| Resume Analyzer | Groq LLaMA 3.3 70B | ATS scoring + improvement tips |

---

## 👥 Team

Built with ❤️ for Hackathon 2026

| Name | Role |
|------|------|
| Subham | Full Stack + AI Integration |
| Teammate 2 | add role |
| Teammate 3 | add role |
| Teammate 4 | add role |
| Teammate 5 | add role |
| Teammate 6 | add role |

---

## 🗺 Roadmap

- [x] Smart career assessment ✅
- [x] Skill proficiency levels ✅
- [x] AI-powered career matching ✅
- [x] AI Career Coach (Groq) ✅
- [x] Real AI resume analyzer ✅
- [x] Google OAuth login ✅
- [x] AI skill analysis in assessment ✅
- [ ] Database integration
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
