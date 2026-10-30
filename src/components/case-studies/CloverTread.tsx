import type { ReactNode } from "react";
import { Bodoni_Moda } from "next/font/google";
import { cn } from "@/lib/utils";

// High-contrast didone, close to the Clover & Tread logotype.
const brandSerif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const BRAND = "Clover & Tread";

export function CloverTread({ className }: { className?: string }) {
  return (
    <span className={cn(brandSerif.className, "tracking-tight", className)}>
      {BRAND}
    </span>
  );
}

/** Renders `text`, setting every "Clover & Tread" mention in the brand serif. */
export function withCloverTread(text: string): ReactNode {
  const parts = text.split(BRAND);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <CloverTread className="font-bold" /> : null}
    </span>
  ));
}
