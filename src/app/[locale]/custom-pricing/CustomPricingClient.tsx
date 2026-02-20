"use client";

import { useTranslations } from "next-intl";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

// Price ranges for estimation
const PRICE_RANGES: Record<string, Record<string, [number, number]>> = {
  website: {
    small: [20000, 30000],
    medium: [30000, 45000],
    large: [45000, 65000],
  },
  ecommerce: {
    small: [35000, 50000],
    medium: [50000, 75000],
    large: [75000, 110000],
  },
  custom: {
    small: [50000, 70000],
    medium: [70000, 100000],
    large: [100000, 180000],
  },
  unsure: {
    small: [20000, 35000],
    medium: [35000, 65000],
    large: [65000, 130000],
  },
};

const MODULE_PRICES: Record<number, number> = {
  0: 12000, // blog
  1: 18000, // multi-language
  2: 25000, // client portal
  3: 15000, // payment
};

export default function CustomPricingClient() {
  const t = useTranslations("CustomPricingPage");
  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState("");
  const [pageSize, setPageSize] = useState("");
  const [selectedModules, setSelectedModules] = useState<number[]>([]);
  const [timeline, setTimeline] = useState("");

  const isComplete = serviceType && pageSize && timeline;

  const calculateRange = (): [number, number] => {
    const base = PRICE_RANGES[serviceType || "unsure"][pageSize || "small"] || [
      20000, 35000,
    ];
    const modulesTotal = selectedModules.reduce(
      (sum, i) => sum + (MODULE_PRICES[i] || 0),
      0,
    );
    return [base[0] + modulesTotal, base[1] + modulesTotal];
  };

  const toggleModule = (index: number) => {
    setSelectedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const steps = [
    { key: "step1", title: t("step1_title") },
    { key: "step2", title: t("step2_title") },
    { key: "step3", title: t("step3_title") },
    { key: "step4", title: t("step4_title") },
  ];

  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen bg-transparent text-neutral-50 relative">
      {/* Hero */}
      <section className="flex flex-col justify-center px-6 md:px-8 pt-32 pb-16 border-b border-neutral-800 relative z-10">
        <div className="max-w-3xl mx-auto w-full text-center">
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t("title")}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-neutral-400">
            {t("subtitle")}
          </m.p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-16 px-6 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-12">
            {steps.map((stepItem, i) => (
              <div
                key={stepItem.key}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step ? "bg-white" : "bg-neutral-800"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Service Type */}
            {step === 0 && (
              <m.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6">
                <h2 className="text-2xl font-bold">{t("step1_title")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={t(`step1_options.${i}.value`)}
                      onClick={() => {
                        setServiceType(t(`step1_options.${i}.value`));
                        setStep(1);
                      }}
                      className={`p-5 rounded-xl border text-left transition-all duration-200 hover:border-white/50 ${
                        serviceType === t(`step1_options.${i}.value`)
                          ? "border-white bg-white/5"
                          : "border-neutral-800 bg-neutral-900/50"
                      }`}>
                      <span className="font-medium">
                        {t(`step1_options.${i}.label`)}
                      </span>
                    </button>
                  ))}
                </div>
              </m.div>
            )}

            {/* Step 2: Page Size */}
            {step === 1 && (
              <m.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6">
                <h2 className="text-2xl font-bold">{t("step2_title")}</h2>
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={t(`step2_options.${i}.value`)}
                      onClick={() => {
                        setPageSize(t(`step2_options.${i}.value`));
                        setStep(2);
                      }}
                      className={`w-full p-5 rounded-xl border text-left transition-all duration-200 hover:border-white/50 ${
                        pageSize === t(`step2_options.${i}.value`)
                          ? "border-white bg-white/5"
                          : "border-neutral-800 bg-neutral-900/50"
                      }`}>
                      <span className="font-medium">
                        {t(`step2_options.${i}.label`)}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </m.div>
            )}

            {/* Step 3: Add-ons */}
            {step === 2 && (
              <m.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6">
                <h2 className="text-2xl font-bold">{t("step3_title")}</h2>
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={t(`step3_options.${i}.label`)}
                      onClick={() => toggleModule(i)}
                      className={`w-full p-5 rounded-xl border text-left transition-all duration-200 hover:border-white/50 flex items-center justify-between ${
                        selectedModules.includes(i)
                          ? "border-white bg-white/5"
                          : "border-neutral-800 bg-neutral-900/50"
                      }`}>
                      <span className="font-medium">
                        {t(`step3_options.${i}.label`)}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-neutral-500">
                          {t(`step3_options.${i}.price`)}
                        </span>
                        {selectedModules.includes(i) && (
                          <Check className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 text-sm text-white font-medium hover:text-neutral-300 transition-colors">
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </m.div>
            )}

            {/* Step 4: Timeline */}
            {step === 3 && (
              <m.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6">
                <h2 className="text-2xl font-bold">{t("step4_title")}</h2>
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={t(`step4_options.${i}.value`)}
                      onClick={() => {
                        setTimeline(t(`step4_options.${i}.value`));
                        setStep(4);
                      }}
                      className={`w-full p-5 rounded-xl border text-left transition-all duration-200 hover:border-white/50 ${
                        timeline === t(`step4_options.${i}.value`)
                          ? "border-white bg-white/5"
                          : "border-neutral-800 bg-neutral-900/50"
                      }`}>
                      <span className="font-medium">
                        {t(`step4_options.${i}.label`)}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </m.div>
            )}

            {/* Result */}
            {step === 4 && isComplete && (
              <m.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8">
                <div className="p-10 rounded-2xl border border-white/20 bg-white/5 text-center">
                  <h2 className="text-xl font-bold mb-2">
                    {t("result_title")}
                  </h2>
                  <p className="text-5xl md:text-6xl font-bold tracking-tight my-6">
                    ${calculateRange()[0].toLocaleString()} – $
                    {calculateRange()[1].toLocaleString()}{" "}
                    <span className="text-lg text-neutral-400 font-normal">
                      MXN
                    </span>
                  </p>
                  <p className="text-sm text-neutral-500 max-w-md mx-auto">
                    {t("result_note")}
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full h-14 px-10 text-lg bg-white text-black hover:bg-neutral-200 transition-colors duration-300">
                    <Link
                      href={{
                        pathname: "/contact",
                        query: { intent: "pricing" },
                      }}>
                      {t("cta")}
                    </Link>
                  </Button>
                  <p className="text-neutral-500 text-sm">
                    {t("cta_subtitle")}
                  </p>
                  <button
                    onClick={() => {
                      setStep(0);
                      setServiceType("");
                      setPageSize("");
                      setSelectedModules([]);
                      setTimeline("");
                    }}
                    className="text-sm text-neutral-500 hover:text-white transition-colors mt-4 block mx-auto">
                    Start over
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
    </LazyMotion>
  );
}
