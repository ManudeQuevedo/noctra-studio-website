"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  ChevronDown,
  Percent,
  Stethoscope,
  ShoppingBag,
  Factory,
  Briefcase,
  Smartphone,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Activity,
  Zap,
  ShieldCheck,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type BusinessType =
  | "professional"
  | "retail"
  | "manufacturing"
  | "b2b"
  | "saas";

interface CalculationState {
  type: BusinessType;
  // Universal
  revenue: number;
  avgTicket: number;
  conversion: number;

  // Professional
  reception: number;
  rent: number;
  utilities: number;
  platforms: number;
  insurance: number;
  marketing: number;
  supplies: number;
  adminHours: number;

  // Retail
  retailRent: number;
  salaries: number;
  pos: number;
  security: number;
  cogs: number;
  fees: number;
  cashCardSplit: number;
  shipping: number;
  shrinkage: number;

  // Manufacturing
  workshopRent: number;
  maintenance: number;
  rawMaterials: number;
  laborHours: number;
  laborRate: number;
  waste: number;
  logistics: number;
  quoteTime: number;
  quoteConv: number;

  // B2B
  software: number;
  dev: number;
  freelance: number;
  duration: number;
  utilization: number;

  // SaaS
  hosting: number;
  supportTools: number;
  mrr: number;
  lifetime: number;
  churn: number;
}

const CONFIG = {
  EXCHANGE_RATE: 18, // MXN per USD
  get LAST_UPDATED() {
    const d = new Date();
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  },
  noctraPricing: {
    professional: 20000,
    ecommerce: 35000,
  },
};

const DEFAULT_STATE: CalculationState = {
  type: "professional",
  revenue: 10000,
  avgTicket: 2500,
  conversion: 1.5,

  reception: 12000,
  rent: 15000,
  utilities: 3000,
  platforms: 2500,
  insurance: 3500,
  marketing: 5000,
  supplies: 500,
  adminHours: 0.5,

  retailRent: 25000,
  salaries: 40000,
  pos: 1200,
  security: 2500,
  cogs: 50,
  fees: 3.5,
  cashCardSplit: 40,
  shipping: 100,
  shrinkage: 3,

  workshopRent: 20000,
  maintenance: 5000,
  rawMaterials: 45,
  laborHours: 40,
  laborRate: 120,
  waste: 7,
  logistics: 1200,
  quoteTime: 3,
  quoteConv: 25,

  software: 6000,
  dev: 3500,
  freelance: 15,
  duration: 8,
  utilization: 75,

  hosting: 8000,
  supportTools: 3000,
  mrr: 1500,
  lifetime: 24,
  churn: 5,
};

export function RealROICalculator() {
  const t = useTranslations("Pricing.real_roi");
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState<"MXN" | "USD">("MXN");
  const [state, setState] = useState<CalculationState>(DEFAULT_STATE);
  const [showSensitivity, setShowSensitivity] = useState(false);

  // Tracking focus for pretty formatting in inputs
  const [isRevenueFocused, setIsRevenueFocused] = useState(false);
  const [revenueTemp, setRevenueTemp] = useState(
    DEFAULT_STATE.revenue.toString(),
  );
  const [isTicketFocused, setIsTicketFocused] = useState(false);
  const [ticketTemp, setTicketTemp] = useState(
    DEFAULT_STATE.avgTicket.toString(),
  );

  // Keep temp inputs in sync when state or currency changes externally (e.g. toggle MXN/USD)
  useEffect(() => {
    if (!isRevenueFocused) setRevenueTemp(state.revenue.toString());
  }, [state.revenue, isRevenueFocused]);

  useEffect(() => {
    if (!isTicketFocused) setTicketTemp(state.avgTicket.toString());
  }, [state.avgTicket, isTicketFocused]);

  const businessTypes = [
    { id: "professional" as BusinessType, icon: Stethoscope },
    { id: "retail" as BusinessType, icon: ShoppingBag },
    { id: "manufacturing" as BusinessType, icon: Factory },
    { id: "b2b" as BusinessType, icon: Briefcase },
    { id: "saas" as BusinessType, icon: Smartphone },
  ];

  // Modified formatCur to handle USD and MXN with symbols and codes
  const formatCur = (val: number, cur: "MXN" | "USD" = currency) => {
    const formatted = new Intl.NumberFormat(cur === "MXN" ? "es-MX" : "en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    }).format(val);
    return `${formatted} ${cur}`;
  };

  const convertVal = (
    amount: number,
    from: "MXN" | "USD",
    to: "MXN" | "USD",
  ) => {
    if (from === to) return amount;
    return from === "MXN"
      ? Math.round(amount / CONFIG.EXCHANGE_RATE)
      : Math.round(amount * CONFIG.EXCHANGE_RATE);
  };

  const handleCurrencyChange = (newCur: "MXN" | "USD") => {
    if (newCur === currency) return;

    // Convert all currency values in state
    setState((s) => ({
      ...s,
      revenue: convertVal(s.revenue, currency, newCur),
      avgTicket: convertVal(s.avgTicket, currency, newCur),
      reception: convertVal(s.reception, currency, newCur),
      rent: convertVal(s.rent, currency, newCur),
      utilities: convertVal(s.utilities, currency, newCur),
      platforms: convertVal(s.platforms, currency, newCur),
      insurance: convertVal(s.insurance, currency, newCur),
      marketing: convertVal(s.marketing, currency, newCur),
      supplies: convertVal(s.supplies, currency, newCur),
      retailRent: convertVal(s.retailRent, currency, newCur),
      salaries: convertVal(s.salaries, currency, newCur),
      pos: convertVal(s.pos, currency, newCur),
      security: convertVal(s.security, currency, newCur),
      workshopRent: convertVal(s.workshopRent, currency, newCur),
      maintenance: convertVal(s.maintenance, currency, newCur),
      logistics: convertVal(s.logistics, currency, newCur),
      software: convertVal(s.software, currency, newCur),
      dev: convertVal(s.dev, currency, newCur),
      hosting: convertVal(s.hosting, currency, newCur),
      supportTools: convertVal(s.supportTools, currency, newCur),
      mrr: convertVal(s.mrr, currency, newCur),
    }));

    setCurrency(newCur);
  };

  // --- CALCULATIONS ---

  const metrics = useMemo(() => {
    let currentNetProfit = 0;
    let projectedNetProfit = 0;
    let currentMargin = 0;
    let projectedMargin = 0;
    let timeSpent = 0;
    let timeSaved = 0;
    const currentCAC = 0;
    const projectedCAC = 0;

    const ownerHourlyRate =
      currency === "MXN" ? 500 : Math.round(500 / CONFIG.EXCHANGE_RATE);
    const websiteInvestment = convertVal(
      CONFIG.noctraPricing.professional,
      "MXN",
      currency,
    );

    const sales = state.revenue / state.avgTicket;

    if (state.type === "professional") {
      const fixedCosts =
        state.reception +
        state.rent +
        state.utilities +
        state.platforms +
        state.insurance +
        state.marketing;
      const variablePerClient =
        state.supplies + state.adminHours * ownerHourlyRate;
      currentNetProfit = state.revenue - fixedCosts - sales * variablePerClient;

      // Projections
      const lift = 1.4; // 40% conversion increase
      const projectedRevenue = state.revenue * lift;
      const receptionSaved = fixedCosts * 0.1; // 10% overhead reduction
      const adminTimeReduction = 0.3; // 30% reduction in admin per client
      const newVariablePerClient =
        state.supplies +
        state.adminHours * (1 - adminTimeReduction) * ownerHourlyRate;
      projectedNetProfit =
        projectedRevenue -
        (fixedCosts - receptionSaved) -
        sales * lift * newVariablePerClient;

      timeSpent = sales * state.adminHours;
      timeSaved = timeSpent * adminTimeReduction + 4; // Plus 4 hours baseline admin saving
    } else if (state.type === "retail") {
      const fixedCosts =
        state.retailRent +
        state.salaries +
        state.utilities +
        state.pos +
        state.security +
        state.marketing;
      const cogsVal = state.revenue * (state.cogs / 100);
      const feeVal =
        state.revenue * (state.cashCardSplit / 100) * (state.fees / 100);
      const shippingVal = sales * state.shipping;
      const shrinkageVal = state.revenue * (state.shrinkage / 100);
      currentNetProfit =
        state.revenue -
        fixedCosts -
        cogsVal -
        feeVal -
        shippingVal -
        shrinkageVal;

      const lift = 1.35;
      const projectedRevenue = state.revenue * lift;
      const aovLift = 1.15;
      const finalRevenue = projectedRevenue * aovLift;
      // Efficiency gains in retail are smaller on fixed costs, but better on performance
      projectedNetProfit =
        finalRevenue -
        fixedCosts -
        finalRevenue * (state.cogs / 100) -
        finalRevenue * 0.03 -
        sales * lift * state.shipping * 0.9;
      timeSpent = 20; // Generic baseline for retail admin
      timeSaved = 5;
    } else if (state.type === "manufacturing") {
      const fixedCosts =
        state.workshopRent +
        state.salaries +
        state.maintenance +
        state.utilities +
        state.insurance;
      const matCost = state.revenue * (state.rawMaterials / 100);
      const laborCost = sales * state.laborHours * state.laborRate;
      const wasteCost = state.revenue * (state.waste / 100);
      const quoteCost =
        (sales / (state.quoteConv / 100)) * state.quoteTime * ownerHourlyRate;
      currentNetProfit =
        state.revenue -
        fixedCosts -
        matCost -
        laborCost -
        wasteCost -
        state.logistics * sales -
        quoteCost;

      const lift = 1.3;
      const quoteImpact = 0.7; // 70% time reduction
      const projectedRevenue = state.revenue * lift;
      const newQuoteCost =
        ((sales * lift) / ((state.quoteConv * 1.3) / 100)) *
        state.quoteTime *
        (1 - quoteImpact) *
        ownerHourlyRate;
      projectedNetProfit =
        projectedRevenue -
        fixedCosts -
        projectedRevenue * (state.rawMaterials / 100) -
        sales * lift * state.laborHours * state.laborRate -
        newQuoteCost;
      timeSpent = (sales / (state.quoteConv / 100)) * state.quoteTime;
      timeSaved = timeSpent * quoteImpact;
    } else if (state.type === "b2b") {
      const fixedCosts =
        state.rent +
        state.salaries +
        state.software +
        state.dev +
        state.utilities;
      const varCosts = state.revenue * (state.freelance / 100);
      currentNetProfit = state.revenue - fixedCosts - varCosts - sales * 2000; // 2000 baseline CAC

      const lift = 1.45;
      const projectedRevenue = state.revenue * lift;
      projectedNetProfit =
        projectedRevenue -
        fixedCosts -
        projectedRevenue * (state.freelance / 100) -
        sales * lift * 1500;
      timeSpent = sales * 10; // Sales cycle time
      timeSaved = timeSpent * 0.2;
    } else if (state.type === "saas") {
      const fixedCosts =
        state.hosting + state.salaries + state.software + state.supportTools;
      const feeVal = state.revenue * 0.04; // Processing
      currentNetProfit = state.revenue - fixedCosts - feeVal - sales * 500; // 500 CAC baseline

      const lift = 1.4;
      const projectedRevenue = state.revenue * lift;
      projectedNetProfit =
        projectedRevenue -
        fixedCosts * 1.1 -
        projectedRevenue * 0.04 -
        sales * lift * 350;
      timeSpent = 40; // Dev/Support overhead
      timeSaved = 8;
    }

    currentMargin = (currentNetProfit / state.revenue) * 100;
    projectedMargin = (projectedNetProfit / (state.revenue * 1.4)) * 100; // Simplified revenue lift

    const monthlyGain = projectedNetProfit - currentNetProfit;
    const payback = websiteInvestment / monthlyGain;
    const roiYear = ((monthlyGain * 12) / websiteInvestment) * 100;

    return {
      currentNetProfit,
      projectedNetProfit,
      currentMargin,
      projectedMargin,
      monthlyGain,
      payback,
      roiYear,
      timeSpent,
      timeSaved,
      ownerValueSaved: timeSaved * ownerHourlyRate,
    };
  }, [state]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <section
      id="roi-calculator"
      className="w-full py-24 px-6 md:px-8 border-t border-neutral-900 bg-black/50 overflow-hidden print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="text-left space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest leading-none">
              <Calculator className="w-3 h-3" />
              Interactive Tool
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white print:text-black">
              {t("title")}
            </h2>
            <p className="text-neutral-400 max-w-2xl print:text-neutral-600">
              {t("subtitle")}
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
              <button
                onClick={() => handleCurrencyChange("MXN")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all",
                  currency === "MXN"
                    ? "bg-emerald-500 text-black"
                    : "text-neutral-500 hover:text-white",
                )}>
                MXN
              </button>
              <button
                onClick={() => handleCurrencyChange("USD")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all",
                  currency === "USD"
                    ? "bg-emerald-500 text-black"
                    : "text-neutral-500 hover:text-white",
                )}>
                USD
              </button>
            </div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-right">
              1 USD = {formatCur(CONFIG.EXCHANGE_RATE, "MXN")} |{" "}
              {CONFIG.LAST_UPDATED}
            </div>
          </div>
        </div>

        {/* Steps Info */}
        <div className="flex justify-between max-w-xl mx-auto mb-12 print:hidden">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500",
                  step >= s
                    ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : "border-neutral-800 text-neutral-600",
                )}>
                {s}
              </div>
              <span
                className={cn(
                  "text-[9px] font-mono uppercase tracking-widest transition-colors",
                  step === s ? "text-emerald-500" : "text-neutral-600",
                )}>
                {t(`steps.${Object.keys(t.raw("steps"))[s - 1]}`)}
              </span>
            </div>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: BUSINESS PROFILE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {businessTypes.map((type) => {
                  const Icon = type.icon;
                  const isActive = state.type === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setState({ ...DEFAULT_STATE, type: type.id });
                        nextStep();
                      }}
                      className={cn(
                        "flex flex-col items-center p-8 rounded-[32px] border transition-all duration-500 group relative overflow-hidden",
                        isActive
                          ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_40px_-15px_rgba(16,185,129,0.3)]"
                          : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700",
                      )}>
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500",
                          isActive
                            ? "bg-emerald-500 text-black scale-110"
                            : "bg-neutral-800 text-neutral-400 group-hover:scale-110 group-hover:text-white",
                        )}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-sm font-bold text-white text-center mb-2 uppercase tracking-wider">
                        {t(`business_types.${type.id}.label`)}
                      </h3>
                      <p className="text-[10px] text-neutral-500 text-center leading-relaxed font-medium">
                        {t(`business_types.${type.id}.sub`)}
                      </p>

                      {isActive && (
                        <motion.div
                          layoutId="selection"
                          className="absolute inset-0 border-2 border-emerald-500 rounded-[32px]"
                        />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* STEP 2: INPUTS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-[32px] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    {(() => {
                      const Icon =
                        businessTypes.find((t) => t.id === state.type)?.icon ||
                        Database;
                      return <Icon className="w-5 h-5 text-emerald-500" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                      {t("universal_inputs.revenue")}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Configure your business baseline
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    {/* Monthly Revenue Input */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                            Monthly Revenue
                          </label>
                          <p className="text-[10px] text-neutral-500">
                            Average monthly income from your business
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-500/50 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                          Required
                        </span>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center border border-neutral-700 group-focus-within:border-emerald-500/50 transition-colors">
                          <DollarSign className="w-4 h-4 text-neutral-500" />
                        </div>
                        <Input
                          type="text"
                          value={
                            isRevenueFocused
                              ? revenueTemp
                              : formatCur(state.revenue)
                          }
                          onFocus={() => {
                            setIsRevenueFocused(true);
                            setRevenueTemp(state.revenue.toString());
                          }}
                          onBlur={() => {
                            setIsRevenueFocused(false);
                            const val =
                              parseInt(revenueTemp.replace(/[^0-9]/g, "")) ||
                              1000;
                            const clamped = Math.min(
                              Math.max(val, 1000),
                              currency === "MXN" ? 10000000 : 556000,
                            );
                            setState((s) => ({
                              ...s,
                              revenue: clamped,
                              avgTicket: Math.round(clamped / 4), // Smart default: rev / 4
                            }));
                          }}
                          onChange={(e) => setRevenueTemp(e.target.value)}
                          className="bg-neutral-800/30 border-neutral-800 h-14 pl-16 text-lg font-bold focus:ring-1 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    {/* Avg Transaction Value Input */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                            Average Transaction
                          </label>
                          <p className="text-[10px] text-neutral-500">
                            Typical amount per sale or project
                          </p>
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center border border-neutral-700 group-focus-within:border-emerald-500/50 transition-colors">
                          <ShoppingBag className="w-4 h-4 text-neutral-500" />
                        </div>
                        <Input
                          type="text"
                          value={
                            isTicketFocused
                              ? ticketTemp
                              : formatCur(state.avgTicket)
                          }
                          onFocus={() => {
                            setIsTicketFocused(true);
                            setTicketTemp(state.avgTicket.toString());
                          }}
                          onBlur={() => {
                            setIsTicketFocused(false);
                            const val =
                              parseInt(ticketTemp.replace(/[^0-9]/g, "")) ||
                              100;
                            const clamped = Math.min(val, state.revenue);
                            setState((s) => ({ ...s, avgTicket: clamped }));
                          }}
                          onChange={(e) => setTicketTemp(e.target.value)}
                          className="bg-neutral-800/30 border-neutral-800 h-14 pl-16 text-lg font-bold focus:ring-1 focus:ring-emerald-500/20"
                        />
                      </div>
                      <p className="text-[9px] text-neutral-600 font-mono italic">
                        e.g., {formatCur(currency === "MXN" ? 2500 : 139)} for
                        services | {formatCur(currency === "MXN" ? 450 : 25)}{" "}
                        retail
                      </p>
                    </div>

                    {/* Current Clients - Calculated Field */}
                    <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 flex items-center justify-between opacity-80">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-neutral-500" />
                          <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">
                            Monthly Clients
                          </label>
                        </div>
                        <p className="text-[9px] text-neutral-600 font-mono">
                          {formatCur(state.revenue)} ÷{" "}
                          {formatCur(state.avgTicket)}
                        </p>
                      </div>
                      <div className="text-2xl font-black text-white pr-2">
                        {Math.round(state.revenue / state.avgTicket)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Website Conversion Rate - Radio Presets */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <label className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                              Conversion Rate
                            </label>
                            <button className="group relative">
                              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 hover:text-emerald-500 transition-colors" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-[280px] p-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all z-50 text-left">
                                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-tight flex items-center gap-2">
                                  <Activity className="w-3 h-3 text-emerald-500" />
                                  What is conversion rate?
                                </h4>
                                <p className="text-[10px] text-neutral-400 leading-relaxed mb-3">
                                  The % of visitors who take action (form,
                                  purchase, call).
                                </p>
                                <div className="space-y-2 border-t border-neutral-800 pt-3">
                                  <div className="flex justify-between text-[9px] font-mono">
                                    <span className="text-neutral-500 uppercase tracking-tight">
                                      E-commerce
                                    </span>
                                    <span className="text-emerald-500">
                                      1% - 3%
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-[9px] font-mono">
                                    <span className="text-neutral-500 uppercase tracking-tight">
                                      B2B / Services
                                    </span>
                                    <span className="text-emerald-500">
                                      2% - 5%
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-3 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                                  <p className="text-[9px] text-emerald-500 italic">
                                    💡 A professional site typically improves
                                    this by +40%.
                                  </p>
                                </div>
                              </div>
                            </button>
                          </div>
                          <div
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-wider",
                              state.conversion <= 1
                                ? "text-red-500"
                                : state.conversion <= 2
                                  ? "text-yellow-500"
                                  : "text-emerald-500",
                            )}>
                            {state.conversion <= 1
                              ? "Poor / Unknown"
                              : state.conversion <= 2
                                ? "Average / Decent"
                                : "Optimized / High Performance"}
                          </div>
                        </div>
                        <div className="text-3xl font-black text-white pr-2">
                          {state.conversion}%
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {[
                          {
                            val: 0.5,
                            label: "No website yet / Minimal presence",
                            sub: "Very conservative starting point",
                          },
                          {
                            val: 1.0,
                            label: "Basic / Old website",
                            sub: "Outdated design, slow on mobile",
                          },
                          {
                            val: 1.5,
                            label: "Decent / Standard website",
                            sub: "Responsive and clean, but unoptimized",
                          },
                          {
                            val: 2.5,
                            label: "Modern / Performance focused",
                            sub: "Strong branding, fast load times",
                          },
                          {
                            val: 4.0,
                            label: "Optimized / High conversion",
                            sub: "A/B tested, conversion lead machine",
                          },
                        ].map((preset) => (
                          <button
                            key={preset.val}
                            onClick={() =>
                              setState((s) => ({
                                ...s,
                                conversion: preset.val,
                              }))
                            }
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl border text-left transition-all group",
                              state.conversion === preset.val
                                ? "bg-emerald-500/10 border-emerald-500/50 shadow-inner"
                                : "bg-neutral-900/30 border-neutral-900 hover:border-neutral-700",
                            )}>
                            <div className="space-y-0.5">
                              <div
                                className={cn(
                                  "text-[10px] font-bold uppercase tracking-wide",
                                  state.conversion === preset.val
                                    ? "text-white"
                                    : "text-neutral-400 group-hover:text-neutral-300",
                                )}>
                                {preset.label}
                              </div>
                              <p className="text-[9px] text-neutral-600 line-clamp-1">
                                {preset.sub}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-4",
                                state.conversion === preset.val
                                  ? "border-emerald-500 bg-emerald-500"
                                  : "border-neutral-700",
                              )}>
                              {state.conversion === preset.val && (
                                <CheckCircle2 className="w-2.5 h-2.5 text-black" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 rounded-2xl border-neutral-800 hover:bg-neutral-800 uppercase tracking-widest font-mono text-[10px]">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="h-14 px-12 rounded-2xl bg-white text-black hover:bg-neutral-200 uppercase tracking-widest font-bold text-xs shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
                    Configure Expenses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: TYPE-SPECIFIC EXPENSES */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-[32px] p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-10">
                    <section className="space-y-6">
                      <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-500 font-bold border-b border-emerald-500/20 pb-2">
                        {t("labels.fixed_monthly")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {state.type === "professional" && (
                          <>
                            <ExpenseInput
                              label={t("fields.reception")}
                              value={state.reception}
                              onChange={(v) =>
                                setState((s) => ({ ...s, reception: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.rent")}
                              value={state.rent}
                              onChange={(v) =>
                                setState((s) => ({ ...s, rent: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.utilities")}
                              value={state.utilities}
                              onChange={(v) =>
                                setState((s) => ({ ...s, utilities: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.platforms")}
                              value={state.platforms}
                              onChange={(v) =>
                                setState((s) => ({ ...s, platforms: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.insurance")}
                              value={state.insurance}
                              onChange={(v) =>
                                setState((s) => ({ ...s, insurance: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.marketing")}
                              value={state.marketing}
                              onChange={(v) =>
                                setState((s) => ({ ...s, marketing: v }))
                              }
                            />
                          </>
                        )}
                        {state.type === "retail" && (
                          <>
                            <ExpenseInput
                              label={t("fields.retail_rent")}
                              value={state.retailRent}
                              onChange={(v) =>
                                setState((s) => ({ ...s, retailRent: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.salaries")}
                              value={state.salaries}
                              onChange={(v) =>
                                setState((s) => ({ ...s, salaries: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.utilities")}
                              value={state.utilities}
                              onChange={(v) =>
                                setState((s) => ({ ...s, utilities: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.pos")}
                              value={state.pos}
                              onChange={(v) =>
                                setState((s) => ({ ...s, pos: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.security")}
                              value={state.security}
                              onChange={(v) =>
                                setState((s) => ({ ...s, security: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.marketing")}
                              value={state.marketing}
                              onChange={(v) =>
                                setState((s) => ({ ...s, marketing: v }))
                              }
                            />
                          </>
                        )}
                        {state.type === "manufacturing" && (
                          <>
                            <ExpenseInput
                              label={t("fields.workshop")}
                              value={state.workshopRent}
                              onChange={(v) =>
                                setState((s) => ({ ...s, workshopRent: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.salaries")}
                              value={state.salaries}
                              onChange={(v) =>
                                setState((s) => ({ ...s, salaries: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.maintenance")}
                              value={state.maintenance}
                              onChange={(v) =>
                                setState((s) => ({ ...s, maintenance: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.utilities")}
                              value={state.utilities}
                              onChange={(v) =>
                                setState((s) => ({ ...s, utilities: v }))
                              }
                            />
                          </>
                        )}
                        {state.type === "b2b" && (
                          <>
                            <ExpenseInput
                              label={t("fields.rent")}
                              value={state.rent}
                              onChange={(v) =>
                                setState((s) => ({ ...s, rent: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.salaries")}
                              value={state.salaries}
                              onChange={(v) =>
                                setState((s) => ({ ...s, salaries: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.software")}
                              value={state.software}
                              onChange={(v) =>
                                setState((s) => ({ ...s, software: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.dev")}
                              value={state.dev}
                              onChange={(v) =>
                                setState((s) => ({ ...s, dev: v }))
                              }
                            />
                          </>
                        )}
                        {state.type === "saas" && (
                          <>
                            <ExpenseInput
                              label={t("fields.hosting")}
                              value={state.hosting}
                              onChange={(v) =>
                                setState((s) => ({ ...s, hosting: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.salaries")}
                              value={state.salaries}
                              onChange={(v) =>
                                setState((s) => ({ ...s, salaries: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.software")}
                              value={state.software}
                              onChange={(v) =>
                                setState((s) => ({ ...s, software: v }))
                              }
                            />
                            <ExpenseInput
                              label={t("fields.support_tools")}
                              value={state.supportTools}
                              onChange={(v) =>
                                setState((s) => ({ ...s, supportTools: v }))
                              }
                            />
                          </>
                        )}
                      </div>
                    </section>

                    <section className="space-y-6">
                      <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-500 font-bold border-b border-emerald-500/20 pb-2">
                        {t("labels.variable_per").replace(
                          "{label}",
                          t(`business_types.${state.type}.client_label`),
                        )}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {state.type === "professional" && (
                          <>
                            <ExpenseInput
                              label={t("fields.materials")}
                              value={state.supplies}
                              onChange={(v) =>
                                setState((s) => ({ ...s, supplies: v }))
                              }
                            />
                            <div className="space-y-4">
                              <label className="text-[10px] uppercase font-bold text-neutral-500">
                                {t("fields.admin_hours")}
                              </label>
                              <Input
                                type="number"
                                step="0.5"
                                value={state.adminHours}
                                onChange={(e) =>
                                  setState((s) => ({
                                    ...s,
                                    adminHours: parseFloat(e.target.value) || 0,
                                  }))
                                }
                                className="bg-neutral-800/50 border-neutral-700 font-bold"
                              />
                            </div>
                          </>
                        )}
                        {state.type === "retail" && (
                          <>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <label className="text-[10px] uppercase font-bold text-neutral-500">
                                  {t("fields.cogs")}
                                </label>
                                <span className="text-xs font-bold text-white">
                                  {state.cogs}%
                                </span>
                              </div>
                              <Slider
                                value={[state.cogs]}
                                min={10}
                                max={90}
                                step={1}
                                onValueChange={([v]: number[]) =>
                                  setState((s) => ({ ...s, cogs: v }))
                                }
                              />
                            </div>
                            <ExpenseInput
                              label={t("fields.shipping")}
                              value={state.shipping}
                              onChange={(v) =>
                                setState((s) => ({ ...s, shipping: v }))
                              }
                            />
                          </>
                        )}
                        {state.type === "manufacturing" && (
                          <>
                            <ExpenseInput
                              label={t("fields.labor_rate")}
                              value={state.laborRate}
                              onChange={(v) =>
                                setState((s) => ({ ...s, laborRate: v }))
                              }
                            />
                            <div className="space-y-4">
                              <label className="text-[10px] uppercase font-bold text-neutral-500">
                                {t("fields.labor_hours")}
                              </label>
                              <Input
                                type="number"
                                value={state.laborHours}
                                onChange={(e) =>
                                  setState((s) => ({
                                    ...s,
                                    laborHours: parseInt(e.target.value) || 0,
                                  }))
                                }
                                className="bg-neutral-800/50 border-neutral-700 font-bold"
                              />
                            </div>
                          </>
                        )}
                        {state.type === "b2b" && (
                          <>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <label className="text-[10px] uppercase font-bold text-neutral-500">
                                  {t("fields.freelance")}
                                </label>
                                <span className="text-xs font-bold text-white">
                                  {state.freelance}%
                                </span>
                              </div>
                              <Slider
                                value={[state.freelance]}
                                min={0}
                                max={60}
                                step={1}
                                onValueChange={([v]: number[]) =>
                                  setState((s) => ({ ...s, freelance: v }))
                                }
                              />
                            </div>
                          </>
                        )}
                        {state.type === "saas" && (
                          <>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <label className="text-[10px] uppercase font-bold text-neutral-500">
                                  {t("fields.churn")}
                                </label>
                                <span className="text-xs font-bold text-white">
                                  {state.churn}%
                                </span>
                              </div>
                              <Slider
                                value={[state.churn]}
                                min={1}
                                max={25}
                                step={0.5}
                                onValueChange={([v]: number[]) =>
                                  setState((s) => ({ ...s, churn: v }))
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <div className="p-8 rounded-[24px] bg-red-500/5 border border-red-500/10 text-center">
                      <div className="text-xs font-mono uppercase tracking-[0.2em] text-red-500/60 mb-2">
                        Estimated Current Net Profit
                      </div>
                      <div className="text-4xl font-black text-white tracking-tight mb-4">
                        {formatCur(metrics.currentNetProfit)}
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[10px] font-bold text-red-500 uppercase tracking-widest">
                        {metrics.currentMargin.toFixed(1)}% Margin
                      </div>
                    </div>

                    <div className="p-6 rounded-[24px] bg-neutral-900 border border-neutral-800 space-y-4">
                      <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 text-center">
                        Owner Admin Load
                      </h5>
                      <div className="flex items-end justify-center gap-2 text-3xl font-bold text-white">
                        {Math.round(metrics.timeSpent)}{" "}
                        <span className="text-sm font-normal text-neutral-500 mb-1">
                          hrs/mo
                        </span>
                      </div>
                      <div className="pt-2 border-t border-neutral-800">
                        <p className="text-[9px] text-neutral-600 text-center uppercase tracking-widest">
                          Value of admin time:{" "}
                          <span className="text-neutral-400">
                            {formatCur(metrics.timeSpent * 500)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {metrics.currentNetProfit < 0 && (
                      <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-3">
                        <XCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-orange-500/80 leading-relaxed">
                          <strong>Warning:</strong> Current inputs suggest you
                          are operating at a net loss or very low margin. A new
                          website converts leads, but consider reviewing overall
                          pricing/expenses.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 rounded-2xl border-neutral-800 hover:bg-neutral-800 uppercase tracking-widest font-mono text-[10px]">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="h-14 px-12 rounded-2xl bg-emerald-500 text-black hover:bg-emerald-400 uppercase tracking-widest font-bold text-xs shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]">
                    Calculate Impact <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: RESULT DASHBOARD */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:grid-cols-2">
                  {/* Current State Column */}
                  <div className="p-8 md:p-10 rounded-[40px] border border-neutral-800 bg-neutral-900/40 space-y-8 relative overflow-hidden group print:bg-white print:border-black/10">
                    <div className="relative z-10">
                      <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold mb-8">
                        {t("labels.current_state")}
                      </h4>
                      <div className="space-y-6">
                        <MetricRow
                          label={t("labels.monthly_net")}
                          value={formatCur(metrics.currentNetProfit)}
                          detail={`${metrics.currentMargin.toFixed(1)}% margin`}
                        />
                        <MetricRow
                          label={t("labels.owner_time")}
                          value={`${Math.round(metrics.timeSpent)} ${t("labels.hours_month")}`}
                          detail="Total admin cost"
                        />
                        <MetricRow
                          label={t("labels.cac")}
                          value={formatCur(state.type === "b2b" ? 2000 : 500)}
                          detail="Est. per client"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Projected State Column */}
                  <div className="p-8 md:p-10 rounded-[40px] border border-emerald-500/30 bg-emerald-500/[0.03] space-y-8 relative overflow-hidden group shadow-[0_40px_100px_-30px_rgba(16,185,129,0.1)] print:bg-white print:border-emerald-500">
                    <div className="absolute top-0 right-0 p-8">
                      <Zap className="w-8 h-8 text-emerald-500/20" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-500 font-bold mb-8">
                        {t("labels.projected_state")}
                      </h4>
                      <div className="space-y-6">
                        <MetricRow
                          label={t("labels.monthly_net")}
                          value={formatCur(metrics.projectedNetProfit)}
                          detail={`+${formatCur(metrics.monthlyGain)} increase`}
                          positive
                        />
                        <MetricRow
                          label={t("labels.owner_time")}
                          value={`${Math.round(metrics.timeSpent - metrics.timeSaved)} ${t("labels.hours_month")}`}
                          detail={`-${Math.round(metrics.timeSaved)} hrs saved`}
                          positive
                        />
                        <MetricRow
                          label={t("labels.cac")}
                          value={formatCur(state.type === "b2b" ? 1500 : 350)}
                          detail="-25% via SEO/UX"
                          positive
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI HIGHLIGHT PANEL */}
                <div className="p-10 md:p-14 rounded-[48px] bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 text-center relative overflow-hidden group print:bg-white print:border-black">
                  <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 print:grid-cols-4">
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500/60 font-bold">
                        {t("labels.additional_profit")}
                      </div>
                      <div className="text-4xl font-black text-emerald-500 tracking-tight">
                        +{formatCur(metrics.monthlyGain)}
                      </div>
                      <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">
                        {t("labels.per_month")}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
                        {t("labels.payback_period")}
                      </div>
                      <div className="text-4xl font-black text-white tracking-tight print:text-black">
                        {metrics.payback.toFixed(1)}
                      </div>
                      <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">
                        {t("labels.months")}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
                        {t("labels.annual_roi")}
                      </div>
                      <div className="text-4xl font-black text-white tracking-tight print:text-black">
                        {Math.round(metrics.roiYear)}%
                      </div>
                      <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">
                        Year 1 Projection
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500/60 font-bold">
                        {t("labels.recovered_time")}
                      </div>
                      <div className="text-4xl font-black text-emerald-500 tracking-tight">
                        {Math.round(metrics.timeSaved)}
                      </div>
                      <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">
                        {t("labels.hours_month")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs & Legal */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 print:hidden">
                  <div className="space-y-2 max-w-lg">
                    <p className="text-[10px] text-neutral-500 leading-relaxed uppercase tracking-wider font-mono">
                      <ShieldCheck className="w-3 h-3 inline mr-1 text-emerald-500/50" />
                      {t("labels.disclaimer_text")}
                    </p>
                    <p className="text-[10px] text-neutral-500 leading-relaxed opacity-60 italic">
                      {t("labels.market_note")} • {t("labels.privacy_note")} •{" "}
                      {t("vat_note")}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => window.print()}
                      className="h-14 px-8 rounded-2xl border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest">
                      <Download className="w-4 h-4 mr-2" /> PDF Report
                    </Button>
                    <Button
                      asChild
                      className="h-14 px-10 rounded-2xl bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
                      <a href="/contact">
                        {t("labels.discovery_cta")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center print:hidden">
                  <button
                    onClick={() => setStep(1)}
                    className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-emerald-500 transition-colors">
                    Re-calculate with different business type
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ExpenseInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());

  // Get currency from context (since it's inside the same file we can use a simpler approach or pass it)
  // For simplicity here, we'll just use the raw number editing but with a nice prefix

  useEffect(() => {
    if (!isFocused) setTempValue(value.toString());
  }, [value, isFocused]);

  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest line-clamp-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-neutral-600">
          $
        </div>
        <Input
          type="text"
          value={
            isFocused ? tempValue : new Intl.NumberFormat("en-US").format(value)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            const val = parseInt(tempValue.replace(/[^0-9]/g, "")) || 0;
            onChange(val);
          }}
          onChange={(e) => setTempValue(e.target.value)}
          className="bg-neutral-900/50 border-neutral-800 h-11 pl-7 text-sm font-bold focus:ring-1 focus:ring-emerald-500/20"
        />
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  detail,
  positive,
}: {
  label: string;
  value: string;
  detail: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
          {label}
        </div>
        <div className="text-[10px] text-neutral-600 italic">{detail}</div>
      </div>
      <div
        className={cn(
          "text-xl font-bold tracking-tight",
          positive ? "text-emerald-500" : "text-white print:text-black",
        )}>
        {value}
      </div>
    </div>
  );
}
