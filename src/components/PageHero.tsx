"use client";

import { useTranslations } from "next-intl";
import { HeroSystemPanel } from "@/components/hero/HeroSystemPanel";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Sparkles } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export function PageHero() {
  const t = useTranslations("HomePage");

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative z-10 overflow-hidden bg-transparent px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-40 lg:pt-44">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-24">
          {/* Left Content Column (60% approx) */}
          <div className="flex min-w-0 flex-col items-start gap-6 md:gap-7">
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
              className="max-w-4xl text-5xl font-black leading-[1.05] tracking-[-0.015em] text-white break-words md:text-7xl lg:text-[4.5rem] lg:leading-[1.05]">
              {t.rich("hero.title", {
                br: () => (
                  <>
                    <span className="lg:hidden"> </span>
                    <br className="hidden lg:block" />
                  </>
                ),
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
