import dynamic from "next/dynamic";
import { PageHero as Hero } from "@/components/PageHero";
import { Thesis } from "@/components/sections/Thesis";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { generatePageMetadata } from "@/lib/metadata";
import {
  OrganizationSchema,
  ServiceSchema,
  WebsiteSchema,
} from "@/components/seo/JsonLd";

import { BrandNarrativeVisual } from "@/components/home/BrandNarrativeVisual";

// Lazy load new strategic components
const AudienceSection = dynamic(() =>
  import("@/components/home/AudienceSection").then((mod) => ({
    default: mod.AudienceSection,
  })),
);
const PricingAnchorSection = dynamic(() =>
  import("@/components/home/PricingAnchorSection").then((mod) => ({
    default: mod.PricingAnchorSection,
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
 * Section Order: Hero → Thesis → Ecosystem → Audience → Pricing anchor → CTA
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
        <Thesis />
        <Ecosystem />
        <AudienceSection />
        <PricingAnchorSection />
        <FinalCTASection />
      </div>

      <OrganizationSchema />
      <WebsiteSchema />
      <ServiceSchema />
    </main>
  );
}
