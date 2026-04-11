"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Radar } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";

/* ─────────────────────── types ─────────────────────── */

type AboutCopy = {
  /* 1. HERO */
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubLine1: string;
  heroSubLine2: string;

  /* 2. THE PROBLEM */
  problemLine1: string;
  problemLine2: string;
  problemLine3: string;

  /* 3. WHY NOCTRA EXISTS */
  originLabel: string;
  originTitle: string;
  originParagraphs: string[];

  /* 4. THE SHIFT */
  shiftLabel: string;
  shiftTitle: string;
  shiftFromLabel: string;
  shiftFromPoints: string[];
  shiftToLabel: string;
  shiftToPoints: string[];
  shiftNote: string;

  /* 5. HOW WE THINK */
  thinkingLabel: string;
  thinkingTitle: string;
  thinkingPillars: { title: string; text: string }[];

  /* 6. STUDIO + PRODUCTS */
  modelLabel: string;
  modelTitle: string;
  modelSub: string;
  studioTitle: string;
  studioText: string;
  studioPoints: string[];
  productsTitle: string;
  productsText: string;
  productsPoints: string[];

  /* 7. WHAT WE ARE BUILDING */
  visionLabel: string;
  visionTitle: string;
  visionParagraphs: string[];

  /* 8. HUMAN ELEMENT */
  founderLabel: string;
  founderName: string;
  founderRole: string;
  founderQuote: string;
  founderParagraphs: string[];

  /* 9. CTA */
  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaNote: string;
};

/* ─────────────────────── ES copy ─────────────────────── */

const ES: AboutCopy = {
  /* 1 */
  heroBadge: "NOCTRA STUDIO",
  heroTitleLine1: "No construimos presencia digital.",
  heroTitleLine2: "Construimos claridad.",
  heroSubLine1: "Noctra existe porque el mercado digital se llenó de ruido y piezas sueltas.",
  heroSubLine2: "Nosotros elegimos otro camino.",

  /* 2 */
  problemLine1:
    "Más herramientas no significan más crecimiento.",
  problemLine2:
    "Más contenido no significa más confianza.",
  problemLine3:
    "Más agencias no significan mejores resultados.",

  /* 3 */
  originLabel: "POR QUÉ EXISTE NOCTRA",
  originTitle: "Vimos un mercado lleno de esfuerzo. Y vacío de estructura.",
  originParagraphs: [
    "Empezamos trabajando en proyectos digitales como la mayoría: branding por un lado, web por otro, SEO como un extra opcional. Cada pieza vivía sola. Se entregaba, se facturaba y se olvidaba.",
    "Pero los resultados no escalaban. Los clientes acumulaban activos digitales que no conversaban entre sí. Los rediseños no resolvían problemas; solo los movían de lugar.",
    "El patrón era claro: el problema no era la ejecución de cada pieza. Era la ausencia de un sistema que las conectara.",
    "Noctra nació de esa observación. No como una agencia más, sino como un modelo diferente: uno donde cada capa digital — identidad, web, visibilidad, automatización — se diseña bajo la misma lógica. Un sistema, no un catálogo.",
  ],

  /* 4 */
  shiftLabel: "EL CAMBIO",
  shiftTitle: "De piezas sueltas a sistema conectado.",
  shiftFromLabel: "EL MODELO VIEJO",
  shiftFromPoints: [
    "Logo desconectado de la web",
    "Web sin arquitectura de conversión",
    "SEO como servicio opcional",
    "Lanzar y olvidar",
    "Resultados que dependen de la suerte",
  ],
  shiftToLabel: "EL MODELO NOCTRA",
  shiftToPoints: [
    "Identidad que alimenta la web",
    "Web como motor de conversión 24/7",
    "SEO estructural desde el día uno",
    "Monitoreo y optimización continua",
    "Resultados medibles y compuestos",
  ],
  shiftNote:
    "No es un tema de hacer más. Es un tema de hacer que todo funcione junto.",

  /* 5 */
  thinkingLabel: "CÓMO PENSAMOS",
  thinkingTitle: "Tres ideas que guían cada decisión.",
  thinkingPillars: [
    {
      title: "Claridad",
      text: "Si alguien llega a tu sitio y no entiende qué haces en 8 segundos, el problema no es el diseño. Es la estructura del mensaje. Todo empieza por lo que debe quedar claro.",
    },
    {
      title: "Estructura",
      text: "Un sitio rápido con mala arquitectura sigue siendo un mal sitio. Contenido sin estrategia es ruido. La estructura viene antes que el volumen, siempre.",
    },
    {
      title: "Continuidad",
      text: "Un sistema que no se mide, se degrada. La optimización no es un extra; es la razón por la que el sistema sigue funcionando después del lanzamiento.",
    },
  ],

  /* 6 */
  modelLabel: "EL MODELO",
  modelTitle: "Estudio + Producto. Dos capas, un sistema.",
  modelSub:
    "Noctra no es solo un estudio que ejecuta proyectos. Es un modelo híbrido donde la implementación estratégica y el software propio se refuerzan mutuamente.",
  studioTitle: "Noctra Studio",
  studioText:
    "Implementación estratégica. Construimos las capas que necesita tu negocio — identidad, web, visibilidad, automatización — bajo una sola lógica.",
  studioPoints: [
    "Branding estratégico",
    "Websites de alto rendimiento",
    "SEO técnico y estructural",
    "Automatizaciones con IA",
  ],
  productsTitle: "Noctra Products",
  productsText:
    "Software que sostiene lo construido. Radar diagnostica y monitorea. Social extiende la marca. Cada herramienta refuerza el sistema.",
  productsPoints: [
    "Noctra Radar — diagnóstico continuo",
    "Noctra Social — contenido con IA",
    "Herramientas internas de ejecución",
    "Ecosistema conectado",
  ],

  /* 7 */
  visionLabel: "HACIA DÓNDE VAMOS",
  visionTitle: "Un ecosistema, no un catálogo.",
  visionParagraphs: [
    "Noctra no se detendrá en ser un estudio con buenos proyectos. Estamos construyendo infraestructura de crecimiento: herramientas, datos y estrategia conectados en un solo sistema.",
    "Cada producto que lanzamos está diseñado para integrarse con los demás. Radar alimenta al estudio. Social extiende la marca. CRM organiza la operación. No son productos sueltos: son capas del mismo sistema.",
    "Construimos para que tu presencia digital siga siendo relevante, competitiva y medible dentro de 2, 3, 5 años. No para el proyecto de este mes.",
  ],

  /* 8 */
  founderLabel: "UNA NOTA PERSONAL",
  founderName: "Manuel de Quevedo",
  founderRole: "Fundador, Noctra Studio",
  founderQuote:
    "Noctra no nació de querer hacer una agencia mejor. Nació de la frustración de ver que el modelo actual no funcionaba.",
  founderParagraphs: [
    "Después de años viendo proyectos que se entregaban y se olvidaban, resultados que se degradaban en silencio y esfuerzos que nunca se conectaban, decidí que si iba a construir algo, tenía que funcionar como un sistema.",
    "No como un catálogo de servicios. No como un portafolio bonito. Como un sistema donde cada pieza refuerza a la otra y donde los resultados se miden, se ajustan y se componen con el tiempo.",
    "Esa es la promesa. No ser la agencia más creativa. Ser el sistema más claro.",
  ],

  /* 9 */
  ctaTitle: "Entender cómo funciona Noctra.",
  ctaSub:
    "Si lo que leíste aquí resuena con cómo piensas tu negocio, el siguiente paso es ver el sistema en acción.",
  ctaPrimary: "Diagnosticar mi presencia digital",
  ctaSecondary: "Ver cómo aplicamos este enfoque",
  ctaNote: "Trabajamos con pocos proyectos a la vez para cuidar foco y ejecución.",
};

/* ─────────────────────── EN copy ─────────────────────── */

const EN: AboutCopy = {
  /* 1 */
  heroBadge: "NOCTRA STUDIO",
  heroTitleLine1: "We don't build digital presence.",
  heroTitleLine2: "We build clarity.",
  heroSubLine1: "Noctra exists because the digital market filled up with noise and loose pieces.",
  heroSubLine2: "We chose a different path.",

  /* 2 */
  problemLine1:
    "More tools do not mean more growth.",
  problemLine2:
    "More content does not mean more trust.",
  problemLine3:
    "More agencies do not mean better results.",

  /* 3 */
  originLabel: "WHY NOCTRA EXISTS",
  originTitle: "We saw a market full of effort. And empty of structure.",
  originParagraphs: [
    "We started working on digital projects like most do: branding on one side, web on another, SEO as an optional add-on. Each piece lived alone. Delivered, invoiced, forgotten.",
    "But results did not scale. Clients accumulated digital assets that did not talk to each other. Redesigns did not solve problems; they just moved them somewhere else.",
    "The pattern was clear: the problem was not the execution of each piece. It was the absence of a system connecting them.",
    "Noctra was born from that observation. Not as another agency, but as a different model: one where every digital layer — identity, web, visibility, automation — is designed under the same logic. A system, not a catalog.",
  ],

  /* 4 */
  shiftLabel: "THE SHIFT",
  shiftTitle: "From loose pieces to connected system.",
  shiftFromLabel: "THE OLD MODEL",
  shiftFromPoints: [
    "Logo disconnected from the website",
    "Website without conversion architecture",
    "SEO as an optional service",
    "Launch and forget",
    "Results that depend on luck",
  ],
  shiftToLabel: "THE NOCTRA MODEL",
  shiftToPoints: [
    "Identity that feeds the website",
    "Website as a 24/7 conversion engine",
    "Structural SEO from day one",
    "Continuous monitoring and optimization",
    "Measurable, compound results",
  ],
  shiftNote:
    "It is not about doing more. It is about making everything work together.",

  /* 5 */
  thinkingLabel: "HOW WE THINK",
  thinkingTitle: "Three ideas that guide every decision.",
  thinkingPillars: [
    {
      title: "Clarity",
      text: "If someone lands on your site and cannot understand what you do in 8 seconds, the problem is not the design. It is the structure of the message. Everything starts with what needs to be clear.",
    },
    {
      title: "Structure",
      text: "A fast site with bad architecture is still a bad site. Content without strategy is noise. Structure comes before volume, always.",
    },
    {
      title: "Continuity",
      text: "A system that is not measured degrades. Optimization is not an add-on; it is the reason the system keeps working after launch.",
    },
  ],

  /* 6 */
  modelLabel: "THE MODEL",
  modelTitle: "Studio + Product. Two layers, one system.",
  modelSub:
    "Noctra is not just a studio that executes projects. It is a hybrid model where strategic implementation and proprietary software reinforce each other.",
  studioTitle: "Noctra Studio",
  studioText:
    "Strategic implementation. We build the layers your business needs — identity, web, visibility, automation — under one logic.",
  studioPoints: [
    "Strategic branding",
    "High-performance websites",
    "Technical & structural SEO",
    "AI-powered automations",
  ],
  productsTitle: "Noctra Products",
  productsText:
    "Software that sustains what we build. Radar diagnoses and monitors. Social extends the brand. Each tool reinforces the system.",
  productsPoints: [
    "Noctra Radar — continuous diagnosis",
    "Noctra Social — AI-powered content",
    "Internal execution tools",
    "Connected ecosystem",
  ],

  /* 7 */
  visionLabel: "WHERE WE ARE GOING",
  visionTitle: "An ecosystem, not a catalog.",
  visionParagraphs: [
    "Noctra will not stop at being a studio with good projects. We are building growth infrastructure: tools, data, and strategy connected into one system.",
    "Every product we launch is designed to integrate with the others. Radar feeds the studio. Social extends the brand. CRM organizes operations. They are not separate products: they are layers of the same system.",
    "We build so your digital presence remains relevant, competitive, and measurable 2, 3, 5 years from now. Not for this month's project.",
  ],

  /* 8 */
  founderLabel: "A PERSONAL NOTE",
  founderName: "Manuel de Quevedo",
  founderRole: "Founder, Noctra Studio",
  founderQuote:
    "Noctra was not born from wanting to build a better agency. It was born from the frustration of seeing the current model not working.",
  founderParagraphs: [
    "After years of seeing projects delivered and forgotten, results degrading silently, and efforts that never connected, I decided that if I was going to build something, it had to work as a system.",
    "Not as a catalog of services. Not as a pretty portfolio. As a system where every piece reinforces the other and results are measured, adjusted, and compounded over time.",
    "That is the promise. Not to be the most creative agency. To be the clearest system.",
  ],

  /* 9 */
  ctaTitle: "Understand how Noctra works.",
  ctaSub:
    "If what you read here resonates with how you think about your business, the next step is seeing the system in action.",
  ctaPrimary: "Diagnose my digital presence",
  ctaSecondary: "See how we apply this approach",
  ctaNote: "We take on few projects at a time to protect focus and execution.",
};

/* ─────────────────────── animation tokens ─────────────── */

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: EASE },
};

const revealSlow = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: EASE },
};

/* ─────────────── Main Component ─────────────── */

export default function AboutClient() {
  const locale = useLocale();
  const c = locale === "es" ? ES : EN;

  /* parallax for hero */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative min-h-screen overflow-x-clip bg-transparent selection:bg-emerald-500/30">
        {/* ═══════════════════════════════════════════
            1. HERO — calm, centered, massive whitespace
        ═══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative flex min-h-[92vh] items-center justify-center px-6 md:px-8">
          {/* Background activation — subtle glow/tension */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(16,185,129,0.12),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(50,50,50,0.2),transparent_50%)]" />

          <m.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 w-full max-w-6xl md:pl-16 lg:pl-24">
            {/* Visual Anchor Dot */}
            <m.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -left-4 top-1 h-1 w-1 rounded-full bg-emerald-500/60 blur-[1px] md:-left-8"
            />

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="mb-10 text-[10px] font-black uppercase tracking-[0.6em] text-emerald-400/60">
              {c.heroBadge}
            </m.p>

            <m.h1 className="flex flex-col gap-2">
              <m.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-4xl font-black tracking-tight text-white/35 md:text-6xl lg:text-[4.8rem]">
                {c.heroTitleLine1}
              </m.span>
              <m.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-6xl font-black leading-[1] tracking-tighter text-transparent md:text-8xl lg:text-[7.2rem]">
                {c.heroTitleLine2}
              </m.span>
            </m.h1>

            <div className="mt-14 max-w-2xl space-y-3">
              <m.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl font-medium leading-relaxed text-neutral-300 md:text-2xl">
                {c.heroSubLine1}
              </m.p>
              <m.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg leading-relaxed text-neutral-400 md:text-xl">
                {c.heroSubLine2}
              </m.p>
            </div>
          </m.div>

          {/* Scroll indicator */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent" />
            </div>
          </m.div>
        </section>

        {/* ═══════════════════════════════════════════
            2. THE PROBLEM — editorial scroll reveal
        ═══════════════════════════════════════════ */}
        <section className="relative px-6 py-40 md:px-8 md:py-64">
          <ScrollTextReveal
            lines={[
              { text: c.problemLine1, className: "text-left" },
              { text: c.problemLine2, className: "text-left md:ml-[15%] lg:ml-[25%]" },
              { text: c.problemLine3, className: "text-left" },
            ]}
            className="mx-auto max-w-7xl"
          />
        </section>

        {/* thin divider */}
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ═══════════════════════════════════════════
            3. WHY NOCTRA EXISTS — long-form, generous spacing
        ═══════════════════════════════════════════ */}
        <section className="px-6 py-32 md:px-8 md:py-44">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.4fr_0.6fr] md:items-start">
            {/* left: sticky label */}
            <m.div {...reveal} className="md:sticky md:top-32">
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-emerald-400/80">
                {c.originLabel}
              </p>
              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                {c.originTitle}
              </h2>
            </m.div>

            {/* right: flowing paragraphs */}
            <div className="space-y-8">
              {c.originParagraphs.map((p, i) => (
                <m.p
                  key={i}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  className="max-w-2xl text-lg leading-[1.85] text-neutral-400 md:text-xl">
                  {p}
                </m.p>
              ))}
            </div>
          </div>
        </section>

        {/* thin divider */}
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ═══════════════════════════════════════════
            4. THE SHIFT — side-by-side contrast
        ═══════════════════════════════════════════ */}
        <section className="px-6 py-32 md:px-8 md:py-44">
          <div className="mx-auto max-w-7xl">
            <m.div {...reveal} className="mx-auto mb-20 max-w-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-emerald-400/80">
                {c.shiftLabel}
              </p>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                {c.shiftTitle}
              </h2>
            </m.div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* OLD MODEL */}
              <m.div
                {...reveal}
                className="rounded-[2rem] border border-white/6 bg-white/[0.02] p-8 md:p-10">
                <p className="mb-8 text-[10px] font-black uppercase tracking-[0.32em] text-neutral-500">
                  {c.shiftFromLabel}
                </p>
                <div className="space-y-5">
                  {c.shiftFromPoints.map((pt) => (
                    <div
                      key={pt}
                      className="flex items-start gap-4 text-base text-neutral-500 md:text-lg">
                      <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-neutral-700" />
                      <span className="line-through decoration-neutral-700">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </m.div>

              {/* NOCTRA MODEL */}
              <m.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.1 }}
                className="rounded-[2rem] border border-emerald-500/12 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-8 md:p-10">
                <p className="mb-8 text-[10px] font-black uppercase tracking-[0.32em] text-emerald-400">
                  {c.shiftToLabel}
                </p>
                <div className="space-y-5">
                  {c.shiftToPoints.map((pt) => (
                    <div
                      key={pt}
                      className="flex items-start gap-4 text-base text-neutral-200 md:text-lg">
                      <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </m.div>
            </div>

            <m.p
              {...reveal}
              className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-neutral-500 md:text-lg">
              {c.shiftNote}
            </m.p>
          </div>
        </section>

        {/* thin divider */}
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ═══════════════════════════════════════════
            5. HOW WE THINK — large type pillars, staggered
        ═══════════════════════════════════════════ */}
        <section className="px-6 py-32 md:px-8 md:py-44">
          <div className="mx-auto max-w-7xl">
            <m.div {...reveal} className="mb-24 max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-emerald-400/80">
                {c.thinkingLabel}
              </p>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                {c.thinkingTitle}
              </h2>
            </m.div>

            <div className="space-y-24 md:space-y-32">
              {c.thinkingPillars.map((pillar, i) => (
                <m.div
                  key={pillar.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.05 }}
                  className={`grid max-w-6xl items-start gap-8 md:grid-cols-[0.35fr_0.65fr] ${
                    i % 2 === 1 ? "md:ml-auto" : ""
                  }`}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-emerald-400/60">
                      0{i + 1}
                    </span>
                    <h3 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="max-w-2xl text-lg leading-[1.85] text-neutral-400 md:text-xl">
                    {pillar.text}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* thin divider */}
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ═══════════════════════════════════════════
            6. STUDIO + PRODUCTS — subtle, asymmetric
        ═══════════════════════════════════════════ */}
        <section className="px-6 py-32 md:px-8 md:py-44">
          <div className="mx-auto max-w-7xl">
            <m.div {...reveal} className="mx-auto mb-16 max-w-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-emerald-400/80">
                {c.modelLabel}
              </p>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                {c.modelTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-400 md:text-xl">
                {c.modelSub}
              </p>
            </m.div>

            <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
              {/* Studio */}
              <m.div
                {...reveal}
                className="flex flex-col justify-between rounded-[2rem] border border-white/6 bg-white/[0.02] p-8 md:p-10">
                <div>
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500">
                    STUDIO
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                    {c.studioTitle}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-400 md:text-lg">
                    {c.studioText}
                  </p>
                </div>
                <div className="mt-8 space-y-3">
                  {c.studioPoints.map((pt) => (
                    <div
                      key={pt}
                      className="flex items-center gap-3 text-sm text-neutral-300">
                      <span className="block h-1.5 w-1.5 rounded-full bg-white/30" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </m.div>

              {/* Products */}
              <m.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.1 }}
                className="flex flex-col justify-between rounded-[2rem] border border-emerald-500/12 bg-gradient-to-br from-emerald-500/[0.05] to-transparent p-8 md:p-10">
                <div>
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-emerald-400/80">
                    PRODUCTS
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                    {c.productsTitle}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-400 md:text-lg">
                    {c.productsText}
                  </p>
                </div>
                <div className="mt-8 space-y-3">
                  {c.productsPoints.map((pt) => (
                    <div
                      key={pt}
                      className="flex items-center gap-3 text-sm text-emerald-300/90">
                      <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* thin divider */}
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ═══════════════════════════════════════════
            7. WHAT WE ARE BUILDING — open, aspirational
        ═══════════════════════════════════════════ */}
        <section className="px-6 py-32 md:px-8 md:py-44">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.4fr_0.6fr] md:items-start">
            <m.div {...reveal} className="md:sticky md:top-32">
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-emerald-400/80">
                {c.visionLabel}
              </p>
              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                {c.visionTitle}
              </h2>
            </m.div>

            <div className="space-y-8">
              {c.visionParagraphs.map((p, i) => (
                <m.p
                  key={i}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  className="max-w-2xl text-lg leading-[1.85] text-neutral-400 md:text-xl">
                  {p}
                </m.p>
              ))}
            </div>
          </div>
        </section>

        {/* thin divider */}
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ═══════════════════════════════════════════
            8. THE EDITORIAL — founder, signature-led
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden px-6 py-40 md:px-8 md:py-64">
          <div className="mx-auto max-w-7xl">
            {/* Background Narrative Anchor */}
            <div className="pointer-events-none absolute left-0 top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent" />

            <div className="flex flex-col gap-24 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-x-16">
              
              {/* Text Column — Unified editorial center */}
              <div className="space-y-20 lg:col-start-1 lg:row-start-1">
                {/* 1. The Hook — Quote */}
                <div className="space-y-10">
                <m.div {...reveal} className="inline-block border-l border-emerald-500/30 pl-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/60">
                    {c.founderLabel}
                  </p>
                </m.div>

                <m.blockquote
                  {...revealSlow}
                  className="relative">
                  <p className="text-3xl font-black leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl">
                    &ldquo;{c.founderQuote}&rdquo;
                  </p>
                </m.blockquote>
                </div>

                {/* 2. The Depth — Narrative Text */}
                <div className="max-w-xl space-y-8 pb-12 lg:pb-0">
                {c.founderParagraphs.map((p, i) => (
                  <m.p
                    key={i}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: 0.2 + i * 0.1 }}
                    className="text-lg leading-[1.8] text-neutral-400 md:text-xl">
                    {p}
                  </m.p>
                ))}
              </div>
              </div>

              {/* 3. The Anchor — Portrait (Stacked after text on mobile, dominant right on desktop) */}
              <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-40">
                <m.div
                  {...revealSlow}
                  className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
                  {/* Portrait Box — Integrated page anchor, no "card" borders */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-neutral-900 group">
                    <Image
                      src="/images/founder.jpg"
                      alt={c.founderName}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 35vw"
                      priority
                    />
                    {/* Soft depth integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Signature Area — Editorial caption style */}
                  <m.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-12 lg:mt-14">
                    <h3 className="text-4xl font-black tracking-tighter text-white md:text-5xl lg:text-6xl">
                      {c.founderName}
                    </h3>
                    <div className="mt-5 flex items-center gap-4">
                      <div className="h-px w-10 bg-emerald-500/40" />
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500">
                        {c.founderRole}
                      </p>
                    </div>
                  </m.div>

                  {/* Visual anchor line — Desktop compositional bridge */}
                  <div className="hidden lg:block mt-24 h-24 w-px bg-gradient-to-b from-emerald-500/10 to-transparent ml-8" />
                </m.div>
              </div>

            </div>
          </div>
        </section>

        {/* thin divider */}
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ═══════════════════════════════════════════
            9. CTA — soft, confident, minimal
        ═══════════════════════════════════════════ */}
        <section className="px-6 py-32 md:px-8 md:py-44">
          <m.div
            {...revealSlow}
            className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              {c.ctaTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              {c.ctaSub}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={{
                  pathname: "/contact",
                  query: { intent: "radar_diagnostic", cta: "about_cta" },
                }}
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-emerald-50">
                {c.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-3 rounded-full border border-white/12 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-neutral-300 transition-all hover:bg-white/5 hover:text-white">
                {c.ctaSecondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
              {c.ctaNote}
            </p>
          </m.div>
        </section>

        {/* Bottom breathing space */}
        <div className="h-16" />
      </main>
    </LazyMotion>
  );
}
