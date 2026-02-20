import { generatePageMetadata } from "@/lib/metadata";
import AboutClient from "./AboutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "about");
}

export default function AboutPage() {
  return <AboutClient />;
}
