"use client";

import { useTranslations } from "next-intl";
import { Code2, Palette, Bot, LineChart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

export function ServicesGrid() {
  const t = useTranslations("Services");

  const services = [
    {
      id: "web",
      title: t("web_dev_title"),
      description: t("web_dev_desc"),
      icon: Code2,
    },
    {
      id: "branding",
      title: t("branding_title"),
      description: t("branding_desc"),
      icon: Palette,
    },
    {
      id: "ai",
      title: t("ai_title"),
      description: t("ai_desc"),
      icon: Bot,
    },
    {
      id: "seo",
      title: t("seo_title"),
      description: t("seo_desc"),
      icon: LineChart,
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-8 py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          // WHAT WE CRAFT
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          Digital Solutions That Scale
        </h2>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          From concept to deployment, we architect experiences that endure.
        </p>
      </motion.div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {services.map((service, index) => (
          <Link href="/services" key={service.id} className="block h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "group relative flex flex-col justify-between p-8 h-full",
                "bg-transparent border border-neutral-200 dark:border-neutral-800",
                "rounded-xl transition-all duration-300",
                "hover:border-neutral-900 dark:hover:border-white hover:shadow-lg"
              )}>
              <div>
                <div className="mb-6">
                  <service.icon
                    strokeWidth={1.5}
                    className="w-10 h-10 text-neutral-900 dark:text-white transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Arrow Icon for affordance */}
              <div className="absolute top-8 right-8 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-neutral-900 dark:text-white" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 flex justify-center">
        <Link
          href="/services"
          className={cn(
            "group flex items-center gap-2 px-8 py-3 rounded-full",
            "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
            "font-medium transition-transform duration-300 hover:scale-105"
          )}>
          {t("explore_capabilities")}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
