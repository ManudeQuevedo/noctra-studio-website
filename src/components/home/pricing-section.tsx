"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { WhyLocalBenefits } from "./WhyLocalBenefits";
import { PriceComparison } from "./price-comparison";
import { RealROICalculator } from "./RealROICalculator";
import { FeatureComparisonTable } from "./FeatureComparisonTable";

interface OptionalModule {
  name: string;
  price: string;
}

export function PricingSection() {
  const t = useTranslations("Pricing");

  const tiers = [
    { id: "tier1", key: "tier1", popular: false },
    { id: "tier2", key: "tier2", popular: true },
    { id: "tier3", key: "tier3", popular: false },
  ];

  const [showingComparison, setShowingComparison] = useState(false);
  const optionalModules = t.raw("optional_modules") as OptionalModule[];
  const additionalText = t.raw("additional_text") as string[];

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

        <div className="pt-8 flex justify-center">
          <button
            onClick={() => setShowingComparison(!showingComparison)}
            className="group flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-all font-bold text-sm uppercase tracking-widest">
            {showingComparison ? t("back_to_pricing") : t("compare_all_features")}
          </button>
        </div>
      </motion.div>

      <WhyLocalBenefits />

      {/* Transparent Pricing Table */}
      {!showingComparison && <PriceComparison />}

      <AnimatePresence mode="wait">
        {showingComparison ? (
          <FeatureComparisonTable key="comparison" />
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 md:grid-cols-3">
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
                    : "bg-neutral-950/50 border-white/5 hover:border-white/10",
                )}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">
                    {t("most_common")}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-lg font-mono text-neutral-400 uppercase tracking-widest mb-2">
                    {t(`${tier.key}.name`)}
                  </h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white">
                      {t(`${tier.key}.price`)}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-2 font-medium leading-relaxed max-w-[200px] border-l border-neutral-800 pl-3">
                      {t(`${tier.key}.roi_indicator`)}
                    </div>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {t(`${tier.key}.description`)}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
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
                      : "bg-neutral-800 text-white hover:bg-neutral-700",
                  )}>
                  {t("cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROI Calculator Section */}
      <RealROICalculator />

      {/* Optional Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 p-8 rounded-2xl border border-neutral-800 bg-neutral-950/50">
        <h3 className="text-lg font-semibold text-white mb-6">
          {t("optional_modules_title")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {optionalModules.map((mod, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
              <Plus className="w-4 h-4 text-neutral-500 shrink-0" />
              <div>
                <span className="text-sm text-white">{mod.name}</span>
                <span className="block text-xs text-neutral-500 font-mono">
                  {mod.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Additional Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {additionalText.map((text, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-neutral-500">
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            {text}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
