import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name?: string;
  lang?: "en" | "es";
}

export const WelcomeEmail = ({ name, lang = "en" }: WelcomeEmailProps) => {
  const greetingName = name || (lang === "es" ? "Viajero" : "Traveller");

  const content = {
    en: {
      subject: "Protocol Initiated",
      headline: `Protocol Initiated, ${greetingName}.`,
      body1:
        "We have received your signal. Our studio is active and accepting select inquiries for 2025.",
      body2:
        "Have a project in mind? We specialize in high-performance architecture. Let's talk.",
      button: "INITIATE COMMS",
      ctaUrl: "mailto:hello@noctra.studio?subject=Project%20Inquiry",
      footer: `© ${new Date().getFullYear()} Noctra Studio. All rights reserved.`,
    },
    es: {
      subject: "Protocolo Iniciado",
      headline: `Protocolo Iniciado, ${greetingName}.`,
      body1:
        "Hemos recibido tu señal. Nuestro estudio está activo y aceptando proyectos selectos para 2025.",
      body2:
        "¿Tienes un proyecto en mente? Nos especializamos en arquitectura de alto rendimiento. Hablemos.",
      button: "INICIAR COMUNICACIÓN",
      ctaUrl: "mailto:hello@noctra.studio?subject=Consulta%20de%20Proyecto",
      footer: `© ${new Date().getFullYear()} Noctra Studio. Todos los derechos reservados.`,
    },
  };

  const t = content[lang] || content.en;

  return (
    <Html>
      <Head />
      <Preview>{t.headline}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000000",
          fontFamily: "sans-serif",
        }}>
        {/* Outer Table - Force Full Width Black Background (The Gmail/Outlook Fix) */}
        <table
          width="100%"
          border={0}
          cellSpacing={0}
          cellPadding={0}
          style={{ backgroundColor: "#000000", width: "100%" }}
          role="presentation">
          <tr>
            <td align="center" style={{ padding: "40px 0" }}>
              {/* Inner Card Container */}
              <table
                width="480"
                border={0}
                cellSpacing={0}
                cellPadding={0}
                style={{
                  backgroundColor: "#050505",
                  borderRadius: "24px",
                  border: "1px solid #333333",
                  maxWidth: "480px",
                  width: "100%",
                }}
                role="presentation">
                <tr>
                  <td style={{ padding: "40px", textAlign: "left" }}>
                    {/* Content */}

                    {/* Logo */}
                    <div style={{ marginBottom: "32px" }}>
                      <Img
                        src="https://noctra.studio/static/noctra-logo-black.png"
                        alt="Noctra Studio"
                        width="auto"
                        height="32"
                        style={{ display: "block" }}
                      />
                    </div>

                    {/* Headline */}
                    <Heading
                      style={{
                        color: "#ffffff",
                        fontSize: "32px",
                        fontWeight: "bold",
                        margin: "0 0 24px 0",
                        letterSpacing: "-0.025em",
                      }}>
                      {t.headline}
                    </Heading>

                    {/* Body Text 1 */}
                    <Text
                      style={{
                        color: "#a1a1aa",
                        fontSize: "15px",
                        lineHeight: "24px",
                        margin: "0 0 24px 0",
                        opacity: 1,
                      }}>
                      {t.body1}
                    </Text>

                    {/* Body Text 2 */}
                    <Text
                      style={{
                        color: "#a1a1aa",
                        fontSize: "15px",
                        lineHeight: "24px",
                        margin: "0 0 32px 0",
                        opacity: 1,
                      }}>
                      {t.body2}
                    </Text>

                    {/* CTA Button */}
                    <div style={{ marginBottom: "40px" }}>
                      <Button
                        href={t.ctaUrl}
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          padding: "14px 28px",
                          fontWeight: "bold",
                          fontSize: "13px",
                          textDecoration: "none",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          borderRadius: "9999px", // Pill shape
                        }}>
                        {t.button}
                      </Button>
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        borderTop: "1px solid #333333",
                        paddingTop: "24px",
                      }}>
                      <Text
                        style={{
                          color: "#52525b",
                          fontSize: "11px",
                          margin: "0",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}>
                        {t.footer}
                      </Text>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
