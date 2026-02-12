"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  DollarSign,
  Target,
  Settings,
  Rocket,
  ClipboardList,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  pricing: <DollarSign className="w-3.5 h-3.5" />,
  guarantees: <Target className="w-3.5 h-3.5" />,
  technical: <Settings className="w-3.5 h-3.5" />,
  post_launch: <Rocket className="w-3.5 h-3.5" />,
  operations: <ClipboardList className="w-3.5 h-3.5" />,
};

function renderAnswer(text: string) {
  // Split into paragraphs by double newlines
  const paragraphs = text.split("\n\n");
  return paragraphs.map((paragraph, pIdx) => {
    const lines = paragraph.split("\n");
    const elements: ReactNode[] = [];

    lines.forEach((line, lIdx) => {
      const key = `${pIdx}-${lIdx}`;

      // Bold headers like **CONVERSIÓN:**
      if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <span
            key={key}
            className="block text-emerald-400 font-bold text-sm tracking-wide mt-4 mb-1">
            {line.replace(/\*\*/g, "")}
          </span>,
        );
        return;
      }

      // Bold inline like **SOME TEXT** in the middle of a line
      const boldRegex = /\*\*(.+?)\*\*/g;
      if (boldRegex.test(line)) {
        const parts = line.split(/\*\*(.+?)\*\*/g);
        elements.push(
          <span key={key} className="block text-neutral-300 text-sm mb-0.5">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-emerald-400 font-semibold">
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
          </span>,
        );
        return;
      }

      // Bullet points
      if (line.startsWith("• ") || line.startsWith("- ")) {
        elements.push(
          <span
            key={key}
            className="flex items-start gap-2 text-neutral-400 text-sm py-0.5 pl-2">
            <span className="text-emerald-500/60 mt-1 text-[8px]">●</span>
            <span>{line.replace(/^[•\-] /, "")}</span>
          </span>,
        );
        return;
      }

      // Numbered items
      if (/^\d+\.\s/.test(line)) {
        elements.push(
          <span
            key={key}
            className="flex items-start gap-2 text-neutral-400 text-sm py-0.5 pl-2">
            <span className="text-emerald-500 font-bold text-xs mt-0.5">
              {line.match(/^(\d+)/)?.[1]}.
            </span>
            <span>{line.replace(/^\d+\.\s/, "")}</span>
          </span>,
        );
        return;
      }

      // Regular text
      if (line.trim()) {
        elements.push(
          <span key={key} className="block text-neutral-400 text-sm mb-1">
            {line}
          </span>,
        );
      }
    });

    return (
      <div key={pIdx} className="mb-3 last:mb-0">
        {elements}
      </div>
    );
  });
}

export function FAQSection() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
    category: string;
  }>;
  const categories = t.raw("categories") as Record<string, string>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categoryKeys = Object.keys(categories);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <section className="w-full px-6 md:px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-neutral-400 text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => {
              setActiveCategory("all");
              setOpenIndex(null);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
              activeCategory === "all"
                ? "bg-white text-black border-white"
                : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200",
            )}>
            {t("filter_all")}
          </button>
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                setOpenIndex(null);
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2",
                activeCategory === key
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200",
              )}>
              {CATEGORY_ICONS[key]}
              <span className="hidden sm:inline">{categories[key]}</span>
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const globalIndex = items.indexOf(item);
              const isOpen = openIndex === globalIndex;
              return (
                <motion.div
                  key={item.question}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                    className="w-full flex items-center justify-between p-6 text-left group hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3 pr-4">
                      <span
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isOpen
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "bg-neutral-900 text-neutral-500",
                        )}>
                        {CATEGORY_ICONS[item.category]}
                      </span>
                      <span className="text-base md:text-lg font-medium text-white">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 flex-shrink-0 text-neutral-500 transition-transform duration-300",
                        isOpen && "rotate-180 text-emerald-500",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <div className="px-6 pb-6 pl-[4.25rem]">
                          <div className="border-l-2 border-emerald-500/20 pl-5 space-y-0">
                            {renderAnswer(item.answer)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-10 rounded-3xl border border-neutral-800 bg-neutral-950">
          <h3 className="text-2xl font-bold text-white mb-2">
            {t("cta_title")}
          </h3>
          <p className="text-neutral-400 mb-6">{t("cta_text")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-emerald-50 transition-all group active:scale-95">
            {t("cta_button")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
