"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, FileCheck } from "lucide-react";

interface StepData {
  title: string;
  description: string;
  you_get: string;
  you_need: string;
}

export function ProcessSection() {
  const t = useTranslations("Process");
  const locale = useLocale();
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const stepsData = t.raw("steps") as Record<string, StepData>;
  const stepEntries = Object.entries(stepsData).sort(
    ([a], [b]) => Number(a) - Number(b),
  );

  const youGetLabel = locale === "es" ? "Recibes" : "You get";
  const youNeedLabel = locale === "es" ? "Necesitas" : "You need";

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

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:grid gap-6 md:grid-cols-5 relative">
        {/* Connecting Line */}
        <div className="absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

        {stepEntries.map(([key, step], index) => {
          const stepId = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group"
              onMouseEnter={() => setHoveredStep(key)}
              onMouseLeave={() => setHoveredStep(null)}>
              {/* Hover Tooltip */}
              <AnimatePresence>
                {hoveredStep === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 w-64 bg-zinc-900/90 backdrop-blur-md border border-white/10 p-4 rounded-lg z-50 pointer-events-none">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Gift className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                            {youGetLabel}
                          </span>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {step.you_get}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileCheck className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
                            {youNeedLabel}
                          </span>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {step.you_need}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Number Bubble */}
              <div className="w-24 h-24 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-6 z-10 group-hover:border-white/50 transition-colors duration-500">
                <span className="text-3xl font-mono font-bold text-neutral-700 group-hover:text-white transition-colors duration-500">
                  {stepId}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-neutral-400 text-sm">{step.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: vertical cards */}
      <div className="md:hidden space-y-4">
        {stepEntries.map(([key, step], index) => {
          const stepId = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-xl border border-neutral-800 bg-neutral-950/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <span className="text-lg font-mono font-bold text-neutral-500">
                    {stepId}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-neutral-400 text-sm">{step.description}</p>
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-start gap-2 text-xs">
                      <Gift className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-neutral-300">{step.you_get}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <FileCheck className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                      <span className="text-neutral-300">{step.you_need}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
