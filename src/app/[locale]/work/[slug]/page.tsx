import { getProjectBySlug, getProjects } from "@/lib/projects";
import { redirect } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} — Case Study | Noctra Studio`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !project.case_study_enabled) {
    redirect(`/${locale}/work`);
  }

  return <CaseStudyClient project={project} locale={locale} />;
}
