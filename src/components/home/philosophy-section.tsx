"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TechMarquee } from "@/components/tech-marquee";
import { useEffect, useState } from "react";

/**
 * PhilosophySection
 * Purpose: Explains the studio's core values and technical approach.
 * Key Features:
 * - "TechMarquee" integration showing the stack
 * - Grid layout with "Philosophy" text
 */
export function PhilosophySection() {
  const t = useTranslations("About.philosophy_section");
  const [terminalText, setTerminalText] = useState("");
  const fullText = t("system_monitor.terminal_text");

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
  }, [fullText]);

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
              {t("label")}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none">
              {t("title_line1")}
              <br />
              {t("title_line2")}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed border-l-2 border-white/20 pl-6">
              {t("description")}
            </p>
          </motion.div>

          {/* Right Column: The System Monitor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative">
            {/* System Monitor - Desktop */}
            <div className="hidden md:block w-full max-w-md ml-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 font-mono text-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-neutral-400 text-xs uppercase tracking-wider">
                  {t("system_monitor.header")}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-xs">
                    {t("system_monitor.live")}
                  </span>
                </div>
              </div>

              {/* Status List */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-neutral-300">
                    {t("system_monitor.core_architecture")}
                  </span>
                  <span className="text-green-400 ml-auto">
                    {t("system_monitor.online")}
                    <span className="text-[10px] italic text-neutral-500 ml-2">
                      (Your business never sleeps)
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-neutral-300">
                    {t("system_monitor.performance")}
                  </span>
                  <span className="text-white ml-auto">
                    100/100
                    <span className="text-[10px] italic text-neutral-500 ml-2">
                      (Speed converts)
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-neutral-300">
                    {t("system_monitor.security_protocols")}
                  </span>
                  <span className="text-green-400 ml-auto">
                    {t("system_monitor.active")}
                    <span className="text-[10px] italic text-neutral-500 ml-2">
                      (Asset protection)
                    </span>
                  </span>
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

            {/* System Monitor - Mobile */}
            <div className="block md:hidden mt-12 w-full border-y border-neutral-200 dark:border-white/10 py-4 font-mono text-xs text-neutral-500 text-center">
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t("system_monitor.mobile_status")}
              </span>
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
