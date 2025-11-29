"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function PedigreeMarquee() {
  const t = useTranslations("PedigreeMarquee");
  const terms = t.raw("terms") as string[];

  return (
    <div className="w-full border-y border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Label & Headline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0 z-10 bg-black/50 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none">
          <span className="text-[10px] md:text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 block">
            {t("label")}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight max-w-[200px] md:max-w-xs leading-tight">
            {t("headline")}
          </h3>
        </div>

        {/* Marquee */}
        <div className="flex-1 w-full overflow-hidden relative mask-linear-fade">
          <div className="flex w-max">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 100,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-16 items-center pr-16">
              {[
                ...terms,
                ...terms,
                ...terms,
                ...terms,
                ...terms,
                ...terms,
                ...terms,
                ...terms,
              ].map((term, i) => (
                <span
                  key={i}
                  className="text-8xl font-black uppercase tracking-tighter whitespace-nowrap text-white/5"
                  style={{
                    WebkitTextStroke: "0px transparent",
                  }}>
                  {term}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Gradient Masks for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
