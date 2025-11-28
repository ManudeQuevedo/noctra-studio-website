"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
}

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const t = useTranslations("WorkPage.modal");

  // All hooks must be called before any conditional returns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (projectId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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
      }>) || [],
  };

  // Safety check - if no data, don't render
  if (!project.stack.length) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 overscroll-none"
          onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full max-h-[90dvh] min-h-0 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-black/50">
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
              data-lenis-prevent
              className="overflow-y-auto flex-1 px-8 py-8 space-y-12 overscroll-contain scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {/* Hero Image Placeholder */}
              <div className="aspect-[21/9] rounded-lg border border-neutral-800 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-8xl opacity-10">🖼️</div>
                    <p className="text-xs text-neutral-600 uppercase tracking-wider">
                      Hero Visual Placeholder
                    </p>
                  </div>
                </div>
              </div>

              {/* The Narrative (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Challenge & Context */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-mono text-red-400 uppercase tracking-wider mb-3">
                      The Challenge
                    </h3>
                    <p className="text-neutral-300 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-blue-400 uppercase tracking-wider mb-3">
                      The Context
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
                      The Solution
                    </h3>
                    <p className="text-neutral-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-purple-400 uppercase tracking-wider mb-3">
                      The Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs border border-neutral-700 rounded-full text-neutral-300 bg-neutral-900">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* The Noctra Process */}
              <div className="border-t border-neutral-800 pt-12">
                <h3 className="text-2xl font-bold mb-8">The Noctra Process</h3>
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
                <h3 className="text-2xl font-bold mb-8">The Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {project.results.map((result: any) => (
                    <div
                      key={result.label}
                      className="text-center p-6 border border-neutral-800 rounded-lg bg-neutral-900/50">
                      <div className="text-4xl font-bold text-white mb-2">
                        {result.metric}
                      </div>
                      <div className="text-sm font-mono text-neutral-500 uppercase tracking-wider">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
