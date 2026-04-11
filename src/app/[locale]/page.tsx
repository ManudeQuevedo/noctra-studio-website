import dynamic from "next/dynamic";
import { PageHero as Hero } from "@/components/PageHero";
import { generatePageMetadata } from "@/lib/metadata";
import {
  OrganizationSchema,
  ServiceSchema,
  WebsiteSchema,
} from "@/components/seo/JsonLd";

import { BrandNarrativeVisual } from "@/components/home/BrandNarrativeVisual";

// Lazy load new strategic components
const HybridModelSection = dynamic(() =>
  import("@/components/home/HybridModelSection").then((mod) => ({
    default: mod.HybridModelSection,
  })),
);
const TheSystemSection = dynamic(() =>
  import("@/components/home/TheSystemSection").then((mod) => ({
    default: mod.TheSystemSection,
  })),
);
const RadarSection = dynamic(() =>
  import("@/components/home/RadarSection").then((mod) => ({
    default: mod.RadarSection,
  })),
);
const SocialSection = dynamic(() =>
  import("@/components/home/SocialSection").then((mod) => ({
    default: mod.SocialSection,
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
 * Purpose: strategic refactor for hybrid model positioning.
 * Section Order: Hero → Hybrid Model → Audience → The System → Radar → Social → Capabilities → Selected Work → CTA
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <BrandNarrativeVisual className="inset-0 z-0" />
      <div className="relative z-10">
        <Hero />
        <HybridModelSection />
        <AudienceSection />
        <TheSystemSection />
        <RadarSection />
        <SocialSection />
        <CapabilitiesSection />
        <ExamplesSection />
        <FinalCTASection />
      </div>

      <OrganizationSchema />
      <WebsiteSchema />
      <ServiceSchema />
    </main>
  );
}
