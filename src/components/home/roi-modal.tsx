"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  DollarSign,
  ArrowRight,
  Calculator,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";

interface RoiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONVERSION_IMPROVEMENT = 0.4;

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const start = displayValue;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(start + (end - start) * ease);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function RoiModal({ isOpen, onClose }: RoiModalProps) {
  const t = useTranslations("Pricing.roi_calculator");
  const [currentClients, setCurrentClients] = useState<number>(5);
  const [avgTicket, setAvgTicket] = useState<number>(8000);
  const [investmentTier, setInvestmentTier] = useState<number>(20000);

  const monthlyNewRevenue = currentClients * avgTicket * CONVERSION_IMPROVEMENT;
  const paybackMonthsRaw =
    monthlyNewRevenue > 0 ? investmentTier / monthlyNewRevenue : 0;
  const annualRoiRaw =
    investmentTier > 0
      ? ((monthlyNewRevenue * 12 - investmentTier) / investmentTier) * 100
      : 0;
  const threeYearRevenue = monthlyNewRevenue * 36;

  const results = {
    monthlyNewRevenue,
    paybackMonths: isFinite(paybackMonthsRaw) ? paybackMonthsRaw : 0,
    annualRoi: isFinite(annualRoiRaw) ? annualRoiRaw : 0,
    threeYearRevenue,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 p-2 hover:bg-neutral-800 rounded-full transition-colors">
              <X className="w-5 h-5 text-neutral-400" />
            </button>

            {/* Header */}
            <div className="px-8 pt-7 pb-5 border-b border-neutral-800/60 flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Calculator className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {t("title")}
                </h3>
                <p className="text-neutral-500 text-xs">{t("intro")}</p>
              </div>
            </div>

            {/* Body: 3-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Inputs */}
              <div className="md:col-span-5 p-7 space-y-5">
                {/* Current Clients */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {t("inputs.current_clients.label")}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={currentClients}
                    onChange={(e) =>
                      setCurrentClients(Math.max(0, Number(e.target.value)))
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 px-4 text-lg font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all"
                    placeholder={t("inputs.current_clients.placeholder")}
                  />
                  <p className="text-[9px] text-neutral-600 italic">
                    {t("inputs.current_clients.helper")}
                  </p>
                </div>

                {/* Avg Ticket */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {t("inputs.avg_ticket.label")}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={avgTicket}
                      onChange={(e) =>
                        setAvgTicket(Math.max(0, Number(e.target.value)))
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-9 pr-14 text-lg font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all"
                      placeholder={t("inputs.avg_ticket.placeholder")}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-neutral-600 uppercase tracking-widest pointer-events-none">
                      MXN
                    </div>
                  </div>
                  <p className="text-[9px] text-neutral-600 italic">
                    {t("inputs.avg_ticket.helper")}
                  </p>
                </div>

                {/* Investment Tier */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {t("inputs.investment_tier.label")}
                  </label>
                  <div className="relative">
                    <select
                      value={investmentTier}
                      onChange={(e) =>
                        setInvestmentTier(Number(e.target.value))
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 px-4 pr-10 text-base font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all appearance-none cursor-pointer">
                      <option value="20000">
                        {t("inputs.investment_tier.options.20000")}
                      </option>
                      <option value="35000">
                        {t("inputs.investment_tier.options.35000")}
                      </option>
                      <option value="80000">
                        {t("inputs.investment_tier.options.80000")}
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="md:col-span-7 bg-neutral-900/30 p-7 relative overflow-hidden border-t md:border-t-0 md:border-l border-neutral-800/60">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-bl-full -mr-24 -mt-24 z-0" />

                <div className="relative z-10 space-y-5">
                  {/* Hero Metric */}
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-emerald-500/60" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/60">
                        {t("outputs.payback_period.label")}
                      </span>
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-emerald-500 tracking-tight leading-none">
                      <AnimatedCounter
                        value={results.paybackMonths}
                        decimals={results.paybackMonths < 10 ? 1 : 0}
                        suffix={` ${t("outputs.payback_period.unit")}`}
                      />
                    </div>
                  </div>

                  {/* Secondary Metrics Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 bg-neutral-900/80 border border-neutral-800/60 rounded-xl text-center">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                        {t("outputs.monthly_new_revenue.label")}
                      </div>
                      <div className="text-lg font-bold text-white leading-tight">
                        <AnimatedCounter
                          value={results.monthlyNewRevenue}
                          prefix="+$"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-900/80 border border-neutral-800/60 rounded-xl text-center">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                        {t("outputs.annual_roi.label")}
                      </div>
                      <div className="text-lg font-bold text-white leading-tight">
                        <AnimatedCounter value={results.annualRoi} suffix="%" />
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-900/80 border border-neutral-800/60 rounded-xl text-center">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                        {t("outputs.three_year_revenue.label")}
                      </div>
                      <div className="text-lg font-bold text-white leading-tight">
                        <AnimatedCounter
                          value={results.threeYearRevenue}
                          prefix="$"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 group active:scale-[0.98] text-sm">
                    {t("cta")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-[9px] text-neutral-600 text-center leading-relaxed italic">
                    {t("disclaimer")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
