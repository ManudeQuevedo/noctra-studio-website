"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Check, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function SocialProofSection() {
  const t = useTranslations("SocialProof");
  const benefits = t.raw("benefits") as string[];
  const partnershipItems = t.raw("partnership.items") as string[];

  return (
    <LazyMotion features={domAnimation}>
      <section className="w-full px-6 md:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-8 md:p-12 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-950 to-neutral-900 overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/[0.03] rounded-full blur-3xl" />

            <div className="relative space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-emerald-500 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>{t("badge")}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {t("spots_remaining")}
                  </div>
                </div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  {t("title")}
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
                  {t("subtitle")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Benefits checklist */}
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <m.div
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-neutral-200 text-sm md:text-base font-medium">
                        {benefit}
                      </span>
                    </m.div>
                  ))}
                </div>

                {/* Partnership Block */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-emerald-500/20 relative">
                  <h3 className="text-[10px] font-mono font-black text-emerald-500 uppercase tracking-widest mb-4">
                    {t("partnership.title")}
                  </h3>
                  <div className="space-y-3">
                    {partnershipItems.map((item, i) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                        <p className="text-neutral-300 text-xs font-medium leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </m.div>
              </div>

              {/* Strategic Note / Why? */}
              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <p className="text-neutral-400 text-sm leading-relaxed">
                  <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px] block mb-2">
                    Strategic Partnership
                  </span>
                  {t("transparency")}
                </p>
              </div>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className="rounded-2xl h-14 px-6 sm:px-10 text-sm sm:text-base bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 w-full sm:w-auto font-bold shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]">
                <Link
                  href={{
                    pathname: "/contact",
                    query: { tipo: "socio-fundador", descuento: "25" },
                  }}>
                  {t("cta")}
                </Link>
              </Button>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
