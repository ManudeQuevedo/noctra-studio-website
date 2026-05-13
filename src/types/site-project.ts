export type PublicProjectStatus =
  | "discovery"
  | "design"
  | "development"
  | "launch"
  | "completed";

export type PublicProjectMetric = {
  label: string;
  value: string;
  delta?: string;
};

export type PublicProjectGalleryItem = {
  url: string;
  caption: string;
};

export type PublicProjectCard = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  services_delivered: string[] | null;
  status: PublicProjectStatus;
  launch_date: string | null;
  published_to_site: boolean;
  case_study_enabled: boolean;
  challenge: string | null;
  solution: string | null;
  has_ai_form: boolean;
  form_description: string | null;
};

export type PublicCaseStudyProject = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  services_delivered: string[] | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  metrics: PublicProjectMetric[] | null;
  gallery: PublicProjectGalleryItem[] | null;
};
