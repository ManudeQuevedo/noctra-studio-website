"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import type { PublicProjectCard } from "@/types/site-project";
import { getProjectOverrides } from "@/lib/project-overrides";
import { formatServicesDeliveredLine } from "@/lib/format-project-services";

type ProjectCardProps = {
  project: PublicProjectCard;
  index: number;
};

// ProjectMockup implementation (using project id or slug if needed, for images we can map or use gallery)
function ProjectMockup({ project }: { project: PublicProjectCard }) {
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
    <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden mb-8 group/mockup flex items-center justify-center border border-white/5">
      {/* Dynamic Placeholder or Image mapping based on existing code */}
      <Image
        src={imgPath}
        alt={`${project.name} mockup`}
        fill
        style={{ objectPosition }}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover/mockup:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("WorkPage");
  const locale = useLocale();

  const phases = ["discovery", "design", "development", "launch"];

  const overrides = getProjectOverrides(project.slug);
  const projectMap = t.raw("sections.in_progress.projects") as Record<
    string,
    {
      challenge?: string;
      solution?: string;
      system_built?: string;
      expected_outcome?: string;
      system_type?: string;
      case_study_label?: string;
    }
  >;

  const localizedProject =
    Object.entries(projectMap).find(([key]) =>
      project.slug.toLowerCase().includes(key),
    )?.[1] ?? null;

  const challengeText =
    localizedProject?.challenge ||
    project.challenge ||
    overrides?.challenge ||
    "Clearer digital positioning for a real business challenge.";

  const expectedOutcomeText =
    localizedProject?.expected_outcome ||
    "A stronger digital foundation that supports long-term growth.";

  const isShipped = project.status === "completed";
  const projectStatusLabel = isShipped
    ? t("sections.in_progress.labels.completed_status")
    : t("sections.in_progress.labels.active_status");

  const servicesLine = formatServicesDeliveredLine(project.services_delivered);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group p-8 md:p-10 rounded-3xl border border-neutral-800 bg-black hover:border-white/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
      <div className="flex flex-col mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-3xl font-bold tracking-tight">{project.name}</h3>
          {isShipped ? (
            <span
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest shrink-0 border",
                "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
              )}>
              {projectStatusLabel}
            </span>
          ) : (
            <span
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest shrink-0 border",
                "bg-white/5 border border-white/10 text-neutral-300",
              )}>
              {projectStatusLabel}
            </span>
          )}
        </div>
        {project.industry?.trim() ? (
          <span className="inline-flex w-fit text-xs px-3 py-1 rounded-full border border-white/10 text-white/50">
            {project.industry}
          </span>
        ) : null}
        {servicesLine ? (
          <p className="mt-2 text-xs text-white/40">{servicesLine}</p>
        ) : null}
      </div>

      <ProjectMockup project={project} />

      <div className="space-y-8 grow">
        <div className="space-y-4">
          <div className="grid gap-3">
            <p className="text-sm text-neutral-300 leading-relaxed">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                {t("sections.in_progress.labels.challenge")}
              </span>{" "}
              {challengeText}
            </p>
            <p className="text-sm text-white leading-relaxed">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                {t("sections.in_progress.labels.expected_outcome")}
              </span>{" "}
              {expectedOutcomeText}
            </p>
          </div>
        </div>

        {/* Shipped projects only: public timeline (no internal in-progress copy) */}
        {isShipped && (
          <div className="pt-8 border-t border-white/5 pb-4">
            <h4 className="text-xs font-mono text-neutral-300 uppercase tracking-widest mb-8">
              {t("sections.in_progress.labels.status")}
            </h4>

            <div className="relative">
              <div className="absolute top-5 left-8 right-8 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                />
              </div>

              <div className="relative z-10 flex justify-between">
                {phases.map((phase) => {
                  const label =
                    t(`sections.in_progress.timeline_phases.${phase}`) || phase;

                  return (
                    <div
                      key={phase}
                      className="flex flex-col items-center gap-3">
                      <div
                        className={cn(
                          "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500",
                          "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-white",
                        )}>
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-mono tracking-wider uppercase text-center w-20 leading-tight",
                          "text-emerald-500/80 font-bold",
                        )}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/3 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono text-neutral-400">
                  {t("sections.in_progress.labels.completed")}{" "}
                  {project.launch_date ? `· ${project.launch_date}` : ""}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Metrics directly matching hardcoded styling logic if needed */}
      </div>

      <div className="mt-10 pt-8 border-t border-neutral-800 space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          {project.has_ai_form && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md text-xs font-mono">
              <Star className="w-4 h-4" />
              <span>{t("sections.in_progress.labels.ai_form")}</span>
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
              {localizedProject?.case_study_label ||
                t("sections.in_progress.labels.view_case_study")}{" "}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
