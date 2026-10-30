import "server-only";

import { unstable_cache } from "next/cache";
import { createPublicSupabaseClient } from "@/lib/site/supabase";
import {
  getDraftCaseStudy,
  getDraftCaseStudySlugs,
} from "@/content/draft-case-studies";
import type {
  ProjectEnglishFields,
  PublicCaseStudyProject,
  PublicProjectCard,
} from "@/types/site-project";

type ProjectCardRow = PublicProjectCard & ProjectEnglishFields;
type CaseStudyRow = PublicCaseStudyProject & ProjectEnglishFields;

const ENGLISH_CARD_COLUMNS = [
  "name_en",
  "tagline_en",
  "industry_en",
  "services_delivered_en",
  "challenge_en",
  "solution_en",
];

export const PUBLIC_PROJECTS_TAG = "public-projects";

const PUBLIC_PROJECT_CARD_SELECT = [
  "id",
  "slug",
  "name",
  "tagline",
  "industry",
  "services_delivered",
  "status",
  "launch_date",
  "published_to_site",
  "case_study_enabled",
  "challenge",
  "solution",
  "has_ai_form",
  "form_description",
  ...ENGLISH_CARD_COLUMNS,
].join(", ");

const PUBLIC_CASE_STUDY_SELECT = [
  "id",
  "slug",
  "name",
  "tagline",
  "industry",
  "services_delivered",
  "challenge",
  "solution",
  "results",
  "metrics",
  "gallery",
  ...ENGLISH_CARD_COLUMNS,
  "results_en",
].join(", ");

const getPublicProjectsCached = unstable_cache(
  async (): Promise<ProjectCardRow[]> => {
    const supabase = createPublicSupabaseClient();
    /** All projects flagged for the public site (pipeline UI is sanitized in ProjectCard). */
    const { data, error } = await supabase
      .from("projects")
      .select(PUBLIC_PROJECT_CARD_SELECT)
      .eq("published_to_site", true)
      .order("sort_order", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as unknown as ProjectCardRow[];
  },
  ["public-projects:list", "v6-i18n"],
  {
    tags: [PUBLIC_PROJECTS_TAG],
    revalidate: 300,
  },
);

const getPublicCaseStudySlugsCached = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug")
      .eq("published_to_site", true)
      .eq("case_study_enabled", true)
      .order("sort_order", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map(({ slug }) => slug);
  },
  ["public-projects:slugs"],
  {
    tags: [PUBLIC_PROJECTS_TAG],
    revalidate: 300,
  },
);

const getPublicCaseStudyBySlugCached = unstable_cache(
  async (slug: string): Promise<CaseStudyRow | null> => {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select(PUBLIC_CASE_STUDY_SELECT)
      .eq("slug", slug)
      .eq("published_to_site", true)
      .eq("case_study_enabled", true)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return (data as unknown as CaseStudyRow | null) ?? null;
  },
  ["public-projects:case-study", "v3-i18n"],
  {
    tags: [PUBLIC_PROJECTS_TAG],
    revalidate: 300,
  },
);

type Locale = "es" | "en" | (string & {});

function pick<T>(english: T | null | undefined, spanish: T): T {
  if (english === null || english === undefined) return spanish;
  if (typeof english === "string" && english.trim() === "") return spanish;
  if (Array.isArray(english) && english.length === 0) return spanish;
  return english;
}

function localizeCard(row: ProjectCardRow, locale: Locale): PublicProjectCard {
  const {
    name_en,
    tagline_en,
    industry_en,
    services_delivered_en,
    challenge_en,
    solution_en,
    ...base
  } = row;
  if (locale !== "en") return base;
  return {
    ...base,
    name: pick(name_en, base.name),
    tagline: pick(tagline_en, base.tagline),
    industry: pick(industry_en, base.industry),
    services_delivered: pick(services_delivered_en, base.services_delivered),
    challenge: pick(challenge_en, base.challenge),
    solution: pick(solution_en, base.solution),
  };
}

function localizeCaseStudy(
  row: CaseStudyRow,
  locale: Locale,
): PublicCaseStudyProject {
  const {
    name_en,
    tagline_en,
    industry_en,
    services_delivered_en,
    challenge_en,
    solution_en,
    results_en,
    ...base
  } = row;
  if (locale !== "en") return base;
  return {
    ...base,
    name: pick(name_en, base.name),
    tagline: pick(tagline_en, base.tagline),
    industry: pick(industry_en, base.industry),
    services_delivered: pick(services_delivered_en, base.services_delivered),
    challenge: pick(challenge_en, base.challenge),
    solution: pick(solution_en, base.solution),
    results: pick(results_en, base.results),
    gallery:
      base.gallery?.map((item) => ({
        url: item.url,
        caption: pick(item.caption_en, item.caption),
      })) ?? null,
  };
}

export async function getPublicProjects(locale: Locale) {
  const rows = await getPublicProjectsCached();
  return rows.map((row) => localizeCard(row, locale));
}

export async function getPublicCaseStudySlugs() {
  const slugs = await getPublicCaseStudySlugsCached();
  const drafts = getDraftCaseStudySlugs().filter((s) => !slugs.includes(s));
  return [...slugs, ...drafts];
}

export async function getPublicCaseStudyBySlug(slug: string, locale: Locale) {
  const row = await getPublicCaseStudyBySlugCached(slug);
  if (row) return localizeCaseStudy(row, locale);
  return getDraftCaseStudy(slug, locale);
}
