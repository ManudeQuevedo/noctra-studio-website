"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";

const viewport = { once: true };

export function Thesis() {
  const t = useTranslations("HomePage");

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-transparent px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <m.p
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={viewport}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400">
            {t("thesis.kicker")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            viewport={viewport}
            className="mb-12 text-4xl font-bold leading-[1.1] tracking-tight text-white md:mb-16 md:text-5xl">
            {t("thesis.title_prefix")}
            <m.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              viewport={viewport}
              className="inline-block">
              {t("thesis.title_emphasis")}
            </m.span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={viewport}
            className="mb-6 text-lg font-normal leading-relaxed text-[#F0EDE6]/85 md:text-xl">
            {t("thesis.paragraph_1")}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.30 }}
            viewport={viewport}
            className="mb-6 text-lg font-normal leading-relaxed text-[#F0EDE6]/85 md:text-xl">
            {t("thesis.paragraph_2")}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            viewport={viewport}
            className="text-lg font-normal leading-relaxed text-[#F0EDE6]/85 md:text-xl">
            {t("thesis.paragraph_3")}
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
