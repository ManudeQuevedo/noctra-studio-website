"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Scan, Activity, Wrench, RefreshCw, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <m.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </m.div>
  );
};

export default function OptimizationClient() {
  const t = useTranslations("OptimizationPage");

  const methodIcons = [Scan, Activity, Wrench, RefreshCw];

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-transparent text-neutral-50 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full" />
        </div>

        {/* Hero: The Philosophical Hook */}
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-8 relative z-10 pt-20">
          <div className="max-w-5xl mx-auto w-full text-center">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <m.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-mono tracking-[0.4em] uppercase text-neutral-500 block mb-4"
              >
                Diagnóstico + Corrección
              </m.span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                {t("hero.title")}
                <br />
                <span className="text-emerald-400 font-light italic leading-normal inline-block mt-2">
                  {t("hero.subtitle")}
                </span>
              </h1>
              <m.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed pt-8"
              >
                {t("hero.description")}
              </m.p>
              
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-16 px-10 text-lg bg-white text-black hover:bg-neutral-200 transition-all duration-300"
                >
                  <Link href={{ pathname: "/contact", query: { intent: "radar_diagnostic" } }}>
                    {t("hero.cta")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </m.div>
            </m.div>
          </div>

          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-neutral-500"
          >
            <div className="w-px h-16 bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />
          </m.div>
        </section>

        {/* Section 1: The Silent Leak */}
        <section className="py-40 px-6 md:px-8 relative z-10 bg-neutral-950/20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
              <FadeIn direction="right">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight">
                    {t("problem.title")}
                  </h2>
                </div>
              </FadeIn>
              <div className="space-y-12">
                <FadeIn delay={0.2}>
                  <p className="text-2xl md:text-3xl font-light text-neutral-200 leading-snug">
                    {t("problem.description")}
                  </p>
                </FadeIn>
                
                <div className="grid grid-cols-1 gap-6">
                  {[0, 1, 2].map((i) => (
                    <FadeIn key={i} delay={0.3 + i * 0.1} direction="left">
                      <div className="flex items-center gap-4 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-lg text-neutral-300 font-medium">
                          {t(`problem.points.${i}`)}
                        </span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Optimization = Correction */}
        <section className="py-40 px-6 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                {t("truth.title")}
              </h2>
              <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
                {t("truth.description")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section 3: The Correction Loop */}
        <section className="py-20 px-6 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-32 text-center md:text-left">
              <FadeIn direction="right">
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-500 mb-4 block">
                  Metodología
                </span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                  {t("method.title")}
                </h2>
              </FadeIn>
            </div>

            <div className="relative space-y-32">
              {/* Vertical Path */}
              <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-neutral-800" />

              {[0, 1, 2, 3].map((i) => {
                const Icon = methodIcons[i];
                return (
                  <div key={i} className="relative pl-20 md:pl-32">
                    {/* Node Dot */}
                    <m.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute left-6 md:left-12 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20" 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-24 items-start">
                      <FadeIn direction="right">
                        <div className="space-y-2">
                          <span className="text-xs font-mono text-emerald-400/80 tracking-wider">
                            {t(`method.steps.${i}.label`)}
                          </span>
                          <h3 className="text-3xl font-bold">
                            {t(`method.steps.${i}.title`)}
                          </h3>
                        </div>
                      </FadeIn>
                      
                      <FadeIn delay={0.2}>
                        <div className="p-8 md:p-10 rounded-3xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-500">
                          <Icon className="w-10 h-10 text-emerald-500 mb-8" />
                          <p className="text-xl text-neutral-300 font-light leading-relaxed">
                            {t(`method.steps.${i}.description`)}
                          </p>
                        </div>
                      </FadeIn>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: What We Align */}
        <section className="py-40 px-6 md:px-8 relative z-10 bg-neutral-950/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {t("scope.title")}
                </h2>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="h-full p-8 rounded-3xl border border-neutral-900 bg-black/40 hover:border-neutral-700 transition-colors group">
                    <h4 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                      {t(`scope.items.${i}.title`)}
                    </h4>
                    <p className="text-neutral-400 font-light leading-relaxed">
                      {t(`scope.items.${i}.description`)}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Connection to System */}
        <section className="py-40 px-6 md:px-8 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
          
          <div className="max-w-4xl mx-auto text-center relative">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest mb-8">
                <CheckCircle2 className="w-3 h-3" />
                PARTE DEL SISTEMA NOCTRA
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                {t("noctra.title")}
              </h2>
              <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
                {t("noctra.description")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section 6: CTA */}
        <section className="py-40 px-6 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-8 md:p-20 rounded-[3rem] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] group-hover:opacity-100 opacity-50 transition-opacity duration-700" />
              
              <div className="relative space-y-12">
                <FadeIn>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                    {t("cta.title")}
                  </h2>
                  <p className="text-xl text-neutral-400 font-light">
                    {t("cta.subtitle")}
                  </p>
                </FadeIn>
                
                <FadeIn delay={0.2}>
                  <div className="flex flex-col items-center gap-6">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full h-16 px-12 text-lg bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <Link href={{ pathname: "/contact", query: { intent: "radar_diagnostic" } }}>
                        {t("cta.primary")}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="py-20 text-center border-t border-neutral-900/50">
          <p className="text-[10px] font-mono tracking-[0.5em] text-neutral-600 uppercase">
            Noctra Studio • System Optimization • 2026
          </p>
        </div>
      </main>
    </LazyMotion>
  );
}
