import { google } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Chat API Request Body:", JSON.stringify(body, null, 2));
    const { messages } = body;
    console.log("Chat API Messages:", JSON.stringify(messages, null, 2));

    if (!Array.isArray(messages)) {
      throw new Error("Messages must be an array");
    }

    const result = await streamText({
      model: google("gemini-2.0-flash"),
      system: `IDENTITY:
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
- *Closing:* Always guide them to "Book a Discovery Call" if they seem interested.`,
      messages: messages,
    });

    // Get the text stream response
    const textResponse = result.toTextStreamResponse();
    
    // Transform the text stream to data stream format
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        // Decode the chunk
        const text = decoder.decode(chunk, { stream: true });
        if (text) {
          // Escape special characters for JSON string (but don't add outer quotes)
          const escaped = text
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
          // Format as data stream: 0:"chunk"\n
          const formatted = `0:"${escaped}"\n`;
          controller.enqueue(encoder.encode(formatted));
        }
      },
      flush(controller) {
        // Send finish message to signal stream completion
        // Format: d:{"finishReason":"stop"}\n
        const finishMessage = 'd:{"finishReason":"stop"}\n';
        controller.enqueue(encoder.encode(finishMessage));
      }
    });
    
    // Pipe the response body through the transform
    const transformedBody = textResponse.body?.pipeThrough(transformStream);
    
    return new Response(transformedBody, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      }
    });
  } catch (error: any) {
    console.error("CHAT API ERROR:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to process request" }),
      { status: 500 }
    );
  }
}
