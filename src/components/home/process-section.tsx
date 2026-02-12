"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  User,
  ArrowRight,
  Search,
  Palette,
  Code2,
  Rocket,
  BarChart3,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StepData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  your_involvement: string;
  icon: string;
}

const STEP_ICONS: Record<string, ReactNode> = {
  "0": <Search className="w-7 h-7 text-white" strokeWidth={1.5} />,
  "1": <Palette className="w-7 h-7 text-white" strokeWidth={1.5} />,
  "2": <Code2 className="w-7 h-7 text-white" strokeWidth={1.5} />,
  "3": <Rocket className="w-7 h-7 text-white" strokeWidth={1.5} />,
  "4": <BarChart3 className="w-7 h-7 text-white" strokeWidth={1.5} />,
};

export function ProcessSection() {
  const t = useTranslations("Process");
  const stepsData = t.raw("steps") as Record<string, StepData>;
  const labels = t.raw("labels") as {
    timeline: string;
    involvement: string;
    cta: string;
  };

  const stepEntries = Object.entries(stepsData).sort(
    ([a], [b]) => Number(a) - Number(b),
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24 border-t border-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 space-y-4">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
          {t("title")}
        </h2>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="space-y-12">
        {stepEntries.map(([key, step], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="group relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 rounded-[2.5rem] bg-neutral-950 border border-neutral-800/50 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

              {/* Left Column: Number and Title */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-6">
                  <span className="text-6xl md:text-8xl font-black text-neutral-900 group-hover:text-emerald-500/10 transition-colors duration-500 font-mono leading-none">
                    {step.number}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors duration-500">
                    {STEP_ICONS[key] || (
                      <Search
                        className="w-7 h-7 text-white"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-emerald-500/80 font-bold text-sm uppercase tracking-widest">
                    {step.subtitle}
                  </p>
                </div>

                <p className="text-neutral-400 leading-relaxed text-lg max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Right Column: Deliverables and Info */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">
                    Entregables clave
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                    {step.deliverables.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-neutral-300 text-sm group/item">
                        <div className="mt-1 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-neutral-900">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 shrink-0">
                      <Clock className="w-5 h-5 text-neutral-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                        {labels.timeline}
                      </div>
                      <div className="text-sm text-neutral-300 font-medium">
                        {step.timeline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 shrink-0">
                      <User className="w-5 h-5 text-neutral-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                        {labels.involvement}
                      </div>
                      <div className="text-sm text-neutral-300 font-medium">
                        {step.your_involvement}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-emerald-50 transition-all group active:scale-95 shadow-[0_0_40px_-5px_rgba(255,255,255,0.1)]">
          {labels.cta}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
