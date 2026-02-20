import { generatePageMetadata } from "@/lib/metadata";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "services-custom-systems");
}

export default function CustomSystemsPage() {
  return <ServicePageTemplate namespace="custom_systems" interestId="custom-systems" />;
}
