"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Stethoscope, Scale, ShoppingBag, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";

const iconMap: Record<string, any> = {
  medical: Stethoscope,
  legal: Scale,
  ecommerce: ShoppingBag,
  finance: TrendingUp,
};

export function AIAutomationShowcase() {
  const t = useTranslations("AIAutomationShowcase");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const items = t.raw("use_cases") as Array<{
    industry: string;
    icon: string;
    problem: string;
    solution: string;
    result: string;
  }>;

  const visibleItems = isExpanded ? items : items.slice(0, 2);

  return (
    <section className="w-full px-6 md:px-8 py-24 bg-neutral-950 border-t border-b border-neutral-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-mono text-xs tracking-widest uppercase font-bold">
            {t("pre_title")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 max-w-2xl mx-auto italic">
            &ldquo;{t("subtitle")}&rdquo;
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-6 relative">
            <div className="absolute inset-0 blur-3xl bg-emerald-500/5 -z-10" />
            <p className="text-neutral-400 text-lg max-w-3xl mx-auto leading-relaxed border-l-2 border-emerald-500/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
              {t("intro")}
            </p>
          </motion.div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.industry}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: isExpanded ? 0 : index * 0.1 }}
                className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60 transition-all duration-300 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    {(() => {
                      const Icon = iconMap[item.icon] || TrendingUp;
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {item.industry}
                  </h3>
                </div>

                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="text-neutral-500 text-xs uppercase font-mono tracking-widest mb-1">
                      {t("problem_label")}
                    </p>
                    <p className="text-neutral-300">{item.problem}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-emerald-500/70 text-xs uppercase font-mono tracking-widest mb-1">
                      {t("solution_label")}
                    </p>
                    <p className="text-white font-medium">{item.solution}</p>
                  </div>

                  <div>
                    <p className="text-neutral-500 text-xs uppercase font-mono tracking-widest mb-1">
                      {t("result_label")}
                    </p>
                    <p className="text-white font-bold text-lg">{item.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand Toggle Button */}
        <div className="flex justify-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative px-8 py-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-emerald-500/30 text-neutral-400 hover:text-emerald-500 transition-all duration-300 gap-3">
            <span className="font-bold tracking-tight uppercase text-xs">
              {isExpanded ? t("see_less") : t("see_more")}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            )}
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
          </Button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6">
            <p className="text-white text-xl md:text-2xl font-bold mb-2">
              {t("cta_question")}
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-10 text-lg bg-white text-black hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Link href="/contact">{t("cta")}</Link>
            </Button>

            <p className="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              {t("closing_statement")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
