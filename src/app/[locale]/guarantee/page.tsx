"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Target, BarChart3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const stepIcons = [Target, BarChart3, RefreshCw, Shield];

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

export default function GuaranteePage() {
  const t = useTranslations("GuaranteePage");

  return (
    <main className="min-h-screen bg-transparent text-neutral-50 relative">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col justify-center px-6 md:px-8 pt-32 pb-16 border-b border-neutral-800 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-4 py-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">
              60-day guarantee
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
              {t("how_title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map((i) => {
              const Icon = stepIcons[i];
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-mono text-neutral-500">
                        STEP {i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      {t(`how_steps.${i}.title`)}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {t(`how_steps.${i}.description`)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* KPI Examples */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/30 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
              {t("examples_title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950/50">
                  <h3 className="text-lg font-bold mb-6 text-center">
                    {t(`examples.${i}.type`)}
                  </h3>
                  <ul className="space-y-3">
                    {[0, 1, 2, 3].map((j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-neutral-400 text-sm">
                        <Target className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        {t(`examples.${i}.kpis.${j}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fine Print */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
              {t("fine_print_title")}
            </h2>
            <ul className="space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-400">
                  <span className="text-neutral-600 font-mono text-xs mt-1">
                    {i + 1}.
                  </span>
                  {t(`fine_print.${i}`)}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-10 text-lg bg-white text-black hover:bg-neutral-200 transition-colors duration-300">
              <Link
                href={{ pathname: "/contact", query: { intent: "guarantee" } }}>
                {t("cta")}
              </Link>
            </Button>
            <p className="text-neutral-500 text-sm mt-4">{t("cta_subtitle")}</p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
