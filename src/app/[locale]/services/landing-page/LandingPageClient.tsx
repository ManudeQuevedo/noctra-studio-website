"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  FileText,
  Smartphone,
  ClipboardCheck,
  BarChart3,
  Search,
  Globe,
  PlusCircle,
  Clock,
  Rocket,
  ArrowUpCircle,
  Lightbulb
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function LandingPageClient() {
  const t = useTranslations("LandingPage");
  const common = useTranslations("ServiceDetails.common");

  const deliverableIcons = [
    FileText,
    Smartphone,
    Zap,
    ClipboardCheck,
    BarChart3,
    Search,
    Globe
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 md:px-8 border-b border-neutral-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <FadeIn>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white fill-white" />
              </div>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-neutral-400 uppercase tracking-widest">
                {t("price")}
              </span>
            </div>
          </FadeIn>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <FadeIn delay={0.3}>
            <Link
              href={{ pathname: "/contact", query: { intent: "landing-page" } }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-neutral-200 transition-all group"
            >
              {common("cta_button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* For Who Section */}
      <section className="py-24 px-6 md:px-8 bg-white/[0.01] border-b border-neutral-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {t("for_who_title")}
            </h2>
            <div className="space-y-6">
              {(t.raw("for_who") as string[]).map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <p className="text-lg text-neutral-300">{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="aspect-square rounded-3xl border border-neutral-800 bg-neutral-900/50 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
               <Smartphone className="w-32 h-32 text-neutral-700 group-hover:text-emerald-500/20 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("deliverables_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t.raw("deliverables") as any[]).map((item, i) => {
              const Icon = deliverableIcons[i] || Zap;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-all hover:bg-neutral-900/50 group h-full">
                    <Icon className="w-8 h-8 text-neutral-500 mb-6 group-hover:text-white transition-colors" />
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process, Payment & Timeline */}
      <section className="py-24 px-6 md:px-8 bg-white/[0.01] border-b border-neutral-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
           <FadeIn>
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 h-full">
                 <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Clock className="w-6 h-6 text-neutral-400" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{t("timeline_title")}</h3>
                 <p className="text-xl text-neutral-300 font-medium">{t("timeline")}</p>
              </div>
           </FadeIn>
           <FadeIn delay={0.1}>
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 h-full">
                 <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Rocket className="w-6 h-6 text-neutral-400" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{t("payment_title")}</h3>
                 <p className="text-xl text-neutral-300 font-medium">{t("payment_terms")}</p>
              </div>
           </FadeIn>
        </div>
      </section>

      {/* Ideal Use Cases */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("use_cases_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t.raw("use_cases") as string[]).map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-800 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-neutral-300">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-24 px-6 md:px-8 bg-white/[0.01] border-b border-neutral-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">{t("investment_title")}</h2>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-4xl font-bold block relative z-10">{t("investment_price")}</span>
              <div className="space-y-3 relative z-10">
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{t("includes_title")}</p>
                <div className="grid grid-cols-1 gap-2">
                  {(t.raw("includes") as string[]).map((item, i) => (
                    <div key={i} className="flex gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">{t("not_includes_title")}</h3>
            <div className="space-y-4">
              {(t.raw("not_includes") as any[]).map((module, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-colors">
                  <span className="text-neutral-300">{module.name}</span>
                  <span className="font-mono text-emerald-400">{module.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Path */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto">
           <FadeIn>
              <div className="p-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ArrowUpCircle className="w-24 h-24" />
                 </div>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                       <Lightbulb className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold">{t("upgrade_title")}</h2>
                 </div>
                 <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl">
                    {t("upgrade_path")}
                 </p>
              </div>
           </FadeIn>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-24 px-6 md:px-8 bg-emerald-500/[0.02] border-b border-neutral-900">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold">{common("guarantee_title")}</h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            {common("guarantee_desc")}
          </p>
          <Link href="/guarantee" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
            {common("guarantee_link")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            {common("cta_title")}
          </h2>
          <Link
            href={{ pathname: "/contact", query: { intent: "landing-page" } }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:bg-neutral-200 transition-all group"
          >
            {common("cta_button")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
