import { generatePageMetadata } from "@/lib/metadata";
import WorkClient from "./WorkClient";
import { getProjects } from "@/lib/projects";

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
  const projects = await getProjects();

  return <WorkClient projects={projects} />;
}
