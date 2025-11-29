"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * HeroTextSection
 * Purpose: Displays the main manifesto/mission statement on the homepage.
 * Key Features:
 * - Scroll-triggered fade-in animation
 * - Alternating font weights for visual emphasis
 * - Responsive typography
 */
export function HeroTextSection() {
  const t = useTranslations("HeroTextSection");

  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center bg-transparent overflow-hidden py-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl tracking-tighter text-center leading-relaxed md:leading-tight max-w-3xl mx-auto">
          <span className="text-white font-bold">{t("part1")}</span>
          <span className="text-neutral-600 font-medium">{t("part2")}</span>
          <span className="text-white font-bold">{t("part3")}</span>
          <span className="text-neutral-600 font-medium">{t("part4")}</span>
        </motion.h2>
      </div>
    </section>
  );
}
