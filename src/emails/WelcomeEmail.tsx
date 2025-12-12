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
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface WelcomeEmailProps {}

export const WelcomeEmail = ({}: WelcomeEmailProps) => {
  const previewText = "Protocol Initiated.";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#000000",
                offwhite: "#fafafa",
              },
            },
          },
        }}>
        <Body
          style={{ backgroundColor: "#050505", margin: "0", padding: "0" }}
          className="bg-[#050505] font-sans antialiased text-white m-0 p-0">
          {/* Triple-Layer Background Enforcement: Full-Width Section Wrapper */}
          <Section className="w-full h-full bg-[#050505] p-0 m-0">
            <Container className="mx-auto p-10 max-w-xl">
              {/* Logo Section */}
              <Section className="mb-8">
                <Img
                  src="https://noctra.studio/noctra-navbar-dark.svg"
                  alt="Noctra Studio"
                  width="auto"
                  height="32"
                  className="block"
                />
              </Section>

              {/* Headline */}
              <Heading className="text-4xl font-bold tracking-tight text-white mb-6">
                Protocol Initiated.
              </Heading>

              {/* Body Copy - Using text-gray-300 for high contrast legibility */}
              <Text className="text-gray-300 text-base leading-relaxed mb-6">
                We have received your details. Our studio is active and
                accepting select inquiries for 2025.
              </Text>

              {/* Pivot to Sales */}
              <Text className="text-gray-300 text-base leading-relaxed mb-8">
                Have a project in mind? We specialize in high-performance
                architecture. Let&apos;s talk.
              </Text>

              {/* CTA Button */}
              <Section className="mb-10">
                <Button
                  className="bg-white text-black px-8 py-4 rounded-none font-bold text-sm tracking-wider uppercase hover:bg-gray-200 transition-colors"
                  href="https://cal.com/noctra/strategy">
                  Book Strategy Call
                </Button>
              </Section>

              {/* Footer */}
              <Section className="border-t border-gray-800 pt-6">
                <Text className="text-gray-400 text-xs">
                  © {new Date().getFullYear()} Noctra Studio. All rights
                  reserved.
                </Text>
              </Section>
            </Container>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
