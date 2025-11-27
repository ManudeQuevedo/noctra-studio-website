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
          content: `Generate a project scope outline based on these requirements: [Client Inputs].
    Structure it into Noctra's 4 Phases: Discovery, Architecture, Build, Launch.
    Include a 'Technical Stack' recommendation based on their needs (e.g., if E-comm -> Recommend Shopify Headless).`,
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
