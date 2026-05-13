"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";

const viewport = { once: true, margin: "-10%" } as const;

export function Thesis() {
  const t = useTranslations("HomePage");

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-transparent px-6 py-20 md:px-8 md:py-[120px]">
        <div className="mx-auto max-w-4xl">
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
            className="text-3xl font-bold leading-[1.08] tracking-tight text-white will-change-transform sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.05]">
            {t("thesis.headline")}
          </m.h2>

          <div className="mt-8 max-w-2xl space-y-6">
            <m.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              viewport={viewport}
              className="text-lg font-normal leading-relaxed text-white/70 will-change-transform">
              {t("thesis.problem")}
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
              viewport={viewport}
              className="text-lg font-normal leading-relaxed text-white/70 will-change-transform">
              {t("thesis.consequence")}
            </m.p>
          </div>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={viewport}
            className="mt-10 max-w-2xl border-l-2 border-emerald-500 pl-5 text-xl font-semibold leading-relaxed text-white will-change-transform">
            {t("thesis.positioning")}
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
