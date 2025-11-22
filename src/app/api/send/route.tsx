import { ContactTemplate } from "@/components/email/ContactTemplate";
import { ConfirmationTemplate } from "@/components/email/ConfirmationTemplate";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, website, service, budget, details } = body;

    // Generate ticket ID
    // eslint-disable-next-line react-hooks/purity
    const ticketId = `#NOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Send two emails in parallel
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
