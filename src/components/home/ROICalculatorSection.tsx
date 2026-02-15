"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  ChevronDown,
  Percent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type BusinessType = 'medical' | 'legal' | 'accounting' | 'school' | 'ecommerce' | 'services' | 'restaurant' | 'other';
type InvestmentTier = '20000' | '35000' | '50000' | '80000' | 'custom';

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const start = displayValue;
    const end = value;
    const duration = 1000;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
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

export function ROICalculatorSection() {
  const t = useTranslations("Pricing.roi_section");
  
  // State
  const [businessType, setBusinessType] = useState<BusinessType>('medical');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(150000);
  const [newClientsCount, setNewClientsCount] = useState<number>(5);
  const [avgTicket, setAvgTicket] = useState<number>(2500);
  const [investmentTier, setInvestmentTier] = useState<InvestmentTier>('20000');
  const [customInvestment, setCustomInvestment] = useState<number>(60000);

  // Derived values
  const clientLabel = t(`business_types.${businessType}.client_label`);
  
  const totalInvestment = useMemo(() => {
    return investmentTier === 'custom' ? customInvestment : parseInt(investmentTier);
  }, [investmentTier, customInvestment]);

  const monthlyNewRevenue = useMemo(() => {
    return newClientsCount * avgTicket;
  }, [newClientsCount, avgTicket]);

  const paybackMonths = useMemo(() => {
    if (monthlyNewRevenue === 0) return 0;
    return totalInvestment / monthlyNewRevenue;
  }, [totalInvestment, monthlyNewRevenue]);

  const annualRoi = useMemo(() => {
    if (totalInvestment === 0) return 0;
    return ((monthlyNewRevenue * 12 - totalInvestment) / totalInvestment) * 100;
  }, [totalInvestment, monthlyNewRevenue]);

  const clientsToPay = useMemo(() => {
    if (avgTicket === 0) return 0;
    return totalInvestment / avgTicket;
  }, [totalInvestment, avgTicket]);

  return (
    <section id="roi-calculator" className="w-full py-24 px-6 md:px-8 bg-neutral-950/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Calculator className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase font-bold">
              ROI Calculator
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inputs Section */}
          <div className="lg:col-span-7 space-y-10">
            {/* Business Type */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                {t("labels.business_type")}
              </label>
              <div className="relative">
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4 px-6 text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 transition-all"
                >
                  {(Object.keys(t.raw('business_types')) as BusinessType[]).map((key) => (
                    <option key={key} value={key}>
                      {t(`business_types.${key}.label`)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            {/* Monthly Revenue Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                  {t("labels.monthly_revenue")}
                </label>
                <div className="text-2xl font-bold text-white">
                  $<AnimatedNumber value={monthlyRevenue} /> <span className="text-neutral-500 text-sm font-normal">MXN</span>
                </div>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 font-mono tracking-widest">
                <span>$50,000</span>
                <span>$5,000,000+</span>
              </div>
            </div>

            {/* Clients Needed Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest max-w-[70%]">
                  {t("labels.clients_needed", { label: clientLabel })}
                </label>
                <div className="text-2xl font-bold text-white">
                  <AnimatedNumber value={newClientsCount} /> <span className="text-neutral-500 text-sm font-normal">{clientLabel}</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={newClientsCount}
                onChange={(e) => setNewClientsCount(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 font-mono tracking-widest">
                <span>1 {clientLabel}</span>
                <span>50 {clientLabel}</span>
              </div>
            </div>

            {/* Avg Ticket Input & Investment Presets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                  {t("labels.avg_ticket", { label: clientLabel })}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <Input
                    type="number"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(parseInt(e.target.value) || 0)}
                    className="pl-14 py-6 bg-neutral-900 border-neutral-800 rounded-2xl text-lg font-bold text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                  {t("labels.investment")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['20000', '35000', '50000', '80000', 'custom'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setInvestmentTier(tier as InvestmentTier)}
                      className={cn(
                        "py-3 rounded-xl border font-bold text-xs transition-all",
                        investmentTier === tier
                          ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                          : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                      )}
                    >
                      {tier === 'custom' ? 'Custom' : `$${(parseInt(tier)/1000).toFixed(0)}k`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {investmentTier === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-2 overflow-hidden"
                >
                  <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                    {t("labels.custom_investment")}
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <Input
                      type="number"
                      value={customInvestment}
                      onChange={(e) => setCustomInvestment(parseInt(e.target.value) || 0)}
                      className="pl-14 py-6 bg-neutral-900 border-neutral-800 rounded-2xl text-lg font-bold text-white"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 p-8 md:p-10 rounded-[32px] bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  {t("labels.results_title")}
                </h3>

                {/* Hero Result: Payback Period */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[24px] p-8 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-emerald-500/70" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/70">
                        {t("labels.payback_months")}
                      </span>
                    </div>
                    <div className="text-6xl font-black text-emerald-500 tracking-tighter">
                      <AnimatedNumber 
                        value={paybackMonths} 
                        decimals={paybackMonths < 10 && paybackMonths > 0 ? 1 : 0} 
                        suffix={paybackMonths > 0 ? "" : ""}
                      />
                      <span className="text-2xl ml-2 font-bold opacity-80 uppercase tracking-widest">
                        meses
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
                        <Users className="w-5 h-5 text-neutral-400" />
                      </div>
                      <span className="text-xs font-medium text-neutral-400">
                        {t("labels.clients_to_pay", { label: clientLabel })}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      <AnimatedNumber value={clientsToPay} decimals={1} />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/50 flex items-center justify-between text-right">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
                        <TrendingUp className="w-5 h-5 text-neutral-400" />
                      </div>
                      <span className="text-xs font-medium text-neutral-400 text-left">
                        {t("labels.new_monthly_revenue")}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-emerald-500">
                      $<AnimatedNumber value={monthlyNewRevenue} />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
                        <Percent className="w-5 h-5 text-neutral-400" />
                      </div>
                      <span className="text-xs font-medium text-neutral-400">
                        {t("labels.annual_roi")}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      <AnimatedNumber value={annualRoi} suffix="%" />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-6">
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-16 rounded-2xl bg-white text-black hover:bg-neutral-200 transition-all font-bold group"
                  >
                    <Link href="/contact" className="flex items-center justify-center gap-2">
                      {t("labels.cta")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <p className="text-[10px] text-neutral-500 text-center leading-relaxed italic">
                    {t("labels.disclaimer")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
