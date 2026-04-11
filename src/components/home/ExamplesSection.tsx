"use client";

import { LazyMotion, domAnimation, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Compass, DraftingCompass, Repeat } from "lucide-react";
import { Link } from "@/i18n/routing";

const cardIcons = [Compass, DraftingCompass, Repeat];

export function ExamplesSection() {
  const t = useTranslations("HomeExamples");
  const cards = t.raw("cards") as Array<{
    label: string;
    title: string;
    description: string;
  }>;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="proof"
        className="border-y border-white/5 bg-white/[0.02] px-6 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-4xl space-y-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-300 md:text-xl">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((item, index) => {
              const Icon = cardIcons[index] ?? DraftingCompass;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[1.9rem] border border-neutral-800 bg-neutral-950/90 p-6 md:p-7"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                      {item.label}
                    </p>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex flex-col gap-5 rounded-[1.9rem] border border-white/8 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between md:p-7"
          >
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              {t("closing")}
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-emerald-300"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
}
