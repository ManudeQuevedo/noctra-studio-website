"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Sparkles, Clock, Award, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const benefitIcons = [Sparkles, Clock, Award, Rocket];

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

export default function FirstClientsClient() {
  const t = useTranslations("FirstClientsPage");

  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen bg-transparent text-neutral-50 relative">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col justify-center px-6 md:px-8 pt-32 pb-16 border-b border-neutral-800 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 border border-amber-500/30 bg-amber-500/10 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">
              {t("badge")}
            </span>
          </m.div>
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

      {/* Benefits */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
              {t("offer_title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map((i) => {
              const Icon = benefitIcons[i];
              return (
                <FadeIn key={t(`benefits.${i}.title`)} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      {t(`benefits.${i}.title`)}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {t(`benefits.${i}.detail`)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/30 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">{t("why_title")}</h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {t("why_text")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center">
              {t("process_title")}
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {[0, 1, 2, 3].map((i) => (
              <FadeIn key={t(`process_steps.${i}`)} delay={i * 0.1}>
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-neutral-800 flex items-center justify-center shrink-0 font-mono text-sm">
                    {i + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-lg text-neutral-300">
                      {t(`process_steps.${i}`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Spots Counter + CTA */}
      <section className="py-24 px-6 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            {/* Spots Visual */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={`spot-${i}`}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    i < 3
                      ? "bg-neutral-800 border border-neutral-700"
                      : "bg-amber-500/20 border border-amber-500/40"
                  }`}>
                  {i < 3 ? (
                    <Check className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-neutral-400 mb-8 text-sm">
              2 {t("spots_remaining")}
            </p>

            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-10 text-lg bg-amber-500 text-black hover:bg-amber-400 transition-colors duration-300">
              <Link
                href={{
                  pathname: "/contact",
                  query: { intent: "first-client" },
                }}>
                {t("cta")}
              </Link>
            </Button>
            <p className="text-neutral-300 text-sm mt-4">{t("cta_subtitle")}</p>
          </FadeIn>
        </div>
      </section>
    </main>
    </LazyMotion>
  );
}
