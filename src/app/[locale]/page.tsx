import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { ManifestoText } from "@/components/TextReveal";
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

export default function HomePage() {
  const images = SERVICE_IMAGES;

  return (
    <>
      {/* SECTION 1: The Hero */}
      <Hero />

      {/* SECTION 2: The Manifesto */}
      <section className="relative z-10 py-24 my-24 px-6 text-center">
        <ManifestoText />
      </section>

      <ServicesGrid images={images} />
      <PhilosophySection />
    </>
  );
}
