"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Sparkles,
  FileText,
  BarChart2,
  FolderOpen,
  Users,
  Search,
  Globe,
  Shield,
  Smartphone,
  Plus,
  Minus,
  UserPlus,
  Menu,
  X,
  Clock,
  Brain,
  Layers,
  SearchCode,
} from "lucide-react";
import { ForgePricing } from "./ForgePricing";
import { ForgeNavbar } from "./ForgeNavbar";
import { ForgeFooter } from "./ForgeFooter";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// --- DYNAMIC ICON HELPER ---
const DynamicIcon = ({
  name,
  size = 18,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) => {
  const icons: Record<string, any> = {
    Sparkles,
    FileText,
    BarChart2,
    FolderOpen,
    Users,
    Search,
    Globe,
    Shield,
    Smartphone,
    UserPlus,
    Clock,
    Brain,
    Layers,
    SearchCode,
  };
  const Icon = icons[name] || Sparkles;
  return <Icon size={size} className={className} strokeWidth={1.5} />;
};

// --- FAQ COMPONENT ---
const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group">
        <span className="text-lg font-medium text-white group-hover:text-white/80 transition-colors">
          {question}
        </span>
        {isOpen ? (
          <Minus size={18} className="text-white/40" strokeWidth={1.5} />
        ) : (
          <Plus size={18} className="text-white/40" strokeWidth={1.5} />
        )}
      </button>
      {isOpen && (
        <p className="mt-4 text-neutral-400 text-sm leading-relaxed max-w-2xl">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function ForgeLanding() {
  const painPoints = [
    {
      icon: "FileText",
      pain: "Propuestas en Word que se pierden en el email",
      fix: "Crea y envía propuestas profesionales en minutos",
    },
    {
      icon: "SearchCode",
      pain: "No sabes en qué etapa está cada cliente",
      fix: "Pipeline visual con el estado de cada oportunidad",
    },
    {
      icon: "Clock",
      pain: "Horas perdidas actualizando clientes manualmente",
      fix: "Portal del cliente con actualizaciones en tiempo real",
    },
    {
      icon: "Layers",
      pain: "4 herramientas distintas para lo que debería ser 1",
      fix: "Todo en un solo lugar — desde el lead hasta el cierre",
    },
    {
      icon: "Brain",
      pain: "Se te olvidan los follow-ups y pierdes oportunidades",
      fix: "Noctra AI te recuerda cuándo actuar y qué hacer",
    },
    {
      icon: "BarChart2",
      pain: "No tienes visibilidad real de tus ingresos futuros",
      fix: "Forecast de ingresos calculado automáticamente",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Captura el lead",
      desc: "Agrega contactos manualmente o conecta tu formulario web. Noctra AI te alerta cuando un lead lleva más de 48h sin contacto.",
      icon: "UserPlus",
    },
    {
      step: "02",
      title: "Envía la propuesta",
      desc: "Crea propuestas profesionales en minutos con el Proposal Builder. El cliente la recibe con tu branding y puede aprobarla en línea.",
      icon: "FileText",
    },
    {
      step: "03",
      title: "Gestiona el proyecto",
      desc: "Una vez cerrado el trato, el proyecto queda vinculado al cliente con fechas, entregables y seguimiento de estatus en tiempo real.",
      icon: "FolderOpen",
    },
    {
      step: "04",
      title: "Mide y crece",
      desc: "El dashboard te muestra métricas reales: tasa de cierre, forecast de ingresos, proyectos activos y oportunidades en pipeline.",
      icon: "BarChart2",
    },
  ];

  const features = [
    {
      icon: "Sparkles",
      title: "Noctra AI",
      desc: "Insights automáticos, follow-ups sugeridos y alertas inteligentes basadas en el estado real de tu negocio.",
    },
    {
      icon: "FileText",
      title: "Proposal Builder",
      desc: "Crea propuestas con tu branding en minutos. El cliente las aprueba en línea con un solo click.",
    },
    {
      icon: "BarChart2",
      title: "Pipeline Visual",
      desc: "Visualiza cada oportunidad por etapa. Forecast de ingresos calculado automáticamente.",
    },
    {
      icon: "FolderOpen",
      title: "Gestión de Proyectos",
      desc: "Cada proyecto vinculado a su cliente, propuesta y entregables. Sin nada perdido.",
    },
    {
      icon: "Users",
      title: "CRM de Clientes",
      desc: "Historial completo de cada cliente — comunicaciones, proyectos, propuestas y pagos.",
    },
    {
      icon: "Search",
      title: "Búsqueda Global",
      desc: "Encuentra cualquier cliente, propuesta o proyecto en segundos con ⌘K.",
    },
    {
      icon: "Globe",
      title: "Bilingüe ES/EN",
      desc: "Interfaz completa en español e inglés. Cambia de idioma instantáneamente.",
    },
    {
      icon: "Shield",
      title: "Seguridad 2FA",
      desc: "Autenticación de dos factores para proteger la información de tus clientes.",
    },
    {
      icon: "Smartphone",
      title: "Mobile Nativo",
      desc: "Experiencia de app nativa en mobile con navegación bottom tab y gestos.",
    },
  ];

  const faqs = [
    {
      q: "¿Necesito tarjeta de crédito para el trial?",
      a: "No. El trial de 14 días es completamente gratis y no requiere datos de pago. Solo necesitas un email.",
    },
    {
      q: "¿Qué pasa cuando termina el trial?",
      a: "Te mostramos las opciones de plan. Todo tu contenido se mantiene intacto — clientes, propuestas y proyectos siguen disponibles al suscribirte.",
    },
    {
      q: "¿Puedo cancelar en cualquier momento?",
      a: "Sí. En el plan mensual puedes cancelar cuando quieras. En el plan anual, el acceso se mantiene hasta el final del período pagado.",
    },
    {
      q: "¿Es solo para agencias de diseño y desarrollo?",
      a: "Noctra Forge está optimizado para agencias creativas y digitales, pero cualquier negocio que gestione proyectos y clientes puede usarlo.",
    },
    {
      q: "¿Mis datos están seguros?",
      a: "Sí. Todos los datos se almacenan en Supabase con Row Level Security — solo tú tienes acceso a tu información.",
    },
    {
      q: "¿Tiene app móvil?",
      a: "Noctra Forge es una Progressive Web App con experiencia nativa en mobile. Puedes agregarla a tu pantalla de inicio desde el navegador.",
    },
  ];

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-[var-verde] selection:text-black">
      {/* --- NAVBAR --- */}
      <ForgeNavbar />

      {/* --- SECTION 1: HERO --- */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-36 md:pt-32">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="flex items-center gap-2 border border-[#10b981]/30 bg-[#10b981]/5 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
          <span className="text-[#10b981] text-xs uppercase tracking-widest font-medium">
            14 días gratis · Sin tarjeta de crédito
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter max-w-5xl mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Del primer contacto
          <br className="hidden md:block" /> al proyecto entregado.
          <br />
          <span className="text-[#10b981]">En una sola herramienta.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10 text-balance animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          Noctra Forge es el CRM diseñado para agencias digitales. Gestiona
          clientes, propuestas, proyectos y tu pipeline con inteligencia
          artificial integrada.
        </p>
        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center w-full">
            {/* Beta Coming Soon - Temporarily Disabled */}
            <button
              disabled
              className="flex items-center justify-center gap-2 bg-white/10 text-white/40 font-bold rounded-full h-12 px-8 text-base cursor-not-allowed border border-white/10 w-full sm:w-auto">
              Beta Próximamente <ArrowRight size={18} />
            </button>
            {/* Original Link: /forge/login */}
            <a
              href="#demo"
              className="flex items-center justify-center gap-2 rounded-full h-12 px-8 text-base border border-neutral-800 text-neutral-400 hover:text-white hover:border-white hover:bg-transparent transition-all duration-300 font-bold w-full sm:w-auto">
              Ver demo <ChevronDown size={16} />
            </a>
          </div>

          {/* Trust Indicators Inline */}
          <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-neutral-400 font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#10b981]" /> Sin tarjeta de
              crédito
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#10b981]" /> Cancela cuando
              quieras
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#10b981]" /> Soporte incluido
            </span>
          </div>
        </div>

        <div className="mt-16 text-center animate-in fade-in duration-1000 delay-700">
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
            ✨ Construido por una agencia, para agencias
          </p>
          <p className="text-[10px] text-neutral-500 mt-2 max-w-sm mx-auto">
            El sistema interno que usamos en Noctra Studio, ahora disponible
            para la comunidad.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: PAIN POINTS --- */}
      <section className="py-20 md:py-28 px-6 border-t border-white/5 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#10b981] text-center mb-4 font-bold">
            ¿Te suena familiar?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-16">
            Las agencias pierden miles de dólares por mala organización.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {painPoints.map((item) => (
              <div
                key={item.pain}
                className="border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group bg-white/[0.01]">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
                  <DynamicIcon
                    name={item.icon}
                    size={20}
                    className="text-neutral-500 group-hover:text-emerald-500 transition-colors"
                  />
                </div>
                <p className="text-sm text-neutral-400 line-through mb-1 group-hover:text-neutral-500 transition-colors">
                  {item.pain}
                </p>
                <p className="text-sm text-neutral-300 font-medium">
                  ✓ {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: DEMO VISUAL --- */}
      <section
        id="demo"
        className="py-20 md:py-28 px-6 border-t border-white/5 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#10b981] font-bold text-center mb-4">
            El producto
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-16">
            Todo fluye mejor aquí adentro.
          </h2>
          <p className="text-neutral-400 text-center text-sm mb-12 max-w-lg mx-auto">
            Una interfaz minimalista que te da toda la información que
            necesitas, sin el ruido que no necesitas.
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-[#0a0a0a]">
            {/* Fake Browser Bar */}
            <div className="bg-[#0a0a0a] border-b border-white/5 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 bg-white/5 rounded px-3 py-1 text-[10px] text-white/20 text-center mx-8 font-mono">
                noctra.studio/forge
              </div>
            </div>
            {/* Screenshot */}
            <Image
              src="/images/forge-dashboard-screenshot.png"
              alt="Noctra Forge Dashboard"
              width={1200}
              height={700}
              className="w-full object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>
      </section>

      {/* --- SECTION 4: HOW IT WORKS --- */}
      <section className="py-20 md:py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#10b981] font-bold text-center mb-4">
            Flujo de trabajo
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-16 text-balance">
            De lead a proyecto entregado en 4 pasos.
          </h2>
          <div className="relative space-y-0 before:absolute before:inset-0 before:ml-[31px] md:before:ml-[39px] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#10b981]/50 before:via-white/10 before:to-transparent">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="relative flex gap-8 md:gap-12 items-start py-10 group">
                {/* Visual Step Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center gap-1.5 group-hover:border-[#10b981]/50 group-hover:bg-[#10b981]/5 transition-colors">
                    <span className="text-[10px] font-bold bg-[#10b981] text-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {item.step}
                    </span>
                    <DynamicIcon
                      name={item.icon}
                      size={20}
                      className="text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed mt-1 text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FEATURES --- */}
      <section className="py-20 md:py-28 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#10b981] font-bold text-center mb-4">
            Todo incluido
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-16">
            Todas las herramientas que necesitas.
            <br className="hidden md:block" /> Ninguna que no.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const isHeroFeature = feature.title === "Noctra AI";

              return (
                <div
                  key={feature.title}
                  className={cn(
                    "border border-white/5 rounded-2xl p-8 transition-all cursor-default group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(16,185,129,0.05)] relative overflow-hidden",
                    isHeroFeature
                      ? "lg:col-span-2 bg-gradient-to-br from-[#10b981]/10 via-[#10b981]/[0.02] to-transparent hover:border-[#10b981]/30"
                      : "bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#10b981]/20",
                  )}>
                  {/* Inner Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors relative z-10",
                      isHeroFeature
                        ? "bg-[#10b981]/20 text-[#10b981]"
                        : "bg-white/5 group-hover:bg-[#10b981]/10",
                    )}>
                    <DynamicIcon
                      name={feature.icon}
                      size={24}
                      className={cn(
                        "transition-colors",
                        isHeroFeature
                          ? "text-[#10b981]"
                          : "text-white/60 group-hover:text-[#10b981]",
                      )}
                    />
                  </div>
                  <h3
                    className={cn(
                      "font-bold text-white mb-3 relative z-10",
                      isHeroFeature ? "text-2xl" : "text-lg",
                    )}>
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "leading-relaxed relative z-10",
                      isHeroFeature
                        ? "text-neutral-300 text-base md:text-lg max-w-md"
                        : "text-neutral-400 text-sm md:text-base",
                    )}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: PRICING --- */}
      <ForgePricing />

      {/* --- SECTION 7: FAQ --- */}
      <section className="py-20 md:py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#10b981] font-bold text-center mb-4">
            Dudas comunes
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-16">
            Preguntas frecuentes.
          </h2>
          <div className="border-t border-white/5">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 8: CTA FINAL --- */}
      <section className="py-28 md:py-40 px-6 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            El sistema operativo <br />
            para tu agencia.
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed">
            Organiza tu pipeline. Entrega proyectos a tiempo. Escala tu
            operación hoy.
          </p>
          {/* Beta Coming Soon - Temporarily Disabled */}
          <button
            disabled
            className="flex items-center justify-center gap-2 bg-white/10 text-white/40 font-bold h-12 rounded-full px-10 text-base cursor-not-allowed border border-white/10">
            Beta Próximamente <ArrowRight size={18} />
          </button>
          {/* Original Link: /forge/login */}
          <p className="text-xs text-neutral-500 mt-6 tracking-wide">
            14 días gratis. Sin tarjeta. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <ForgeFooter />
    </div>
  );
}
