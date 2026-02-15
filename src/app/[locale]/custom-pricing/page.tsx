import { generatePageMetadata } from "@/lib/metadata";
import CustomPricingClient from "./CustomPricingClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "custom-pricing");
}

export default function CustomPricingPage() {
  return <CustomPricingClient />;
}
