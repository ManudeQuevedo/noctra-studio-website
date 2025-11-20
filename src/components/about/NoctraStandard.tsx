"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, Zap, ScanEye } from "lucide-react";

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

export function NoctraStandard() {
  const t = useTranslations("AboutPage");

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-16">
            {t("manifesto.title")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[{ icon: Code2 }, { icon: Zap }, { icon: ScanEye }].map(
            (item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="group flex flex-col h-full justify-between border-l-2 border-neutral-200 dark:border-neutral-800 pl-6 py-4 hover:border-neutral-900 dark:hover:border-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-300 ease-out rounded-r-sm">
                  <div className="mb-6">
                    <item.icon className="w-6 h-6 text-neutral-900 dark:text-neutral-50 mb-4" />
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 tracking-tight">
                      {t(`manifesto.cards.${index}.title`)}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                      {t(`manifesto.cards.${index}.desc`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            )
          )}
        </div>
      </div>
    </section>
  );
}
