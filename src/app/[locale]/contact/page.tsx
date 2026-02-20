import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/metadata";
import ContactClient from "./ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata(locale, "contact");
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactClient />
    </Suspense>
  );
}
