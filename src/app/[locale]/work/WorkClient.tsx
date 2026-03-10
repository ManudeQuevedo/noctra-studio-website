"use client";

import { useState } from "react";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { PublicProjectCard } from "@/types/site-project";
import {
  ArrowRight,
  Code,
  Search,
  Zap,
  LifeBuoy,
  MessageSquare,
  Construction,
  CheckCircle2,
  ChevronDown,
  Layout,
  Rocket,
  Settings,
  Monitor,
  Smartphone,
  Target,
  Activity,
  Milestone,
  CreditCard,
  Hammer,
  Building2,
  Briefcase,
  ShoppingBag,
  Stethoscope,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  DollarSign,
  ListChecks,
  Globe,
  RotateCcw,
  BarChart3,
  ChevronUp,
  ArrowLeftRight,
  XCircle,
  Split,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function WorkClient({
  projects,
}: {
  projects: PublicProjectCard[];
}) {
  const t = useTranslations("WorkPage");
  const locale = useLocale();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState(0);

  const activeProjects = projects.filter((p) => p.status !== "completed");
  const completedProjects = projects.filter((p) => p.status === "completed");

  const icons: Record<string, any> = {
    code: Code,
    search: Search,
    zap: Zap,
    "life-buoy": LifeBuoy,
    "message-square": MessageSquare,
    hammer: Hammer,
    building_2: Building2,
    briefcase: Briefcase,
    shopping_bag: ShoppingBag,
    stethoscope: Stethoscope,
    map_pin: MapPin,
    dollar: DollarSign,
    clock: Clock,
    checklist: ListChecks,
    shield_check: ShieldCheck,
    globe: Globe,
    rotate: RotateCcw,
  };

  const processIcons = [Search, Layout, Code, Rocket, Settings];

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[#050505] text-white">
        {/* Header */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
              <Construction className="w-3 h-3 text-amber-500" />
              {t("badge")}
            </m.div>
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              {t("title")}
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </m.p>
          </div>
        </section>

        {/* In Progress Section */}
        {activeProjects.length > 0 && (
          <section className="py-24 px-6 border-t border-neutral-900 bg-white/[0.01]">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("sections.in_progress.title")}
                </h2>
                <p className="text-neutral-400 max-w-2xl">
                  {t("sections.in_progress.description")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Projects Loop */}
                {activeProjects.map((project, index) => (
                  <ProjectCard
                    project={project}
                    index={index}
                    key={project.id}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Finished Projects Section */}
        {completedProjects.length > 0 && (
          <section className="py-24 px-6 border-t border-neutral-900 bg-black">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-300 mb-4 border-b border-white/5 pb-4 inline-block pr-12">
                  {locale === "es"
                    ? "Proyectos Finalizados"
                    : "Finished Projects"}
                </h2>
              </div>

              <div
                className={cn(
                  "grid grid-cols-1 gap-12",
                  completedProjects.length > 1 ? "lg:grid-cols-2" : "max-w-2xl",
                )}>
                {completedProjects.map((project, index) => (
                  <ProjectCard
                    project={project}
                    index={index}
                    key={project.id}
                    isCompletedVariant={true}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Conversion CTA Section */}
        <section className="py-24 px-6 border-t border-neutral-900 bg-gradient-to-b from-black to-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="p-8 md:p-16 rounded-[2.5rem] border border-white/5 bg-white/[0.02] relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/5 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 blur-[100px] rounded-full" />

              <div className="relative z-10">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight italic">
                    "{t("sections.conversion_cta.title")}"
                  </h2>
                  <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                    {t("sections.conversion_cta.subtitle")}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest mt-4">
                    <Clock className="w-3 h-3" />
                    {t("sections.conversion_cta.availability")}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8 md:mb-16">
                  {/* Left Side - Why Act Now */}
                  <div className="space-y-8">
                    <h3 className="text-sm font-mono text-neutral-300 uppercase tracking-[0.2em] border-b border-white/5 pb-4">
                      {t("sections.conversion_cta.left_title")}
                    </h3>
                    <ul className="space-y-4">
                      {(
                        t.raw("sections.conversion_cta.left_items") as string[]
                      ).map((item, i) => (
                        <li
                          key={item}
                          className="flex items-center gap-4 text-neutral-300 group">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          </div>
                          <span className="group-hover:text-white transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Side - What Happens Next */}
                  <div className="space-y-8">
                    <h3 className="text-sm font-mono text-neutral-300 uppercase tracking-[0.2em] border-b border-white/5 pb-4">
                      {t("sections.conversion_cta.right_title")}
                    </h3>
                    <div className="space-y-6">
                      {(
                        t.raw("sections.conversion_cta.right_items") as string[]
                      ).map((item, i) => (
                        <div key={item} className="flex gap-4 group">
                          <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0 text-[10px] font-bold text-white group-hover:bg-white/10 transition-colors">
                            {i + 1}
                          </div>
                          <span className="text-neutral-400 leading-tight group-hover:text-neutral-200 transition-colors">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-8 border-t border-white/5 pt-8 md:pt-12">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <Link
                      href={{
                        pathname: "/contact",
                        query: {
                          intent: "discovery_call",
                          cta: "schedule_discovery",
                        },
                      }}
                      className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-neutral-200 transition-all duration-300 group inline-flex items-center gap-3">
                      {t("sections.conversion_cta.primary_button")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href="#process"
                      className="text-white hover:text-neutral-300 transition-colors font-medium flex items-center gap-2 group">
                      {t("sections.conversion_cta.secondary_button")}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest whitespace-nowrap">
                      {t("sections.conversion_cta.trust_badge")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-24 px-6 border-t border-neutral-900 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {t("sections.industries.title")}
              </h2>
              <p className="text-neutral-400 max-w-2xl">
                {t("sections.industries.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(t.raw("sections.industries.items") as any[]).map(
                (industry, i) => {
                  const Icon = icons[industry.icon] || Hammer;
                  const isActive = industry.status_type === "active";

                  return (
                    <m.div
                      key={industry.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-white/20 transition-all group relative h-full flex flex-col">
                      {/* Status Badge Top-Right */}
                      <div className="absolute top-6 right-6">
                        <div
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest border",
                            isActive
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                              : "bg-blue-500/10 border-blue-500/20 text-blue-400",
                          )}>
                          {industry.status}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-colors",
                          isActive
                            ? "group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20"
                            : "group-hover:bg-blue-500/10 group-hover:border-blue-500/20",
                        )}>
                        <Icon
                          className={cn(
                            "w-6 h-6 transition-colors",
                            isActive
                              ? "text-emerald-500"
                              : "text-neutral-300 group-hover:text-blue-400",
                          )}
                        />
                      </div>

                      <h3 className="text-xl font-bold mb-2">
                        {industry.name}
                      </h3>

                      {industry.example && (
                        <p className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest mb-4">
                          {industry.example}
                        </p>
                      )}

                      <p className="text-sm text-neutral-400 leading-relaxed mt-auto">
                        {industry.benefit}
                      </p>
                    </m.div>
                  );
                },
              )}
            </div>
          </div>
        </section>

        {/* Split-view Comparison Grid */}
        <section className="py-24 px-6 border-t border-neutral-900 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {t("sections.comparison.title")}
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                {t("sections.comparison.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Included */}
              <div className="p-8 md:p-12 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-500">
                    {t("sections.comparison.left_title")}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {(t.raw("sections.comparison.left_items") as string[]).map(
                    (item, i) => (
                      <div key={item} className="flex items-start gap-4 group">
                        <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-neutral-200 font-medium leading-tight group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Right Column - Others */}
              <div className="p-8 md:p-12 rounded-3xl border border-orange-500/20 bg-orange-500/5 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-500">
                    {t("sections.comparison.right_title")}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {(t.raw("sections.comparison.right_items") as string[]).map(
                    (item, i) => (
                      <div key={item} className="flex items-start gap-4 group">
                        <div className="mt-1 w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                          <span className="text-[10px] font-bold text-orange-500">
                            $$
                          </span>
                        </div>
                        <span className="text-neutral-400 italic leading-tight group-hover:text-neutral-300 transition-colors">
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        {/* Process Section */}
        <section
          id="process"
          className="py-24 px-6 border-t border-neutral-900 bg-black overflow-hidden"
          aria-labelledby="process-title">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center space-y-4">
              <h2 id="process-title" className="text-3xl md:text-5xl font-bold">
                {t("sections.process.title")}
              </h2>
            </div>

            {/* Interactive Timeline Visualization */}
            <div
              className="mb-20 px-4 md:px-12 relative"
              role="navigation"
              aria-label="Process timeline">
              {/* Desktop Horizontal Line */}
              <div className="hidden md:block absolute top-[31px] left-12 right-12 h-px bg-neutral-800">
                <m.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-emerald-500 origin-left"
                />
              </div>

              {/* Mobile Vertical Line */}
              <div className="md:hidden absolute left-1/2 top-4 bottom-4 w-px bg-neutral-800 -translate-x-1/2">
                <m.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-emerald-500 origin-top"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative z-10">
                {(t.raw("sections.process.timeline") as any[]).map(
                  (phase, i) => {
                    const isCurrent = activePhase === i;
                    return (
                      <div
                        key={phase.label}
                        className="flex flex-col items-center">
                        <button
                          onClick={() => {
                            document
                              .getElementById(`phase-${i}`)
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                          }}
                          className="group relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
                          aria-label={`Go to phase ${i + 1}: ${phase.label}`}
                          aria-current={isCurrent ? "step" : undefined}>
                          <m.div
                            animate={isCurrent ? { scale: 1.15 } : { scale: 1 }}
                            className={cn(
                              "w-16 h-16 rounded-full bg-black border-2 flex items-center justify-center text-lg font-bold transition-all duration-500 relative",
                              isCurrent
                                ? "border-emerald-500 text-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]"
                                : "border-neutral-800 text-neutral-300 group-hover:border-emerald-500 group-hover:text-emerald-500",
                            )}>
                            {isCurrent && (
                              <m.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [1, 0, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full bg-emerald-500/20 -z-10"
                              />
                            )}
                            {String(i + 1).padStart(2, "0")}
                          </m.div>
                          <span
                            className={cn(
                              "mt-4 text-[10px] font-mono uppercase tracking-[0.2em] transition-colors hidden md:block",
                              isCurrent
                                ? "text-emerald-500 font-bold"
                                : "text-neutral-300 group-hover:text-emerald-500",
                            )}>
                            {phase.weeks}
                          </span>
                        </button>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {(t.raw("sections.process.timeline") as any[]).map((step, i) => {
                const Icon = processIcons[i];
                return (
                  <m.div
                    id={`phase-${i}`}
                    key={step.label}
                    onViewportEnter={() => setActivePhase(i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "relative p-8 rounded-3xl border transition-all duration-500 group h-full flex flex-col",
                      activePhase === i
                        ? "border-emerald-500/30 bg-emerald-500/[0.02]"
                        : "border-neutral-800 bg-white/[0.02] hover:border-emerald-500/20",
                    )}>
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-300 uppercase tracking-widest">
                        {locale === "es" ? "Fase" : "Phase"} {i + 1}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          {step.weeks}
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-emerald-500 transition-colors">
                          {step.label}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-white/5">
                      {/* Deliverables as Checklist */}
                      <div className="space-y-3">
                        <p className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
                          {step.deliverables_label.split(":")[0]}
                        </p>
                        <ul className="space-y-2">
                          {step.deliverables_label
                            .split(":")
                            .slice(1)
                            .join(":")
                            .split("+")
                            .map((item: string, idx: number) => (
                              <li
                                key={item.trim()}
                                className="flex items-start gap-2 text-[11px] text-neutral-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{item.trim()}</span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                          {step.user_time.split(":")[0]}
                        </p>
                        <p className="text-[11px] text-white/80 font-medium leading-tight">
                          {step.user_time.split(":").slice(1).join(":").trim()}
                        </p>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 border-t border-neutral-900">
          <div className="max-w-4xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {t("sections.faq.title")}
              </h2>
            </div>

            <div className="space-y-4">
              {(t.raw("sections.faq.items") as any[]).map((item, i) => {
                const faqId = i + 100;
                const isFAQExpanded = expandedIndex === faqId;
                const hasLink = item.answer.includes("<link>");
                const Icon = icons[item.icon] || MessageSquare;

                return (
                  <m.div
                    key={item.question}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "rounded-2xl border transition-all duration-500 overflow-hidden group relative",
                      isFAQExpanded
                        ? "border-emerald-500/30 bg-emerald-500/[0.02]"
                        : "border-neutral-800 bg-black hover:border-white/10 hover:shadow-[0_0_30px_-15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5",
                    )}>
                    {/* Active Indicator Bar */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 transition-transform duration-500 ease-out z-10",
                        isFAQExpanded ? "scale-y-100" : "scale-y-0",
                      )}
                    />

                    <button
                      onClick={() =>
                        setExpandedIndex(isFAQExpanded ? null : faqId)
                      }
                      className="w-full p-6 md:p-10 flex items-start gap-6 text-left">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-500",
                          isFAQExpanded
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                            : "bg-white/5 border-white/10 text-neutral-300 group-hover:border-white/20 group-hover:text-neutral-300",
                        )}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-grow space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest border transition-colors",
                              isFAQExpanded
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                : "bg-white/5 border-white/10 text-neutral-300",
                            )}>
                            {item.category}
                          </span>
                        </div>
                        <h3
                          className={cn(
                            "text-lg md:text-xl font-bold pr-8 transition-colors duration-300",
                            isFAQExpanded ? "text-white" : "text-neutral-200",
                          )}>
                          {item.question}
                        </h3>
                      </div>

                      <div
                        className={cn(
                          "mt-4 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300",
                          isFAQExpanded ? "rotate-180 bg-white/5" : "",
                        )}>
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isFAQExpanded && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.23, 1, 0.32, 1],
                          }}>
                          <div className="px-6 pb-10 md:px-10 md:pb-12 pt-0 ml-[72px]">
                            <div className="h-px bg-white/5 w-full mb-8" />
                            <p className="text-neutral-400 leading-relaxed text-lg">
                              {hasLink ? (
                                <>
                                  {item.answer.split("<link>")[0]}
                                  <Link
                                    href="/guarantee"
                                    className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                                    {
                                      item.answer.match(
                                        /<link>(.*?)<\/link>/,
                                      )?.[1]
                                    }
                                  </Link>
                                  {item.answer.split("</link>")[1]}
                                </>
                              ) : (
                                item.answer
                              )}
                            </p>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 border-t border-neutral-900 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                {t("cta.subtitle")}
              </p>
            </div>

            <div className="flex flex-col items-center gap-12 pt-8">
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    intent: "discovery_call",
                    cta: "schedule_discovery",
                  },
                }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:bg-neutral-200 transition-all duration-300 group">
                {t("cta.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="w-full max-w-2xl p-8 md:p-12 rounded-3xl border border-neutral-800 bg-black text-left">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t("cta.after_title")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(t.raw("cta.after_items") as string[]).map((item, i) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-neutral-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LazyMotion>
  );
}
