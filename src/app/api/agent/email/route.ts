import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const maxDuration = 30;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        {
          role: 'system',
          content: `You are the Sales Director at Noctra. Analyze this incoming lead: [Name, Company, Budget, Message].
    1. **Categorize:** (High Value, Standard, Low Budget).
    2. **Analysis:** Identify their pain points based on the text.
    3. **Draft:** Write a personalized, high-status email response.
        * If High Value: Propose a call.
        * If Low Budget: Politely suggest the 'Identity Tier' or 'Mentorship' if applicable.`,
        },
        { role: 'user', content: prompt },
      ],
    });

    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('AI Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500 });
  }
}
