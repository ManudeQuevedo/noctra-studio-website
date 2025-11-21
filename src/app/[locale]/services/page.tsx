"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import NextImage from "next/image";

// Static images map
const SERVICE_IMAGES = {
  web_dev: "/images/architecture.jpg",
  branding: "/images/identity.jpg",
  ai: "/images/ai.jpg",
  seo: "/images/seo.jpg",
};

const ServiceSection = ({
  service,
  index,
  image,
}: {
  service: { id: string; key: string };
  index: number;
  image: string;
}) => {
  const t = useTranslations("ServicesPage");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8">
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
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mb-6">
                {t(`${service.key}.focus`)}
              </p>

              {/* Deep Link CTA */}
              <Link
                href={`/contact?interest=${service.id}`}
                className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline-offset-4 hover:underline transition-colors">
                Explore {t(`${service.key}.title`)} →
              </Link>
            </motion.div>

            {/* Phase Anchor Image - Static */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 relative w-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <NextImage
                src={image}
                alt={t(`${service.key}.title`)}
                width={800}
                height={1000}
                className="object-cover grayscale contrast-125 w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
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
              {/* Process Steps */}
              <div className="space-y-6 mb-12">
                <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">
                  Process
                </h4>
                {/* @ts-ignore: next-intl types for arrays can be tricky */}
                {[0, 1, 2, 3].map((stepIndex) => (
                  <div
                    key={stepIndex}
                    onMouseEnter={() => setHoveredStep(stepIndex)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="relative flex items-baseline gap-4 group/item transition-all duration-500 group-hover/list:opacity-40 hover:!opacity-100 cursor-default py-2">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-sm text-neutral-500 transition-colors group-hover/item:text-neutral-900 dark:group-hover/item:text-white">
                        0{stepIndex + 1}
                      </span>
                      {/* Arrow Indicator */}
                      <span className="text-neutral-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0">
                        →
                      </span>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white leading-tight transition-transform duration-300 group-hover/item:translate-x-2">
                        {t(`${service.key}.process.${stepIndex}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">
                  Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* @ts-ignore: next-intl types */}
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0" />
                      <span className="text-sm font-medium">
                        {t(`${service.key}.deliverables.${i}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 mb-32">
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
        <ServiceSection
          service={services[0]}
          index={0}
          image={SERVICE_IMAGES.web_dev}
        />
        <ServiceSection
          service={services[1]}
          index={1}
          image={SERVICE_IMAGES.branding}
        />

        {/* Metrics Break */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 bg-neutral-900 text-white py-24 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
              <div className="space-y-4">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  STANDARD 01
                </span>
                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                  {t("metrics.lighthouse")}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  STANDARD 02
                </span>
                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                  {t("metrics.latency")}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  STANDARD 03
                </span>
                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                  {t("metrics.uptime")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ServiceSection
          service={services[2]}
          index={2}
          image={SERVICE_IMAGES.ai}
        />
        <ServiceSection
          service={services[3]}
          index={3}
          image={SERVICE_IMAGES.seo}
        />
      </div>
    </main>
  );
}
