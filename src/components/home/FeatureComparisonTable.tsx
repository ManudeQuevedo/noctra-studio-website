"use client";

import { useTranslations } from "next-intl";
import { Check, X, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  name: string;
  values: (string | boolean)[];
}

export function FeatureComparisonTable() {
  const t = useTranslations("Pricing.feature_comparison");
  
  const columns = t.raw("columns") as string[];
  const rows = t.raw("rows") as ComparisonRow[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="p-6 text-sm font-bold text-neutral-500 uppercase tracking-widest bg-neutral-950/40">
                {/* Feature Name Column */}
              </th>
              {columns.map((col, idx) => (
                <th key={idx} className="p-6 text-center bg-neutral-950/40">
                  <span className="text-base font-black text-white uppercase tracking-tight">
                    {col}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className={cn(
                  "border-b border-neutral-800/50 hover:bg-white/[0.02] transition-colors",
                  rowIdx === rows.length - 1 && "border-0"
                )}>
                <td className="p-6 text-sm font-medium text-neutral-300">
                  {row.name}
                </td>
                {row.values.map((val, valIdx) => (
                  <td key={valIdx} className="p-6 text-center">
                    <div className="flex justify-center items-center">
                      {typeof val === "boolean" ? (
                        val ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-neutral-700" />
                        )
                      ) : (
                        <span className={cn(
                          "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                          val === "Optional" || val === "Opcional" 
                            ? "bg-neutral-800 text-neutral-400" 
                            : "bg-white/5 text-white"
                        )}>
                          {val}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
