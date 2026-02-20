import { generatePageMetadata } from "@/lib/metadata";
import TechnologyClient from "./TechnologyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "technology");
}

export default function TechnologyExplainedPage() {
  return <TechnologyClient />;
}
