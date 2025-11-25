"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowRight, Globe, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const translations = {
  en: {
    back: "Back to Site",
    title: "Client Portal",
    subtitle:
      "Secure access to your project dashboard, deliverables, and status updates.",
    emailLabel: "Work Email",
    emailPlaceholder: "name@company.com",
    submit: "Send Magic Link",
    processing: "Processing...",
    success: "Magic link dispatched. Check your inbox.",
    error: "Connection failed. Please retry.",
  },
  es: {
    back: "Volver al Sitio",
    title: "Portal de Clientes",
    subtitle:
      "Acceso seguro a su panel de proyecto, entregables y actualizaciones de estado.",
    emailLabel: "Correo de Trabajo",
    emailPlaceholder: "nombre@empresa.com",
    submit: "Enviar Enlace Mágico",
    processing: "Procesando...",
    success: "Enlace mágico enviado. Revise su bandeja.",
    error: "Conexión fallida. Reintente.",
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "es">("en");
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  const t = translations[lang];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(t.error);
    } else {
      setMessage(t.success);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#050505] text-white font-sans overflow-hidden">
      {/* LEFT SIDE: UI & Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between relative z-20 p-6 lg:p-12 xl:p-20 h-full">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}>
                {t.back}
              </motion.span>
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-400 hover:text-white hover:border-neutral-700 transition-all">
            <Globe className="w-3 h-3" />
            <span className="w-4 text-center">{lang.toUpperCase()}</span>
          </button>
        </motion.div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-8">
            {/* Brand Header */}
            <div className="space-y-6">
              <Image
                src="/noctra-navbar-dark.svg"
                alt="Noctra Studio"
                width={140}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="block">
                      {t.title}
                    </motion.span>
                  </AnimatePresence>
                </h1>
                <p className="text-neutral-500 text-lg min-h-[3.5rem]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}>
                      {t.subtitle}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-neutral-500 uppercase tracking-wider ml-1">
                  {t.emailLabel}
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 text-base text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-white/50 focus:border-white/50 outline-none transition-all group-hover:border-neutral-700"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                </div>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={`p-4 rounded-xl text-sm border ${
                    message.includes("failed") || message.includes("fallida")
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  }`}>
                  {message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-5 rounded-xl font-medium text-black text-base transition-all flex items-center justify-center gap-2 group relative overflow-hidden ${
                  isLoading
                    ? "bg-neutral-800 cursor-not-allowed text-neutral-500"
                    : "bg-white hover:scale-[1.02] active:scale-[0.98]"
                }`}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> {t.processing}
                  </>
                ) : (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        transition={{ duration: 0.2 }}>
                        {t.submit}
                      </motion.span>
                    </AnimatePresence>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 lg:mt-0 flex flex-col gap-1 text-xs text-neutral-500 font-medium">
          <p>
            &copy; {new Date().getFullYear()} Noctra Studio. All rights
            reserved.
          </p>
          <p>
            Querétaro, MX{" "}
            <span className="font-mono text-neutral-400">
              [{" "}
              {mounted
                ? new Intl.DateTimeFormat("en-US", {
                    timeZone: "America/Mexico_City",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).format(time)
                : "--:-- --"}{" "}
              ]
            </span>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Visual */}
      <div className="hidden lg:block w-1/2 relative z-10 h-full">
        <Image
          src="/images/login-client-portal.jpg"
          alt="Abstract Neural Network"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20 pointer-events-none" />
      </div>

      {/* Mobile Background (Subtle) */}
      <div className="lg:hidden absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/login-client-portal.jpg"
          alt="Abstract Neural Network"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
      </div>
    </div>
  );
}
