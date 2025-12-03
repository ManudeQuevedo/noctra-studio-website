"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

export function HomeContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isIntroComplete, showIntro } = useIntro();

  // If intro is not showing (e.g. not homepage or already seen), just render children
  if (!showIntro && isIntroComplete) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
      {children}
    </motion.div>
  );
}
