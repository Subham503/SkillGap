import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req) {
    try {
        const { message, context } = await req.json()

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            max_tokens: 300,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert AI career coach for students.\nThe user's top career match is ${context.topCareer} with ${context.score}% compatibility.\nTheir current skills are: ${context.skills.join(', ') || 'none listed'}.\nGive specific, actionable, encouraging advice in 2-3 sentences.\nBe concise and practical.`
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        })

        return new Response(
            JSON.stringify({
                reply: completion.choices[0].message.content
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({
                reply: 'Sorry, AI coach is unavailable right now. Please try again.'
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        )
    }
}
