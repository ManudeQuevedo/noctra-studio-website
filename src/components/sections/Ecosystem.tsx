"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";

const viewport = { once: true, margin: "-50px" } as const;

type BadgeStatus = "active" | "in_dev" | "flagship" | "mvp";

type EcosystemItem = {
  name: string;
  layer: string;
  badge: string;
  description: string;
  flagship_line?: string;
};

type ItemConfig = {
  number: string;
  status: BadgeStatus;
  wide: boolean;
};

const itemConfigs: ItemConfig[] = [
  { number: "01", status: "active",   wide: false },
  { number: "02", status: "flagship", wide: true  },
  { number: "03", status: "in_dev",   wide: false },
  { number: "04", status: "in_dev",   wide: false },
  { number: "05", status: "active",   wide: false },
  { number: "06", status: "active",   wide: false },
  { number: "07", status: "mvp",      wide: false },
];

const badgeClass: Record<BadgeStatus, string> = {
  active:   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  in_dev:   "bg-white/[0.04] text-[#C8B8A2] border border-[#C8B8A2]/20",
  flagship: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/50",
  mvp:      "bg-white/[0.03] text-neutral-500 border border-white/10",
};

export function Ecosystem() {
  const t = useTranslations("HomePage");
  const items = t.raw("ecosystem.items") as unknown as EcosystemItem[];

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-transparent px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">

          <m.p
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={viewport}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400">
            {t("ecosystem.kicker")}
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            viewport={viewport}
            className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t("ecosystem.title")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            viewport={viewport}
            className="mb-12 text-base text-neutral-400 md:mb-16 md:text-lg">
            {t("ecosystem.subtitle")}
          </m.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {items.map((item, i) => {
              const cfg = itemConfigs[i];
              const isFlagship = cfg.status === "flagship";

              return (
                <m.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={viewport}
                  className={[
                    "rounded-xl border p-6 transition-all duration-200",
                    cfg.wide ? "md:col-span-2" : "",
                    isFlagship
                      ? "border-emerald-500/40 bg-gradient-to-br from-[#0a0b13] to-emerald-500/5"
                      : "border-white/[0.08] bg-[rgba(16,185,129,0.03)] hover:-translate-y-0.5 hover:border-emerald-500/30",
                  ]
                    .filter(Boolean)
                    .join(" ")}>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-normal text-white/20">
                      {cfg.number}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] ${badgeClass[cfg.status]}`}>
                      {isFlagship && (
                        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                      )}
                      {item.badge}
                    </span>
                  </div>

                  <p className={`mt-4 font-semibold text-white ${cfg.wide ? "text-xl" : "text-lg"}`}>
                    {item.name}
                  </p>

                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                    {item.layer}
                  </p>

                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-400">
                    {item.description}
                  </p>

                  {item.flagship_line && (
                    <p className="mt-4 text-[12px] font-medium text-emerald-400">
                      {item.flagship_line}
                    </p>
                  )}
                </m.div>
              );
            })}
          </div>

          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={viewport}
            className="mt-8 text-center text-[12px] text-neutral-500">
            {t("ecosystem.footnote")}
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
