import dynamic from "next/dynamic";
import { PageHero as Hero } from "@/components/PageHero";
import { Thesis } from "@/components/sections/Thesis";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { ForWhoSection } from "@/components/sections/ForWhoSection";
import { generatePageMetadata } from "@/lib/metadata";
import {
  OrganizationSchema,
  ServiceSchema,
  WebsiteSchema,
} from "@/components/seo/JsonLd";

import { BrandNarrativeVisual } from "@/components/home/BrandNarrativeVisual";
import { TestimonialQuote } from "@/components/testimonial-quote";
import { getApprovedTestimonials } from "@/content/testimonials";

// Lazy load below-the-fold sections
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
 * Section Order: Hero → Thesis → Ecosystem → For who → Testimonial → Pricing anchor → CTA
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const testimonials = getApprovedTestimonials();

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <BrandNarrativeVisual className="inset-0 z-0" />
      <div className="relative z-10">
        <Hero />
        <Thesis />
        <Ecosystem />
        <ForWhoSection />
        {testimonials.map((testimonial) => (
          <TestimonialQuote
            key={testimonial.id}
            testimonial={testimonial}
            variant="inline"
            locale={locale}
          />
        ))}
        <PricingAnchorSection />
        <FinalCTASection />
      </div>

      <OrganizationSchema />
      <WebsiteSchema />
      <ServiceSchema />
    </main>
  );
}
