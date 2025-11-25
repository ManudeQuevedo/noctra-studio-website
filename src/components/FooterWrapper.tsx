"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function FooterWrapper() {
  const pathname = usePathname();
  const isHidden =
    pathname?.includes("/admin") ||
    pathname?.includes("/studio") ||
    pathname?.includes("/dashboard");

  if (isHidden) return null;

  return <Footer />;
}
