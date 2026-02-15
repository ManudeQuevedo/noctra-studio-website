import { generatePageMetadata } from "@/lib/metadata";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "privacy");
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
