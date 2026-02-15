import { generatePageMetadata } from "@/lib/metadata";
import GuaranteeClient from "./GuaranteeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "guarantee");
}

export default function GuaranteePage() {
  return <GuaranteeClient />;
}
