import dynamic from "next/dynamic";
import { PageHero as Hero } from "@/components/PageHero";
import { generatePageMetadata } from "@/lib/metadata";
import { ServiceSchema, FAQSchema } from "@/components/seo/JsonLd";

// Lazy load heavy components below the fold
const ServicesGrid = dynamic(
  () =>
    import("@/components/home/services-grid").then((mod) => ({
      default: mod.ServicesGrid,
    })),
  { ssr: true },
);
const WhyDifferentSection = dynamic(
  () =>
    import("@/components/home/WhyDifferentSection").then((mod) => ({
      default: mod.WhyDifferentSection,
    })),
  { ssr: true },
);
const AIAutomationShowcase = dynamic(
  () =>
    import("@/components/home/AIAutomationShowcase").then((mod) => ({
      default: mod.AIAutomationShowcase,
    })),
  { ssr: true },
);
const PricingSection = dynamic(
  () =>
    import("@/components/home/pricing-section").then((mod) => ({
      default: mod.PricingSection,
    })),
  { ssr: true },
);
const ProcessSection = dynamic(
  () =>
    import("@/components/home/process-section").then((mod) => ({
      default: mod.ProcessSection,
    })),
  { ssr: true },
);
const FAQSection = dynamic(
  () =>
    import("@/components/home/FAQSection").then((mod) => ({
      default: mod.FAQSection,
    })),
  { ssr: true },
);
const SocialProofSection = dynamic(
  () =>
    import("@/components/home/SocialProofSection").then((mod) => ({
      default: mod.SocialProofSection,
    })),
  { ssr: true },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "home");
}

// Static images map
const SERVICE_IMAGES = {
  web: "/images/architecture.jpg",
  branding: "/images/identity.jpg",
  ai: "/images/ai.jpg",
  seo: "/images/seo.jpg",
};

/**
 * HomePage
 * Purpose: Main landing page — benefit-focused, conversion-oriented.
 * Section Order: Hero → Services → WhyDifferent → AIAutomation → Pricing → Process → FAQ → SocialProof
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const images = SERVICE_IMAGES;

  return (
    <main className="min-h-screen">
      {/* 1. Hero — Headline + CTAs + trust badge */}
      <Hero />

      {/* 2. Services — Benefit-focused 4-service grid */}
      <ServicesGrid images={images} />

      {/* 3. Why Different — 4 differentiator cards */}
      <WhyDifferentSection />

      {/* 4. AI Automation — Key differentiator */}
      <AIAutomationShowcase />

      {/* 5. Pricing — Transparent modular pricing + optional modules */}
      <PricingSection />

      {/* 6. Process — 5-phase client journey */}
      <ProcessSection />

      {/* 7. FAQ — 7 questions accordion */}
      <FAQSection />

      {/* 8. Social Proof — Early adopter offer */}
      <SocialProofSection />

      {/* SEO Schemas */}
      <ServiceSchema />
      <FAQSchema />
    </main>
  );
}
