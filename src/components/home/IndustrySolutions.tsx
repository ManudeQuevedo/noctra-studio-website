"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Rocket,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

type TabData = {
  id: string;
  icon: React.FC<any>;
  title: string;
  hook: string;
  painPoint: string;
  solution: string;
  visualType: "mobile" | "desktop" | "portal";
};

const tabs: TabData[] = [
  {
    id: "profesionistas",
    icon: Stethoscope,
    title: "Profesionistas",
    hook: "Tu consultorio/despacho, en piloto automático.",
    painPoint: "Citas perdidas, facturación manual y caos en WhatsApp.",
    solution:
      "Agenda inteligente, recordatorios automáticos y expedientes digitales en una sola app.",
    visualType: "mobile",
  },
  {
    id: "pymes",
    icon: Rocket,
    title: "PyMEs & Startups",
    hook: "El Sistema Operativo para escalar sin romperte.",
    painPoint: "Datos fragmentados en 5 herramientas y ceguera financiera.",
    solution:
      "Profitability AI, Flujos de Venta unificados y Control de Proyectos.",
    visualType: "desktop",
  },
  {
    id: "educativas",
    icon: GraduationCap,
    title: "Instituciones Educativas",
    hook: "Moderniza la experiencia estudiantil.",
    painPoint: "Inscripciones en papel, filas en caja y sistemas lentos.",
    solution:
      "CRM de Admisiones, Portal de Alumnos y Pagos en línea centralizados.",
    visualType: "portal",
  },
];

export function IndustrySolutions() {
  const [activeTab, setActiveTab] = useState<string>("profesionistas");

  const activeData = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#10b981] font-bold mb-4">
            A tu Medida
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Construido para tu Nicho
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            Sistemas operativos digitales adaptados a la escala de tus
            operaciones, desde consultorios médicos hasta campus universitarios.
          </p>
        </div>

        {/* Tab Navigation (Horizontal Scrollable on Mobile) */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 hide-scrollbar justify-start md:justify-center gap-2 md:gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-6 py-4 rounded-full font-bold text-sm md:text-base whitespace-nowrap transition-colors border ${
                  isActive
                    ? "text-emerald-500 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "text-neutral-400 border-white/5 bg-[#0A0A0A] hover:text-white hover:bg-white/5"
                }`}>
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-emerald-500" : "text-neutral-500"}`}
                />
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 md:p-12 min-h-[550px] flex items-center shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid lg:grid-cols-2 gap-12 w-full h-full items-center relative z-10">
              {/* Copy Side */}
              <div className="flex flex-col gap-8 order-2 lg:order-1 pt-8 lg:pt-0">
                <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                  {activeData.hook}
                </h3>

                <div className="space-y-6">
                  {/* Pain Point */}
                  <div className="flex gap-4 p-5 rounded-2xl bg-red-500/5 border border-red-500/10 hover:border-red-500/20 transition-colors">
                    <div className="w-1.5 rounded-full bg-red-500/50 shrink-0" />
                    <div>
                      <h4 className="text-red-400 font-bold mb-1 text-sm uppercase tracking-widest">
                        El Problema
                      </h4>
                      <p className="text-neutral-300 font-medium">
                        {activeData.painPoint}
                      </p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors shadow-inner">
                    <div className="w-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    <div>
                      <h4 className="text-emerald-400 font-bold mb-1 text-sm uppercase tracking-widest">
                        La Solución
                      </h4>
                      <p className="text-white font-medium text-lg">
                        {activeData.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex">
                  <Link
                    href="/services"
                    className="flex items-center gap-3 font-semibold text-emerald-500 hover:text-emerald-400 transition-colors group">
                    Ver más detalles
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Visual Side */}
              <div className="order-1 lg:order-2 flex justify-center items-center relative w-full h-[300px] sm:h-[400px] lg:h-full">
                {/* Glow Behind Mockup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

                {/* Dynamically Rendering the Visual */}
                <VisualMockup type={activeData.visualType} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function VisualMockup({ type }: { type: string }) {
  if (type === "mobile") {
    return (
      <div className="relative w-[280px] h-[550px] bg-black border-[12px] border-[#1C1C1E] rounded-[45px] overflow-hidden shadow-2xl flex flex-col scale-75 sm:scale-90 lg:scale-100 origin-bottom lg:origin-center">
        {/* Dynamic Island Placeholder */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

        {/* App UI */}
        <div className="flex-1 bg-neutral-950 p-6 pt-12 flex flex-col gap-6 relative">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-neutral-400">Próxima cita</p>
              <h4 className="text-lg font-bold text-white">10:30 AM</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10" />
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Recordatorio automático SMS
            </span>
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">Carlos R. (Dental)</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          <div className="flex-1 rounded-t-3xl border border-white/5 bg-[#0a0a0a] -mx-6 mb-[-24px] p-6 flex flex-col gap-4">
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto" />
            <h4 className="font-bold text-white mb-2">Agenda de hoy</h4>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-white/5 w-full flex items-center px-4 gap-4 animate-pulse">
                <div className="w-2 h-full rounded-full bg-emerald-500/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                  <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "desktop") {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-emerald-500/10">
        <Image
          src="/images/forge-dashboard-animated.webp"
          alt="Dashboard"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>
    );
  }

  if (type === "portal") {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col overflow-hidden">
        {/* Browser Top Bar */}
        <div className="h-10 bg-[#151515] border-b border-white/5 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 bg-black rounded-md h-6 mx-4 opacity-50 flex items-center px-3">
            <span className="text-[10px] text-neutral-500 font-mono">
              portal.universidad.edu.mx
            </span>
          </div>
        </div>

        {/* Portal UI */}
        <div className="flex-1 flex">
          {/* Sidebar */}
          <div className="w-1/4 border-r border-white/5 p-4 flex flex-col gap-4">
            <div className="w-8 h-8 rounded bg-emerald-500/20 mb-4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-white/5 rounded w-full" />
            ))}
          </div>
          {/* Main Content */}
          <div className="flex-1 p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-white">Hola, Fernando</h4>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                Matrícula Activa
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                <span className="text-xs text-neutral-400">Pago Semestral</span>
                <span className="font-bold text-emerald-400 text-lg">
                  Pagado
                </span>
              </div>
              <div className="h-24 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                <span className="text-xs text-neutral-400">
                  Materias Activas
                </span>
                <span className="font-bold text-white text-lg">
                  6 Asignaturas
                </span>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
              <span className="text-sm font-bold text-neutral-300">
                Horario Semanal
              </span>
              <div className="flex-1 bg-[#0a0a0a] rounded flex items-center justify-center border border-white/5">
                <span className="text-xs text-neutral-500">
                  Grid de Horario Interactivo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
