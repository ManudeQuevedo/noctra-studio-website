"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuiz } from "../quiz/QuizContext";
import { Link } from "@/i18n/routing";

export function ComparisonTable() {
  const t = useTranslations("ServicesPage.comparison");
  const { openQuiz } = useQuiz();
  const labels = t.raw("labels") as string[];
  const features = t.raw("features") as Array<{
    name: string;
    values: (string | boolean)[];
  }>;

  const [openRow, setOpenRow] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-neutral-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-neutral-400 text-lg">{t("subtitle")}</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/50">
                <th className="p-8 text-xs font-black text-neutral-500 uppercase tracking-widest w-1/4">
                  Feature
                </th>
                {labels.map((label, i) => (
                  <th
                    key={i}
                    className="p-8 text-center text-sm font-black text-white uppercase tracking-widest">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {features.map((feature, i) => (
                <tr
                  key={i}
                  className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 font-bold text-neutral-300 group-hover:text-white transition-colors">
                    {feature.name}
                  </td>
                  {feature.values.map((val, j) => (
                    <td key={j} className="p-8 text-center">
                      {typeof val === "boolean" ? (
                        val ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <Minus className="w-5 h-5 text-neutral-700 mx-auto" />
                        )
                      ) : (
                        <span
                          className={cn(
                            "text-sm font-medium",
                            j === 0
                              ? "text-neutral-400"
                              : j === 1
                                ? "text-neutral-300"
                                : "text-emerald-400",
                          )}>
                          {val}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/20 overflow-hidden">
              <button
                onClick={() => setOpenRow(openRow === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left">
                <span className="font-bold text-white">{feature.name}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-neutral-500 transition-transform",
                    openRow === i && "rotate-180 text-emerald-500",
                  )}
                />
              </button>
              <AnimatePresence>
                {openRow === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 border-t border-neutral-800/50 pt-4">
                    <div className="grid grid-cols-1 gap-3">
                      {labels.map((label, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-between text-sm py-1">
                          <span className="text-neutral-500 font-medium uppercase tracking-widest text-[10px]">
                            {label}
                          </span>
                          <span className="text-white font-bold">
                            {typeof feature.values[j] === "boolean"
                              ? feature.values[j]
                                ? "✓"
                                : "-"
                              : feature.values[j]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-500 text-sm mb-6">{t("footer_text")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-emerald-50 transition-colors">
              {t("cta_consult")}
            </Link>
            <button
              onClick={openQuiz}
              className="w-full sm:w-auto px-8 py-3 rounded-xl border border-neutral-800 text-white font-bold text-sm hover:border-neutral-600 transition-colors">
              {t("cta_quiz")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
