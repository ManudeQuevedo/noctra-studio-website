"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";

export function PageHero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 pb-16 text-center z-10 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl space-y-8 w-full z-30 relative pointer-events-auto px-6">
        <div className="mb-6 inline-flex items-center justify-center border border-neutral-800 rounded-full px-6 py-2.5 bg-neutral-900/50 backdrop-blur-sm shadow-[0_0_25px_rgba(16,185,129,0.1)] border-emerald-500/10 gap-4 transition-all hover:border-emerald-500/20 group">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              {t("hero.trust_badge.price")}
            </span>
            <div className="w-px h-3 bg-neutral-800" />
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest animate-pulse-slow">
              {t("hero.trust_badge.guarantee")}
            </span>
            <div className="w-px h-3 bg-neutral-800" />
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
              {t("hero.trust_badge.founder")}
            </span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight text-white">
          {t("hero.title")}
        </h1>

        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}>
            <Button
              asChild
              size="lg"
              className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 transition-colors duration-300">
              <Link
                href={{ pathname: "/contact", query: { intent: "discovery" } }}>
                {t("cta_start")}
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full h-12 px-8 text-base border-neutral-800 text-neutral-400 hover:text-white hover:border-white hover:bg-transparent transition-all duration-300">
              <Link href="/work">{t("cta_work")}</Link>
            </Button>
          </motion.div>
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
