import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req) {
    try {
        const formData = await req.formData()
        const file = formData.get('resume')

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Extract text based on file type
        let resumeText = ''

        if (file.type === 'application/pdf') {
            const pdfParse = (await import('pdf-parse')).default
            const data = await pdfParse(buffer)
            resumeText = data.text
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const mammoth = (await import('mammoth')).default
            const result = await mammoth.extractRawText({ buffer })
            resumeText = result.value
        } else {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
        }

        if (!resumeText || resumeText.trim().length < 50) {
            return NextResponse.json({ error: 'Could not extract text from file' }, { status: 400 })
        }

        // Send to GPT-4o for analysis
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            max_tokens: 2000,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert ATS resume analyzer and career coach.
Analyze the resume and return ONLY a valid JSON object with this exact structure:
{
  "atsScore": <number 0-100>,
  "skills": [<array of skills found>],
  "certifications": [<array of certifications>],
  "education": {
    "degree": "<degree name>",
    "school": "<school name>",
    "year": "<graduation year>",
    "gpa": "<gpa if mentioned>"
  },
  "experience": [
    {
      "title": "<job title>",
      "company": "<company name>",
      "duration": "<duration>",
      "bullets": [<array of bullet points>]
    }
  ],
  "suggestions": [
    {
      "type": "<Missing Skill|Weak Bullet|Formatting|Achievement>",
      "icon": "<relevant emoji>",
      "text": "<specific actionable suggestion>",
      "points": <number 1-10>
    }
  ],
  "careerMatches": [
    {
      "career": "<career name>",
      "match": <number 0-100>,
      "missing": [<array of missing skills>]
    }
  ]
}

ATS Score calculation:
- Keywords and skills present: 25 points
- Formatting and structure: 20 points  
- Contact information complete: 15 points
- Skills section present: 15 points
- Quantified achievements: 15 points
- Certifications: 10 points

Provide exactly 5 suggestions and 4 career matches.
Return ONLY the JSON, no other text.`
                },
                {
                    role: 'user',
                    content: `Analyze this resume:\n\n${resumeText.slice(0, 4000)}`
                }
            ]
        })

        const responseText = completion.choices[0].message.content
        const clean = responseText.replace(/```json|```/g, '').trim()
        const analysis = JSON.parse(clean)

        return NextResponse.json(analysis)

    } catch (error) {
        console.error('Resume analysis error:', error)
        return NextResponse.json(
            { error: 'Analysis failed. Please try again.' },
            { status: 500 }
        )
    }
}