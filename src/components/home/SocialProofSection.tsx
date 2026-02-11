"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function SocialProofSection() {
  const t = useTranslations("SocialProof");
  const benefits = t.raw("benefits") as string[];

  return (
    <section className="w-full px-6 md:px-8 py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-12 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-950 to-neutral-900 overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/[0.03] rounded-full blur-3xl" />

          <div className="relative space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neutral-500">
                <Sparkles className="w-4 h-4" />
                <span>{t("badge")}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                {t("title")}
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            {/* Benefits checklist */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-white text-base">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Transparency note */}
            <p className="text-neutral-500 text-sm leading-relaxed border-t border-neutral-800 pt-6">
              {t("transparency")}
            </p>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 transition-colors duration-300 w-full sm:w-auto">
              <Link
                href={{
                  pathname: "/contact",
                  query: { intent: "first-clients" },
                }}>
                {t("cta")}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
