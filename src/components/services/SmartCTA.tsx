"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";

interface SmartCTAProps {
  activePhase: string;
}

export function SmartCTA({ activePhase }: SmartCTAProps) {
  const t = useTranslations("ServicesPage.smart_cta");
  const points = t.raw("points") as string[];

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="rounded-[3rem] border border-emerald-500/20 bg-neutral-900/40 p-12 text-center backdrop-blur-xl md:p-16">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <h2 className="mb-6 text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
                {t("subtitle")}
              </p>

              <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
                {points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-200">
                    {point}
                  </span>
                ))}
              </div>

              <div className="flex justify-center">
                <Link
                  href={{
                    pathname: "/contact",
                    query: {
                      intent: "discovery",
                      capability: activePhase,
                      cta: "services_final",
                    },
                  }}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 font-black text-black shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)] transition-all group hover:bg-emerald-50 active:scale-95">
                  <Calendar className="h-5 w-5" />
                  {t("primary_cta")}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-emerald-500/80">
                {t("note")}
              </p>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
