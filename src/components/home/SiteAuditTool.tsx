"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const SiteAuditTool = () => {
  const t = useTranslations("SiteAudit");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "scanning" | "complete" | "success"
  >("idle");
  const [email, setEmail] = useState("");
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setStatus("scanning");
    // Simulate Analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));
    if (isMounted.current) {
      setStatus("complete");
    }
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "audit",
          email,
          url,
        }),
      });

      if (response.ok) {
        setStatus("success");
      }
    } catch (error) {
      console.error("Audit request failed", error);
    }
  };

  const resetForm = () => {
    setUrl("");
    setEmail("");
    setStatus("idle");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative font-mono">
        {/* Terminal Header */}
        <div className="bg-neutral-900/50 border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="text-[10px] text-neutral-600">
            NOCTRA_DIAGNOSTIC_TOOL_V1.0
          </span>
        </div>

        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-center">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-green-500 text-xs mb-4 border border-green-500/20 bg-green-500/10 px-3 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {t("status_ready")}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {t("title")}
                  </h3>
                  <p className="text-neutral-400 max-w-md mx-auto">
                    {t("description")}
                  </p>
                </div>

                <form
                  onSubmit={handleScan}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <span className="text-neutral-500">https://</span>
                    </div>
                    <input
                      type="text"
                      placeholder={t("placeholder_url")}
                      value={url}
                      onChange={(e) =>
                        setUrl(e.target.value.replace("https://", ""))
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 text-white pl-24 pr-4 py-3 rounded-lg focus:ring-1 focus:ring-white focus:border-white outline-none transition-all placeholder:text-neutral-700 font-mono"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                    <Scan className="w-4 h-4" /> {t("button_scan")}
                  </button>
                </form>
              </motion.div>
            )}

            {status === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-neutral-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="font-mono text-sm text-green-500 text-left space-y-1">
                  <p className="animate-pulse">&gt; {t("scanning_step1")}</p>
                  <p className="animate-pulse delay-100">
                    &gt; {t("scanning_step2")}
                  </p>
                  <p className="animate-pulse delay-200">
                    &gt; {t("scanning_step3")}
                  </p>
                </div>
              </motion.div>
            )}

            {status === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-left max-w-lg mx-auto">
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg flex gap-4 items-start">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold">
                      {t("result_title")}
                    </h4>
                    <p className="text-sm text-neutral-400 mt-1">
                      {t("result_desc")}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLeadCapture} className="space-y-4 pt-2">
                  <label className="block text-xs text-neutral-500 font-mono uppercase tracking-wider">
                    {t("email_label")}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder={t("placeholder_email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-neutral-900 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-white outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2">
                      {t("button_send")} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Success State */}
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-green-500 font-mono font-bold tracking-wider">
                    &gt; {t("success_title")}
                  </h4>
                  <p className="text-neutral-400 max-w-sm mx-auto text-sm">
                    {t("success_desc")}
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-xs text-neutral-600 hover:text-white transition-colors font-mono mt-4">
                  [ {t("button_reset")} ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
