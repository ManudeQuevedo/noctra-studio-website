"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LazyMotion, domAnimation, m } from "framer-motion";

export function PageHero() {
  const t = useTranslations("HomePage");
  const heroTitleLines = [
    t("hero.titleLine1"),
    t("hero.titleLine2"),
    t("hero.titleLine3"),
  ].filter((line) => line.trim().length > 0);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative z-10 flex min-h-screen flex-col justify-center overflow-x-hidden bg-transparent px-6 pt-24 pb-20 md:px-8 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32">
        <div className="mx-auto min-w-0 w-full max-w-6xl text-center">
          <m.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 text-xs font-medium uppercase tracking-widest text-white/50 md:text-sm lg:whitespace-nowrap">
            <span className="lg:hidden">{t("hero.labelMobile")}</span>
            <span className="hidden lg:inline">{t("hero.labelDesktop")}</span>
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.06 }}
            className="mx-auto w-full max-w-5xl text-[clamp(1.35rem,4.2vw+0.85rem,3.75rem)] font-black leading-[0.95] tracking-[-0.02em] text-white normal-case lg:text-7xl xl:text-8xl 2xl:text-9xl">
            {heroTitleLines.map((line, index) => (
              <span key={index} className="block normal-case">
                {line}
              </span>
            ))}
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl md:mt-8 md:text-2xl">
            {t("hero.subtitle")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
            className="mt-10 flex flex-col items-center gap-4 md:mt-12">
            <Link
              href="/diagnostico"
              className="inline-flex min-h-[56px] w-full min-w-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-5 text-center text-base font-semibold text-black whitespace-nowrap transition-all hover:bg-white/90 active:scale-[0.98] sm:w-auto sm:px-10 sm:text-lg">
              {t("hero.primary_cta")}
            </Link>
            <p className="max-w-md text-center text-sm leading-snug text-white/45 sm:text-white/50">
              {t("hero.social_proof")}
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
