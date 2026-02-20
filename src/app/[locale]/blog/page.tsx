import { generatePageMetadata } from "@/lib/metadata";
import BlogClient from "./BlogClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "blog");
}

export default function BlogPage() {
  return <BlogClient />;
}
