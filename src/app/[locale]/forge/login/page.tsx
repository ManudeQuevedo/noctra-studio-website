"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ForgeLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMFA, setShowMFA] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isVerifyingMFA, setIsVerifyingMFA] = useState(false);
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const supabase = createClient(false); // Non-persistent sessions for forge

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Check AAL
        const { data: aal } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

        if (aal?.nextLevel === "aal2" && aal?.currentLevel !== "aal2") {
          // User is enrolled in MFA but only at AAL1, show MFA verification
          const { data: factors } = await supabase.auth.mfa.listFactors();
          const verifiedFactors =
            factors?.totp.filter((f) => f.status === "verified") || [];
          if (verifiedFactors.length > 0) {
            setMfaFactorId(verifiedFactors[0].id);
            setShowMFA(true);
            return;
          }
        }

        router.push("/forge/projects");
      }
    };
    checkUser();
  }, [supabase, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      // Check for MFA
      const { data: factors, error: mfaListError } =
        await supabase.auth.mfa.listFactors();
      if (mfaListError) throw mfaListError;

      const verifiedFactors = factors.totp.filter(
        (f) => f.status === "verified",
      );

      if (verifiedFactors.length > 0) {
        setMfaFactorId(verifiedFactors[0].id);
        setShowMFA(true);
        setLoading(false);
        return;
      }

      // Store absolute session start time
      sessionStorage.setItem("session_start", Date.now().toString());

      router.push("/forge/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleMFAVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otpCode.join("");
    if (code.length !== 6) return;

    setIsVerifyingMFA(true);
    setMfaError(null);

    try {
      const { data: challenge, error: challengeError } =
        await supabase.auth.mfa.challenge({
          factorId: mfaFactorId!,
        });

      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId!,
        challengeId: challenge.id,
        code,
      });

      if (verifyError) throw verifyError;

      // Success
      sessionStorage.setItem("session_start", Date.now().toString());
      router.push("/forge/projects");
      router.refresh();
    } catch (err: any) {
      setMfaError("Código incorrecto. Intenta de nuevo.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setOtpCode(["", "", "", "", "", ""]);
      // Focus first input
      const firstInput = document.getElementById("otp-0");
      if (firstInput) firstInput.focus();
    } finally {
      setIsVerifyingMFA(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, 6).split("");
      const newOtp = [...otpCode];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtpCode(newOtp);
      // If full, auto-submit is handled in useEffect or manually
      return;
    }

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  useEffect(() => {
    if (otpCode.every((digit) => digit !== "") && showMFA) {
      handleMFAVerify();
    }
  }, [otpCode]);

  const getReasonMessage = () => {
    if (reason === "inactivity") return "Signed out due to inactivity.";
    if (reason === "expired")
      return "Your session expired. Please sign in again.";
    return null;
  };

  const reasonMessage = getReasonMessage();

  return (
    <main className="min-h-screen flex flex-col bg-[#050505] text-white relative">
      {/* 1. Header Navigation */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <BrandLogo className="h-6 md:h-8 w-auto text-white" showText={true} />
        </Link>
      </div>

      {/* 2. Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 w-full h-full">
        <div className="w-full max-w-[380px] space-y-16">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-sm font-mono uppercase tracking-widest text-neutral-300">
              Forge
            </h1>
            {reasonMessage && !showMFA && (
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                {reasonMessage}
              </p>
            )}
            {showMFA && (
              <div className="space-y-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
                  Verificación en dos pasos
                </h2>
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Ingresa el código de 6 dígitos de tu app
                </p>
              </div>
            )}
          </div>

          {!showMFA ? (
            <form onSubmit={handleLogin} className="space-y-12">
              <div className="space-y-10">
                {/* Email Field */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors rounded-none"
                    placeholder="admin@noctra.studio"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-300">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-neutral-800 px-0 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors rounded-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="py-2 text-red-500 text-sm font-mono text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-5 rounded-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          ) : (
            <div className={`space-y-12 ${shake ? "animate-shake" : ""}`}>
              <div className="flex justify-between gap-2">
                {otpCode.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 bg-transparent border border-neutral-900 text-center text-xl font-mono text-white focus:outline-none focus:border-emerald-500 focus:bg-white/5 transition-all text-[18px]"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {mfaError && (
                <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest text-center">
                  {mfaError}
                </div>
              )}

              <div className="space-y-6">
                <button
                  onClick={() => handleMFAVerify()}
                  disabled={isVerifyingMFA || otpCode.some((d) => d === "")}
                  className="w-full bg-white text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded-sm hover:bg-emerald-500 transition-all disabled:opacity-50">
                  {isVerifyingMFA ? "Verificando..." : "Verificar Acceso"}
                </button>
                <button
                  onClick={() => {
                    setShowMFA(false);
                    setError(null);
                  }}
                  className="w-full text-[9px] font-mono text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">
                  ← Volver al inicio de sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
