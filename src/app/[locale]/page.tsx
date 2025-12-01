import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { HeroTextSection } from "@/components/home/HeroTextSection";

import { SiteAuditTool } from "@/components/home/SiteAuditTool";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { generatePageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

// Lazy load heavy components below the fold
const ServicesGrid = dynamic(
  () =>
    import("@/components/home/services-grid").then((mod) => ({
      default: mod.ServicesGrid,
    })),
  { ssr: true }
);
const ProcessSection = dynamic(
  () =>
    import("@/components/home/process-section").then((mod) => ({
      default: mod.ProcessSection,
    })),
  { ssr: true }
);
const PhilosophySection = dynamic(
  () =>
    import("@/components/home/philosophy-section").then((mod) => ({
      default: mod.PhilosophySection,
    })),
  { ssr: true }
);
const TargetAudienceSection = dynamic(
  () =>
    import("@/components/home/TargetAudienceSection").then((mod) => ({
      default: mod.TargetAudienceSection,
    })),
  { ssr: true }
);
const BusinessImpactSection = dynamic(
  () =>
    import("@/components/home/BusinessImpactSection").then((mod) => ({
      default: mod.BusinessImpactSection,
    })),
  { ssr: true }
);
const ModernStackSection = dynamic(
  () =>
    import("@/components/home/ModernStackSection").then((mod) => ({
      default: mod.ModernStackSection,
    })),
  { ssr: true }
);

const FeaturedWorkSection = dynamic(
  () =>
    import("@/components/home/FeaturedWorkSection").then((mod) => ({
      default: mod.FeaturedWorkSection,
    })),
  { ssr: true }
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
 * Purpose: The main landing page of the website.
 * Key Features:
 * - Hero section with 3D starfield
 * - Manifesto text (HeroTextSection)
 * - Site Audit Tool (lead magnet)
 * - Services grid
 * - Engagement Models (pricing with USD/MXN toggle)
 * - Target audience breakdown
 * - Philosophy section with tech marquee
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const images = SERVICE_IMAGES;

  return (
    <main className="min-h-screen">
      {/* SECTION 1: The Hero */}
      <Hero />
      <PhilosophySection />

      {/* SECTION 2: The Intro (Lead Statement) */}

      <HeroTextSection />

      {/* SECTION 3: Site Audit Tool (Lead Magnet) */}
      <section className="w-full px-6 md:px-8 py-24 bg-neutral-950/50 border-y border-neutral-900">
        <SiteAuditTool />
      </section>

      <ServicesGrid images={images} />
      <BusinessImpactSection />
      <EngagementModels />
      <TargetAudienceSection />
      <FeaturedWorkSection />
      <ModernStackSection />
      <ProcessSection />
    </main>
  );
}
