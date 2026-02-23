import { client } from "@/sanity/lib/client";
import { ALL_MIGRATION_GUIDES_QUERY } from "@/lib/sanity/queries/migration";
import MigrationGuideCard from "@/components/docs/MigrationGuideCard";
import MigrationSearch from "@/components/docs/MigrationSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guías de Migración | Noctra CRM",
  description:
    "Guías paso a paso para migrar tus datos desde HubSpot, Zoho, Pipedrive, Odoo, Salesforce y más hacia Noctra CRM.",
};

export const revalidate = 3600; // ISR: revalidar cada hora

export default async function MigrationDocsPage() {
  const guides = await client.fetch(ALL_MIGRATION_GUIDES_QUERY);

  const tier1Guides = guides.filter((g: any) => g.tier === "tier1");
  const tier2Guides = guides.filter((g: any) => g.tier === "tier2");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Centro de Migración
        </h1>
        <p className="text-slate-400 text-lg mb-6 max-w-2xl leading-relaxed">
          Guías paso a paso para traer todos tus datos a Noctra CRM desde
          cualquier plataforma sin perder historial.
        </p>
        <MigrationSearch guides={guides} />
      </div>

      {/* Tier 1 */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">⚡</span>
          <h2 className="text-2xl font-semibold text-white">
            Conexión directa
          </h2>
          <span className="text-sm text-slate-500 ml-2 hidden sm:inline">
            (Automático, sin archivos)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {tier1Guides.map((guide: any) => (
            <MigrationGuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </section>

      {/* Tier 2 */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">☁️</span>
          <h2 className="text-2xl font-semibold text-white">
            Importación de archivo
          </h2>
          <span className="text-sm text-slate-500 ml-2 hidden sm:inline">
            (Exporta desde tu CRM y sube el archivo)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {tier2Guides.map((guide: any) => (
            <MigrationGuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  );
}
