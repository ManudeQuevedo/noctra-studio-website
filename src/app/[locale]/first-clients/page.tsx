import { generatePageMetadata } from "@/lib/metadata";
import FirstClientsClient from "./FirstClientsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "first-clients");
}

export default function FirstClientsPage() {
  return <FirstClientsClient />;
}
