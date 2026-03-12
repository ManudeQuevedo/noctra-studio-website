"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function AboutPreviewSection() {
  const t = useTranslations("HomeAbout");
  const rawPoints = t.raw("points") as string[] | Record<string, string>;
  const points = Array.isArray(rawPoints)
    ? rawPoints
    : Object.values(rawPoints ?? {});

  return (
    <LazyMotion features={domAnimation}>
      <section className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              {t("paragraph_one")}
            </p>
            <p className="max-w-3xl text-lg leading-relaxed text-neutral-300">
              {t("paragraph_two")}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-emerald-300">
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </m.div>

          <m.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[2rem] border border-neutral-800 bg-neutral-950/90 p-8">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
              {t("panel_label")}
            </p>
            <ul className="space-y-4">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-base leading-relaxed text-neutral-300">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </m.aside>
        </div>
      </section>
    </LazyMotion>
  );
}
