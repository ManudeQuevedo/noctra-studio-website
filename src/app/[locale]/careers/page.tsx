import { generatePageMetadata } from "@/lib/metadata";
import { CareersClient } from "./CareersClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "careers");
}

export default async function CareersPage() {
  return <CareersClient />;
}
