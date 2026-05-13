"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";

const viewport = { once: true, margin: "-10%" } as const;
const cardViewport = { once: true, margin: "-10%" } as const;

export function AudienceSection() {
  const t = useTranslations("HomePage.solutions");
  const items = t.raw("items") as Array<{
    name: string;
    short_description: string;
  }>;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="social"
        className="scroll-mt-28 bg-transparent px-6 py-20 md:px-8 md:py-[120px]">
        <div className="mx-auto max-w-6xl">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={viewport}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400 will-change-transform">
            {t("label")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            viewport={viewport}
            className="mb-4 text-3xl font-bold leading-[1.1] tracking-tight text-white will-change-transform md:text-4xl">
            {t("title")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            viewport={viewport}
            className="mb-12 text-base text-neutral-400 will-change-transform md:mb-16 md:text-lg">
            {t("subtitle")}
          </m.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {items.map((item, index) => (
              <m.article
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                viewport={cardViewport}
                className="rounded-xl border border-white/[0.08] bg-[rgba(16,185,129,0.03)] p-5 transition-colors duration-200 will-change-transform hover:border-emerald-500/30">
                <h3 className="text-base font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-2 truncate text-[13px] text-neutral-400">
                  {item.short_description}
                </p>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
