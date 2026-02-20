import { generatePageMetadata } from "@/lib/metadata";
import ProfessionalWebsitesClient from "./ProfessionalWebsitesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "services-professional-websites");
}

export default function ProfessionalWebsitesPage() {
  return <ProfessionalWebsitesClient />;
}
