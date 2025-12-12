import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';

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
      console.log(`[SIMULATION] Welcome email -> User: ${email}`);
      return NextResponse.json({ 
        success: true, 
        message: 'Simulated dual-dispatch emails sent',
        devMode: true 
      });
    }

    // Prepare email payloads
    const adminEmailPayload = {
      from: fromEmail,
      to: [adminEmail],
      subject: `New Lead: ${email}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background: #000; color: #fff;">
          <h2 style="border-bottom: 1px solid #333; padding-bottom: 10px;">PROTOCOL: INBOUND_LEAD</h2>
          <p>STATUS: NEW_SUBSCRIBER</p>
          <div style="background: #111; padding: 15px; border: 1px solid #333; margin: 20px 0;">
            <p style="margin: 0; color: #888;">EMAIL_ADDRESS:</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #fff;">${email}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            TIMESTAMP: ${new Date().toISOString()}
          </p>
        </div>
      `
    };

    const userEmailPayload = {
      from: 'Noctra Studio <info@noctra.studio>', // As requested: info@noctra.studio
      to: [email],
      subject: 'Noctra / Protocol Initiated',
      react: WelcomeEmail({}),
    };

    // Execute Dual-Dispatch in Parallel
    const results = await Promise.allSettled([
      resend.emails.send(adminEmailPayload),
      resend.emails.send(userEmailPayload)
    ]);

    const [adminResult, userResult] = results;

    // Logging results
    if (adminResult.status === 'fulfilled') {
      console.log(`Admin notification sent to ${adminEmail}`, adminResult.value);
    } else {
      console.error('FAILED: Admin notification', adminResult.reason);
    }

    if (userResult.status === 'fulfilled') {
      console.log(`Welcome email sent to ${email}`, userResult.value);
    } else {
      console.error('FAILED: Welcome email', userResult.reason);
    }

    // Check for critical failure (both failed)
    if (adminResult.status === 'rejected' && userResult.status === 'rejected') {
      return NextResponse.json(
        { error: 'Failed to dispatch emails', details: { admin: adminResult.reason, user: userResult.reason } },
        { status: 500 }
      );
    }

    // Return success if at least one succeeded (optimistic)
    return NextResponse.json({
      success: true,
      results: {
        admin: adminResult.status === 'fulfilled' ? adminResult.value : { error: adminResult.reason },
        user: userResult.status === 'fulfilled' ? userResult.value : { error: userResult.reason }
      }
    });

  } catch (error) {
    console.error('UNEXPECTED ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
