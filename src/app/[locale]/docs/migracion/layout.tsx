import { client } from "@/sanity/lib/client";
import { ALL_MIGRATION_GUIDES_QUERY } from "@/lib/sanity/queries/migration";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const revalidate = 3600; // ISR: revalidar cada hora

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const guides = await client.fetch(ALL_MIGRATION_GUIDES_QUERY);
  const tier1Guides = guides.filter((g: any) => g.tier === "tier1");
  const tier2Guides = guides.filter((g: any) => g.tier === "tier2");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col pt-20">
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto relative">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-slate-800/60 p-6 overflow-y-auto sticky top-20 h-[calc(100vh-80px)]">
          <Link
            href={`/${locale}/docs/migracion`}
            className="flex items-center gap-2 text-white font-semibold mb-8 hover:text-violet-400 transition-colors">
            <BookOpen className="w-5 h-5 text-violet-500" />
            Centro de Migración
          </Link>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Conexión directa (Tier 1)
              </p>
              <ul className="space-y-1.5 list-none pl-0">
                {tier1Guides.map((guide: any) => (
                  <li key={guide._id}>
                    <Link
                      href={`/${locale}/docs/migracion/${guide.slug.current}`}
                      className="text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 block px-3 py-1.5 rounded-md transition-colors truncate">
                      {guide.platform}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Importación archivo (Tier 2)
              </p>
              <ul className="space-y-1.5 list-none pl-0">
                {tier2Guides.map((guide: any) => (
                  <li key={guide._id}>
                    <Link
                      href={`/${locale}/docs/migracion/${guide.slug.current}`}
                      className="text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 block px-3 py-1.5 rounded-md transition-colors truncate">
                      {guide.platform}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-20">{children}</main>
      </div>
    </div>
  );
}
