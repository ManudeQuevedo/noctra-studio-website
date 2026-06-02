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
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-transparent px-4 pt-[200px] pb-[120px] sm:px-6 md:px-8">
        <div className="mx-auto min-w-0 w-full max-w-[1280px] text-center">
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.06 }}
            className="mx-auto w-full max-w-none px-0 py-1 text-[clamp(2rem,11.2vw+0.28rem,4.6rem)] font-black leading-[1.08] tracking-[-0.035em] text-white normal-case text-balance sm:text-[clamp(2.2rem,8.8vw+0.8rem,4.6rem)] md:leading-[1.08] md:tracking-[-0.03em] lg:max-w-6xl lg:py-2 lg:text-[3.8rem] xl:text-[5.1rem] 2xl:text-[6.8rem]">
            {heroTitleLines.map((line, index) => (
              <span key={index} className="block normal-case text-balance">
                {line}
              </span>
            ))}
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="mx-auto mt-5 max-w-md text-pretty text-base font-normal leading-relaxed text-white/60 sm:mt-6 sm:max-w-lg sm:text-lg md:mt-7 md:max-w-xl md:text-xl lg:mt-8 lg:text-white/70">
            {t("hero.subtitle")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
            className="mt-8 flex flex-col items-center gap-3 sm:mt-9 sm:gap-4 md:mt-10 md:mt-12">
            <Link
              href="/diagnostico"
              className="inline-flex min-h-[56px] w-full min-w-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-5 text-center text-base font-semibold text-black whitespace-nowrap transition-all hover:bg-white/90 active:scale-[0.98] sm:w-auto sm:px-10 sm:text-lg">
              {t("hero.primary_cta")}
            </Link>
            <p className="max-w-md text-center text-sm leading-snug text-white/55 sm:text-white/60">
              {t("hero.social_proof")}
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
