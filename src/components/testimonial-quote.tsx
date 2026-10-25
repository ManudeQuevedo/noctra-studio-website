import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  homeSectionContainerClass,
  homeSectionKickerClass,
} from "@/components/home/homeSectionFrame";
import type { Testimonial } from "@/content/testimonials";

type TestimonialQuoteProps = {
  testimonial: Testimonial;
  variant: "feature" | "inline";
  locale: string;
};

const caseStudyLinkClass =
  "group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/3 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-emerald-500/35 hover:bg-white/6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export async function TestimonialQuote({
  testimonial,
  variant,
  locale,
}: TestimonialQuoteProps) {
  if (testimonial.approved !== true) return null;

  const t = await getTranslations({ locale, namespace: "testimonial" });
  const quoteLocale =
    locale === "en" || locale === "es" ? locale : testimonial.originalLocale;
  const quote = testimonial.quote[quoteLocale];
  const highlight = testimonial.highlight[quoteLocale];
  const showTranslationNote = locale !== testimonial.originalLocale;
  const showWoodaxScope = testimonial.id === "woodax-adrian";

  const figure = (
    <figure
      className={
        variant === "feature"
          ? "testimonial-rise-feature mx-auto mt-16 w-full max-w-[880px] md:mt-24"
          : "testimonial-rise-inline w-full"
      }>
      {variant === "inline" ? (
        <p className={homeSectionKickerClass}>{t("label")}</p>
      ) : null}
      <div
        className={
          variant === "inline"
            ? "mx-auto w-full max-w-[880px] rounded-2xl border border-white/10 bg-card p-7 text-left md:p-12"
            : "rounded-2xl border border-white/10 bg-card p-7 text-left md:p-12"
        }>
        <span
          aria-hidden="true"
          className="block select-none text-[64px] leading-none text-emerald-400 md:text-[80px]">
          “
        </span>
        <blockquote className="m-0 mt-4">
          <p className="text-3xl font-semibold leading-[1.15] tracking-tight text-pretty text-foreground md:text-4xl">
            {highlight}
          </p>
          <p className="mt-5 text-base leading-relaxed text-pretty text-foreground/80 md:mt-6 md:text-lg">
            {quote}
          </p>
        </blockquote>
        <figcaption className="mt-8 border-t border-white/10 pt-6 md:mt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-medium text-foreground">{testimonial.author}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {testimonial.company}
              </p>
            </div>
            {showWoodaxScope ? (
              <p className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/80">
                {t("woodaxScope")}
              </p>
            ) : null}
          </div>
        </figcaption>
        {showTranslationNote ? (
          <p className="mt-4 text-xs text-muted-foreground">
            {t("translatedNote")}
          </p>
        ) : null}
        {variant === "inline" && testimonial.caseStudySlug ? (
          <Link
            href={`/${locale}/work/${testimonial.caseStudySlug}`}
            className={caseStudyLinkClass}>
            {t("caseStudyCta")}
            <ArrowUpRight
              className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>
    </figure>
  );

  if (variant === "inline") {
    return (
      <div className="py-16 md:py-20">
        <div className={homeSectionContainerClass}>{figure}</div>
      </div>
    );
  }

  return figure;
}
