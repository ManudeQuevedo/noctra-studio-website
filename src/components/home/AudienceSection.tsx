"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Home,
  Rocket,
} from "lucide-react";

const icons = [
  BriefcaseBusiness,
  Building2,
  Rocket,
  GraduationCap,
  Home,
];

export function AudienceSection() {
  const t = useTranslations("HomeAudience");
  const rawItems = t.raw("items") as
    | Array<{
        title: string;
        description: string;
      }>
    | Record<
        string,
        {
          title: string;
          description: string;
        }
      >;
  const items = Array.isArray(rawItems)
    ? rawItems
    : Object.values(rawItems ?? {});

  const normalizedItems = items as Array<{
    title: string;
    description: string;
  }>;

  return (
    <LazyMotion features={domAnimation}>
      <section className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-3xl space-y-5">
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

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {normalizedItems.map((item, index) => {
              const Icon = icons[index] ?? Building2;

              return (
                <m.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[1.75rem] border border-neutral-800 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
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
