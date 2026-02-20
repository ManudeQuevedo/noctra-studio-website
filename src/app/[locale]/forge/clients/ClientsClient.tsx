"use client";

import { useState } from "react";
import {
  Search,
  UserCheck,
  ExternalLink,
  Calendar,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type ClientCardData = {
  id: string;
  client_name: string;
  client_company: string | null;
  service_type: string | null;
  contract_number: string;
  total_price: number;
  client_signed_at: string;
  project?: {
    status: string;
    name: string;
  };
};

export function ClientsClient({
  initialClients,
}: {
  initialClients: ClientCardData[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "build" | "discovery">("all");

  const filteredClients = initialClients.filter((c) => {
    const matchesSearch =
      c.client_name.toLowerCase().includes(search.toLowerCase()) ||
      c.client_company?.toLowerCase().includes(search.toLowerCase()) ||
      c.contract_number.toLowerCase().includes(search.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && c.project?.status === filter;
  });

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "discovery":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "build":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "launch":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#050505]">
      {/* Header */}
      <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#0a0a0a]">
        <div>
          <h1 className="text-xl font-bold text-white uppercase italic flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            Clientes Activos
          </h1>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
            Gestión de relaciones y proyectos cerrados
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="px-8 py-4 border-b border-white/5 flex items-center gap-4 shrink-0 bg-[#080808]">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input
            type="text"
            placeholder="Buscar por nombre, empresa o contrato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/10 px-10 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-neutral-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-transparent text-[10px] font-mono text-neutral-400 uppercase tracking-widest focus:outline-none cursor-pointer">
            <option value="all">Estatus: Todos</option>
            <option value="discovery">Fase: Discovery</option>
            <option value="build">Fase: Build</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClients.map((client) => (
            <Link
              key={client.id}
              href={`/forge/clients/${client.id}`}
              className="group block bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/30 transition-all overflow-hidden relative">
              {/* Card Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight uppercase italic underline decoration-transparent group-hover:decoration-emerald-500/30 underline-offset-4">
                    {client.client_name}
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                    {client.client_company || "Persona Física"}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 border text-[9px] font-black uppercase tracking-widest rounded-sm ${getStatusColor(client.project?.status)}`}>
                  {client.project?.status || "Sin Proyecto"}
                </div>
              </div>

              {/* Card Info Grid */}
              <div className="p-6 grid grid-cols-2 gap-y-6">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-500/50" />{" "}
                    Contrato
                  </span>
                  <p className="text-xs font-bold text-neutral-300">
                    {client.contract_number}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3 text-neutral-700" />{" "}
                    Inversión
                  </span>
                  <p className="text-xs font-bold text-emerald-500/80">
                    ${client.total_price.toLocaleString("es-MX")}{" "}
                    <span className="text-[9px] text-neutral-600 font-mono">
                      MXN
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-neutral-700" /> Firmado
                  </span>
                  <p className="text-xs font-bold text-neutral-300">
                    {format(new Date(client.client_signed_at), "dd MMM yyyy", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3 text-neutral-700" />{" "}
                    Servicio
                  </span>
                  <p className="text-xs font-bold text-neutral-300 truncate pr-4">
                    {client.service_type || "No especificado"}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between group-hover:bg-emerald-500/[0.02] transition-colors">
                <span className="text-[10px] font-bold text-neutral-600 group-hover:text-emerald-500 transition-colors uppercase tracking-widest">
                  Ver expediente completo
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-800 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Background Accent */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.01] group-hover:opacity-[0.03] transition-opacity pointer-events-none">
                <UserCheck className="w-32 h-32 -mr-16 -mt-16" />
              </div>
            </Link>
          ))}

          {filteredClients.length === 0 && (
            <div className="col-span-full border border-dashed border-white/5 rounded-lg py-20 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/[0.02] rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-neutral-700" />
              </div>
              <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                No se encontraron clientes activos
              </p>
            </div>
          )}
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
      `}</style>
    </div>
  );
}
