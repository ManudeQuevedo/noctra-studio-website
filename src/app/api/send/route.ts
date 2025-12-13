import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase Client (Service Role for Admin Access)
// Note: We check for key existence inside the handler for better error reporting
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  // CRITICAL: RLS Security Check
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("CRITICAL: Service Role Key missing. RLS bypass failed.");
    return NextResponse.json({ error: "Config Error" }, { status: 500 });
  }

  try {
    const { name, email, lang, role_title } = await request.json();

    console.log('[API/Send] Payload received:', { name, email, lang, role_title: role_title ? 'DETECTED' : 'CLEAN' });

    // 0. The Bot Trap (Honeypot)
    // If the hidden 'role_title' field is filled, it's a bot.
    // Return success immediately to fool them (Shadow Ban).
    if (role_title) {
       console.warn(`[API/Send] Bot Detected (Honeypot Triggered). Email: ${email}`);
       return NextResponse.json({ success: true, message: 'Protocol Initiated' }); 
       // DO NOT PROCEED. RETURN EARLY.
    }

    // 0.5 The Gatekeeper: Check for duplicates
    // Using simple select to check existence
    const { data: existingLeads, error: searchError } = await supabase
      .from('leads')
      .select('*')
      .eq('email', email);

    if (searchError) {
      console.error('[API/Send] Database Check Failed:', searchError);
      // Fail safe: If DB is down, return error to avoid inconsistencies
      return NextResponse.json({ error: 'Database verification failed' }, { status: 500 });
    }

    if (existingLeads && existingLeads.length > 0) {
      console.warn(`[API/Send] Duplicate Signal Detected: ${email}`);
      return NextResponse.json(
        { message: 'We already have your signal. Stand by.' },
        { status: 409 }
      );
    }

    // 1. Insert into DB
    const { error: insertError } = await supabase
      .from('leads')
      .insert({ name, email, language: lang });

    if (insertError) {
       console.error('[API/Send] Database Insert Failed:', insertError);
       return NextResponse.json({ error: 'Failed to record signal' }, { status: 500 });
    }

    // 2. Send Confirmation to User
    const userTask = resend.emails.send({
      from: 'Noctra System <system@noctra.studio>',
      to: email,
      subject: lang === 'es' ? 'Noctra / Protocolo Iniciado' : 'Noctra / Protocol Initiated',
      react: WelcomeEmail({ name, lang }),
    });

    // 3. Send Notification to Admin
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
