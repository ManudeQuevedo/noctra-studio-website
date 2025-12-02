import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // If no API key is present, simulate success (for dev/demo purposes if key is missing)
    if (!process.env.RESEND_API_KEY) {
      console.log('Simulating email send to:', email);
      return NextResponse.json({ success: true, message: 'Simulated email sent' });
    }

    const data = await resend.emails.send({
      from: 'Noctra Studio <onboarding@resend.dev>', // Update this with your verified domain
      to: ['delivered@resend.dev'], // For testing, or the actual destination
      subject: 'New Coming Soon Subscription',
      html: `<p>New subscriber: <strong>${email}</strong></p>`
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
