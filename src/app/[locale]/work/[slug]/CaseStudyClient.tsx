"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  X,
  CheckCircle2,
  Target,
  Layers,
  Wrench,
  BarChart3,
} from "lucide-react";
import type { PublicCaseStudyProject } from "@/types/site-project";
import { formatServicesDeliveredLine } from "@/lib/format-project-services";

type Props = {
  project: PublicCaseStudyProject;
  locale: string;
};

const LABEL = {
  backToWork: { es: "Volver a casos", en: "Back to cases" },
  delivered: { es: "Sistema implementado", en: "System delivered" },
  context: { es: "01 · Contexto y Problema", en: "01 · Context & Problem" },
  diagnosis: { es: "02 · Diagnóstico", en: "02 · Diagnosis" },
  diagnosisSubtitle: {
    es: "Áreas identificadas durante el proceso de diagnóstico.",
    en: "Areas identified during the diagnosis process.",
  },
  systemApplied: { es: "03 · Sistema Aplicado", en: "03 · System Applied" },
  implementation: { es: "04 · Implementación", en: "04 · Implementation" },
  implementationSubtitle: {
    es: "Capturas del sistema en producción. Cada pantalla responde a una decisión estratégica.",
    en: "Screenshots of the system in production. Each screen reflects a strategic decision.",
  },
  results: { es: "05 · Resultados", en: "05 · Results" },
  ctaTitle: {
    es: "¿Quieres revisar tu presencia?",
    en: "Want to review your presence?",
  },
  ctaPrimary: {
    es: "Diagnosticar mi presencia →",
    en: "Diagnose my presence →",
  },
};

function t(key: keyof typeof LABEL, locale: string): string {
  const entry = LABEL[key];
  return (
    (entry as Record<string, string>)[locale] ??
    (entry as Record<string, string>).en
  );
}

// Derive diagnostic tags from industry + solution text
function getDiagnosticAreas(
  project: PublicCaseStudyProject,
  locale: string,
): string[] {
  const isEs = locale === "es";
  const base: string[] = [];

  const industry = project.industry?.toLowerCase() ?? "";
  const solution = project.solution?.toLowerCase() ?? "";

  if (
    industry.includes("manufactur") ||
    solution.includes("galería") ||
    solution.includes("gallery")
  ) {
    base.push(isEs ? "Presentación de trabajo" : "Work presentation");
  }
  if (
    solution.includes("cotiz") ||
    solution.includes("quote") ||
    solution.includes("formulario") ||
    solution.includes("form")
  ) {
    base.push(isEs ? "Flujo de cotización" : "Quote flow");
  }
  if (solution.includes("mobile") || solution.includes("móvil")) {
    base.push(isEs ? "Experiencia mobile" : "Mobile experience");
  }
  if (
    solution.includes("content") ||
    solution.includes("contenido") ||
    solution.includes("cms") ||
    solution.includes("gestión")
  ) {
    base.push(isEs ? "Gestión de contenido" : "Content management");
  }
  if (
    solution.includes("corporat") ||
    solution.includes("grupo") ||
    solution.includes("group") ||
    solution.includes("arquitectura") ||
    solution.includes("architecture")
  ) {
    base.push(isEs ? "Arquitectura corporativa" : "Corporate architecture");
  }
  if (
    solution.includes("conver") ||
    solution.includes("prospecto") ||
    solution.includes("lead")
  ) {
    base.push(isEs ? "Conversión y prospectos" : "Conversion & leads");
  }
  if (
    solution.includes("confianza") ||
    solution.includes("trust") ||
    solution.includes("credibilidad") ||
    solution.includes("credibility")
  ) {
    base.push(isEs ? "Credibilidad digital" : "Digital credibility");
  }

  // Fallback: generic strategic areas
  if (base.length < 3) {
    const fallbacks = isEs
      ? [
          "Posicionamiento digital",
          "Claridad de mensajes",
          "Estructura de conversión",
        ]
      : ["Digital positioning", "Message clarity", "Conversion structure"];
    for (const f of fallbacks) {
      if (!base.includes(f)) base.push(f);
      if (base.length >= 4) break;
    }
  }

  return base.slice(0, 4);
}

export default function CaseStudyClient({ project, locale }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const diagnosticAreas = getDiagnosticAreas(project, locale);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 space-y-8">
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToWork", locale)}
          </Link>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              {project.name}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {project.industry?.trim() ? (
                <span className="inline-flex text-xs px-3 py-1 rounded-full border border-white/10 text-white/50">
                  {project.industry}
                </span>
              ) : null}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("delivered", locale)}
              </div>
            </div>
            {formatServicesDeliveredLine(project.services_delivered) ? (
              <p className="text-xs text-white/40">
                {formatServicesDeliveredLine(project.services_delivered)}
              </p>
            ) : null}
          </div>
        </motion.div>

        <div className="space-y-24">
          {/* ── 01 · CONTEXTO Y PROBLEMA ── */}
          {project.challenge && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pl-6 border-l-2 border-orange-500/50">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-4 h-4 text-orange-400" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300">
                  {t("context", locale)}
                </h2>
              </div>
              <div className="text-lg md:text-xl text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {project.challenge}
              </div>
            </motion.section>
          )}

          {/* ── 02 · DIAGNÓSTICO ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300">
                {t("diagnosis", locale)}
              </h2>
            </div>
            <p className="text-sm text-neutral-500 mb-8">
              {t("diagnosisSubtitle", locale)}
            </p>
            <div className="flex flex-wrap gap-3">
              {diagnosticAreas.map((area) => (
                <div
                  key={area}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {area}
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── 03 · SISTEMA APLICADO ── */}
          {project.solution && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pl-6 border-l-2 border-emerald-500/50">
              <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300">
                  {t("systemApplied", locale)}
                </h2>
              </div>
              <div className="text-lg md:text-xl text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {project.solution}
              </div>
            </motion.section>
          )}

          {/* ── 04 · IMPLEMENTACIÓN (gallery) ── */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300 mb-2">
                {t("implementation", locale)}
              </h2>
              <p className="text-sm text-neutral-500 mb-8">
                {t("implementationSubtitle", locale)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group bg-neutral-900 border border-white/5">
                    <Image
                      src={img.url}
                      alt={img.caption || `Implementación ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      {img.caption && (
                        <p className="text-xs text-white/80 font-mono leading-snug translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ── 05 · RESULTADOS ── */}
          {(project.results ||
            (project.metrics && project.metrics.length > 0)) && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300">
                  {t("results", locale)}
                </h2>
              </div>

              {project.results && (
                <div className="text-lg md:text-xl text-neutral-300 leading-relaxed whitespace-pre-wrap mb-10">
                  {project.results}
                </div>
              )}

              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-2">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        {metric.label}
                      </h3>
                      <div className="text-3xl font-bold tracking-tight text-white">
                        {metric.value}
                      </div>
                      {metric.delta && (
                        <div className="text-sm font-medium text-emerald-400">
                          {metric.delta}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          )}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-10 md:p-16 rounded-3xl border border-white/5 bg-gradient-to-b from-neutral-900/50 to-black text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t("ctaTitle", locale)}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={`/${locale}/contact?intent=radar_diagnostic&cta=case_study`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-neutral-200 transition-colors group">
              {t("ctaPrimary", locale)}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxOpen && project.gallery && project.gallery[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={closeLightbox}>
            <button
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}>
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={project.gallery[currentIndex].url}
                alt={project.gallery[currentIndex].caption || "Vista completa"}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {project.gallery[currentIndex].caption && (
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="bg-black/80 text-white/80 px-6 py-2 rounded-full text-xs font-mono">
                  {project.gallery[currentIndex].caption}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
