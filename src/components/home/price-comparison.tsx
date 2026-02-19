"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  HelpCircle,
  Calculator,
  Info,
  ChevronDown,
  ChevronUp,
  Clock,
  Search,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Code2,
  TrendingUp,
  X,
  Stethoscope,
  Briefcase,
  ShoppingBag,
  Hammer,
  Building2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Hotel,
  LayoutGrid,
  GraduationCap,
  Home,
} from "lucide-react";

// --- Types ---

interface Option {
  id: string;
  label: string;
  min: number;
  max: number;
  info?: string;
  warning?: string;
}

interface Category {
  id: string;
  label: string;
  options: Option[];
}

interface Industry {
  id: string;
  label: string;
  sub: string;
  icon: string;
}

// Map icon names to components
const ICON_MAP: Record<string, any> = {
  Stethoscope,
  Briefcase,
  ShoppingBag,
  Hammer,
  Building2,
  Hotel,
  LayoutGrid,
  GraduationCap,
  Home,
};

// UI string keys that are not industry cards
const INDUSTRY_LABEL_UI_KEYS = new Set([
  "select",
  "select_button",
  "selected_badge",
  "change_button",
  "clear_button",
]);

// --- Sub-components ---

function ExpandableSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  className,
}: {
  title: string;
  icon?: any;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-t border-neutral-800/50 pt-4 mt-4", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group transition-colors hover:text-white">
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-500 transition-colors" />
          )}
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold group-hover:text-neutral-300">
            {title}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-neutral-600 group-hover:text-emerald-500" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-neutral-600 group-hover:text-emerald-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden">
            <div className="pt-3 space-y-2 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Component ---

export function PriceComparison() {
  const t = useTranslations("Pricing.infrastructure_comparison");

  // UI State
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(),
  );
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);

  // Industry Data from translations
  const industryLabels = t.raw("industry_labels") as Record<string, any>;
  const industries = useMemo(() => {
    return Object.entries(industryLabels)
      .filter(([key]) => !INDUSTRY_LABEL_UI_KEYS.has(key))
      .map(([id, data]: [string, any]) => ({
        id,
        ...data,
      })) as Industry[];
  }, [industryLabels]);

  // Categories mapping based on industry
  const allCategories = t.raw("categories") as Record<string, Category[]>;
  const activeCategories = useMemo(() => {
    if (!selectedIndustry) return [];
    const industryCats = allCategories[selectedIndustry] || [];
    const universalCats = allCategories["universal"] || [];
    return [...industryCats, ...universalCats];
  }, [allCategories, selectedIndustry]);

  const columns = t.raw("columns") as any;
  const savingsCard = t.raw("savings_card") as any;
  const breakdownTranslations = t.raw("breakdown") as any;
  const methodologyData = t.raw("methodology") as any;
  const optionWarnings = t.raw("option_warnings") as Record<string, string>;
  const warnings = t.raw("warnings") as any;

  // Constants
  const NOCTRA_FIXED_COST = 20000;

  // Handlers
  const toggleOption = (id: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOptions(newSelected);
  };

  const selectIndustry = (id: string) => {
    setSelectedIndustry(id);
    setSelectedOptions(new Set());
    // Scroll to dashboard
    setTimeout(() => {
      document
        .getElementById("comparison-dashboard")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Calculations
  const costs = useMemo(() => {
    let min = 0;
    let max = 0;
    const items: Option[] = [];

    selectedOptions.forEach((optId) => {
      activeCategories.forEach((cat) => {
        const opt = cat.options.find((o) => o.id === optId);
        if (opt) {
          min += opt.min;
          max += opt.max;
          items.push(opt);
        }
      });
    });

    return { min, max, items };
  }, [selectedOptions, activeCategories]);

  const savings = useMemo(() => {
    const avgCurrent = (costs.min + costs.max) / 2;
    return Math.max(0, avgCurrent - NOCTRA_FIXED_COST);
  }, [costs]);

  const roi = useMemo(() => {
    if (costs.min === 0) return 0;
    return Math.round((savings / NOCTRA_FIXED_COST) * 100);
  }, [costs, savings]);

  // Warning logic
  const activeWarning = useMemo(() => {
    if (selectedOptions.size === 0) return null;
    const avgCurrent = (costs.min + costs.max) / 2;
    if (avgCurrent > NOCTRA_FIXED_COST * 5) return warnings.high_spend;

    // Industry specific warnings
    if (selectedIndustry === "medical" && selectedOptions.has("doctoralia"))
      return warnings.doctoralia;
    if (
      selectedIndustry === "hospitality" &&
      (selectedOptions.has("hosp_booking") ||
        selectedOptions.has("hosp_airbnb"))
    )
      return warnings.hospitality_ota;

    return null;
  }, [selectedOptions, selectedIndustry, costs, warnings]);

  return (
    <div className="mb-24 px-4 scroll-mt-24">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-4">
          <Zap className="w-3 h-3" />
          Transparencia Total
        </motion.div>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white">
          {t("title")}
        </h3>
        <p className="text-neutral-400 max-w-3xl mx-auto text-xl leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Step 1: Industry Selector */}
      {!selectedIndustry ? (
        <div className="max-w-6xl mx-auto mb-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold mb-8 text-center bg-neutral-900/50 py-2 border-y border-neutral-800/50">
            {industryLabels.select}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const Icon = ICON_MAP[industry.icon] || LayoutGrid;
              return (
                <motion.button
                  key={industry.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectIndustry(industry.id)}
                  className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800/50 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 rounded-2xl bg-neutral-800/50 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all border border-neutral-700/50 group-hover:border-emerald-500/30">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {industry.label}
                  </h4>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {industry.sub}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-xs font-bold text-neutral-600 group-hover:text-emerald-500 transition-all">
                    {industryLabels.select_button}{" "}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-neutral-900/50 border border-neutral-800/50 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              {ICON_MAP[
                industries.find((i) => i.id === selectedIndustry)?.icon ||
                  "LayoutGrid"
              ] &&
                React.createElement(
                  ICON_MAP[
                    industries.find((i) => i.id === selectedIndustry)?.icon ||
                      "LayoutGrid"
                  ] as any,
                  { className: "w-6 h-6" },
                )}
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none mb-1">
                {industryLabels.selected_badge}
              </p>
              <h4 className="text-xl font-bold text-white">
                {industries.find((i) => i.id === selectedIndustry)?.label}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedIndustry(null)}
              className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-all flex items-center gap-2">
              {industryLabels.change_button}
            </button>
            <button
              onClick={() => setSelectedOptions(new Set())}
              className="px-6 py-3 rounded-xl border border-neutral-800 hover:border-red-500/50 hover:text-red-400 text-neutral-400 text-xs font-bold transition-all flex items-center gap-2">
              {industryLabels.clear_button}
            </button>
          </div>
        </motion.div>
      )}

      {selectedIndustry && (
        <div
          id="comparison-dashboard"
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start scroll-mt-24">
          {/* Left: Category Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {activeCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-8 rounded-[2.5rem] bg-neutral-900/30 border border-neutral-800/50 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/0 group-hover:bg-emerald-500/20 transition-all" />
                <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-sm border border-neutral-700">
                    {cat.label.split(" ")[0]}
                  </span>
                  {cat.label.split(" ").slice(1).join(" ")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.options.map((opt) => {
                    const isSelected = selectedOptions.has(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleOption(opt.id)}
                        className={cn(
                          "flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 group relative overflow-hidden",
                          isSelected
                            ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                            : "bg-neutral-950/40 border-neutral-800/50 hover:border-neutral-700",
                        )}>
                        {/* Checkbox Icon */}
                        <div
                          className={cn(
                            "absolute top-5 right-5 w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                            isSelected
                              ? "bg-emerald-500 border-emerald-400 scale-110 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                              : "border-neutral-700 bg-neutral-950",
                          )}>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          )}
                        </div>

                        <span
                          className={cn(
                            "font-bold text-sm mb-1.5 pr-10",
                            isSelected
                              ? "text-emerald-400"
                              : "text-neutral-200 group-hover:text-white",
                          )}>
                          {opt.label}
                        </span>

                        {opt.info && (
                          <span className="text-[10px] text-neutral-500 leading-relaxed mb-2 block">
                            {opt.info}
                          </span>
                        )}

                        <div className="mt-auto pt-2 flex items-center gap-2">
                          <span
                            className={cn(
                              "text-[10px] font-black tracking-widest",
                              isSelected
                                ? "text-emerald-500/70"
                                : "text-neutral-600",
                            )}>
                            ${opt.min.toLocaleString()} - $
                            {opt.max.toLocaleString()}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Real-time Comparison (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Summary Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-50" />

              <div className="relative p-8 rounded-[2.5rem] bg-neutral-900/60 border border-neutral-800/50 backdrop-blur-md overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
                    {columns.current.title}
                  </h4>
                </div>

                {selectedOptions.size === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-neutral-700">
                      <ArrowRight className="w-6 h-6 text-neutral-600" />
                    </div>
                    <p className="text-sm text-neutral-500 italic max-w-[200px] mx-auto">
                      {columns.current.empty_state}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <div className="text-3xl md:text-4xl font-black text-white mb-1">
                        ${costs.min.toLocaleString()} - $
                        {costs.max.toLocaleString()}
                        <span className="text-sm font-medium text-neutral-500 ml-2">
                          MXN
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                        {columns.current.total_label}
                      </p>
                    </div>

                    {/* Warning if any */}
                    {activeWarning && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-200/80 leading-relaxed italic">
                          {activeWarning}
                        </p>
                      </motion.div>
                    )}

                    {/* VS Element */}
                    <div className="flex items-center gap-4 py-2">
                      <div className="h-px bg-neutral-800 flex-1" />
                      <div className="px-3 py-1 rounded-full border border-neutral-700 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                        VS
                      </div>
                      <div className="h-px bg-neutral-800 flex-1" />
                    </div>

                    {/* Noctra Plan */}
                    <div className="p-6 rounded-3xl bg-emerald-500 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.4)] relative overflow-hidden group/noctra">
                      {/* Background Shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover/noctra:opacity-100 transition-opacity duration-700" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-white fill-white" />
                            <h5 className="font-black text-white uppercase tracking-widest text-xs">
                              Noctra Studio
                            </h5>
                          </div>
                          <div className="px-2 py-0.5 rounded-full bg-black/20 text-white text-[8px] font-black uppercase tracking-tight">
                            {columns.noctra.badge}
                          </div>
                        </div>

                        <div className="text-3xl font-black text-white mb-1">
                          $20,000
                          <span className="text-sm font-medium text-emerald-100 ml-2">
                            MXN
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest opacity-80 mb-6">
                          {columns.noctra.total_label}
                        </p>

                        <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
                          {columns.noctra.included_items
                            .slice(0, 6)
                            .map((f: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-center gap-1.5 text-[9px] font-bold text-white/90">
                                <CheckCircle2 className="w-3 h-3 text-white shrink-0" />
                                <span className="truncate">{f}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Dynamic Savings Banner */}
                    {savings > 0 && (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-5 rounded-2xl bg-neutral-950 border-2 border-emerald-500/50 flex items-center justify-between group/savings">
                        <div>
                          <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">
                            {savingsCard.title}
                          </div>
                          <div className="text-2xl font-black text-emerald-400 group-hover/savings:scale-105 transition-transform origin-left">
                            ${savings.toLocaleString()} 💸
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">
                            {savingsCard.roi_label}
                          </div>
                          <div className="text-xl font-bold text-white">
                            +{roi}%
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Hidden Costs vs Value Props */}
            {selectedOptions.size > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <h5 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />{" "}
                    {columns.current.hidden_costs_title}
                  </h5>
                  <ul className="space-y-2">
                    {columns.current.hidden_costs_items.map(
                      (item: string, i: number) => (
                        <li
                          key={i}
                          className="text-[10px] text-neutral-500 flex items-start gap-2">
                          <span className="text-red-500">•</span> {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" />{" "}
                    {columns.noctra.zero_hidden_title}
                  </h5>
                  <ul className="space-y-2">
                    {columns.noctra.zero_hidden_items.map(
                      (item: string, i: number) => (
                        <li
                          key={i}
                          className="text-[10px] text-neutral-500 flex items-start gap-2">
                          <span className="text-emerald-500">•</span> {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expandable Breakdown Section */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full py-4 px-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 flex items-center justify-between group hover:border-neutral-700 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Calculator className="w-4 h-4" />
            </div>
            <span className="font-bold text-neutral-200 group-hover:text-white transition-colors">
              {showBreakdown
                ? breakdownTranslations.cta_close
                : breakdownTranslations.cta_open}
            </span>
          </div>
          {showBreakdown ? (
            <ChevronUp className="w-5 h-5 text-neutral-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          )}
        </button>

        <AnimatePresence>
          {showBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4">
              <div className="p-8 rounded-3xl bg-neutral-900/30 border border-neutral-800/50">
                <h4 className="text-xs font-black text-white mb-8 uppercase tracking-[0.2em] text-center">
                  {breakdownTranslations.title}
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-800">
                        <th className="py-4 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                          Item
                        </th>
                        <th className="py-4 px-4 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                          {breakdownTranslations.year_1}
                        </th>
                        <th className="py-4 px-4 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                          {breakdownTranslations.year_2}
                        </th>
                        <th className="py-4 px-4 text-right text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {costs.items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-neutral-800/30">
                          <td className="py-4 pr-4">
                            <span className="text-[11px] font-bold text-neutral-300 block">
                              {item.label}
                            </span>
                            <span className="text-[9px] text-neutral-500 leading-tight block mt-1">
                              {item.info}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[11px] text-neutral-400">
                            ${(item.min * 0.6).toLocaleString()} - $
                            {(item.max * 0.6).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-[11px] text-neutral-400">
                            ${(item.min * 0.4).toLocaleString()} - $
                            {(item.max * 0.4).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right text-[11px] font-bold text-neutral-200">
                            ${item.min.toLocaleString()} - $
                            {item.max.toLocaleString()}
                          </td>
                        </tr>
                      ))}

                      {/* Noctra Row */}
                      <tr className="bg-emerald-500/5">
                        <td className="py-5 pr-4 pl-4 border-l-2 border-emerald-500">
                          <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">
                            Noctra Studio
                          </span>
                        </td>
                        <td className="py-5 px-4 text-[11px] font-black text-white">
                          $20,000
                        </td>
                        <td className="py-5 px-4 text-[11px] font-black text-white">
                          $0
                        </td>
                        <td className="py-5 px-4 text-right text-[11px] font-black text-emerald-400">
                          $20,000
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-neutral-950/50">
                        <td className="py-6 px-4 font-black text-white text-xs uppercase tracking-widest">
                          {breakdownTranslations.grand_total}
                        </td>
                        <td colSpan={2}></td>
                        <td className="py-6 px-4 text-right font-black text-white text-lg">
                          ${costs.min.toLocaleString()} - $
                          {costs.max.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-800/50 grid grid-cols-1 md:grid-cols-2 gap-8 text-[10px]">
                  <div>
                    <h5 className="font-black text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" />{" "}
                      {breakdownTranslations.extra_considerations}
                    </h5>
                    <ul className="space-y-2">
                      {breakdownTranslations.extra_items.map(
                        (h: string, i: number) => (
                          <li
                            key={i}
                            className="text-neutral-500 flex items-start gap-2">
                            <span className="text-amber-500/50">•</span> {h}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> Beneficios Adicionales
                    </h5>
                    <ul className="space-y-2">
                      <li className="text-neutral-500 flex items-start gap-2">
                        <span className="text-emerald-500/50">•</span> Todo
                        integrado en una sola plataforma
                      </li>
                      <li className="text-neutral-500 flex items-start gap-2">
                        <span className="text-emerald-500/50">•</span> Un solo
                        punto de contacto para todo
                      </li>
                      <li className="text-neutral-500 flex items-start gap-2">
                        <span className="text-emerald-500/50">•</span>{" "}
                        Optimización continua de performance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Savings Banner Footer */}
      {selectedOptions.size > 0 && (
        <div className="max-w-5xl mx-auto mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group p-10 rounded-[3rem] bg-gradient-to-br from-neutral-900 to-neutral-950 border border-emerald-500/30 overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calculator className="w-32 h-32 text-emerald-500" />
            </div>

            <h4 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10 uppercase tracking-widest">
              {savingsCard.title}
            </h4>
            <div className="text-5xl md:text-7xl font-black text-emerald-500 mb-6 relative z-10 tracking-tight">
              ${savings.toLocaleString()}
              <span className="text-lg font-medium text-neutral-500 ml-4 tracking-normal uppercase">
                en 2 años
              </span>
            </div>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto relative z-10 text-lg leading-relaxed italic">
              "
              {
                savingsCard.enough_to_items[
                  Math.floor(Math.random() * savingsCard.enough_to_items.length)
                ]
              }
              "
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("roi-calculator")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto relative z-10">
              Calcular ROI exacto para mi negocio{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Methodology Section */}
      <div className="max-w-4xl mx-auto border-t border-neutral-800/50 pt-12 px-4 pb-24">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-2 text-[11px] font-bold text-neutral-500 hover:text-neutral-300 transition-colors mx-auto uppercase tracking-[0.2em]">
          <Code2 className="w-3.5 h-3.5" />
          {methodologyData.title}
          {showMethodology ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        <AnimatePresence>
          {showMethodology && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-neutral-400 leading-relaxed italic mb-6">
                      {methodologyData.summary}
                    </p>
                    <div className="space-y-6">
                      {methodologyData.sections.map(
                        (section: any, idx: number) => (
                          <div key={idx} className="space-y-3">
                            <h5 className="text-[10px] font-black text-white uppercase tracking-widest">
                              {section.title}
                            </h5>
                            <ul className="space-y-2">
                              {section.items?.map((item: string, i: number) => (
                                <li
                                  key={i}
                                  className="text-[11px] text-neutral-500 flex items-start gap-2 leading-relaxed">
                                  <span className="text-emerald-500/50 mt-1">
                                    •
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/50 space-y-6">
                    <div>
                      <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">
                        CONVERSIÓN Y MONEDA
                      </h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        {methodologyData.currency}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">
                        VARIACIONES
                      </h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        {methodologyData.variations}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-3">
                        COMPROMISO
                      </h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        {methodologyData.commitment}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                      <span className="text-[9px] text-neutral-600 font-bold italic">
                        {methodologyData.last_updated}
                      </span>
                      <a
                        href="mailto:hello@noctra.studio"
                        className="text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                        Reportar Inexactitud{" "}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
