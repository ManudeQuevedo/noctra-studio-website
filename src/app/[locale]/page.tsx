import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { HeroTextSection } from "@/components/home/HeroTextSection";
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
const PhilosophySection = dynamic(
  () =>
    import("@/components/home/philosophy-section").then((mod) => ({
      default: mod.PhilosophySection,
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

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const images = SERVICE_IMAGES;

  return (
    <>
      {/* SECTION 1: The Hero */}
      <Hero />

      {/* SECTION 2: The Intro (Lead Statement) */}
      <HeroTextSection />

      <ServicesGrid images={images} />
      <PhilosophySection />
    </>
  );
}
