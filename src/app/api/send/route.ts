import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase Client (Service Role for Admin Access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, email, lang } = await request.json();

    console.log('[API/Send] Payload received:', { name, email, lang });

    // 0. The Gatekeeper: Check for duplicates
    const { data: existingLeads, error: searchError } = await supabase
      .from('leads')
      .select('*')
      .eq('email', email);

    if (searchError) {
      console.error('[API/Send] Database Check Failed:', searchError);
      // Proceed cautiously or fail? Let's fail safe and allow processing if db is down? 
      // User requested "If exists: return 409". If DB fails, we can't check. 
      // Let's assume critical failure and return 500 or just log and proceed. 
      // "Antigravity Protocol" suggests reliability. 
      // If db check fails, we might create duplicate emails, but better than blocking user?
      // Strict instruction: "The Gatekeeper". Let's throw detailed error to logs but maybe not block unless sure.
      // ACTUALLY, strict instruction: "If existing... return 409".
      // Let's assume if it fails we can't be sure, so we proceed or error. 
      // I will return 500 if DB check fails to be safe.
      return NextResponse.json({ error: 'Database verification failed' }, { status: 500 });
    }

    if (existingLeads && existingLeads.length > 0) {
      console.warn(`[API/Send] Duplicate Signal Detected: ${email}`);
      return NextResponse.json(
        { message: 'We already have your signal. Stand by.' },
        { status: 409 }
      );
    }

    // 0.5 Insert into DB (Recorded before email sending to prevent race conditions if possible)
    const { error: insertError } = await supabase
      .from('leads')
      .insert({ name, email, language: lang });

    if (insertError) {
       console.error('[API/Send] Database Insert Failed:', insertError);
       return NextResponse.json({ error: 'Failed to record signal' }, { status: 500 });
    }

    // 1. Send Confirmation to User
    const userTask = resend.emails.send({
      from: 'Noctra System <system@noctra.studio>',
      to: email,
      subject: lang === 'es' ? 'Noctra / Protocolo Iniciado' : 'Noctra / Protocol Initiated',
      react: WelcomeEmail({ name, lang }),
    });

    // 2. Send Notification to Admin
    const adminTask = resend.emails.send({
      from: 'Noctra System <system@noctra.studio>',
      to: 'hello@noctra.studio',
      replyTo: name ? `${name} <${email}>` : email,
      subject: `Noctra / Signal Acquired: ${name || 'Unknown'}`,
      text: `
        New Signal Received.
        
        Name: ${name || 'Not provided'}
        Email: ${email}
        Language: ${lang || 'en'}
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
