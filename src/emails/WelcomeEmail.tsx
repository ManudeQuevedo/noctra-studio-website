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
  Font,
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
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <style>
          {`
            /* Base Styles (Light Mode Default) */
            .dark-mode-only { display: none !important; }
            .light-mode-only { display: block !important; }
            
            /* Dark Mode Override */
            @media (prefers-color-scheme: dark) {
              .dark-mode-only { display: block !important; }
              .light-mode-only { display: none !important; }
              
              /* Invert text colors for Dark Mode */
              .body-text { color: #a1a1aa !important; }
              .heading-text { color: #ffffff !important; }
              .container-bg { background-color: #000000 !important; }
              .card-bg { background-color: #050505 !important; border-color: #333333 !important; }
            }
          `}
        </style>
      </Head>
      <Preview>{t.headline}</Preview>

      {/* 
        Container - Default is White (Light Mode) 
        Dark Mode clients will see CSS overrides or auto-inversion
      */}
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#ffffff",
          fontFamily: "Roboto, Verdana, sans-serif",
        }}
        className="container-bg">
        <table
          width="100%"
          border={0}
          cellSpacing={0}
          cellPadding={0}
          role="presentation">
          <tr>
            <td align="center" style={{ padding: "40px 0" }}>
              <Container
                style={{
                  maxWidth: "480px",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  padding: "40px",
                  border: "1px solid #e5e5e5",
                }}
                className="card-bg">
                {/* Logo Section - Double Asset Strategy */}
                <div style={{ marginBottom: "32px" }}>
                  {/* Light Logic: Show Black Logo */}
                  <div className="light-mode-only">
                    <Img
                      src="https://noctra.studio/static/noctra-logo-black.png"
                      alt="Noctra Studio"
                      width="auto"
                      height="32"
                      style={{ display: "block" }}
                    />
                  </div>
                  {/* Dark Logic: Show White Logo */}
                  <div className="dark-mode-only">
                    <Img
                      src="https://noctra.studio/static/noctra-logo-white.png"
                      alt="Noctra Studio"
                      width="auto"
                      height="32"
                      style={{ display: "block" }}
                    />
                  </div>
                </div>

                {/* Headline */}
                <Heading
                  style={{
                    color: "#000000",
                    fontSize: "32px",
                    fontWeight: "bold",
                    margin: "0 0 24px 0",
                    letterSpacing: "-0.025em",
                  }}
                  className="heading-text">
                  {t.headline}
                </Heading>

                {/* Body Text */}
                <Text
                  style={{
                    color: "#52525b",
                    fontSize: "15px",
                    lineHeight: "24px",
                    margin: "0 0 24px 0",
                  }}
                  className="body-text">
                  {t.body1}
                </Text>

                <Text
                  style={{
                    color: "#52525b",
                    fontSize: "15px",
                    lineHeight: "24px",
                    margin: "0 0 32px 0",
                  }}
                  className="body-text">
                  {t.body2}
                </Text>

                {/* CTA Button Section - Double Button Strategy */}
                <div style={{ marginBottom: "40px" }}>
                  {/* Light Mode: Black Button */}
                  <div className="light-mode-only">
                    <Button
                      href={t.ctaUrl}
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        padding: "14px 28px",
                        fontWeight: "bold",
                        fontSize: "13px",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderRadius: "9999px",
                      }}>
                      {t.button}
                    </Button>
                  </div>

                  {/* Dark Mode: White Button */}
                  <div className="dark-mode-only">
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
                        borderRadius: "9999px",
                      }}>
                      {t.button}
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    borderTop: "1px solid #e5e5e5",
                    paddingTop: "24px",
                  }}>
                  <Text
                    style={{
                      color: "#a1a1aa",
                      fontSize: "11px",
                      margin: "0",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                    {t.footer}
                  </Text>
                </div>
              </Container>
            </td>
          </tr>
        </table>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
