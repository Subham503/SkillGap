import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('resume')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let resumeText = ''

    if (file.type === 'application/pdf') {
      try {
        const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default
        const data = await pdfParse(buffer)
        resumeText = data.text
      } catch {
        resumeText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ')
      }
    } else {
      const mammoth = (await import('mammoth')).default
      const result = await mammoth.extractRawText({ buffer })
      resumeText = result.value
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Could not extract text from file' },
        { status: 400 }
      )
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content: `You are an expert ATS resume analyzer.
Analyze the resume and return ONLY a valid JSON object.
No markdown, no backticks, no extra text. Just raw JSON.

Use this exact structure:
{
  "atsScore": <0-100>,
  "skills": ["skill1", "skill2"],
  "certifications": ["cert1"],
  "education": {
    "degree": "degree name",
    "school": "school name",
    "year": "year",
    "gpa": "gpa or empty string"
  },
  "experience": [
    {
      "title": "job title",
      "company": "company",
      "duration": "duration",
      "bullets": ["bullet1", "bullet2"]
    }
  ],
  "suggestions": [
    {
      "type": "Missing Skill",
      "icon": "🎯",
      "text": "specific suggestion",
      "points": 8
    }
  ],
  "careerMatches": [
    {
      "career": "career name",
      "match": 85,
      "missing": ["skill1", "skill2"]
    }
  ]
}

ATS Score:
- Keywords/skills: 25pts
- Formatting: 20pts
- Contact info: 15pts
- Skills section: 15pts
- Quantified achievements: 15pts
- Certifications: 10pts

Give exactly 5 suggestions and 4 career matches.
Return ONLY the JSON.`
        },
        {
          role: 'user',
          content: `Analyze this resume:\n\n${resumeText.slice(0, 4000)}`
        }
      ]
    })

    const responseText = completion.choices[0].message.content
    const clean = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const analysis = JSON.parse(clean)
    return NextResponse.json(analysis)

  } catch (error) {
    console.error('Resume error:', error)
    return NextResponse.json(
      { error: 'Analysis failed: ' + error.message },
      { status: 500 }
    )
  }
}