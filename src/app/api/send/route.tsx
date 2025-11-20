import { ContactTemplate } from '@/components/email/ContactTemplate';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, website, service, budget, details } = body;

    const data = await resend.emails.send({
      from: 'Noctra Website <onboarding@resend.dev>',
      to: ['hello@noctra.studio'], // Replace with your actual email
      subject: `New Project Inquiry: ${name}`,
      react: (
        <ContactTemplate
          name={name}
          email={email}
          website={website}
          service={service}
          budget={budget}
          details={details}
        />
      ),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
