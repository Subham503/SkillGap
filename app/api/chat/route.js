import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  try {
    const { message, context } = await req.json()

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: `You are an expert AI career coach for students.
The user's top career match is ${context.topCareer} with ${context.score}% compatibility.
Their current skills are: ${context.skills?.map(s =>
  typeof s === 'string' ? s : `${s.name} (${s.level})`
).join(', ') || 'none listed'}.
Give specific, actionable, encouraging advice in 2-3 sentences.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    })

    return Response.json({
      reply: completion.choices[0].message.content
    })

  } catch (error) {
    console.error('Chat error:', error)
    return Response.json({
      reply: 'Sorry, AI coach is unavailable. Please try again.'
    }, { status: 500 })
  }
}
```

---

## For Resume — Use Gemini Just for PDF

Groq doesn't support file uploads. So we use a **hybrid approach:**
```
