"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandNarrativeVisualProps {
  className?: string;
  variant?: "moon" | "square" | "both";
}

export function BrandNarrativeVisual({
  className,
  variant = "both",
}: BrandNarrativeVisualProps) {
  const viewport = { once: true, margin: "-10%" } as const;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "pointer-events-none absolute overflow-hidden",
          className,
        )}>
        {/* Moon Shape */}
        {(variant === "moon" || variant === "both") && (
          <m.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            whileInView={{ opacity: 0.2, scale: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            className="absolute -left-32 bottom-0 h-[600px] w-[600px] rounded-full bg-linear-to-br from-emerald-500/20 to-transparent blur-3xl will-change-transform"
          />
        )}

        {/* System Lines / Grid suggestion */}
        <div className="absolute inset-0 z-0">
          <svg
            className="h-full w-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse">
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Directional Lines */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 3, delay: 1 }}
            className="absolute inset-0">
            <div className="absolute top-[20%] left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent rotate-15 translate-y-20" />
            <div className="absolute top-[60%] left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500/10 to-transparent rotate-[-10deg] -translate-y-40" />
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
