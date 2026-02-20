"use client";

import { LazyMotion, m, domAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  label: string;
}

export function PhaseSelector({
  phases,
  activePhase,
  setActivePhase,
}: {
  phases: Phase[];
  activePhase: string;
  setActivePhase: (id: string) => void;
}) {
  return (
    <LazyMotion features={domAnimation}>
    <div className="w-full max-w-4xl mx-auto mb-20 md:mb-24 relative px-6">
      {/* Scroll Indicators / Masks */}
      <div className="absolute left-6 top-0 bottom-12 w-12 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none md:hidden" />
      <div className="absolute right-6 top-0 bottom-12 w-12 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none md:hidden" />

      <div className="overflow-x-auto pb-12 scrollbar-none -mx-6 px-6 relative">
        <div className="relative flex justify-between items-center min-w-[500px] md:min-w-0 px-4 md:px-0">
          {/* Visual Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-800 -translate-y-1/2" />

          <div className="relative flex justify-between items-center w-full">
            {phases.map((phase, index) => {
              const isActive = activePhase === phase.id;
              const isPast =
                phases.findIndex((p) => p.id === activePhase) > index;

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className="group relative flex flex-col items-center gap-4 outline-none focus:ring-0">
                  <div className="relative flex items-center justify-center">
                    {/* Circle Outer */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full border-2 transition-all duration-500 bg-neutral-950 flex items-center justify-center z-10",
                        isActive
                          ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                          : isPast
                            ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-500"
                            : "border-neutral-800 text-neutral-600 group-hover:border-neutral-600",
                      )}>
                      <span
                        className={cn(
                          "text-xs font-black font-mono",
                          isActive ? "text-emerald-500" : "",
                        )}>
                        0{index + 1}
                      </span>
                    </div>

                    {isActive && (
                      <m.div
                        layoutId="timeline-glow"
                        className="absolute inset-0 w-16 h-16 -left-2 -top-2 bg-emerald-500/10 rounded-full blur-xl"
                      />
                    )}
                  </div>

                  <div className="absolute -bottom-10 whitespace-nowrap text-center">
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                        isActive
                          ? "text-white"
                          : "text-neutral-500 group-hover:text-neutral-400",
                      )}>
                      {phase.label}
                    </span>
                    {isActive && (
                      <m.div
                        layoutId="active-underline"
                        className="h-0.5 w-full bg-emerald-500 mt-1"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </LazyMotion>
  );
}
