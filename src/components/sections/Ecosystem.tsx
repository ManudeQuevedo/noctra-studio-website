"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Layers, ShieldCheck, Users, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const viewport = { once: true, margin: "-10%" } as const;
const cardViewport = { once: true, margin: "-10%" } as const;

type ProductStatus = "active" | "coming_soon";

type EcosystemProduct = {
  id: string;
  status: ProductStatus;
  badge: string;
  name: string;
  category?: string;
  description: string;
  managed_line?: string;
  internal_note?: string;
  icon?: "layers";
  cta_app?: "radar";
  cta_label?: string;
};

type OwnershipStat = {
  value: string;
  label: string;
};

const activeBadgeClass =
  "text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20";

const comingSoonBadgeClass =
  "text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10";

export function Ecosystem() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const products = t.raw("ecosystem.products") as unknown as EcosystemProduct[];
  const ownershipStats = t.raw(
    "ecosystem.ownership_stats",
  ) as unknown as OwnershipStat[];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="radar"
        className="scroll-mt-28 bg-transparent px-6 py-20 md:px-8 md:py-[120px]">
        <div className="mx-auto max-w-6xl">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={viewport}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-400 will-change-transform">
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
            className="mb-12 text-base text-neutral-400 will-change-transform md:mb-16 md:text-lg">
            {t("ecosystem.subtitle")}
          </m.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.map((item, i) => {
              const isActive = item.status === "active";

              return (
                <m.div
                  key={item.id}
                  id={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                  viewport={cardViewport}
                  className={[
                    "scroll-mt-32 rounded-2xl border border-white/8 bg-white/3 p-6 will-change-transform",
                    isActive
                      ? "transition-colors duration-200 hover:border-white/15"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}>
                  {item.icon === "layers" ? (
                    <div className="flex items-start justify-between gap-3">
                      <Layers
                        size={24}
                        className="shrink-0 text-white/40"
                        aria-hidden
                      />
                      <span
                        className={
                          isActive ? activeBadgeClass : comingSoonBadgeClass
                        }>
                        {item.badge}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <span
                        className={
                          isActive ? activeBadgeClass : comingSoonBadgeClass
                        }>
                        {item.badge}
                      </span>
                    </div>
                  )}

                  <p className="mt-4 text-lg font-semibold text-white">
                    {item.name}
                  </p>

                  {item.category ? (
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-emerald-400/90">
                      {item.category}
                    </p>
                  ) : null}

                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-400">
                    {item.description}
                  </p>

                  {item.internal_note ? (
                    <p className="mt-3 text-xs italic text-white/30">
                      {item.internal_note}
                    </p>
                  ) : null}

                  {item.managed_line ? (
                    <p className="mt-3 flex items-center gap-1 text-xs text-white/40">
                      <Users
                        size={12}
                        className="flex-shrink-0 text-white/40"
                        aria-hidden
                      />
                      {item.managed_line}
                    </p>
                  ) : null}

                  {item.cta_label && item.cta_app === "radar" ? (
                    <a
                      href={`https://radar.noctra.studio/${locale}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-[13px] font-medium text-emerald-400/95 underline decoration-emerald-500/30 underline-offset-4 transition-colors hover:text-emerald-300 hover:decoration-emerald-400/60">
                      {item.cta_label}
                    </a>
                  ) : null}
                </m.div>
              );
            })}
          </div>

          <m.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            viewport={viewport}
            className="mx-auto mt-6 flex max-w-lg items-start justify-center gap-2 border-t border-white/5 pt-6 text-center text-xs text-white/30">
            <Zap
              size={14}
              className="mt-0.5 flex-shrink-0 text-white/20"
              aria-hidden
            />
            <p className="min-w-0 flex-1 text-center text-pretty">{t("ecosystem.ai_costs")}</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={viewport}
            className="mt-6 rounded-2xl border-[0.5px] border-white/8 bg-white/3 p-6 md:p-8">
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
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
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
