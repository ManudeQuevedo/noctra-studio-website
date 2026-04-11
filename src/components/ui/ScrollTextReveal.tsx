"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ─── tuning parameters ─── */
const CONFIG = {
  /** Color the words start in (dark gray, subdued) */
  colorFrom: "rgb(60, 60, 60)",
  /** Color the words end in (pure white) */
  colorTo: "rgb(255, 255, 255)",
  /** Tiny upward shift per word (px) */
  yShift: 3,
  /** Base duration for word reveal */
  wordDuration: 0.8,
  /** Stagger between words */
  staggerBase: 0.05,
  /** ScrollTrigger Defaults */
  scrubStart: "top 85%",
  scrubEnd: "top 25%",
};

export type RevealLine = {
  text: string;
  className?: string;
};

type Props = {
  /** Structured lines with custom alignment/styles */
  lines: RevealLine[];
  /** Additional className for the overall section */
  className?: string;
};

/**
 * ScrollTextReveal
 * 
 * Editorial scroll-driven text reveal.
 * Animates lines in sequence: Line 1 -> Line 2 -> Line 3.
 * Words transition from dark gray to white.
 */
export function ScrollTextReveal({ lines, className }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initAnimation = useCallback(() => {
    if (!containerRef.current || !sectionRef.current) return;

    /* ── Respect prefers-reduced-motion ── */
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const words = containerRef.current.querySelectorAll("[data-word]");
      gsap.set(words, { color: CONFIG.colorTo, opacity: 1, y: 0 });
      return;
    }

    /* ── Mobile tuning ── */
    const isMobile = window.innerWidth < 768;
    const startTrigger = isMobile ? "top 90%" : CONFIG.scrubStart;
    const endTrigger = isMobile ? "top 40%" : CONFIG.scrubEnd;

    /* ── Create Main Timeline ── */
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: startTrigger,
        end: endTrigger,
        scrub: 1, // Smooth scrub
      },
    });

    /* ── Animate each line in sequence ── */
    lines.forEach((_, lineIdx) => {
      const lineWords = containerRef.current?.querySelectorAll(`[data-line="${lineIdx}"]`);
      if (!lineWords) return;

      mainTl.to(lineWords, {
        color: CONFIG.colorTo,
        y: 0,
        opacity: 1,
        duration: CONFIG.wordDuration,
        ease: "power2.out",
        stagger: CONFIG.staggerBase,
      }, lineIdx === 0 ? 0 : "-=0.2"); // Subtle overlap for natural flow
    });

    return () => {
      mainTl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, [lines]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initAnimation();
    });
    return () => ctx.revert();
  }, [initAnimation]);

  return (
    <div ref={sectionRef} className={cn("relative w-full", className)}>
      <div ref={containerRef} className="mx-auto w-full space-y-12 md:space-y-16">
        {lines.map((line, lineIdx) => (
          <p
            key={lineIdx}
            className={cn(
              "max-w-4xl text-3xl font-black leading-[1.15] tracking-tight md:text-5xl lg:text-7xl",
              line.className
            )}
            style={{ color: CONFIG.colorFrom }}
          >
            {splitIntoWords(line.text).map((word, wordIdx, arr) => (
              <span key={`${lineIdx}-${wordIdx}`} className="inline-block">
                <span
                  data-word
                  data-line={lineIdx}
                  className="inline-block opacity-100" // Stay visible, just subdued
                  style={{ transform: `translateY(${CONFIG.yShift}px)`, color: "inherit" }}
                >
                  {word}
                </span>
                {wordIdx < arr.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}
