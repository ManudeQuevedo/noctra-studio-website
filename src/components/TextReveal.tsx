"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  // Split text into words, preserving spaces
  // We'll split by space but keep the space in the array to render it properly
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const bracketRegex = /\[(.*?)\]/g;

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}>
      {words.map((word, index) => {
        const isBracketed = word.startsWith("[") || word.endsWith("]");
        // This simple check might fail for multi-word bracketed phrases if we split by space.
        // A better approach for the specific requirement "We are a [digital architecture firm]"
        // is to parse the full string first.
        return (
          <motion.span
            variants={child}
            style={{ marginRight: "0.25em" }}
            key={index}>
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

// Improved version that handles the bracketed phrases correctly
export function ManifestoText() {
  const text =
    "We are a [digital architecture firm] dedicated to bringing [clarity to the chaos]. With a precision team of engineers and designers, we build [silent systems] that empower [visionary companies] to scale without friction.";

  // Regex to split by brackets, capturing the content inside
  const parts = text.split(/(\[.*?\])/g);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(5px)",
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-2xl md:text-3xl font-light text-neutral-600 leading-relaxed max-w-3xl mx-auto">
      {parts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          // Remove brackets
          const content = part.slice(1, -1);
          return (
            <motion.span
              key={index}
              variants={child}
              className="inline-block text-white font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mx-1">
              {content}
            </motion.span>
          );
        }
        // Split regular text into words for smoother animation
        return part.split(" ").map((word, wIndex) => {
          if (!word) return null;
          return (
            <motion.span
              key={`${index}-${wIndex}`}
              variants={child}
              className="inline-block mr-2">
              {word}
            </motion.span>
          );
        });
      })}
    </motion.p>
  );
}
