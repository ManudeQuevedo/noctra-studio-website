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
  const fieldIds = {
    name: "contact-name",
    email: "contact-email",
    phone: "contact-phone",
    service: "contact-service",
    budget: "contact-budget",
    message: "contact-message",
  } as const;
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
    const isPhoneValid = val ? isValidPhoneNumber(val) : null;
    setPhoneValid(isPhoneValid);
    setValue("phone", val, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: Boolean(val),
    });
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
        : ["service", "budget"];

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
      <main className="relative flex min-h-screen flex-col bg-transparent pt-[calc(env(safe-area-inset-top)+5.25rem)] text-white lg:flex-row lg:pt-0">
        {/* Left Side: Brand & Trust (40%) */}
        <div className="relative z-10 w-full border-b border-white/5 bg-black/20 px-6 pb-10 pt-4 backdrop-blur-md sm:px-8 sm:pb-12 sm:pt-6 lg:w-[40%] lg:border-b-0 lg:border-r lg:p-16 lg:pt-32">
          <div className="mx-auto max-w-xl space-y-10 lg:mx-0 lg:space-y-12">
            {/* Logo placeholder - assuming there's a logo component or image elsewhere, 
                but based on the current code, we just had the H1 here. 
                I'll keep the H1 as requested but with the new styling. */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4">
              <div className="max-w-[20rem] space-y-5 pr-10 sm:max-w-[24rem] sm:pr-0 lg:max-w-none">
                <h1 className="text-[clamp(2.85rem,14vw,4.75rem)] font-black leading-[0.9] tracking-tight md:text-7xl">
                  {t("hero.title_part1")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                    {t("hero.title_part2")}
                  </span>
                </h1>
                <p className="max-w-md text-base font-medium leading-relaxed text-neutral-400 sm:text-lg lg:text-xl">
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
          <div className="flex w-full flex-1 flex-col justify-center px-6 py-12 sm:px-8 sm:py-14 lg:px-24 lg:py-32">
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
                  <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                        {t(`steps.step_${currentStep}.label`)}
                      </span>
                      <h2 className="text-3xl font-black text-white sm:text-[2rem]">
                        {t(`steps.step_${currentStep}.title`)}
                      </h2>
                    </div>
                    <div className="flex gap-2 self-start sm:self-auto">
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
                        role="alert"
                        aria-live="polite"
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
                            <div className="space-y-8 sm:space-y-10">
                              {/* Input Field: Name */}
                              <div className="space-y-4">
                                <label
                                  htmlFor={fieldIds.name}
                                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.name_label")}
                                </label>
                                <div className="relative group">
                                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-700 group-focus-within:text-emerald-500 transition-colors" />
                                  <input
                                    id={fieldIds.name}
                                    {...register("name", { required: true })}
                                    placeholder={t("form.name_placeholder")}
                                    autoComplete="name"
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={
                                      errors.name
                                        ? `${fieldIds.name}-error`
                                        : undefined
                                    }
                                    className={cn(
                                      "w-full bg-transparent border-b py-4 pl-10 text-xl outline-none transition-all duration-500 font-mono text-white placeholder:text-neutral-700 sm:text-2xl",
                                      errors.name
                                        ? "border-red-500/50"
                                        : "border-neutral-800 focus:border-emerald-500",
                                    )}
                                  />
                                  {errors.name && (
                                    <span
                                      id={`${fieldIds.name}-error`}
                                      aria-live="polite"
                                      className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                      {t("validation.required")}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Input Field: Email */}
                              <div className="space-y-4">
                                <label
                                  htmlFor={fieldIds.email}
                                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.email_label")}
                                </label>
                                <div className="relative group">
                                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-700 group-focus-within:text-emerald-500 transition-colors" />
                                  <input
                                    id={fieldIds.email}
                                    type="email"
                                    {...register("email", {
                                      required: true,
                                      pattern: /^\S+@\S+$/i,
                                    })}
                                    placeholder={t("form.email_placeholder")}
                                    autoComplete="email"
                                    inputMode="email"
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={
                                      errors.email
                                        ? `${fieldIds.email}-error`
                                        : undefined
                                    }
                                    className={cn(
                                      "w-full bg-transparent border-b py-4 pl-10 text-xl outline-none transition-all duration-500 font-mono text-white placeholder:text-neutral-700 sm:text-2xl",
                                      errors.email
                                        ? "border-red-500/50"
                                        : "border-neutral-800 focus:border-emerald-500",
                                    )}
                                  />
                                  {errors.email && (
                                    <span
                                      id={`${fieldIds.email}-error`}
                                      aria-live="polite"
                                      className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                      {t("validation.invalid_email")}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Input Field: Phone */}
                              <div className="space-y-4">
                                <label
                                  htmlFor={fieldIds.phone}
                                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.phone_label")}
                                </label>
                                <div className="relative group">
                                  <input
                                    type="hidden"
                                    {...register("phone", {
                                      required: t("validation.required"),
                                      validate: (value) =>
                                        !value
                                          ? t("validation.required")
                                          : isValidPhoneNumber(value || "")
                                          ? true
                                          : t("validation.phone_format"),
                                    })}
                                  />
                                  <PhoneInput
                                    id={fieldIds.phone}
                                    defaultCountry="MX"
                                    value={watchAll.phone}
                                    onChange={handlePhoneChange}
                                    flags={flags}
                                    autoComplete="tel"
                                    aria-invalid={Boolean(errors.phone)}
                                    aria-describedby={
                                      errors.phone
                                        ? `${fieldIds.phone}-error`
                                        : undefined
                                    }
                                    className={cn(
                                      "phone-input-container !border-t-0 !border-x-0 rounded-none !py-0",
                                      phoneValid === true && "valid",
                                      phoneValid === false && "invalid",
                                    )}
                                    placeholder={t("form.phone_placeholder")}
                                    international
                                    countryCallingCodeEditable={false}
                                  />
                                  {errors.phone && (
                                    <span
                                      id={`${fieldIds.phone}-error`}
                                      aria-live="polite"
                                      className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                      {errors.phone.message ||
                                        t("validation.phone_format")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div className="space-y-10 sm:space-y-12">
                              <div className="space-y-6">
                                <label
                                  htmlFor={fieldIds.service}
                                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.service_label")}
                                </label>
                                <input
                                  id={fieldIds.service}
                                  type="hidden"
                                  {...register("service", { required: true })}
                                />
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
                                      aria-pressed={watchAll.service === service}
                                      aria-describedby={
                                        errors.service
                                          ? `${fieldIds.service}-error`
                                          : undefined
                                      }
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
                                {errors.service && (
                                  <p
                                    id={`${fieldIds.service}-error`}
                                    aria-live="polite"
                                    className="text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                    {t("validation.required")}
                                  </p>
                                )}
                              </div>

                              <div className="space-y-6">
                                <label
                                  htmlFor={fieldIds.budget}
                                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.budget_label")}
                                </label>
                                <input
                                  id={fieldIds.budget}
                                  type="hidden"
                                  {...register("budget", { required: true })}
                                />
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
                                      aria-pressed={watchAll.budget === budget}
                                      aria-describedby={
                                        errors.budget
                                          ? `${fieldIds.budget}-error`
                                          : undefined
                                      }
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
                                      <div className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                                        {t(
                                          `form.budgets.${watchAll.currency}.${budget}`,
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                {errors.budget && (
                                  <p
                                    id={`${fieldIds.budget}-error`}
                                    aria-live="polite"
                                    className="text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
                                    {t("validation.required")}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div className="space-y-10">
                              <div className="space-y-4">
                                <label
                                  htmlFor={fieldIds.message}
                                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                  {t("form.message_label")}
                                </label>
                                <div className="relative group">
                                  <MessageSquare className="absolute left-0 top-4 w-5 h-5 text-neutral-700 group-focus-within:text-emerald-500 transition-colors" />
                                  <textarea
                                    id={fieldIds.message}
                                    {...register("message", {
                                      required: true,
                                    })}
                                    placeholder={t("form.message_placeholder")}
                                    rows={5}
                                    autoComplete="off"
                                    aria-invalid={Boolean(errors.message)}
                                    aria-describedby={
                                      errors.message
                                        ? `${fieldIds.message}-error`
                                        : undefined
                                    }
                                    className={cn(
                                      "w-full bg-transparent border-b py-4 pl-10 text-lg outline-none transition-all duration-500 font-mono text-white placeholder:text-neutral-700 resize-none sm:text-xl",
                                      errors.message
                                        ? "border-red-500/50"
                                        : "border-neutral-800 focus:border-emerald-500",
                                    )}
                                  />
                                  {errors.message && (
                                    <span
                                      id={`${fieldIds.message}-error`}
                                      aria-live="polite"
                                      className="absolute left-10 -bottom-6 text-[10px] text-red-500/80 font-mono uppercase tracking-wider">
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
                      className="flex flex-col-reverse gap-3 pt-8 sm:flex-row sm:gap-4">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-8 py-4 text-sm font-bold transition-all group hover:bg-white/10 sm:py-5">
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          {t("steps.back")}
                        </button>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-sm font-black uppercase tracking-widest text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-400 disabled:grayscale disabled:opacity-30 sm:flex-1 sm:py-5">
                          {t("steps.next")}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 py-4 text-sm font-black uppercase tracking-widest text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:bg-emerald-400 disabled:opacity-50 sm:flex-1 sm:py-5">
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
