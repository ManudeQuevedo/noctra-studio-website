"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "@/i18n/routing";
import NextImage from "next/image";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Stethoscope,
  Scale,
  Briefcase,
  Building2,
  GraduationCap,
  ShoppingBag,
  Shirt,
  Utensils,
  Palette,
  Sparkles,
  Settings,
  Presentation,
  HardHat,
  Hospital,
  LayoutPanelLeft,
  ExternalLink,
  Tag,
  Calendar,
  Zap,
  Clock,
  Package,
  CircleDollarSign,
  Lightbulb,
  Search,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Components
import { PhaseSelector } from "@/components/services/PhaseSelector";
import { ComparisonTable } from "@/components/services/ComparisonTable";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { SmartCTA } from "@/components/services/SmartCTA";
import { Button } from "@/components/ui/button";

// Static images map
const SERVICE_IMAGES = {
  web_dev: "/images/architecture.jpg",
  ecommerce: "/images/identity.jpg",
  ai: "/images/ai.jpg",
  seo: "/images/seo.jpg",
};

// Helper for translation icon keys
const ICON_MAP: Record<string, any> = {
  "👨‍⚕️": Stethoscope,
  "⚖️": Scale,
  "💼": Briefcase,
  "🏢": Building2,
  "🎓": GraduationCap,
  "🛍️": ShoppingBag,
  "👕": Shirt,
  "🍽️": Utensils,
  "🎨": Palette,
  "💄": Sparkles,
  "⚙️": Settings,
  "📊": Presentation,
  "🏗️": HardHat,
  "🏥": Hospital,
  "🖥️": LayoutPanelLeft,
};

// Custom Illustrated Icons for Standards
const StandardIcons = {
  Performance: () => (
    <div className="relative w-16 h-16 mx-auto mb-6 group">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-800"
        />
        <path
          d="M32 8V12"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-700"
        />
        <path
          d="M56 32H52"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-700"
        />
        <path
          d="M32 56V52"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-700"
        />
        <path
          d="M8 32H12"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-700"
        />
        <motion.path
          d="M32 32L50 14"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ rotate: -90 }}
          whileInView={{ rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ originX: "32px", originY: "32px" }}
        />
        <circle cx="32" cy="32" r="4" fill="#10b981" />
        <text
          x="32"
          y="48"
          textAnchor="middle"
          className="text-[8px] font-black fill-emerald-500/50 uppercase tracking-widest">
          1.5s
        </text>
      </svg>
      <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  ),
  Worldwide: () => (
    <div className="relative w-16 h-16 mx-auto mb-6 group">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-800"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="12"
          ry="28"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-800"
        />
        <line
          x1="4"
          y1="32"
          x2="60"
          y2="32"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-800"
        />
        <motion.circle
          cx="32"
          cy="12"
          r="3"
          fill="#10b981"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="52"
          cy="40"
          r="3"
          fill="#10b981"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="12"
          cy="40"
          r="3"
          fill="#10b981"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <path
          d="M32 12L52 40L12 40Z"
          stroke="#10b981"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="opacity-30"
        />
      </svg>
    </div>
  ),
  Secure: () => (
    <div className="relative w-16 h-16 mx-auto mb-6 group">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full">
        <path
          d="M32 6L10 14V30C10 44 32 58 32 58C32 58 54 44 54 30V14L32 6Z"
          stroke="#10b981"
          strokeWidth="2"
          className="fill-emerald-500/5"
        />
        <motion.path
          d="M20 32L28 40L44 24"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <rect
          x="42"
          y="10"
          width="16"
          height="10"
          rx="4"
          className="fill-emerald-500"
        />
        <text
          x="50"
          y="17"
          textAnchor="middle"
          className="text-[6px] font-black fill-black lowercase">
          99.9%
        </text>
      </svg>
    </div>
  ),
};

const PricingBreakdown = ({ serviceKey }: { serviceKey: string }) => {
  const t = useTranslations("ServicesPage.pricing_breakdown");
  const labels = t.raw("labels") as any;
  const data = t.raw(serviceKey) as any;

  if (!data) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="overflow-hidden">
      <div className="mt-8 p-8 md:p-10 rounded-[2rem] bg-neutral-950/60 border border-emerald-500/10 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Included & Deliverables */}
          <div className="space-y-12">
            <div>
              <h5 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <Package className="w-3.5 h-3.5 text-emerald-500" />
                {labels.included}
              </h5>
              <ul className="grid grid-cols-1 gap-4">
                {data.included.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <LayoutPanelLeft className="w-3.5 h-3.5 text-emerald-500" />
                {labels.deliverables}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.deliverables.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm text-white font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Timeline & Investment */}
          <div className="space-y-12">
            <div>
              <h5 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                {labels.timeline}
              </h5>
              <div className="space-y-4">
                {data.timeline.map((step: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 group/step">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-last:bg-emerald-500" />
                    <span className="text-sm text-neutral-400 group-last:text-white group-last:font-bold">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-800">
              <h5 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <CircleDollarSign className="w-3.5 h-3.5 text-emerald-500" />
                {labels.investment}
              </h5>

              {data.investment ? (
                <div className="space-y-3">
                  {data.investment
                    .filter((inv: any) => !inv.total)
                    .map((inv: any, i: number) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm py-1 border-b border-white/[0.03]">
                        <span className="text-neutral-500">{inv.label}</span>
                        <span className="text-white font-mono">
                          {inv.value}
                        </span>
                      </div>
                    ))}
                  <div className="flex justify-between items-center pt-8 text-2xl font-black text-white">
                    <span>{labels.total}</span>
                    <span className="text-emerald-500">
                      {data.investment.find((inv: any) => inv.total)?.total}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.investment_notes.map((note: string, i: number) => (
                    <p
                      key={i}
                      className="text-sm text-neutral-400 italic font-medium">
                      {note}
                    </p>
                  ))}
                </div>
              )}

              {data.note && (
                <div className="mt-8 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-3 h-3 text-emerald-500" />
                  </div>
                  <p className="text-xs text-emerald-500/80 font-medium leading-relaxed">
                    {data.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceSection = ({
  serviceKey,
  index,
  image,
}: {
  serviceKey: string;
  index: number;
  image: string;
}) => {
  const t = useTranslations("ServicesPage");
  const [showExamples, setShowExamples] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  // Extract industries data
  const industriesRaw = t.raw(`best_for.${serviceKey}`);
  const industries = Array.isArray(industriesRaw) ? industriesRaw : [];

  const examplesRaw = t.raw(`real_examples.items.${serviceKey}`);
  const examples = Array.isArray(examplesRaw) ? examplesRaw : [];

  const isCustomSystem = serviceKey === "ai";
  const isSEO = serviceKey === "seo";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
        {/* Left Column - Visual Anchor & Badges */}
        <div className="md:col-span-5 relative group">
          <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-neutral-800 shadow-2xl">
            <NextImage
              src={image}
              alt={t(`${serviceKey}.title`)}
              fill
              className="object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

            {/* Overlay Label Card (Bottom) */}
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-neutral-950/60 backdrop-blur-xl border border-white/10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 font-black text-black text-[10px] uppercase tracking-widest mb-3">
                {t(`${serviceKey}.image_label`)}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                {t(`${serviceKey}.title`)}
              </h3>
              <p className="text-sm text-neutral-400 line-clamp-2">
                {t(`${serviceKey}.focus`)}
              </p>
            </div>

            {/* Pricing Badge (Top Right) */}
            <div className="absolute top-6 right-6">
              <div className="px-4 py-2 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 transform group-hover:translate-y-[-4px] transition-transform">
                <Tag className="w-3.5 h-3.5" />
                {t(`${serviceKey}.pricing_label`)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Problem/Solution/Details */}
        <div className="md:col-span-7 space-y-12">
          {/* Problem & Solution Blocks */}
          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] relative overflow-hidden group/box">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/20" />
              <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3">
                {t("problem_label")}
              </h4>
              <p className="text-xl text-neutral-300 font-medium leading-relaxed">
                {t(`${serviceKey}.problem`)}
              </p>
            </div>
            <div className="p-8 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-[2.5rem] relative overflow-hidden group/box shadow-[0_20px_40px_-20px_rgba(16,185,129,0.1)]">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/40" />
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">
                {t("solution_label")}
              </h4>
              <p className="text-xl text-white font-medium leading-relaxed">
                {t(`${serviceKey}.solution`)}
              </p>
            </div>
          </div>

          {/* Strategic CTA & Pricing Section */}
          <div className="pt-8 border-t border-neutral-800">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-black text-white tracking-tight">
                  {isCustomSystem
                    ? t("pricing_breakdown.ai.investment_notes.1").split(
                        ": ",
                      )[1]
                    : isSEO
                      ? t("pricing_breakdown.seo.investment.0.value")
                      : t(`${serviceKey}.pricing_label`)}
                </span>
                {(isCustomSystem || isSEO) && (
                  <span className="text-sm text-neutral-500 italic">
                    {isCustomSystem
                      ? `(${t("pricing_breakdown.ai.investment_notes.2")})`
                      : `(${t("pricing_breakdown.seo.note")})`}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href={{ pathname: "/contact", query: { focus: serviceKey } }}
                  className="px-8 py-5 rounded-xl bg-emerald-500 text-black font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)]">
                  {isCustomSystem ? (
                    <Calendar className="w-5 h-5" />
                  ) : isSEO ? (
                    <Search className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                  {isCustomSystem
                    ? t("cta_labels.scoping_call")
                    : isSEO
                      ? t("cta_labels.site_audit")
                      : t("cta_labels.default")}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setShowPricing(!showPricing)}
                  className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2 group underline-offset-4 hover:underline">
                  {showPricing
                    ? t("pricing_breakdown.labels.hide")
                    : t("pricing_breakdown.labels.show")}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      showPricing && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {/* Scoping Call Context Box for Custom Systems */}
              {isCustomSystem && (
                <div className="p-8 rounded-[2rem] bg-neutral-900/50 border-l-4 border-emerald-500 space-y-6">
                  <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em]">
                    <Lightbulb className="w-4 h-4 text-emerald-500" />
                    {t("scoping_call_box.title")}
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                    {t
                      .raw("scoping_call_box.items")
                      .map((point: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-neutral-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                          {point}
                        </li>
                      ))}
                  </ul>
                  <p className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.3em] pt-2">
                    {t("scoping_call_box.footer")}
                  </p>
                </div>
              )}

              <AnimatePresence>
                {showPricing && <PricingBreakdown serviceKey={serviceKey} />}
              </AnimatePresence>
            </div>
          </div>

          {/* Best For section */}
          <div className="pt-8 border-t border-neutral-800">
            <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-8">
              {t("best_for.label")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industries.map((item: any, i: number) => {
                const Icon = ICON_MAP[item.icon] || Check;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl border border-neutral-800/50 bg-white/[0.01] hover:border-emerald-500/30 transition-all group/ind">
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-emerald-500 group-hover/ind:bg-emerald-500 group-hover/ind:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-neutral-300 group-hover/ind:text-white transition-colors">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real Examples Collapsible */}
          <div className="pt-8 border-t border-neutral-800">
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="w-full flex items-center justify-between text-left group">
              <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
                {t("real_examples.title")}
              </h4>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-neutral-500 transition-transform",
                  showExamples && "rotate-180 text-emerald-500",
                )}
              />
            </button>
            <AnimatePresence>
              {showExamples && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {examples.map((example: any, i: number) => (
                      <div
                        key={i}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/50">
                        <p className="text-xs font-black text-emerald-500 mb-2 uppercase tracking-widest">
                          {example.name}
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                          {example.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/work"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-emerald-500 transition-all uppercase tracking-widest">
                    {t("real_examples.view_more")}{" "}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesClient() {
  const [activeTab, setActiveTab] = useState("web_dev");
  const t = useTranslations("ServicesPage");

  const phases = [
    { id: "web_dev", label: t("journey.phases.web_dev") },
    { id: "ecommerce", label: t("journey.phases.ecommerce") },
    { id: "ai", label: t("journey.phases.ai") },
    { id: "seo", label: t("journey.phases.seo") },
  ];

  const contactRef = useRef<HTMLDivElement>(null);
  const isContactInView = useInView(contactRef, { amount: 0.1 });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-transparent pt-48 pb-0 relative z-0 selection:bg-emerald-500/30">
      {/* Header */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-6xl md:text-[9.5rem] font-black tracking-tight mb-8 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-xl md:text-3xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}>
              <Button
                asChild
                size="lg"
                className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 transition-colors duration-300">
                <Link
                  href={{
                    pathname: "/contact",
                    query: { intent: "discovery" },
                  }}>
                  {t("hero_cta_consult")}
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.getElementById("comparison");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full h-12 px-8 text-base border-neutral-800 text-neutral-400 hover:text-white hover:border-white hover:bg-transparent transition-all duration-300">
                {t("hero_cta_pricing")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Phase Selector */}
      <PhaseSelector
        phases={phases}
        activePhase={activeTab}
        setActivePhase={setActiveTab}
      />

      {/* Main Experience Display */}
      <section
        id="experience"
        className="mb-32 min-h-[800px] scroll-mt-48 w-full max-w-7xl mx-auto px-6 md:px-8">
        <AnimatePresence mode="wait">
          <ServiceSection
            key={activeTab}
            serviceKey={activeTab}
            index={phases.findIndex((p) => p.id === activeTab)}
            image={SERVICE_IMAGES[activeTab as keyof typeof SERVICE_IMAGES]}
          />
        </AnimatePresence>
      </section>

      {/* Standards Break */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 bg-neutral-950 py-32 border-y border-neutral-800 mb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
            <div className="space-y-4 group">
              <StandardIcons.Performance />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                STANDARD 01
              </span>
              <div className="text-3xl md:text-5xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {t("metrics.lighthouse")}
              </div>
            </div>
            <div className="space-y-4 group">
              <StandardIcons.Worldwide />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                STANDARD 02
              </span>
              <div className="text-3xl md:text-5xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {t("metrics.latency")}
              </div>
            </div>
            <div className="space-y-4 group">
              <StandardIcons.Secure />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                STANDARD 03
              </span>
              <div className="text-3xl md:text-5xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {t("metrics.uptime")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Interactive Sections */}
      <div
        id="comparison"
        className="scroll-mt-32 max-w-7xl mx-auto px-6 md:px-8">
        <ComparisonTable />
      </div>

      <div id="faq" className="scroll-mt-32 max-w-7xl mx-auto px-6 md:px-8">
        <ServiceFAQ />
      </div>

      <div
        id="contact"
        ref={contactRef}
        className="scroll-mt-32 max-w-7xl mx-auto px-6 md:px-8 pb-32">
        <SmartCTA activePhase={activeTab} />
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 z-50 pointer-events-none">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: isContactInView ? 150 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full p-4 rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
              {activeTab.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-white">
              {activeTab === "ai"
                ? t("pricing_breakdown.ai.investment_notes.1").split(": ")[1]
                : activeTab === "seo"
                  ? t("pricing_breakdown.seo.investment.0.value")
                  : t(`${activeTab}.pricing_label`)}
            </span>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest flex items-center gap-2">
            {t("start_project")} <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
