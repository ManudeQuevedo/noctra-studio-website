"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { UserCheck, Zap, ShieldCheck, Clock } from "lucide-react";

const icons = [UserCheck, Zap, ShieldCheck, Clock];

export function WhyLocalBenefits() {
  const t = useTranslations("WhyLocal");
  const items = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <LazyMotion features={domAnimation}>
    <div className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => {
          const Icon = icons[index];
          return (
            <m.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col p-8 rounded-2xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </m.div>
          );
        })}
      </div>
    </div>
    </LazyMotion>
  );
}
