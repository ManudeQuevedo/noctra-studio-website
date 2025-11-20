"use client";

import { useTranslations } from "next-intl";

export function TrustedBy() {
  const t = useTranslations("TrustedBy");

  const companies = [
    "Decagon",
    "Windsurf",
    "Terradot",
    "Vercel",
    "Linear",
    "Raycast",
  ];

  return (
    <section className="container py-12 border-b border-border/40 max-w-5xl mx-auto">
      <p className="text-sm text-muted-foreground font-medium mb-8 text-center uppercase tracking-wider">
        {t("title")}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        {companies.map((company) => (
          <div key={company} className="text-xl font-bold text-foreground/80">
            {company}
          </div>
        ))}
      </div>
    </section>
  );
}
