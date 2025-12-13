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
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  const greetingName = name || "Traveller";
  const previewText = `Protocol Initiated, ${greetingName}.`;

  return (
    <Html style={{ backgroundColor: "#000000" }}>
      <Head />
      <Preview>{previewText}</Preview>

      <Body
        style={{
          backgroundColor: "#000000",
          margin: "0",
          padding: "0",
          fontFamily: "sans-serif",
        }}>
        {/* Full Bleed Wrapper */}
        <Section
          style={{
            backgroundColor: "#000000",
            width: "100%",
            height: "100%",
            padding: "40px 20px",
          }}>
          {/* Card Container - Dark Mode Card */}
          <Container
            style={{
              backgroundColor: "#000000",
              borderRadius: "24px",
              border: "1px solid #333333",
              padding: "40px",
              maxWidth: "480px",
              margin: "0 auto",
            }}>
            {/* Logo */}
            <Section style={{ marginBottom: "32px" }}>
              <Img
                src="https://noctra.studio/static/noctra-logo-white.png"
                alt="Noctra Studio"
                width="auto"
                height="32"
                style={{ display: "block" }}
              />
            </Section>

            {/* Headline */}
            <Heading
              style={{
                color: "#ffffff",
                fontSize: "32px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                letterSpacing: "-0.025em",
              }}>
              Protocol Initiated, {greetingName}.
            </Heading>

            {/* Body Text */}
            <Text
              style={{
                color: "#a1a1aa",
                fontSize: "15px",
                lineHeight: "24px",
                margin: "0 0 24px 0",
                opacity: 1,
              }}>
              We have received your details. Our studio is active and accepting
              select inquiries for 2025.
            </Text>

            {/* Secondary Text */}
            <Text
              style={{
                color: "#a1a1aa",
                fontSize: "15px",
                lineHeight: "24px",
                margin: "0 0 32px 0",
                opacity: 1,
              }}>
              Have a project in mind? We specialize in high-performance
              architecture. Let&apos;s talk.
            </Text>

            {/* CTA Button - Direct Line */}
            <Section style={{ marginBottom: "40px" }}>
              <Button
                href="mailto:hello@noctra.studio?subject=Project%20Inquiry"
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
                Initiate Comms
              </Button>
            </Section>

            {/* Footer */}
            <Section
              style={{ borderTop: "1px solid #333333", paddingTop: "24px" }}>
              <Text
                style={{
                  color: "#52525b",
                  fontSize: "11px",
                  margin: "0",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                © {new Date().getFullYear()} Noctra Studio. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
