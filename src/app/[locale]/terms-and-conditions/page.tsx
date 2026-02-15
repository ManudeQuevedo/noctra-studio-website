import { generatePageMetadata } from "@/lib/metadata";
import TermsClient from "./TermsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "terms");
}

export default function TermsAndConditionsPage() {
  return <TermsClient />;
}
