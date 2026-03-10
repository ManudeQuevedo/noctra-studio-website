import { generatePageMetadata } from "@/lib/metadata";
import { getPublicProjects } from "@/lib/site/projects";
import WorkClient from "./WorkClient";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "work");
}

export default async function WorkPage() {
  const projects = await getPublicProjects();

  return <WorkClient projects={projects} />;
}
