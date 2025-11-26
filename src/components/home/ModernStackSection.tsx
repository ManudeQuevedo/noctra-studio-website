"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ModernStackSection() {
  const t = useTranslations("ModernStack");

  const stack = [
    {
      key: "nextjs",
      title: "Why Next.js?",
      desc: "Server-side rendering means your site loads instantly. Google loves speed, and so do your customers.",
    },
    {
      key: "typescript",
      title: "Why TypeScript?",
      desc: "Type safety prevents bugs before they happen. It's the difference between a fragile prototype and enterprise software.",
    },
    {
      key: "headless",
      title: "Why Headless?",
      desc: "Decouple your content from your code. Scale your marketing without breaking your infrastructure.",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-neutral-200 dark:border-neutral-800 pt-12">
          {stack.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
