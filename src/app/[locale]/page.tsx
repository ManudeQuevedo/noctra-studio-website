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

import { getServiceImage, SERVICE_QUERIES } from "@/lib/unsplash";

export default async function HomePage() {
  // Fetch service images server-side
  // We use Promise.allSettled to ensure the page renders even if some images fail
  const results = await Promise.allSettled([
    getServiceImage(SERVICE_QUERIES.web),
    getServiceImage(SERVICE_QUERIES.branding),
    getServiceImage(SERVICE_QUERIES.ai),
    getServiceImage(SERVICE_QUERIES.seo),
  ]);

  const images = {
    web: results[0].status === "fulfilled" ? results[0].value : null,
    branding: results[1].status === "fulfilled" ? results[1].value : null,
    ai: results[2].status === "fulfilled" ? results[2].value : null,
    seo: results[3].status === "fulfilled" ? results[3].value : null,
  };

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
