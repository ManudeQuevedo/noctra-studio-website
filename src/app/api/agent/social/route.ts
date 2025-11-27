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
          content: `You are the Lead Editor for Noctra Studio, a high-end digital engineering firm.
    **Tone:** Precise, Architectural, Minimalist, Authoritative. No emojis (except structural ones like 🌑 🏗️).
    **Task:** I will give you a raw thought or code snippet. You will turn it into two outputs:
    1. **X (Twitter):** A short, punchy thread hook or post focused on engineering insight.
    2. **Instagram:** A sophisticated caption focusing on the 'Visual' and 'Philosophy' aspect.`,
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
