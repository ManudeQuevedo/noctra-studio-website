"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function IntroLoader() {
  const { showIntro, setIntroComplete } = useIntro();
  const [step, setStep] = useState(1); // 1: Text, 2: Logo In, 3: Logo Out, 4: Curtain Lift

  useEffect(() => {
    if (!showIntro) return;

    const sequence = async () => {
      // Phase 1: Text Sequence ("Zero Friction" -> "Infinite Scale")
      // Duration: 2 words * 1.5s = 3.0s
      await new Promise((r) => setTimeout(r, 3000));

      // Phase 2: Logo Reveal (Fade In)
      setStep(2);
      await new Promise((r) => setTimeout(r, 2000));

      // Phase 3: Logo Exit (Fade Out)
      setStep(3);
      await new Promise((r) => setTimeout(r, 1000));

      // Phase 4: Curtain Lift
      setStep(4);
      await new Promise((r) => setTimeout(r, 800));

      setIntroComplete();
    };

    sequence();
  }, [showIntro, setIntroComplete]);

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Background Curtain */}
      <motion.div
        className="absolute inset-0 bg-[#050505] z-0 pointer-events-auto"
        initial={{ opacity: 1 }}
        animate={{ opacity: step === 4 ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Phase 1: Text Sequence */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="text"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10 flex items-center justify-center">
            <TextSequence />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2 & 3: Logo Reveal & Exit */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, filter: "blur(10px)", x: 0 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              x: 0,
              transition: { duration: 0.8 },
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-20 flex items-center justify-center">
            <BrandLogo className="text-white w-64 md:w-96 h-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextSequence() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Zero Friction.", "Infinite Scale."];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={wordIndex}
        initial={{ opacity: 0, filter: "blur(10px)", x: 0 }}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
        exit={{ opacity: 0, filter: "blur(10px)", x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-5xl md:text-8xl font-black font-sans text-white tracking-widest uppercase text-center leading-none px-4">
        {words[wordIndex]}
      </motion.span>
    </AnimatePresence>
  );
}
