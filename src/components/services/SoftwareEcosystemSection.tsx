"use client";

import { m } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code,
  Database,
  Key,
  Layers,
  Monitor,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export type AccessMatrixColumn = {
  tier: "base" | "presence" | "system";
  name: string;
  price_hint: string;
  included: string[];
  excluded: string[];
  note: string;
};

export type SoftwareProductOptions = {
  option_a_title: string;
  option_a_description: string;
  option_b_title: string;
  option_b_description: string;
  option_b_badge: string;
};

export type SoftwareEcosystemMessages = {
  section_label: string;
  headline: string;
  subheadline: string;
  access_matrix: {
    title: string;
    columns: AccessMatrixColumn[];
  };
  ops: {
    status: string;
  } & SoftwareProductOptions;
  ai_costs: string;
  ownership_quote: string;
  ownership_points: string[];
  ownership_closing: string;
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.5 },
} as const;

const productCardClass =
  "rounded-2xl border border-white/8 bg-white/3 p-6 md:p-8";

const optionShellClass = "rounded-xl bg-white/5 p-4";

const optionBadgeClass =
  "mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/40";

function SubsectionRule() {
  return (
    <div className="mx-auto my-10 h-px w-12 bg-white/10" aria-hidden />
  );
}

function columnShellClass(tier: AccessMatrixColumn["tier"]) {
  if (tier === "base") {
    return "rounded-2xl border border-white/8 bg-white/3 p-6";
  }
  if (tier === "presence") {
    return "rounded-2xl border border-white/15 bg-white/3 p-6";
  }
  return "rounded-2xl border border-white/20 bg-white/5 p-6";
}

function ProductOptionsBlock({
  option_a_title,
  option_a_description,
  option_b_title,
  option_b_description,
  option_b_badge,
}: SoftwareProductOptions) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
      <div className={optionShellClass}>
        <div className="flex items-center gap-2">
          <Monitor
            className="h-4 w-4 shrink-0 text-white/60"
            strokeWidth={1.75}
            aria-hidden
          />
          <p className="text-sm font-semibold text-white">{option_a_title}</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/60 md:text-sm">
          {option_a_description}
        </p>
      </div>
      <div className={optionShellClass}>
        <div className="flex items-center gap-2">
          <Users
            className="h-4 w-4 shrink-0 text-white/60"
            strokeWidth={1.75}
            aria-hidden
          />
          <p className="text-sm font-semibold text-white">{option_b_title}</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/60 md:text-sm">
          {option_b_description}
        </p>
        <span className={optionBadgeClass}>{option_b_badge}</span>
      </div>
    </div>
  );
}

type OpsModule = { title: string; description: string };

function NoctraOpsCard({ data }: { data: SoftwareEcosystemMessages["ops"] }) {
  const ops = useTranslations("NoctraOps");
  const modules = ops.raw("modules") as OpsModule[];

  return (
    <m.article {...fadeIn} id="noctra-ops" className={`scroll-mt-28 ${productCardClass}`}>
      <div className="flex items-start justify-between gap-3">
        <Layers
          className="h-6 w-6 shrink-0 text-white/80"
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
          {ops("badge")}
        </span>
      </div>
      <p className="mt-3 text-xs tracking-wide text-white/30 uppercase">
        {data.status}
      </p>
      <h3 className="mt-2 text-xl font-bold text-white">{ops("name")}</h3>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-[15px]">
        {ops("description")}
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <li key={module.title} className={optionShellClass}>
            <p className="text-sm font-semibold text-white">{module.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-white/60 md:text-sm">
              {module.description}
            </p>
          </li>
        ))}
      </ul>

      <ProductOptionsBlock
        option_a_title={data.option_a_title}
        option_a_description={data.option_a_description}
        option_b_title={data.option_b_title}
        option_b_description={data.option_b_description}
        option_b_badge={data.option_b_badge}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/40">{ops("launch_note")}</p>
        <Link
          href={{
            pathname: "/contact",
            query: { intent: "noctra_ops", cta: "services_software" },
          }}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 text-sm font-medium text-emerald-300 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:self-auto">
          {ops("waitlist_cta")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </m.article>
  );
}

export function SoftwareEcosystemSection({
  data,
}: {
  data: SoftwareEcosystemMessages;
}) {
  const ownershipIcons = [Key, Database, Code] as const;

  return (
    <section className="border-t border-white/5 px-6 pt-24 pb-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <m.div {...fadeIn} className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
            {data.section_label}
          </p>
          <h2 className="mt-6 text-pretty text-2xl font-semibold leading-snug text-white md:text-3xl">
            {data.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            {data.subheadline}
          </p>
        </m.div>

        <SubsectionRule />

        <m.div {...fadeIn}>
          <p className="mb-4 text-sm font-medium text-white/60">
            {data.access_matrix.title}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.access_matrix.columns.map((col) => (
              <div key={col.tier} className={columnShellClass(col.tier)}>
                <p className="text-base font-semibold text-white">{col.name}</p>
                <p className="mt-1 text-sm text-white/50">{col.price_hint}</p>
                <ul className="mt-4 space-y-2">
                  {col.included.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 text-sm text-green-400/70"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="leading-snug">{line}</span>
                    </li>
                  ))}
                  {col.excluded.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 text-sm text-white/20"
                    >
                      <X
                        className="mt-0.5 h-4 w-4 shrink-0"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="leading-snug">{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs italic text-white/30">{col.note}</p>
              </div>
            ))}
          </div>
        </m.div>

        <SubsectionRule />

        <NoctraOpsCard data={data.ops} />

        <div className="mx-auto mt-8 flex max-w-xl items-start justify-center gap-2 border-t border-white/5 pt-8 text-center text-xs text-white/30">
          <Zap
            size={14}
            className="mt-0.5 shrink-0 text-white/20"
            strokeWidth={1.75}
            aria-hidden
          />
          <p className="min-w-0 flex-1 text-pretty">{data.ai_costs}</p>
        </div>

        <m.div
          {...fadeIn}
          className="mt-8 rounded-2xl border-[0.5px] border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent)] p-8 md:p-10"
        >
          <p className="mb-8 text-pretty text-xl font-medium leading-relaxed text-white md:text-2xl">
            {data.ownership_quote}
          </p>
          <ul className="mx-auto max-w-lg space-y-4">
            {data.ownership_points.map((point, i) => {
              const Icon = ownershipIcons[i];
              return (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-green-400/60"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="text-pretty">{point}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-center text-sm italic text-white/30">
            {data.ownership_closing}
          </p>
        </m.div>
      </div>
    </section>
  );
}
