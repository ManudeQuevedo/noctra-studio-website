"use client";

import { useRef } from "react";
import type { ComponentType, SVGProps } from "react";
import { useLocale } from "next-intl";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import {
  AlertTriangle,
  Bot,
  Compass,
  Globe,
  LineChart,
  Radar,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Link, routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

/* ─────────────────────── types ─────────────────────── */

type AppPathname = keyof typeof routing.pathnames;

type ProblemPoint = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
};

type SystemStep = {
  step: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type ServiceLayer = {
  id: string;
  eyebrow: string;
  title: string;
  when: string;
  outcome: string;
  capabilities: string[];
  intent: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  price?: string;
  layerCtaText: string;
  layerCtaHref: AppPathname;
};

type ServicesPageCopy = {
  /* 1. HERO */
  heroBadge: string;
  title: string;
  subtitle: string;
  heroPrimaryCta: string;

  /* 2. THE PROBLEM */
  problemLabel: string;
  problemTitle: string;
  problemPoints: ProblemPoint[];

  /* 3. THE NOCTRA SYSTEM */
  systemLabel: string;
  systemTitle: string;
  systemSteps: SystemStep[];

  /* 4. SERVICES AS IMPLEMENTATION */
  servicesLabel: string;
  servicesTitle: string;
  servicesSubtitle: string;
  serviceLayers: ServiceLayer[];
  whenLabel: string;
  outcomeLabel: string;
  capabilitiesLabel: string;
  priceLabel: string;

  /* 5. CTA */
  ctaLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaNote: string;

  /* Sticky bar */
  stickyLabel: string;
  stickyCta: string;
};

/* ─────────────────────── ES copy ─────────────────────── */

const ES_COPY: ServicesPageCopy = {
  /* 1. HERO */
  heroBadge: "SERVICIOS NOCTRA",
  title: "Más clientes desde tu presencia digital",
  subtitle:
    "Claridad, visibilidad y seguimiento para generar oportunidades medibles.",
  heroPrimaryCta: "Diagnosticar mi presencia →",

  /* 2. THE PROBLEM */
  problemLabel: "EL PROBLEMA QUE RESOLVEMOS",
  problemTitle: "Tu presencia no está trabajando completa.",
  problemPoints: [
    {
      icon: AlertTriangle,
      text: "Marca, sitio, SEO y seguimiento no están conectados.",
    },
    {
      icon: Target,
      text: "El sitio no convierte suficientes visitas en conversaciones.",
    },
    {
      icon: LineChart,
      text: "Las decisiones se toman sin diagnóstico ni prioridades claras.",
    },
  ],

  /* 3. THE NOCTRA SYSTEM */
  systemLabel: "EL SISTEMA NOCTRA",
  systemTitle: "De diagnóstico a oportunidades medibles.",
  systemSteps: [
    {
      step: "01",
      title: "Diagnóstico",
      description: "Detectamos bloqueos, oportunidades y prioridades reales.",
      icon: Radar,
    },
    {
      step: "02",
      title: "Diseño del sistema",
      description: "Definimos qué activar, en qué orden y con qué objetivo.",
      icon: Compass,
    },
    {
      step: "03",
      title: "Implementación",
      description: "Construimos las capas que más impacto tienen hoy.",
      icon: Wrench,
    },
    {
      step: "04",
      title: "Optimización continua",
      description: "Medimos, ajustamos y convertimos mejoras en ciclo.",
      icon: TrendingUp,
    },
  ],

  /* 4. SERVICES AS IMPLEMENTATION */
  servicesLabel: "QUÉ RECIBES",
  servicesTitle: "Las piezas necesarias para crecer.",
  servicesSubtitle:
    "Activamos solo lo que tu diagnóstico necesita ahora.",
  serviceLayers: [
    {
      id: "identity",
      eyebrow: "CAPA 01",
      title: "Identidad y posicionamiento",
      when: "Tu oferta se percibe genérica o poco clara.",
      outcome: "Más confianza y una oferta fácil de elegir.",
      capabilities: [
        "Branding",
        "Narrativa",
        "Sistema visual",
      ],
      intent: "branding",
      icon: Sparkles,
      price: "desde $15,000 MXN",
      layerCtaText: "Ver Sistemas de Marca →",
      layerCtaHref: "/services",
    },
    {
      id: "infrastructure",
      eyebrow: "CAPA 02",
      title: "Infraestructura digital",
      when: "Tu sitio no explica, convence o convierte.",
      outcome: "Un sitio rápido que convierte visitas en oportunidades.",
      capabilities: [
        "Sitio web",
        "CRO",
        "Landings",
        "E-commerce",
      ],
      intent: "web_presence",
      icon: Globe,
      price: "desde $25,000 MXN",
      layerCtaText: "Ver Sitios Web →",
      layerCtaHref: "/services/professional-websites",
    },
    {
      id: "visibility",
      eyebrow: "CAPA 03",
      title: "Adquisición y visibilidad",
      when: "Te encuentran poco o dependes de pauta.",
      outcome: "Más tráfico cualificado y menor dependencia de anuncios.",
      capabilities: [
        "SEO",
        "Contenido",
        "Autoridad",
      ],
      intent: "visibility",
      icon: Search,
      price: "desde $12,000 MXN",
      layerCtaText: "Ver SEO y Visibilidad →",
      layerCtaHref: "/services/optimization",
    },
    {
      id: "automation",
      eyebrow: "CAPA 04",
      title: "Automatización y optimización",
      when: "El seguimiento manual retrasa oportunidades.",
      outcome: "Mejor respuesta y más capacidad de escalar.",
      capabilities: [
        "IA",
        "Leads",
        "CRM",
        "Seguimiento",
      ],
      intent: "automation",
      icon: Bot,
      layerCtaText: "Ver Automatización →",
      layerCtaHref: "/contact",
    },
  ],
  whenLabel: "Cuándo se activa",
  outcomeLabel: "Resultado esperado",
  capabilitiesLabel: "Incluye",
  priceLabel: "Inversión",

  /* 6. CTA */
  ctaLabel: "SIGUIENTE PASO",
  ctaTitle: "Empieza con un diagnóstico real.",
  ctaSubtitle:
    "Identificamos bloqueos, prioridades y oportunidades para convertir tu presencia en crecimiento.",
  ctaPrimary: "Diagnosticar mi presencia →",
  ctaNote:
    "Trabajamos con pocos proyectos a la vez para cuidar foco, criterio y ejecución.",

  /* Sticky bar */
  stickyLabel: "Servicios Noctra",
  stickyCta: "Diagnosticar mi presencia →",
};

/* ─────────────────────── EN copy ─────────────────────── */

const EN_COPY: ServicesPageCopy = {
  /* 1. HERO */
  heroBadge: "NOCTRA SERVICES",
  title: "More clients from your digital presence",
  subtitle:
    "Clarity, visibility, and follow-up to generate measurable opportunities.",
  heroPrimaryCta: "Diagnose my presence →",

  /* 2. THE PROBLEM */
  problemLabel: "THE PROBLEM WE SOLVE",
  problemTitle: "Your presence is not working as a whole.",
  problemPoints: [
    {
      icon: AlertTriangle,
      text: "Brand, site, SEO, and follow-up are not connected.",
    },
    {
      icon: Target,
      text: "The site does not turn enough visits into conversations.",
    },
    {
      icon: LineChart,
      text: "Decisions happen without diagnosis or clear priorities.",
    },
  ],

  /* 3. THE NOCTRA SYSTEM */
  systemLabel: "THE NOCTRA SYSTEM",
  systemTitle: "From diagnosis to measurable opportunities.",
  systemSteps: [
    {
      step: "01",
      title: "Diagnosis",
      description: "We detect real blockers, opportunities, and priorities.",
      icon: Radar,
    },
    {
      step: "02",
      title: "System design",
      description: "We define what to activate, in what order, and for what goal.",
      icon: Compass,
    },
    {
      step: "03",
      title: "Implementation",
      description: "We build the layers with the highest impact now.",
      icon: Wrench,
    },
    {
      step: "04",
      title: "Continuous optimization",
      description: "We measure, adjust, and turn improvements into a cycle.",
      icon: TrendingUp,
    },
  ],

  /* 4. SERVICES AS IMPLEMENTATION */
  servicesLabel: "WHAT YOU RECEIVE",
  servicesTitle: "The pieces needed to grow.",
  servicesSubtitle:
    "We activate only what your diagnosis needs now.",
  serviceLayers: [
    {
      id: "identity",
      eyebrow: "LAYER 01",
      title: "Identity & positioning",
      when: "Your offer feels generic or unclear.",
      outcome: "More trust and an offer people choose.",
      capabilities: [
        "Branding",
        "Narrative",
        "Visual system",
      ],
      intent: "branding",
      icon: Sparkles,
      price: "from $15,000 MXN",
      layerCtaText: "View Brand Systems →",
      layerCtaHref: "/services",
    },
    {
      id: "infrastructure",
      eyebrow: "LAYER 02",
      title: "Digital infrastructure",
      when: "Your site does not explain, persuade, or convert.",
      outcome: "A fast site that turns visits into opportunities.",
      capabilities: [
        "Website",
        "CRO",
        "Landings",
        "E-commerce",
      ],
      intent: "web_presence",
      icon: Globe,
      price: "from $25,000 MXN",
      layerCtaText: "View Websites →",
      layerCtaHref: "/services/professional-websites",
    },
    {
      id: "visibility",
      eyebrow: "LAYER 03",
      title: "Acquisition & visibility",
      when: "People barely find you or ads do the work.",
      outcome: "More qualified traffic and less dependency on ads.",
      capabilities: [
        "SEO",
        "Content",
        "Authority",
      ],
      intent: "visibility",
      icon: Search,
      price: "from $12,000 MXN",
      layerCtaText: "View SEO & Visibility →",
      layerCtaHref: "/services/optimization",
    },
    {
      id: "automation",
      eyebrow: "LAYER 04",
      title: "Automation & optimization",
      when: "Manual follow-up slows opportunities down.",
      outcome: "Better response and more room to scale.",
      capabilities: [
        "AI",
        "Leads",
        "CRM",
        "Follow-up",
      ],
      intent: "automation",
      icon: Bot,
      layerCtaText: "View Automation →",
      layerCtaHref: "/contact",
    },
  ],
  whenLabel: "When to activate",
  outcomeLabel: "Expected outcome",
  capabilitiesLabel: "Includes",
  priceLabel: "Investment",

  /* 6. CTA */
  ctaLabel: "NEXT STEP",
  ctaTitle: "Start with a real diagnosis.",
  ctaSubtitle:
    "We identify blockers, priorities, and opportunities to turn your presence into growth.",
  ctaPrimary: "Diagnose my presence →",
  ctaNote:
    "We take on a limited number of projects to protect focus, judgment, and execution quality.",

  /* Sticky bar */
  stickyLabel: "Noctra Services",
  stickyCta: "Diagnose my presence →",
};

/* ─────────────────────── animation presets ─────────────── */

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 },
};

/* ─────────────── Service Layer Card ─────────────── */

function ServiceLayerCard({
  layer,
  copy,
}: {
  layer: ServiceLayer;
  copy: ServicesPageCopy;
}) {
  const Icon = layer.icon;

  return (
    <m.article
      {...fadeIn}
      className="grid gap-8 rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 shadow-[0_20px_80px_-50px_rgba(16,185,129,0.35)] md:grid-cols-[1.05fr_0.95fr] md:p-10">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-400">
              {layer.eyebrow}
            </p>
            <h3 className="mt-4 max-w-2xl text-2xl font-black tracking-tight text-white md:text-3xl">
              {layer.title}
            </h3>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.26em] text-neutral-500">
            {copy.capabilitiesLabel}
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-neutral-200">
            {layer.capabilities.join(" · ")}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-6">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.26em] text-emerald-400">
            {copy.whenLabel}
          </p>
          <p className="text-sm leading-relaxed text-neutral-200 md:text-base">
            {layer.when}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-gradient-to-br from-emerald-500/8 to-transparent p-6">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.26em] text-emerald-400">
            {copy.outcomeLabel}
          </p>
          <p className="text-sm leading-relaxed text-neutral-200 md:text-base">
            {layer.outcome}
          </p>
        </div>

        {layer.price && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <span className="text-xs text-neutral-500">{copy.priceLabel}</span>
            <span className="ml-2 text-sm font-medium text-white">
              {layer.price}
            </span>
          </div>
        )}

        <div className="pt-2">
          <Link
            href={layer.layerCtaHref}
            className="text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300">
            {layer.layerCtaText}
          </Link>
        </div>
      </div>
    </m.article>
  );
}

/* ─────────────── Main Component ─────────────── */

export default function ServicesClient() {
  const locale = useLocale();
  const copy = locale === "es" ? ES_COPY : EN_COPY;
  const contactRef = useRef<HTMLDivElement>(null);
  const isContactInView = useInView(contactRef, { amount: 0.2 });

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative min-h-screen overflow-x-clip bg-transparent pb-24 pt-44 md:pt-48 lg:pt-52 selection:bg-emerald-500/30">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ═══════ 1. HERO ═══════ */}
        <section className="relative px-6 pb-28 pt-8 md:px-8 md:pb-36 md:pt-12 lg:pt-16">
          <div className="mx-auto max-w-7xl">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-emerald-400 backdrop-blur">
                {copy.heroBadge}
              </span>
              <h1 className="mt-8 pb-[0.08em] bg-gradient-to-b from-white to-white/45 bg-clip-text text-5xl font-black leading-[1.02] tracking-tight text-transparent md:text-7xl md:leading-[0.98]">
                {copy.title}
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-neutral-300 md:text-2xl">
                {copy.subtitle}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-auto min-h-[48px] w-full rounded-[1.5rem] bg-white px-5 py-3 text-sm text-black hover:bg-neutral-100 sm:w-auto sm:rounded-full sm:px-8 sm:text-base whitespace-normal">
                  <Link
                    href={{
                      pathname: "/contact",
                      query: {
                        intent: "radar_diagnostic",
                        cta: "services_hero",
                      },
                    }}
                    className="leading-tight text-center text-balance">
                    {copy.heroPrimaryCta}
                  </Link>
                </Button>
              </div>
            </m.div>
          </div>
        </section>

        {/* ═══════ 2. SERVICES AS IMPLEMENTATION ═══════ */}
        <section className="px-6 pb-24 pt-8 md:px-8 md:pt-14">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mb-14 max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-400">
                {copy.servicesLabel}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                {copy.servicesTitle}
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-400">
                {copy.servicesSubtitle}
              </p>
            </m.div>

            <div className="space-y-8">
              {copy.serviceLayers.map((layer) => (
                <ServiceLayerCard
                  key={layer.id}
                  layer={layer}
                  copy={copy}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ 3. THE PROBLEM ═══════ */}
        <section className="px-6 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mx-auto mb-14 max-w-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-400">
                {copy.problemLabel}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                {copy.problemTitle}
              </h2>
            </m.div>

            <div className="grid gap-6 md:grid-cols-3">
              {copy.problemPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <m.div
                    key={point.text}
                    {...fadeIn}
                    className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-base font-bold leading-relaxed text-neutral-200">
                      {point.text}
                    </p>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════ 4. THE NOCTRA SYSTEM ═══════ */}
        <section id="noctra-system" className="px-6 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mx-auto mb-14 max-w-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-400">
                {copy.systemLabel}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                {copy.systemTitle}
              </h2>
            </m.div>

            <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {/* Connecting line (desktop only) */}
              <div className="pointer-events-none absolute left-0 right-0 top-[5.5rem] hidden h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 xl:block" />

              {copy.systemSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <m.div
                    key={step.step}
                    {...fadeIn}
                    className="relative rounded-[2rem] border border-white/8 bg-white/[0.03] p-8">
                    <div className="mb-5 flex items-center gap-4">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-emerald-400">
                        {step.step}
                      </p>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-emerald-300/80">
                      {step.description}
                    </p>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════ 5. CTA ═══════ */}
        <section
          ref={contactRef}
          className="px-6 pb-10 pt-24 md:px-8 md:pb-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.8rem] border border-emerald-500/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.14),rgba(10,10,10,0.92)_40%,rgba(255,255,255,0.04))] p-8 md:p-14">
            <m.div
              {...fadeIn}
              className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-300">
                  {copy.ctaLabel}
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white md:text-5xl">
                  {copy.ctaTitle}
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300">
                  {copy.ctaSubtitle}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/8 bg-black/25 p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                    <Radar className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                    Noctra Radar
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href={{
                      pathname: "/contact",
                      query: {
                        intent: "radar_diagnostic",
                        cta: "services_final",
                      },
                    }}
                    className="flex min-h-[56px] w-full items-center justify-center rounded-[1.5rem] bg-white px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.1em] text-black transition-all hover:bg-emerald-50 sm:text-xs sm:tracking-[0.16em] md:rounded-full md:px-6 md:py-4 md:text-sm">
                    <span className="text-center leading-[1.3] text-balance">
                      {copy.ctaPrimary}
                    </span>
                  </Link>
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200/80">
                  {copy.ctaNote}
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* ═══════ STICKY CTA (mobile) ═══════ */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4 lg:hidden">
          <m.div
            initial={{ y: 100 }}
            animate={{ y: isContactInView ? 140 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto mx-auto flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-950/90 p-4 shadow-2xl backdrop-blur-xl">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-emerald-400">
                {copy.stickyLabel}
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {copy.ctaTitle}
              </p>
            </div>

            <Link
              href={{
                pathname: "/contact",
                query: {
                  intent: "radar_diagnostic",
                  cta: "services_sticky",
                },
              }}
              className="max-w-[56%] rounded-xl bg-white px-4 py-3 text-center text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-black">
              {copy.stickyCta}
            </Link>
          </m.div>
        </div>
      </main>
    </LazyMotion>
  );
}
