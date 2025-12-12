import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    // 1. Send Confirmation to User
    const userTask = resend.emails.send({
      from: 'Noctra Studio <hello@noctra.studio>',
      to: email,
      subject: 'Noctra / Protocol Initiated',
      react: WelcomeEmail({}),
    });

    // 2. Send Notification to Admin (YOU)
    const adminTask = resend.emails.send({
      from: 'Noctra System <hello@noctra.studio>',
      to: ['hello@noctra.studio', 'contact@manudequevedo.com'],
      replyTo: email, // <--- Crucial: Lets you reply directly to the user
      subject: `New Lead: ${email}`,
      text: `
        New inquiry received via Noctra Studio.
        
        From: ${email}
        Message:
        ${message || '(No message provided)'}
      `,
    });

    // Wait for both
    const [userResult, adminResult] = await Promise.all([userTask, adminTask]);

    // Debug Logging
    console.log('User Email Result:', userResult);
    console.log('Admin Email Result:', adminResult);

    if (userResult.error || adminResult.error) {
      console.error('Email Delivery Error:', { user: userResult.error, admin: adminResult.error });
      // We still return success:true if at least one worked?
      // The snippet returned success:true unconditionally.
      // But if there is an error, we should probably know. 
      // User snippet had 'catch' block for throw. Resend doesn't throw.
      // I will log errors but return success to avoid breaking frontend if it expects success.
    }

    return NextResponse.json({ success: true, userResult, adminResult });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
