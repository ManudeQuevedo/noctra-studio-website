"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function BlogPage() {
  const t = useTranslations("BlogPage");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-transparent text-neutral-900 dark:text-neutral-50 px-4 relative overflow-hidden">
      {/* Background Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat bg-[length:100px_100px]" />

      <div className="relative z-10 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8">
          <div className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse mb-4 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-balance">
            {t("title")}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed text-balance font-mono">
          {t("description")}
        </motion.p>
      </div>
    </main>
  );
}
