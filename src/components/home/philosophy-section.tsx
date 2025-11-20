"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TechMarquee } from "@/components/tech-marquee";
import { useEffect, useState } from "react";

export function PhilosophySection() {
  const t = useTranslations("About");
  const [terminalText, setTerminalText] = useState("");
  const fullText = "$ Loading system diagnostics...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTerminalText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-neutral-950 py-32 relative overflow-hidden border-t border-neutral-800">
      {/* Radial Gradient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,23,23,1)_0%,rgba(10,10,10,1)_100%)]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: The Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              // OUR DNA
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none">
              ENGINEERING
              <br />
              CLARITY.
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed border-l-2 border-white/20 pl-6">
              Chaos is the default state of the digital world. We exist to bring
              order. Through rigorous architecture and precise execution, we
              build systems that don't just work—they endure.
            </p>
          </motion.div>

          {/* Right Column: The System Monitor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative">
            <div className="w-full max-w-md ml-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 font-mono text-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-neutral-400 text-xs uppercase tracking-wider">
                  NOCTRA_SYSTEM_V1.0
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-xs">LIVE</span>
                </div>
              </div>

              {/* Status List */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-neutral-300">Core Architecture:</span>
                  <span className="text-green-400 ml-auto">Online</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-neutral-300">Performance:</span>
                  <span className="text-white ml-auto">100/100</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-neutral-300">Security Protocols:</span>
                  <span className="text-green-400 ml-auto">Active</span>
                </div>
              </div>

              {/* Terminal Typing Effect */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-neutral-500 text-xs">
                  {terminalText}
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-white/10 rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-white/10 rounded-bl-3xl" />
          </motion.div>
        </div>

        {/* Bottom Anchor: Tech Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 pt-12 border-t border-neutral-900">
          <div className="opacity-30 grayscale">
            <TechMarquee />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
