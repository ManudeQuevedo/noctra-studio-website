"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Stethoscope, Scale, ShoppingBag, TrendingUp } from "lucide-react";

const iconMap: Record<string, any> = {
  medical: Stethoscope,
  legal: Scale,
  ecommerce: ShoppingBag,
  finance: TrendingUp,
};

export function AIAutomationShowcase() {
  const t = useTranslations("AIAutomationShowcase");
  const items = t.raw("use_cases") as Array<{
    industry: string;
    icon: string;
    problem: string;
    solution: string;
    result: string;
  }>;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6">
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
