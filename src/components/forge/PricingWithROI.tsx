"use client";

import React, { useState, useMemo } from "react";
import {
  Check,
  Plus,
  Minus,
  ArrowRight,
  TrendingUp,
  Zap,
  Sparkles,
  Calculator,
  Building2,
  User,
  Shield,
  MessageSquare,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export const PricingWithROI = () => {
  // --- STATE ---
  const [currency, setCurrency] = useState<"USD" | "MXN">("USD");
  const [identity, setIdentity] = useState<"professional" | "agency">(
    "professional",
  );
  const [teamSize, setTeamSize] = useState(identity === "professional" ? 1 : 5);

  const EXCHANGE_RATE = 20;

  // Sync teamSize when identity changes
  const handleIdentityChange = (newIdentity: "professional" | "agency") => {
    setIdentity(newIdentity);
    setTeamSize(newIdentity === "professional" ? 1 : 5);
  };

  // --- ROI LOGIC ---
  const STACK_COST_PER_USER_USD = 55;
  const NOCTRA_PRO_FLAT_USD = 29;
  const NOCTRA_AGENCY_USER_USD = 39;

  const results = useMemo(() => {
    const currentStackTotal = STACK_COST_PER_USER_USD * teamSize;
    const noctraTotal =
      identity === "professional"
        ? NOCTRA_PRO_FLAT_USD
        : NOCTRA_AGENCY_USER_USD * teamSize;

    const monthlySavings = currentStackTotal - noctraTotal;
    const annualSavings = monthlySavings * 12;

    return {
      currentStackTotal,
      noctraTotal,
      monthlySavings,
      annualSavings,
    };
  }, [identity, teamSize]);

  // --- HELPERS ---
  const formatValue = (val: number) => {
    const amount = currency === "USD" ? val : val * EXCHANGE_RATE;
    return new Intl.NumberFormat(currency === "USD" ? "en-US" : "es-MX", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 bg-neutral-900 relative border-t border-white/5 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            No es un gasto, <br className="hidden md:block" /> es una inversión
            en tu libertad.
          </h2>

          {/* Main Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-8">
            {/* Identity Selector */}
            <div className="flex p-1 bg-white/5 rounded-full border border-white/10">
              <button
                onClick={() => handleIdentityChange("professional")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  identity === "professional"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white",
                )}>
                <User size={16} /> Profesional
              </button>
              <button
                onClick={() => handleIdentityChange("agency")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  identity === "agency"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white",
                )}>
                <Building2 size={16} /> Agency
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex p-1 bg-white/5 rounded-full border border-white/10">
              <button
                onClick={() => setCurrency("USD")}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all",
                  currency === "USD"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white",
                )}>
                USD
              </button>
              <button
                onClick={() => setCurrency("MXN")}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all",
                  currency === "MXN"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white",
                )}>
                MXN
              </button>
            </div>
          </div>
        </div>

        {/* --- ROI CALCULATOR Section --- */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-emerald-500 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-3 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      Deja de pagar el "Impuesto de la Fragmentación"
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Tu stack actual te cuesta más de lo que crees. Noctra lo
                      consolida todo.
                    </p>
                  </div>

                  {/* Team Size Slider */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#10b981] font-black">
                      <span>Tamaño del Equipo</span>
                      <span className="text-xl text-white font-mono">
                        {teamSize}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setTeamSize(Math.max(1, teamSize - 1))}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                        <Minus size={16} className="text-white" />
                      </button>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={teamSize}
                        onChange={(e) => setTeamSize(parseInt(e.target.value))}
                        className="flex-1 accent-[#10b981] h-1.5 bg-white/10 rounded-lg cursor-pointer appearance-none"
                      />
                      <button
                        onClick={() => setTeamSize(Math.min(50, teamSize + 1))}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                  </div>

                  {/* The Comparison List */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Project Mgmt", cost: "$15/u" },
                      { label: "Slack/Comms", cost: "$10/u" },
                      { label: "CRM/Leads", cost: "$20/u" },
                      { label: "Storage/Docs", cost: "$10/u" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-xs text-neutral-500 font-medium">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          {item.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-[#10b981]/10 border border-[#10b981]/20">
                  <div className="w-16 h-16 rounded-full bg-[#10b981] text-black flex items-center justify-center mb-6">
                    <TrendingUp size={32} />
                  </div>
                  <p className="text-[#10b981] text-xs font-black uppercase tracking-widest mb-2">
                    Ahorro Anual Estimado
                  </p>
                  <div className="text-5xl font-black text-white tabular-nums tracking-tighter mb-4">
                    {formatValue(results.annualSavings)}
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed max-w-[200px]">
                    Liberados para reinvertir en el crecimiento de{" "}
                    {identity === "professional" ? "tu carrera" : "tu estudio"}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PRICING CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Professional Context Card */}
          <div
            className={cn(
              "relative p-10 rounded-[2.5rem] transition-all duration-700 overflow-hidden",
              identity === "professional"
                ? "bg-[#050505] border-[#10b981]/50 border-2 shadow-[0_0_50px_rgba(16,185,129,0.1)] "
                : "bg-white/[0.02] border border-white/10 opacity-40 hover:opacity-100 grayscale hover:grayscale-0",
            )}>
            <div className="mb-10 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Zap size={18} fill="currentColor" />
                </span>
                <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500">
                  Solo Professional
                </h3>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black text-white tracking-tighter font-mono tabular-nums">
                  {formatValue(NOCTRA_PRO_FLAT_USD)}
                </span>
                <span className="text-neutral-500 text-sm font-bold">/mes</span>
              </div>
              <p className="text-neutral-400 font-medium">
                Tu sistema operativo personal.
              </p>
            </div>

            <div className="space-y-4 mb-10 relative z-10 h-[240px]">
              {[
                "CRM Ilimitado (Clientes y Leads)",
                "Facturación y Propuestas",
                "Portal de Cliente (White-label)",
                "Noctra AI Assistant (Básico)",
                "Reemplaza: Notion, Trello y Excel.",
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check
                      size={10}
                      className="text-emerald-500"
                      strokeWidth={3}
                    />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            <div className="relative z-10 w-full">
              <Link
                href="/forge/login"
                className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-white text-black font-black text-base hover:bg-neutral-200 transition-all active:scale-[0.98]">
                Comenzar Prueba de 14 Días <ArrowRight size={20} />
              </Link>
              <p className="text-center mt-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                Sin tarjeta de crédito requerida
              </p>
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] rounded-full" />
          </div>

          {/* Agency Context Card */}
          <div
            className={cn(
              "relative p-10 rounded-[2.5rem] transition-all duration-700 overflow-hidden",
              identity === "agency"
                ? "bg-[#050505] border-emerald-500/50 border-2 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                : "bg-white/[0.02] border border-white/10 opacity-40 hover:opacity-100 grayscale hover:grayscale-0",
            )}>
            <div className="mb-10 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Building2 size={18} fill="currentColor" />
                </span>
                <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500">
                  Studio OS
                </h3>
                <span className="ml-auto bg-emerald-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  Scaling
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black text-white tracking-tighter font-mono tabular-nums">
                  {formatValue(NOCTRA_AGENCY_USER_USD)}
                </span>
                <span className="text-neutral-500 text-sm font-bold">
                  /usuario/mes
                </span>
              </div>
              <p className="text-neutral-400 font-medium">
                Para equipos que escalan sin caos.
              </p>
            </div>

            <div className="space-y-4 mb-10 relative z-10 h-[240px]">
              {[
                "Todo en Pro +",
                "Gestión de Recursos y Tiempos",
                "Reportes Financieros de Rentabilidad",
                "Noctra AI (Sonnet 3.5 Integration)",
                "Roles y Permisos Granulares",
                "Soporte Prioritario WhatsApp",
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check
                      size={10}
                      className="text-emerald-500"
                      strokeWidth={3}
                    />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            <div className="relative z-10 w-full text-center">
              <Link
                href="/forge/login"
                className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#0a0a0a] text-white border border-white/10 font-black text-base hover:bg-white/5 transition-all active:scale-[0.98]">
                Elegir Studio OS{" "}
                <Sparkles size={18} className="text-emerald-500" />
              </Link>
              <p className="text-center mt-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                Prueba gratuita de 14 días activa
              </p>
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] rounded-full" />
          </div>
        </div>

        {/* Feature Comparison Link */}
        <div className="mt-20 text-center">
          <p className="text-neutral-500 text-xs font-medium max-w-xl mx-auto leading-relaxed">
            *Cálculos basados en promedios de mercado de herramientas populares
            de gestión y CRM. Los ahorros reales pueden variar según tu
            configuración actual.
          </p>
        </div>
      </div>
    </section>
  );
};
