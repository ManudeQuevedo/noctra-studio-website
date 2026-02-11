"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Zap,
  Target,
  CheckCircle2,
  Briefcase,
  DollarSign,
  ShieldCheck,
  Globe,
  Clock,
  MessageSquare,
  FileCode,
  Check,
  Award,
  Palette,
  Type,
  Camera,
  Layout,
  PenTool,
  LineChart,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

export function CareersClient() {
  const t = useTranslations("TalentPage");

  const howItWorksIcons = [Search, Zap, Users, Briefcase, Rocket];
  const benefitIcons = [
    DollarSign,
    Award,
    Target,
    ShieldCheck,
    Clock,
    Briefcase,
    Globe,
    CheckCircle2,
  ];

  return (
    <main className="min-h-screen bg-transparent text-neutral-50 relative">
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-8 pt-32 pb-16 border-b border-neutral-800 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            {t("hero.headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            {t("hero.subheadline")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-10 text-lg bg-white text-black hover:bg-neutral-200 transition-colors duration-300">
              <a href="#apply">{t("hero.cta")}</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("how_it_works.title")}
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                {t("how_it_works.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[0, 1, 2, 3, 4].map((i) => {
              const Icon = howItWorksIcons[i] || Zap;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-neutral-800 flex items-center justify-center mb-6 font-mono text-sm">
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h3 className="font-bold mb-2">
                      {t(`how_it_works.steps.${i}.title`)}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {t(`how_it_works.steps.${i}.description`)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("roles.title")}
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                {t("roles.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="h-full p-8 rounded-2xl border border-neutral-800 bg-black hover:border-neutral-700 transition-all group">
                  <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                    {t(`roles.items.${i}.role_name`)}
                    <span className="text-[10px] py-1 px-2 rounded-full border border-neutral-800 text-neutral-500 group-hover:border-neutral-600 transition-colors uppercase tracking-widest">
                      Freelance
                    </span>
                  </h3>
                  <div className="space-y-4 mb-6">
                    <ul className="space-y-2">
                      {[0, 1, 2].map((j) => (
                        <li
                          key={j}
                          className="text-xs text-neutral-500 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-neutral-700 mt-1.5 shrink-0" />
                          {t(`roles.items.${i}.what_you_do.${j}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-neutral-800">
                    <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">
                      {t("compensation.title")}
                    </p>
                    <p className="text-sm font-medium text-neutral-300">
                      {t(`roles.items.${i}.compensation_range`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 p-8 rounded-2xl border border-dashed border-neutral-800 text-center">
              <h4 className="text-neutral-400 font-medium mb-4">
                {t("roles.not_currently_needed.title")}
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-500">
                    {t(`roles.not_currently_needed.list.${i}`)}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight mb-16 text-center">
              {t("benefits.title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const Icon = benefitIcons[i] || CheckCircle2;
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h3 className="font-bold">
                      {t(`benefits.items.${i}.title`)}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {t(`benefits.items.${i}.description`)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-neutral-900/30 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {t("expectations.title")}
              </h2>
              <p className="text-neutral-400">{t("expectations.intro")}</p>
            </div>
          </FadeIn>
          <div className="space-y-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-neutral-800 bg-black flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-neutral-800 flex items-center justify-center shrink-0 font-mono text-xs">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">
                      {t(`expectations.items.${i}.title`)}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {t(`expectations.items.${i}.description`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation Split Explanation */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {t("compensation.title")}
              </h2>
              <p className="text-neutral-400 mb-12">
                {t("compensation.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-sm font-medium">
                    {t("compensation.noctra_pays_you")} (60-70%)
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-neutral-700" />
                  <p className="text-sm font-medium">
                    {t("compensation.client_pays")} (100%)
                  </p>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed italic">
                  {t("compensation.split_explanation")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-sm font-bold mb-6 text-neutral-400 uppercase tracking-widest">
                    {t("compensation.example.title")}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">
                        {t("compensation.example.client_pays")}
                      </span>
                      <span className="font-mono">$30,000</span>
                    </div>
                    <div className="h-px bg-neutral-800" />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-white">
                        {t("compensation.example.you_receive")}
                      </span>
                      <span className="text-emerald-400">$20,000</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-neutral-600">
                      <span>{t("compensation.example.noctra_retains")}</span>
                      <span>$10,000</span>
                    </div>
                  </div>
                </div>
                {/* Visual indicator of the split */}
                <div className="absolute bottom-0 left-0 w-2/3 h-1 bg-emerald-500/50" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-neutral-800" />
              </div>
            </FadeIn>
          </div>

          {/* Payment Terms */}
          <FadeIn>
            <div className="max-w-3xl mx-auto bg-neutral-900/20 p-8 rounded-3xl border border-neutral-800">
              <h4 className="text-xl font-bold mb-8 text-center">
                {t("compensation.terms.title")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="text-center space-y-3">
                    <div className="flex justify-center">
                      <Check className="w-5 h-5 text-neutral-600" />
                    </div>
                    <p className="text-sm text-neutral-400">
                      {t(`compensation.terms.list.${i}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="apply"
        className="py-24 px-6 md:px-8 border-b border-neutral-800 bg-white text-black relative z-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                {t("application.title")}
              </h2>
              <p className="text-neutral-600">{t("application.intro")}</p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      {t("application.fields.name")}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      {t("application.fields.email")}
                    </label>
                    <input
                      type="email"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      {t("application.fields.phone")}
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      {t("application.fields.location")}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <p className="text-[10px] text-neutral-500">
                      {t("application.fields.location_note")}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    {t("application.fields.specialization")}
                  </label>
                  <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none">
                    <option value="">
                      {t("application.fields.specialization")}
                    </option>
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <option key={i} value={i}>
                        {t(`application.fields.specialization_options.${i}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    {t("application.fields.portfolio_url")}
                  </label>
                  <input
                    type="url"
                    placeholder="https://"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <p className="text-[10px] text-neutral-500">
                    {t("application.fields.portfolio_note")}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    {t("application.fields.best_work")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t("application.fields.best_work_placeholder")}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      {t("application.fields.availability")}
                    </label>
                    <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none">
                      {[0, 1, 2].map((i) => (
                        <option key={i}>
                          {t(`application.fields.availability_options.${i}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">
                      {t("application.fields.rate_expectation")}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <p className="text-[10px] text-neutral-500">
                      {t("application.fields.rate_note")}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">
                    {t("application.fields.why_interested")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t("application.fields.why_placeholder")}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <Button className="w-full rounded-full h-14 bg-black text-white hover:bg-neutral-800 text-lg font-bold transition-all">
                  {t("application.submit")}
                </Button>

                <p className="text-xs text-neutral-500 text-center px-4">
                  {t("application.success")}
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-8 border-b border-neutral-800 relative z-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-16 text-center">
              {t("faq.title")}
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">{t(`faq.items.${i}.q`)}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {t(`faq.items.${i}.a`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-16 px-6 md:px-8 bg-black relative z-10">
        <div className="max-w-4xl mx-auto text-[10px] text-neutral-600 space-y-4 text-center lowercase tracking-widest">
          <p>{t("legal.contractor_status")}</p>
          <p>{t("legal.ip_ownership")}</p>
        </div>
      </section>
    </main>
  );
}
