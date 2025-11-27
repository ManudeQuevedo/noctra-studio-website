import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

export const maxDuration = 30;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { prompt, system } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction: system || "You are a helpful assistant."
    });

    const result = await model.generateContentStream(prompt);
    const stream = GoogleGenerativeAIStream(result);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('AI Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500 });
  }
}
