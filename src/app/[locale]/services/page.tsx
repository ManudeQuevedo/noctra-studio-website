"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Placeholder images for the reveal effect (using distinct colors/gradients for now)
const PLACEHOLDER_IMAGES = [
  "linear-gradient(to bottom right, #1a1a1a, #2a2a2a)",
  "linear-gradient(to bottom right, #2a2a2a, #3a3a3a)",
  "linear-gradient(to bottom right, #3a3a3a, #4a4a4a)",
  "linear-gradient(to bottom right, #4a4a4a, #5a5a5a)",
];

const ServiceSection = ({
  service,
  index,
}: {
  service: { id: string; key: string };
  index: number;
}) => {
  const t = useTranslations("ServicesPage");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Left Column - Sticky Title & Visual Reveal */}
        <div className="md:col-span-5 relative">
          <div className="md:sticky md:top-48 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10">
              <span className="text-xs font-mono text-neutral-400 mb-6 block tracking-widest uppercase">
                0{index + 1} — Phase
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {t(`${service.key}.title`)}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
                {t(`${service.key}.focus`)}
              </p>
            </motion.div>

            {/* Visual Reveal Container - Absolute in Sticky Column */}
            <div className="absolute top-0 left-0 w-full aspect-square mt-48 -z-10 pointer-events-none opacity-50 mix-blend-multiply dark:mix-blend-screen">
              <AnimatePresence mode="wait">
                {hoveredStep !== null && (
                  <motion.div
                    key={hoveredStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                    style={{ background: PLACEHOLDER_IMAGES[hoveredStep] }}>
                    {/* In a real app, use <Image /> here */}
                    <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-4xl font-bold">
                      0{hoveredStep + 1}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column - Process Steps */}
        <div className="md:col-span-7 pt-8 md:pt-0 md:border-l md:border-neutral-200 md:dark:border-neutral-800 md:pl-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex flex-col gap-6 group/list">
              {/* @ts-ignore: next-intl types for arrays can be tricky */}
              {[0, 1, 2, 3].map((stepIndex) => (
                <div
                  key={stepIndex}
                  onMouseEnter={() => setHoveredStep(stepIndex)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="relative flex items-baseline gap-6 group/item transition-all duration-500 group-hover/list:opacity-40 hover:!opacity-100 cursor-default py-2">
                  {/* Active Indicator Line */}
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-0 h-px bg-neutral-900 dark:bg-white transition-all duration-300 group-hover/item:w-4" />

                  <span className="font-mono text-sm text-neutral-400 shrink-0 transition-colors group-hover/item:text-neutral-900 dark:group-hover/item:text-white">
                    0{stepIndex + 1}
                  </span>
                  <div>
                    <p className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white leading-tight transition-transform duration-300 group-hover/item:translate-x-2">
                      {t(`${service.key}.process.${stepIndex}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");

  const services = [
    { id: "web_dev", key: "web_dev" },
    { id: "branding", key: "branding" },
    { id: "ai", key: "ai" },
    { id: "seo", key: "seo" },
  ];

  return (
    <main className="min-h-screen bg-transparent pt-48 pb-0 relative z-0">
      {/* Header */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Services Sections */}
      <div className="flex flex-col gap-32 md:gap-48 mb-32">
        {services.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </div>
    </main>
  );
}
