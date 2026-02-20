"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, CheckCircle2 } from "lucide-react";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  locale: string;
};

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

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* 1. HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 space-y-8">
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Work
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                {project.industry}
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              {project.name}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </motion.div>

        <div className="space-y-24">
          {/* 2. THE CHALLENGE */}
          {project.challenge && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pl-6 border-l-2 border-orange-500/50">
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300 mb-6">
                The Challenge
              </h2>
              <div className="text-lg md:text-xl text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {project.challenge}
              </div>
            </motion.section>
          )}

          {/* 3. OUR SOLUTION */}
          {project.solution && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pl-6 border-l-2 border-emerald-500/50">
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300 mb-6">
                Our Solution
              </h2>
              <div className="text-lg md:text-xl text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {project.solution}
              </div>
            </motion.section>
          )}

          {/* 4. RESULTS */}
          {(project.results ||
            (project.metrics && project.metrics.length > 0)) && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300 mb-6">
                The Results
              </h2>
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
                      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-300">
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

          {/* 5. GALLERY */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-300 mb-6">
                The Website
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group bg-neutral-900 border border-white/5">
                    <Image
                      src={img.url}
                      alt={img.caption || `Gallery image ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      {img.caption && (
                        <p className="text-sm text-center text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* 6. CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-10 md:p-16 rounded-3xl border border-white/5 bg-gradient-to-b from-neutral-900/50 to-black text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to be our next case study?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-neutral-200 transition-colors">
              Start your project
            </Link>
            <Link
              href={`/${locale}/work`}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/10 font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-white/5 transition-colors">
              ← Back to Work
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
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
                alt={project.gallery[currentIndex].caption || "Fullscreen view"}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {project.gallery[currentIndex].caption && (
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="bg-black/80 text-white px-6 py-2 rounded-full text-sm">
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
