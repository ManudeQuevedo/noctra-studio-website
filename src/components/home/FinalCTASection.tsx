"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function FinalCTASection() {
  const t = useTranslations("HomeFinalCta");
  const paths = [
    {
      title: t("studio.title"),
      copy: t("studio.copy"),
      cta: t("studio.cta"),
      href: {
        pathname: "/contact" as const,
        query: { tipo: "consulta", origen: "home-final-studio" },
      },
    },
    {
      title: t("products.title"),
      copy: t("products.copy"),
      cta: t("products.cta"),
      href: "/#radar",
    },
  ];

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

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {paths.map((path, index) => (
              <div
                key={path.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                  {index === 0 ? t("studio.label") : t("products.label")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {path.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
                  {path.copy}
                </p>
                <Link
                  href={path.href as never}
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
                >
                  {path.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
