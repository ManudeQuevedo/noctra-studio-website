"use client";

import { useState, useMemo, useRef, ReactNode } from "react";
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
  Search,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

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
  const [searchTerm, setSearchTerm] = useState("");
  const faqListRef = useRef<HTMLDivElement>(null);

  const categoryKeys = Object.keys(categories);

  // Calculate counts for each category
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    items.forEach((item) => {
      c[item.category] = (c[item.category] || 0) + 1;
    });
    return c;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchTerm]);

  const scrollToFaq = () => {
    faqListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="w-full px-6 md:px-8 pt-4 pb-24">
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

        {/* Featured Callout Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="relative space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest">
              {t("featured.label")}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white max-w-2xl">
              {t("featured.question")}
            </h3>
            <div className="text-neutral-300 text-sm leading-relaxed max-w-2xl">
              {renderAnswer(t("featured.answer"))}
            </div>
            <button
              onClick={scrollToFaq}
              className="text-emerald-500 hover:text-emerald-400 font-bold text-sm flex items-center gap-2 transition-colors">
              {t("featured.see_all")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-12 relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-neutral-600 shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          ref={faqListRef}>
          <button
            onClick={() => {
              setActiveCategory("all");
              setOpenIndex(null);
              scrollToFaq();
            }}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border flex items-center gap-2 uppercase tracking-widest",
              activeCategory === "all"
                ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200",
            )}>
            {t("filter_all")}
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-md",
                activeCategory === "all" ? "bg-black/20" : "bg-neutral-800",
              )}>
              {counts.all}
            </span>
          </button>
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                setOpenIndex(null);
                scrollToFaq();
              }}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-bold transition-all duration-300 border flex items-center gap-2 uppercase tracking-widest",
                activeCategory === key
                  ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                  : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200",
              )}>
              {CATEGORY_ICONS[key]}
              <span className="hidden sm:inline">{categories[key]}</span>
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-md",
                  activeCategory === key ? "bg-black/20" : "bg-neutral-800",
                )}>
                {counts[key] || 0}
              </span>
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const globalIndex = items.indexOf(item);
                const isOpen = openIndex === globalIndex;
                return (
                  <motion.div
                    key={item.question}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors bg-neutral-900/10">
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
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="no-results"
                className="text-center py-20 px-8 border border-dashed border-neutral-800 rounded-3xl bg-neutral-950/50">
                <Search className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                <p className="text-neutral-400 mb-6 font-medium">
                  {t("search.no_results")}
                </p>
                <Link
                  href={{
                    pathname: "/contact",
                    query: { tipo: "dudas-generales" },
                  }}
                  className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold text-sm">
                  {t("cta_button")} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
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
            href={{ pathname: "/contact", query: { tipo: "dudas-generales" } }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-emerald-50 transition-all group active:scale-95">
            {t("cta_button")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
