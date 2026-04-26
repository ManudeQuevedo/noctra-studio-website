"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";

const viewport = { once: true, margin: "-100px 0px" } as const;

export function Thesis() {
  const t = useTranslations("HomePage");

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-transparent px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={viewport}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400 will-change-transform">
            {t("thesis.kicker")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            viewport={viewport}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white will-change-transform md:text-5xl">
            {t("thesis.headline")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={viewport}
            className="mt-8 text-lg font-normal leading-relaxed text-white/70 will-change-transform md:text-xl">
            {t("thesis.problem")}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.30 }}
            viewport={viewport}
            className="mt-4 text-lg font-normal leading-relaxed text-white/70 will-change-transform md:text-xl">
            {t("thesis.consequence")}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            viewport={viewport}
            className="mt-8 text-lg font-medium leading-relaxed text-white will-change-transform md:text-xl">
            {t("thesis.positioning")}
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
