"use server";

import { createClient } from "@/utils/supabase/server";
import { resend } from "@/lib/resend";

export async function submitEarlyAccess(formData: {
  email: string;
  agencyName?: string;
  locale?: string;
}) {
  const supabase = await createClient();
  const { email, agencyName, locale = "es" } = formData;

  // 1. Insert into Supabase
  const { error: dbError } = await supabase
    .from("forge_early_access")
    .insert([
      { 
        email, 
        agency_name: agencyName || null,
        locale 
      }
    ]);

  if (dbError) {
    if (dbError.code === "23505") {
      return { error: "duplicate_email" };
    }
    throw dbError;
  }

  // 2. Send Personalized Email to User
  try {
    const isEn = locale === "en";
    const subject = isEn
      ? "You're on the Noctra Forge waitlist 🚀"
      : "Estás en la lista de espera de Noctra Forge 🚀";

    const html = isEn 
      ? `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">You're on the list!</h1>
          <p>Hello,</p>
          <p>Thanks for your interest in <strong>Noctra Forge</strong> — our internal management tool, built with native AI from the ground up.</p>
          <p>Noctra Forge is currently in active development and used internally by the Noctra Studio team. We're building AI capabilities that make operations run on their own before we open access to the ecosystem.</p>
          <p><strong>What's next?</strong></p>
          <ul>
            <li>We'll notify you directly when access opens — no generic announcements.</li>
            <li>Waitlist members will be first in line when we roll out access.</li>
          </ul>
          <p>Best regards,<br/>The Noctra Studio Team</p>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">¡Ya estás en la lista!</h1>
          <p>Hola,</p>
          <p>Gracias por tu interés en <strong>Noctra Forge</strong> — nuestra herramienta interna de gestión, construida con IA nativa desde su arquitectura base.</p>
          <p>Noctra Forge está en desarrollo activo y actualmente lo usamos de forma interna en Noctra Studio. Estamos construyendo capacidades de IA que hacen que la operación se gestione sola, antes de abrir el acceso al ecosistema.</p>
          <p><strong>¿Qué sigue?</strong></p>
          <ul>
            <li>Te avisaremos directamente cuando el acceso esté disponible — sin anuncios genéricos.</li>
            <li>Los miembros de la lista de espera serán los primeros en acceder.</li>
          </ul>
          <p>Saludos,<br/>El equipo de Noctra Studio</p>
        </div>
      `;

    await resend.emails.send({
      from: "Noctra Studio <hello@noctra.studio>",
      to: [email],
      subject,
      html,
    });

    // 3. Notify Agency (Internal Lead Alert)
    await resend.emails.send({
      from: "Noctra Forge <system@noctra.studio>",
      to: ["hello@noctra.studio"],
      subject: `New Early Access Lead: ${agencyName || 'Personal'} (${email})`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Forge CRM Lead</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Agency:</strong> ${agencyName || 'N/A'}</p>
          <p><strong>Locale:</strong> ${locale}</p>
          <p><strong>Status:</strong> Set as CRM potential</p>
        </div>
      `,
    });

  } catch (emailError) {
    console.error("Error sending Early Access email:", emailError);
    // We don't throw here to avoid failing the whole request if email fails but DB succeeded
  }

  return { success: true };
}
