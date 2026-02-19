"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Instagram,
  MapPin,
  Clock,
  Phone,
  FileText,
  Settings2,
  Rocket,
  Zap,
  Check,
  AlertCircle,
  DollarSign,
  MessageSquare,
  User,
  Mail,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { RouteScopedBackground } from "@/components/ui/RouteScopedBackground";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  currency: "mxn" | "usd";
  budget: string;
  source: string;
  timeline: string;
  details: string;
};

const TestimonialSidebar = () => {
  const t = useTranslations("ContactPage");
  const testimonials = t.raw("testimonials") as {
    quote: string;
    author: string;
  }[];

  return (
    <div className="space-y-8 lg:sticky lg:top-40 h-fit">
      <div className="space-y-6">
        <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest px-4 border-l border-neutral-800">
          {t("testimonials_title")}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/20 transition-colors group">
              <MessageSquare className="w-4 h-4 text-emerald-500/40 mb-4 group-hover:text-emerald-500 transition-colors" />
              <p className="text-sm text-neutral-300 italic mb-4 leading-relaxed">
                "{test.quote}"
              </p>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                — {test.author}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="pt-8 border-t border-neutral-900 grid grid-cols-2 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono uppercase tracking-tight">
            <Check className="w-3 h-3 text-emerald-500" />
            {t(`hero.trust_badges.${i}`)}
          </div>
        ))}
      </div>
    </div>
  );
};

const ExpectationsCard = () => {
  const t = useTranslations("ContactPage");
  return (
    <div className="mt-8 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
      <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-widest">
        {t("expectations.title")}
      </h4>
      <div className="space-y-3">
        {(t.raw("expectations.items") as string[]).map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-emerald-500" />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function ContactForm() {
  const t = useTranslations("ContactPage");
  const [currentStep, setCurrentStep] = useState(1);
  const [time, setTime] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [direction, setDirection] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      currency: "mxn",
      budget: "",
      source: "",
      timeline: "",
      details: "",
    },
  });

  const watchAll = watch();
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");

  // Phone auto-formatter
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);

    // Format: (XXX) XXX XXXX
    if (val.length > 6) {
      val = `(${val.slice(0, 3)}) ${val.slice(3, 6)} ${val.slice(6)}`;
    } else if (val.length > 3) {
      val = `(${val.slice(0, 3)}) ${val.slice(3)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    setValue("phone", val);
  };

  const budgetScope = useMemo(() => {
    if (!watchAll.budget) return null;
    return t(`budget_scopes.${watchAll.budget}`);
  }, [watchAll.budget, t]);

  useEffect(() => {
    if (interest) {
      const serviceMap: Record<string, string> = {
        "digital-architecture": "website",
        "visual-identity": "ecommerce",
        "intelligent-systems": "custom_system",
        growth: "optimization",
      };
      const mappedService = serviceMap[interest];
      if (mappedService) setValue("service", mappedService);
    }
  }, [interest, setValue]);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Mexico_City",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed");
      setIsSuccess(true);
      reset();
    } catch (e) {
      alert("Error sending message.");
    }
  };

  const nextStep = async () => {
    const fieldsToValidate =
      currentStep === 1
        ? ["name", "email", "phone"]
        : ["service", "budget", "timeline"];

    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const inputClasses = (fieldName: keyof FormData) =>
    cn(
      "w-full bg-transparent border-b py-4 text-xl outline-none transition-all duration-500 font-mono text-white placeholder:text-neutral-700",
      errors[fieldName]
        ? "border-red-500/50"
        : "border-neutral-800 focus:border-emerald-500 focus:pl-4 pl-0",
    );

  return (
    <main className="min-h-screen text-white pt-32 pb-24 relative overflow-hidden">
      <RouteScopedBackground />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Main Info Column */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-7xl font-black tracking-tight mb-8 leading-none">
                {t("hero.title")}
              </motion.h1>
              <p className="text-xl text-neutral-400 font-medium leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>

            <div className="hidden lg:block">
              <TestimonialSidebar />
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8 flex flex-col pt-8 lg:pt-0">
            {isSuccess ? (
              <SuccessState t={t} onReset={() => setIsSuccess(false)} />
            ) : (
              <div className="flex flex-col h-full bg-neutral-950/20 backdrop-blur-sm border border-white/[0.03] rounded-[2.5rem] p-8 md:p-12">
                {/* Progress Header */}
                <div className="flex items-center justify-between mb-16">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                      {t(`steps.step_${currentStep}.label`)}
                    </span>
                    <h2 className="text-2xl font-black text-white">
                      {t(`steps.step_${currentStep}.title`)}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={cn(
                          "w-2.4 h-2 rounded-full transition-all duration-500",
                          s === currentStep
                            ? "w-8 bg-emerald-500"
                            : s < currentStep
                              ? "bg-emerald-900"
                              : "bg-neutral-800",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex-1 flex flex-col">
                  <div className="relative overflow-hidden flex-1 min-h-[400px]">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full">
                        {currentStep === 1 && (
                          <div className="space-y-12">
                            <div className="group relative">
                              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                                {t("form.name_label")}
                              </label>
                              <div className="relative">
                                <User className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700" />
                                <input
                                  {...register("name", { required: true })}
                                  placeholder={t("form.name_placeholder")}
                                  className={inputClasses("name")}
                                />
                              </div>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                                {t("form.email_label")}
                              </label>
                              <div className="relative">
                                {watchAll.email &&
                                !errors.email &&
                                /^\S+@\S+$/i.test(watchAll.email) ? (
                                  <Check className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Mail className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700" />
                                )}
                                <input
                                  {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i,
                                  })}
                                  placeholder={t("form.email_placeholder")}
                                  className={inputClasses("email")}
                                />
                              </div>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                                {t("form.phone_label")}
                              </label>
                              <div className="relative">
                                <Phone className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700" />
                                <input
                                  {...register("phone")}
                                  onChange={handlePhoneChange}
                                  placeholder={t("form.phone_placeholder")}
                                  className={inputClasses("phone")}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="space-y-12">
                            <div className="group relative">
                              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                                {t("form.service_label")}
                              </label>
                              <select
                                {...register("service", { required: true })}
                                className={cn(
                                  inputClasses("service"),
                                  "appearance-none cursor-pointer",
                                )}>
                                <option
                                  value=""
                                  disabled
                                  className="bg-neutral-900">
                                  {t("form.service_placeholder")}
                                </option>
                                {[
                                  "website",
                                  "ecommerce",
                                  "custom_system",
                                  "optimization",
                                  "not_sure",
                                ].map((opt) => (
                                  <option
                                    key={opt}
                                    value={opt}
                                    className="bg-neutral-900">
                                    {t(`form.service_options.${opt}`)}
                                  </option>
                                ))}
                              </select>
                              <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 pointer-events-none rotate-90" />
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.budget_label")}
                                </label>
                                <div className="flex gap-1 p-0.5 bg-white/5 rounded-full border border-white/10">
                                  {(["mxn", "usd"] as const).map((curr) => (
                                    <button
                                      key={curr}
                                      type="button"
                                      onClick={() => setValue("currency", curr)}
                                      className={cn(
                                        "px-2 py-0.5 text-[9px] font-bold uppercase rounded-full transition-all",
                                        watchAll.currency === curr
                                          ? "bg-white text-black"
                                          : "text-neutral-500",
                                      )}>
                                      {curr}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {[
                                  "20-35k",
                                  "35-50k",
                                  "50-80k",
                                  "80-120k",
                                  "120k+",
                                  "monthly",
                                  "discuss",
                                ].map((key) => (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() =>
                                      setValue("budget", key, {
                                        shouldValidate: true,
                                      })
                                    }
                                    className={cn(
                                      "p-3 rounded-xl border text-left transition-all text-xs font-bold",
                                      watchAll.budget === key
                                        ? "bg-emerald-500/10 border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                        : "bg-white/5 border-white/5 text-neutral-400 hover:border-white/10",
                                    )}>
                                    {t(
                                      `form.budget_options.${watchAll.currency}.${key}`,
                                    )}
                                  </button>
                                ))}
                              </div>
                              <AnimatePresence>
                                {budgetScope && (
                                  <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="text-[10px] font-mono text-emerald-500/80 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                                    <Zap className="inline w-3 h-3 mr-2 -mt-0.5" />
                                    Scope: {budgetScope}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                                {t("form.timeline_label")}
                              </label>
                              <select
                                {...register("timeline", { required: true })}
                                className={cn(
                                  inputClasses("timeline"),
                                  "appearance-none cursor-pointer",
                                )}>
                                <option
                                  value=""
                                  disabled
                                  className="bg-neutral-900">
                                  {t("form.timeline_placeholder")}
                                </option>
                                {["asap", "3_months", "6_months", "future"].map(
                                  (opt) => (
                                    <option
                                      key={opt}
                                      value={opt}
                                      className="bg-neutral-900">
                                      {t(`form.timeline_options.${opt}`)}
                                    </option>
                                  ),
                                )}
                              </select>
                              <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 pointer-events-none rotate-90" />
                            </div>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="space-y-12">
                            <div className="group relative">
                              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                                {t("form.source_label")}
                              </label>
                              <select
                                {...register("source")}
                                className={cn(
                                  inputClasses("source"),
                                  "appearance-none cursor-pointer",
                                )}>
                                <option value="" className="bg-neutral-900">
                                  {t("form.source_placeholder")}
                                </option>
                                {[
                                  "google",
                                  "referral",
                                  "linkedin",
                                  "social",
                                  "other",
                                ].map((opt) => (
                                  <option
                                    key={opt}
                                    value={opt}
                                    className="bg-neutral-900">
                                    {t(`form.source_options.${opt}`)}
                                  </option>
                                ))}
                              </select>
                              <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 pointer-events-none rotate-90" />
                            </div>

                            <div className="group relative">
                              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                                {t("form.details_label")}
                              </label>
                              <textarea
                                {...register("details")}
                                placeholder={t("form.details_placeholder")}
                                rows={4}
                                className={cn(
                                  inputClasses("details"),
                                  "resize-none h-auto max-h-48 scrollbar-hide",
                                )}
                              />
                            </div>

                            <ExpectationsCard />
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-12 flex gap-4">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 lg:flex-none px-8 py-5 rounded-full border border-neutral-800 hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        {t("steps.back")}
                      </button>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 bg-white text-black py-5 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all">
                        {t("steps.next")}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-5 rounded-full text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50">
                        {isSubmitting ? t("form.sending") : t("form.submit")}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Mobile Testimonials */}
            <div className="mt-16 lg:hidden">
              <TestimonialSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-48 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-neutral-900 pt-16">
        <div className="space-y-4">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
            WhatsApp
          </span>
          <a
            href={`https://wa.me/${t("details.whatsapp_number").replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-70 transition-opacity group w-fit">
            <FaWhatsapp className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold">
              {t("details.whatsapp_number")}
            </span>
          </a>
        </div>
        <div className="space-y-4">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
            Location
          </span>
          <div className="flex items-center gap-3 text-xl font-bold">
            <MapPin className="w-5 h-5 text-emerald-500" />
            {t("details.location_value")}
          </div>
        </div>
        <div className="space-y-4">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
            Timezone
          </span>
          <div className="flex items-center gap-3 text-xl font-bold tabular-nums">
            <Clock className="w-5 h-5 text-emerald-500" />
            {time}
          </div>
        </div>
      </div>
    </main>
  );
}

const SuccessState = ({ t, onReset }: { t: any; onReset: () => void }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="w-full max-w-md mx-auto text-center space-y-8">
    <div className="bg-white text-black p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500" />
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <Check className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-3xl font-black tracking-tight mb-4">
        {t("success.title")}
      </h3>
      <p className="text-neutral-600 font-medium mb-12">
        {t("success.message")}
      </p>

      <div className="space-y-6 pt-8 border-t border-neutral-100">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          Request ID: #NOC-{Math.floor(Math.random() * 9000) + 1000}
        </div>
        <button
          onClick={onReset}
          className="text-sm font-bold text-neutral-400 hover:text-black transition-colors">
          {t("success.action")}
        </button>
      </div>
    </div>
  </motion.div>
);

export default function ContactClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-48 text-center font-mono opacity-50">
          INITIALIZING...
        </div>
      }>
      <ContactForm />
    </Suspense>
  );
}
