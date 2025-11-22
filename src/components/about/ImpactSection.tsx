"use client";

import { motion } from "framer-motion";
import { Lightbulb, DraftingCompass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

/**
 * ImpactSection
 * Purpose: Highlights the "Noctra Ecosystem" (Social Impact & Talent).
 * Key Features:
 * - "Noctra Beacon" (Non-profit) card
 * - "The Residency" (Talent) card
 * - Hover interactions with arrow movement
 */
export function ImpactSection() {
  const t = useTranslations("AboutPage.impact");

  return (
    <section className="py-24 md:py-32 bg-neutral-950 border-t border-neutral-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn>
          <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-4">
            {t("title")}
          </h2>
          <p className="text-base text-neutral-400 mb-16 max-w-2xl">
            {t("subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-800">
          {/* Card 1: Technological Volunteering */}
          <FadeIn delay={0.1}>
            <div className="group border-r-0 md:border-r border-neutral-800 border-b md:border-b-0 p-8 md:p-12 transition-all duration-300 hover:bg-neutral-900 bg-neutral-950">
              <div className="flex flex-col h-full">
                <Lightbulb className="w-10 h-10 text-white mb-6" />

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t("volunteering.title")}
                </h3>

                <p className="text-base text-neutral-400 leading-relaxed mb-6">
                  {t("volunteering.desc")}
                </p>

                <div className="mt-auto">
                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-sm mb-6">
                    <p className="text-xs font-mono text-neutral-500 leading-relaxed">
                      <strong className="text-neutral-400">
                        {t("volunteering.note_label")}
                      </strong>{" "}
                      {t("volunteering.note_text")}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-white group-hover:text-neutral-400 transition-colors">
                    {t("volunteering.cta")}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Technical Mentorship */}
          <FadeIn delay={0.2}>
            <div className="group p-8 md:p-12 transition-all duration-300 hover:bg-neutral-900 bg-neutral-950">
              <div className="flex flex-col h-full">
                <DraftingCompass className="w-10 h-10 text-white mb-6" />

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t("mentorship.title")}
                </h3>

                <p className="text-base text-neutral-400 leading-relaxed mb-6">
                  {t("mentorship.desc")}
                </p>

                <div className="mt-auto">
                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-sm mb-6">
                    <p className="text-xs font-mono text-neutral-500 leading-relaxed">
                      <strong className="text-neutral-400">
                        {t("mentorship.note_label")}
                      </strong>{" "}
                      {t("mentorship.note_text")}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-white group-hover:text-neutral-400 transition-colors">
                    {t("mentorship.cta")}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
