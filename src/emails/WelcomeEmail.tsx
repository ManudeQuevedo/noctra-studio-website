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

interface WelcomeEmailProps {}

export const WelcomeEmail = ({}: WelcomeEmailProps) => {
  const previewText = "Protocol Initiated.";

  return (
    <Html style={{ backgroundColor: "#050505" }}>
      <Head />
      <Preview>{previewText}</Preview>

      <Body
        style={{
          backgroundColor: "#050505",
          color: "#ffffff",
          margin: "0",
          padding: "0",
          fontFamily: "sans-serif",
        }}>
        {/* Full Bleed Wrapper */}
        <Section
          style={{
            backgroundColor: "#050505",
            width: "100%",
            height: "100%",
            padding: "40px 0",
          }}>
          <Container
            style={{ margin: "0 auto", maxWidth: "560px", padding: "20px" }}>
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
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                letterSpacing: "-0.025em",
              }}>
              Protocol Initiated.
            </Heading>

            {/* Body Text */}
            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "24px",
                margin: "0 0 24px 0",
                opacity: 0.9,
              }}>
              We have received your details. Our studio is active and accepting
              select inquiries for 2025.
            </Text>

            {/* Secondary Text */}
            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "24px",
                margin: "0 0 32px 0",
                opacity: 0.9,
              }}>
              Have a project in mind? We specialize in high-performance
              architecture. Let&apos;s talk.
            </Text>

            {/* CTA Button */}
            <Section style={{ marginBottom: "40px" }}>
              <Button
                href="https://cal.com/noctra/strategy"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  padding: "16px 32px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderRadius: "0",
                }}>
                Book Strategy Call
              </Button>
            </Section>

            {/* Footer */}
            <Section
              style={{ borderTop: "1px solid #333333", paddingTop: "24px" }}>
              <Text style={{ color: "#9ca3af", fontSize: "12px", margin: "0" }}>
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
