"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

export default function ForgeLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

        router.push("/forge");
      }
    };
    checkUser();
  }, [supabase, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        if (loginError.message === "Invalid login credentials") {
          throw new Error(
            "Credenciales inválidas. Verifica tu email y contraseña.",
          );
        }
        throw loginError;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        sessionStorage.setItem("session_start", Date.now().toString());
        router.push("/forge");
      }
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

      sessionStorage.setItem("session_start", Date.now().toString());
      router.push("/forge");
    } catch (err: any) {
      setMfaError("Código incorrecto. Intenta de nuevo.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setOtpCode(["", "", "", "", "", ""]);
      const firstInput = document.getElementById("otp-0");
      if (firstInput) firstInput.focus();
    } finally {
      setIsVerifyingMFA(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      const newOtp = [...otpCode];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtpCode(newOtp);
      return;
    }

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

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

  const reasonMessage =
    reason === "inactivity"
      ? "Sesión cerrada por inactividad."
      : reason === "expired"
        ? "Tu sesión ha expirado. Por favor ingresa de nuevo."
        : null;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-[340px] space-y-12">
        {/* Minimal Header */}
        <div className="flex flex-col items-center space-y-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <BrandLogo className="h-8 text-white" showText={true} />
          </Link>
          <div className="space-y-1 text-center">
            <h1 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40">
              Forge Security Portal
            </h1>
          </div>
        </div>

        {reasonMessage && !showMFA && (
          <div className="p-3 border border-white/10 bg-white/5 rounded text-white/60 text-[10px] font-mono uppercase tracking-widest text-center">
            {reasonMessage}
          </div>
        )}

        {!showMFA ? (
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">
                  Identity (Email)
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-white transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-10 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">
                  Credential (Password)
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-white transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-10 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors">
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-mono uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Verify & Access"
              )}
            </button>
          </form>
        ) : (
          <div className={`space-y-8 ${shake ? "animate-shake" : ""}`}>
            <div className="space-y-2 text-center">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                MFA Verification
              </h2>
              <p className="text-[9px] text-white/40 font-mono tracking-widest uppercase">
                6-digit security code
              </p>
            </div>

            <div className="flex justify-between gap-2 px-2">
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
                  className="w-full h-12 bg-white/5 border border-white/10 rounded text-center text-lg font-mono text-white focus:outline-none focus:border-white/40 transition-all"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {mfaError && (
              <div className="p-3 rounded border border-red-500/20 bg-red-500/5 text-red-500 text-[9px] font-mono uppercase tracking-widest text-center">
                {mfaError}
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => handleMFAVerify()}
                disabled={isVerifyingMFA || otpCode.some((d) => d === "")}
                className="w-full bg-white text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded hover:bg-neutral-200 transition-all disabled:opacity-50">
                {isVerifyingMFA ? "Verifying..." : "Confirm Identity"}
              </button>
              <button
                onClick={() => setShowMFA(false)}
                className="w-full text-[9px] font-mono text-white/20 hover:text-white/40 transition-colors uppercase tracking-[0.2em] text-center">
                ← Back to Login
              </button>
            </div>
          </div>
        )}

        <div className="pt-12 text-center text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">
          &copy; 2026 Noctra Studio Forge
        </div>
      </div>
    </main>
  );
}
