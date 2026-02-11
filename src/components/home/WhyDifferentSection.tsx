"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User, Eye, ShieldCheck, Code2 } from "lucide-react";

const icons = [User, Eye, ShieldCheck, Code2];

export function WhyDifferentSection() {
  const t = useTranslations("WhyDifferent");
  const items = t.raw("items") as Array<{
    title: string;
    benefit: string;
    proof: string;
  }>;

  return (
    <section className="w-full px-6 md:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl border border-neutral-800 bg-neutral-950/50 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-white/70" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {item.benefit}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-neutral-500 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.proof}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
