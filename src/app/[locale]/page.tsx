import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { HeroTextSection } from "@/components/home/HeroTextSection";
import { generatePageMetadata } from "@/lib/metadata";

// Lazy load heavy components below the fold
const ServicesGrid = dynamic(
  () =>
    import("@/components/home/services-grid").then((mod) => ({
      default: mod.ServicesGrid,
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
 * - Services grid
 * - Target audience breakdown
 * - Philosophy section with tech marquee
 */
export default async function HomePage() {
  const images = SERVICE_IMAGES;

  return (
    <main className="min-h-screen">
      {/* SECTION 1: The Hero */}
      <Hero />

      {/* SECTION 2: The Intro (Lead Statement) */}
      <HeroTextSection />

      <ServicesGrid images={images} />
      <TargetAudienceSection />
      <PhilosophySection />
    </main>
  );
}
