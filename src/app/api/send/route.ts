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

    const adminEmail = process.env.ADMIN_EMAIL || process.env.TO_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || 'Noctra Studio <hello@noctra.studio>';

    // Validate configuration
    if (!adminEmail) {
      console.error('SERVER CONFIG ERROR: ADMIN_EMAIL or TO_EMAIL is missing in environment variables');
      return NextResponse.json(
        { error: 'Server misconfiguration: Missing admin email' },
        { status: 500 }
      );
    }

    if (!resendApiKey) {
      console.warn('DEV MODE: Simulating email send (RESEND_API_KEY missing)');
      console.log(`[SIMULATION] New subscriber: ${email} -> Admin: ${adminEmail}`);
      return NextResponse.json({ 
        success: true, 
        message: 'Simulated email sent',
        devMode: true 
      });
    }

    // Attempt to send email
    try {
      const data = await resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        subject: 'New Coming Soon Subscription',
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>New Subscriber!</h2>
            <p>A new user has subscribed to the coming soon list:</p>
            <p style="font-size: 18px; font-weight: bold; background: #f4f4f4; padding: 10px; border-radius: 4px;">
              ${email}
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Sent from Noctra Studio Website
            </p>
          </div>
        `
      });

      console.log(`Email sent successfully to ${adminEmail}`, data);
      return NextResponse.json(data);
    } catch (sendError) {
      console.error('RESEND API ERROR:', sendError);
      return NextResponse.json(
        { error: 'Failed to send email via Resend provider', details: sendError },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('UNEXPECTED ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
