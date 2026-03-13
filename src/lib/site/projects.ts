import "server-only";

import { unstable_cache } from "next/cache";
import { createPublicSupabaseClient } from "@/lib/site/supabase";
import type {
  PublicCaseStudyProject,
  PublicProjectCard,
} from "@/types/site-project";

export const PUBLIC_PROJECTS_TAG = "public-projects";

const PUBLIC_PROJECT_CARD_SELECT = [
  "id",
  "slug",
  "name",
  "tagline",
  "industry",
  "status",
  "launch_date",
  "case_study_enabled",
  "challenge",
  "solution",
  "has_ai_form",
  "form_description",
].join(", ");

const PUBLIC_CASE_STUDY_SELECT = [
  "id",
  "slug",
  "name",
  "tagline",
  "industry",
  "challenge",
  "solution",
  "results",
  "metrics",
  "gallery",
].join(", ");

const getPublicProjectsCached = unstable_cache(
  async (): Promise<PublicProjectCard[]> => {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select(PUBLIC_PROJECT_CARD_SELECT)
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as unknown as PublicProjectCard[];
  },
  ["public-projects:list"],
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
      .eq("visible", true)
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
  async (slug: string): Promise<PublicCaseStudyProject | null> => {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select(PUBLIC_CASE_STUDY_SELECT)
      .eq("slug", slug)
      .eq("visible", true)
      .eq("case_study_enabled", true)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return (data as unknown as PublicCaseStudyProject | null) ?? null;
  },
  ["public-projects:case-study"],
  {
    tags: [PUBLIC_PROJECTS_TAG],
    revalidate: 300,
  },
);

export async function getPublicProjects() {
  return getPublicProjectsCached();
}

export async function getPublicCaseStudySlugs() {
  return getPublicCaseStudySlugsCached();
}

export async function getPublicCaseStudyBySlug(slug: string) {
  return getPublicCaseStudyBySlugCached(slug);
}
