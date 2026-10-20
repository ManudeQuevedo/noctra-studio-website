"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  FileSignature,
  Layers,
  PenLine,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  homeSectionContainerClass,
  homeSectionKickerClass,
} from "@/components/home/homeSectionFrame";

const viewport = { once: true, margin: "-10%" } as const;

type OpsModule = {
  title: string;
  description: string;
};

type OwnershipStat = {
  value: string;
  label: string;
};

// Same order as NoctraOps.modules in messages: visibility, content, sales, clients.
const MODULE_ICONS: readonly (typeof Layers)[] = [
  BarChart3,
  PenLine,
  FileSignature,
  Users,
];

export const NOCTRA_OPS_ANCHOR = "noctra-ops";

export function Ecosystem() {
  const t = useTranslations("HomePage");
  const ops = useTranslations("NoctraOps");
  const modules = ops.raw("modules") as OpsModule[];
  const ownershipStats = t.raw(
    "ecosystem.ownership_stats",
  ) as unknown as OwnershipStat[];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id={NOCTRA_OPS_ANCHOR}
        className="scroll-mt-28 bg-transparent pt-20 pb-24 md:pt-[120px] md:pb-24">
        {/* Legacy anchors: old links to /#radar and /#social land here. */}
        <span id="radar" className="sr-only" aria-hidden />
        <span id="social" className="sr-only" aria-hidden />

        <div className={homeSectionContainerClass}>
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={viewport}
            className={`${homeSectionKickerClass} will-change-transform`}>
            {t("ecosystem.kicker")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            viewport={viewport}
            className="mb-4 text-3xl font-bold tracking-tight text-white will-change-transform md:text-4xl">
            {t("ecosystem.title")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            viewport={viewport}
            className="mb-12 max-w-3xl text-base text-neutral-400 will-change-transform md:mb-16 md:text-lg">
            {t("ecosystem.subtitle")}
          </m.p>

          <m.article
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={viewport}
            className="grid grid-cols-1 gap-8 rounded-2xl border border-white/8 bg-white/3 p-6 will-change-transform md:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <Layers
                  size={22}
                  className="shrink-0 text-white/50"
                  aria-hidden
                />
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
                  {ops("badge")}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-white">
                {ops("name")}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-emerald-400/90">
                {ops("category")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400 md:text-[15px]">
                {ops("description")}
              </p>
              <p className="mt-4 text-xs text-white/40">
                {ops("plan_availability")}
              </p>

              <div className="mt-6 lg:mt-auto lg:pt-8">
                <Link
                  href={{
                    pathname: "/contact",
                    query: { intent: "noctra_ops", cta: "home_ecosystem" },
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 text-sm font-medium text-emerald-300 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400">
                  {ops("waitlist_cta")}
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <p className="mt-3 text-xs text-white/30">
                  {ops("launch_note")}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                {ops("modules_label")}
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {modules.map((module, i) => {
                  const Icon = MODULE_ICONS[i] ?? Layers;
                  return (
                    <li
                      key={module.title}
                      className="rounded-xl border border-white/6 bg-white/3 p-4">
                      <div className="flex items-center gap-2">
                        <Icon
                          size={16}
                          className="shrink-0 text-white/60"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <p className="text-sm font-semibold text-white">
                          {module.title}
                        </p>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-neutral-400">
                        {module.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </m.article>

          <m.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            viewport={viewport}
            className="mx-auto mt-8 flex max-w-lg items-start justify-center gap-2 border-t border-white/5 pt-6 text-center text-xs text-white/30">
            <Zap
              size={14}
              className="mt-0.5 shrink-0 text-white/20"
              aria-hidden
            />
            <p className="min-w-0 flex-1 text-center text-pretty">
              {t("ecosystem.ai_costs")}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={viewport}
            className="mt-6 rounded-2xl border border-white/8 bg-white/3 p-6 md:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl flex-1">
                <ShieldCheck
                  size={20}
                  className="text-green-400/70"
                  aria-hidden
                />
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {t("ecosystem.ownership.headline")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
                  {t("ecosystem.ownership.copy")}
                </p>
              </div>

              <div className="flex flex-wrap gap-8 md:flex-nowrap md:justify-end">
                {ownershipStats.map((stat) => (
                  <div key={stat.value + stat.label} className="min-w-[5.5rem]">
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
