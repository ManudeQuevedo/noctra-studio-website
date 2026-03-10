import "server-only";

import { cache } from "react";
import { createPublicSupabaseClient } from "@/lib/site/supabase";
import type {
  PublicCaseStudyProject,
  PublicProjectCard,
} from "@/types/site-project";

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

export const getPublicProjects = cache(async (): Promise<PublicProjectCard[]> => {
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
});

export const getPublicCaseStudySlugs = cache(async (): Promise<string[]> => {
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
});

export const getPublicCaseStudyBySlug = cache(
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
);
