"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle, Calculator, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ComparisonColumn {
  option: string;
  year_1: string;
  year_2: string;
  year_3: string;
  total_3_years: string;
  hidden_costs: string;
  highlight: boolean;
}

export function PriceComparison() {
  const t = useTranslations("Pricing.comparison_context");

  const columns = t.raw("table.columns") as ComparisonColumn[];

  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("title")}</h3>
        <p className="text-neutral-400 max-w-2xl mx-auto">{t("intro")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {columns.map((col, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "flex flex-col p-6 rounded-3xl border transition-all duration-300 relative",
              col.highlight
                ? "bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_40px_-15px_rgba(16,185,129,0.2)] scale-105 z-10"
                : "bg-neutral-900/30 border-neutral-800/50 hover:border-neutral-700",
            )}>
            {col.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recomendado
              </div>
            )}

            <div className="mb-6">
              <h4
                className={cn(
                  "font-bold mb-1",
                  col.highlight ? "text-emerald-400" : "text-white",
                )}>
                {col.option}
              </h4>
              <div className="text-2xl font-bold tracking-tight text-white">
                {col.total_3_years}
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {t("table.subtitle")}
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                  Año 1
                </div>
                <div className="text-sm text-neutral-300">{col.year_1}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                  Año 2
                </div>
                <div className="text-sm text-neutral-300">{col.year_2}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                  Año 3
                </div>
                <div className="text-sm text-neutral-300">{col.year_3}</div>
              </div>

              <div className="pt-4 border-t border-neutral-800/50 mt-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Info className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                    Costos Ocultos
                  </span>
                </div>
                <p
                  className={cn(
                    "text-xs leading-relaxed",
                    col.highlight
                      ? "text-emerald-500/80"
                      : "text-neutral-500 line-through decoration-neutral-700",
                  )}>
                  {col.hidden_costs}
                </p>
              </div>
            </div>

            {col.highlight && (
              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Garantía Total
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-neutral-900/20 border border-neutral-800/50 mt-12 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h4 className="font-bold text-white">{t("calculator_cta.text")}</h4>
            <p className="text-sm text-neutral-400">
              {t("calculator_cta.description")}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            document.getElementById('roi-calculator')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
          className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
          {t("calculator_cta.text")}
        </button>
      </div>

      <p className="text-[10px] text-neutral-600 mt-6 text-center italic">
        {t("table.footnote")}
      </p>
    </div>
  );
}
