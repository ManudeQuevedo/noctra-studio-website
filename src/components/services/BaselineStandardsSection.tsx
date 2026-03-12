"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { CheckCircle2, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

export function BaselineStandardsSection() {
  const t = useTranslations("ServicesPage.baseline_standards");

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 px-6 border-t border-neutral-900 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("title")}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-500">
                  {t("left_title")}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(t.raw("left_items") as string[]).map((item) => (
                  <div key={item} className="flex items-start gap-4 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span className="text-neutral-200 font-medium leading-tight group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="p-8 md:p-12 rounded-3xl border border-amber-500/20 bg-amber-500/5 space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-amber-500">
                  {t("right_title")}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(t.raw("right_items") as string[]).map((item) => (
                  <div key={item} className="flex items-start gap-4 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                      <span className="text-[10px] font-bold text-amber-500">
                        $$
                      </span>
                    </div>
                    <span className="text-neutral-400 leading-tight group-hover:text-neutral-300 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
