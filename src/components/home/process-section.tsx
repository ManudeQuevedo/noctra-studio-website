"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "01",
    titleKey: "steps.0.title",
    descKey: "steps.0.description",
    detailEN:
      "We define strict technical specifications and user flows before a single line of code is written to eliminate scope creep.",
    detailES:
      "Definimos especificaciones técnicas y flujos de usuario estrictos antes de escribir código para eliminar riesgos y desviaciones.",
  },
  {
    id: "02",
    titleKey: "steps.1.title",
    descKey: "steps.1.description",
    detailEN:
      "Atomic, component-driven development using Next.js. We enforce strict type-safety and accessibility standards.",
    detailES:
      "Desarrollo atómico basado en componentes Next.js. Imponemos seguridad de tipos y estándares de accesibilidad.",
  },
  {
    id: "03",
    titleKey: "steps.2.title",
    descKey: "steps.2.description",
    detailEN:
      "Seamless connection of APIs and AI Agents. We torture-test data pipelines to ensure zero-latency automation.",
    detailES:
      "Conexión fluida de APIs y Agentes de IA. Sometemos los flujos de datos a pruebas de estrés para asegurar automatización.",
  },
  {
    id: "04",
    titleKey: "steps.3.title",
    descKey: "steps.3.description",
    detailEN:
      "Global edge deployment via Vercel. Real-time monitoring to guarantee 99.9% uptime and SEO dominance.",
    detailES:
      "Despliegue global en el borde vía Vercel. Monitoreo en tiempo real para garantizar 99.9% de uptime y dominio SEO.",
  },
];

export function ProcessSection() {
  const t = useTranslations("Process");
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  // Detect locale from translations (simple check)
  const locale = t("title").includes("Methodology") ? "en" : "es";

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

        {steps.map((step, index) => {
          const detail = locale === "es" ? step.detailES : step.detailEN;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group"
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}>
              {/* Hover Modal */}
              <AnimatePresence>
                {hoveredStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 w-64 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-lg z-50 pointer-events-none">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Number Bubble */}
              <div className="w-24 h-24 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-6 z-10 group-hover:border-white/50 transition-colors duration-500">
                <span className="text-3xl font-mono font-bold text-neutral-700 group-hover:text-white transition-colors duration-500">
                  {step.id}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {t(step.titleKey)}
              </h3>
              <p className="text-neutral-400 text-sm">{t(step.descKey)}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
