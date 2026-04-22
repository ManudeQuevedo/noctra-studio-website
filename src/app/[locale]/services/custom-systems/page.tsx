import { generatePageMetadata } from "@/lib/metadata";
import CustomSystemsClient from "./CustomSystemsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "services-custom-systems");
}

export default function CustomSystemsPage() {
  return <CustomSystemsClient />;
}
