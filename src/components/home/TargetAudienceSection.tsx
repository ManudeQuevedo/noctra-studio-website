"use client";

import { Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}>
    {children}
  </motion.div>
);

/**
 * TargetAudienceSection
 * Purpose: Identifies the ideal client profile (The "Visionary").
 * Key Features:
 * - Two-column layout with sticky image
 * - Bullet points describing client characteristics
 */
export function TargetAudienceSection() {
  const t = useTranslations("TargetAudience");

  const audiences = [
    {
      key: "professional",
      icon: Zap,
    },
    {
      key: "business",
      icon: TrendingUp,
    },
    {
      key: "enterprise",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 text-neutral-900 dark:text-neutral-50 tracking-tight">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <FadeIn key={audience.key} delay={index * 0.1} className="h-full">
              <div className="group h-full p-8 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors duration-300 flex flex-col">
                <div className="mb-6">
                  <audience.icon
                    className="w-8 h-8 text-neutral-900 dark:text-neutral-50"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
                  {t(`${audience.key}.headline`)}
                </h3>

                <div className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
                  {t(`${audience.key}.target`)}
                </div>

                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1">
                  {t(`${audience.key}.copy`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
