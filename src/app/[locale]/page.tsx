import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { PhilosophySection } from "@/components/home/philosophy-section";

import { ManifestoText } from "@/components/TextReveal";
import { TechMarquee } from "@/components/tech-marquee";

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: The Hero */}
      <Hero />

      {/* SECTION 2: The Manifesto */}
      <section className="relative z-10 py-24 my-24 px-6 text-center">
        <ManifestoText />
      </section>

      <ServicesGrid />
      <PhilosophySection />
    </>
  );
}
