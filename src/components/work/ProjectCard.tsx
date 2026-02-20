"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Activity,
  CheckCircle2,
  ChevronDown,
  Target,
  Milestone,
  ArrowLeftRight,
  XCircle,
  BarChart3,
  Globe,
  Star,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  isCompletedVariant?: boolean;
};

// ProjectMockup implementation (using project id or slug if needed, for images we can map or use gallery)
function ProjectMockup({ project }: { project: Project }) {
  let imgPath = "/images/work/woodax-preview.jpg";
  const slug = project.slug.toLowerCase();

  if (slug.includes("woodax")) {
    imgPath = "/images/work/woodax-preview.jpg";
  } else if (slug.includes("valtru")) {
    imgPath = "/images/work/valtru-preview.jpg";
  } else if (slug.includes("dyma")) {
    imgPath = "/images/work/dyma-preview.jpg";
  }

  const objectPosition = slug.includes("valtru") ? "center 30%" : "center";

  return (
    <div className="relative aspect-[16/9] bg-neutral-900 rounded-2xl overflow-hidden mb-8 group/mockup flex items-center justify-center border border-white/5">
      {/* Dynamic Placeholder or Image mapping based on existing code */}
      <Image
        src={imgPath}
        alt={`${project.name} mockup`}
        fill
        style={{ objectPosition }}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover/mockup:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  isCompletedVariant,
}: ProjectCardProps) {
  const t = useTranslations("WorkPage");
  const locale = useLocale();

  const [expandedResults, setExpandedResults] = useState(false);
  const [expandedBeforeAfter, setExpandedBeforeAfter] = useState(false);

  const toggleResults = () => setExpandedResults(!expandedResults);
  const toggleBeforeAfter = () => setExpandedBeforeAfter(!expandedBeforeAfter);

  const phases = ["discovery", "design", "development", "launch"];
  const currentIndex = phases.indexOf(project.status as any);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group p-8 md:p-10 rounded-3xl border border-neutral-800 bg-black hover:border-white/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
      <div className="flex flex-col mb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-3xl font-bold tracking-tight">{project.name}</h3>
          {isCompletedVariant && (
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
              Completed
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-300 font-mono uppercase tracking-wider">
          {project.industry}
        </p>
        <p className="text-neutral-400 mt-2">{project.tagline}</p>
      </div>

      <ProjectMockup project={project} />

      <div className="space-y-8 flex-grow">
        <div className="space-y-4">
          <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
            {locale === "es" ? "El reto" : "The challenge"}
          </h4>
          <p className="text-neutral-400 leading-relaxed">
            {project.challenge || "Conquering new heights."}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
            {locale === "es" ? "Nuestra solución" : "Our solution"}
          </h4>
          <p className="text-white leading-relaxed">
            {project.solution || "Providing tailored strategies."}
          </p>
        </div>

        {/* Visual Timeline Implementation */}
        <div className="pt-8 border-t border-white/5 pb-4">
          <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest mb-8">
            {locale === "es" ? "Estado del proyecto" : "Project Status"}
          </h4>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-5 left-8 right-8 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    project.status === "completed"
                      ? "100%"
                      : `${(currentIndex / (phases.length - 1)) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>

            {/* Timeline Steps */}
            <div className="relative z-10 flex justify-between">
              {phases.map((phase, i) => {
                const label =
                  t(`sections.in_progress.timeline_phases.${phase}`) || phase;
                let state: "completed" | "active" | "pending" = "pending";

                if (
                  (project.status as string) === "completed" ||
                  i < currentIndex
                ) {
                  state = "completed";
                } else if (
                  i === currentIndex &&
                  (project.status as string) !== "completed"
                ) {
                  state = "active";
                }

                return (
                  <div key={phase} className="flex flex-col items-center gap-3">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500",
                        state === "completed"
                          ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-white"
                          : state === "active"
                            ? "bg-black border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-500"
                            : "bg-black border border-white/10 text-white/20",
                      )}>
                      {state === "completed" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : state === "active" ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative">
                          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
                        </div>
                      ) : (
                        <div className="w-2 h-2 rounded-full border border-current" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-mono tracking-wider uppercase text-center w-20 leading-tight",
                        state === "completed"
                          ? "text-emerald-500/80 font-bold"
                          : state === "active"
                            ? "text-emerald-500 font-bold"
                            : "text-neutral-400",
                      )}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            {!isCompletedVariant &&
            (project.status as string) !== "completed" ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-neutral-400">
                  Currently in{" "}
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}{" "}
                  phase · Launching {project.launch_date}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono text-neutral-400">
                  Project completed{" "}
                  {project.launch_date ? `· ${project.launch_date}` : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Metrics directly matching hardcoded styling logic if needed */}
      </div>

      <div className="mt-10 pt-8 border-t border-neutral-800 space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          {project.has_ai_form && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md text-xs font-mono">
              <Star className="w-4 h-4" />
              <span>AI-Powered Form</span>
              {project.form_description && (
                <span className="opacity-70">
                  {" "}
                  - {project.form_description}
                </span>
              )}
            </div>
          )}
        </div>

        {project.case_study_enabled && (
          <div className="pt-4 border-t border-white/5">
            <Link
              href={`/${locale}/work/${project.slug}`}
              className="w-full flex items-center justify-center p-3 rounded-xl bg-white text-black font-bold uppercase text-xs tracking-wider border border-white/5 hover:bg-neutral-200 transition-colors">
              View Case Study <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
