"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Zap,
  Target,
  CheckCircle2,
  Briefcase,
  DollarSign,
  ShieldCheck,
  Globe,
  Clock,
  MessageSquare,
  FileCode,
  Check,
  Award,
  Palette,
  Type,
  Camera,
  Layout,
  PenTool,
  LineChart,
  Rocket,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Coins,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}>
    {children}
  </motion.div>
);

export function CareersClient() {
  const t = useTranslations("TalentPage");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const howItWorksIcons = [Search, Zap, Users, Briefcase, Rocket];
  const benefitIcons = [
    DollarSign,
    Award,
    Target,
    ShieldCheck,
    Clock,
    Briefcase,
    Globe,
    CheckCircle2,
  ];

  return (
    <main className="min-h-screen bg-transparent text-neutral-50 relative">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-8 pt-40 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            {t("hero.headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            {(() => {
              const text = t("hero.subheadline");
              const parts = text.split(/(40%|3 días|3 days|3 business days)/g);
              return parts.map((part, i) =>
                part === "40%" ||
                part === "3 días" ||
                part === "3 days" ||
                part === "3 business days" ? (
                  <span key={i} className="text-white font-bold">
                    {part}
                  </span>
                ) : (
                  part
                ),
              );
            })()}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button
                asChild
                size="lg"
                className="rounded-full h-14 px-10 text-lg bg-white text-black hover:bg-neutral-200 transition-colors duration-300 w-full sm:w-auto">
                <a href="#apply">{t("hero.cta_primary")}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full h-14 px-10 text-lg border-neutral-700 text-neutral-300 hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto">
                <a href="#pricing">{t("hero.cta_secondary")}</a>
              </Button>
            </div>
            <p className="text-sm text-neutral-500 font-medium tracking-wide">
              {t("hero.micro_copy")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("how_it_works.title")}
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                {t("how_it_works.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[0, 1, 2, 3, 4].map((i) => {
              const Icon = howItWorksIcons[i] || Zap;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-neutral-800 flex items-center justify-center mb-6 font-mono text-sm">
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h3 className="font-bold text-base mb-2">
                      {t(`how_it_works.steps.${i}.title`)}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                      {t(`how_it_works.steps.${i}.description`)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("roles.title")}
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                {t("roles.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const highDemand = t.raw(`roles.items.${i}.high_demand`);
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="h-full p-8 rounded-2xl border border-neutral-800 bg-black hover:border-neutral-700 transition-all group flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] py-1 px-3 rounded-full border border-neutral-800 text-neutral-500 uppercase tracking-widest font-bold">
                        {t("roles.badge_freelance")}
                      </span>
                      {highDemand && (
                        <span className="text-[10px] py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 uppercase tracking-widest font-bold flex items-center gap-1">
                          {t("roles.badge_high_demand")}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-4">
                      {t(`roles.items.${i}.role_name`)}
                    </h3>

                    <div className="space-y-4 mb-8 flex-grow">
                      <ul className="space-y-3">
                        {[0, 1, 2].map((j) => (
                          <li
                            key={j}
                            className="text-sm md:text-base text-neutral-400 flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 mt-2 shrink-0" />
                            {t(`roles.items.${i}.what_you_do.${j}`)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-neutral-800 space-y-4">
                      <div>
                        <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1.5 font-bold">
                          {t("compensation.title")}
                        </p>
                        <p className="text-base font-bold text-emerald-500">
                          {t(`roles.items.${i}.compensation_range`)}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-neutral-500 italic leading-relaxed">
                          {t(`roles.items.${i}.typical_example`)}
                        </p>
                        <p className="text-xs text-neutral-500 italic leading-relaxed">
                          {t(`roles.items.${i}.complex_example`)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-800/50">
                        <TrendingUp className="w-3 h-3 text-neutral-600" />
                        {t(`roles.items.${i}.demand`)}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-16 p-8 md:p-12 rounded-3xl bg-neutral-900/30 border border-neutral-800/50 relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-16 -mt-16 z-0" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {t("roles.current_needs.title")}
                    </h3>
                    <p className="text-neutral-400 text-lg">
                      {t("roles.current_needs.intro")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-5 bg-neutral-900/50 rounded-2xl border border-neutral-800/50 hover:border-emerald-500/30 transition-all group">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <span className="text-base font-medium text-neutral-300">
                        {t(`roles.current_needs.high_priority_list.${i}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-neutral-800/50">
                  <p className="text-sm text-neutral-500 italic max-w-2xl mx-auto md:mx-0">
                    {t("roles.current_needs.closing_note")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
              {t("benefits.title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const Icon = benefitIcons[i] || CheckCircle2;
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h3 className="font-bold text-base">
                      {t(`benefits.items.${i}.title`)}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                      {t(`benefits.items.${i}.description`)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/30 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("expectations.title")}
              </h2>
              <p className="text-neutral-400 text-lg">
                {t("expectations.intro")}
              </p>
            </div>
          </FadeIn>
          <div className="space-y-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-neutral-800 bg-black flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-neutral-800 flex items-center justify-center shrink-0 font-mono text-xs">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {t(`expectations.items.${i}.title`)}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                      {t(`expectations.items.${i}.description`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Model Section */}
      <section
        id="pricing"
        className="py-32 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/20 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {t("pricing_model.title")}
              </h2>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                {t("pricing_model.intro")}
              </p>
            </div>
          </FadeIn>

          {/* Visual Flow Diagram */}
          <div className="mb-32">
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
              {/* Step 1: Client */}
              <FadeIn className="flex-1 w-full" delay={0.1}>
                <div className="p-8 rounded-3xl border border-neutral-800 bg-black text-center relative group h-full">
                  <div className="text-4xl font-bold mb-2 text-white">
                    {t("pricing_model.diagram.step_1.amount")}
                  </div>
                  <div className="text-base font-medium text-neutral-400 capitalize">
                    {t("pricing_model.diagram.step_1.label")}
                  </div>
                </div>
              </FadeIn>

              <ArrowRight className="hidden md:block w-8 h-8 text-neutral-800" />
              <div className="md:hidden w-px h-8 bg-neutral-800" />

              {/* Step 2: Noctra */}
              <FadeIn className="flex-1 w-full" delay={0.2}>
                <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 text-center relative h-full">
                  <div className="text-4xl font-bold mb-2 text-neutral-400">
                    {t("pricing_model.diagram.step_2.amount")}
                  </div>
                  <div className="text-base font-medium text-neutral-500 mb-4">
                    {t("pricing_model.diagram.step_2.label")}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed max-w-[220px] mx-auto">
                    {t("pricing_model.diagram.step_2.breakdown")}
                  </p>
                </div>
              </FadeIn>

              <ArrowRight className="hidden md:block w-8 h-8 text-neutral-800" />
              <div className="md:hidden w-px h-8 bg-neutral-800" />

              {/* Step 3: You */}
              <FadeIn className="flex-1 w-full" delay={0.3}>
                <div className="p-8 rounded-3xl border-2 border-emerald-500/20 bg-emerald-500/5 text-center relative h-full shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                  <div className="text-4xl font-bold mb-2 text-emerald-500">
                    {t("pricing_model.diagram.step_3.amount")}
                  </div>
                  <div className="text-base font-bold text-white mb-4 uppercase tracking-widest">
                    {t("pricing_model.diagram.step_3.label")}
                  </div>
                  <p className="text-xs text-emerald-500/80 leading-relaxed font-medium">
                    {t("pricing_model.diagram.step_3.breakdown")}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
            <FadeIn>
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    {t("pricing_model.headline_2")}
                  </h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">
                    {t("pricing_model.subtext")}
                  </p>
                </div>

                <div className="relative p-8 rounded-3xl border border-neutral-800 bg-black overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Coins className="w-24 h-24" />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">
                    {t("pricing_model.example.title")}
                  </h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-neutral-900 pb-4">
                      <div>
                        <p className="text-xs text-neutral-600 uppercase font-bold mb-1">
                          {t("pricing_model.example.label_client_pays")}
                        </p>
                        <p className="text-2xl font-bold text-neutral-300">
                          {t("pricing_model.example.client_pays")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-neutral-600 uppercase font-bold mb-1">
                          {t("pricing_model.example.label_your_gain")}
                        </p>
                        <p className="text-2xl font-bold text-emerald-500">
                          {t("pricing_model.example.your_share.amount")}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-2">
                      <div>
                        <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                          {t("pricing_model.example.noctra_share.for")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                          {t("pricing_model.example.your_share.for")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              {/* Expandable Comparison */}
              <div className="border border-neutral-800 rounded-3xl overflow-hidden bg-black/40">
                <button
                  onClick={() => {
                    const el = document.getElementById("comparison-content");
                    if (el) el.classList.toggle("hidden");
                  }}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors group">
                  <span className="font-bold text-neutral-300 group-hover:text-white transition-colors">
                    {t("pricing_model.comparison.button_text")}
                  </span>
                  <ChevronDown className="w-5 h-5 text-neutral-600" />
                </button>

                <div
                  id="comparison-content"
                  className="hidden border-t border-neutral-800 p-8 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <h4 className="text-xl font-bold mb-3">
                      {t("pricing_model.comparison.title")}
                    </h4>
                    <p className="text-base text-neutral-400">
                      {t("pricing_model.comparison.intro")}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-neutral-800">
                          <th className="py-4 font-bold text-neutral-500 uppercase tracking-widest">
                            {t("pricing_model.comparison.table.headers.0")}
                          </th>
                          <th className="py-4 font-bold text-neutral-500 uppercase tracking-widest">
                            {t("pricing_model.comparison.table.headers.1")}
                          </th>
                          <th className="py-4 font-bold text-neutral-500 uppercase tracking-widest">
                            {t("pricing_model.comparison.table.headers.2")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1, 2, 3, 4].map((i) => {
                          const isNoctra = i === 4;
                          return (
                            <tr
                              key={i}
                              className={`border-b border-neutral-900/50 ${isNoctra ? "bg-emerald-500/5" : ""}`}>
                              <td
                                className={`py-4 font-medium ${isNoctra ? "text-white" : "text-neutral-400"}`}>
                                {t(
                                  `pricing_model.comparison.table.rows.${i}.platform`,
                                )}
                              </td>
                              <td
                                className={`py-4 font-bold ${isNoctra ? "text-emerald-500" : "text-neutral-300"}`}>
                                {t(
                                  `pricing_model.comparison.table.rows.${i}.earnings`,
                                )}
                              </td>
                              <td className="py-4 text-xs text-neutral-500 leading-relaxed max-w-[220px]">
                                {t(
                                  `pricing_model.comparison.table.rows.${i}.time`,
                                )}
                                {t.raw(
                                  `pricing_model.comparison.table.rows.${i}.footnote`,
                                ) && (
                                  <div className="mt-1 text-[10px] text-neutral-700 italic">
                                    {t(
                                      `pricing_model.comparison.table.rows.${i}.footnote`,
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-8 border-t border-neutral-900">
                    <h5 className="text-sm font-bold mb-6 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-500" />
                      {t("pricing_model.comparison.effective_rate.title")}
                    </h5>
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-neutral-500 mb-4">
                        {t(
                          "pricing_model.comparison.effective_rate.scenario_title",
                        )}
                      </p>
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-2xl border ${i === 2 ? "border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.03)]" : "border-neutral-900 bg-neutral-900/30"}`}>
                          <div className="flex justify-between items-start mb-2">
                            <span
                              className={`text-xs font-bold uppercase tracking-widest ${i === 2 ? "text-emerald-500" : "text-neutral-500"}`}>
                              {t(
                                `pricing_model.comparison.effective_rate.scenarios.${i}.type`,
                              )}
                            </span>
                            <span className="text-base font-bold text-white">
                              {t(
                                `pricing_model.comparison.effective_rate.scenarios.${i}.rate`,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>
                              {t(
                                `pricing_model.comparison.effective_rate.scenarios.${i}.earnings`,
                              )}
                            </span>
                            <span>
                              {t(
                                `pricing_model.comparison.effective_rate.scenarios.${i}.time`,
                              )}
                            </span>
                          </div>
                          {i === 2 && (
                            <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-emerald-500/10">
                              {[0, 1, 2].map((j) => (
                                <span
                                  key={j}
                                  className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-full font-medium">
                                  ✓{" "}
                                  {t(
                                    `pricing_model.comparison.effective_rate.scenarios.${i}.benefits.${j}`,
                                  )}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-8 text-sm text-neutral-500 italic leading-relaxed bg-neutral-900/30 p-4 rounded-2xl border border-neutral-900">
                      {t("pricing_model.comparison.closing_note")}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Payment Terms */}
          <FadeIn>
            <div className="max-w-4xl mx-auto bg-black p-10 rounded-[40px] border border-neutral-800 shadow-2xl">
              <h4 className="text-2xl font-bold mb-10 text-center">
                {t("pricing_model.terms.title")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto transition-transform hover:scale-110">
                      <Check className="w-6 h-6 text-emerald-500" />
                    </div>
                    <p className="text-base text-neutral-400 font-medium leading-relaxed">
                      {t(`pricing_model.terms.list.${i}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="apply"
        className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-white text-black relative z-10">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <FadeIn>
              <div className="bg-black text-white p-8 md:p-12 rounded-3xl border border-neutral-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-16 -mt-16 z-0" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                      <Check className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        {t("application.success.title")}
                      </h2>
                      <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs mt-1">
                        Application Received
                      </p>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {/* Section 1: Next Steps */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                        <span className="w-8 h-px bg-neutral-800" />
                        {t("application.success.section_1.title")}
                      </h3>
                      <div className="space-y-4 ml-10">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="space-y-2">
                            <p className="text-neutral-200 font-medium">
                              {t(`application.success.section_1.steps.${i}`)}
                            </p>
                            {i === 2 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4 pl-4 border-l border-neutral-800">
                                {[3, 4, 5, 6].map((idx) => (
                                  <p
                                    key={idx}
                                    className="text-neutral-500 text-base">
                                    {t(
                                      `application.success.section_1.steps.${idx}`,
                                    )}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 2: Contact Info */}
                    <div className="ml-10">
                      <p className="text-neutral-400 text-base leading-relaxed max-w-xl italic">
                        "{t("application.success.section_2.content")}"
                      </p>
                    </div>

                    {/* Section 3: In the meantime */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                        <span className="w-8 h-px bg-neutral-800" />
                        {t("application.success.section_3.title")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
                        {[0, 1].map((i) => (
                          <a
                            key={i}
                            href={t(
                              `application.success.section_3.actions.${i}.link`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-5 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between gap-4">
                            <p className="text-sm text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                              {t(
                                `application.success.section_3.actions.${i}.text`,
                              )}
                            </p>
                            <div className="flex items-center gap-2 text-emerald-500 font-bold group-hover:text-emerald-400 transition-colors">
                              {t(
                                `application.success.section_3.actions.${i}.link_text`,
                              )}
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Closing */}
                    <div className="pt-12 border-t border-neutral-900 text-center">
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">
                        {t("application.success.closing.content")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : (
            <>
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                    {t("application.title")}
                  </h2>
                  <p className="text-neutral-600 text-lg">
                    {t("application.intro")}
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-8">
                <FadeIn delay={0.1}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                          {t("application.fields.name")}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                          {t("application.fields.email")}
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                          {t("application.fields.phone")}
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                          {t("application.fields.location")}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors"
                        />
                        <p className="text-xs text-neutral-400">
                          {t("application.fields.location_note")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                        {t("application.fields.specialization")}
                      </label>
                      <select
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors appearance-none">
                        <option value="">
                          {t("application.fields.specialization")}
                        </option>
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                          <option key={i} value={i}>
                            {t(
                              `application.fields.specialization_options.${i}`,
                            )}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                        {t("application.fields.portfolio_url")}
                      </label>
                      <input
                        type="url"
                        placeholder="https://"
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors"
                      />
                      <p className="text-xs text-neutral-400">
                        {t("application.fields.portfolio_note")}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                        {t("application.fields.best_work")}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t(
                          "application.fields.best_work_placeholder",
                        )}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                          {t("application.fields.availability")}
                        </label>
                        <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors appearance-none">
                          {[0, 1, 2].map((i) => (
                            <option key={i}>
                              {t(
                                `application.fields.availability_options.${i}`,
                              )}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                          {t("application.fields.rate_expectation")}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors"
                        />
                        <p className="text-xs text-neutral-400">
                          {t("application.fields.rate_note")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                        {t("application.fields.why_interested")}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t("application.fields.why_placeholder")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 text-base focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>

                    <Button className="w-full rounded-full h-14 bg-black text-white hover:bg-neutral-800 text-lg font-bold transition-all">
                      {t("application.submit")}
                    </Button>
                  </form>
                </FadeIn>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-16 text-center">
              {t("faq.title")}
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold">
                    {t(`faq.items.${i}.q`)}
                  </h3>
                  <p className="text-neutral-400 text-base leading-relaxed">
                    {t(`faq.items.${i}.a`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-24 pt-24 border-t border-neutral-800">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-16 text-center">
                {t("faq.compensation_title")}
              </h2>
            </FadeIn>
            <div className="space-y-8">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <FadeIn key={`comp-faq-${i}`} delay={i * 0.1}>
                  <div className="space-y-3">
                    <h3 className="text-lg md:text-xl font-bold">
                      {t(`faq.compensation_items.${i}.q`)}
                    </h3>
                    <p className="text-neutral-400 text-base leading-relaxed whitespace-pre-line">
                      {t(`faq.compensation_items.${i}.a`)}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-16 px-6 md:px-8 bg-black relative z-10">
        <div className="max-w-4xl mx-auto text-xs text-neutral-600 space-y-4 text-center lowercase tracking-widest">
          <p>{t("legal.contractor_status")}</p>
          <p>{t("legal.ip_ownership")}</p>
        </div>
      </section>
    </main>
  );
}
