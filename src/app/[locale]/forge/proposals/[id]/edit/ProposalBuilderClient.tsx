"use client";

import { useState, useEffect } from "react";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";
import {
  ChevronLeft,
  Save,
  Send,
  Eye,
  Layout,
  FileText,
  History,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ProposalItemsList } from "@/components/forge/proposals/ProposalItemsList";
import { format } from "date-fns";

export default function ProposalBuilderClient({
  initialProposal,
}: {
  initialProposal: any;
}) {
  const [proposal, setProposal] = useState(initialProposal);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "items" | "preview">(
    "content",
  );
  const supabase = createClient();

  const handleAutoSave = async (data: any) => {
    setIsSaving(true);
    try {
      const { error: metaError } = await supabase
        .from("proposals")
        .update({
          title: data.title,
          description: data.description,
          valid_until: data.valid_until,
          estimated_duration: data.estimated_duration,
          subtotal: data.subtotal,
          total: data.total,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.id);

      if (metaError) throw metaError;
      setLastSaved(new Date());
    } catch (err) {
      console.error("Auto-save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save logic (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(proposal) !== JSON.stringify(initialProposal)) {
        handleAutoSave(proposal);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [proposal]);

  const handleUpdate = (field: string, value: any) => {
    setProposal((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      <ForgeSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#080808]">
          <div className="flex items-center gap-6">
            <Link
              href="/forge/proposals"
              className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <ChevronLeft className="w-5 h-5 text-neutral-500 group-hover:text-white" />
            </Link>

            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20">
                  {proposal.proposal_number || "Draft"}
                </span>
                <h1 className="text-sm font-bold truncate max-w-[300px]">
                  {proposal.title}
                </h1>
              </div>
              <p className="text-[10px] font-mono text-neutral-500">
                Cliente: {proposal.lead?.name || "Desconocido"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-neutral-600 mr-4">
              {isSaving ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  {lastSaved
                    ? `Guardado ${lastSaved.toLocaleTimeString()}`
                    : "Todo guardado"}
                </>
              )}
            </div>

            <button
              onClick={() =>
                window.open(
                  `/client/proposal/${proposal.public_uuid}`,
                  "_blank",
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-300 transition-all">
              <Eye className="w-3.5 h-3.5" />
              Previsualizar
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest transition-all">
              <Send className="w-3.5 h-3.5" />
              Enviar Propuesta
            </button>
          </div>
        </header>

        {/* Builder Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Editing Forms (60% or scrollable) */}
          <div className="w-full lg:w-[45%] border-r border-white/5 overflow-y-auto bg-[#050505] p-8 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                  Información General
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-neutral-500 uppercase">
                    Título de la Propuesta
                  </label>
                  <input
                    type="text"
                    value={proposal.title}
                    onChange={(e) => handleUpdate("title", e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-neutral-500 uppercase">
                    Resumen Ejecutivo
                  </label>
                  <textarea
                    rows={4}
                    value={proposal.description || ""}
                    onChange={(e) =>
                      handleUpdate("description", e.target.value)
                    }
                    placeholder="Describe los objetivos principales del proyecto..."
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                  Servicios y Entregables
                </h3>
              </div>

              <ProposalItemsList
                items={proposal.items || []}
                onChange={(items) => {
                  const subtotal = items.reduce(
                    (acc, item) => acc + item.quantity * item.unit_price,
                    0,
                  );
                  setProposal({
                    ...proposal,
                    items,
                    subtotal,
                    total: subtotal,
                  });
                }}
              />
            </section>

            <section className="space-y-6">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                Inversión y Términos
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-neutral-500 uppercase">
                    Validez (Vence el)
                  </label>
                  <input
                    type="date"
                    value={proposal.valid_until || ""}
                    onChange={(e) =>
                      handleUpdate("valid_until", e.target.value)
                    }
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-neutral-500 uppercase">
                    Duración Estimada
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 4-6 semanas"
                    value={proposal.estimated_duration || ""}
                    onChange={(e) =>
                      handleUpdate("estimated_duration", e.target.value)
                    }
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Panel: Live Preview (40% - sticky or fixed) */}
          <div className="hidden lg:block lg:flex-1 bg-white/[0.02] overflow-y-auto p-12">
            <div className="max-w-3xl mx-auto bg-white text-black shadow-2xl min-h-[1000px] p-16 flex flex-col">
              {/* Proposal Header */}
              <div className="flex justify-between items-start mb-20">
                <div className="space-y-2">
                  <div className="text-2xl font-black tracking-tighter uppercase italic">
                    Noctra<span className="text-emerald-600">.</span>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest leading-relaxed">
                    Studio de Diseño &<br />
                    Desarrollo Digital
                  </p>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
                    Propuesta
                  </h2>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Folio: {proposal.proposal_number || "PENDIENTE"}
                  </p>
                </div>
              </div>

              {/* Client & Date */}
              <div className="grid grid-cols-2 gap-20 mb-20 border-t border-black/5 pt-12">
                <div>
                  <h4 className="text-[9px] font-mono uppercase text-neutral-400 mb-4 tracking-[0.2em]">
                    Preparado para
                  </h4>
                  <p className="font-black text-xl leading-tight uppercase">
                    {proposal.lead?.name}
                  </p>
                  <p className="text-sm border-b border-black/10 pb-1 mt-1">
                    {proposal.lead?.email}
                  </p>
                </div>
                <div className="text-right">
                  <h4 className="text-[9px] font-mono uppercase text-neutral-400 mb-4 tracking-[0.2em]">
                    Fecha de emisión
                  </h4>
                  <p className="font-bold text-lg">
                    {format(
                      new Date(proposal.created_at || Date.now()),
                      "MMMM d, yyyy",
                    )}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                    Válido hasta:{" "}
                    {proposal.valid_until
                      ? format(new Date(proposal.valid_until), "MMMM d, yyyy")
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-20">
                <h4 className="text-[9px] font-mono uppercase text-neutral-400 mb-6 tracking-[0.2em]">
                  Resumen Ejecutivo
                </h4>
                <p className="text-lg leading-relaxed text-neutral-800 italic">
                  {proposal.description ||
                    "Su visión merece una presencia digital de clase mundial. Esta propuesta detalla el camino estratégico para transformar sus objetivos en una realidad tangible y de alto impacto."}
                </p>
              </div>

              {/* Items List */}
              <div className="flex-1">
                <h4 className="text-[9px] font-mono uppercase text-neutral-400 mb-10 tracking-[0.2em]">
                  Estrategia y Entregables
                </h4>
                <div className="space-y-12">
                  {proposal.items?.map((item: any, idx: number) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-12">
                          <h5 className="font-black text-lg uppercase tracking-tight mb-2 italic group-hover:text-emerald-600 transition-colors">
                            {item.name}
                          </h5>
                          <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-xs font-bold">
                            $
                            {(item.quantity * item.unit_price).toLocaleString(
                              "es-MX",
                            )}{" "}
                            MXN
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[10px] font-mono text-neutral-400">
                              {item.quantity} x $
                              {item.unit_price.toLocaleString("es-MX")}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-px bg-black/[0.05]"></div>
                    </div>
                  ))}
                  {(!proposal.items || proposal.items.length === 0) && (
                    <div className="py-20 border-y border-black/5 flex flex-col items-center justify-center gap-6 opacity-20 group">
                      <div className="w-16 h-1 border-t-2 border-black"></div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.4em]">
                        Configurando estrategia...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Investment Summary */}
              <div className="mt-20 border-t-4 border-black pt-10">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-[9px] font-mono uppercase text-neutral-400 mb-1 tracking-[0.2em]">
                      Inversión Total
                    </h4>
                    <p className="text-sm text-neutral-500 italic">
                      Términos sugeridos: 50% anticipo, 50% al finalizar.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black tracking-tighter">
                      ${proposal.total?.toLocaleString("es-MX")}{" "}
                      <span className="text-sm font-mono text-neutral-400">
                        MXN
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
