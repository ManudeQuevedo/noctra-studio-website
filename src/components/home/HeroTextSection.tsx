"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HeroTextSection() {
  const t = useTranslations("HeroTextSection");

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-32">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-center leading-tight">
          <span className="text-white">{t("part1")}</span>
          <span className="text-neutral-600">{t("part2")}</span>
          <span className="text-white">{t("part3")}</span>
          <span className="text-neutral-600">{t("part4")}</span>
        </motion.h2>
      </div>
    </section>
  );
}
