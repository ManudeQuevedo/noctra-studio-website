import { generatePageMetadata } from "@/lib/metadata";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "services-optimization");
}

export default function OptimizationPage() {
  return <ServicePageTemplate namespace="optimization" interestId="optimization" />;
}
