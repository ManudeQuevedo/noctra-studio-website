"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Bot,
  MonitorSmartphone,
  Search,
  SwatchBook,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const icons = [SwatchBook, MonitorSmartphone, Search, Bot];

export function CapabilitiesSection() {
  const t = useTranslations("HomePage.services_section");
  const tCaps = useTranslations("HomeCapabilities");
  const rawItems = tCaps.raw("items") as
    | Array<{
        title: string;
        description: string;
        points: string[];
      }>
    | Record<
        string,
        {
          title: string;
          description: string;
          points: string[];
        }
      >;
  const items = Array.isArray(rawItems)
    ? rawItems
    : Object.values(rawItems ?? {});

  const normalizedItems = items as Array<{
    title: string;
    description: string;
    points: string[];
  }>;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="capabilities"
        className="border-t border-white/5 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-3xl space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-400 md:text-xl">
              {t("subtitle")}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              {t("intro")}
            </p>
          </m.div>

          <div className="grid gap-6 md:grid-cols-2">
            {normalizedItems.map((item, index) => {
              const Icon = icons[index] ?? Workflow;

              return (
                <m.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group rounded-[2rem] border border-neutral-800 bg-neutral-950/80 p-8 transition-colors duration-300 hover:border-emerald-500/30">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-neutral-400 md:text-lg">
                      {item.description}
                    </p>
                    <ul className="space-y-3 border-t border-white/5 pt-6">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-neutral-300 md:text-base">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.article>
              );
            })}
          </div>

          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-white px-8 text-base font-bold text-black transition-all duration-300 hover:bg-emerald-500 hover:text-white"
            >
              <Link
                href={{
                  pathname: "/contact",
                  query: { tipo: "consulta", origen: "home-services" },
                }}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
