"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandNarrativeVisualProps {
  className?: string;
  variant?: "moon" | "square" | "both";
}

export function BrandNarrativeVisual({ className, variant = "both" }: BrandNarrativeVisualProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("pointer-events-none absolute overflow-hidden", className)}>
        {/* Square Background */}
        {(variant === "square" || variant === "both") && (
          <m.div 
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 0.15, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-[100px] border-[40px] border-emerald-500/20"
          />
        )}

        {/* Moon Shape */}
        {(variant === "moon" || variant === "both") && (
          <m.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            whileInView={{ opacity: 0.2, scale: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            className="absolute -left-32 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-3xl"
          />
        )}
        
        {/* System Lines / Grid suggestion */}
        <div className="absolute inset-0 z-0">
          <svg className="h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
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
            className="absolute inset-0"
          >
            <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent rotate-[15deg] translate-y-20" />
            <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent rotate-[-10deg] -translate-y-40" />
          </m.div>
        </div>

        {/* The Actual Logo Cutout as a watermark */}
        <m.svg
          viewBox="0 0 193.66 193.66"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 text-white"
        >
          <path d="M175.61,0H18.04C8.08,0,0,8.08,0,18.04v157.57c0,9.96,8.08,18.04,18.04,18.04h157.57c9.96,0,18.04-8.08,18.04-18.04V18.04c0-9.96-8.08-18.04-18.04-18.04ZM54.06,122.5c-20.17-31.18-11.25-72.8,19.93-92.97l73.04,112.9c-31.18,20.17-72.8,11.25-92.97-19.93Z" />
        </m.svg>
      </div>
    </LazyMotion>
  );
}
