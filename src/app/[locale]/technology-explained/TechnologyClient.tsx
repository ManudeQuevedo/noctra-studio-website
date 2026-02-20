"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Zap, Wrench, Search, ShieldCheck, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const categoryIcons = [Zap, Wrench, Search, ShieldCheck, Key];

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </m.div>
);

export default function TechnologyClient() {
  const t = useTranslations("TechnologyPage");

  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen bg-transparent text-neutral-50 relative">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col justify-center px-6 md:px-8 pt-32 pb-16 border-b border-neutral-800 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {t("title")}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </m.p>
        </div>
      </section>

      {/* Analogy */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8">{t("analogy_title")}</h2>
            <blockquote className="text-lg md:text-xl text-neutral-300 leading-relaxed italic border-l-2 border-white/20 pl-6 text-left">
              {t("analogy")}
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/30 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
              {t("comparison_title")}
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {[0, 1, 2, 3, 4].map((i) => {
              const Icon = categoryIcons[i];
              return (
                <FadeIn key={t(`comparison.${i}.category`)} delay={i * 0.08}>
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 overflow-hidden">
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className="w-5 h-5 text-white" />
                        <h3 className="text-xl font-bold">
                          {t(`comparison.${i}.category`)}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                          <div className="text-xs font-mono text-red-400 mb-2 uppercase tracking-wider">
                            WordPress
                          </div>
                          <p className="text-neutral-400 text-sm">
                            {t(`comparison.${i}.wordpress`)}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                          <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
                            Next.js
                          </div>
                          <p className="text-neutral-300 text-sm">
                            {t(`comparison.${i}.nextjs`)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span className="font-mono text-xs">💡</span>
                        {t(`comparison.${i}.business_impact`)}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
              {t("cost_title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WordPress */}
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
                <h3 className="text-xl font-bold mb-6">
                  {t("cost_wordpress.label")}
                </h3>
                <div className="space-y-3 text-sm text-neutral-400">
                  <p>{t("cost_wordpress.year1")}</p>
                  <div className="pt-4 border-t border-neutral-800">
                    <span className="text-2xl font-bold text-red-400">
                      {t("cost_wordpress.total_5yr")}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
            {/* Next.js */}
            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="text-xl font-bold mb-6">
                  {t("cost_nextjs.label")}
                </h3>
                <div className="space-y-3 text-sm text-neutral-400">
                  <p>{t("cost_nextjs.year1")}</p>
                  <div className="pt-4 border-t border-neutral-800">
                    <span className="text-2xl font-bold text-emerald-400">
                      {t("cost_nextjs.total_5yr")}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-neutral-500 mt-8 text-sm">
              {t("cost_note")}
            </p>
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
                href={{
                  pathname: "/contact",
                  query: { intent: "technology" },
                }}>
                {t("cta")}
              </Link>
            </Button>
            <p className="text-neutral-500 text-sm mt-4">{t("cta_subtitle")}</p>
          </FadeIn>
        </div>
      </section>
    </main>
    </LazyMotion>
  );
}
