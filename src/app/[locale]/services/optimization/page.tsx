import { generatePageMetadata } from "@/lib/metadata";
import OptimizationClient from "./OptimizationClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "services-optimization");
}

export default function OptimizationPage() {
  return <OptimizationClient />;
}
