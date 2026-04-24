"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";

const viewport = { once: true } as const;

type ServiceCard = {
  number: string;
  name: string;
  description: string;
  bullets: string[];
  price: string;
};

export function Services() {
  const t = useTranslations("HomePage.services");
  const modelPoints = t.raw("model_points") as string[];

  const items: ServiceCard[] = [
    {
      number: "01",
      name: t("item_01_name"),
      description: t("item_01_description"),
      bullets: t.raw("item_01_bullets") as string[],
      price: t("item_01_price"),
    },
    {
      number: "02",
      name: t("item_02_name"),
      description: t("item_02_description"),
      bullets: t.raw("item_02_bullets") as string[],
      price: t("item_02_price"),
    },
    {
      number: "03",
      name: t("item_03_name"),
      description: t("item_03_description"),
      bullets: t.raw("item_03_bullets") as string[],
      price: t("item_03_price"),
    },
    {
      number: "04",
      name: t("item_04_name"),
      description: t("item_04_description"),
      bullets: t.raw("item_04_bullets") as string[],
      price: t("item_04_price"),
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section id="services" className="bg-transparent px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <m.p
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={viewport}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400"
          >
            {t("kicker")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            viewport={viewport}
            className="mb-4 text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl"
          >
            {t("title")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            viewport={viewport}
            className="mb-12 text-base text-neutral-400 md:mb-16 md:text-lg"
          >
            {t("subtitle")}
          </m.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <m.article
                key={item.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={viewport}
                className="rounded-xl border border-white/[0.08] bg-[rgba(16,185,129,0.03)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30"
              >
                <span className="text-[11px] text-neutral-600">{item.number}</span>

                <h3 className="mt-4 text-lg font-semibold text-white">{item.name}</h3>

                <p className="mt-2 text-[13px] leading-relaxed text-neutral-400">
                  {item.description}
                </p>

                <ul className="mt-4 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start">
                      <div className="mt-1.5 mr-3 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span className="text-[13px] text-neutral-400">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border-t border-white/[0.06] pt-4 text-sm font-medium text-emerald-400">
                  {item.price}
                </p>
              </m.article>
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={viewport}
            className="mt-16 rounded-xl border border-white/[0.08] bg-[rgba(16,185,129,0.03)] p-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("model_kicker")}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">{t("model_title")}</h3>

            <p className="mt-2 text-sm text-neutral-400">{t("model_subtitle")}</p>

            <div className="mt-6 space-y-4">
              {modelPoints.map((point, index) => (
                <div key={point} className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 text-xs font-bold text-emerald-400">
                    0{index + 1}
                  </div>
                  <p className="text-sm text-neutral-300">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-6">
              <p className="text-[9px] uppercase tracking-widest text-emerald-400">
                {t("quick_read_label")}
              </p>
              <p className="mt-2 text-sm text-neutral-400">{t("quick_read_text")}</p>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
