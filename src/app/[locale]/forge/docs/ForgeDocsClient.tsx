"use client";

import { useState, useEffect, useRef } from "react";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";
import {
  Search,
  BookOpen,
  LayoutDashboard,
  Columns,
  Users,
  FileText,
  FileCheck,
  UserCheck,
  Briefcase,
  BarChart,
  Shield,
  CheckCircle2,
  Printer,
  ChevronRight,
  ArrowRight,
  History as HistoryIcon,
  Send,
} from "lucide-react";

const SECTIONS = [
  { id: "intro", title: "Introducción", icon: BookOpen },
  { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { id: "pipeline", title: "Pipeline", icon: Columns },
  { id: "leads", title: "Leads", icon: Users },
  { id: "proposals", title: "Propuestas", icon: FileText },
  { id: "contracts", title: "Contratos", icon: FileCheck },
  { id: "clients", title: "Clientes Activos", icon: UserCheck },
  { id: "projects", title: "Proyectos", icon: Briefcase },
  { id: "metrics", title: "Métricas", icon: BarChart },
  { id: "security", title: "Seguridad (2FA)", icon: Shield },
  { id: "workflow", title: "Flujo completa recomendado", icon: CheckCircle2 },
];

export default function ForgeDocsClient() {
  const [activeSection, setActiveSection] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#080808] shrink-0 print:hidden sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold tracking-tight text-white uppercase italic">
              Forge<span className="text-emerald-500">.</span>Docs
            </h1>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="relative hidden sm:block w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar en la documentación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 px-9 py-2 text-[11px] font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/30 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-300 transition-all active:scale-95">
            <Printer className="w-3.5 h-3.5" />
            Imprimir Guía
          </button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar TOC */}
          <aside className="w-[260px] border-r border-white/5 bg-[#050505] overflow-y-auto hidden lg:block p-8 space-y-8 print:hidden">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
                Contenido
              </span>
              <nav className="space-y-1">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-[11px] font-mono uppercase tracking-widest transition-all text-left group ${
                      activeSection === section.id
                        ? "text-emerald-500 bg-emerald-500/5"
                        : "text-neutral-500 hover:text-white hover:bg-white/5"
                    }`}>
                    <section.icon
                      className={`w-3.5 h-3.5 ${activeSection === section.id ? "text-emerald-500" : "text-neutral-600 group-hover:text-white"}`}
                    />
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar bg-[#050505] p-8 lg:p-16 pb-32">
            <div className="max-w-4xl mx-auto space-y-24">
              {/* 1. INTRODUCCIÓN */}
              <section id="intro" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    01. Inicio
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Introducción
                  </h2>
                </div>
                <div className="space-y-6 text-neutral-400 leading-relaxed text-sm">
                  <p>
                    Noctra Forge es el sistema operativo interno de Noctra
                    Studio. Desde aquí gestionas todo el ciclo de vida de un
                    cliente: desde que llega el primer lead hasta que el
                    proyecto es entregado.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 py-6 border-y border-white/5 bg-white/[0.01]">
                    {[
                      "Lead",
                      "Contacto",
                      "Propuesta",
                      "Contrato",
                      "Proyecto",
                      "Entrega",
                    ].map((step, i, arr) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                          {step}
                        </span>
                        {i < arr.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-neutral-700" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 2. DASHBOARD */}
              <section id="dashboard" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    02. Control
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Dashboard
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-l-2 border-emerald-500 pl-4">
                      ¿QUÉ ES?
                    </h4>
                    <p className="text-sm text-neutral-400 italic font-mono uppercase tracking-widest text-neutral-300">
                      Tu vista de control diaria. La primera pantalla que debes
                      revisar cada mañana.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-[0.2em]">
                        Qué encontrarás
                      </h4>
                      <ul className="space-y-3 text-sm text-neutral-400">
                        <li className="flex gap-3">
                          <ChevronRight className="w-3 h-3 mt-1 text-emerald-500 shrink-0" />{" "}
                          <span className="text-white font-bold">
                            Alertas del día:
                          </span>{" "}
                          leads nuevos, propuestas sin respuesta, contratos
                          pendientes.
                        </li>
                        <li className="flex gap-3">
                          <ChevronRight className="w-3 h-3 mt-1 text-emerald-500 shrink-0" />{" "}
                          <span className="text-white font-bold">
                            KPIs rápidos:
                          </span>{" "}
                          leads del mes, propuestas activas, proyectos en curso,
                          forecast.
                        </li>
                        <li className="flex gap-3">
                          <ChevronRight className="w-3 h-3 mt-1 text-emerald-500 shrink-0" />{" "}
                          <span className="text-white font-bold">
                            Actividad reciente:
                          </span>{" "}
                          línea de tiempo de todo lo que pasó.
                        </li>
                        <li className="flex gap-3">
                          <ChevronRight className="w-3 h-3 mt-1 text-emerald-500 shrink-0" />{" "}
                          <span className="text-white font-bold">
                            Próximas acciones:
                          </span>{" "}
                          qué hacer hoy y esta semana.
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-white/[0.02] border border-white/5 space-y-4">
                      <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">
                        Cómo usarlo
                      </h4>
                      <ol className="space-y-3 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                        <li className="flex gap-3 items-start">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-[10px]">
                            1
                          </span>{" "}
                          Revisa las alertas rojas primero — son urgentes
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-[10px]">
                            2
                          </span>{" "}
                          Revisa las alertas amarillas — son importantes
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-[10px]">
                            3
                          </span>{" "}
                          Ve a Próximas acciones y ejecuta las de hoy
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="border-l-4 border-emerald-500/50 bg-emerald-500/5 p-6 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">
                      Consejo:
                    </span>
                    <p className="text-sm text-neutral-200">
                      Un lead contactado en menos de 1 hora tiene 7x más
                      probabilidad de convertir. Atiende siempre primero a los
                      leads HOT sin contactar antes de las 9am.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 3. PIPELINE */}
              <section id="pipeline" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    03. Ventas
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Pipeline
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-l-2 border-emerald-500 pl-4">
                      ¿QUÉ ES?
                    </h4>
                    <p className="text-sm text-neutral-400">
                      Tu tablero Kanban de ventas. Muestra en qué etapa está
                      cada lead y cuánto vale tu pipeline total.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {[
                      "NUEVO",
                      "CONTACTADO",
                      "PROPUESTA ENVIADA",
                      "NEGOCIACIÓN",
                      "CERRADO",
                    ].map((stage) => (
                      <div
                        key={stage}
                        className="p-3 bg-white/[0.03] border border-white/5 text-center">
                        <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase tracking-tighter">
                          {stage}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-[0.2em]">
                        Lead Scoring
                      </h4>
                      <p className="text-sm text-neutral-400">
                        Los leads se puntúan automáticamente del 0-100 basado
                        en: servicio, calidad de mensaje, datos, CTA y tiempo de
                        respuesta. Los estados son{" "}
                        <code className="text-emerald-500 font-bold">HOT</code>,{" "}
                        <code className="text-amber-500 font-bold">WARM</code>,{" "}
                        <code className="text-blue-500 font-bold">COOL</code> y{" "}
                        <code className="text-neutral-500 font-bold">COLD</code>
                        .
                      </p>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-[0.2em]">
                        Próximas Acciones
                      </h4>
                      <p className="text-sm text-neutral-400">
                        Cada lead debe tener una acción programada. Si vence sin
                        completar, aparecerá en rojo. Para agregar: abre el
                        detalle del lead → campo "Próxima acción".
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 4. LEADS */}
              <section id="leads" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    04. Prospectos
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Leads
                  </h2>
                </div>
                <div className="space-y-8 text-sm text-neutral-400">
                  <p>
                    Lista completa de todos los leads que han llegado por el
                    formulario de contacto.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-white/[0.01] border border-white/5 space-y-4">
                      <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <HistoryIcon className="w-3.5 h-3.5" /> Historial de
                        comunicación
                      </h4>
                      <p className="text-xs leading-relaxed">
                        Cada lead tiene una pestaña{" "}
                        <code className="text-emerald-500">HISTORIAL</code> con
                        toda la línea de tiempo: cuándo llegó, qué correos se
                        mandaron, cuándo vio la propuesta, cuándo firmó. Nunca
                        pierdas contexto.
                      </p>
                    </div>
                    <div className="p-6 bg-white/[0.01] border border-white/5 space-y-4">
                      <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" /> Follow-ups sugeridos
                      </h4>
                      <p className="text-xs leading-relaxed">
                        Si una propuesta lleva 3+ días vista sin firma, el
                        sistema te sugiere un mensaje pre-escrito. Revísalo,
                        edítalo si quieres, y envíalo con un clic.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 5. PROPUESTAS */}
              <section id="proposals" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    05. Cierre Comercial
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Propuestas
                  </h2>
                </div>
                <div className="space-y-8">
                  <p className="text-sm text-neutral-400">
                    Generador de propuestas profesionales que se envían como un
                    link al cliente.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">
                        Pasos para crear
                      </h4>
                      <div className="space-y-4">
                        {[
                          'Click en "+ Nueva Propuesta"',
                          "Selecciona el lead y servicio",
                          "Personaliza problema y solución",
                          "Ajusta entregables y precio",
                          "Previsualiza y envía",
                        ].map((step, i) => (
                          <div
                            key={i}
                            className="flex gap-4 items-center group">
                            <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-[10px] font-bold">
                              {i + 1}
                            </span>
                            <span className="text-xs text-neutral-400 group-hover:text-white transition-colors uppercase tracking-widest">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-neutral-900/50 border border-white/5 space-y-6">
                      <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                        Estados del Folio
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: "BORRADOR", color: "text-neutral-500" },
                          { label: "ENVIADA", color: "text-blue-400" },
                          { label: "VISTA", color: "text-amber-400" },
                          { label: "ACEPTADA", color: "text-emerald-500" },
                          { label: "RECHAZADA", color: "text-red-400" },
                        ].map((st) => (
                          <div
                            key={st.label}
                            className="flex items-center justify-between border-b border-white text-[11px] pb-2 border-white/5">
                            <span className="font-mono text-neutral-500">
                              {st.label}
                            </span>
                            <span className={`font-bold ${st.color}`}>●</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-emerald-500/50 bg-emerald-500/5 p-6 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">
                      Consejo:
                    </span>
                    <p className="text-sm text-neutral-200 leading-relaxed">
                      Usa el campo "problema del cliente" con sus propias
                      palabras (del mensaje original). La vigencia de 15 días
                      crea urgencia natural.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 6. CONTRATOS */}
              <section id="contracts" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    06. Legalidad
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Contratos
                  </h2>
                </div>
                <div className="space-y-8 text-sm text-neutral-400">
                  <p>
                    Generador de contratos legales con firma electrónica de
                    ambas partes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                        Flujo Recomendado
                      </h4>
                      <ol className="space-y-4 text-xs">
                        <li className="flex gap-4">
                          <span className="font-mono text-emerald-500">1.</span>
                          <span>
                            Desde una propuesta ACEPTADA, click{" "}
                            <code className="text-white">
                              Convertir en contrato
                            </code>
                          </span>
                        </li>
                        <li className="flex gap-4">
                          <span className="font-mono text-emerald-500">2.</span>
                          <span>
                            Completa los datos fiscales del cliente (RFC,
                            dirección)
                          </span>
                        </li>
                        <li className="flex gap-4">
                          <span className="font-mono text-emerald-500">3.</span>
                          <span>
                            <span className="text-emerald-500 font-bold uppercase italic">
                              Firma tú primero
                            </span>{" "}
                            antes de enviar al cliente
                          </span>
                        </li>
                        <li className="flex gap-4">
                          <span className="font-mono text-emerald-500">4.</span>
                          <span>
                            Envía el link al cliente para su firma final
                          </span>
                        </li>
                      </ol>
                    </div>
                    <div className="bg-white/[0.01] border border-white/5 p-6 space-y-4">
                      <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-500" />{" "}
                        Firma electrónica
                      </h4>
                      <p className="text-xs leading-relaxed">
                        La firma del cliente queda registrada con: nombre
                        completo, fecha exacta, dirección IP, y un{" "}
                        <code className="text-emerald-500">hash SHA-256</code>.
                        Esto da plena validez legal a todos tus acuerdos.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 7. CLIENTES ACTIVOS */}
              <section id="clients" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    07. CRM Activo
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Clientes Activos
                  </h2>
                </div>
                <div className="space-y-8 text-sm text-neutral-400 leading-relaxed">
                  <p>
                    Vista de todos tus clientes con contrato firmado, linkados a
                    su proyecto y documentos.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Acceder a propuesta y contrato firmado",
                      "Verificar integridad de la firma con Hash",
                      "Visualizar estado rápido del proyecto",
                      "Exportar expediente completo a PDF",
                    ].map((feat) => (
                      <li
                        key={feat}
                        className="flex gap-3 items-center p-3 bg-white/[0.02] border border-white/5">
                        <div className="w-1.5 h-1.5 bg-emerald-500" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 8. PROYECTOS */}
              <section id="projects" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    08. Ejecución
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Proyectos
                  </h2>
                </div>
                <div className="space-y-12">
                  <p className="text-sm text-neutral-400">
                    Gestión operativa de los proyectos en curso.
                  </p>

                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                          TAREAS
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                          Checklist por fase con tareas predefinidas según el
                          servicio. Marca lo que completas y agrega tareas
                          personalizadas.{" "}
                          <span className="text-emerald-500 italic">
                            Usa esto como tu checklist diaria de trabajo.
                          </span>
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                          ENTREGABLES
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                          Sube links de Figma o prototipos. El cliente aprueba o
                          pide cambios directamente desde un link único,{" "}
                          <span className="text-emerald-500 italic">
                            eliminando la fricción de WhatsApp.
                          </span>
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                          RENTABILIDAD
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                          Registra horas y gastos. El sistema calcula tu{" "}
                          <span className="text-emerald-500 font-bold italic">
                            margen real
                          </span>{" "}
                          y tarifa efectiva por hora. Esencial para saber cuánto
                          estás ganando realmente.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                          REPORTE SEMANAL
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                          Genera un reporte de avance con un clic. Muestra
                          tareas completadas, entregables y próximos pasos con
                          estética premium de Noctra.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 9. MÉTRICAS */}
              <section id="metrics" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    09. Análisis
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Métricas
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="p-8 bg-neutral-900/50 border border-white/5 space-y-6">
                    <h4 className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">
                      Revenue Forecast
                    </h4>
                    <p className="text-sm text-neutral-400">
                      Proyección del mes basada en probabilidades ponderadas:
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest p-2 bg-white/5">
                        <span className="text-emerald-500">
                          Contratos firmados
                        </span>
                        <span className="font-bold">100%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest p-2 bg-white/5">
                        <span className="text-amber-500">
                          Propuestas vistas
                        </span>
                        <span className="font-bold">60%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest p-2 bg-white/5">
                        <span className="text-neutral-500">
                          Propuestas enviadas
                        </span>
                        <span className="font-bold">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 10. SEGURIDAD */}
              <section id="security" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    10. Protección
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Seguridad (2FA)
                  </h2>
                </div>
                <div className="space-y-6 text-sm text-neutral-400 leading-relaxed">
                  <p>
                    Mantén tu plataforma segura activando la autenticación de
                    dos factores (2FA).
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-4 items-center">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-[10px] font-bold">
                        1
                      </span>
                      <span className="text-xs uppercase tracking-widest">
                        Escanea el QR en{" "}
                        <code className="text-white">Seguridad</code>
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-[10px] font-bold">
                        2
                      </span>
                      <span className="text-xs uppercase tracking-widest">
                        Configura Google Authenticator o Authy
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-[10px] font-bold">
                        3
                      </span>
                      <span className="text-xs uppercase tracking-widest">
                        Usa password + código cada vez que entres
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-white/5" />

              {/* 11. FLUJO COMPLETO */}
              <section id="workflow" className="space-y-8 scroll-mt-24">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                    11. Onboarding
                  </span>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter text-balance">
                    Flujo Completo Recomendado
                  </h2>
                </div>

                <div className="space-y-12">
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">
                      DÍA 1 — Lead llega
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Revisar el score del lead (HOT/WARM/COOL)",
                        "Leer el mensaje completo en el detalle del lead",
                        "Contactar por teléfono o WhatsApp (< 1 hora si es HOT)",
                        "Mover el lead a CONTACTADO en el pipeline",
                        'Programar próxima acción (ej: "Llamada Discovery")',
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 text-xs text-neutral-400 capitalize items-start">
                          <div className="w-4 h-4 border border-white/20 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">
                      CIERRE COMERCIAL
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Crear la propuesta desde /forge/proposals",
                        "Personalizar el problema y solución",
                        'Si acepta: Click en "Convertir en contrato"',
                        "Firma como Noctra Studio primero",
                        "Enviar contrato final al cliente",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 text-xs text-neutral-400 capitalize items-start">
                          <div className="w-4 h-4 border border-white/20 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">
                      ENTREGA
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Usar la tab TAREAS como checklist diario",
                        "Registrar horas en RENTABILIDAD cada día",
                        "Subir entregables para revisión del cliente",
                        "Enviar reporte de avance semanal",
                        "Al terminar: Verificar rentabilidad y solicitar testimonio",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 text-xs text-neutral-400 capitalize items-start">
                          <div className="w-4 h-4 border border-white/20 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media print {
          .custom-scrollbar {
            overflow: visible !important;
          }
          aside,
          header {
            display: none !important;
          }
          main {
            background: white !important;
            color: black !important;
          }
          section {
            page-break-inside: avoid;
            margin-bottom: 2rem !important;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          span,
          li {
            color: black !important;
          }
          .border-white/5 {
            border-color: #eee !important;
          }
          .bg-white/5,
          .bg-white/[0.01],
          .bg-white/[0.02],
          .bg-white/[0.03] {
            background: #f9f9f9 !important;
            border-color: #eee !important;
          }
        }
      `}</style>
    </>
  );
}
