"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Home,
  Rocket,
} from "lucide-react";

const icons = [
  BriefcaseBusiness,
  Building2,
  Rocket,
  GraduationCap,
  Home,
];

export function AudienceSection() {
  const t = useTranslations("HomePage.solutions");
  const items = t.raw("items") as Array<{
    title: string;
    pain: string;
    outcome: string;
    support: string;
  }>;

  return (
    <LazyMotion features={domAnimation}>
      <section id="segments" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-4xl space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-400 md:text-xl">
              {t("subtitle")}
            </p>
          </m.div>

          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item, index) => {
              const Icon = icons[index] ?? Building2;
              
              // Define bento grid spans
              const spans = [
                "md:col-span-2", // Profesionistas (Wide)
                "md:row-span-2", // Real Estate (Tall)
                "md:col-span-1", // Escuelas (Square)
                "md:col-span-1", // PyMEs (Square)
                "md:col-span-3", // Startups (Full Width)
              ];

              return (
                <m.article
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] ${spans[index] || ""}`}>
                  
                  {/* Decorative background intensity */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/5 blur-[80px] transition-opacity group-hover:opacity-100" />
                  
                  <div className="relative z-10">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-black/40 shadow-inner group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 transition-colors">
                      <Icon className="h-6 w-6 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    
                    <h3 className="mb-6 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      {item.title}
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                          {t("pain_label")}
                        </p>
                        <p className="text-base leading-relaxed text-neutral-400">
                          {item.pain}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                          {t("outcome_label")}
                        </p>
                        <p className="text-base leading-relaxed text-neutral-300">
                          {item.outcome}
                        </p>
                      </div>

                      <div className="mt-8 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5 backdrop-blur-sm group-hover:border-emerald-400/20 transition-colors">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                          {t("support_label")}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-200">
                          {item.support}
                        </p>
                      </div>
                    </div>
                  </div>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
