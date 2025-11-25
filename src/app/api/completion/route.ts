import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt, system } = await req.json();

  const result = await streamText({
    model: google('models/gemini-1.5-flash'),
    system: system || "You are a helpful assistant.",
    prompt: prompt,
  });

  return result.toTextStreamResponse();
}
