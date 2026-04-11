"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { CheckCircle2, Layers, Network, Zap, ShieldCheck, ArrowRight } from "lucide-react";
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

export default function TechnologyClient() {
  const t = useTranslations("TechnologyPage");

  const blueprintIcons = [ShieldCheck, Layers, Network];

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-transparent text-neutral-50 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full" />
        </div>

        {/* Hero: The Hook */}
        <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-8 relative z-10 pt-20">
          <div className="max-w-5xl mx-auto w-full">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-4 text-center"
            >
              <m.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 block"
              >
                Paradigma Noctra
              </m.span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                {t("hero.title")}
                <br />
                <span className="text-emerald-400 italic font-serif leading-normal inline-block mt-2">
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
            </m.div>
          </div>

          {/* Scroll Indicator */}
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-neutral-500"
          >
            <span className="text-[10px] uppercase tracking-widest font-mono">Blueprint</span>
            <div className="w-px h-12 bg-gradient-to-b from-emerald-500/50 to-transparent" />
          </m.div>
        </section>

        {/* Part 1: The Real Problem */}
        <section className="py-32 px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
              <FadeIn direction="right">
                <h2 className="text-2xl font-bold tracking-tight text-emerald-400">
                  {t("problem.title")}
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-2xl md:text-3xl font-light text-neutral-200 leading-snug">
                  {t("problem.copy")}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Part 2: The Blueprint (Core Steps) */}
        <section className="py-20 px-6 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-24 text-center">
              <FadeIn>
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-500 mb-4 block">
                  {t("blueprint.label")}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {t("blueprint.title")}
                </h2>
              </FadeIn>
            </div>

            {/* Vertical Flow Container */}
            <div className="relative space-y-32 md:space-y-48">
              {/* Vertical Connector Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 hidden md:block" />

              {[0, 1, 2].map((i) => {
                const Icon = blueprintIcons[i];
                const isEven = i % 2 === 0;

                return (
                  <div key={i} className="relative">
                    {/* Node Dot */}
                    <m.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20" 
                    />

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}>
                      <div className={`${isEven ? "md:text-right" : "md:order-2 md:text-left"} pl-12 md:pl-0`}>
                        <FadeIn direction={isEven ? "right" : "left"}>
                          <span className="text-xs font-mono text-emerald-400/80 mb-2 block tracking-wider">
                            {t(`blueprint.items.${i}.label`)}
                          </span>
                          <h3 className="text-3xl md:text-4xl font-bold mb-6">
                            {t(`blueprint.items.${i}.title`)}
                          </h3>
                          <p className="text-lg text-neutral-400 font-light leading-relaxed max-w-md ml-auto mr-0 md:mx-0">
                            {t(`blueprint.items.${i}.explanation`)}
                          </p>
                        </FadeIn>
                      </div>

                      <div className={`${isEven ? "md:order-2" : "md:text-right"} pl-12 md:pl-0 pt-4 md:pt-16`}>
                        <FadeIn delay={0.2} direction={isEven ? "left" : "right"}>
                          {/* Business Card Component */}
                          <div className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
                            <Icon className="w-8 h-8 text-emerald-500 mb-6" />
                            
                            <div className="space-y-6">
                              <div>
                                <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2 font-mono">{t("blueprint.example_label")}</span>
                                <p className="text-neutral-300 italic">"{t(`blueprint.items.${i}.example`)}"</p>
                              </div>
                              
                              <div className="pt-6 border-t border-neutral-800/50">
                                <span className="text-[10px] uppercase tracking-widest text-emerald-400 block mb-2 font-mono">{t("blueprint.impact_label")}</span>
                                <p className="text-neutral-100 font-medium">{t(`blueprint.items.${i}.impact`)}</p>
                              </div>
                            </div>
                          </div>
                        </FadeIn>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Part 3: Connection to Noctra Ecosistem */}
        <section className="py-40 px-6 md:px-8 bg-neutral-950/30 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
          
          <div className="max-w-4xl mx-auto text-center relative">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest mb-8">
                <CheckCircle2 className="w-3 h-3" />
                {t("system.label")}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                {t("system.title")}
              </h2>
              <p className="text-xl text-neutral-400 font-light mb-12">
                {t("system.subtitle")}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="p-8 rounded-3xl border border-neutral-800 bg-black/40 backdrop-blur-xl">
                <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed">
                  {t("system.radar_note")}
                </p>
                
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                    Next.js + Vercel
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                    Framer Motion
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                    Noctra Radar SDK
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400/80">
                    Proprietary Stack
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA: Diagnosis */}
        <section className="py-32 px-6 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700" />
              
              <div className="max-w-2xl relative">
                <FadeIn direction="right">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    {t("cta.title")}
                  </h2>
                  <p className="text-xl text-neutral-400 font-light mb-12">
                    {t("cta.subtitle")}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full h-14 px-8 text-base bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300"
                    >
                      <Link href={{ pathname: "/contact", query: { intent: "radar_diagnostic" } }}>
                        {t("cta.primary")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-full h-14 px-8 text-base border-neutral-700 hover:bg-neutral-800 transition-all duration-300"
                    >
                      <Link href="/about">
                        {t("cta.secondary")}
                      </Link>
                    </Button>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="py-20 text-center border-t border-neutral-900">
          <p className="text-[10px] font-mono tracking-[0.5em] text-neutral-600 uppercase">
            Noctra Studio • Technology Explained • 2026
          </p>
        </div>
      </main>
    </LazyMotion>
  );
}
