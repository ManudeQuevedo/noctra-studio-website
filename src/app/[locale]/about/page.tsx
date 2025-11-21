"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cloud } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useRef } from "react";

import { BrandAnatomy } from "@/components/about/BrandAnatomy";
import { TechStack } from "@/components/tech-stack";
import { ImpactSection } from "@/components/about/ImpactSection";
import NextImage from "next/image";

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

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <main className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-50 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black relative">
      {/* 1. Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-4 md:px-8 pt-32 border-b border-neutral-200 dark:border-neutral-800 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-neutral-900 dark:text-neutral-50 text-balance">
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed text-balance">
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* 2. The Founder's Note */}
      <section className="py-24 md:py-32 px-4 md:px-8 border-b border-neutral-200 dark:border-neutral-800 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder - Asymmetric Layout */}
          <FadeIn>
            <div className="relative aspect-[3/4] md:aspect-square bg-neutral-100 dark:bg-neutral-900 rounded-sm overflow-hidden group grayscale">
              <NextImage
                src="/images/founder.jpg"
                alt="Manu, Founder of Noctra Studio"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/20 to-neutral-100/20 opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat bg-[length:100px_100px] mix-blend-multiply" />
              <div className="absolute bottom-6 left-6">
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  Founder
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-md">
                  Manu
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Text Content */}
          <div className="flex flex-col gap-8">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-neutral-900 dark:text-neutral-50 text-balance">
                {t("founder_note.title")}
              </h2>
              <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl text-balance">
                <p>{t("founder_note.content_1")}</p>
                <p>{t("founder_note.content_2")}</p>
              </div>
              <div className="mt-12 space-y-4">
                <div className="font-handwriting text-3xl text-neutral-900 dark:text-neutral-50 opacity-80 rotate-[-2deg]">
                  {t("founder_note.signature")}
                </div>
                {/* Digital Signature Image */}
                <div className="opacity-80">
                  <img
                    src="/images/signature.png"
                    alt="Signature"
                    className="h-16 w-auto dark:invert"
                    onError={(e) => {
                      // Hide if image doesn't exist
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2.5. Brand Anatomy - NEW SECTION */}
      <BrandAnatomy />

      {/* 3. The Tech Engine (Spec Sheet) */}
      <section className="py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-900/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                {t("tech_radar.title")}
              </h2>
            </div>
            <TechStack />
          </FadeIn>
        </div>
      </section>

      {/* 4. The Methodology (Sticky Layout) */}
      <section className="py-24 md:py-32 px-4 md:px-8 border-b border-neutral-200 dark:border-neutral-800 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {/* Left Column - Sticky */}
          <div className="md:col-span-4 relative">
            <div className="md:sticky md:top-48">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-neutral-900 dark:text-neutral-50 text-balance">
                  {t("process.title")}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed text-balance">
                  {t("process.description")}
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Right Column - Scrolling Steps */}
          <div className="md:col-span-8 flex flex-col gap-24">
            {[0, 1, 2, 3].map((index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="group border-l border-neutral-200 dark:border-neutral-800 pl-8 py-2 transition-colors hover:border-neutral-900/50 dark:hover:border-neutral-100/50">
                  <div className="text-sm font-mono text-neutral-400 dark:text-neutral-500 mb-4 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-colors">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors text-balance">
                    {t(`process.steps.${index}.title`)}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-loose text-lg max-w-xl mb-6 text-balance">
                    {t(`process.steps.${index}.desc`)}
                  </p>
                  <div className="inline-block border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-1 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900">
                    {t(`process.steps.${index}.checkpoint`)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Noctra Ecosystem */}
      <ImpactSection />
    </main>
  );
}
