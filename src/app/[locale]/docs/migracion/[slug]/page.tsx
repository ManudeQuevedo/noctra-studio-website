import { client } from "@/sanity/lib/client";
import {
  MIGRATION_GUIDE_BY_SLUG_QUERY,
  ALL_MIGRATION_GUIDES_QUERY,
} from "@/lib/sanity/queries/migration";
import MigrationGuideContent from "@/components/docs/MigrationGuideContent";
import MigrationChecklist from "@/components/docs/MigrationChecklist";
import MigrationFAQ from "@/components/docs/MigrationFAQ";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CrmHomeLink } from "@/components/ui/crm-home-link";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const guides = await client.fetch(ALL_MIGRATION_GUIDES_QUERY);
  const locales = ["es", "en"];

  return guides.flatMap((g: any) =>
    locales.map((locale) => ({
      locale,
      slug: g.slug.current,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await client.fetch(MIGRATION_GUIDE_BY_SLUG_QUERY, {
    slug: slug,
  });
  if (!guide) return {};
  return {
    title: `Migrar desde ${guide.platform} | Noctra CRM`,
    description:
      guide.seo?.metaDescription ??
      `Guía completa para migrar tus datos desde ${guide.platform} a Noctra CRM.`,
  };
}

export const revalidate = 3600;

export default async function MigrationGuidePage({ params }: Props) {
  const { slug, locale } = await params;
  const guide = await client.fetch(MIGRATION_GUIDE_BY_SLUG_QUERY, {
    slug: slug,
  });

  if (!guide) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10 p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
        {guide.platformLogo ? (
          <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10">
            <Image
              src={guide.platformLogo.asset.url}
              alt={`Logo de ${guide.platform}`}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-800 border border-slate-700 text-2xl font-bold text-white">
            {guide.platform.charAt(0)}
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">
            Migrar desde {guide.platform}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>
              {guide.difficulty === "easy" && "🟢 Fácil"}
              {guide.difficulty === "medium" && "🟡 Medio"}
              {guide.difficulty === "advanced" && "🔴 Avanzado"}
            </span>
            <span>
              📅{" "}
              {new Date(guide.lastUpdated).toLocaleDateString(
                locale === "en" ? "en-US" : "es-MX",
              )}
            </span>
          </div>
          {guide.supportedEntities?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {guide.supportedEntities.map((entity: string) => (
                <span
                  key={entity}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md text-xs text-slate-300 font-medium tracking-wide">
                  {entity}
                </span>
              ))}
            </div>
          )}
        </div>

        <CrmHomeLink
          className="sm:ml-auto w-full sm:w-auto flex-shrink-0 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-colors text-center">
          Iniciar migración →
        </CrmHomeLink>
      </div>

      {/* Prerequisitos */}
      {guide.prerequisites?.length > 0 && (
        <div className="mb-10 p-5 bg-amber-950/20 border border-amber-800/30 rounded-2xl">
          <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
            <span className="text-lg">⚠️</span> Requisitos previos
          </h3>
          <ul className="space-y-2">
            {guide.prerequisites.map((req: string, i: number) => (
              <li key={i} className="text-slate-300 text-sm flex gap-2">
                <span className="text-amber-500/70 mt-0.5">•</span>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sección 1 */}
      {guide.exportSteps?.length > 0 && (
        <section id="exportar" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800/80 pb-4">
            1.{" "}
            {guide.tier === "tier1"
              ? "Cómo conectar tu cuenta"
              : "Cómo exportar tus datos"}
          </h2>
          <MigrationGuideContent content={guide.exportSteps} />
        </section>
      )}

      {/* Sección 2 (solo Tier 2) */}
      {guide.prepareFileSteps?.length > 0 && (
        <section id="preparar" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800/80 pb-4">
            2.{" "}
            {guide.tier === "tier1"
              ? "Selección de entidades a migrar"
              : "Preparar tu archivo"}
          </h2>
          <MigrationGuideContent content={guide.prepareFileSteps} />
        </section>
      )}

      {/* Sección 3 — Errores comunes */}
      {guide.commonErrors?.length > 0 && (
        <section id="errores" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800/80 pb-4">
            3. Errores comunes y soluciones
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-900/30">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="py-4 px-5 text-slate-300 font-semibold">
                    Mensaje de Error
                  </th>
                  <th className="py-4 px-5 text-slate-300 font-semibold">
                    Causa probable
                  </th>
                  <th className="py-4 px-5 text-slate-300 font-semibold">
                    Solución
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {guide.commonErrors.map((error: any, i: number) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-5 align-top">
                      <div className="flex items-start gap-2">
                        <span
                          className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs ${
                            error.severity === "blocking"
                              ? "bg-red-950/50 text-red-400"
                              : error.severity === "warning"
                                ? "bg-amber-950/50 text-amber-400"
                                : "bg-blue-950/50 text-blue-400"
                          }`}>
                          {error.severity === "blocking" && "❌"}
                          {error.severity === "warning" && "⚠️"}
                          {error.severity === "info" && "i"}
                        </span>
                        <code className="text-red-300/90 text-xs bg-red-950/20 px-1.5 py-0.5 rounded break-words">
                          {error.errorMessage}
                        </code>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-400 align-top leading-relaxed">
                      {error.cause}
                    </td>
                    <td className="py-4 px-5 text-slate-300 align-top leading-relaxed">
                      {error.solution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Sección 4 — Validación */}
      {guide.integrityChecks?.length > 0 && (
        <section id="validacion" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800/80 pb-4">
            4. Verificación de integridad
          </h2>
          <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60">
            <MigrationGuideContent content={guide.integrityChecks} />
          </div>
        </section>
      )}

      {/* Sección 5 — Checklist */}
      {guide.preImportChecklist?.length > 0 && (
        <section id="checklist" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800/80 pb-4">
            5. Checklist pre-importación
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Marca todas las casillas obligatorias para confirmar que tus datos
            están listos antes de ingresarlos a Noctra CRM.
          </p>
          <MigrationChecklist
            items={guide.preImportChecklist}
            platform={guide.platform}
          />
        </section>
      )}

      {/* Plantilla descargable */}
      {guide.downloadableTemplate && (
        <div className="mb-14 p-6 bg-violet-950/20 border border-violet-800/30 rounded-2xl flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-12 h-12 bg-violet-900/50 rounded-full flex items-center justify-center text-2xl shrink-0">
            📥
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">
              Plantilla de migración universal
            </p>
            <p className="text-violet-200/60 text-sm mt-1">
              Archivo preconfigurado con las columnas obligatorias.
            </p>
          </div>
          <a
            href={guide.downloadableTemplate.asset.url}
            download
            className="w-full sm:w-auto px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-colors">
            Descargar Excel
          </a>
        </div>
      )}

      {/* FAQ */}
      {guide.faq?.length > 0 && (
        <section id="faq" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800/80 pb-4">
            Preguntas frecuentes
          </h2>
          <MigrationFAQ items={guide.faq} />
        </section>
      )}

      {/* Guías relacionadas */}
      {guide.relatedGuides?.length > 0 && (
        <section className="mb-14 border-t border-slate-800/60 pt-10">
          <h3 className="text-xl font-semibold text-white mb-6">
            Guías relacionadas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guide.relatedGuides.map((related: any) => (
              <Link
                key={related._id}
                href={`/${locale}/docs/migracion/${related.slug.current}`}
                className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-800/80 hover:border-violet-500/50 hover:bg-slate-800/50 rounded-xl transition-all group">
                {related.platformLogo ? (
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 bg-white/5 border border-white/10 shrink-0">
                    <Image
                      src={related.platformLogo.asset.url}
                      alt={related.platform}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {related.platform.charAt(0)}
                  </div>
                )}
                <span className="text-slate-200 group-hover:text-white transition-colors font-medium">
                  {related.platform}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
