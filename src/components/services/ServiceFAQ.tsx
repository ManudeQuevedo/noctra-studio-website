"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceFAQ() {
  const t = useTranslations("ServicesPage.faq");
  const items = t.raw("items") as Array<{ question: string; answer: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            {t("title")}
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "rounded-2xl border transition-all duration-300",
                openIndex === i 
                  ? "border-emerald-500/30 bg-emerald-500/[0.02]" 
                  : "border-neutral-800 bg-neutral-900/20 hover:border-neutral-700"
              )}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={cn(
                  "font-bold text-lg transition-colors",
                  openIndex === i ? "text-emerald-400" : "text-white"
                )}>
                  {item.question}
                </span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-neutral-500 transition-transform duration-300",
                  openIndex === i && "rotate-180 text-emerald-400"
                )} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
