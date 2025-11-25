import { ContactTemplate } from "@/components/email/ContactTemplate";
import { ConfirmationTemplate } from "@/components/email/ConfirmationTemplate";
import { AuditConfirmationTemplate } from "@/components/email/AuditConfirmationTemplate";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, website, service, budget, details, url } = body;

    // Generate ticket ID
    // eslint-disable-next-line react-hooks/purity
    const ticketId = `#NOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (type === "audit") {
      const [notificationResult, confirmationResult] = await Promise.all([
        // 1. Notification to Noctra Studio (Audit)
        resend.emails.send({
          from: "Noctra Website <onboarding@resend.dev>",
          to: ["hello@noctra.studio"],
          subject: `New Audit Request: ${url} - ${ticketId}`,
          html: `<p>New Audit Request</p><p><strong>URL:</strong> ${url}</p><p><strong>Email:</strong> ${email}</p>`,
        }),

        // 2. Confirmation to User (Audit)
        resend.emails.send({
          from: "Noctra Studio <onboarding@resend.dev>",
          to: [email],
          subject: `System Alert: Audit Queued for ${url}`,
          react: <AuditConfirmationTemplate url={url} ticketId={ticketId} />,
        }),
      ]);

      return NextResponse.json({
        success: true,
        ticketId,
        notificationResult,
        confirmationResult,
      });
    }

    // Default: Contact Form
    const [notificationResult, confirmationResult] = await Promise.all([
      // 1. Notification to Noctra Studio
      resend.emails.send({
        from: "Noctra Website <onboarding@resend.dev>",
        to: ["hello@noctra.studio"],
        subject: `New Project Inquiry: ${name} - ${ticketId}`,
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
      }),

      // 2. Confirmation to User
      resend.emails.send({
        from: "Noctra Studio <onboarding@resend.dev>",
        to: [email],
        subject: `Signal Received: ${ticketId}`,
        react: <ConfirmationTemplate name={name} ticketId={ticketId} />,
      }),
    ]);

    return NextResponse.json({
      success: true,
      ticketId,
      notificationResult,
      confirmationResult,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
