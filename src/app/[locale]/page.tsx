import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { About } from "@/components/about";

import { ManifestoText } from "@/components/TextReveal";
import { TechMarquee } from "@/components/tech-marquee";

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: The Hero */}
      <Hero />

      {/* SECTION 2: The Manifesto */}
      <section className="relative z-10 py-40 px-6 text-center">
        <ManifestoText />
      </section>

      {/* SECTION 3: The Proof */}
      <section className="relative z-10 pb-32 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Our Engineering Arsenal
          </h2>
        </div>
        <TechMarquee />
      </section>

      <ServicesGrid />
      <About />
    </>
  );
}
