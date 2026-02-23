"use client";

import React from "react";
import { m } from "framer-motion";
import {
  Check,
  ArrowRight,
  Sparkles,
  Building2,
  Brain,
  Users,
  UserPlus,
  Shield,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

export const PricingComparison = () => {
  const features = [
    {
      category: "Precio Base",
      competitor: "Desde $15 - $165/mo",
      standard: "$9 / usuario",
      enterprise: (
        <span className="flex items-center gap-2">Custom Pricing</span>
      ),
    },
    {
      category: "Inteligencia Artificial",
      competitor: "Add-ons costosos o créditos limitados",
      standard: "Nativa (Incluida) - Análisis predictivo",
      enterprise: (
        <span className="flex items-center gap-2">
          <Brain size={16} className="text-amber-500/80 shrink-0" />
          Custom Model Training (Tus PDFs/Datos)
        </span>
      ),
    },
    {
      category: "Límites",
      competitor: "Restringidos por Tiers",
      standard: "Roles generosos, almacenamiento estándar",
      enterprise: (
        <span className="flex items-center gap-2">
          <Users size={16} className="text-amber-500/80 shrink-0" />
          Unlimited Users & Storage
        </span>
      ),
    },
    {
      category: "Soporte",
      competitor: "Tickets o chat lento",
      standard: "Email & Chat Support",
      enterprise: (
        <span className="flex items-center gap-2">
          <UserPlus size={16} className="text-amber-500/80 shrink-0" />
          Dedicated Success Manager + SLA 99.9%
        </span>
      ),
    },
    {
      category: "Seguridad",
      competitor: "Autenticación estándar",
      standard: "2FA Incluido",
      enterprise: (
        <span className="flex items-center gap-2">
          <Shield size={16} className="text-amber-500/80 shrink-0" />
          SSO (SAML/Okta) & Audit Logs
        </span>
      ),
    },
    {
      category: "Infraestructura",
      competitor: "Cloud multi-tenant",
      standard: "Cloud segura",
      enterprise: (
        <span className="flex items-center gap-2">
          <Server size={16} className="text-amber-500/80 shrink-0" />
          Opción On-Premise o Instancia Privada
        </span>
      ),
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 block">
            Comparativa de Mercado
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Construido para Escalar.
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Desde equipos ágiles hasta operaciones complejas. Encuentra el plan
            perfecto para tu agencia.
          </m.p>
        </div>

        {/* Comparison Board */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-b from-white/5 to-transparent rounded-3xl blur opacity-30 pointer-events-none" />
          <div className="relative bg-[#050505] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Table Header (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10 bg-white/[0.02]">
              {/* Empty top-left cell for desktop */}
              <div className="hidden md:block p-8 border-r border-white/5"></div>

              {/* Competitor Column Header */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-neutral-500 font-bold uppercase tracking-widest text-xs mb-2">
                  Competencia
                </div>
                <div className="text-neutral-300 text-sm">
                  HubSpot, Salesforce, etc.
                </div>
              </div>

              {/* Standard Column Header (Highlight) */}
              <div className="p-8 relative border-b md:border-b-0 border-white/5 md:border-r flex flex-col items-center justify-center text-center bg-emerald-500/[0.03]">
                <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] uppercase font-black px-3 py-1 rounded-b-lg tracking-widest shadow-lg">
                  Recomendado
                </div>
                <div className="text-emerald-500 font-bold uppercase tracking-widest text-xs mt-4 mb-2">
                  Noctra Standard
                </div>
                <div className="text-white text-3xl font-black tracking-tighter">
                  $9
                  <span className="text-sm font-medium text-neutral-400">
                    /mo
                  </span>
                </div>
              </div>

              {/* Enterprise Column Header */}
              <div className="p-8 relative flex flex-col items-center justify-center text-center bg-white/[0.01]">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600/50 to-amber-500/50" />
                <div className="text-white/90 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                  <Building2 size={14} className="text-neutral-400" />{" "}
                  Enterprise / Agency Scale
                </div>
                <div className="text-white text-2xl font-bold tracking-tighter">
                  Desde $299
                  <span className="text-sm font-medium text-neutral-400">
                    /mo
                  </span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              {features.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-4 group/row hover:bg-white/[0.01] transition-colors">
                  {/* Category */}
                  <div className="p-6 md:p-8 flex items-center md:border-r border-white/5">
                    <span className="text-sm font-bold text-neutral-300">
                      {row.category}
                    </span>
                  </div>

                  {/* Competitor */}
                  <div className="p-6 md:p-8 text-neutral-500 text-sm flex items-center md:border-r border-white/5 border-b md:border-b-0">
                    <span className="md:hidden w-32 font-bold uppercase text-[10px] tracking-widest text-neutral-600">
                      Competencia:
                    </span>
                    <span className="flex-1">{row.competitor}</span>
                  </div>

                  {/* Standard */}
                  <div className="p-6 md:p-8 text-white font-medium text-sm flex items-center md:border-r border-white/5 bg-emerald-500/[0.01] border-b md:border-b-0">
                    <span className="md:hidden w-32 font-bold uppercase text-[10px] tracking-widest text-emerald-500 mt-0.5">
                      Standard:
                    </span>
                    <Check
                      size={16}
                      className="text-emerald-500 mr-2 shrink-0 hidden md:block"
                      strokeWidth={3}
                    />
                    <span className="flex-1">{row.standard}</span>
                  </div>

                  {/* Enterprise */}
                  <div className="p-6 md:p-8 text-white font-bold text-sm flex items-center bg-white/[0.01]">
                    <span className="md:hidden w-32 font-bold uppercase text-[10px] tracking-widest text-neutral-500 mt-0.5">
                      Enterprise:
                    </span>
                    <Sparkles
                      size={16}
                      className="text-amber-500/50 mr-2 shrink-0 hidden md:block"
                    />
                    <span className="flex-1">{row.enterprise}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-t border-white/10 bg-white/[0.02]">
              <div className="hidden md:block p-8 border-r border-white/5"></div>

              <div className="hidden md:flex p-8 border-b md:border-b-0 md:border-r border-white/5 items-center justify-center">
                {/* No CTA for competitors */}
              </div>

              <div className="p-6 md:p-8 border-b md:border-b-0 border-white/5 md:border-r flex items-center justify-center bg-emerald-500/[0.03]">
                <Link
                  href="/forge/login"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all active:scale-[0.98]">
                  Empezar Gratis <ArrowRight size={16} />
                </Link>
              </div>

              <div className="p-6 md:p-8 flex items-center justify-center bg-white/[0.01]">
                {/* Enterprise Contact CTA */}
                <a
                  href="mailto:ventas@noctra.studio?subject=Consulta%20Plan%20Enterprise"
                  className="w-full relative flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#0a0a0a] border border-white/10 text-white font-bold text-sm hover:bg-white/5 hover:border-white/30 transition-all active:scale-[0.98] group/btn overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  Contactar Ventas{" "}
                  <ArrowRight
                    size={16}
                    className="text-white/50 group-hover/btn:text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
