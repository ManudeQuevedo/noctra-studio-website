"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Bot, Palette, Search, Workflow, Wrench } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

const icons = [Palette, Wrench, Search, Bot, Workflow];
const prices = [
  "Desde $15,000 MXN",
  "Desde $25,000 MXN",
  "Desde $12,000 MXN",
  "Desde $18,000 MXN",
  "Desde $80,000 MXN",
];

export function HybridModelSection() {
  const t = useTranslations("HomePage.hybrid_model");
  const items = t.raw("items") as Array<{ title: string; description: string }>;
  const modelPoints = t.raw("model_points") as string[];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="what-noctra-does"
        className="relative overflow-hidden border-t border-white/5 bg-black px-6 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <m.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
                  {t("label")}
                </p>
                <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {t("title")}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                  {t("subtitle")}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item, index) => {
                  const Icon = icons[index] ?? Workflow;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                        <Icon className="h-5 w-5 text-emerald-300" />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                        {item.description}
                      </p>
                      <p className="mt-3 border-t border-white/8 pt-3 text-xs text-neutral-500">
                        {prices[index]}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-white/10 bg-white/[0.03] px-8 text-base font-semibold text-white hover:border-white/30 hover:bg-white/[0.06]"
              >
                <Link href="/services">
                  {t("cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-950 to-emerald-950/15 p-7 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                <div className="rounded-[1.6rem] border border-white/8 bg-black/25 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-300">
                    {t("model_label")}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {t("model_title")}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400 md:text-base">
                    {t("model_copy")}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {modelPoints.map((point, index) => (
                    <div
                      key={point}
                      className="flex items-start gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-4 py-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-xs font-bold text-emerald-300">
                        0{index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                    {t("note_label")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300 md:text-base">
                    {t("note")}
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
