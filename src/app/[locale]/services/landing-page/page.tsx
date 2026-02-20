import { generatePageMetadata } from "@/lib/metadata";
import LandingPageClient from "./LandingPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "services-landing-page");
}

export default function LandingPageService() {
  return <LandingPageClient />;
}
