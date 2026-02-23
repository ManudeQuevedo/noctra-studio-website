"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const SOURCES = [
  {
    id: "hubspot",
    name: "HubSpot",
    tier: 1,
    logo: "/images/logos/hubspot.png",
  },
  { id: "zoho", name: "Zoho CRM", tier: 1, logo: "/images/logos/zoho.png" },
  {
    id: "pipedrive",
    name: "Pipedrive",
    tier: 1,
    logo: "/images/logos/pipedrive.png",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    tier: 1,
    logo: "/images/logos/salesforce.png",
  },
  { id: "csv", name: "CSV / Excel", tier: 2, logo: "file" },
  { id: "json", name: "JSON", tier: 2, logo: "json" },
];

export function SourceSelection({
  onSelect,
}: {
  onSelect: (source: any) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = SOURCES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">
          Paso 1: Selecciona el Origen
        </h2>
        <p className="text-neutral-400 text-sm">
          ¿Desde qué plataforma quieres migrar? Puedes conectar directamente via
          API o subir un archivo.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Buscar plataforma..."
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((source) => (
          <button
            key={source.id}
            onClick={() => onSelect(source.id)}
            className="group flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all">
            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
              {source.tier === 1 ? (
                <div className="w-8 h-8 bg-neutral-800 rounded-sm" /> // Placeholder for logos
              ) : (
                <span className="text-xs font-mono uppercase text-neutral-500">
                  {source.id}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-white mb-1">
              {source.name}
            </span>
            <span
              className={`text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded ${
                source.tier === 1
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-blue-500/10 text-blue-500"
              }`}>
              {source.tier === 1 ? "Conexión directa" : "Importar archivo"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
