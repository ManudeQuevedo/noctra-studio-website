"use client";

import { LazyMotion, m, domAnimation } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </m.div>
);

function DashboardMockup() {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">
          Panel de control —{" "}
          <span className="text-zinc-400">[Nombre del negocio]</span>
        </p>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Tickets procesados hoy
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-white">47</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
              <ArrowUp className="h-3.5 w-3.5" />
              ↑
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Tiempo promedio de respuesta
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold text-white">2.3 min</span>
            <span className="pb-1 text-xs text-zinc-500">estable</span>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Errores manuales esta semana
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-white">0</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
              ✓
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-zinc-500">
        Actualizado hace 3 minutos · Noctra Radar
      </p>
    </div>
  );
}

export default function CustomSystemsClient() {
  const t = useTranslations("ServiceDetails.custom_systems");
  const common = useTranslations("ServiceDetails.common");

  type ProcessStep = {
    duration: string;
    label: string;
    deliverables: string[];
  };
  type Module = { name: string; price: string };

  const processSteps = t.raw("process_steps") as ProcessStep[];
  const modules = t.raw("investment.modules") as Module[];

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[#050505] text-white">
        {/* Hero */}
        <section className="pt-32 pb-24 px-6 md:px-8 border-b border-neutral-900">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <FadeIn>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-neutral-400 uppercase tracking-widest">
                {t("price")}
              </span>
            </FadeIn>
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              {t("title")}
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </m.p>
            <FadeIn delay={0.3}>
              <Link
                href={{ pathname: "/contact", query: { intent: "custom-systems" } }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-neutral-200 transition-all group">
                {common("cta_button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* For Who */}
        <section className="py-24 px-6 md:px-8 bg-white/[0.01] border-b border-neutral-900">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Para quién es esto
              </h2>
              <div className="space-y-6">
                {(t.raw("for_who") as string[]).map((item, i) => (
                  <FadeIn key={item} delay={i * 0.1}>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      <p className="text-lg text-neutral-300">{item}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <FadeIn delay={0.2}>
              <DashboardMockup />
            </FadeIn>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-24 px-6 md:px-8 border-b border-neutral-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Qué incluye</h2>
              <p className="text-neutral-400">
                Enfoque en resultados reales, no solo características técnicas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(t.raw("what_includes") as string[]).map((item, i) => (
                <FadeIn key={item} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-colors h-full">
                    <TrendingUp className="w-8 h-8 text-neutral-400 mb-6" />
                    <p className="text-xl font-medium leading-relaxed">{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 px-6 md:px-8 bg-white/[0.01] border-b border-neutral-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
              {common("process")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <FadeIn key={step.label} delay={i * 0.1}>
                  <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 pt-10">
                    <div className="absolute left-6 top-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
                      {i + 1}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-neutral-300">
                          {step.duration}
                        </span>
                        <h3 className="text-lg font-bold">{step.label}</h3>
                      </div>
                      <ul className="space-y-2">
                        {step.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                            <span className="text-sm leading-snug text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Investment */}
        <section className="py-24 px-6 md:px-8 border-b border-neutral-900">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t("investment.title")}
              </h2>
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-4">
                <span className="text-4xl font-bold block">
                  {t("investment.price")}
                </span>
                <div className="space-y-2">
                  <div className="flex gap-2 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t("investment.includes")}</span>
                  </div>
                  <div className="flex gap-2 text-sm text-neutral-300">
                    <PlusCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{t("investment.not_includes")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Módulos opcionales</h3>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div
                    key={module.name}
                    className="flex justify-between items-center p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
                    <span className="text-neutral-300">{module.name}</span>
                    <span className="font-mono text-sm text-emerald-400">
                      {module.price}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                {t("investment.modules_note")}
              </p>
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="py-24 px-6 md:px-8 bg-emerald-500/[0.02] border-b border-neutral-900">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold">{common("guarantee_title")}</h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {common("guarantee_desc")}
            </p>
            <Link
              href="/guarantee"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
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
              href={{ pathname: "/contact", query: { intent: "custom-systems" } }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:bg-neutral-200 transition-all group">
              {common("cta_button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
    </LazyMotion>
  );
}
