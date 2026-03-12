"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function FinalCTASection() {
  const t = useTranslations("HomeFinalCta");

  return (
    <LazyMotion features={domAnimation}>
      <section className="px-6 pb-24 md:px-8 md:pb-32">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-10 md:p-14">
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
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={{ pathname: "/contact", query: { tipo: "consulta" } }}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-neutral-200">
              {t("primary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.06]">
              {t("secondary")}
            </Link>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
