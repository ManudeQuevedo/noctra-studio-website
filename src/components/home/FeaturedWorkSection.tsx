"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

export function FeaturedWorkSection() {
  const t = useTranslations("FeaturedWork");

  const projects = [
    {
      key: "cafe_aurora",
      image: "/images/cafe-aurora.jpg",
      metric: "300% faster load time",
      href: "/work/cafe-aurora",
    },
    {
      key: "strongfit",
      image: "/images/strongfit.jpg",
      metric: "Scalable Membership System",
      href: "/work/strongfit",
    },
  ];

  return (
    <section className="py-24 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {t("title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <Link
              href="/work"
              className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
              {t("view_all")}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-video overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
              <NextImage
                src={project.image}
                alt={t(`projects.${project.key}.title`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t(`projects.${project.key}.title`)}
                </h3>
                <p className="text-emerald-400 font-mono text-sm uppercase tracking-wider">
                  {project.metric}
                </p>
              </div>

              <Link
                href={project.href as any}
                className="absolute inset-0 z-10">
                <span className="sr-only">
                  View {t(`projects.${project.key}.title`)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
            {t("view_all")}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
