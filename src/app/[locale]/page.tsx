import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { PhilosophySection } from "@/components/home/philosophy-section";

import { ManifestoText } from "@/components/TextReveal";
import { generatePageMetadata } from "@/lib/metadata";

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
