"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldAlert,
  Terminal,
  Cpu,
  Palette,
  TrendingUp,
} from "lucide-react";
import { OperationalDirectives } from "@/components/about/operational-directives";

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

export function JoinNetwork() {
  const t = useTranslations("JoinNetwork");

  const roles = [
    {
      id: "frontend",
      icon: Terminal,
      title: t("roles.frontend"),
    },
    {
      id: "design",
      icon: Palette,
      title: t("roles.design"),
    },
    {
      id: "growth",
      icon: TrendingUp,
      title: t("roles.growth"),
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* 1. Header Section */}
        <div className="mb-16 md:mb-24">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-neutral-900 dark:text-white">
              {t("title")}
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* 2. The Noctra Standard (The Filter) */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-sm border border-amber-500/20 bg-neutral-900/90 p-8 md:p-12">
                {/* Warning Accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-amber-500/50 to-transparent" />

                <div className="flex items-center gap-3 mb-8 text-amber-500/80">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-widest">
                    {t("manifesto.title")}
                  </span>
                </div>

                <div className="space-y-8">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="group">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                        <span className="text-xs font-mono text-amber-500/50">
                          0{index + 1} //
                        </span>
                        {t(`manifesto.items.${index}.title`)}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed pl-10 border-l border-neutral-800 group-hover:border-amber-500/20 transition-colors duration-300">
                        {t(`manifesto.items.${index}.desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 3. Open Roles & Application (The Grid) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <FadeIn delay={0.4}>
              <div className="grid gap-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="group relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 transition-all hover:border-neutral-900 dark:hover:border-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                          <role.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {role.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                        {t("roles.apply")} <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* 4. Application UI */}
            <FadeIn delay={0.6}>
              <div className="mt-8 space-y-6">
                {/* Operational Directives (Filter) */}
                <OperationalDirectives />

                {/* CTA */}
                <div className="p-6 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 text-center">
                  <button className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity mb-4 flex items-center justify-center gap-2 group">
                    {t("cta.button")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-xs text-neutral-500 font-mono uppercase tracking-wide">
                    {t("cta.disclaimer")}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
