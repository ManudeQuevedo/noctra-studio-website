"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Building2, CalendarDays, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const viewport = { once: true, margin: "-10%" } as const;

type PackageRow = {
  name: string;
  stage: string;
  price: string;
  badge?: string;
  highlight?: boolean;
};

export function PricingAnchorSection() {
  const t = useTranslations("HomePage.pricingAnchor");
  const packages = t.raw("packages") as PackageRow[];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="inversion"
        className="scroll-mt-28 bg-[#050505] px-6 py-20 md:px-8 md:py-[120px]">
        <div className="mx-auto max-w-6xl">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={viewport}
            className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400 will-change-transform md:text-left">
            {t("label")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            viewport={viewport}
            className="mb-4 text-center text-3xl font-bold leading-[1.1] tracking-tight text-white will-change-transform md:text-left md:text-4xl">
            {t("headline")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            viewport={viewport}
            className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-neutral-400 will-change-transform md:mx-0 md:mb-16 md:text-left md:text-lg">
            {t("subheadline")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={viewport}
            className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0 md:divide-white/10">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col items-center px-0 py-10 text-center md:items-stretch md:px-6 md:py-8 md:text-left md:first:pl-0 md:last:pr-0">
                <div className="flex flex-col items-center gap-2 md:items-start">
                  <div className="flex min-h-6 items-center justify-center gap-2 md:justify-start">
                    <span
                      className={
                        pkg.highlight
                          ? "h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.45)]"
                          : "invisible h-1.5 w-1.5 shrink-0"
                      }
                      aria-hidden
                    />
                    <h3 className="text-xl font-medium text-white md:text-[1.05rem] lg:text-xl">
                      {pkg.name}
                    </h3>
                  </div>
                  <p className="text-sm uppercase tracking-wide text-white/50">
                    {pkg.stage}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white md:text-[1.35rem] lg:text-2xl">
                    {pkg.price}
                  </p>
                  {pkg.badge ? (
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400/90">
                      {pkg.badge}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </m.div>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
            viewport={viewport}
            className="mt-12 text-center text-sm text-neutral-400 md:mt-14 md:text-left md:text-base">
            {t("support_line")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.31 }}
            viewport={viewport}
            className="mt-8 mb-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/40 md:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <CreditCard
                className="size-3.5 shrink-0 text-white/30"
                aria-hidden
              />
              {t("payment_indicator_stripe")}
            </span>
            <span className="select-none text-white/20" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2
                className="size-3.5 shrink-0 text-white/30"
                aria-hidden
              />
              {t("payment_indicator_transfer")}
            </span>
            <span className="select-none text-white/20" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays
                className="size-3.5 shrink-0 text-white/30"
                aria-hidden
              />
              {t("payment_indicator_msi")}
            </span>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.34 }}
            viewport={viewport}
            className="flex justify-center md:justify-start">
            <Link
              href="/services"
              className="inline-flex rounded-full border border-white/15 bg-white/3 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-emerald-500/35 hover:bg-white/6 md:px-7 md:text-base">
              {t("cta")}
            </Link>
          </m.div>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={viewport}
            className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/30 md:mx-0 md:text-left">
            {t("philosophy")}
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
