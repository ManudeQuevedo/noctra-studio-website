"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  Bot,
  Search,
  Sparkles,
  SquareStack,
  TrendingUp,
  Zap,
} from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const systemIcons = [SquareStack, Search, Bot, TrendingUp];

export function PageHero() {
  const t = useTranslations("HomePage");

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative z-10 overflow-hidden bg-transparent px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-40 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-24">
          {/* Left Content Column (60% approx) */}
          <div className="flex flex-col">
            <m.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                {t("hero.label")}
              </span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
              className="mb-8 max-w-4xl text-5xl font-black tracking-[-0.04em] text-white md:text-7xl lg:text-[4.5rem] lg:leading-[1.1]">
              {t.rich("hero.title", {
                br: () => <br className="hidden lg:block" />,
              })}
            </m.h1>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.16 }}
              className="mb-4 space-y-4">
              <p className="max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl lg:leading-relaxed">
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
              className="mb-8 text-sm text-neutral-500">
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
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-emerald-500 hover:text-white sm:w-auto">
                <Link
                  href={{
                    pathname: "/contact",
                    query: { tipo: "diagnostico", origen: "hero" },
                  }}>
                  {t("hero.primary_cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-white/10 bg-white/[0.03] px-8 text-base font-semibold text-white transition-all hover:border-white/20 hover:bg-white/[0.08] sm:w-auto">
                <Link href={{ pathname: "/", hash: "what-noctra-does" }}>
                  {t("hero.secondary_cta")}
                </Link>
              </Button>
            </m.div>
          </div>

          {/* Right System Panel (40% approx) */}
          <m.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.14 }}
            className="relative">
            <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-950/95 via-neutral-950/85 to-emerald-950/20 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
              {/* Box Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                    {t("hero.visual_label")}
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                    {t("hero.visual_title")}
                  </p>
                </div>
              </div>

              {/* Bento Grid (Radar vs Studio) */}
              <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
                {/* Radar Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-3 py-2">
                    <div className="h-1 w-1 animate-pulse rounded-full bg-rose-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-rose-400">
                      Radar: Detectando
                    </p>
                  </div>

                  {[
                    { label: "Baja autoridad digital", status: "CRÍTICO" },
                    { label: "Fugas de conversión", status: "ALERTA" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/5 bg-black/40 p-4 transition-colors hover:border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-neutral-400">
                          {item.label}
                        </span>
                        <span className="text-[9px] font-black tracking-tighter text-rose-500/80">
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-neutral-900">
                        <m.div
                          initial={{ width: 0 }}
                          animate={{ width: "35%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-rose-500/40"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Studio Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                    <div className="h-1 w-1 rounded-full bg-emerald-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                      Studio: Resolviendo
                    </p>
                  </div>

                  {[
                    { label: "Branding de alta gama", icon: Sparkles },
                    { label: "Web optimizada + conversión", icon: Zap },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm transition-all hover:bg-white/[0.08]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                        <item.icon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <span className="text-[12px] font-semibold text-white">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Single Strong Metric */}
              <div className="mt-8 rounded-2xl border border-white/5 bg-black/40 py-5 text-center">
                <m.p
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-3xl font-black text-white">
                  {t("hero.metric_value")}
                </m.p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                  {t("hero.metric_label")}
                </p>
              </div>
            </div>
            <p className="mt-3 px-2 text-xs leading-relaxed text-neutral-600">
              {t("hero.metric_footnote")}
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
