"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Instagram, Mail, MapPin, Clock } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  email: string;
  website?: string;
  service: string;
  budget: string;
  details: string;
};

const BUDGET_OPTIONS = {
  MXN: [
    {
      label: "Identity (Landing / Portfolio) — $30k - $50k",
      value: "Identity (30k-50k MXN)",
    },
    {
      label: "Growth (Corporate / E-comm) — $60k - $120k",
      value: "Growth (60k-120k MXN)",
    },
    { label: "System (Custom Software) — +$150k", value: "System (+150k MXN)" },
    { label: "Retainer / Consulting", value: "Consulting" },
    { label: "Not sure / Let's discuss value", value: "Undecided" },
  ],
  USD: [
    {
      label: "Identity (Landing / Portfolio) — $1.5k - $3k",
      value: "Identity (1.5k-3k USD)",
    },
    {
      label: "Growth (Corporate / E-comm) — $3.5k - $7k",
      value: "Growth (3.5k-7k USD)",
    },
    { label: "System (Custom Software) — +$9k", value: "System (+9k USD)" },
    { label: "Retainer / Consulting", value: "Consulting" },
    { label: "Not sure / Let's discuss value", value: "Undecided" },
  ],
};

function ContactForm() {
  const t = useTranslations("ContactPage");
  const [time, setTime] = useState<string>("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currency, setCurrency] = useState<"MXN" | "USD">("MXN");

  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      website: "",
      service: "",
      budget: "",
      details: "",
    },
  });

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
    <main className="min-h-screen bg-[#050505] text-white pt-32 relative overflow-hidden">
      {/* Ambient Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: useTransform(
            [mouseX, mouseY, scrollY],
            ([x, y, s]: any[]) =>
              `radial-gradient(600px circle at ${x}px ${
                y + s
              }px, rgba(99, 102, 241, 0.15), transparent 80%)`
          ),
        }}
      />

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

              {/* Commitment Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-mono text-neutral-300 tracking-tight">
                  {t("commitment_badge")}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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

                    <div className="pt-2">
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

                {/* Website */}
                <div className="relative">
                  <label htmlFor="website" className={labelClasses}>
                    {t("form.website_label")}
                  </label>
                  <input
                    {...register("website")}
                    id="website"
                    type="text"
                    placeholder={t("form.website_placeholder")}
                    className={inputClasses("website")}
                    onFocus={() => setFocusedField("website")}
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
                    <option
                      value="digital_architecture"
                      className="bg-neutral-900 text-white">
                      {t("form.service_options.digital_architecture")}
                    </option>
                    <option
                      value="visual_identity"
                      className="bg-neutral-900 text-white">
                      {t("form.service_options.visual_identity")}
                    </option>
                    <option
                      value="ai_automation"
                      className="bg-neutral-900 text-white">
                      {t("form.service_options.ai_automation")}
                    </option>
                    <option
                      value="growth"
                      className="bg-neutral-900 text-white">
                      {t("form.service_options.growth")}
                    </option>
                  </select>
                </div>

                {/* Budget Selection */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="budget"
                      className={labelClasses.replace("mb-2", "mb-0")}>
                      {t("form.budget_label")}
                    </label>

                    {/* Currency Toggle */}
                    <div className="flex items-center gap-2 bg-neutral-900 rounded-full p-1 border border-neutral-800">
                      {(["MXN", "USD"] as const).map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => setCurrency(curr)}
                          className={cn(
                            "px-3 py-1 text-[10px] font-mono font-medium rounded-full transition-all duration-300",
                            currency === curr
                              ? "bg-white text-black shadow-sm"
                              : "text-neutral-500 hover:text-neutral-300"
                          )}>
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <select
                    {...register("budget", { required: true })}
                    id="budget"
                    className={cn(
                      inputClasses("budget"),
                      "appearance-none bg-transparent"
                    )}
                    onFocus={() => setFocusedField("budget")}
                    onBlur={() => setFocusedField(null)}>
                    <option
                      value=""
                      disabled
                      className="bg-neutral-900 text-white">
                      {t("form.budget_placeholder")}
                    </option>
                    {BUDGET_OPTIONS[currency].map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-neutral-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Details */}
                <div className="relative">
                  <label htmlFor="details" className={labelClasses}>
                    {t("form.details_label")}
                  </label>
                  <textarea
                    {...register("details", { required: true })}
                    id="details"
                    rows={4}
                    placeholder={t("form.details_placeholder")}
                    className={cn(inputClasses("details"), "resize-none")}
                    onFocus={() => setFocusedField("details")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-white text-black py-6 text-lg font-bold tracking-wide uppercase flex items-center justify-center gap-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 rounded-full">
                  {isSubmitting ? (
                    t("form.sending")
                  ) : (
                    <>
                      {t("form.submit")}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

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
