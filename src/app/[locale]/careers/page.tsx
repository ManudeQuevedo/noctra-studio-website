"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, Palette, TrendingUp, ArrowRight } from "lucide-react";

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

export default function CareersPage() {
  const t = useTranslations("CareersPage");

  const mailtoLink =
    "mailto:careers@noctra.studio?subject=Vetting%20Process%20Application";

  return (
    <main className="min-h-screen bg-neutral-950 text-white relative">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center px-4 md:px-8 pt-32 pb-16">
        <div className="max-w-5xl mx-auto w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-white">
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* The Roster - 3 Column Grid */}
      <section className="py-24 px-4 md:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-12 text-center">
              {t("roster.label")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: The Engineer */}
            <FadeIn delay={0.1}>
              <div className="group h-full flex flex-col border border-neutral-800 p-8 hover:border-neutral-700 transition-all duration-300 bg-neutral-900/30">
                <Code2 className="w-10 h-10 text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t("roster.engineer.title")}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t("roster.engineer.desc")}
                </p>
              </div>
            </FadeIn>

            {/* Card 2: The Visualist */}
            <FadeIn delay={0.2}>
              <div className="group h-full flex flex-col border border-neutral-800 p-8 hover:border-neutral-700 transition-all duration-300 bg-neutral-900/30">
                <Palette className="w-10 h-10 text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t("roster.visualist.title")}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t("roster.visualist.desc")}
                </p>
              </div>
            </FadeIn>

            {/* Card 3: The Strategist */}
            <FadeIn delay={0.3}>
              <div className="group h-full flex flex-col border border-neutral-800 p-8 hover:border-neutral-700 transition-all duration-300 bg-neutral-900/30">
                <TrendingUp className="w-10 h-10 text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t("roster.strategist.title")}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t("roster.strategist.desc")}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Engagement Protocols */}
      <section className="py-24 px-4 md:px-8 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-12 text-center">
              {t("protocols.title")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Protocol 1: Project-Based */}
            <FadeIn delay={0.1}>
              <div className="border-l-2 border-neutral-700 pl-6">
                <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">
                  01
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t("protocols.items.0.title")}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t("protocols.items.0.desc")}
                </p>
              </div>
            </FadeIn>

            {/* Protocol 2: The 50/50 Standard */}
            <FadeIn delay={0.2}>
              <div className="border-l-2 border-neutral-700 pl-6">
                <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">
                  02
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t("protocols.items.1.title")}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t("protocols.items.1.desc")}
                </p>
              </div>
            </FadeIn>

            {/* Protocol 3: Zero Overhead */}
            <FadeIn delay={0.3}>
              <div className="border-l-2 border-neutral-700 pl-6">
                <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">
                  03
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t("protocols.items.2.title")}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t("protocols.items.2.desc")}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <a
              href={mailtoLink}
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-lg font-bold hover:bg-neutral-200 transition-colors rounded-sm">
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-neutral-500 mt-6 font-mono">
              {t("cta.subtext")}
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
