-- Public marketing site reads `projects` with the Supabase anon key (see src/lib/site/projects.ts).
-- Hardening: allow anon SELECT only when the row is explicitly published to the site.
-- Forge continues to use authenticated + existing "Workspace members can manage projects" policy (OR semantics).

-- 1) RLS: anonymous read of published portfolio rows only
DROP POLICY IF EXISTS "public_anon_select_published_projects" ON public.projects;

CREATE POLICY "public_anon_select_published_projects"
  ON public.projects
  FOR SELECT
  TO anon
  USING (coalesce(published_to_site, false) = true);

COMMENT ON POLICY "public_anon_select_published_projects" ON public.projects IS
  'Marketing /work: anon may read only rows flagged for the public site.';

-- 2) Indexes for public list + case study slug lookups (partial indexes keep them small)
CREATE INDEX IF NOT EXISTS idx_projects_published_sort_order
  ON public.projects (sort_order ASC NULLS LAST)
  WHERE coalesce(published_to_site, false) = true;

CREATE INDEX IF NOT EXISTS idx_projects_case_study_by_slug
  ON public.projects (slug)
  WHERE coalesce(published_to_site, false) = true
    AND coalesce(case_study_enabled, false) = true;
