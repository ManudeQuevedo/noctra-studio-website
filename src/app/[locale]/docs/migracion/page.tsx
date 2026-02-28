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

export default async function MigrationDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
        <p className="text-slate-400 text-lg mb-8 max-w-2xl leading-relaxed">
          Guías paso a paso para traer todos tus datos a Noctra CRM desde
          cualquier plataforma.
        </p>
        <MigrationSearch guides={guides} locale={locale} />
      </div>

      {/* Tier 1 */}
      <section className="mb-24">
        <div className="flex flex-col mb-10">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">
            Conexión directa
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Sincronización automática vía API (sin archivos)
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 sm:gap-16">
          {tier1Guides.map((guide: any) => (
            <MigrationGuideCard key={guide._id} guide={guide} locale={locale} />
          ))}
        </div>
      </section>

      {/* Tier 2 */}
      <section className="mb-24">
        <div className="flex flex-col mb-10">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">
            Importación manual
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Exporta tus datos en CSV/Excel y súbelos a Noctra CRM
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 sm:gap-16">
          {tier2Guides.map((guide: any) => (
            <MigrationGuideCard key={guide._id} guide={guide} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
