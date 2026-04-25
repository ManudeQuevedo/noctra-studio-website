"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const viewport = { once: true, margin: "-100px 0px" } as const;
const cardViewport = { once: true, margin: "-80px 0px" } as const;

type ServiceCard = {
  number: string;
  name: string;
  description: string;
  price: string;
  href: "/services" | "/services/professional-websites" | "/services/optimization" | "/services/custom-systems";
};

export function Services() {
  const t = useTranslations("HomePage.services");

  const items: ServiceCard[] = [
    {
      number: "01",
      name: t("item_01_name"),
      description: t("item_01_description"),
      price: t("item_01_price"),
      href: "/services",
    },
    {
      number: "02",
      name: t("item_02_name"),
      description: t("item_02_description"),
      price: t("item_02_price"),
      href: "/services/professional-websites",
    },
    {
      number: "03",
      name: t("item_03_name"),
      description: t("item_03_description"),
      price: t("item_03_price"),
      href: "/services/optimization",
    },
    {
      number: "04",
      name: t("item_04_name"),
      description: t("item_04_description"),
      price: t("item_04_price"),
      href: "/services/custom-systems",
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section id="services" className="bg-transparent px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={viewport}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400 will-change-transform"
          >
            {t("kicker")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            viewport={viewport}
            className="mb-4 text-3xl font-bold leading-[1.1] tracking-tight text-white will-change-transform md:text-4xl"
          >
            {t("title")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            viewport={viewport}
            className="mb-12 text-base text-neutral-400 will-change-transform md:mb-16 md:text-lg"
          >
            {t("subtitle")}
          </m.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <m.article
                key={item.number}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                viewport={cardViewport}
                className="rounded-xl border border-white/[0.08] bg-[rgba(16,185,129,0.03)] p-6 transition-[transform,border-color,background-color] duration-200 will-change-transform hover:-translate-y-0.5 hover:border-emerald-500/30"
              >
                <span className="text-[11px] text-neutral-600">{item.number}</span>

                <h3 className="mt-4 text-lg font-semibold text-white">{item.name}</h3>

                <p className="mt-2 text-[13px] leading-relaxed text-neutral-400">
                  {item.description}
                </p>

                <p className="mt-4 border-t border-white/[0.06] pt-4 text-sm font-medium text-emerald-400">
                  {item.price}
                </p>

                <Link
                  href={item.href}
                  className="mt-5 inline-flex text-sm font-semibold text-white transition-colors hover:text-emerald-400"
                >
                  {t("item_cta")}
                </Link>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
