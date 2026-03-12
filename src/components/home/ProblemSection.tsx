"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { CircleOff, SearchX, ShieldAlert, Workflow } from "lucide-react";

const icons = [CircleOff, ShieldAlert, SearchX, Workflow];

export function ProblemSection() {
  const t = useTranslations("HomeProblem");
  const rawItems = t.raw("items") as
    | Array<{
        title: string;
        description: string;
      }>
    | Record<string, { title: string; description: string }>;

  const items = Array.isArray(rawItems)
    ? rawItems
    : Object.values(rawItems ?? {});

  return (
    <LazyMotion features={domAnimation}>
      <section className="border-t border-white/5 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-3xl space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-400 md:text-xl">
              {t("subtitle")}
            </p>
          </m.div>

          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item, index) => {
              const Icon = icons[index] ?? CircleOff;

              return (
                <m.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[2rem] border border-neutral-800 bg-neutral-950/80 p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-400 md:text-lg">
                    {item.description}
                  </p>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
