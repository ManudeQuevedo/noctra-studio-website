"use client";

import { Fragment, useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { useMessages } from "next-intl";
import {
  CalendarDays,
  Check,
  CreditCard,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  SoftwareEcosystemSection,
  type SoftwareEcosystemMessages,
} from "@/components/services/SoftwareEcosystemSection";

type PackageCard = {
  id: string;
  name: string;
  stage: string;
  price: string;
  delivery: string;
  payment: string;
  deliverables: string[];
  promise: string;
  featured: boolean;
};

type AddonTier = {
  tier: string;
  price: string;
  summary: string;
  featured: boolean;
};

type Addon = {
  name: string;
  tiers: AddonTier[];
};

type BundleTier = {
  name: string;
  price: string;
  savings: string;
  featured: boolean;
};

type ThesisStep = {
  number: string;
  name: string;
  sub: string;
};

type ServicesCatalogMessages = {
  hero: {
    headline_line1: string;
    headline_line2: string;
    subheadline: string;
    cta: string;
  };
  thesis: {
    section_label: string;
    problem: { label: string; body: string[] };
    method: { label: string; body: string[]; steps: ThesisStep[] };
    guarantee: {
      label: string;
      headline: string;
      body: string[];
      closing: string;
    };
  };
  software: SoftwareEcosystemMessages;
  projects: {
    label: string;
    intro: string;
    popular_badge: string;
    packages: PackageCard[];
  };
  subscriptions: {
    label: string;
    intro: string;
    addons: Addon[];
  };
  bundle: {
    label: string;
    description: string;
    popular_badge: string;
    tiers: BundleTier[];
  };
  payments: {
    section_label: string;
    headline: string;
    subheadline: string;
    cards: {
      transfer: { title: string; detail: string };
      card: { title: string; detail: string };
      msi: { title: string; detail: string };
    };
    pricing_title: string;
    pricing_intro: string;
    pricing_rows: {
      name: string;
      msi?: string;
      or?: string;
      cash?: string;
      savings?: string;
      below_threshold?: string;
    }[];
  };
  footer_cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  sticky: {
    label: string;
    cta: string;
  };
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
} as const;

function cardShellClass(featured: boolean) {
  return featured
    ? "rounded-2xl border border-emerald-500/40 bg-white/[0.07] p-6 shadow-[0_0_40px_-20px_rgba(16,185,129,0.35)] md:p-8"
    : "rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8";
}

export default function ServicesClient() {
  const messages = useMessages() as unknown as {
    ServicesCatalog: ServicesCatalogMessages;
  };
  const c = messages.ServicesCatalog;
  const thesis = c.thesis;
  const contactRef = useRef<HTMLDivElement>(null);
  const isContactInView = useInView(contactRef, { amount: 0.2 });

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative min-h-screen overflow-x-clip bg-transparent pb-28 pt-40 selection:bg-emerald-500/30 md:pt-44 lg:pt-48">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-144 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.07),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-20 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* HERO — full first viewport below header so pricing starts after scroll */}
        <section className="relative flex min-h-[calc(100svh-10rem)] flex-col justify-center overflow-hidden px-6 py-12 md:min-h-[calc(100svh-11rem)] md:px-8 md:py-16 lg:min-h-[calc(100svh-12rem)] lg:py-20">
          {/* Darken center so headline reads over any global/grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_32%,rgba(0,0,0,0.42)_0%,transparent_70%)]"
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
            <m.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-pretty text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            >
              <span className="block">{c.hero.headline_line1}</span>
              <span className="block">{c.hero.headline_line2}</span>
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mx-auto mt-6 max-w-3xl text-pretty text-xl font-semibold leading-snug text-white/60 sm:mt-8 sm:text-2xl md:mt-10 md:text-3xl lg:mt-12 lg:leading-tight"
            >
              {c.hero.subheadline}
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-12 sm:mt-14 md:mt-16"
            >
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-white px-10 text-base font-semibold text-black hover:bg-white/90 md:h-16 md:px-12 md:text-lg"
              >
                <Link href="/diagnostico">{c.hero.cta}</Link>
              </Button>
            </m.div>
          </div>
        </section>

        {/* 00 THESIS — approach before pricing */}
        <section className="border-t border-white/5 px-6 pt-24 pb-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mx-auto max-w-2xl text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
                {thesis.section_label}
              </p>

              <div className="mt-12 space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-white/30">
                  {thesis.problem.label}
                </p>
                {thesis.problem.body.map((paragraph, i) => (
                  <p
                    key={`problem-${i}`}
                    className="text-pretty text-base leading-relaxed text-white/70 md:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="my-12 h-px w-12 bg-white/10" aria-hidden />

              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-white/30">
                  {thesis.method.label}
                </p>
                {thesis.method.body.map((paragraph, i) => (
                  <p
                    key={`method-${i}`}
                    className="text-pretty text-base leading-relaxed text-white/70 md:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <ul className="mt-10 flex flex-col gap-6 md:hidden">
                {thesis.method.steps.map((step) => (
                  <li key={step.number}>
                    <p className="text-sm font-medium text-white">
                      <span className="mr-2 text-xs font-mono uppercase tracking-widest text-white/30">
                        {step.number}
                      </span>
                      {step.name}
                    </p>
                    <p className="mt-1 text-xs text-white/50">{step.sub}</p>
                  </li>
                ))}
              </ul>

              <div
                className="mt-10 hidden md:flex md:items-stretch"
                role="list"
                aria-label={thesis.method.label}
              >
                {thesis.method.steps.map((step, index) => (
                  <Fragment key={step.number}>
                    <div
                      role="listitem"
                      className="min-w-0 flex-[2_1_0%] space-y-1.5"
                    >
                      <p className="text-sm font-medium text-white">
                        <span className="mr-2 text-xs font-mono uppercase tracking-widest text-white/30">
                          {step.number}
                        </span>
                        {step.name}
                      </p>
                      <p className="text-xs text-white/50">{step.sub}</p>
                    </div>
                    {index < thesis.method.steps.length - 1 ? (
                      <div
                        className="flex min-w-2 flex-1 items-center justify-center px-1"
                        aria-hidden
                      >
                        <div className="h-px w-full bg-white/10" />
                      </div>
                    ) : null}
                  </Fragment>
                ))}
              </div>

              <div className="my-12 h-px w-12 bg-white/10" aria-hidden />

              <div className="rounded-2xl border border-white/8 bg-white/3 p-8">
                <p className="text-xs font-mono uppercase tracking-widest text-white/30">
                  {thesis.guarantee.label}
                </p>
                <div className="mt-4 flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-pretty text-xl font-semibold leading-snug text-white md:text-2xl">
                      {thesis.guarantee.headline}
                    </h2>
                    <div className="mt-4 space-y-3">
                      {thesis.guarantee.body.map((paragraph, i) => (
                        <p
                          key={`guarantee-${i}`}
                          className="text-pretty text-base leading-relaxed text-white/70 md:text-[17px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <p className="mt-4 text-xs italic text-white/40">
                      {thesis.guarantee.closing}
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        <SoftwareEcosystemSection data={c.software} />

        {/* 01 PROJECTS */}
        <section className="border-t border-white/5 px-6 pb-20 pt-24 md:px-8 md:pb-24 md:pt-32">
          <div className="mx-auto mb-16 flex justify-center md:mb-20">
            <div className="h-px w-16 bg-white/10" aria-hidden />
          </div>
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mb-12 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
                {c.projects.label}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">
                {c.projects.intro}
              </p>
            </m.div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {c.projects.packages.map((pkg) => (
                <m.article
                  key={pkg.id}
                  {...fadeIn}
                  className={`relative flex flex-col ${cardShellClass(pkg.featured)}`}
                >
                  {pkg.featured && (
                    <span className="absolute right-4 top-4 inline-flex rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                      {c.projects.popular_badge}
                    </span>
                  )}
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    {pkg.stage}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                    {pkg.name}
                  </h2>
                  <p className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {pkg.price}
                  </p>
                  <p className="mt-2 text-sm text-white/45">{pkg.delivery}</p>
                  <p className="mt-1 text-sm text-white/45">{pkg.payment}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3 text-left">
                    {pkg.deliverables.map((line) => (
                      <li
                        key={line}
                        className="flex gap-2 text-sm leading-snug text-white/75 md:text-[15px]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 border-l-2 border-emerald-500/60 pl-4 text-sm italic leading-relaxed text-white/60 md:text-base">
                    {pkg.promise}
                  </p>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        {/* 02 SUBSCRIPTIONS */}
        <section className="border-t border-white/5 px-6 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mb-14 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
                {c.subscriptions.label}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">
                {c.subscriptions.intro}
              </p>
            </m.div>

            <div className="space-y-16 md:space-y-20">
              {c.subscriptions.addons.map((addon) => (
                <m.div key={addon.name} {...fadeIn}>
                  <h3 className="mb-6 text-xl font-black text-white md:text-2xl">
                    {addon.name}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {addon.tiers.map((tier) => (
                      <div
                        key={tier.tier}
                        className={`flex flex-col ${cardShellClass(tier.featured)}`}
                      >
                        {tier.featured && (
                          <span className="mb-3 inline-flex w-fit rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                            {c.projects.popular_badge}
                          </span>
                        )}
                        <p className="text-sm font-bold uppercase tracking-wide text-white/50">
                          {tier.tier}
                        </p>
                        <p className="mt-2 text-xl font-bold text-white md:text-2xl">
                          {tier.price}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                          {tier.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 BUNDLE */}
        <section className="border-t border-white/5 px-6 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mb-12 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
                {c.bundle.label}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">
                {c.bundle.description}
              </p>
            </m.div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {c.bundle.tiers.map((tier) => (
                <m.div
                  key={tier.name}
                  {...fadeIn}
                  className={`flex flex-col ${cardShellClass(tier.featured)}`}
                >
                  {tier.featured && (
                    <span className="mb-3 inline-flex w-fit rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                      {c.bundle.popular_badge}
                    </span>
                  )}
                  <p className="text-lg font-black text-white">{tier.name}</p>
                  <p className="mt-3 text-2xl font-bold text-white md:text-3xl">
                    {tier.price}
                  </p>
                  <p className="mt-3 text-sm font-medium text-emerald-300/90 md:text-base">
                    {tier.savings}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 PAYMENTS */}
        <section className="border-t border-white/5 px-6 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <m.div {...fadeIn} className="mb-12 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">
                {c.payments.section_label}
              </p>
              <h2 className="mt-4 text-2xl font-black leading-tight text-white md:text-3xl">
                {c.payments.headline}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">
                {c.payments.subheadline}
              </p>
            </m.div>

            <div className="grid gap-4 md:grid-cols-3">
              <m.article
                {...fadeIn}
                className="rounded-2xl border-[0.5px] border-white/8 bg-white/3 p-6 transition-colors duration-200 hover:border-white/15"
              >
                <Landmark
                  className="h-5 w-5 text-white/60"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h3 className="mt-4 text-base font-semibold text-white">
                  {c.payments.cards.transfer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {c.payments.cards.transfer.detail}
                </p>
              </m.article>

              <m.article
                {...fadeIn}
                className="group rounded-2xl border-[0.5px] border-white/8 bg-white/3 p-6 transition-colors duration-200 hover:border-white/15"
              >
                <CreditCard
                  className="h-5 w-5 text-white/60"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h3 className="mt-4 text-base font-semibold text-white">
                  {c.payments.cards.card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {c.payments.cards.card.detail}
                </p>
                <img
                  src="/images/stripe-logo.svg"
                  alt="Stripe"
                  className="mt-2 h-5 w-auto opacity-40 transition-opacity duration-200 group-hover:opacity-70"
                />
              </m.article>

              <m.article
                {...fadeIn}
                className="rounded-2xl border-[0.5px] border-white/8 bg-white/3 p-6 transition-colors duration-200 hover:border-white/15"
              >
                <CalendarDays
                  className="h-5 w-5 text-white/60"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h3 className="mt-4 text-base font-semibold text-white">
                  {c.payments.cards.msi.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {c.payments.cards.msi.detail}
                </p>
              </m.article>
            </div>

            <m.div
              {...fadeIn}
              className="mt-10 rounded-2xl border border-white/6 bg-white/2 px-5 py-6 md:px-8 md:py-7"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                {c.payments.pricing_title}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/50">
                {c.payments.pricing_intro}
              </p>
              <ul className="mt-5 space-y-4">
                {c.payments.pricing_rows.map((row) =>
                  row.below_threshold ? (
                    <li
                      key={row.name}
                      className="text-pretty border-t border-white/6 pt-4 leading-relaxed"
                    >
                      <span className="text-sm font-medium text-white">
                        {row.name}
                      </span>
                      <span className="text-sm text-white/60">
                        {" "}
                        — {row.below_threshold}
                      </span>
                    </li>
                  ) : (
                    <li key={row.name} className="text-pretty leading-relaxed">
                      <span className="text-sm font-medium text-white">
                        {row.name}
                      </span>
                      <span className="text-sm text-white/70">
                        {" "}
                        — {row.msi}
                      </span>{" "}
                      <span className="mx-2 text-xs text-white/30">
                        {row.or}
                      </span>{" "}
                      <span className="text-sm font-medium text-white">
                        {row.cash}
                      </span>{" "}
                      <span className="text-xs text-green-400/70">
                        {row.savings}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </m.div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section
          ref={contactRef}
          className="border-t border-white/5 px-6 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-3xl rounded-4xl border border-emerald-500/25 bg-linear-to-br from-emerald-500/10 via-white/4 to-transparent p-8 text-center md:p-12">
            <m.div {...fadeIn}>
              <h2 className="text-2xl font-black text-white md:text-4xl">
                {c.footer_cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70">
                {c.footer_cta.subtitle}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-14 rounded-full bg-white px-8 text-base font-semibold text-black hover:bg-white/90"
              >
                <Link href="/diagnostico">{c.footer_cta.button}</Link>
              </Button>
            </m.div>
          </div>
        </section>

        {/* Sticky mobile */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4 lg:hidden">
          <m.div
            initial={{ y: 100 }}
            animate={{ y: isContactInView ? 140 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto mx-auto flex max-w-lg items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                {c.sticky.label}
              </p>
              <p className="mt-0.5 truncate text-sm font-bold text-white">
                {c.footer_cta.title}
              </p>
            </div>
            <Link
              href="/diagnostico"
              className="shrink-0 rounded-xl bg-white px-4 py-3 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-black"
            >
              {c.sticky.cta}
            </Link>
          </m.div>
        </div>
      </main>
    </LazyMotion>
  );
}
