"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Loader2,
  AlertCircle,
  Terminal,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormProps {
  locale?: "en" | "es";
}

export function ContactForm({ locale }: ContactFormProps) {
  const { t, language } = useLanguage();
  const currentLang = locale || language || "en";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleTitle, setRoleTitle] = useState(""); // Honeypot

  // State Machine: idle -> loading -> success (Terminal) -> completed (vCard)
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "completed" | "error" | "duplicate"
  >("idle");

  // Terminal Animation State
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  // Post-Download State
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (status === "success") {
      // Sequence: Line 1 -> 800ms -> Line 2 -> 800ms -> Line 3 -> 1000ms -> Completed
      const lines = [
        t.form.terminal.line1,
        t.form.terminal.line2,
        t.form.terminal.line3,
      ];

      let currentLine = 0;

      const interval = setInterval(() => {
        if (currentLine < lines.length) {
          setTerminalLines((prev) => [...prev, lines[currentLine]]);
          currentLine++;
        } else {
          clearInterval(interval);
          // Transition to Final 'Completed' State after delay
          setTimeout(() => setStatus("completed"), 1000);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [status, t.form.terminal]);

  const generateVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Noctra System
ORG:Noctra Studio
EMAIL:hello@noctra.studio
URL:https://noctra.studio
END:VCARD`;
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "noctra_system.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Set feedback state
    setDownloaded(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!email || !name) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          lang: currentLang,
          role_title: roleTitle, // Send honeypot value
        }),
      });

      if (res.ok) {
        setStatus("success");
        // Clear sensitive data immediately
        setName("");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-sm min-h-[140px]">
      <AnimatePresence mode="wait">
        {/* State 1: Success (Terminal Animation) */}
        {status === "success" && (
          <motion.div
            key="terminal-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-sm space-y-3 p-4 bg-black/40 border border-white/10 rounded-xl backdrop-blur-md">
            <div className="space-y-2">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-500/90 flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  <span>{line}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* State 2: Completed (vCard Button) */}
        {status === "completed" && (
          <motion.div
            key="terminal-completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-sm space-y-4 p-6 bg-black/40 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center text-center">
            <div className="space-y-2 w-full text-left opacity-50 text-xs">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className="text-green-500/50 flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  <span>{line}</span>
                </div>
              ))}
            </div>

            <div className="w-full pt-2 flex flex-col items-center">
              <Button
                type="button"
                onClick={generateVCard}
                disabled={downloaded}
                className={`w-full transition-all duration-300 gap-2 font-mono text-xs uppercase tracking-widest h-12 border ${
                  downloaded
                    ? "bg-green-500/10 text-green-500 border-green-500/50 hover:bg-green-500/20"
                    : "bg-white/10 text-white border-white/10 hover:bg-white/20 hover:border-white/30"
                }`}>
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t.form.terminal.signal_secured}
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    {t.form.terminal.authorize}
                  </>
                )}
              </Button>

              {/* Final Post-Interaction Message */}
              {downloaded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-[10px] text-white/40 mt-4 leading-relaxed max-w-[90%]">
                  {t.form.terminal.confirmation_dispatch}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* State 3: Duplicate Error */}
        {status === "duplicate" && (
          <motion.div
            key="duplicate-alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              {t.form.duplicate_signal}
            </span>
          </motion.div>
        )}

        {/* State 0: Form (Idle / Loading / Error) */}
        {(status === "idle" || status === "loading" || status === "error") && (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              {/* HONEYPOT FIELD */}
              <input
                type="text"
                name="role_title"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{
                  opacity: 0,
                  position: "absolute",
                  zIndex: -1,
                  pointerEvents: "none",
                  height: 0,
                  width: 0,
                }}
                aria-hidden="true"
              />

              <Input
                type="text"
                placeholder={t.form.name_placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading"}
                className="bg-white/5 border-white/10 focus:border-white/30 focus:ring-0 focus:ring-offset-0 rounded-xl h-14 text-sm font-mono placeholder:text-muted-foreground/50 transition-all duration-300"
                required
              />

              <div className="relative flex items-center w-full">
                <Input
                  type="email"
                  placeholder={t.form.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="pr-14 bg-white/5 border-white/10 focus:border-white/30 focus:ring-0 focus:ring-offset-0 rounded-xl h-14 text-sm font-mono placeholder:text-muted-foreground/50 transition-all duration-300"
                  required
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={status === "loading"}
                  className="absolute right-2 w-10 h-10 rounded-full bg-white text-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10">
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground/40 pl-1 font-mono">
              {t.form.microcopy}
            </p>
            {status === "error" && (
              <p className="text-xs text-destructive pl-1 font-mono">
                {t.form.error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
