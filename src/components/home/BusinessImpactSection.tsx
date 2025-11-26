"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, Layers } from "lucide-react";

export function BusinessImpactSection() {
  const t = useTranslations("BusinessImpact");

  const metrics = [
    {
      key: "hosting",
      icon: Layers,
      value: "40%",
      label: "Reduction in Hosting Costs",
    },
    {
      key: "conversion",
      icon: TrendingUp,
      value: "2.5x",
      label: "Increase in Conversion",
    },
    {
      key: "ops",
      icon: Clock,
      value: "20h+",
      label: "Saved Weekly on Ops",
    },
    {
      key: "tools",
      icon: Shield,
      value: "100%",
      label: "Data Ownership",
    },
  ];

  return (
    <section className="py-24 bg-neutral-950 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {t("title")}
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors">
                <metric.icon className="w-6 h-6 text-neutral-500 mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-neutral-400 font-mono uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
