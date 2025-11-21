"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { StarField } from "./StarField";
import { GridStructure } from "@/components/backgrounds/GridStructure";
import { SignalBeacon } from "@/components/backgrounds/SignalBeacon";
import { StaticNoise } from "@/components/backgrounds/StaticNoise";
import { NetworkGrid } from "@/components/backgrounds/NetworkGrid";
import { MeteorShower } from "@/components/ui/MeteorShower";

export function BackgroundManager() {
  const pathname = usePathname();

  // Determine which background to show based on the current path
  const getBackground = () => {
    // Normalize pathname to handle locale prefixes if necessary
    // For now, we'll check if the pathname ends with or contains the route

    if (
      pathname === "/" ||
      pathname === "/en" ||
      pathname.length < 4 // Handles /en, /fr, /es, etc. dynamically
    ) {
      return <StarField key="starfield" />;
    }
    if (pathname.includes("/services")) {
      return <GridStructure key="grid" />;
    }
    if (pathname.includes("/contact")) {
      return <SignalBeacon key="signal" />;
    }
    if (pathname.includes("/blog")) {
      return <StaticNoise key="noise" />;
    }
    if (pathname.includes("/about")) {
      return <MeteorShower key="meteors" />;
    }

    // Default fallback
    return <StarField key="default" />;
  };

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-neutral-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0">
          {getBackground()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
