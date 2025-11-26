"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  TrendingUp,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

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
      <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-8 pt-32 pb-16">
        <div className="max-w-7xl mx-auto w-full text-center">
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

      {/* Culture Hook Section */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
            {t("culture.headline")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-neutral-300 leading-relaxed">
            <p>{t("culture.paragraph1")}</p>
            <p>{t("culture.paragraph2")}</p>
          </motion.div>
        </div>
      </section>

      {/* The Roster - 3 Column Grid */}
      <section className="py-24 px-6 md:px-8 border-t border-neutral-800">
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

      {/* The Vetting Protocol - 3 Horizontal Steps */}
      <section className="py-24 px-6 md:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16 text-center">
              {t("vetting.title")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Alignment */}
            <FadeIn delay={0.1}>
              <div className="relative h-full flex flex-col border border-neutral-800 p-8 bg-neutral-900/30">
                <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">
                  STEP 01
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("vetting.steps.0.title")}
                </h3>
                <p className="text-neutral-300 leading-relaxed flex-1">
                  {t("vetting.steps.0.desc")}
                </p>

                {/* Arrow indicator for desktop */}
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                  <ChevronRight className="w-8 h-8 text-neutral-700" />
                </div>
              </div>
            </FadeIn>

            {/* Step 2: The Audit */}
            <FadeIn delay={0.2}>
              <div className="relative h-full flex flex-col border border-neutral-800 p-8 bg-neutral-900/30">
                <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">
                  STEP 02
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("vetting.steps.1.title")}
                </h3>
                <p className="text-neutral-300 leading-relaxed flex-1">
                  {t("vetting.steps.1.desc")}
                </p>

                {/* Arrow indicator for desktop */}
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                  <ChevronRight className="w-8 h-8 text-neutral-700" />
                </div>
              </div>
            </FadeIn>

            {/* Step 3: Access */}
            <FadeIn delay={0.3}>
              <div className="h-full flex flex-col border border-neutral-800 p-8 bg-neutral-900/30">
                <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">
                  STEP 03
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("vetting.steps.2.title")}
                </h3>
                <p className="text-neutral-300 leading-relaxed flex-1">
                  {t("vetting.steps.2.desc")}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Engagement Protocols - 2x2 Grid */}
      <section className="py-24 px-6 md:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 text-center">
              {t("protocols.title")}
            </h2>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16">
              {t("protocols.context")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Protocol 1: IP Transfer */}
            <FadeIn delay={0.1}>
              <div className="border border-neutral-800 p-8 bg-neutral-900/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("protocols.items.0.title")}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {t("protocols.items.0.desc")}
                </p>
              </div>
            </FadeIn>

            {/* Protocol 2: Silence (NDA) */}
            <FadeIn delay={0.2}>
              <div className="border border-neutral-800 p-8 bg-neutral-900/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("protocols.items.1.title")}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {t("protocols.items.1.desc")}
                </p>
              </div>
            </FadeIn>

            {/* Protocol 3: Non-Solicitation */}
            <FadeIn delay={0.3}>
              <div className="border border-neutral-800 p-8 bg-neutral-900/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("protocols.items.2.title")}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {t("protocols.items.2.desc")}
                </p>
              </div>
            </FadeIn>

            {/* Protocol 4: Asynchronous */}
            <FadeIn delay={0.4}>
              <div className="border border-neutral-800 p-8 bg-neutral-900/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("protocols.items.3.title")}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {t("protocols.items.3.desc")}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Compensation Section */}
          <FadeIn delay={0.5}>
            <div className="border border-neutral-700 p-8 bg-neutral-900/50">
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("compensation.title")}
              </h3>
              <p className="text-neutral-400 mb-6">
                {t("compensation.subtitle")}
              </p>

              <div className="space-y-4">
                <div>
                  <div className="text-emerald-500 font-mono text-sm uppercase tracking-wider mb-1">
                    {t("compensation.metric")}
                  </div>
                  <p className="text-neutral-300">
                    {t("compensation.description")}
                  </p>
                </div>

                <div className="border-t border-neutral-800 pt-4 mt-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-neutral-400 font-mono">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {t("compensation.terms.deposit")}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-neutral-400 font-mono">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {t("compensation.terms.completion")}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-neutral-400 font-mono">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {t("compensation.terms.net0")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
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
