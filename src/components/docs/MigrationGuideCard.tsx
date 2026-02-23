import Image from "next/image";
import Link from "next/link";
import { Clock, BarChart, Database } from "lucide-react";

export default function MigrationGuideCard({ guide }: { guide: any }) {
  const getDifficultyStyles = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-emerald-950/30 text-emerald-400 border border-emerald-800/40";
      case "medium":
        return "bg-amber-950/30 text-amber-400 border border-amber-800/40";
      case "advanced":
        return "bg-red-950/30 text-red-400 border border-red-800/40";
      default:
        return "bg-slate-800 text-slate-300";
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "easy":
        return "Fácil";
      case "medium":
        return "Medio";
      case "advanced":
        return "Avanzado";
      default:
        return "Desconocido";
    }
  };

  return (
    <Link
      href={`/docs/migracion/${guide.slug.current}`}
      className="group bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-2xl p-5 flex flex-col transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl rounded-full transition-transform group-hover:scale-150 duration-700"
        style={{ backgroundColor: guide.platformColor?.hex || "#8b5cf6" }}
      />

      <div className="flex justify-between items-start mb-4 relative">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-white/5 border border-white/10">
          {guide.platformLogo ? (
            <Image
              src={guide.platformLogo.asset.url}
              alt={guide.platform}
              width={28}
              height={28}
              className="object-contain"
            />
          ) : (
            <span className="text-xl font-bold text-white">
              {guide.platform.charAt(0)}
            </span>
          )}
        </div>

        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${getDifficultyStyles(guide.difficulty)}`}>
          {getDifficultyLabel(guide.difficulty)}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-white mb-2 relative">
        {guide.platform}
      </h3>

      <div className="flex items-center gap-4 text-sm text-slate-400 mb-6 flex-grow relative">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-500" />
          {guide.estimatedTime}
        </div>
      </div>

      <div className="border-t border-slate-800/60 pt-4 mt-auto relative">
        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mb-3">
          Entidades soportadas
        </p>
        <div className="flex flex-wrap gap-2">
          {guide.supportedEntities?.slice(0, 4).map((entity: string) => (
            <span
              key={entity}
              className="text-[11px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md">
              {entity}
            </span>
          ))}
          {guide.supportedEntities?.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md">
              +{guide.supportedEntities.length - 4} más
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 text-sm font-medium text-violet-400 flex items-center gap-1 group-hover:text-violet-300 transition-colors relative">
        Ver guía completa
        <span className="transform transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
