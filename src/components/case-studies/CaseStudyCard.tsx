"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudyCardProps {
  name: string;
  concept: string;
  challenge: string;
  solution: string;
  techStack: string[];
  imagePath: string;
  index: number;
  challengeLabel: string;
  solutionLabel: string;
  techStackLabel: string;
}

export function CaseStudyCard({
  name,
  concept,
  challenge,
  solution,
  techStack,
  imagePath,
  index,
  challengeLabel,
  solutionLabel,
  techStackLabel,
}: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 === 1;

  useEffect(() => {
    if (!cardRef.current) return;

    try {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    } catch (error) {
      // Gracefully handle errors in dev mode or when in iframe
      console.warn("GSAP animation skipped:", error);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 md:gap-12 items-center opacity-0`}>
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative aspect-[3/2] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800">
        <Image
          src={imagePath}
          alt={`${name} project mockup`}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">
            {concept}
          </p>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {name}
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 mb-2">
              {challengeLabel}
            </h4>
            <p className="text-neutral-300 leading-relaxed">{challenge}</p>
          </div>

          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 mb-2">
              {solutionLabel}
            </h4>
            <p className="text-neutral-300 leading-relaxed">{solution}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 mb-3">
            {techStackLabel}
          </h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono text-neutral-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
