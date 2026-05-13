-- Public /work cards: services tags (see ProjectCard). Industry already exists on projects.
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS services_delivered text[] DEFAULT '{}';

COMMENT ON COLUMN public.projects.services_delivered IS
  'Services shown on public work cards (e.g. Branding, Web Development, SEO).';

-- Dyma Group + Woodax: seed public card metadata (adjust slugs if your rows differ).
UPDATE public.projects
SET
  industry = 'Diseño de Interiores',
  services_delivered = ARRAY['Branding', 'Web Development']::text[]
WHERE published_to_site IS TRUE
  AND lower(coalesce(slug, '')) LIKE '%dyma%';

UPDATE public.projects
SET
  industry = 'Mobiliario de autor',
  services_delivered = ARRAY['Branding', 'Web Development']::text[]
WHERE published_to_site IS TRUE
  AND lower(coalesce(slug, '')) LIKE '%woodax%';
