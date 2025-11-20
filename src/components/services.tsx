"use client";

import { useTranslations } from "next-intl";
import { Code2, Palette, LineChart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

export function Services() {
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
      id: "seo",
      title: t("seo_title"),
      description: t("seo_desc"),
      icon: LineChart,
    },
  ];

  return (
    <section
      id="services"
      className="w-full max-w-5xl mx-auto px-6 md:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          {t("section_title")}
        </h2>
        <div className="h-1 w-20 bg-neutral-900 dark:bg-white rounded-full mx-auto md:mx-0" />
      </motion.div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn(
              "group relative flex flex-col justify-between p-8 md:p-10",
              "bg-transparent border border-neutral-200 dark:border-neutral-800",
              "rounded-md transition-all duration-300",
              "hover:border-neutral-900 dark:hover:border-white hover:-translate-y-1 hover:shadow-lg"
            )}>
            <div>
              {/* Icon */}
              <div className="mb-8">
                <service.icon
                  strokeWidth={1.5}
                  className="w-12 h-12 text-neutral-900 dark:text-white transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16 flex justify-center">
        <Link
          href="/contact"
          className={cn(
            "group flex items-center gap-2 px-8 py-3 rounded-full",
            "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
            "font-medium transition-transform duration-300 hover:scale-105"
          )}>
          {t("lets_talk")}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
