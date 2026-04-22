"use client";

import { useRef } from "react";
import type { ComponentType, SVGProps } from "react";
import { useLocale } from "next-intl";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import {
  ArrowRight,
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  CheckCircle2,
  Compass,
  Globe,
  Layers3,
  LineChart,
  Radar,
  Search,
  ShieldCheck,
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
  title: string;
  description: string;
};

type SystemStep = {
  step: string;
  title: string;
  description: string;
  detail: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type ServiceLayer = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  when: string;
  why: string;
  outcome: string;
  capabilities: string[];
  intent: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  price?: string;
  layerCtaText: string;
  layerCtaHref: AppPathname;
};

type WhyCard = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type ServicesPageCopy = {
  /* 1. HERO */
  heroBadge: string;
  title: string;
  subtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroAnchor: string;

  /* 2. THE PROBLEM */
  problemLabel: string;
  problemTitle: string;
  problemSubtitle: string;
  problemPoints: ProblemPoint[];

  /* 3. THE NOCTRA SYSTEM */
  systemLabel: string;
  systemTitle: string;
  systemSubtitle: string;
  systemSteps: SystemStep[];
  systemNote: string;

  /* 4. SERVICES AS IMPLEMENTATION */
  servicesLabel: string;
  servicesTitle: string;
  servicesSubtitle: string;
  serviceLayers: ServiceLayer[];
  whenLabel: string;
  whyLabel: string;
  outcomeLabel: string;
  capabilitiesLabel: string;
  priceLabel: string;

  /* 5. WHY THIS WORKS */
  whyLabel2: string;
  whyTitle: string;
  whySubtitle: string;
  whyCards: WhyCard[];

  /* 6. CTA */
  ctaLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaNote: string;

  /* Sticky bar */
  stickyLabel: string;
  stickyCta: string;
};

/* ─────────────────────── ES copy ─────────────────────── */

const ES_COPY: ServicesPageCopy = {
  /* 1. HERO */
  heroBadge: "SISTEMA DE CRECIMIENTO DIGITAL",
  title: "Un sistema diseñado para hacer crecer tu presencia digital.",
  subtitle:
    "Lo que ofrecemos no es una lista de servicios aislados. Es un método estructurado que diagnostica, diseña, implementa y optimiza cada capa de tu presencia digital para que trabaje como un sistema conectado.",
  heroPrimaryCta: "Diagnosticar mi presencia digital",
  heroSecondaryCta: "Ver cómo funciona",
  heroAnchor: "Impulsado por Noctra Radar — nuestro motor de diagnóstico.",

  /* 2. THE PROBLEM */
  problemLabel: "EL PROBLEMA QUE RESOLVEMOS",
  problemTitle:
    "La mayoría de los negocios operan con esfuerzos digitales desconectados.",
  problemSubtitle:
    "¿Te suena familiar? Un logo por un lado, un sitio web por otro, algo de SEO sin seguimiento, redes sin estrategia. Todo se siente disperso porque no hay un sistema que lo conecte.",
  problemPoints: [
    {
      icon: AlertTriangle,
      title: "Esfuerzos fragmentados",
      description:
        "Marca, web, SEO y redes operan por separado. Sin una lógica común, cada pieza compite en lugar de sumar.",
    },
    {
      icon: Target,
      title: "Entregas sin contexto",
      description:
        "La agencia tradicional entrega entregables aislados: un logo, unas páginas, un reporte. Nadie conecta las piezas con el resultado de negocio.",
    },
    {
      icon: LineChart,
      title: "Resultados inconsistentes",
      description:
        "Sin diagnóstico real ni optimización continua, los resultados dependen de la suerte, no de un proceso.",
    },
  ],

  /* 3. THE NOCTRA SYSTEM */
  systemLabel: "EL SISTEMA NOCTRA",
  systemTitle: "Cómo funciona el sistema que hace crecer tu negocio.",
  systemSubtitle:
    "Cada paso tiene un propósito. No saltamos a ejecutar sin antes entender dónde estás, qué necesitas y cómo medir el progreso.",
  systemSteps: [
    {
      step: "01",
      title: "Diagnóstico",
      description: "Noctra Radar analiza tu presencia actual.",
      detail:
        "Radar evalúa visibilidad, SEO, confianza y salud técnica de tu sitio. Detecta bloqueos, prioriza mejoras y convierte hallazgos técnicos en decisiones de negocio. Sin suposiciones: datos reales.",
      icon: Radar,
    },
    {
      step: "02",
      title: "Diseño del sistema",
      description: "Definimos la estructura y la estrategia.",
      detail:
        "Con el diagnóstico en mano, diseñamos el mapa de acción: qué capas necesitan intervención, en qué orden, con qué prioridad y cómo se conectan entre sí para funcionar como un sistema.",
      icon: Compass,
    },
    {
      step: "03",
      title: "Implementación",
      description: "Construimos las capas que necesitas.",
      detail:
        "Activamos las capas correctas del sistema: identidad, web, visibilidad, automatización. Cada pieza se construye bajo la misma lógica estratégica para que sume, no compita.",
      icon: Wrench,
    },
    {
      step: "04",
      title: "Optimización continua",
      description: "Medimos, ajustamos y evolucionamos.",
      detail:
        "El sistema no termina en el lanzamiento. Radar sigue monitoreando, detectando oportunidades y señalando qué ajustar. El crecimiento se vuelve un ciclo, no un evento.",
      icon: TrendingUp,
    },
  ],
  systemNote:
    "Noctra Radar no es un extra opcional. Es el punto de partida y el motor de continuidad de todo el sistema.",

  /* 4. SERVICES AS IMPLEMENTATION */
  servicesLabel: "CAPAS DE IMPLEMENTACIÓN",
  servicesTitle:
    "Los servicios son las piezas de tu sistema. No entregables sueltos.",
  servicesSubtitle:
    "Cada capa se activa según lo que el diagnóstico revele. No trabajamos todo a la vez: priorizamos lo que tiene más impacto para tu negocio hoy.",
  serviceLayers: [
    {
      id: "identity",
      eyebrow: "CAPA 01",
      title: "Identidad y posicionamiento",
      description:
        "La base que define cómo se percibe tu negocio. Sin claridad de marca, todo lo demás pierde fuerza.",
      when: "Cuando tu negocio se percibe genérico, disperso o menos valioso de lo que realmente es.",
      why: "La identidad define la primera impresión y la confianza a largo plazo. Es la diferencia entre que alguien te contacte o siga buscando.",
      outcome:
        "Más confianza, oferta más clara, mejor tasa de conversión desde el primer contacto.",
      capabilities: [
        "Branding estratégico",
        "Narrativa y mensajería de marca",
        "Sistema visual consistente",
        "Posicionamiento competitivo",
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
      description:
        "Tu sitio web no es una vitrina. Es la infraestructura comercial donde converge todo el sistema.",
      when: "Cuando tu sitio no explica bien tu oferta, es lento, no genera contactos o se siente desactualizado.",
      why: "Un sitio sin arquitectura de conversión es un vendedor que no habla. Cada segundo de carga extra y cada paso de fricción cuestan oportunidades reales.",
      outcome:
        "Un sitio que trabaja 24/7: explica, convence y convierte sin intervención manual.",
      capabilities: [
        "Websites de alto rendimiento (Next.js)",
        "Arquitectura de conversión (CRO)",
        "Landing pages optimizadas",
        "E-commerce sin fricción",
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
      description:
        "Que las personas correctas te encuentren, sin depender solo de pauta pagada o de que alguien te recomiende.",
      when: "Cuando tienes un buen producto o servicio, pero la gente no te encuentra en Google.",
      why: "La visibilidad orgánica es el canal más sostenible de adquisición. Pero solo funciona si hay estructura técnica, contenido relevante y señales de autoridad.",
      outcome:
        "Más tráfico orgánico cualificado, menos dependencia de pauta y crecimiento compuesto.",
      capabilities: [
        "SEO técnico y estructural",
        "Arquitectura de contenido",
        "Estrategia de autoridad",
        "Monitoreo con Noctra Radar",
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
      description:
        "Eliminar fricción operativa para que tu equipo se enfoque en lo que de verdad mueve el negocio.",
      when: "Cuando pierdes demasiado tiempo en seguimiento manual, coordinación o tareas repetitivas.",
      why: "La eficiencia operativa no es un lujo. Es lo que permite crecer sin que cada nueva oportunidad sea una carga más.",
      outcome:
        "Menos trabajo manual, mejor respuesta al cliente y más capacidad para escalar.",
      capabilities: [
        "Automatizaciones con IA",
        "Flujos de captación de leads",
        "Integraciones CRM y herramientas",
        "Procesos de seguimiento automático",
      ],
      intent: "automation",
      icon: Bot,
      layerCtaText: "Ver Automatización →",
      layerCtaHref: "/contact",
    },
  ],
  whenLabel: "Cuándo se activa",
  whyLabel: "Por qué importa",
  outcomeLabel: "Resultado esperado",
  capabilitiesLabel: "Incluye",
  priceLabel: "Inversión",

  /* 5. WHY THIS WORKS */
  whyLabel2: "POR QUÉ FUNCIONA",
  whyTitle: "Sistema vs. servicios aislados",
  whySubtitle:
    "La diferencia no está en las piezas individuales. Está en cómo se conectan entre sí y en el proceso que las sostiene.",
  whyCards: [
    {
      title: "Sistema integrado, no entregables sueltos",
      description:
        "Cada capa se diseña bajo la misma lógica estratégica. Marca, web, SEO y automatización se refuerzan mutuamente en lugar de competir entre sí.",
      icon: Layers3,
    },
    {
      title: "Optimización continua, no proyectos que se abandonan",
      description:
        "Con Noctra Radar monitoreando de forma continua, el sistema detecta oportunidades y problemas antes de que afecten resultados. El crecimiento no depende de revisiones esporádicas.",
      icon: Activity,
    },
    {
      title: "Impacto medible, no promesas abstractas",
      description:
        "Cada decisión parte de datos reales del diagnóstico. Cada mejora se mide contra métricas concretas. El ROI no es un concepto: es un número que puedes verificar.",
      icon: BarChart3,
    },
    {
      title: "Primero diagnóstico, luego acción",
      description:
        "No saltamos a implementar sin entender. Radar genera la base de inteligencia que define qué hacer, en qué orden y por qué. Eso elimina trabajo innecesario y decisiones a ciegas.",
      icon: ShieldCheck,
    },
  ],

  /* 6. CTA */
  ctaLabel: "SIGUIENTE PASO",
  ctaTitle: "Empieza con un diagnóstico real de tu presencia digital.",
  ctaSubtitle:
    "Noctra Radar analiza tu sitio, detecta bloqueos de crecimiento y te muestra un mapa de prioridades. Sin compromiso, sin genéricos. Un diagnóstico real para decisiones reales.",
  ctaPrimary: "Diagnosticar mi presencia digital",
  ctaSecondary: "Ver casos de trabajo",
  ctaNote:
    "Trabajamos con pocos proyectos a la vez para cuidar foco, criterio y ejecución.",

  /* Sticky bar */
  stickyLabel: "Sistema Noctra",
  stickyCta: "Diagnosticar ahora",
};

/* ─────────────────────── EN copy ─────────────────────── */

const EN_COPY: ServicesPageCopy = {
  /* 1. HERO */
  heroBadge: "DIGITAL GROWTH SYSTEM",
  title: "A system designed to grow your digital presence.",
  subtitle:
    "What we offer is not a list of isolated services. It is a structured method that diagnoses, designs, implements, and optimizes every layer of your digital presence so it works as a connected system.",
  heroPrimaryCta: "Diagnose my digital presence",
  heroSecondaryCta: "See how it works",
  heroAnchor: "Powered by Noctra Radar — our diagnostic engine.",

  /* 2. THE PROBLEM */
  problemLabel: "THE PROBLEM WE SOLVE",
  problemTitle:
    "Most businesses operate with disconnected digital efforts.",
  problemSubtitle:
    "Sound familiar? A logo on one side, a website on another, some SEO with no follow-up, social media with no strategy. Everything feels scattered because there is no system connecting it.",
  problemPoints: [
    {
      icon: AlertTriangle,
      title: "Fragmented efforts",
      description:
        "Brand, website, SEO, and social operate separately. Without shared logic, each piece competes instead of compounding.",
    },
    {
      icon: Target,
      title: "Deliverables without context",
      description:
        "Traditional agencies deliver isolated outputs: a logo, a few pages, a report. Nobody connects the pieces to business results.",
    },
    {
      icon: LineChart,
      title: "Inconsistent results",
      description:
        "Without real diagnosis or continuous optimization, results depend on luck, not on a process.",
    },
  ],

  /* 3. THE NOCTRA SYSTEM */
  systemLabel: "THE NOCTRA SYSTEM",
  systemTitle: "How the system works to grow your business.",
  systemSubtitle:
    "Every step has a purpose. We do not jump to execution without first understanding where you are, what you need, and how to measure progress.",
  systemSteps: [
    {
      step: "01",
      title: "Diagnosis",
      description: "Noctra Radar analyzes your current presence.",
      detail:
        "Radar evaluates visibility, SEO, trust, and technical health. It detects blockers, prioritizes improvements, and turns technical findings into business decisions. No assumptions: real data.",
      icon: Radar,
    },
    {
      step: "02",
      title: "System design",
      description: "We define the structure and strategy.",
      detail:
        "With the diagnosis in hand, we design the action map: which layers need intervention, in what order, with what priority, and how they connect to function as a system.",
      icon: Compass,
    },
    {
      step: "03",
      title: "Implementation",
      description: "We build the layers you need.",
      detail:
        "We activate the right system layers: identity, web, visibility, automation. Each piece is built under the same strategic logic so it compounds instead of competing.",
      icon: Wrench,
    },
    {
      step: "04",
      title: "Continuous optimization",
      description: "We measure, adjust, and evolve.",
      detail:
        "The system does not end at launch. Radar keeps monitoring, detecting opportunities, and flagging what to adjust. Growth becomes a cycle, not an event.",
      icon: TrendingUp,
    },
  ],
  systemNote:
    "Noctra Radar is not an optional add-on. It is the starting point and the continuity engine of the entire system.",

  /* 4. SERVICES AS IMPLEMENTATION */
  servicesLabel: "IMPLEMENTATION LAYERS",
  servicesTitle:
    "Services are the pieces of your system. Not standalone deliverables.",
  servicesSubtitle:
    "Each layer activates based on what the diagnosis reveals. We do not work on everything at once: we prioritize what has the most impact for your business today.",
  serviceLayers: [
    {
      id: "identity",
      eyebrow: "LAYER 01",
      title: "Identity & positioning",
      description:
        "The foundation that defines how your business is perceived. Without brand clarity, everything else loses its power.",
      when: "When your business feels generic, scattered, or less valuable than it actually is.",
      why: "Identity defines the first impression and long-term trust. It is the difference between someone contacting you or continuing to search.",
      outcome:
        "More trust, clearer offer, better conversion rate from the very first contact.",
      capabilities: [
        "Strategic branding",
        "Brand narrative & messaging",
        "Consistent visual system",
        "Competitive positioning",
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
      description:
        "Your website is not a showcase. It is the commercial infrastructure where the entire system converges.",
      when: "When your site does not explain your offer well, is slow, does not generate leads, or feels outdated.",
      why: "A site without conversion architecture is a salesperson who does not speak. Every extra second of load time and every friction step costs real opportunities.",
      outcome:
        "A site that works 24/7: explains, persuades, and converts without manual intervention.",
      capabilities: [
        "High-performance websites (Next.js)",
        "Conversion architecture (CRO)",
        "Optimized landing pages",
        "Frictionless e-commerce",
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
      description:
        "The right people find you, without depending solely on paid ads or word-of-mouth referrals.",
      when: "When you have a great product or service, but people cannot find you on Google.",
      why: "Organic visibility is the most sustainable acquisition channel. But it only works with technical structure, relevant content, and authority signals.",
      outcome:
        "More qualified organic traffic, less ad dependency, and compound growth.",
      capabilities: [
        "Technical & structural SEO",
        "Content architecture",
        "Authority strategy",
        "Monitoring with Noctra Radar",
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
      description:
        "Eliminate operational friction so your team focuses on what truly moves the business.",
      when: "When you lose too much time on manual follow-ups, coordination, or repetitive tasks.",
      why: "Operational efficiency is not a luxury. It is what allows growth without every new opportunity becoming another burden.",
      outcome:
        "Less manual work, better client response, and more capacity to scale.",
      capabilities: [
        "AI-powered automations",
        "Lead capture workflows",
        "CRM & tool integrations",
        "Automated follow-up processes",
      ],
      intent: "automation",
      icon: Bot,
      layerCtaText: "View Automation →",
      layerCtaHref: "/contact",
    },
  ],
  whenLabel: "When to activate",
  whyLabel: "Why it matters",
  outcomeLabel: "Expected outcome",
  capabilitiesLabel: "Includes",
  priceLabel: "Investment",

  /* 5. WHY THIS WORKS */
  whyLabel2: "WHY IT WORKS",
  whyTitle: "System vs. isolated services",
  whySubtitle:
    "The difference is not in the individual pieces. It is in how they connect and the process that sustains them.",
  whyCards: [
    {
      title: "Integrated system, not standalone deliverables",
      description:
        "Each layer is designed under the same strategic logic. Brand, web, SEO, and automation reinforce each other instead of competing.",
      icon: Layers3,
    },
    {
      title: "Continuous optimization, not abandoned projects",
      description:
        "With Noctra Radar monitoring continuously, the system detects opportunities and issues before they affect results. Growth does not depend on sporadic check-ins.",
      icon: Activity,
    },
    {
      title: "Measurable impact, not abstract promises",
      description:
        "Every decision starts from real diagnostic data. Every improvement is measured against concrete metrics. ROI is not a concept: it is a number you can verify.",
      icon: BarChart3,
    },
    {
      title: "Diagnosis first, action second",
      description:
        "We do not jump into implementation without understanding. Radar generates the intelligence base that defines what to do, in what order, and why. That eliminates unnecessary work and blind decisions.",
      icon: ShieldCheck,
    },
  ],

  /* 6. CTA */
  ctaLabel: "NEXT STEP",
  ctaTitle: "Start with a real diagnosis of your digital presence.",
  ctaSubtitle:
    "Noctra Radar analyzes your site, detects growth blockers, and shows you a priority map. No commitment, no generics. A real diagnosis for real decisions.",
  ctaPrimary: "Diagnose my digital presence",
  ctaSecondary: "View case studies",
  ctaNote:
    "We take on a limited number of projects to protect focus, judgment, and execution quality.",

  /* Sticky bar */
  stickyLabel: "Noctra System",
  stickyCta: "Get diagnosed",
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

        <p className="max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
          {layer.description}
        </p>

        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.26em] text-neutral-500">
            {copy.capabilitiesLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {layer.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-200">
                {cap}
              </span>
            ))}
          </div>
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

        <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-6">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.26em] text-emerald-400">
            {copy.whyLabel}
          </p>
          <p className="text-sm leading-relaxed text-neutral-200 md:text-base">
            {layer.why}
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
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-emerald-400/80 md:text-base">
                {copy.heroAnchor}
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

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-white/12 bg-transparent px-8 text-base text-neutral-200 hover:bg-white/5 hover:text-white">
                  <a href="#noctra-system">{copy.heroSecondaryCta}</a>
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
              <p className="mt-5 text-lg leading-relaxed text-neutral-400">
                {copy.problemSubtitle}
              </p>
            </m.div>

            <div className="grid gap-6 md:grid-cols-3">
              {copy.problemPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <m.div
                    key={point.title}
                    {...fadeIn}
                    className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {point.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-neutral-400">
                      {point.description}
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
              <p className="mt-5 text-lg leading-relaxed text-neutral-400">
                {copy.systemSubtitle}
              </p>
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
                    <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                      {step.detail}
                    </p>
                  </m.div>
                );
              })}
            </div>

            {/* System note (Radar anchor) */}
            <m.div
              {...fadeIn}
              className="mx-auto mt-10 max-w-3xl rounded-[1.5rem] border border-emerald-500/15 bg-gradient-to-br from-emerald-500/8 to-transparent p-6 text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <Radar className="h-4 w-4 text-emerald-400" />
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-emerald-400">
                  Noctra Radar
                </p>
              </div>
              <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
                {copy.systemNote}
              </p>
            </m.div>
          </div>
        </section>

        {/* ═══════ 5. WHY THIS WORKS ═══════ */}
        <section className="px-6 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mx-auto mb-14 max-w-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-400">
                {copy.whyLabel2}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                {copy.whyTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-neutral-400">
                {copy.whySubtitle}
              </p>
            </m.div>

            <div className="grid gap-6 md:grid-cols-2">
              {copy.whyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <m.div
                    key={card.title}
                    {...fadeIn}
                    className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-neutral-400">
                      {card.description}
                    </p>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════ 6. CTA ═══════ */}
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
                    className="grid w-full min-h-[56px] grid-cols-[1.25rem_minmax(0,1fr)_1.25rem] items-center gap-3 rounded-[1.5rem] bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-black transition-all hover:bg-emerald-50 sm:text-xs sm:tracking-[0.16em] md:rounded-full md:px-6 md:py-4 md:text-sm">
                    <span aria-hidden="true" className="h-4 w-4" />
                    <span className="text-center leading-[1.3] text-balance">
                      {copy.ctaPrimary}
                    </span>
                    <ArrowRight className="h-4 w-4 justify-self-end opacity-80" />
                  </Link>

                  <Link
                    href="/work"
                    className="grid w-full min-h-[56px] grid-cols-[1.25rem_minmax(0,1fr)_1.25rem] items-center gap-3 rounded-[1.5rem] border border-white/12 px-5 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-white transition-all hover:bg-white/5 sm:text-xs sm:tracking-[0.16em] md:rounded-full md:px-6 md:py-4 md:text-sm">
                    <span aria-hidden="true" className="h-4 w-4" />
                    <span className="text-center leading-[1.3] text-balance">
                      {copy.ctaSecondary}
                    </span>
                    <ArrowRight className="h-4 w-4 justify-self-end opacity-80" />
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
              className="shrink-0 rounded-xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">
              {copy.stickyCta}
            </Link>
          </m.div>
        </div>
      </main>
    </LazyMotion>
  );
}
