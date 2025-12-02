"use client";

import { useLanguage } from "@/lib/i18n";
import { ContactForm } from "./contact-form";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative flex flex-col items-center justify-center h-full max-w-2xl w-full">
      {/* 1. The "Noctra Glow" (Atmosphere) */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-radial-gradient from-white/5 to-transparent opacity-50 blur-3xl pointer-events-none z-0" />

      {/* 3. The Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }} // Custom easing
        className="relative w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12 text-center shadow-2xl shadow-white/5 z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-2 leading-tight">
            {t.hero.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 font-light">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full flex flex-col items-center">
          <p className="text-sm md:text-base text-zinc-500 mb-10 max-w-lg leading-relaxed">
            {t.hero.description}
          </p>
          <ContactForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
