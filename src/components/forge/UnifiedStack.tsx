"use client";

import React from "react";
import { m, Variants } from "framer-motion";
import {
  BrainCircuit,
  Feather,
  Megaphone,
  RefreshCcw,
  Sparkles,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const UnifiedStack = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] relative border-t border-white/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Tu Stack Comercial, Unificado.
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Deja de pagar $100+ en herramientas dispersas. Noctra conecta
            Marketing, Ventas, Legal y Finanzas en un solo flujo continuo.
          </m.p>
        </div>

        {/* Bento Grid */}
        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. AI Profitability Engine (2 columns x 2 rows) */}
          <m.div
            variants={item}
            className="md:col-span-2 md:row-span-2 p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#10b981]/50 hover:-translate-y-1 backdrop-blur-sm transition-all duration-500 group relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 flex items-center justify-center mb-8">
                <BrainCircuit size={32} className="text-[#10b981]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-6">
                Predictive Profitability AI
              </h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-md">
                La mayoría de los CRMs te dicen cuánto vendiste. Noctra te dice
                cuánto ganaste. Nuestra IA cruza horas reportadas, costos
                operativos y facturación para calcular tu Margen Neto en tiempo
                real.
              </p>
            </div>

            {/* Visual: Predictive Margin Mockup */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/5">
              <div className="bg-black/40 rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Active Insight
                  </span>
                  <div className="flex items-center gap-2 bg-[#10b981]/20 px-3 py-1 rounded-full">
                    <Sparkles size={12} className="text-[#10b981]" />
                    <span className="text-[10px] font-black text-[#10b981] uppercase">
                      Optimized
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-white">
                        Project Margin
                      </span>
                      <span className="text-xl font-black text-[#10b981]">
                        82%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                      <m.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "82%" }}
                        transition={{
                          delay: 0.5,
                          duration: 1.5,
                          ease: "circOut",
                        }}
                        className="h-full bg-gradient-to-r from-[#10b981] to-emerald-400"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                      <span className="block text-[8px] text-neutral-500 uppercase mb-1">
                        Revenue
                      </span>
                      <span className="text-white font-mono text-sm">
                        $12,400
                      </span>
                    </div>
                    <div className="flex-1 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                      <span className="block text-[8px] text-neutral-500 uppercase mb-1">
                        Expenses
                      </span>
                      <span className="text-white font-mono text-sm">
                        $2,230
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-80 h-80 bg-[#10b981]/5 blur-[100px] rounded-full pointer-events-none" />
          </m.div>

          {/* 2. Native E-Sign (Row 1, Column 3) */}
          <m.div
            variants={item}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#10b981]/50 hover:-translate-y-1 backdrop-blur-sm transition-all duration-500 group relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center mb-6">
                <Feather size={24} className="text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Firma Digital Nativa
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Envía propuestas y ciérralas en el acto. Sin salir de Noctra.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="relative group/tooltip">
                <span className="bg-white/10 border border-white/10 text-white/60 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 cursor-help hover:text-white hover:border-[#10b981]/30 transition-colors">
                  ⚖️ ESIGN Compliant
                </span>
                <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-black border border-white/10 rounded-xl text-[10px] text-neutral-400 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all shadow-xl z-20 leading-relaxed">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <Info size={10} />
                    <span>Audit Trail Included</span>
                  </div>
                  Certificado digital con registro de IP y Timestamp para cada
                  firma legalmente vinculante.
                </div>
              </div>
            </div>
          </m.div>

          {/* 3. Marketing Bridge (Row 2, Column 3 - Top Half style) */}
          <m.div
            variants={item}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#10b981]/50 hover:-translate-y-1 backdrop-blur-sm transition-all duration-500 group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <Megaphone size={24} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Marketing Sync
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Conexión bidireccional con Mailchimp y Audiencias para automatizar
              tu embudo.
            </p>
          </m.div>

          {/* 4. Accounting Sync (Row 2, Column 3 - Bottom Half style, using grid-flow or manual order if needed) */}
          <m.div
            variants={item}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#10b981]/50 hover:-translate-y-1 backdrop-blur-sm transition-all duration-500 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <RefreshCcw size={24} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Contabilidad en Sync
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Tus facturas en Noctra viajan directo a QuickBooks/Xero sin
              esfuerzo manual.
            </p>
          </m.div>
        </m.div>

        {/* Unified Label */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex items-center justify-center gap-4 text-neutral-600 font-mono text-[10px] uppercase tracking-[0.4em] font-medium">
          <div className="h-[1px] w-12 bg-white/5" />
          <span>Noctra Unified Intelligence Protocol</span>
          <div className="h-[1px] w-12 bg-white/5" />
        </m.div>
      </div>
    </section>
  );
};
