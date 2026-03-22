import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  try {
    const { message, context } = await req.json()

    const systemPrompt = context.mode === 'skill-analysis'
      ? `You are an expert AI career advisor for students.
The user has these skills: ${context.skills?.join(', ')}.

Analyze their skills and respond in this exact format:

🎯 Top Career Matches:
- [Career 1] — why it fits
- [Career 2] — why it fits
- [Career 3] — why it fits

📈 Skills to Add Next:
- [skill] — brief reason
- [skill] — brief reason

💡 Quick Tip:
[One specific actionable tip based on their skill set]

Keep it concise, specific and encouraging.`
      : `You are an expert AI career coach for students.
The user's top career match is ${context.topCareer} with ${context.score}% compatibility.
Their current skills are: ${context.skills?.map(s =>
        typeof s === 'string' ? s : `${s.name} (${s.level})`
      ).join(', ') || 'none listed'}.
Give specific, actionable, encouraging advice in 2-3 sentences.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: context.mode === 'skill-analysis' ? 500 : 300,
      messages: [
        {
          role: 'system',
          content: systemPrompt
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