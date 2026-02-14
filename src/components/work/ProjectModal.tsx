"use client";

import {
  X,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowRight,
  Shield,
  Zap,
  Code2,
  Server,
  AlertCircle,
  Search,
  Target,
  MousePointer2,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { ProjectedImpact } from "@/components/work/ProjectedImpact";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiGreensock,
  SiReact,
  SiFigma,
  SiGoogleanalytics,
  SiTypescript,
  SiChartdotjs,
  SiVercel,
  SiAuth0,
  SiStripe,
  SiGooglemaps,
  SiHotjar,
} from "react-icons/si";

// Expanded tech icon map — covers all stack names used in translations
const techIcons: Record<string, any> = {
  "Next.js": SiNextdotjs,
  "Next.js 14": SiNextdotjs,
  Tailwind: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  GSAP: SiGreensock,
  React: SiReact,
  "React + Next.js": SiReact,
  Figma: SiFigma,
  "Figma Prototyping": SiFigma,
  Analytics: SiGoogleanalytics,
  "Google Analytics": SiGoogleanalytics,
  TypeScript: SiTypescript,
  "Chart.js": SiChartdotjs,
  Vercel: SiVercel,
  "Vercel Edge": SiVercel,
  Auth0: SiAuth0,
  Stripe: SiStripe,
  "Google Maps API": SiGooglemaps,
  Hotjar: SiHotjar,
};

// Map project IDs to their images
const projectImages: Record<string, string> = {
  "cafe-aurora": "/images/cafe-aurora.jpg",
  "strongfit": "/images/strongfit.jpg",
  "fintrack": "/images/fintrack.jpg",
  "vaultra": "/images/vaultra.jpg",
};

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
}

// Vaultra dual-version toggle sub-component
// New V2 Storytelling Component
function ModalV2({ projectId }: { projectId: string }) {
  const t = useTranslations("WorkPage.modal_v2");
  const tLabels = useTranslations("WorkPage.modal_labels");
  const projectKey = projectId.replace("-", "_");

  // Load data - safety check
  let data: any = null;
  try {
    data = t.raw(projectKey);
  } catch (e) {
    return null;
  }

  if (!data) return null;

  return (
    <div className="space-y-16 py-4">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white leading-tight">
            {data.overview.challenge_one_liner}
          </h3>
          <p className="text-neutral-400 leading-relaxed">
            {data.overview.what_we_did}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">Cliente</div>
            <div className="text-sm font-medium text-neutral-200">{data.overview.client_type}</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">Industria</div>
            <div className="text-sm font-medium text-neutral-200">{data.overview.industry}</div>
          </div>
        </div>
      </div>

      {/* Pain Points (The Problem) */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h4 className="text-sm font-mono text-orange-500 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {data.pain_points.title}
          </h4>
          <p className="text-neutral-400">{data.pain_points.intro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.pain_points.items.map((item: any, i: number) => (
            <div key={i} className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 space-y-3 group hover:border-orange-500/20 transition-colors">
              <div className="text-2xl">{item.icon}</div>
              <h5 className="font-bold text-orange-200/90">{item.title}</h5>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
              <div className="pt-2 border-t border-orange-500/10">
                <p className="text-xs text-orange-400/60 leading-snug">
                  <span className="font-bold">Impacto:</span> {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Section */}
      <div className="space-y-8 bg-neutral-900/30 -mx-8 px-8 py-12 border-y border-neutral-800/50">
        <div className="space-y-2">
          <h4 className="text-sm font-mono text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4" />
            {data.analysis.title}
          </h4>
          <p className="text-neutral-400">{data.analysis.intro}</p>
        </div>
        <div className="space-y-6">
          {data.analysis.steps.map((step: any, i: number) => (
            <div key={i} className="flex gap-6 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-mono text-blue-400">
                {step.number}
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-neutral-200">{step.title}</h5>
                <div className="text-sm text-neutral-400">
                  <span className="text-neutral-500 italic">Acción:</span> {step.what_we_did}
                </div>
                <div className="text-sm text-blue-400/80">
                  <span className="text-neutral-500 italic">Hallazgo:</span> {step.what_we_learned}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Section */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h4 className="text-sm font-mono text-emerald-500 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {data.solution.title}
          </h4>
          <p className="text-neutral-400">{data.solution.intro}</p>
        </div>
        <div className="space-y-4">
          {data.solution.items.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Problema</div>
                <h5 className="font-bold text-neutral-200">{item.problem}</h5>
              </div>
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Solución</div>
                <h5 className="font-bold text-emerald-400">{item.solution}</h5>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.how_it_works}</p>
                <div className="text-sm text-emerald-400/80 italic">→ {item.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables Grid */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4" />
            {data.deliverables.title}
          </h4>
          <p className="text-neutral-400">{data.deliverables.intro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.deliverables.categories.map((cat: any, i: number) => (
            <div key={i} className="space-y-4 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <h5 className="font-bold text-white border-b border-neutral-800 pb-3">{cat.name}</h5>
              <ul className="space-y-2">
                {cat.items.map((item: string, j: number) => (
                  <li key={j} className="text-sm text-neutral-400 flex items-start gap-2">
                    <span className="text-emerald-500 mt-1 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="border-t border-neutral-800 pt-16">
        <ProjectedImpact projectKey={projectKey} />
      </div>

      {/* Stack & Why */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h4 className="text-sm font-mono text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            {data.stack_why.title}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.stack_why.items.map((item: any, i: number) => {
            const Icon = techIcons[item.tech];
            return (
              <div key={i} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400">
                  {Icon ? <Icon className="w-6 h-6" /> : <div className="text-xl">{item.icon}</div>}
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-white">{item.tech}</h5>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.why}</p>
                  <p className="text-xs text-purple-400/80 font-mono tracking-tight">{item.benefit}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Learnings */}
      <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 space-y-6">
        <h4 className="text-sm font-mono text-emerald-500 uppercase tracking-wider flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          {data.learnings.title}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.learnings.items.map((item: string, i: number) => {
            const [bold, rest] = item.split(": ");
            return (
              <div key={i} className="space-y-1">
                <h5 className="text-sm font-bold text-neutral-200">{bold}</h5>
                <p className="text-sm text-neutral-400 leading-relaxed">{rest}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Vaultra dual-version toggle sub-component
function VaultraDualVersion({ projectId }: { projectId: string }) {
  const t = useTranslations("WorkPage.modal");
  const tLabels = useTranslations("WorkPage.modal_labels");
  const [showTechnical, setShowTechnical] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Only Vaultra has a dual version — skip entirely for other projects
  if (projectId !== "vaultra") return null;

  const businessVersion = {
    approachTitle: t(`${projectId}.business_version.approach_title`),
    approachDescription: t(`${projectId}.business_version.approach_description`),
    approachPoints: t.raw(`${projectId}.business_version.approach_points`) as string[],
    outcomesTitle: t(`${projectId}.business_version.outcomes_title`),
    outcomes: t.raw(`${projectId}.business_version.outcomes`) as string[],
  };

  const technicalVersion = {
    title: t(`${projectId}.technical_version.title`),
    approachTitle: t(`${projectId}.technical_version.approach_title`),
    approachDescription: t(`${projectId}.technical_version.approach_description`),
    technicalDetails: t.raw(`${projectId}.technical_version.technical_details`) as string[],
    stackTitle: t(`${projectId}.technical_version.stack_title`),
    stackTechnologies: t.raw(`${projectId}.technical_version.stack_technologies`) as string[],
    securityTitle: t(`${projectId}.technical_version.security_title`),
    securityMeasures: t.raw(`${projectId}.technical_version.security_measures`) as string[],
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="border-t border-neutral-800 pt-12 space-y-8">
      {/* Business Version (always visible) */}
      <div className="space-y-6">
        <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">
          {businessVersion.approachTitle}
        </h3>
        <p className="text-neutral-400">{businessVersion.approachDescription}</p>
        <div className="space-y-3 pl-4">
          {businessVersion.approachPoints.map((point: string, i: number) => (
            <div key={i} className="flex items-start gap-3 text-neutral-300">
              <span className="text-emerald-500 mt-0.5 flex-shrink-0">→</span>
              <span className="leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-mono text-amber-400 uppercase tracking-wider">
          {businessVersion.outcomesTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessVersion.outcomes.map((outcome: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 text-neutral-300">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">→</span>
              <span className="text-sm leading-relaxed">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowTechnical(!showTechnical)}
        className="flex items-center gap-2 text-sm font-mono text-purple-400 hover:text-purple-300 transition-colors group">
        {showTechnical ? (
          <>
            {tLabels("view_business")}
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </>
        ) : (
          <>
            {tLabels("view_technical")}
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </>
        )}
      </button>

      {/* Technical Version (collapsible) */}
      <AnimatePresence>
        {showTechnical && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden">
            <div className="space-y-8 border border-purple-500/20 rounded-xl p-6 bg-neutral-900/30">
              <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                {technicalVersion.title}
              </h3>

              {/* Technical Approach */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {technicalVersion.approachTitle}
                </h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {technicalVersion.approachDescription}
                </p>
                <div className="space-y-2 pl-4">
                  {technicalVersion.technicalDetails.map((detail: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                      <span className="text-purple-500 mt-0.5 flex-shrink-0">→</span>
                      <span className="font-mono leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Stack */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  {technicalVersion.stackTitle}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {technicalVersion.stackTechnologies.map((tech: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 group hover:border-cyan-800/50 transition-colors">
                      <code className="text-sm text-cyan-300 font-mono">{tech}</code>
                      <button
                        onClick={() => handleCopy(tech, i)}
                        className="text-neutral-600 hover:text-cyan-400 transition-colors p-1"
                        title="Copy">
                        {copiedIndex === i ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Measures */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {technicalVersion.securityTitle}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {technicalVersion.securityMeasures.map((measure: string, i: number) => (
                    <div
                      key={i}
                      className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5">
                      <code className="text-xs text-red-300/80 font-mono">{measure}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const t = useTranslations("WorkPage.modal");
  const tLabels = useTranslations("WorkPage.modal_labels");

  const scrollRef = useRef<HTMLDivElement>(null);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Reset scroll position when modal opens
  useEffect(() => {
    if (projectId && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [projectId]);

  // Prevent body scroll when modal is open — also pause Lenis
  useEffect(() => {
    if (projectId) {
      // Stop Lenis smooth scroll
      window.__lenis?.stop();

      // Calculate scrollbar width to prevent layout jump
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock body scroll + compensate for scrollbar disappearing
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Also pad fixed elements (navbar) to prevent shift
      const fixedElements = document.querySelectorAll<HTMLElement>(
        '[data-fixed-header]'
      );
      fixedElements.forEach((el) => {
        el.style.paddingRight = `${scrollbarWidth}px`;
      });
    }

    return () => {
      // Restore everything
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      const fixedElements = document.querySelectorAll<HTMLElement>(
        '[data-fixed-header]'
      );
      fixedElements.forEach((el) => {
        el.style.paddingRight = "";
      });
    };
  }, [projectId]);

  // Early return after all hooks
  if (!projectId) return null;

  const project = {
    title: t(`${projectId}.title`),
    subtitle: t(`${projectId}.subtitle`),
    challenge: t(`${projectId}.challenge`),
    context: t(`${projectId}.context`),
    solution: t(`${projectId}.solution`),
    stack: (t.raw(`${projectId}.stack`) as string[]) || [],
    process:
      (t.raw(`${projectId}.process`) as Array<{
        step: string;
        description: string;
      }>) || [],
    results:
      (t.raw(`${projectId}.results`) as Array<{
        metric: string;
        label: string;
        context: string;
        action: string;
      }>) || [],
  };

  // Safety check - if no data, don't render
  if (!project.stack.length) return null;

  // Map project IDs to translation keys for ProjectedImpact
  const projectKey = projectId.replace("-", "_");

  const modalContent = (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 overscroll-none"
          onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90dvh] min-h-0 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-black/50">
            {/* Header */}
            <div className="sticky top-0 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800 px-8 py-6 flex items-start justify-between z-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{project.title}</h2>
                <p className="text-neutral-400">{project.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors p-2 -mr-2">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="overflow-y-auto flex-1 px-8 py-8 overscroll-contain scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              
              <div className="max-w-3xl mx-auto space-y-12">
                {/* Hero Image */}
                {projectImages[projectId] && (
                  <div className="aspect-[21/9] rounded-lg border border-neutral-800 overflow-hidden relative">
                    <Image
                      src={projectImages[projectId]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                  </div>
                )}

                {/* Content Switcher: V2 vs Legacy */}
                {(() => {
                  try {
                    const tV2 = useTranslations("WorkPage.modal_v2");
                    const projectKey = projectId.replace("-", "_");
                    
                    // Simple check: does the project key exist in our V2 translations?
                    const v2Projects = ["cafe_aurora", "strongfit"];
                    if (v2Projects.includes(projectKey)) {
                      return <ModalV2 projectId={projectId} />;
                    }
                  } catch (e) {
                    console.error("Modal V2 check failed:", e);
                  }

                  return (
                    <>
                      {/* Legacy Narrative (Grid) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: Challenge & Context */}
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-sm font-mono text-red-400 uppercase tracking-wider mb-3">
                              {tLabels("challenge")}
                            </h3>
                            <p className="text-neutral-300 leading-relaxed">
                              {project.challenge}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-mono text-blue-400 uppercase tracking-wider mb-3">
                              {tLabels("context")}
                            </h3>
                            <p className="text-neutral-300 leading-relaxed">
                              {project.context}
                            </p>
                          </div>
                        </div>

                        {/* Right: Solution & Stack */}
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-3">
                              {tLabels("solution")}
                            </h3>
                            <p className="text-neutral-300 leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-mono text-purple-400 uppercase tracking-wider mb-3">
                              {tLabels("stack")}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {project.stack.map((tech: string) => {
                                const Icon = techIcons[tech];
                                return (
                                  <div key={tech} className="group relative">
                                    <div className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-colors">
                                      {Icon ? (
                                        <Icon className="w-5 h-5" />
                                      ) : (
                                        <span className="text-xs font-mono px-1">{tech.slice(0, 2).toUpperCase()}</span>
                                      )}
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-neutral-700 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                      {tech}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Projected Impact */}
                      <div className="border-t border-neutral-800 pt-12">
                        <ProjectedImpact projectKey={projectKey} />
                      </div>

                      {/* Vaultra Dual Version (only renders for vaultra) */}
                      <VaultraDualVersion projectId={projectId} />

                      {/* The Noctra Process */}
                      <div className="border-t border-neutral-800 pt-12">
                        <h3 className="text-2xl font-bold mb-8">{tLabels("process")}</h3>
                        <div className="space-y-6">
                          {project.process.map((item: any, index: number) => (
                            <div
                              key={item.step}
                              className="flex gap-6 items-start group">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-neutral-700 bg-neutral-900 flex items-center justify-center text-sm font-bold text-neutral-400 group-hover:border-white group-hover:text-white transition-colors">
                                {index + 1}
                              </div>
                              <div className="flex-1 pt-2">
                                <h4 className="font-bold text-lg mb-1">{item.step}</h4>
                                <p className="text-neutral-400 text-sm">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* The Results (KPIs) */}
                      <div className="border-t border-neutral-800 pt-12">
                        <h3 className="text-2xl font-bold mb-8">{tLabels("results")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {project.results.map((result: any) => (
                            <div
                              key={result.label}
                              className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-lg flex flex-col gap-3 text-left">
                              <div>
                                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
                                  {result.label}
                                </div>
                                <div className="text-3xl font-bold text-white">
                                  {result.metric}
                                </div>
                              </div>

                              <div className="space-y-2 pt-2 border-t border-neutral-800/50">
                                <p className="text-sm text-neutral-300 leading-snug">
                                  {result.context}
                                </p>
                                <p className="text-xs text-neutral-500 leading-snug">
                                  <span className="text-emerald-500/80">{tLabels("action")}:</span>{" "}
                                  {result.action}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}

                {/* CTA (Shared for both V1 and V2) */}
                <div className="border-t border-neutral-800 pt-12">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">{tLabels("cta_title")}</h3>
                    <Link
                      href={{ pathname: "/contact", query: { intent: "estimate", project: projectId } }}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 text-lg text-white hover:text-neutral-300 transition-colors group">
                      {tLabels("cta_button")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
