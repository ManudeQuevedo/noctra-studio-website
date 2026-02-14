"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
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
  Settings
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function WorkPage() {
  const t = useTranslations("WorkPage");
  const locale = useLocale();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const icons: Record<string, any> = {
    code: Code,
    search: Search,
    zap: Zap,
    "life-buoy": LifeBuoy,
    "message-square": MessageSquare
  };

  const processIcons = [Search, Layout, Code, Rocket, Settings];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
            <Construction className="w-3 h-3 text-amber-500" />
            {t("badge")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* In Progress Section */}
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
            {["woodax", "dyma"].map((projectKey, index) => {
              const project = t.raw(`sections.in_progress.projects.${projectKey}`);
              return (
                <motion.div
                  key={projectKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 md:p-10 rounded-3xl border border-neutral-800 bg-black hover:border-white/20 transition-all duration-500 flex flex-col h-full">
                  <div className="flex flex-col mb-8">
                    <h3 className="text-3xl font-bold tracking-tight mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-mono uppercase tracking-wider">
                      {project.type}
                    </p>
                  </div>

                  <div className="space-y-8 flex-grow">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{locale === 'es' ? 'El reto' : 'The challenge'}</h4>
                      <p className="text-neutral-400 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{locale === 'es' ? 'Nuestra solución' : 'Our solution'}</h4>
                      <p className="text-white leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{locale === 'es' ? 'Qué estamos entregando' : 'What we′re delivering'}</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {project.deliverables.map((del: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-neutral-800 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Stack</p>
                      <p className="text-xs text-neutral-300">{project.stack}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Timeline</p>
                      <p className="text-xs text-neutral-300">{project.timeline}</p>
                    </div>
                    <div className="col-span-2 pt-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs font-bold text-white">
                          {project.objective}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Included Section */}
      <section className="py-24 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("sections.included.title")}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t("sections.included.description")}
            </p>
          </div>

          <div className="space-y-4">
            {(t.raw("sections.included.items") as any[]).map((item, i) => {
              const Icon = icons[item.icon] || CheckCircle2;
              const isExpanded = expandedIndex === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded ? "border-white/20 bg-white/[0.03]" : "border-neutral-800 bg-black hover:border-neutral-700"
                  }`}
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isExpanded ? "bg-white text-black" : "bg-white/5 text-white border border-white/10 group-hover:bg-white/10"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-neutral-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2 border-t border-white/5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                              <div>
                                <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">
                                  {item.details}
                                </p>
                                <ul className="space-y-3">
                                  {item.deliverables.map((del: string, j: number) => (
                                    <li key={j} className="flex items-start gap-3 text-neutral-300">
                                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                      <span>{del}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
                                {locale === 'es' ? 'Por qué importa' : 'Why it matters'}
                              </p>
                              <p className="text-neutral-400 leading-relaxed italic">
                                "{item.why_it_matters}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("sections.process.title")}
            </h2>
          </div>

          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-neutral-800" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
              {(t.raw("sections.process.timeline") as any[]).map((step, i) => {
                const Icon = processIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative text-center space-y-6"
                  >
                    <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-[#050505] border border-neutral-800 flex items-center justify-center text-white mb-4 group hover:border-white/20 transition-colors">
                      <Icon className="w-7 h-7" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-white text-black font-bold flex items-center justify-center text-xs">
                        {step.step}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] mb-2">
                        {step.duration}
                      </span>
                      <h3 className="text-lg font-bold mb-4">{step.label}</h3>
                      <p className="text-xs text-neutral-400 mb-6 px-4">
                        {step.description}
                      </p>
                      
                      <div className="space-y-4 pt-4 border-t border-neutral-900 text-left px-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">{step.deliverables_label.split(':')[0]}:</p>
                          <p className="text-[11px] text-neutral-400 leading-relaxed">
                            {step.deliverables_label.split(':').slice(1).join(':').trim()}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">{step.user_time.split(':')[0]}:</p>
                          <p className="text-[11px] text-white/80 font-medium">
                            {step.user_time.split(':').slice(1).join(':').trim()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("sections.faq.title")}
            </h2>
          </div>

          <div className="space-y-4">
            {(t.raw("sections.faq.items") as any[]).map((item, i) => {
              const isFAQExpanded = expandedIndex === (i + 100); // Offset to avoid conflict with 'included' section
              const hasLink = item.answer.includes('<link>');

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isFAQExpanded ? "border-white/20 bg-white/[0.03]" : "border-neutral-800 bg-black"
                  }`}
                >
                  <button
                    onClick={() => setExpandedIndex(isFAQExpanded ? null : i + 100)}
                    className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
                  >
                    <h3 className="text-lg md:text-xl font-bold pr-8">{item.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-300 ${isFAQExpanded ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isFAQExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2 border-t border-white/5">
                          <p className="text-neutral-400 leading-relaxed">
                            {hasLink ? (
                              <>
                                {item.answer.split('<link>')[0]}
                                <Link 
                                  href="/guarantee" 
                                  className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
                                >
                                  {item.answer.match(/<link>(.*?)<\/link>/)?.[1]}
                                </Link>
                                {item.answer.split('</link>')[1]}
                              </>
                            ) : item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
              href="/contact"
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
                  <div key={i} className="flex items-start gap-3 text-neutral-400">
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
  );
}
