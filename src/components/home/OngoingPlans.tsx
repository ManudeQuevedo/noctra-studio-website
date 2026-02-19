"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface PlanTier {
  id: string;
  key: string;
  popular?: boolean;
}

export function OngoingPlans() {
  const t = useTranslations("OngoingManagement");

  const plans: PlanTier[] = [
    { id: "tier1", key: "tier1" },
    { id: "tier2", key: "tier2", popular: true },
    { id: "tier3", key: "tier3" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 border-t border-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <ShieldCheck className="w-3 h-3" />
          {t("title")}
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white italic">
          {t("title")}
        </h2>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col p-8 rounded-3xl border transition-all duration-500 group",
              plan.popular
                ? "bg-neutral-900/80 border-white/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20"
                : "bg-neutral-950/50 border-white/5 hover:border-white/10",
            )}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                {useTranslations("Pricing")("most_common")}
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    plan.popular ? "bg-emerald-500" : "bg-neutral-700",
                  )}
                />
                {t(`${plan.key}.name`)}
              </h3>
              <div className="mb-4">
                <div className="text-3xl font-black text-white tracking-tight">
                  {t(`${plan.key}.price`)}
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {(t.raw(`${plan.key}.features`) as string[]).map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  <Check
                    className={cn(
                      "w-5 h-5 shrink-0 mt-0.5",
                      plan.popular ? "text-emerald-500" : "text-neutral-600",
                    )}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={{
                pathname: "/contact",
                query: {
                  plan: t(`${plan.key}.name`),
                  tipo: "gestion",
                },
              }}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300",
                plan.popular
                  ? "bg-white text-black hover:bg-emerald-500 hover:text-white"
                  : "bg-neutral-800 text-white hover:bg-neutral-700",
              )}>
              {t("cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-sm text-neutral-400 max-w-xl">{t("footer")}</p>
        </div>
        <Link
          href={{ pathname: "/services", hash: "ongoing" }}
          className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors flex items-center gap-2 group">
          {useTranslations("Pricing")("compare_all_features")}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
