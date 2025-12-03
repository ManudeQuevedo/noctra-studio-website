"use client";

import { useLanguage } from "@/lib/i18n";
import { ContactForm } from "./contact-form";
import { motion } from "framer-motion";
import { LaunchCountdown } from "@/components/ui/LaunchCountdown";

export function Hero() {
  const { t } = useLanguage();
  // Target date: 30 days from now
  const targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="relative flex flex-col items-center justify-center h-full max-w-2xl w-full perspective-1000">
      {/* 1. The "Noctra Glow" (Atmosphere) */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-radial-gradient from-white/5 to-transparent opacity-50 blur-3xl pointer-events-none z-0" />

      {/* 2. Visual Hint (Wireframe/Glass Card) */}
      <motion.div
        initial={{ opacity: 0, rotateX: 20, rotateY: -20, scale: 0.9 }}
        animate={{ opacity: 1, rotateX: 10, rotateY: -10, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-white/2 border border-white/5 rounded-3xl -z-10 transform-style-3d pointer-events-none"
        style={{
          transform: "translateZ(-50px) rotateX(10deg) rotateY(-10deg)",
        }}
      />

      {/* 3. The Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }} // Custom easing
        className="relative w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12 text-center shadow-2xl shadow-white/5 z-10 overflow-hidden">
        {/* Credibility Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex justify-center">
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs font-mono text-neutral-400 tracking-widest uppercase">
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-2 leading-tight">
            {t.hero.title}
          </h1>
        </motion.div>

        <LaunchCountdown targetDate={targetDate} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}>
          <p className="text-lg md:text-xl text-zinc-400 mb-8 font-light max-w-lg mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full flex flex-col items-center">
          <ContactForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
