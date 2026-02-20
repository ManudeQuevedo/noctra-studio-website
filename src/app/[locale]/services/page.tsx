import { generatePageMetadata } from "@/lib/metadata";
import ServicesClient from "./ServicesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "services");
}

export default function ServicesPage() {
  return <ServicesClient />;
}
