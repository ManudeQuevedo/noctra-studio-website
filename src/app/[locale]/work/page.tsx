import { generatePageMetadata } from "@/lib/metadata";
import WorkClient from "./WorkClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "work");
}

export default function WorkPage() {
  return <WorkClient />;
}
