"use client";

import { useState, useEffect, Suspense, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
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
  Target,
  ExternalLink,
} from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
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
  message: string;
  source: string;
  timeline: string;
  intent: string;
  cta: string;
  locale: string;
  website?: string;
};

const TestimonialSidebar = () => {
  const t = useTranslations("ContactPage");
  const testimonials = t.raw("testimonials") as {
    quote: string;
    author: string;
    icon?: string;
  }[];

  return (
    <div className="space-y-8 lg:sticky lg:top-40 h-fit">
      <div className="space-y-6">
        <h3 className="text-xs font-mono text-neutral-300 uppercase tracking-widest px-4 border-l border-neutral-800">
          {t("testimonials_title")}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((test, i) => (
            <m.div
              key={test.author}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/20 transition-colors group">
              {test.icon === "zap" && (
                <Zap className="w-4 h-4 text-emerald-500/40 mb-4 group-hover:text-emerald-500 transition-colors" />
              )}
              {test.icon === "file-text" && (
                <FileText className="w-4 h-4 text-emerald-500/40 mb-4 group-hover:text-emerald-500 transition-colors" />
              )}
              {test.icon === "target" && (
                <Target className="w-4 h-4 text-emerald-500/40 mb-4 group-hover:text-emerald-500 transition-colors" />
              )}
              {!test.icon && (
                <MessageSquare className="w-4 h-4 text-emerald-500/40 mb-4 group-hover:text-emerald-500 transition-colors" />
              )}

              <p className="text-sm text-neutral-300 mb-4 leading-relaxed font-medium">
                {test.quote}
              </p>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500/60 group-hover:text-emerald-500 transition-colors">
                — {test.author}
              </span>
            </m.div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="pt-8 border-t border-neutral-900 grid grid-cols-2 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={t(`hero.trust_badges.${i}`)}
            className="flex items-center gap-2 text-[10px] text-neutral-300 font-mono uppercase tracking-tight">
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
          <div key={item} className="flex items-start gap-3">
            <div className="mt-1 shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-emerald-500" />
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">{item}</p>
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
  const [requestId, setRequestId] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [direction, setDirection] = useState(0);
  const [phoneValid, setPhoneValid] = useState<boolean | null>(null);

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
      message: "",
      intent: "",
      cta: "",
      locale: "",
    },
  });

  const watchAll = watch();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const csrfToken = useRef<string>("");
  const formLoadTime = useRef<number>(0);
  const [securityError, setSecurityError] = useState<{
    type: "duplicate_email" | "rate_limited" | "invalid_csrf" | "generic";
    message: string;
  } | null>(null);

  // Derived variables
  const budgetScope = useMemo(() => {
    if (!watchAll.budget) return null;
    return t(`budget_scopes.${watchAll.budget}`);
  }, [watchAll.budget, t]);

  const interest = searchParams.get("interest");
  const tipo = searchParams.get("tipo");
  const planParam = searchParams.get("plan");
  const descuento = searchParams.get("descuento");
  const servicioParam = searchParams.get("servicio");
  const precioParam = searchParams.get("precio");
  const intentParam = searchParams.get("intent") || "general";
  const ctaParam = searchParams.get("cta") || "direct";

  // Phone handler for react-phone-number-input
  const handlePhoneChange = (value: string | undefined) => {
    const val = value || "";
    setValue("phone", val);
    if (val) {
      setPhoneValid(isValidPhoneNumber(val));
    } else {
      setPhoneValid(null);
    }
  };

  useEffect(() => {
    formLoadTime.current = Date.now();
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((d) => {
        csrfToken.current = d.token;
      })
      .catch((err) => console.error("Failed to fetch CSRF token:", err));

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

  useEffect(() => {
    // 1. Handle "interest" (legacy)
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

    // 2. Handle new "tipo" and "servicio" params
    if (servicioParam) {
      const opts = ["website", "ecommerce", "custom_system", "optimization"];
      const s = servicioParam.toLowerCase();
      if (opts.includes(s)) {
        setValue("service", s);
      } else if (s.includes("web")) {
        setValue("service", "website");
      } else if (s.includes("commer") || s.includes("tienda")) {
        setValue("service", "ecommerce");
      }
    }

    let detailsParts: string[] = [];
    if (planParam) {
      detailsParts.push(
        `Interés en plan: ${planParam}${precioParam ? ` (${precioParam})` : ""}`,
      );
    }
    if (descuento) {
      detailsParts.push(`Aplicar descuento: ${descuento}%`);
    }

    if (detailsParts.length > 0) {
      setValue("message", detailsParts.join("\n"));
    }

    if (tipo === "automatizacion") {
      setValue("service", "custom_system");
    }

    // Set origin tracking fields
    setValue("intent", intentParam);
    setValue("cta", ctaParam);
    setValue("locale", locale);
  }, [
    interest,
    servicioParam,
    planParam,
    precioParam,
    descuento,
    tipo,
    intentParam,
    ctaParam,
    locale,
    setValue,
  ]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          csrf_token: csrfToken.current,
          form_load_time: formLoadTime.current,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setSecurityError({
            type: "duplicate_email",
            message:
              locale === "es"
                ? "◆ Ya tenemos tu correo registrado. Te contactaremos a la brevedad."
                : "◆ We already have your email on file. We'll be in touch shortly.",
          });
          return;
        }
        if (response.status === 429) {
          setSecurityError({
            type: "rate_limited",
            message:
              locale === "es"
                ? "⚠ Demasiados intentos. Intenta de nuevo en 60 minutos."
                : "⚠ Too many attempts. Please try again in 60 minutes.",
          });
          return;
        }
        if (response.status === 403) {
          setSecurityError({
            type: "invalid_csrf",
            message:
              locale === "es"
                ? "Sesión expirada. Recarga la página e intenta de nuevo."
                : "Session expired. Please reload the page and try again.",
          });
          return;
        }
        throw new Error("Submission failed");
      }
      const responseData = await response.json();
      setIsSuccess(true);
      setRequestId(responseData.requestId || "NOC-0000");
      setSubmittedName(watchAll.name);
      reset();
    } catch (error) {
      console.error(error);
      setSecurityError({
        type: "generic",
        message:
          locale === "es"
            ? "Algo salió mal. Intenta de nuevo."
            : "Something went wrong. Please try again.",
      });
    } finally {
      // setIsSubmitting(false); // isSubmitting is managed by react-hook-form
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
    <LazyMotion features={domAnimation}>
      <RouteScopedBackground />
      <main className="text-white relative flex flex-col lg:flex-row bg-transparent">
        {/* Left Side: Brand & Trust (40%) */}
        <div className="lg:w-[40%] w-full p-8 lg:p-16 lg:pt-32 relative z-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 backdrop-blur-md">
          <div className="space-y-12 max-w-xl mx-auto lg:mx-0">
            {/* Logo placeholder - assuming there's a logo component or image elsewhere, 
                but based on the current code, we just had the H1 here. 
                I'll keep the H1 as requested but with the new styling. */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
                  {t("hero.title_part1")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                    {t("hero.title_part2")}
                  </span>
                </h1>
                <p className="text-xl text-neutral-400 font-medium leading-relaxed max-w-md">
                  {t("hero.subtitle")}
                </p>
              </div>
            </m.div>

            {tipo === "socio-fundador" && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-emerald-500 font-bold text-sm">
                  🚀 {t("hero.special_badge")}
                </p>
              </m.div>
            )}

            {tipo === "automatizacion" && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-blue-400 font-bold text-sm">
                  🤖 {t("hero.ai_badge")}
                </p>
              </m.div>
            )}
          </div>

          {/* Static Compromisos / Testimonials */}
          <div className="hidden lg:block lg:mt-16">
            <TestimonialSidebar />
          </div>
        </div>

        {/* Right Side: Interactive Form (60%) */}
        <div className="lg:w-[60%] w-full flex flex-col relative z-10">
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-16 lg:py-32 w-full">
            <div className="max-w-xl mx-auto w-full">
              {isSuccess ? (
                <SuccessState
                  t={t}
                  requestId={requestId}
                  name={submittedName}
                  locale={locale}
                  onReset={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                  }}
                />
              ) : (
                <div className="w-full space-y-12">
                  {/* Progress Header - Minimalist & Always Visible */}
                  <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                        {t(`steps.step_${currentStep}.label`)}
                      </span>
                      <h2 className="text-3xl font-black text-white">
                        {t(`steps.step_${currentStep}.title`)}
                      </h2>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-500 border border-white/10",
                            s === currentStep
                              ? "w-10 bg-emerald-500 border-emerald-500"
                              : s < currentStep
                                ? "bg-emerald-950/50"
                                : "bg-neutral-900",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {securityError && (
                      <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 bg-neutral-900/50 border-l-2 font-mono text-sm tracking-tight mb-8 ${
                          securityError.type === "duplicate_email"
                            ? "border-emerald-500 text-emerald-500"
                            : securityError.type === "rate_limited"
                              ? "border-amber-500 text-amber-500"
                              : "border-red-500 text-red-500"
                        }`}>
                        {securityError.message}
                      </m.div>
                    )}

                    <div className="relative overflow-visible">
                      {" "}
                      {/** Changed to overflow-visible to show errors without layout shift */}
                      <AnimatePresence mode="wait" custom={direction}>
                        <m.div
                          key={currentStep}
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="w-full">
                          {currentStep === 1 && (
                            <div className="space-y-10">
                              {/* Input Field: Name */}
                              <div className="space-y-4">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.name_label")}
                                </label>
                                <div className="relative group">
                                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-700 group-focus-within:text-emerald-500 transition-colors" />
                                  <input
                                    {...register("name", { required: true })}
                                    placeholder={t("form.name_placeholder")}
                                    className={cn(
                                      "w-full bg-transparent border-b py-4 pl-10 text-2xl outline-none transition-all duration-500 font-mono text-white placeholder:text-neutral-800",
                                      errors.name
                                        ? "border-red-500/50"
                                        : "border-neutral-800 focus:border-emerald-500",
                                    )}
                                  />
                                  {errors.name && (
                                    <span className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                      {t("validation.required")}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Input Field: Email */}
                              <div className="space-y-4">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.email_label")}
                                </label>
                                <div className="relative group">
                                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-700 group-focus-within:text-emerald-500 transition-colors" />
                                  <input
                                    {...register("email", {
                                      required: true,
                                      pattern: /^\S+@\S+$/i,
                                    })}
                                    placeholder={t("form.email_placeholder")}
                                    className={cn(
                                      "w-full bg-transparent border-b py-4 pl-10 text-2xl outline-none transition-all duration-500 font-mono text-white placeholder:text-neutral-800",
                                      errors.email
                                        ? "border-red-500/50"
                                        : "border-neutral-800 focus:border-emerald-500",
                                    )}
                                  />
                                  {errors.email && (
                                    <span className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                      {t("validation.invalid_email")}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Input Field: Phone */}
                              <div className="space-y-4">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.phone_label")}
                                </label>
                                <div className="relative group">
                                  <PhoneInput
                                    defaultCountry="MX"
                                    value={watchAll.phone}
                                    onChange={handlePhoneChange}
                                    flags={flags}
                                    className={cn(
                                      "phone-input-container !border-t-0 !border-x-0 rounded-none !py-0",
                                      phoneValid === true && "valid",
                                      phoneValid === false && "invalid",
                                    )}
                                    placeholder={t("form.phone_placeholder")}
                                    international
                                    countryCallingCodeEditable={false}
                                  />
                                  {phoneValid === false && (
                                    <span className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                      {t("validation.phone_format")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div className="space-y-12">
                              <div className="space-y-6">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.service_label")}
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {[
                                    "website",
                                    "ecommerce",
                                    "custom_system",
                                    "optimization",
                                    "discovery_call",
                                    "not_sure",
                                  ].map((service) => (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={() =>
                                        setValue("service", service as any, {
                                          shouldValidate: true,
                                        })
                                      }
                                      className={cn(
                                        "p-5 border text-left transition-all duration-300 rounded-xl group relative overflow-hidden",
                                        watchAll.service === service
                                          ? "bg-emerald-500/10 border-emerald-500 text-white"
                                          : "bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20",
                                      )}>
                                      <div className="text-[11px] font-bold uppercase tracking-wider">
                                        {t(`form.services.${service}`)}
                                      </div>
                                      {watchAll.service === service && (
                                        <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-6">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.budget_label")}
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  {[
                                    "20-35k",
                                    "35-50k",
                                    "50-80k",
                                    "80-120k",
                                    "120k+",
                                    "monthly",
                                    "discuss",
                                  ].map((budget) => (
                                    <button
                                      key={budget}
                                      type="button"
                                      onClick={() =>
                                        setValue("budget", budget as any, {
                                          shouldValidate: true,
                                        })
                                      }
                                      className={cn(
                                        "p-4 border text-center transition-all duration-300 rounded-xl",
                                        watchAll.budget === budget
                                          ? "bg-emerald-500/10 border-emerald-500 text-white"
                                          : "bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20",
                                      )}>
                                      <div className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                        {t(
                                          `form.budgets.${watchAll.currency}.${budget}`,
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div className="space-y-10">
                              <div className="space-y-4">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.message_label")}
                                </label>
                                <div className="relative group">
                                  <MessageSquare className="absolute left-0 top-4 w-5 h-5 text-neutral-700 group-focus-within:text-emerald-500 transition-colors" />
                                  <textarea
                                    {...register("message", {
                                      required: true,
                                    })}
                                    placeholder={t("form.message_placeholder")}
                                    rows={5}
                                    className={cn(
                                      "w-full bg-transparent border-b py-4 pl-10 text-xl outline-none transition-all duration-500 font-mono text-white placeholder:text-neutral-800 resize-none",
                                      errors.message
                                        ? "border-red-500/50"
                                        : "border-neutral-800 focus:border-emerald-500",
                                    )}
                                  />
                                  {errors.message && (
                                    <span className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                      {t("validation.required")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </m.div>
                      </AnimatePresence>
                    </div>

                    {/* Honeypot Field */}
                    <div className="sr-only">
                      <input
                        type="text"
                        {...register("website")}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Navigation Buttons */}
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-8 flex gap-4">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-8 py-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-sm font-bold flex items-center justify-center gap-2 group">
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          {t("steps.back")}
                        </button>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={currentStep === 1 && phoneValid !== true}
                          className="flex-1 bg-emerald-500 text-black py-5 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-30 disabled:grayscale transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                          {t("steps.next")}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          disabled={
                            isSubmitting || !isValid || phoneValid !== true
                          }
                          type="submit"
                          className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-5 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                          {isSubmitting ? t("form.sending") : t("form.submit")}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </m.div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </LazyMotion>
  );
}

const SuccessState = ({
  t,
  requestId,
  name,
  locale,
  onReset,
}: {
  t: any;
  requestId: string;
  name: string;
  locale: string;
  onReset: () => void;
}) => {
  const firstName = name.split(" ")[0];

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full flex flex-col items-center text-center py-12">
      <div className="w-full max-w-[480px] flex flex-col items-center text-center">
        <span className="text-[11px] font-mono text-[#666666] uppercase tracking-[0.2em] mb-6">
          {t("success.ticket.title")}
        </span>

        <h2 className="text-4xl md:text-[42px] font-black text-white tracking-tight leading-none mb-4">
          {t("success.greeting", { name: firstName })}
        </h2>

        <p className="text-base text-[#666666] leading-relaxed mb-12 max-w-[380px]">
          {t("success.message")}
        </p>

        <div className="w-full h-px bg-[#1f1f1f] mb-8" />

        <div className="flex flex-col gap-1 mb-12">
          <span className="text-[10px] font-mono text-[#444444] tracking-[0.15em] uppercase">
            {t("success.ticket.id_label")}
          </span>
          <span className="text-sm font-bold text-white tracking-[0.1em] font-mono">
            {requestId}
          </span>
        </div>

        <button
          onClick={onReset}
          className="text-[13px] text-[#444444] underline hover:text-white transition-colors cursor-pointer">
          {t("success.action")}
        </button>

        <div className="mt-16 text-[11px] font-mono text-[#1f1f1f] tracking-[0.2em] uppercase">
          ◆ NOCTRA STUDIO
        </div>
      </div>
    </m.div>
  );
};

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
