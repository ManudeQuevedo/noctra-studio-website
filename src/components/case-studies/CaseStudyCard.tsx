"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const [isVisible, setIsVisible] = useState(false);
  const isReversed = index % 2 === 1;

  useEffect(() => {
    const element = cardRef.current;

    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 md:gap-12 items-center transition-all duration-1000 ease-out motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}>
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative aspect-[3/2] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800">
        <Image
          src={imagePath}
          alt={`${name} project mockup`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-300 font-mono mb-2">
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
            {techStack.map((tech) => (
              <span
                key={tech}
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
