"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{t.form.success}</span>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              {/* Name Field */}
              <Input
                type="text"
                placeholder={t.form.name_placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading"}
                className="bg-white/5 border-white/10 focus:border-white/30 focus:ring-0 focus:ring-offset-0 rounded-xl h-14 text-sm font-mono placeholder:text-muted-foreground/50 transition-all duration-300"
                required
              />

              {/* Email Field & Submit Button */}
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
