"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function FooterWrapper() {
  const pathname = usePathname();
  const isHidden =
    pathname?.includes("/forge") ||
    pathname?.includes("/studio") ||
    pathname?.includes("/centro-comando") ||
    pathname?.includes("/dashboard");

  if (isHidden) return null;

  return <Footer />;
}
