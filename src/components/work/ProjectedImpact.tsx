"use client";

import { useTranslations } from "next-intl";
import {
  TrendingUp,
  Zap,
  ShoppingCart,
  DollarSign,
  Gem,
  RefreshCw,
  Lock,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "trending-up": TrendingUp,
  zap: Zap,
  "shopping-cart": ShoppingCart,
  "dollar-sign": DollarSign,
  gem: Gem,
  "refresh-cw": RefreshCw,
  lock: Lock,
};

interface ProjectedImpactProps {
  projectKey: string;
}

export function ProjectedImpact({ projectKey }: ProjectedImpactProps) {
  const t = useTranslations("WorkPage");

  const impact = t.raw(`projects.${projectKey}.projected_impact`) as {
    intro: string;
    metrics: Array<{
      metric: string;
      value: string;
      description: string;
      icon: string;
    }>;
    methodology_note: string;
  };

  if (!impact?.metrics) return null;

  return (
    <div className="rounded-lg bg-neutral-900/40 border border-neutral-800/60 p-5">
      <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-wider mb-3">
        {t("labels.projected_impact")}
      </h3>

      <p className="text-sm text-neutral-400 leading-relaxed mb-5">
        {impact.intro}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {impact.metrics.map((item) => {
          const Icon = iconMap[item.icon] || TrendingUp;
          return (
            <div
              key={item.metric}
              className="flex gap-3 p-3 rounded-md bg-neutral-900/60 border border-neutral-800/40"
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-emerald-500/80" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold text-white leading-tight">
                  {item.value}
                </div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wide mt-0.5">
                  {item.metric}
                </div>
                <p className="text-xs text-neutral-300 leading-snug mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] italic text-neutral-400 mt-4">
        {impact.methodology_note}
      </p>
    </div>
  );
}
