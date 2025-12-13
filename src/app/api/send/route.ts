import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    console.log('[API/Send] Payload received:', { name, email, message });

    // 1. Send Confirmation to User
    const userTask = resend.emails.send({
      from: 'Noctra System <system@noctra.studio>',
      to: email,
      subject: 'Noctra / Protocol Initiated',
      react: WelcomeEmail({ name }),
    });

    // 2. Send Notification to Admin
    const adminTask = resend.emails.send({
      from: 'Noctra System <system@noctra.studio>',
      to: 'hello@noctra.studio',
      replyTo: name ? `${name} <${email}>` : email,
      subject: `Noctra / Signal Acquired: ${name || 'Unknown'}`,
      text: `
        New inquiry received via Noctra Studio.
        
        Name: ${name || 'Not provided'}
        Email: ${email}
        
        Message:
        ${message || '(No message provided)'}
      `,
    });

    console.log(`[API/Send] Dispatching emails to: User(${email}) and Admins.`);

    // Wait for both
    const [userResult, adminResult] = await Promise.all([userTask, adminTask]);

    // Debug Logging
    console.log('[API/Send] Results:', { 
        user: { id: userResult.data?.id, error: userResult.error }, 
        admin: { id: adminResult.data?.id, error: adminResult.error } 
    });

    if (userResult.error || adminResult.error) {
      console.error('[API/Send] Partial or Full Failure:', { user: userResult.error, admin: adminResult.error });
    }

    return NextResponse.json({ success: true, userResult, adminResult });
  } catch (error) {
    console.error('[API/Send] CRITICAL ERROR:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
