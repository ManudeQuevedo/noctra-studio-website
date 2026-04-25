"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

/* ─── Primitive: fade in on scroll ─── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
      {children}
    </span>
  );
}

/* ─── Horizontal rule ─── */
function Divider() {
  return <hr className="border-neutral-900" />;
}

type FailureMode = {
  number: string;
  title: string;
  body: string;
};

type Principle = {
  index: string;
  title: string;
  description: string;
};

type SystemStage = {
  step: string;
  title: string;
  description: string;
};

type Outcome = {
  word: string;
  body: string;
};

export default function ProfessionalWebsitesClient() {
  const t = useTranslations("ProfessionalWebsitesPage");
  const heroTitle = t.raw("hero.title") as Record<string, string>;
  const failureModes = t.raw("sections.why.failureModes") as FailureMode[];
  const principles = t.raw("sections.how.principles") as Principle[];
  const entryPoints = t.raw("sections.systemView.entryPoints") as string[];
  const systemFlow = t.raw("sections.systemView.flow") as SystemStage[];
  const outcomes = t.raw("sections.outcomes.items") as Outcome[];

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section className="relative flex min-h-[92vh] flex-col justify-end px-6 pb-20 pt-32 md:px-16 lg:px-24">
          {/* Background grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "200px 200px",
            }}
          />

          <div className="relative mx-auto w-full max-w-6xl">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SectionLabel>{t("hero.eyebrow")}</SectionLabel>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="mt-8 max-w-5xl text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[1.02] tracking-[-0.04em] text-white"
            >
              <span className="block">{heroTitle.line1}</span>
              <span className="block">{heroTitle.line2}</span>
              <span className="block text-neutral-500">
                {heroTitle.line3}
              </span>
              {heroTitle.line4 ? (
                <span className="block text-neutral-500">
                  {heroTitle.line4}
                </span>
              ) : null}
            </m.h1>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <Link
                href={{
                  pathname: "/contact",
                  query: { intent: "professional-websites" },
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-emerald-400"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </m.div>

            {/* Scroll cue */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-0 right-0 hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-700"
            >
              <span>{t("hero.scrollCue")}</span>
              <div className="h-px w-12 bg-neutral-800" />
            </m.div>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════
            01 — WHAT
        ════════════════════════════════════════════ */}
        <section className="px-6 py-24 md:px-16 lg:px-24 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">

              {/* Label column */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Reveal className="flex flex-col gap-3 pt-1">
                  <SectionLabel>{t("sections.what.label")}</SectionLabel>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {t("sections.what.sideNote")}
                  </p>
                </Reveal>
              </div>

              {/* Content column */}
              <div className="space-y-10">
                <Reveal>
                  <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                    {t("sections.what.title")}
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="text-lg leading-relaxed text-neutral-400">
                    {t("sections.what.body")}
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <blockquote className="border-l-2 border-white/20 pl-8">
                    <p className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                      &ldquo;{t("sections.what.quote")}&rdquo;
                    </p>
                    <footer className="mt-4 text-sm italic text-muted-foreground">
                      — {t("sections.what.quoteAttribution")}
                    </footer>
                  </blockquote>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════
            02 — WHY
        ════════════════════════════════════════════ */}
        <section className="px-6 py-24 md:px-16 lg:px-24 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">

              {/* Label column */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Reveal className="flex flex-col gap-3 pt-1">
                  <SectionLabel>{t("sections.why.label")}</SectionLabel>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {t("sections.why.sideNote")}
                  </p>
                </Reveal>
              </div>

              {/* Content column */}
              <div className="space-y-16">
                <Reveal>
                  <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                    {t("sections.why.title")}
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="text-lg leading-relaxed text-neutral-400">
                    {t("sections.why.intro")}
                  </p>
                </Reveal>

                {/* Three failure modes — editorial */}
                <div className="space-y-12">
                  {failureModes.map((item, i) => (
                    <Reveal key={item.number} delay={i * 0.1}>
                      <div className="grid gap-6 md:grid-cols-[64px_1fr]">
                        <span className="font-mono text-5xl font-black text-neutral-800 leading-none">
                          {item.number}
                        </span>
                        <div className="space-y-4 pt-2">
                          <h3 className="text-2xl font-bold text-white md:text-3xl">
                            {item.title}
                          </h3>
                          <p className="text-lg leading-relaxed text-neutral-400">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════
            03 — HOW
        ════════════════════════════════════════════ */}
        <section className="px-6 py-24 md:px-16 lg:px-24 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">

              {/* Label column */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Reveal className="flex flex-col gap-3 pt-1">
                  <SectionLabel>{t("sections.how.label")}</SectionLabel>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {t("sections.how.sideNote")}
                  </p>
                </Reveal>
              </div>

              {/* Content column */}
              <div className="space-y-16">
                <Reveal>
                  <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                    {t("sections.how.title")}
                    <br />
                    <span className="text-neutral-500">
                      {t("sections.how.titleAccent")}
                    </span>
                  </h2>
                </Reveal>

                {/* Four principles */}
                <div className="space-y-0 divide-y divide-neutral-900">
                  {principles.map((item, i) => (
                    <Reveal key={item.index} delay={i * 0.08}>
                      <div className="grid gap-6 py-10 md:grid-cols-[80px_1fr]">
                        <span className="font-mono text-sm font-bold text-neutral-600 tracking-widest pt-1">
                          {item.index}
                        </span>
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-white md:text-2xl">
                            {item.title}
                          </h3>
                          <p className="text-base leading-relaxed text-neutral-400 md:text-lg">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════
            04 — SYSTEM VIEW
        ════════════════════════════════════════════ */}
        <section className="px-6 py-24 md:px-16 lg:px-24 lg:py-36">
          <div className="mx-auto max-w-6xl">

            <Reveal>
              <SectionLabel>{t("sections.systemView.label")}</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-8 max-w-4xl text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                {t("sections.systemView.title")}
                <br />
                <span className="text-neutral-500">
                  {t("sections.systemView.titleAccent")}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
                {t("sections.systemView.description")}
              </p>
            </Reveal>

            {/* System diagram — dominant funnel */}
            <Reveal delay={0.3}>
              <div className="mx-auto mt-20 w-full max-w-6xl rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.45)] md:p-10 lg:p-14">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
                  {systemFlow.map((stage, index) => {
                    const isFinalStage = index === systemFlow.length - 1;
                    const cardTone = isFinalStage
                      ? "bg-emerald-500/[0.08]"
                      : index === 0
                        ? "bg-white/[0.03]"
                        : "bg-white/[0.05]";

                    return (
                      <div
                        key={stage.step}
                        className="flex flex-col gap-4 lg:flex-row lg:flex-1 lg:items-stretch"
                      >
                        <div
                          className={`flex min-h-[220px] flex-1 flex-col rounded-lg border border-white/10 p-6 ${cardTone}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/80">
                              {stage.step}
                            </div>
                            <span className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                              Etapa
                            </span>
                          </div>

                          <div className="mt-8">
                            <h3 className="text-2xl font-bold text-white">
                              {stage.title}
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-neutral-400">
                              {stage.description}
                            </p>
                          </div>

                          {index === 0 ? (
                            <div className="mt-auto pt-6">
                              <div className="flex flex-wrap gap-2">
                                {entryPoints.map((source) => (
                                  <span
                                    key={source}
                                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400"
                                  >
                                    {source}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>

                        {index < systemFlow.length - 1 ? (
                          <div className="flex items-center justify-center py-1 lg:px-1">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                              <ArrowRight className="h-4 w-4 text-white/60 rotate-90 lg:rotate-0" />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-10 text-center text-xs font-mono text-neutral-700">
                  {t("sections.systemView.note")}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════
            05 — WHAT THIS CREATES
        ════════════════════════════════════════════ */}
        <section className="px-6 py-24 md:px-16 lg:px-24 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">

              {/* Label column */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Reveal className="flex flex-col gap-3 pt-1">
                  <SectionLabel>{t("sections.outcomes.label")}</SectionLabel>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {t("sections.outcomes.sideNote")}
                  </p>
                </Reveal>
              </div>

              {/* Content column */}
              <div className="space-y-16">
                <Reveal>
                  <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                    {t("sections.outcomes.title")}
                  </h2>
                </Reveal>

                <div className="space-y-14">
                  {outcomes.map((item, i) => (
                    <Reveal key={item.word} delay={i * 0.1}>
                      <div className="space-y-5">
                        <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tight text-white leading-none">
                          {item.word}
                        </h3>
                        <p className="max-w-lg text-lg leading-relaxed text-neutral-400">
                          {item.body}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ════════════════════════════════════════════
            06 — CTA
        ════════════════════════════════════════════ */}
        <section className="px-6 py-32 md:px-16 lg:px-24 lg:py-48">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <SectionLabel>{t("sections.cta.label")}</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-8 text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[1.04] tracking-[-0.04em] text-white">
                {t("sections.cta.title.line1")}
                <br />
                {t("sections.cta.title.line2")}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-400 md:text-xl">
                {t("sections.cta.description")}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mb-8 mt-10 text-center">
                <p className="text-sm text-muted-foreground">
                  {t("sections.cta.pricing.label")}{" "}
                  <strong className="text-white">
                    {t("sections.cta.pricing.amount")}
                  </strong>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("sections.cta.pricing.note")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={{ pathname: "/contact", query: { intent: "professional-websites" } }}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-bold text-black transition-all hover:bg-emerald-400"
                >
                  {t("sections.cta.primaryCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-3 rounded-full border border-neutral-800 px-10 py-5 text-base font-semibold text-neutral-400 transition-all hover:border-neutral-600 hover:text-white"
                >
                  {t("sections.cta.secondaryCta")}
                </Link>
              </div>
            </Reveal>

            {/* Bottom signature */}
            <Reveal delay={0.45}>
              <div className="mt-24 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-900" />
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-700">
                  {t("sections.cta.signature")}
                </span>
                <div className="h-px flex-1 bg-neutral-900" />
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
