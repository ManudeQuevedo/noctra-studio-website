"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function FinalCTASection() {
  const t = useTranslations("HomeFinalCta");

  return (
    <LazyMotion features={domAnimation}>
      <section className="px-6 pt-0 pb-20 md:px-8 md:pb-[120px]">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-12 max-w-7xl overflow-hidden rounded-[2.5rem] border border-neutral-800 bg-linear-to-br from-neutral-900 via-black to-neutral-950 p-10 will-change-transform md:mt-16 md:p-14">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-300 md:text-xl">
              {t("subtitle")}
            </p>
            <Link
              href={{
                pathname: "/contact",
                query: { tipo: "diagnostico", origen: "home-final" },
              }}
              className="mt-4 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400">
              {t("cta")}
            </Link>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
