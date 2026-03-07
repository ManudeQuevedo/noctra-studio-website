"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

export function PageHero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 pb-16 text-center z-10 bg-transparent">
      <div className="max-w-7xl space-y-8 w-full z-30 relative pointer-events-auto px-6">
        <div className="mb-8 inline-flex max-w-full items-center justify-center rounded-full border border-emerald-500/20 bg-neutral-900/65 px-4 py-2 md:px-7 md:py-3 backdrop-blur-md shadow-[0_0_35px_rgba(16,185,129,0.14)] transition-all hover:border-emerald-400/35 group">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            <span className="text-[10px] md:text-sm font-black text-neutral-100 uppercase tracking-[0.14em]">
              {t("hero.trust_badge.price")}
            </span>
            <div className="w-px h-3 bg-neutral-800" />
            <span className="text-[10px] md:text-sm font-black text-emerald-400 uppercase tracking-[0.16em] animate-[pulse_3s_ease-in-out_infinite]">
              {t("hero.trust_badge.guarantee")}
            </span>
            <div className="w-px h-3 bg-neutral-800" />
            <span className="text-[10px] md:text-sm font-semibold text-neutral-200 uppercase tracking-[0.14em]">
              {t("hero.trust_badge.founder")}
            </span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight text-white">
          {t("hero.title")}
        </h1>

        <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button
            asChild
            size="lg"
            className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
            <Link href={{ pathname: "/contact", query: { tipo: "consulta" } }}>
              {t("cta_start")}
            </Link>
          </Button>
          <Button
            onClick={() => scrollToId("process")}
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 text-base border-neutral-500/90 bg-white/[0.03] text-neutral-100 hover:text-white hover:border-white hover:bg-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
            {t("cta_work")}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-400 animate-bounce">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
