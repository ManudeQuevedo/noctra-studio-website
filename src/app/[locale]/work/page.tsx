"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

export default function WorkPage() {
  const t = useTranslations("WorkPage");

  const projects = [
    {
      key: "cafe_aurora",
      image: "/images/cafe-aurora-preview.jpg", // Placeholder
      tags: ["Next.js", "Headless CMS", "E-commerce"],
    },
    {
      key: "strongfit",
      image: "/images/strongfit-preview.jpg", // Placeholder
      tags: ["Web App", "Stripe", "Dashboard"],
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Image */}
                <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                </div>

                {/* Content */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono uppercase tracking-wider border border-neutral-800 rounded-full text-neutral-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-4xl font-bold">
                      {t(`projects.${project.key}.title`)}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-2">
                        The Problem
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {t(`projects.${project.key}.problem`)}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-widest mb-2">
                        The Solution
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {t(`projects.${project.key}.solution`)}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-neutral-800">
                      <div className="text-3xl font-bold text-white mb-1">
                        {t(`projects.${project.key}.metric_value`)}
                      </div>
                      <div className="text-sm font-mono text-neutral-500 uppercase tracking-wider">
                        {t(`projects.${project.key}.metric_label`)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
