"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Instagram, MapPin, Clock, Phone, FileText, Settings2, Rocket, Zap } from "lucide-react";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { RouteScopedBackground } from "@/components/ui/RouteScopedBackground";

type FormData = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  currency: "mxn" | "usd";
  budget: string;
  source: string;
  timeline: string;
  details?: string;
};

function ContactForm() {
  const t = useTranslations("ContactPage");
  const [time, setTime] = useState<string>("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const locale = useLocale();

  const BUDGET_KEYS = [
    "20-35k",
    "35-50k",
    "50-80k",
    "80-120k",
    "120k+",
    "monthly",
    "discuss",
  ] as const;

  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
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

  const selectedBudget = watch("budget");
  const selectedCurrency = watch("currency");

  // Auto-fill service based on URL param
  useEffect(() => {
    if (interest) {
      const serviceMap: Record<string, string> = {
        architecture: "digital_architecture",
        branding: "visual_identity",
        intelligence: "ai_automation",
        growth: "growth",
      };

      const mappedService = serviceMap[interest];
      if (mappedService) {
        setValue("service", mappedService);
      }
    }
  }, [interest, setValue]);

  // Clock Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Mexico_City", // Querétaro Time
        })
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const inputClasses = (fieldName: string) =>
    cn(
      "w-full bg-transparent border-b py-3 text-lg outline-none transition-all duration-300 font-mono text-white placeholder:text-neutral-600",
      focusedField === fieldName
        ? "border-white shadow-[0_1px_15px_rgba(255,255,255,0.15)] pl-4"
        : "border-neutral-800"
    );

  const labelClasses =
    "block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2";

  return (
    <main className="min-h-screen text-white pt-32 relative overflow-hidden">
      {/* Contact Page Spotlight */}
      <RouteScopedBackground />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Left Column: Context */}
          <div className="flex flex-col justify-start h-full pb-12 lg:pb-24 lg:sticky lg:top-32">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
                {t("hero.title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl text-neutral-400 max-w-md leading-relaxed">
                {t("hero.subtitle")}
              </motion.p>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 flex flex-wrap items-center gap-4 md:gap-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-neutral-400">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="font-mono tracking-tight">
                      {t(`hero.trust_badges.${i}`)}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-12 mt-16">
              {/* Details Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    {t("details.email_label")}
                  </span>
                  <a
                    href="mailto:hello@noctra.studio"
                    className="block text-xl font-medium hover:text-white transition-colors">
                    hello@noctra.studio
                  </a>
                </div>

                {/* WhatsApp Block */}
                <div className="col-span-1 md:col-span-2 space-y-3 py-6 border-t border-b border-neutral-800">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    {t("details.whatsapp_label")}
                  </span>
                  <div className="flex items-center gap-3">
                    <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                    <span className="text-xl font-medium">
                      {t("details.whatsapp_number")}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {t("details.whatsapp_availability")}
                    </span>
                  </div>
                  <a
                    href="https://wa.me/525555000228?text=Hola%2C%20vengo%20del%20sitio%20web%20de%20Noctra%20Studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm rounded-full transition-colors">
                    <FaWhatsapp className="w-4 h-4" />
                    {t("details.whatsapp_cta")}
                  </a>
                  <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
                    {t("details.whatsapp_note")}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    {t("details.location_label")}
                  </span>
                  <div className="flex items-center gap-2 text-xl font-medium">
                    <MapPin className="w-5 h-5" />
                    {t("details.location_value")}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    {t("details.time_label")}
                  </span>
                  <div className="flex items-center gap-2 text-xl font-medium tabular-nums">
                    <Clock className="w-5 h-5" />
                    {time}
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-6">
                {[
                  {
                    Icon: Instagram,
                    href: "https://instagram.com/noctra_studio",
                  },
                  { Icon: FaXTwitter, href: "https://x.com/NoctraStudio" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target={href !== "#" ? "_blank" : undefined}
                    rel={href !== "#" ? "noopener noreferrer" : undefined}
                    className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pb-24">
            {isSuccess ? (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="relative w-full max-w-md mx-auto">
                {/* Ticket Card */}
                <div className="bg-white text-black p-8 border-2 border-dashed border-neutral-300 relative overflow-hidden">
                  {/* Decorative Cutouts */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050505] rounded-full" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050505] rounded-full" />

                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        {t("success.ticket.title")}
                      </div>
                      <div className="text-4xl font-bold tracking-tighter">
                        #NOC-{Math.floor(Math.random() * 9000) + 1000}
                      </div>
                    </div>

                    <div className="w-full h-px bg-neutral-200" />

                    <div className="grid grid-cols-2 gap-4 text-left text-sm font-mono">
                      <div>
                        <div className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">
                          {t("success.ticket.status_label")}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          {t("success.ticket.status_value")}
                        </div>
                      </div>
                      <div>
                        <div className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">
                          {t("success.ticket.response_label")}
                        </div>
                        <div>{t("success.ticket.response_value")}</div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-neutral-200" />

                    <div className="pt-2 text-sm text-neutral-600">
                      {t("success.ticket.confirmation")}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="text-xs font-mono uppercase tracking-widest hover:text-neutral-600 transition-colors">
                        {t("success.action")}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* Name */}
                <div className="relative">
                  <label htmlFor="name" className={labelClasses}>
                    {t("form.name_label")}
                  </label>
                  <input
                    {...register("name", { required: true })}
                    id="name"
                    type="text"
                    placeholder={t("form.name_placeholder")}
                    className={inputClasses("name")}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label htmlFor="email" className={labelClasses}>
                    {t("form.email_label")}
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    id="email"
                    type="email"
                    placeholder={t("form.email_placeholder")}
                    className={inputClasses("email")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label htmlFor="phone" className={labelClasses}>
                    {t("form.phone_label")}
                  </label>
                  <input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    placeholder={t("form.phone_placeholder")}
                    className={inputClasses("phone")}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Service Selection */}
                <div className="relative">
                  <label htmlFor="service" className={labelClasses}>
                    {t("form.service_label")}
                  </label>
                  <select
                    {...register("service", { required: true })}
                    id="service"
                    className={cn(
                      inputClasses("service"),
                      "appearance-none bg-transparent"
                    )}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}>
                    <option
                      value=""
                      disabled
                      className="bg-neutral-900 text-white">
                      {t("form.service_placeholder")}
                    </option>
                    <option value="website" className="bg-neutral-900 text-white">
                      {t("form.service_options.website")}
                    </option>
                    <option value="ecommerce" className="bg-neutral-900 text-white">
                      {t("form.service_options.ecommerce")}
                    </option>
                    <option value="custom_system" className="bg-neutral-900 text-white">
                      {t("form.service_options.custom_system")}
                    </option>
                    <option value="optimization" className="bg-neutral-900 text-white">
                      {t("form.service_options.optimization")}
                    </option>
                    <option value="not_sure" className="bg-neutral-900 text-white">
                      {t("form.service_options.not_sure")}
                    </option>
                  </select>
                </div>

                {/* Budget Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className={labelClasses}>
                      {t("form.budget_label")}
                    </label>
                    
                    {/* Currency Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10">
                      {(["mxn", "usd"] as const).map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => {
                            setValue("currency", curr);
                            setValue("budget", ""); // Clear budget on currency change
                          }}
                          className={cn(
                            "px-3 py-1 text-[10px] font-bold uppercase rounded-full transition-all duration-200",
                            selectedCurrency === curr
                              ? "bg-white text-black shadow-lg"
                              : "text-neutral-500 hover:text-neutral-300"
                          )}>
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input type="hidden" {...register("budget", { required: true })} />
                  <div className="grid grid-cols-1 gap-3">
                    {BUDGET_KEYS.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setValue("budget", key)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg border transition-all duration-200",
                          selectedBudget === key
                            ? "border-white bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                            : "border-neutral-800 hover:border-neutral-600 hover:bg-white/[0.02]"
                        )}>
                        <span className={cn(
                          "block text-sm font-medium transition-colors",
                          selectedBudget === key ? "text-white" : "text-neutral-300"
                        )}>
                          {t(`form.budget_options.${selectedCurrency}.${key}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Source Selection */}
                <div className="relative">
                  <label htmlFor="source" className={labelClasses}>
                    {t("form.source_label")}
                  </label>
                  <select
                    {...register("source")}
                    id="source"
                    className={cn(
                      inputClasses("source"),
                      "appearance-none bg-transparent"
                    )}
                    onFocus={() => setFocusedField("source")}
                    onBlur={() => setFocusedField(null)}>
                    <option
                      value=""
                      className="bg-neutral-900 text-white">
                      {t("form.source_placeholder")}
                    </option>
                    <option value="google" className="bg-neutral-900 text-white">
                      {t("form.source_options.google")}
                    </option>
                    <option value="referral" className="bg-neutral-900 text-white">
                      {t("form.source_options.referral")}
                    </option>
                    <option value="linkedin" className="bg-neutral-900 text-white">
                      {t("form.source_options.linkedin")}
                    </option>
                    <option value="social" className="bg-neutral-900 text-white">
                      {t("form.source_options.social")}
                    </option>
                    <option value="other" className="bg-neutral-900 text-white">
                      {t("form.source_options.other")}
                    </option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <label htmlFor="timeline" className={labelClasses}>
                    {t("form.timeline_label")}
                  </label>
                  <select
                    {...register("timeline", { required: true })}
                    id="timeline"
                    className={cn(
                      inputClasses("timeline"),
                      "appearance-none bg-transparent"
                    )}
                    onFocus={() => setFocusedField("timeline")}
                    onBlur={() => setFocusedField(null)}>
                    <option
                      value=""
                      disabled
                      className="bg-neutral-900 text-white">
                      {t("form.timeline_placeholder")}
                    </option>
                    <option value="asap" className="bg-neutral-900 text-white">
                      {t("form.timeline_options.asap")}
                    </option>
                    <option value="3_months" className="bg-neutral-900 text-white">
                      {t("form.timeline_options.3_months")}
                    </option>
                    <option value="6_months" className="bg-neutral-900 text-white">
                      {t("form.timeline_options.6_months")}
                    </option>
                    <option value="future" className="bg-neutral-900 text-white">
                      {t("form.timeline_options.future")}
                    </option>
                  </select>
                </div>

                {/* Project Details */}
                <div className="relative">
                  <label htmlFor="details" className={labelClasses}>
                    {t("form.details_label")}
                  </label>

                  <textarea
                    {...register("details")}
                    id="details"
                    rows={4}
                    placeholder={t("form.details_placeholder")}
                    className={cn(inputClasses("details"), "resize-none overflow-hidden text-base placeholder:text-sm placeholder:italic")}
                    onFocus={() => setFocusedField("details")}
                    onBlur={() => setFocusedField(null)}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-white hover:bg-neutral-200 text-black py-6 text-lg font-bold tracking-wide flex items-center justify-center gap-4 transition-colors disabled:opacity-50 rounded-full">
                  {isSubmitting ? (
                    t("form.sending")
                  ) : (
                    <>
                      {t("form.submit")}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Post-Submit Info Block */}
                <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 md:p-8 space-y-4">
                  <p className="text-sm font-bold text-neutral-300 uppercase tracking-widest">
                    {t("post_submit_info.title")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(t.raw("post_submit_info.items") as string[]).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-neutral-400">
                        <span className="text-emerald-500 font-bold">✅</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}
        </motion.div>
        </div>
      </div>
    </main>
  );
}

const PROCESS_ICONS = [Phone, FileText, Settings2, Rocket];

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-48 text-center bg-[#050505] text-white">
          Loading...
        </div>
      }>
      <ContactForm />
    </Suspense>
  );
}
