import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
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
  web: "/images/services/architecture.jpg",
  branding: "/images/services/identity.jpg",
  ai: "/images/services/ai.jpg",
  seo: "/images/services/seo.jpg",
};

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const images = SERVICE_IMAGES;

  return (
    <>
      {/* SECTION 1: The Hero */}
      <Hero />

      {/* SECTION 2: The Intro (Lead Statement) */}
      <section className="max-w-4xl mx-auto px-6 text-center my-24">
        <p className="text-2xl md:text-4xl font-light leading-tight text-neutral-800 dark:text-neutral-200">
          {t("intro_text")}
        </p>
      </section>

      <ServicesGrid images={images} />
      <PhilosophySection />
    </>
  );
}
