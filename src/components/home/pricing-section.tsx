"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const t = useTranslations("Pricing");

  const tiers = [
    {
      id: "tier1",
      key: "tier1",
      popular: false,
    },
    {
      id: "tier2",
      key: "tier2",
      popular: true,
    },
    {
      id: "tier3",
      key: "tier3",
      popular: false,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 border-t border-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          {t("title")}
        </h2>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col p-8 rounded-2xl border transition-all duration-300",
              tier.popular
                ? "bg-neutral-900/80 border-white/20 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]"
                : "bg-neutral-950/50 border-white/5 hover:border-white/10"
            )}>
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">
                Most Common
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-mono text-neutral-400 uppercase tracking-widest mb-2">
                {t(`${tier.key}.name`)}
              </h3>
              <div className="text-3xl font-bold text-white mb-4">
                {t(`${tier.key}.price`)}
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {t(`${tier.key}.description`)}
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {/* 
                Note: We assume features is an array in the JSON. 
                However, next-intl usually returns objects or strings.
                We'll access specific keys if they were objects, but since we defined them as arrays in the JSON structure update,
                we need to be careful. next-intl `useTranslations` doesn't return arrays directly with `t('key')`.
                Instead, we often iterate if we know the count or structure.
                
                Wait, in the JSON update I used an array: "features": ["...", "..."]
                next-intl (depending on version/config) might allow `t.raw('features')` to get the array.
                Let's try `t.raw`. If that fails, we might need to restructure the JSON to use keys like "feature1", "feature2".
                
                Actually, standard practice with next-intl for arrays is `t.raw()`.
              */}
              {(t.raw(`${tier.key}.features`) as string[]).map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-neutral-300">
                  <Check className="w-5 h-5 text-white shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-300",
                tier.popular
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              )}>
              {t("cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
