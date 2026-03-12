"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function BrandNarrativeSection() {
  const t = useTranslations("HomeNarrative");

  return (
    <LazyMotion features={domAnimation}>
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              {t("intro")}
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-300">
              {t("closing")}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-5 md:grid-cols-2">
            <article className="rounded-[2rem] border border-neutral-800 bg-neutral-950/90 p-8">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-black/40">
                <Image
                  src="/noctra-studio-icon-dark-theme.svg"
                  alt="Noctra Studio moon logo"
                  width={44}
                  height={44}
                  className="h-11 w-11"
                />
              </div>
              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                {t("moon.title")}
              </h3>
              <p className="text-base leading-relaxed text-neutral-400">
                {t("moon.description")}
              </p>
            </article>

            <article className="rounded-[2rem] border border-neutral-800 bg-neutral-950/90 p-8">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-black/40">
                <div className="h-11 w-11 rounded-lg border border-white bg-transparent" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                {t("square.title")}
              </h3>
              <p className="text-base leading-relaxed text-neutral-400">
                {t("square.description")}
              </p>
            </article>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
