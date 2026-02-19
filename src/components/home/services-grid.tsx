"use client";

import { useTranslations } from "next-intl";
import {
  Code2,
  Palette,
  Bot,
  LineChart,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

import Image from "next/image";

interface ServicesGridProps {
  images?: Record<string, string | null>;
}

/**
 * ServicesGrid
 * Purpose: Showcases the main service offerings in a grid layout.
 * Key Features:
 * - Hover effects on service cards
 * - Responsive grid (1 col mobile, 2 col desktop)
 * - Linking to detailed service pages
 */
export function ServicesGrid({ images }: ServicesGridProps) {
  const t = useTranslations("Services");
  const tHome = useTranslations("HomePage");

  const services = [
    {
      id: "web",
      title: t("web_dev_title"),
      description: t("web_dev_desc"),
      icon: Code2,
      image: images?.web,
    },
    {
      id: "branding",
      title: t("branding_title"),
      description: t("branding_desc"),
      icon: Palette,
      image: images?.branding,
    },
    {
      id: "ai",
      title: t("ai_title"),
      description: t("ai_desc"),
      icon: Bot,
      image: images?.ai,
    },
    {
      id: "seo",
      title: t("seo_title"),
      description: t("seo_desc"),
      icon: LineChart,
      image: images?.seo,
    },
    {
      id: "ongoing",
      title: t("ongoing_title"),
      description: t("ongoing_desc"),
      icon: ShieldCheck,
      image: images?.ongoing,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-16 space-y-4">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          {tHome("services_section.label")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          {tHome("services_section.title")}
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {tHome("services_section.subtitle")}
        </p>
      </motion.div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const anchorMap: Record<string, string> = {
            web: "web-dev",
            branding: "visual-identity",
            ai: "ai",
            seo: "seo",
            ongoing: "ongoing",
          };
          return (
            <Link
              href={{ pathname: "/services", hash: anchorMap[service.id] }}
              key={service.id}
              className="block h-full">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 border border-white/10 p-8 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] h-full flex flex-col cursor-pointer">
                {/* Background Image */}
                {service.image && (
                  <>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent opacity-90" />
                  </>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 inline-flex text-white group-hover:text-emerald-400 transition-colors duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-emerald-50 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-base text-neutral-400 leading-relaxed mb-8 group-hover:text-neutral-300 transition-colors flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center text-sm font-bold text-emerald-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-auto">
                    <span className="mr-2 uppercase tracking-widest text-[10px]">
                      {t("learn_more")}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}>
          <Link
            href="/services"
            className={cn(
              "group flex items-center gap-2 px-8 py-3 rounded-full",
              "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
              "font-medium transition-transform duration-300",
            )}>
            {t("explore_capabilities")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
