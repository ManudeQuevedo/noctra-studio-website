"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Phone,
  DollarSign,
  LineChart,
} from "lucide-react";
import NextImage from "next/image";

const FadeIn = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <m.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </m.div>
);

export default function AboutClient() {
  const t = useTranslations("AboutPage");

  const historyIcons = [Code, Phone, DollarSign, LineChart];

  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black relative">
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-8 border-b border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto w-full text-center md:text-left">
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 text-white text-balance">
            {t("hero.title")}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-neutral-400 max-w-3xl leading-relaxed text-balance">
            {t("hero.subtitle")}
          </m.p>
        </div>
      </section>

      {/* 2. History Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-b border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div className="relative aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden group grayscale hover:grayscale-0 transition-all duration-500">
              <NextImage
                src="/images/founder.jpg"
                alt="Manu, Founder of Noctra Studio"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <div className="flex flex-col gap-2 text-white">
                  <span className="text-4xl font-bold">Manu</span>
                  <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
                    Founder @ Noctra Studio
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-12">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                {t("history.title")}
              </h2>
              <div className="space-y-8 text-lg text-neutral-400 leading-relaxed">
                <p className="text-xl text-white font-medium">
                  {t("history.intro")}
                </p>
                <div className="pt-8 space-y-8">
                  <h3 className="text-sm font-mono text-neutral-300 uppercase tracking-widest">
                    {t("history.approach_title")}
                  </h3>
                  <div className="grid grid-cols-1 gap-8">
                    {(t.raw("history.items") as any[]).map((item, i) => {
                      const Icon = historyIcons[i] || CheckCircle2;
                      return (
                        <div key={item.title} className="flex gap-6">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-lg font-bold text-white">{item.title}</h4>
                            <p className="text-neutral-400">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Team Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-white/[0.01] border-b border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {t("team.title")}
              </h2>
              <p className="text-xl text-neutral-400">
                {t("team.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t.raw("team.items") as any[]).map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="p-8 border border-neutral-800 rounded-2xl bg-black hover:border-white/20 transition-all duration-300 h-full">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-12 text-sm font-mono text-neutral-300 text-center italic">
              {t("team.footer")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4. Tech Stack Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-b border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">
              {t("tech.title")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr gap-6 mb-16">
            {(t.raw("tech.items") as any[]).map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1} className="h-full">
                <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 h-full flex flex-col">
                  <div className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    WHY IT MATTERS
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.label}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {(t.raw("tech.summary_labels") as string[]).map((label, i) => (
              <FadeIn key={label} delay={0.5 + i * 0.1}>
                <div className="flex items-center gap-2 text-neutral-300 text-xs font-mono uppercase tracking-[0.2em]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-white/[0.01] border-b border-neutral-900 relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                {t("trust.title")}
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-xl text-neutral-400">
                  {t("trust.subtitle")}
                </p>
                <p className="text-xl text-white font-medium">
                  {t("trust.highlight")}
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {(t.raw("trust.items") as any[]).map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-neutral-800 bg-black hover:bg-neutral-900/50 transition-colors group h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">{item.title}</h3>
                  </div>
                  <p className="text-neutral-400 leading-relaxed text-base">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="flex flex-col items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-neutral-200 transition-colors">
                {t("trust.cta_button")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-neutral-300 font-mono text-xs uppercase tracking-widest">
                {t("trust.cta_footer")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-32 md:py-48 px-6 md:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white">
              {t("cta.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-2xl font-bold hover:scale-105 transition-transform group shadow-2xl shadow-white/10">
                {t("cta.button")}
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-neutral-300 font-mono text-sm uppercase tracking-widest">
                {t("cta.footer")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
    </LazyMotion>
  );
}
