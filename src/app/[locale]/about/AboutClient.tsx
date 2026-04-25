"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";

/* ─────────────────────── types ─────────────────────── */

type AboutCopy = {
  /* 1. HERO */
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubLine1: string;
  heroSubLine2: string;

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
  ctaNote: string;
};

/* ─────────────────────── ES copy ─────────────────────── */

const ES: AboutCopy = {
  /* 1 */
  heroBadge: "NOCTRA STUDIO",
  heroTitleLine1: "No construimos piezas digitales.",
  heroTitleLine2: "Construimos claridad comercial.",
  heroSubLine1: "Noctra existe porque muchas empresas crecieron digitalmente en piezas sueltas: web, contenido, SEO, automatización.",
  heroSubLine2: "Nosotros elegimos conectar esas piezas bajo una lógica que se entiende, se mide y mejora.",

  /* 3 */
  originLabel: "POR QUÉ EXISTE NOCTRA",
  originTitle: "Vimos mucho esfuerzo digital. Y poca estructura.",
  originParagraphs: [
    "Muchas empresas invierten en marca, web, contenido, SEO y herramientas, pero cada pieza vive por separado. El resultado es una presencia digital que existe, pero no siempre explica, convierte o se sostiene.",
    "Noctra nació de esa observación: el problema no era hacer más cosas, sino construirlas bajo la misma lógica. Un sistema, no un catálogo.",
  ],

  /* 4 */
  shiftLabel: "EL CAMBIO",
  shiftTitle: "De piezas sueltas a sistema conectado.",
  shiftFromLabel: "EL MODELO VIEJO",
  shiftFromPoints: [
    "Logo aislado",
    "Web sin conversión",
    "SEO al final",
    "Lanzar y olvidar",
    "Resultados por suerte",
  ],
  shiftToLabel: "EL MODELO NOCTRA",
  shiftToPoints: [
    "Identidad conectada",
    "Web que convierte",
    "SEO desde origen",
    "Optimización continua",
    "Resultados medibles",
  ],
  shiftNote:
    "No es un tema de hacer más. Es un tema de hacer que todo funcione junto.",

  /* 5 */
  thinkingLabel: "CÓMO PENSAMOS",
  thinkingTitle: "Tres ideas que guían cada decisión.",
  thinkingPillars: [
    {
      title: "Claridad",
      text: "Si no se entiende rápido, no funciona.",
    },
    {
      title: "Estructura",
      text: "La estrategia ordena antes de escalar.",
    },
    {
      title: "Continuidad",
      text: "Lo que no se mide, se degrada.",
    },
  ],

  /* 6 */
  modelLabel: "EL MODELO",
  modelTitle: "Estudio + Producto. Dos capas, un sistema.",
  modelSub:
    "Combinamos implementación estratégica con productos propios para que lo construido no se quede estático después del lanzamiento.",
  studioTitle: "Noctra Studio",
  studioText:
    "Construimos identidad, web y visibilidad bajo una sola lógica.",
  studioPoints: [
    "Branding estratégico",
    "Websites de alto rendimiento",
    "SEO técnico y estructural",
  ],
  productsTitle: "Noctra Products",
  productsText:
    "Creamos herramientas que diagnostican, monitorean y extienden el sistema.",
  productsPoints: [
    "Radar: diagnóstico continuo",
    "Social: contenido con IA",
    "Forge: operación conectada",
  ],

  /* 7 */
  visionLabel: "HACIA DÓNDE VAMOS",
  visionTitle: "Más productos significa más continuidad para tu negocio.",
  visionParagraphs: [
    "Cada producto que construimos busca resolver una parte concreta del mismo problema: que tu presencia digital no dependa de impulsos aislados, proveedores desconectados o revisiones esporádicas.",
    "Para una PYME o profesionista, eso significa tener más claridad sobre qué mejorar, cuándo actuar y cómo sostener el crecimiento sin volver a empezar cada vez.",
    "No estamos creando herramientas por acumulación. Estamos construyendo una forma más ordenada de operar tu presencia digital con el tiempo.",
  ],

  /* 8 */
  founderLabel: "UNA NOTA PERSONAL",
  founderName: "Manuel de Quevedo",
  founderRole: "Fundador, Noctra Studio",
  founderQuote:
    "Noctra no nació de querer hacer una agencia mejor. Nació de la frustración de ver que el modelo actual no funcionaba.",
  founderParagraphs: [
    "Después de ver proyectos entregados y olvidados, resultados que se degradaban y esfuerzos que nunca se conectaban, decidí construir algo que funcionara como sistema: una forma de hacer que cada pieza refuerce a la otra y mejore con el tiempo.",
    "Esa es la promesa. No ser la agencia más creativa. Ser el sistema más claro.",
  ],

  /* 9 */
  ctaTitle: "Entender dónde estás parado.",
  ctaSub:
    "El siguiente paso es ver qué tan clara, conectada y medible es tu presencia digital hoy.",
  ctaPrimary: "Diagnosticar mi presencia →",
  ctaNote: "Trabajamos con pocos proyectos a la vez para cuidar foco y ejecución.",
};

/* ─────────────────────── EN copy ─────────────────────── */

const EN: AboutCopy = {
  /* 1 */
  heroBadge: "NOCTRA STUDIO",
  heroTitleLine1: "We don't build digital pieces.",
  heroTitleLine2: "We build commercial clarity.",
  heroSubLine1: "Noctra exists because many businesses grew digitally through loose pieces: web, content, SEO, automation.",
  heroSubLine2: "We chose to connect those pieces under a logic that can be understood, measured, and improved.",

  /* 3 */
  originLabel: "WHY NOCTRA EXISTS",
  originTitle: "We saw a lot of digital effort. And little structure.",
  originParagraphs: [
    "Many businesses invest in brand, web, content, SEO, and tools, but each piece lives separately. The result is a digital presence that exists, but does not always explain, convert, or sustain itself.",
    "Noctra was born from that observation: the problem was not doing more things, but building them under the same logic. A system, not a catalog.",
  ],

  /* 4 */
  shiftLabel: "THE SHIFT",
  shiftTitle: "From loose pieces to connected system.",
  shiftFromLabel: "THE OLD MODEL",
  shiftFromPoints: [
    "Isolated logo",
    "Website without conversion",
    "SEO at the end",
    "Launch and forget",
    "Results by luck",
  ],
  shiftToLabel: "THE NOCTRA MODEL",
  shiftToPoints: [
    "Connected identity",
    "Website that converts",
    "SEO from origin",
    "Continuous optimization",
    "Measurable results",
  ],
  shiftNote:
    "It is not about doing more. It is about making everything work together.",

  /* 5 */
  thinkingLabel: "HOW WE THINK",
  thinkingTitle: "Three ideas that guide every decision.",
  thinkingPillars: [
    {
      title: "Clarity",
      text: "If it is not understood quickly, it does not work.",
    },
    {
      title: "Structure",
      text: "Strategy brings order before scale.",
    },
    {
      title: "Continuity",
      text: "What is not measured degrades.",
    },
  ],

  /* 6 */
  modelLabel: "THE MODEL",
  modelTitle: "Studio + Product. Two layers, one system.",
  modelSub:
    "We combine strategic implementation with proprietary products so what we build does not stay static after launch.",
  studioTitle: "Noctra Studio",
  studioText:
    "We build identity, web, and visibility under one logic.",
  studioPoints: [
    "Strategic branding",
    "High-performance websites",
    "Technical & structural SEO",
  ],
  productsTitle: "Noctra Products",
  productsText:
    "We create tools that diagnose, monitor, and extend the system.",
  productsPoints: [
    "Radar: continuous diagnosis",
    "Social: AI-powered content",
    "Forge: connected operations",
  ],

  /* 7 */
  visionLabel: "WHERE WE ARE GOING",
  visionTitle: "More products means more continuity for your business.",
  visionParagraphs: [
    "Every product we build solves a concrete part of the same problem: making sure your digital presence does not depend on isolated impulses, disconnected providers, or occasional reviews.",
    "For a small business or professional, that means more clarity about what to improve, when to act, and how to sustain growth without starting over every time.",
    "We are not creating tools for accumulation. We are building a more orderly way to operate your digital presence over time.",
  ],

  /* 8 */
  founderLabel: "A PERSONAL NOTE",
  founderName: "Manuel de Quevedo",
  founderRole: "Founder, Noctra Studio",
  founderQuote:
    "Noctra was not born from wanting to build a better agency. It was born from the frustration of seeing the current model not working.",
  founderParagraphs: [
    "After seeing projects delivered and forgotten, results degrading, and efforts that never connected, I decided to build something that worked as a system: a way to make every piece reinforce the other and improve over time.",
    "That is the promise. Not to be the most creative agency. To be the clearest system.",
  ],

  /* 9 */
  ctaTitle: "Understand where you stand.",
  ctaSub:
    "The next step is seeing how clear, connected, and measurable your digital presence is today.",
  ctaPrimary: "Diagnose my presence →",
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

            <div className="mt-12 flex items-center justify-center">
              <Link
                href={{
                  pathname: "/contact",
                  query: { intent: "radar_diagnostic", cta: "about_cta" },
                }}
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-emerald-50">
                {c.ctaPrimary}
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
