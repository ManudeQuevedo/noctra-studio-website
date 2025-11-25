"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { Terminal, ShieldAlert, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { useLocale } from "next-intl";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const supabase = createClient();
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/${locale}/studio`,
      },
    });

    if (error) {
      setMessage("Error sending access link.");
    } else {
      setMessage("Access link sent. Check your secure comms.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4">
          <Terminal className="w-6 h-6 text-neutral-400" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          SYSTEM_ACCESS_CONTROL
        </h1>
        <p className="text-sm text-neutral-500">
          Restricted Area. Authorized Personnel Only.
        </p>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8 relative overflow-hidden">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20"></div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Identity Verification
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@noctra.studio"
              required
              className="w-full bg-black/50 border border-neutral-800 rounded-lg p-4 text-sm focus:ring-1 focus:ring-white focus:border-white outline-none placeholder:text-neutral-700 transition-all"
            />
          </div>

          {message && (
            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
              <Terminal className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {error === "AccessDenied" && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <ShieldAlert className="w-4 h-4" />
              <span>ACCESS_DENIED: Invalid Domain Credentials</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-bold text-black transition-all flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                : "bg-white hover:bg-neutral-200"
            }`}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                Send Access Link <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>

      <div className="text-center text-xs text-neutral-600">
        <p>Secure Connection | End-to-End Encrypted</p>
        <p className="mt-1">Session ID: {sessionId}</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-200 font-mono flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-white">Loading System...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
