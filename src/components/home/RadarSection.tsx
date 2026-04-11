"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Search, ShieldCheck, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function RadarSection() {
  const t = useTranslations("HomePage.radar");
  const points = t.raw("points") as string[];
  const surfaces = t.raw("surfaces") as string[];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="radar"
        className="relative overflow-hidden border-t border-white/5 bg-neutral-950 px-6 py-24 md:px-8 md:py-32"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/6 blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <m.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-[2rem] bg-emerald-500/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                  <Image
                    src="/images/products/noctra-seo.png"
                    alt="Noctra Radar Interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="pointer-events-none absolute inset-x-5 bottom-5 hidden gap-3 md:grid">
                  <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-neutral-950/85 p-4 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                          {t("overlay_label")}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {t("overlay_title")}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {surfaces.slice(0, 4).map((surface) => (
                        <div
                          key={surface}
                          className="rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-3 text-sm text-neutral-200"
                        >
                          {surface}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
                  {t("tagline")}
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {t("title")}
                </h2>
                <p className="text-lg leading-relaxed text-neutral-300 md:text-xl">
                  {t("copy")}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {surfaces.map((surface) => (
                  <div
                    key={surface}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-neutral-200"
                  >
                    {surface}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <Search className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                    <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.6rem] border border-emerald-400/15 bg-emerald-400/8 p-5">
                <div className="flex items-start gap-3">
                  <TriangleAlert className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                      {t("support_label")}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-100 md:text-base">
                      {t("support_copy")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-full bg-white px-8 text-base font-bold text-black transition-all duration-300 hover:bg-emerald-500 hover:text-white"
                >
                  <Link
                    href={{
                      pathname: "/contact",
                      query: { tipo: "radar", origen: "home-radar" },
                    }}
                  >
                    {t("primary_cta")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-full border-white/10 bg-white/[0.03] px-8 text-base font-semibold text-white hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <Link href={{ pathname: "/", hash: "the-system" }}>
                    {t("secondary_cta")}
                  </Link>
                </Button>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
