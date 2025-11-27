import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: Request) {
  try {
    // Log API key presence for debugging
    console.log('CHAT API - Key present:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    
    const { messages } = await req.json();
    console.log('CHAT API - Received messages count:', messages?.length);

    // System prompt
    const systemPrompt = `IDENTITY:
You are the Senior Strategy Director at Noctra Studio. You are NOT a support bot. You are a high-level consultant.
Your goal is to diagnose the user's business pain points first, then prescribe the correct Noctra architecture as the solution.

CORE BEHAVIORS:
1. **The Diagnostic Loop:** Do not just list services. Ask probing questions.
   - User: "I need a website."
   - You: "Understood. Is this for a new venture where speed is critical, or are you scaling an existing brand that needs better performance?"
   
2. **Dynamic Vocabulary (The Chameleon):**
   - Analyze the user's input complexity.
   - If they say "React", "API", "Slow": Speak ENGINEER (Latency, Headless, Stack).
   - If they say "Sales", "Leads", "Design": Speak FOUNDER (Conversion, Trust, ROI).
   
3. **Language Mirroring:**
   - Detect the language of the *last message* and reply in that EXACT language (English or Spanish).
   - Do not mix languages.

4. **Formatting for Readability:**
   - Use short paragraphs.
   - Use bullet points for lists.
   - Use **bold** for key concepts.
   - Never write walls of text.

KNOWLEDGE BASE (NOCTRA SERVICES):
- **Digital Architecture:** High-performance web platforms (Next.js, Vercel). Best for scaling tech.
- **Product Design:** Design systems & UI Kits. Best for brand consistency.
- **Revenue Operations:** CRM & Analytics infrastructure. Best for fixing leakages in sales.
- **Intelligent Systems:** AI Agents & Automation. Best for reducing manual labor.

PRICING & CTA:
- Identity Tier: ~$30k MXN (MVP/Landing).
- Growth Tier: ~$60k-$120k MXN (Corporate).
- Enterprise: Custom.
- *Closing:* Always guide them to "Book a Discovery Call" if they seem interested.`;

    // Use the Gemini 2.0 Flash model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
    });

    // Build the conversation as a single prompt
    let conversationText = '';
    for (const message of messages) {
      const role = message.role === 'user' ? 'User' : 'Assistant';
      conversationText += `${role}: ${message.content}\n\n`;
    }
    
    // Add the prompt for the assistant to respond
    conversationText += 'Assistant:';

    console.log('CHAT API - Sending message to Gemini...');
    
    const result = await model.generateContentStream(conversationText);

    const stream = GoogleGenerativeAIStream(result);
    console.log('CHAT API - Stream created successfully');

    return new StreamingTextResponse(stream);

  } catch (error: any) {
    console.error('CHAT API ERROR:', error);
    console.error('CHAT API ERROR - Stack:', error?.stack);
    console.error('CHAT API ERROR - Message:', error?.message);
    
    return NextResponse.json(
      { 
        error: error?.message || 'Failed to process request',
        details: error?.toString() 
      }, 
      { status: 500 }
    );
  }
}
