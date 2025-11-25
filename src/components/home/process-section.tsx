"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ProcessSection() {
  const t = useTranslations("Process");

  const steps = [0, 1, 2, 3];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 border-t border-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          {t("title")}
        </h2>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-4 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex flex-col items-center text-center group">
            {/* Step Number Bubble */}
            <div className="w-24 h-24 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-6 z-10 group-hover:border-white/50 transition-colors duration-500">
              <span className="text-3xl font-mono font-bold text-neutral-700 group-hover:text-white transition-colors duration-500">
                0{step + 1}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {t(`steps.${step}.title`)}
            </h3>
            <p className="text-neutral-400 text-sm">
              {t(`steps.${step}.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
