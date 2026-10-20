import type { MetadataRoute } from "next";
import { getPathname, routing } from "@/i18n/routing";

const BASE_URL = "https://www.noctra.studio";

type Locale = (typeof routing.locales)[number];
type PublicPath = Parameters<typeof getPathname>[0]["href"];

type SitemapPage = {
  href: PublicPath;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

// Public, indexable pages only. Localized URLs are resolved from
// src/i18n/routing.ts so the sitemap always matches the live routes.
const PAGES: SitemapPage[] = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/about", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services", changeFrequency: "monthly", priority: 0.9 },
  { href: "/services/professional-websites", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/ecommerce", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/custom-systems", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/optimization", changeFrequency: "monthly", priority: 0.8 },
  { href: "/services/landing-page", changeFrequency: "monthly", priority: 0.8 },
  { href: "/work", changeFrequency: "monthly", priority: 0.7 },
  { href: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { href: "/diagnostico", changeFrequency: "monthly", priority: 0.7 },
  { href: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { href: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { href: "/guarantee", changeFrequency: "monthly", priority: 0.6 },
  { href: "/technology-explained", changeFrequency: "monthly", priority: 0.5 },
  { href: "/custom-pricing", changeFrequency: "monthly", priority: 0.6 },
  { href: "/first-clients", changeFrequency: "monthly", priority: 0.6 },
  { href: "/privacy-policy", changeFrequency: "monthly", priority: 0.3 },
  { href: "/terms-and-conditions", changeFrequency: "monthly", priority: 0.3 },
  { href: "/cookie-policy", changeFrequency: "monthly", priority: 0.3 },
];

function absoluteUrl(href: PublicPath, locale: Locale): string {
  const path = getPathname({ href, locale });
  // getPathname returns "/es" for the root; keep URLs without trailing slash.
  return `${BASE_URL}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap((page) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, absoluteUrl(page.href, locale)]),
    ) as Record<Locale, string>;

    return routing.locales.map((locale) => ({
      url: languages[locale],
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: { ...languages, "x-default": languages[routing.defaultLocale] },
      },
    }));
  });
}
