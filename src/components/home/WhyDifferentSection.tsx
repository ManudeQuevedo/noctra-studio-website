"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User, Eye, ShieldCheck, Code2 } from "lucide-react";
import { Link } from "@/i18n/routing";

const icons = [User, Eye, ShieldCheck, Code2];

export function WhyDifferentSection() {
  const t = useTranslations("WhyDifferent");
  const items = t.raw("items") as Array<{
    title: string;
    benefit: string;
    proof: string;
  }>;

  return (
    <section className="w-full px-6 md:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const Icon = icons[index];
            const isGuaranteeCard = index === 2; // "Measurable results or your money back" is the 3rd item

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative p-10 rounded-3xl border border-neutral-800 bg-neutral-900/10 hover:border-emerald-500/20 hover:bg-neutral-900/30 transition-all duration-300">
                {/* Number Badge */}
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-4xl font-black text-white/5 group-hover:text-emerald-500/10 transition-colors font-mono tracking-tighter">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/10 transition-all group-hover:scale-110 duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="space-y-6 flex-1">
                    <p className="text-neutral-400 text-lg leading-relaxed group-hover:text-neutral-300 transition-colors">
                      {item.benefit}
                    </p>

                    <div className="pt-6 border-t border-neutral-800 space-y-4">
                      <div className="inline-flex items-center gap-3 text-sm font-bold text-neutral-300">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="group-hover:text-emerald-50 transition-colors tracking-tight font-mono uppercase text-[10px]">
                          {item.proof}
                        </span>
                      </div>

                      {isGuaranteeCard && (
                        <div className="pt-2">
                          <Link 
                            href="/guarantee" 
                            className="text-emerald-500 text-sm font-bold border-b border-emerald-500/30 hover:border-emerald-500 transition-all pb-0.5 inline-block">
                            {t("guarantee_link")}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
