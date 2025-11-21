"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 pb-16 text-center z-10 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl space-y-8 w-full z-30 relative pointer-events-auto px-6">
        <div className="mb-6 inline-flex items-center justify-center border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-1 text-xs font-mono uppercase tracking-widest text-neutral-500">
          {t("hero.trust_badge")}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
          {t("hero.title")}
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button
            asChild
            size="lg"
            className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 transition-colors duration-300">
            <Link href="/contact">{t("cta_start")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 text-base border-neutral-800 text-neutral-400 hover:text-white hover:border-white hover:bg-transparent transition-all duration-300">
            <Link href="/services">{t("cta_services")}</Link>
          </Button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-600">
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
