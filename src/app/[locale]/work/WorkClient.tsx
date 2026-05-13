"use client";

import { useState } from "react";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { PublicProjectCard } from "@/types/site-project";
import {
  ArrowRight,
  Code,
  Search,
  Zap,
  MessageSquare,
  Construction,
  ChevronDown,
  Layout,
  Hammer,
  Building2,
  Briefcase,
  ShoppingBag,
  Stethoscope,
  Globe,
  RotateCcw,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function WorkClient({
  projects,
}: {
  projects: PublicProjectCard[];
}) {
  const t = useTranslations("WorkPage");
  const locale = useLocale();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const activeProjects = projects.filter((p) => p.status !== "completed");
  const completedProjects = projects.filter((p) => p.status === "completed");

  const icons: Record<string, any> = {
    code: Code,
    search: Search,
    zap: Zap,
    "message-square": MessageSquare,
    hammer: Hammer,
    building_2: Building2,
    briefcase: Briefcase,
    shopping_bag: ShoppingBag,
    stethoscope: Stethoscope,
    globe: Globe,
    rotate: RotateCcw,
  };

  const processIcons = [Search, Layout, Code, Zap];
  const proofContent = locale.startsWith("es")
    ? {
        label: "Avance visible",
        title: "Transparencia sobre el proceso.",
        subtitle:
          "Ves diagnóstico, decisiones y avance por fase. Sin promesas vagas ni cajas negras.",
      }
    : {
        label: "Visible progress",
        title: "Transparency about the process.",
        subtitle:
          "You see diagnosis, decisions, and phase progress. No vague promises or black boxes.",
      };

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[#050505] text-white">
        {/* Header */}
        <section className="px-6 pb-24 pt-48 md:pb-32">
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
              className="mb-16 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </m.p>
          </div>
        </section>

        {/* In Progress Section */}
        {activeProjects.length > 0 && (
          <section className="py-24 px-6 border-t border-neutral-900 bg-white/1">
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
                  {t("sections.completed.title")}
                </h2>
                <p className="text-neutral-400 max-w-2xl">
                  {t("sections.completed.subtitle")}
                </p>
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
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Section */}
        <section
          id="process"
          className="py-24 px-6 border-t border-neutral-900 bg-black overflow-hidden"
          aria-labelledby="process-title">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 uppercase tracking-[0.24em]">
                {proofContent.label}
              </div>
              <h2 id="process-title" className="text-3xl md:text-5xl font-bold">
                {proofContent.title}
              </h2>
              <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                {proofContent.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {(t.raw("sections.process.timeline") as any[]).map((step, i) => {
                const Icon = processIcons[i];
                return (
                  <m.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative p-8 rounded-3xl border border-neutral-800 bg-white/2 hover:border-emerald-500/20 transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-300 uppercase tracking-widest">
                        {t("sections.process.phase_label")} {i + 1}
                      </div>
                    </div>

                    <div className="space-y-3 grow">
                      <h3 className="text-xl font-bold">{step.label}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </m.div>
                );
              })}
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

        {/* FAQ Section */}
        <section className="py-24 px-6 border-t border-neutral-900">
          <div className="max-w-4xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {t("sections.faq.title")}
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                {t("sections.faq.subtitle")}
              </p>
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
                        ? "border-emerald-500/30 bg-emerald-500/2"
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

                      <div className="grow space-y-2">
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
        <section className="py-32 px-6 border-t border-neutral-900 bg-white/1">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                {t("cta.subtitle")}
              </p>
            </div>

            <div className="flex flex-col items-center gap-8 pt-8">
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    intent: "radar_diagnostic",
                    cta: "work_final",
                  },
                }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:bg-neutral-200 transition-all duration-300 group">
                {t("cta.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LazyMotion>
  );
}
