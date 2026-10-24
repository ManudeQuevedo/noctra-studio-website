import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { homeSectionContainerClass } from "@/components/home/homeSectionFrame";
import type { Testimonial } from "@/content/testimonials";

type TestimonialQuoteProps = {
  testimonial: Testimonial;
  variant: "feature" | "inline";
  locale: string;
};

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
  const showTranslationNote = locale !== testimonial.originalLocale;
  const caption = testimonial.role
    ? `${testimonial.author}, ${testimonial.role} · ${testimonial.company}`
    : `${testimonial.author} · ${testimonial.company}`;

  const figure = (
    <figure
      className={
        variant === "feature"
          ? "testimonial-rise-feature mt-24 max-w-[60ch]"
          : "testimonial-rise-inline max-w-[60ch]"
      }>
      {variant === "feature" ? (
        <span
          aria-hidden="true"
          className="mb-3 block select-none text-5xl leading-none text-muted-foreground">
          “
        </span>
      ) : null}
      <blockquote
        className={
          variant === "feature"
            ? "m-0 text-2xl font-medium leading-snug tracking-tight text-pretty text-foreground md:text-3xl"
            : "m-0 text-lg leading-relaxed text-pretty text-foreground md:text-xl"
        }>
        {quote}
      </blockquote>
      <figcaption className="mt-6 text-sm text-muted-foreground">
        {caption}
      </figcaption>
      {showTranslationNote ? (
        <p className="mt-2 text-xs text-muted-foreground">{t("translatedNote")}</p>
      ) : null}
      {variant === "inline" && testimonial.caseStudySlug ? (
        <Link
          href={`/${locale}/work/${testimonial.caseStudySlug}`}
          className="mt-5 inline-flex text-sm font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {t("caseStudyCta")}
        </Link>
      ) : null}
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
