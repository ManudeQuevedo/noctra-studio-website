"use client";

import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useInView,
} from "framer-motion";
import { Link } from "@/i18n/routing";
import NextImage from "next/image";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  Check,
  ExternalLink,
  GraduationCap,
  Palette,
  Scale,
  Settings,
  ShoppingBag,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { cn } from "@/lib/utils";
import { PhaseSelector } from "@/components/services/PhaseSelector";
import { SmartCTA } from "@/components/services/SmartCTA";
import { BaselineStandardsSection } from "@/components/services/BaselineStandardsSection";
import { Button } from "@/components/ui/button";

const SERVICE_IMAGES = {
  web_dev: "/images/architecture.jpg",
  ecommerce: "/images/woodax.jpg",
  branding: "/images/identity.jpg",
  seo: "/images/seo.jpg",
  ai: "/images/ai.jpg",
};

const CONTACT_INTENTS: Record<string, string> = {
  web_dev: "web_presence",
  ecommerce: "ecommerce",
  branding: "branding",
  seo: "visibility",
  ai: "automation",
};

const ICON_MAP: Record<string, any> = {
  "👨‍⚕️": Stethoscope,
  "⚖️": Scale,
  "💼": Briefcase,
  "🏢": Building2,
  "🎓": GraduationCap,
  "🛍️": ShoppingBag,
  "🎨": Palette,
  "⚙️": Settings,
  "💄": Sparkles,
};

interface Phase {
  id: string;
  label: string;
}

interface AudienceItem {
  icon: string;
  text: string;
}

interface ContentItem {
  title: string;
  description: string;
}

const MobileServicesSlider = ({
  phases,
  activePhase,
  setActivePhase,
  t,
}: {
  phases: Phase[];
  activePhase: string;
  setActivePhase: (id: string) => void;
  t: ReturnType<typeof useTranslations>;
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);

  const minSwipeDistance = 40;
  const activeIdx = phases.findIndex((phase) => phase.id === activePhase);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowHint(false), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  const goTo = (idx: number) => {
    const nextPhase = phases[idx]?.id;
    if (!nextPhase) return;

    setActivePhase(nextPhase);

    const tabEl = document.getElementById(`mobile-tab-${nextPhase}`);
    tabEl?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0]?.clientX ?? null);
    setShowHint(false);
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.targetTouches[0]?.clientX ?? null);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIdx < phases.length - 1) {
      goTo(activeIdx + 1);
    }

    if (isRightSwipe && activeIdx > 0) {
      goTo(activeIdx - 1);
    }
  };

  return (
    <div className="mb-16 flex w-full flex-col overflow-hidden pt-8 md:hidden">
      <div className="mb-8 w-full px-6">
        <div className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-4 scrollbar-none">
          {phases.map((phase, idx) => {
            const isActive = phase.id === activePhase;

            return (
              <button
                key={phase.id}
                id={`mobile-tab-${phase.id}`}
                onClick={() => goTo(idx)}
                className={cn(
                  "min-h-[44px] shrink-0 snap-center rounded-full px-4 transition-colors",
                  "flex items-center gap-2",
                  isActive
                    ? "border-[1.5px] border-emerald-500 bg-emerald-500/20"
                    : "border border-neutral-800 bg-neutral-900 text-neutral-400",
                )}>
                <span
                  className={cn(
                    "font-mono text-xs font-bold",
                    isActive ? "text-emerald-500" : "text-neutral-300",
                  )}>
                  0{idx + 1}
                </span>
                <span
                  className={cn(
                    "text-xs font-black uppercase tracking-widest",
                    isActive && "text-white",
                  )}>
                  {phase.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden px-6"
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}>
        <div
          className="flex flex-row transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}>
          {phases.map((phase) => {
            const serviceKey = phase.id;
            const highlights = t.raw(`${serviceKey}.highlights`) as string[];
            const industries = (t.raw(`best_for.${serviceKey}`) as AudienceItem[])
              .slice(0, 3);

            return (
              <div
                key={phase.id}
                className="w-full shrink-0 pr-4 last:pr-0"
                style={{ width: "100%" }}>
                <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-neutral-800 bg-[#161616]">
                  <div className="relative h-[170px] w-full overflow-hidden">
                    <NextImage
                      src={
                        SERVICE_IMAGES[serviceKey as keyof typeof SERVICE_IMAGES]
                      }
                      alt={t(`${serviceKey}.title`)}
                      fill
                      className="object-cover grayscale contrast-125 brightness-75 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/60 to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {t(`${serviceKey}.benefit_short`)}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block rounded-sm bg-emerald-500 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-black">
                        {t(`${serviceKey}.image_label`)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {t(`${serviceKey}.title`)}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                      {t(`${serviceKey}.summary`)}
                    </p>

                    <div className="mb-6 space-y-3">
                      {highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-sm text-neutral-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-8 flex flex-wrap gap-2">
                      {industries.map((item) => (
                        <span
                          key={item.text}
                          className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300">
                          {item.text}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-3">
                      <Link
                        href={{
                          pathname: "/contact",
                          query: {
                            intent: CONTACT_INTENTS[serviceKey] ?? "discovery",
                            cta: `services_${serviceKey}`,
                          },
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-black uppercase tracking-widest text-black transition-transform active:scale-95">
                        {t("capabilities.primary_cta")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/work"
                        className="flex h-[52px] w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-neutral-300 transition-transform active:scale-95">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-4 mt-8 flex items-center justify-center gap-2">
        {phases.map((phase, idx) => (
          <div
            key={phase.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === activeIdx ? "w-6 bg-emerald-500" : "w-1.5 bg-neutral-800",
            )}
          />
        ))}
      </div>

      <div className="flex h-6 justify-center">
        <AnimatePresence>
          {showHint && (
            <m.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 font-mono text-[10px] text-neutral-300">
              {t("capabilities.swipe_hint")}
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-6 mt-8 flex flex-col gap-8 rounded-[24px] border border-[#1e1e1e] bg-[#111111] p-8">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xl font-black leading-tight tracking-tight text-white">
            {t("mobile_banner.question")}
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-500">
            {t("mobile_banner.subtitle")}
          </span>
        </div>
        <Link
          href={{ pathname: "/contact", query: { intent: "discovery" } }}
          className="w-full rounded-2xl bg-emerald-500 py-5 text-center text-xs font-black uppercase tracking-[0.15em] text-black shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] hover:bg-emerald-400">
          {t("mobile_banner.cta")}
        </Link>
      </div>
    </div>
  );
};

const HowWeHelpSection = () => {
  const t = useTranslations("ServicesPage.how_we_help");
  const items = t.raw("items") as ContentItem[];

  return (
    <section className="px-6 pb-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
            {t("label")}
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-400 md:text-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-neutral-800 bg-neutral-900/20 p-8 backdrop-blur-sm">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                0{index + 1}
              </div>
              <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="leading-relaxed text-neutral-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceSection = ({
  serviceKey,
  image,
}: {
  serviceKey: string;
  image: string;
}) => {
  const t = useTranslations("ServicesPage");
  const industries = t.raw(`best_for.${serviceKey}`) as AudienceItem[];
  const highlights = t.raw(`${serviceKey}.highlights`) as string[];

  const detailCards = [
    {
      label: t("capabilities.cards.what_it_is"),
      value: t(`${serviceKey}.what_it_is`),
    },
    {
      label: t("capabilities.cards.why_it_matters"),
      value: t(`${serviceKey}.why_it_matters`),
    },
    {
      label: t("capabilities.cards.business_benefit"),
      value: t(`${serviceKey}.business_benefit`),
    },
  ];

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-7xl px-6 md:px-8">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-24">
        <div className="relative group md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-neutral-800 shadow-2xl">
            <NextImage
              src={image}
              alt={t(`${serviceKey}.title`)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale brightness-75 contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

            <div className="absolute right-6 top-6">
              <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-2xl backdrop-blur-md">
                {t(`${serviceKey}.benefit_short`)}
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-xl">
              <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                {t(`${serviceKey}.image_label`)}
              </span>
              <h3 className="mb-3 text-2xl font-bold text-white">
                {t(`${serviceKey}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                {t(`${serviceKey}.summary`)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 md:col-span-7">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
              {t("capabilities.detail_label")}
            </span>
            <h3 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              {t(`${serviceKey}.title`)}
            </h3>
            <p className="max-w-3xl text-lg leading-relaxed text-neutral-400">
              {t(`${serviceKey}.summary`)}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {detailCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[2rem] border border-neutral-800 bg-white/[0.02] p-6">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-500">
                  {card.label}
                </p>
                <p className="leading-relaxed text-neutral-300">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4 text-sm text-neutral-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-neutral-800 pt-8">
            <Link
              href={{
                pathname: "/contact",
                query: {
                  intent: CONTACT_INTENTS[serviceKey] ?? "discovery",
                  cta: `services_${serviceKey}`,
                },
              }}
              className="flex items-center gap-3 rounded-xl bg-emerald-500 px-8 py-5 text-sm font-black uppercase tracking-widest text-black shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-400 active:scale-95">
              {t("capabilities.primary_cta")}
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/work"
              className="flex items-center gap-2 text-sm font-bold text-neutral-300 transition-colors hover:text-white">
              {t("capabilities.secondary_cta")}
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-neutral-800 pt-8">
            <h4 className="mb-8 text-[10px] font-black uppercase tracking-widest text-neutral-300">
              {t("best_for.label")}
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {industries.map((item) => {
                const Icon = ICON_MAP[item.icon] || Briefcase;

                return (
                  <div
                    key={item.text}
                    className="group/industry flex items-center gap-4 rounded-xl border border-neutral-800/50 bg-white/[0.01] p-4 transition-all hover:border-emerald-500/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-emerald-500 transition-all group-hover/industry:bg-emerald-500 group-hover/industry:text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-neutral-300 transition-colors group-hover/industry:text-white">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

const IndustriesSection = () => {
  const t = useTranslations("ServicesPage.industries");
  const items = t.raw("items") as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
            {t("label")}
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] || Briefcase;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-neutral-800 bg-neutral-900/20 p-8 backdrop-blur-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-neutral-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ROITeaserSection = () => {
  const t = useTranslations("ServicesPage.roi_teaser");

  return (
    <section className="px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[3rem] border border-neutral-800 bg-white/[0.02] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
              {t("label")}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-400">
              {t("subtitle")}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/[0.06] bg-neutral-950/80 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              <Calculator className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="space-y-4">
              {(t.raw("points") as string[]).map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 text-sm text-neutral-300 md:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/custom-pricing"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white">
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MiniProcessSection = () => {
  const t = useTranslations("ServicesPage.mini_process");
  const steps = t.raw("steps") as ContentItem[];

  return (
    <section className="px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[3rem] border border-neutral-800 bg-neutral-900/30 p-8 backdrop-blur-sm md:p-12">
        <div className="mb-12 max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
            {t("label")}
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-6">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                0{index + 1}
              </div>
              <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="leading-relaxed text-neutral-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function ServicesClient() {
  const [activeTab, setActiveTab] = useState("web_dev");
  const t = useTranslations("ServicesPage");
  const standards = t.raw("standards.items") as Array<{
    value: string;
    description: string;
  }>;
  const contactRef = useRef<HTMLDivElement>(null);
  const isContactInView = useInView(contactRef, { amount: 0.1 });

  const phases: Phase[] = [
    { id: "web_dev", label: t("journey.phases.web_dev") },
    { id: "ecommerce", label: t("journey.phases.ecommerce") },
    { id: "branding", label: t("journey.phases.branding") },
    { id: "seo", label: t("journey.phases.seo") },
    { id: "ai", label: t("journey.phases.ai") },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative z-0 min-h-screen bg-transparent pb-0 pt-48 selection:bg-emerald-500/30">
        <section className="mx-auto mb-24 w-full max-w-7xl px-6 text-center md:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-500 backdrop-blur-md">
              {t("hero_badge")}
            </span>
            <h1 className="mb-8 mt-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-5xl font-black leading-none tracking-tight text-transparent md:text-[8rem]">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-4xl px-4 text-xl font-medium leading-relaxed text-neutral-400 md:text-3xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-10 sm:flex-row">
              <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-white px-8 text-base text-black transition-colors duration-300 hover:bg-neutral-200">
                  <Link
                    href={{
                      pathname: "/contact",
                      query: { intent: "discovery", cta: "services_hero" },
                    }}>
                    {t("hero_cta_consult")}
                  </Link>
                </Button>
              </m.div>
              <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("capabilities")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="h-12 rounded-full border-neutral-800 px-8 text-base text-neutral-400 transition-all duration-300 hover:border-white hover:bg-transparent hover:text-white">
                  {t("hero_cta_pricing")}
                </Button>
              </m.div>
            </div>
          </m.div>
        </section>

        <HowWeHelpSection />

        <section
          id="capabilities"
          className="mx-auto mb-20 w-full max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
              {t("capabilities.label")}
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
              {t("capabilities.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-400">
              {t("capabilities.subtitle")}
            </p>
          </div>
        </section>

        <div className="hidden md:block">
          <PhaseSelector
            phases={phases}
            activePhase={activeTab}
            setActivePhase={setActiveTab}
          />
        </div>

        <div className="hidden md:block">
          <section className="mb-32 min-h-[760px] w-full scroll-mt-48">
            <AnimatePresence mode="wait">
              <ServiceSection
                key={activeTab}
                serviceKey={activeTab}
                image={SERVICE_IMAGES[activeTab as keyof typeof SERVICE_IMAGES]}
              />
            </AnimatePresence>
          </section>
        </div>

        <MobileServicesSlider
          phases={phases}
          activePhase={activeTab}
          setActivePhase={setActiveTab}
          t={t}
        />

        <div className="relative left-1/2 mb-32 w-screen -translate-x-1/2 border-y border-neutral-800 bg-neutral-950 py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
                {t("standards.label")}
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                {t("standards.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-400">
                {t("standards.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-8">
              {standards.map((item, index) => (
                <div
                  key={item.value}
                  className="group space-y-4 rounded-[2rem] border border-white/[0.05] bg-white/[0.02] p-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
                    STANDARD 0{index + 1}
                  </span>
                  <div className="text-3xl font-black tracking-tight text-white transition-colors group-hover:text-emerald-400 md:text-5xl">
                    {item.value}
                  </div>
                  <p className="mx-auto max-w-sm leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BaselineStandardsSection />

        <ROITeaserSection />

        <IndustriesSection />

        <MiniProcessSection />

        <div
          id="contact"
          ref={contactRef}
          className="mx-auto max-w-7xl scroll-mt-32 px-6 pb-32 md:px-8">
          <SmartCTA activePhase={activeTab} />
        </div>

        <div className="pointer-events-none fixed bottom-0 left-0 w-full p-4 lg:hidden z-50">
          <m.div
            initial={{ y: 100 }}
            animate={{ y: isContactInView ? 150 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-900/90 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">
                {t("capabilities.label")}
              </span>
              <span className="text-xs font-bold text-white">
                {t(`${activeTab}.title`)}
              </span>
            </div>
            <Link
              href={{
                pathname: "/contact",
                query: {
                  intent: CONTACT_INTENTS[activeTab] ?? "discovery",
                  cta: `services_sticky_${activeTab}`,
                },
              }}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-black">
              {t("smart_cta.primary_cta")}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </m.div>
        </div>
      </main>
    </LazyMotion>
  );
}
