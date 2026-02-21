"use client";

import { usePathname } from "next/navigation";
import { ForgePageTransition } from "./ForgePageTransition";

export function ForgeContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // We use the pathname as a key to force React to remount the component
  // on every route change, triggering the entry animation.
  return <ForgePageTransition key={pathname}>{children}</ForgePageTransition>;
}
