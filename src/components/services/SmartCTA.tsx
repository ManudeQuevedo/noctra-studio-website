"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { ArrowRight, Calculator, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";

interface SmartCTAProps {
  activePhase: string;
}

const PHASE_DATA: Record<string, { price: string; time: string; roi: string }> =
  {
    web_dev: { price: "$20,000 MXN", time: "3-6 weeks", roi: "2-3 months" },
    ecommerce: { price: "$35,000 MXN", time: "6-8 weeks", roi: "4-6 months" },
    ai: { price: "Custom Quote", time: "8-16 weeks", roi: "6-12 months" },
    seo: { price: "$8,000 MXN/mo", time: "Monthly", roi: "3-4 months" },
  };

export function SmartCTA({ activePhase }: SmartCTAProps) {
  const t = useTranslations("ServicesPage.smart_cta");
  const data = PHASE_DATA[activePhase] || PHASE_DATA.web_dev;

  return (
    <LazyMotion features={domAnimation}>
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="p-12 md:p-16 rounded-[3rem] border border-emerald-500/20 bg-neutral-900/40 backdrop-blur-xl text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              {t("0")}
            </h2>
            <p className="text-emerald-500 font-bold mb-12 tracking-widest text-sm uppercase">
              {t("1")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-neutral-400 text-sm mb-2">
                  {t("2").split(":")[0]}
                </p>
                <p className="text-xl font-bold text-white uppercase">
                  {data.price}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-neutral-400 text-sm mb-2">
                  {t("3").split(":")[0]}
                </p>
                <p className="text-xl font-bold text-white uppercase">
                  {data.time}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-neutral-400 text-sm mb-2">
                  {t("4").split(":")[0]}
                </p>
                <p className="text-xl font-bold text-white uppercase">
                  {data.roi}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-emerald-50 transition-all group active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)]">
                <Calendar className="w-5 h-5" />
                {t("5")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={"/#roi-calculator" as any}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 border border-emerald-500/30 text-emerald-500 font-black rounded-2xl hover:bg-emerald-500/5 transition-all group active:scale-95">
                <Calculator className="w-5 h-5" />
                {t("6")}
              </Link>
            </div>
          </m.div>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}
