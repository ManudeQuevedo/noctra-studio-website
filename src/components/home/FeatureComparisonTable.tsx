"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComparisonColumn {
  id: string;
  name: string;
  subtitle: string;
  highlighted?: boolean;
}

interface ComparisonRow {
  criteria: string;
  values: string[];
}

export function FeatureComparisonTable() {
  const t = useTranslations("Pricing.feature_comparison");

  const columns = t.raw("columns") as ComparisonColumn[];
  const rows = t.raw("rows") as ComparisonRow[];
  const recommendedBadge = t("recommended_badge");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm shadow-2xl">
      {/* Table label */}
      <div className="px-6 pt-6 pb-4 border-b border-neutral-800/60">
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
          {/* Compare options at a glance */}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table
          className="w-full text-left border-collapse"
          style={{ minWidth: "640px" }}>
          {/* Column Headers */}
          <thead>
            <tr className="border-b border-neutral-800">
              {/* Criteria label column */}
              <th className="p-5 w-[180px] bg-neutral-950/40" />
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "p-5 text-center border-l border-neutral-800/50",
                    col.highlighted ? "bg-emerald-950/40" : "bg-neutral-950/30",
                  )}>
                  {col.highlighted && (
                    <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest">
                      {recommendedBadge}
                    </span>
                  )}
                  <div
                    className={cn(
                      "text-sm font-black uppercase tracking-tight leading-tight",
                      col.highlighted ? "text-emerald-400" : "text-white",
                    )}>
                    {col.name}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 font-medium">
                    {col.subtitle}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={cn(
                  "border-b border-neutral-800/40 hover:bg-white/[0.015] transition-colors",
                  rowIdx === rows.length - 1 && "border-0",
                  rowIdx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]",
                )}>
                {/* Criteria name */}
                <td className="p-5 text-sm font-semibold text-neutral-300 bg-neutral-950/20">
                  {row.criteria}
                </td>

                {/* Cell values */}
                {row.values.map((val, valIdx) => {
                  const isNoctra = columns[valIdx]?.highlighted;
                  const isCheckmark = val.startsWith("✓");
                  const displayVal = isCheckmark ? val.slice(2) : val;

                  return (
                    <td
                      key={valIdx}
                      className={cn(
                        "p-5 text-center border-l border-neutral-800/50",
                        isNoctra ? "bg-emerald-950/20" : "",
                      )}>
                      {isNoctra ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="text-xs font-semibold text-emerald-300 leading-snug max-w-[140px]">
                            {displayVal}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-400 leading-snug block max-w-[140px] mx-auto">
                          {val}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
