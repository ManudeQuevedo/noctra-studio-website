import {
  getPublicCaseStudyBySlug,
  getPublicCaseStudySlugs,
} from "@/lib/site/projects";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublicCaseStudySlugs();
  const locales = ["es", "en"];

  return slugs.flatMap((slug) =>
    locales.map((locale) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicCaseStudyBySlug(slug);

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
  const project = await getPublicCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} locale={locale} />;
}
