import dynamic from "next/dynamic";
import { PageHero as Hero } from "@/components/PageHero";
import { generatePageMetadata } from "@/lib/metadata";
import {
  OrganizationSchema,
  ServiceSchema,
  WebsiteSchema,
} from "@/components/seo/JsonLd";

// Lazy load heavy components below the fold
const ClaritySection = dynamic(() =>
  import("@/components/home/ClaritySection").then((mod) => ({
    default: mod.ClaritySection,
  })),
);
const CapabilitiesSection = dynamic(() =>
  import("@/components/home/CapabilitiesSection").then((mod) => ({
    default: mod.CapabilitiesSection,
  })),
);
const AudienceSection = dynamic(() =>
  import("@/components/home/AudienceSection").then((mod) => ({
    default: mod.AudienceSection,
  })),
);
const ExamplesSection = dynamic(() =>
  import("@/components/home/ExamplesSection").then((mod) => ({
    default: mod.ExamplesSection,
  })),
);
const WhyDifferentSection = dynamic(() =>
  import("@/components/home/WhyDifferentSection").then((mod) => ({
    default: mod.WhyDifferentSection,
  })),
);
const ProcessSection = dynamic(() =>
  import("@/components/home/process-section").then((mod) => ({
    default: mod.ProcessSection,
  })),
);
const FinalCTASection = dynamic(() =>
  import("@/components/home/FinalCTASection").then((mod) => ({
    default: mod.FinalCTASection,
  })),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "home");
}

/**
 * HomePage
 * Purpose: Main landing page — structured digital systems positioning with accessible language.
 * Section Order: Hero → How We Help → Capabilities → Audience → Selected Work → Standards → Process → CTA
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <main className="min-h-screen">
      <Hero />
      <ClaritySection />
      <CapabilitiesSection />
      <AudienceSection />
      <ExamplesSection />
      <WhyDifferentSection />
      <ProcessSection />
      <FinalCTASection />

      <OrganizationSchema />
      <WebsiteSchema />
      <ServiceSchema />
    </main>
  );
}
