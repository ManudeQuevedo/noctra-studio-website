"use client";

import { useTranslations } from "next-intl";
import { HeroSystemPanel } from "@/components/hero/HeroSystemPanel";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export function PageHero() {
  const t = useTranslations("HomePage");

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative z-10 overflow-hidden bg-transparent px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-40 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
          {/* Left Content Column (60% approx) */}
          <div className="flex flex-col items-start gap-6 md:gap-7">
            <m.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                {t("hero.label")}
              </span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
              className="max-w-4xl text-5xl font-black tracking-[-0.015em] text-white leading-[1.05] md:text-7xl lg:text-[4.5rem] lg:leading-[1.05]">
              {t.rich("hero.title", {
                br: () => <br className="hidden lg:block" />,
              })}
            </m.h1>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.16 }}
              className="max-w-xl space-y-2.5">
              <p className="text-lg leading-relaxed text-neutral-300 md:text-xl lg:leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <a
                href="#por-tipo-de-negocio"
                className="block text-sm text-emerald-400 hover:underline">
                {t("hero.audience_anchor")}
              </a>
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.22 }}
              className="max-w-xl text-sm text-neutral-500">
              {t.rich("hero.product_anchor", {
                strong: (chunks) => (
                  <span className="font-semibold text-neutral-300">
                    {chunks}
                  </span>
                ),
              })}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
              className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4 lg:gap-4">
              <Button
                asChild
                size="lg"
                className="group h-14 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-emerald-500 hover:text-white sm:w-auto">
                <Link
                  href={{
                    pathname: "/contact",
                    query: { tipo: "diagnostico", origen: "hero" },
                  }}>
                  {t("hero.primary_cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-white/10 bg-white/[0.03] px-8 text-base font-semibold text-white transition-all hover:border-white/30 hover:bg-white/[0.08] sm:w-auto">
                <Link href={{ pathname: "/", hash: "what-noctra-does" }}>
                  {t("hero.secondary_cta")}
                </Link>
              </Button>
            </m.div>
          </div>

          {/* Right System Panel (40% approx) */}
          <HeroSystemPanel />
        </div>
      </section>
    </LazyMotion>
  );
}
