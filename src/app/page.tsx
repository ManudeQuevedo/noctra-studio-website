"use client";

import { Background } from "@/components/coming-soon/background";
import { Footer } from "@/components/coming-soon/footer";
import { Hero } from "@/components/coming-soon/hero";
import { Navbar } from "@/components/coming-soon/navbar";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden flex flex-col">
      <Background />

      {/* Header / Nav */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center container mx-auto px-4">
        <Hero />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
