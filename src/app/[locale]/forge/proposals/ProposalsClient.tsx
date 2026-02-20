"use client";

import { useState } from "react";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";
import { format } from "date-fns";
import {
  Plus,
  Search,
  MoreHorizontal,
  Send,
  Eye,
  Edit3,
  FileText,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { NewProposalModal } from "./NewProposalModal";

type Proposal = {
  id: string;
  proposal_number: string;
  title: string;
  status: "draft" | "sent" | "viewed" | "accepted" | "rejected" | "expired";
  total: number;
  valid_until: string;
  created_at: string;
  lead: {
    name: string;
    email: string;
  };
};

export default function ProposalsClient({
  initialProposals,
}: {
  initialProposals: any[];
}) {
  const [proposals] = useState<Proposal[]>(initialProposals);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleConvertToContract = async (proposal: Proposal) => {
    const { data: fullProposal } = await supabase
      .from("proposals")
      .select("*, items:proposal_items(*), lead:contact_submissions(*)")
      .eq("id", proposal.id)
      .single();

    if (!fullProposal) return;

    const { data: contract, error } = await supabase
      .from("contracts")
      .insert({
        proposal_id: fullProposal.id,
        client_name: fullProposal.lead?.name || "",
        client_email: fullProposal.lead?.email || "",
        client_company: fullProposal.lead?.company_name || "",
        total_price: fullProposal.total,
        payment_terms: fullProposal.payment_terms,
        items: fullProposal.items.map((i: any) => ({
          name: i.name,
          description: i.description,
        })),
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Error al convertir a contrato");
      return;
    }

    router.push(`/forge/contracts/${contract.id}/edit`);
  };

  const filteredProposals = proposals.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lead?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.proposal_number.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "text-neutral-300 bg-neutral-500/10 border-neutral-500/20";
      case "sent":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "viewed":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "accepted":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "rejected":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-neutral-300 bg-neutral-500/10 border-neutral-500/20";
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      <ForgeSidebar />

      <main className="flex-1 overflow-y-auto bg-[#050505] flex flex-col">
        {/* Header */}
        <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#050505]/50 backdrop-blur-xl sticky top-0 z-10">
          <div>
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-300 mb-1">
              Propuestas
            </h2>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Proposal Builder
            </h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-4 py-2 flex items-center gap-2 hover:bg-neutral-200 transition-all active:scale-95 group">
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Nueva Propuesta
            </span>
          </button>
        </header>

        {/* Toolbar */}
        <div className="px-8 py-4 border-b border-white/5 flex items-center gap-4 shrink-0 overflow-x-auto bg-[#050505]">
          <div className="relative flex-1 max-w-md min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-300" />
            <input
              type="text"
              placeholder="Buscar por cliente, título o folio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 px-9 py-2 text-[11px] font-mono text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            {["all", "draft", "sent", "accepted"].map((status) => (
              <button
                key={status}
                className="px-3 py-1.5 border border-white/5 bg-white/[0.02] text-[9px] font-mono uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white/20 transition-all capitalize">
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        <div className="flex-1 overflow-x-auto px-8 py-6">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-4 px-4 text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-medium">
                  Folio
                </th>
                <th className="text-left py-4 px-4 text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-medium">
                  Cliente
                </th>
                <th className="text-left py-4 px-4 text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-medium">
                  Servicio / Título
                </th>
                <th className="text-right py-4 px-4 text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-medium">
                  Inversión
                </th>
                <th className="text-center py-4 px-4 text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-medium">
                  Estatus
                </th>
                <th className="text-right py-4 px-4 text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-medium">
                  Fecha
                </th>
                <th className="py-4 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
                      No se encontraron propuestas
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProposals.map((proposal) => (
                  <tr
                    key={proposal.id}
                    className="group hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-transparent">
                    <td className="py-5 px-4">
                      <span className="font-mono text-[11px] text-white/40 group-hover:text-emerald-500 transition-colors">
                        {proposal.proposal_number || "NOC-P-XXXX"}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-neutral-200">
                          {proposal.lead?.name || "Cliente Manual"}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {proposal.lead?.email || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className="text-xs font-medium text-neutral-300">
                        {proposal.title}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <span className="font-mono text-[11px] font-bold text-white">
                        ${proposal.total?.toLocaleString("es-MX")}
                        <span className="text-[9px] text-neutral-400 ml-1">
                          MXN
                        </span>
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex justify-center">
                        <span
                          className={`px-2 py-0.5 border text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 ${getStatusColor(proposal.status)}`}>
                          {proposal.status === "viewed" && (
                            <Eye className="w-2.5 h-2.5" />
                          )}
                          {proposal.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-neutral-400">
                          {format(new Date(proposal.created_at), "dd/MM/yyyy")}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-700 uppercase">
                          Exp.{" "}
                          {proposal.valid_until
                            ? format(new Date(proposal.valid_until), "dd/MM")
                            : "—"}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex justify-end gap-2 pr-4 relative">
                        {proposal.status === "accepted" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConvertToContract(proposal);
                            }}
                            className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2 group/btn">
                            <FileText className="w-3.5 h-3.5" />
                            Convertir a Contrato
                          </button>
                        )}
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4 text-neutral-300" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <NewProposalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}
