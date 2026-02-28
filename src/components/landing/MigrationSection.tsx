"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Cloud,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Settings2,
  Rocket,
  AlertCircle,
  Database,
  Timer,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ── Types ───────────────────────────────────────── */
interface CRMPlatform {
  name: string;
  logoUrl?: string;
  brandColor: string;
  tier: 1 | 2;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

/* ── Data ────────────────────────────────────────── */
const platforms: CRMPlatform[] = [
  // Tier 1
  {
    name: "HubSpot",
    logoUrl: "/crm-tools/hubspot.svg",
    brandColor: "#FF7A59",
    tier: 1,
  },
  {
    name: "Zoho CRM",
    logoUrl: "/crm-tools/zoho.png",
    brandColor: "#E0212E",
    tier: 1,
  },
  {
    name: "Pipedrive",
    logoUrl: "/crm-tools/pipedrive.png",
    brandColor: "#173042",
    tier: 1,
  },
  {
    name: "Odoo",
    logoUrl: "/crm-tools/odoo.png",
    brandColor: "#A24689",
    tier: 1,
  },
  {
    name: "Salesforce",
    logoUrl: "/crm-tools/salesforce.svg",
    brandColor: "#00A1E0",
    tier: 1,
  },
  {
    name: "Freshsales",
    logoUrl: "/crm-tools/freshsales.png",
    brandColor: "#0088F5",
    tier: 1,
  },
  {
    name: "Bitrix24",
    logoUrl: "/crm-tools/bitrix.png",
    brandColor: "#2FC6F6",
    tier: 1,
  },
  // Tier 2
  {
    name: "Monday.com",
    logoUrl: "/crm-tools/monday.png",
    brandColor: "#FF3D57",
    tier: 2,
  },
  {
    name: "Notion",
    logoUrl: "/crm-tools/notion.png",
    brandColor: "#000000",
    tier: 2,
  },
  {
    name: "Airtable",
    logoUrl: "/crm-tools/airtable.svg",
    brandColor: "#18BFFF",
    tier: 2,
  },
  {
    name: "Excel / Google Sheets",
    logoUrl: "/crm-tools/csv-excel.svg",
    brandColor: "#1D6F42",
    tier: 2,
  },
];

const steps: Step[] = [
  {
    number: 1,
    title: "Elige tu CRM actual",
    description:
      "Selecciona desde dónde vienes. Soportamos conexión directa con los CRMs más populares o importación vía archivo.",
    icon: <Database className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "Nosotros mapeamos todo",
    description:
      "Noctra CRM detecta automáticamente tus campos y los mapea al formato correcto. Tú solo revisas y confirmas.",
    icon: <Settings2 className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "Listo para usar",
    description:
      "Tus contactos, empresas y oportunidades aparecen en Noctra CRM sin perder ningún dato. Recibe un reporte completo.",
    icon: <Rocket className="w-6 h-6" />,
  },
];

const stats: Stat[] = [
  {
    label: "CRMs soportados",
    value: "+15 plataformas",
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    label: "Tiempo promedio",
    value: "< 30 minutos",
    icon: <Timer className="w-5 h-5" />,
  },
  {
    label: "Tasa de éxito",
    value: "99.8% de registros",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

/* ── Animations ──────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/* ── Components ──────────────────────────────────── */

export function MigrationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="migracion"
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden"
      ref={containerRef}>
      {/* Background decoration - Using Emerald for Forge alignment, Violet for main site */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Encabezado */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 mb-6 tracking-wide">
            <Zap size={14} className="fill-current" />
            Migración sin complicaciones
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter">
            Trae todos tus datos a Noctra CRM <br className="hidden md:block" />
            en menos de 30 minutos
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            Sin perder un solo contacto. Sin contratar a un técnico.{" "}
            <br className="hidden md:block" />
            Sin hojas de cálculo confusas. Solo sigue el asistente paso a paso.
          </p>
        </motion.div>

        {/* Bloque visual central — Logos */}
        <div className="mb-24">
          <motion.div
            className="flex flex-col items-center mb-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-10">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg">
                <Zap size={12} className="text-emerald-500 fill-current" />{" "}
                Conexión directa
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg">
                <Cloud size={12} className="text-blue-500" /> Importar archivo
              </span>
            </div>
          </motion.div>

          {/* Desktop Grid */}
          <motion.div
            className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}>
            {platforms.map((platform) => (
              <motion.div
                key={platform.name}
                variants={fadeInUp}
                className="group relative flex flex-col items-center justify-center p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
                  {platform.logoUrl ? (
                    <Image
                      src={platform.logoUrl}
                      alt={`Logo de ${platform.name}`}
                      width={48}
                      height={48}
                      className="object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl transition-all duration-300 shadow-lg bg-[#c6c6c6] group-hover:bg-[var(--brand-color)]"
                      style={
                        {
                          "--brand-color": platform.brandColor,
                        } as React.CSSProperties
                      }>
                      {platform.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                  {platform.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            <motion.div
              className="flex gap-4 w-max"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}>
              {platforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  variants={fadeInUp}
                  className="group flex flex-col items-center justify-center w-32 h-32 bg-white/[0.01] border border-white/5 rounded-2xl active:bg-white/[0.03]">
                  {platform.logoUrl ? (
                    <Image
                      src={platform.logoUrl}
                      alt={`Logo de ${platform.name}`}
                      width={40}
                      height={40}
                      className="object-contain mb-3 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3"
                      style={{ backgroundColor: "#c6c6c6" }}>
                      {platform.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {platform.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bloque de pasos — Cómo funciona */}
        <div className="mb-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}>
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-white/5 z-0" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
                variants={fadeInUp}>
                <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 shadow-2xl group-hover:border-emerald-500/50 transition-all duration-500 group-hover:bg-emerald-500/5">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-sm border-4 border-[#050505]">
                    {step.number}
                  </div>
                  <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bloque de confianza — Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}>
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex items-center gap-4 p-5 bg-white/[0.01] border border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                {stat.icon}
              </div>
              <div>
                <div className="text-lg font-bold text-white leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA principal */}
        <motion.div
          className="flex flex-col items-center gap-8 mb-24"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
            <Link
              href="/signup?ref=migration"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/10 active:scale-[0.98] flex items-center justify-center gap-2 group">
              Migra gratis ahora
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/docs/migracion"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-neutral-400 hover:text-white font-bold transition-all py-4 px-6 border border-white/5 hover:border-white/10 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03]">
              <BookOpen size={18} />
              Ver documentación
            </Link>
          </div>
        </motion.div>

        {/* Bloque adicional — Tranquilidad */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}>
          <div className="relative p-8 rounded-3xl bg-emerald-500/[0.02] border border-emerald-500/10 overflow-hidden group hover:border-emerald-500/20 transition-all duration-700">
            {/* Glass effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                  ¿Tienes miedo de perder tus datos?
                </h4>
                <p className="text-neutral-400 leading-relaxed italic text-sm">
                  &ldquo;Antes de confirmar la importación, verás exactamente
                  qué se va a importar, cuántos registros, y si hay algún
                  conflicto. Siempre puedes hacer rollback en los primeros 30
                  días.&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-emerald-500/80 uppercase tracking-[0.2em]">
                  <CheckCircle2 size={12} />
                  Tu seguridad es nuestra prioridad
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
