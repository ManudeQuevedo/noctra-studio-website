"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  Compass,
  FileText,
  Layers3,
  Radar,
  Sparkles,
} from "lucide-react";
type SystemModule = {
  eyebrow: string;
  title: string;
  description: string;
  points?: string[];
};

export function TheSystemSection() {
  const t = useTranslations("HomePage.the_system");
  const studio = t.raw("studio") as SystemModule;
  const radar = t.raw("radar") as SystemModule;
  const social = t.raw("social") as SystemModule;
  const discovery = t.raw("discovery") as SystemModule;
  const proposals = t.raw("proposals") as SystemModule;
  const academy = t.raw("academy") as SystemModule;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="the-system"
        className="relative overflow-hidden border-t border-white/5 bg-black px-6 py-24 md:px-8 md:py-32"
      >
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20 max-w-4xl space-y-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl">
              {t("subtitle")}
            </p>
          </m.div>

          <div className="space-y-16 lg:space-y-24">
            {/* Layer 1: Intelligence & Diagnosis */}
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                  {t("layer_1")}
                </span>
                <div className="h-px w-8 bg-white/10" />
              </div>

              <div className="grid gap-5 md:grid-cols-12 lg:items-stretch">
                <m.article
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group relative md:col-span-7"
                >
                  <div className="h-full rounded-[2.5rem] border border-emerald-400/20 bg-emerald-400/[0.03] p-8 transition-colors duration-500 hover:bg-emerald-400/[0.05] md:p-10">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-black/40 shadow-inner">
                        <Radar className="h-6 w-6 text-emerald-400" />
                      </div>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                        {radar.eyebrow}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                      {radar.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                      {radar.description}
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {radar.points?.map((point) => (
                        <div key={point} className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3.5 text-sm text-neutral-400 transition-colors group-hover:border-emerald-400/10">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </m.article>

                <m.article
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-5"
                >
                  <div className="h-full rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 transition-opacity hover:bg-white/[0.04] md:p-10">
                    <div className="mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                        <Compass className="h-5 w-5 text-neutral-400" />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                      {discovery.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                      {discovery.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-neutral-400">
                      {discovery.description}
                    </p>
                  </div>
                </m.article>
              </div>
            </div>

            {/* Layer 2: Implementation & Action */}
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                  {t("layer_2")}
                </span>
                <div className="h-px w-8 bg-white/10" />
              </div>

              <div className="grid gap-5 md:grid-cols-12">
                <m.article
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="md:col-span-8"
                >
                  <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                        <Layers3 className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                        {studio.eyebrow}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                      {studio.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                      {studio.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {studio.points?.map((point) => (
                        <div key={point} className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-5 py-2.5 text-sm text-neutral-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </m.article>

                <m.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-4"
                >
                  <div className="h-full rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 md:p-10">
                    <div className="mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                        <FileText className="h-5 w-5 text-neutral-400" />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                      {proposals.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                      {proposals.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-neutral-400">
                      {proposals.description}
                    </p>
                  </div>
                </m.article>
              </div>
            </div>

            {/* Layer 3: Amplification & Impact */}
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                  {t("layer_3")}
                </span>
                <div className="h-px w-8 bg-white/10" />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <m.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 md:p-10"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                      <Sparkles className="h-5 w-5 text-neutral-300" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                      {social.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {social.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-400">
                    {social.description}
                  </p>
                </m.article>

                <m.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 md:p-10"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                      <BookOpen className="h-5 w-5 text-neutral-300" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                      {academy.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {academy.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-400">
                    {academy.description}
                  </p>
                </m.article>
              </div>
            </div>

            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/5 bg-white/[0.01] px-8 py-6 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">
                {t("note_label")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {t("note")}
              </p>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
