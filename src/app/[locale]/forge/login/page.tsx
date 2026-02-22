"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { CheckCircle2, Lock, ArrowRight, Loader2, Mail } from "lucide-react";

export default function ForgeLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
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
      // Transitioned to Magic Link as per redesign request
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/forge`,
        },
      });

      if (otpError) throw otpError;

      setIsOtpSent(true);
      setLoading(false);
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
      router.push("/forge");
      router.refresh();
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

  useEffect(() => {
    if (otpCode.every((digit) => digit !== "") && showMFA) {
      handleMFAVerify();
    }
  }, [otpCode]);

  const getReasonMessage = () => {
    if (reason === "inactivity") return "Sesión cerrada por inactividad.";
    if (reason === "expired")
      return "Tu sesión ha expirado. Por favor ingresa de nuevo.";
    return null;
  };

  const reasonMessage = getReasonMessage();

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#000000] text-white">
      {/* LEFT PANEL - Branding/Hero (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#050505] border-r border-white/5">
        {/* Subtle CSS Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 w-full h-full">
          <div className="mb-12">
            <BrandLogo className="h-10 text-white" showText={true} />
            <p className="mt-4 text-white/40 text-sm tracking-widest font-mono uppercase text-center">
              The Digital Forge
            </p>
          </div>

          <div className="space-y-6 max-w-sm">
            {[
              "Acceso seguro a tus entregables",
              "Actualizaciones en tiempo real",
              "Comunicación directa con tu equipo",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-sm font-medium text-white/70">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 flex items-center gap-2 px-4 py-2 border border-white/5 rounded-full bg-white/2">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.15em]">
              Conexión cifrada SSL
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Controls (Back to site + Language) */}
        <div className="absolute top-6 left-6 md:left-auto md:right-8 z-50 flex items-center gap-6">
          <Link
            href="/"
            className="text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">
            ← Back to Site
          </Link>
          <button className="text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">
            ES
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-[340px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Mobile Only Logo */}
            <div className="md:hidden flex justify-center mb-12">
              <BrandLogo className="h-8 text-white" showText={true} />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Client Portal
              </h1>
              <p className="text-sm text-white/50 leading-relaxed">
                {isOtpSent
                  ? "Hemos enviado un enlace de acceso a tu bandeja de entrada."
                  : "Ingresa tu email de trabajo para recibir tu enlace de acceso seguro."}
              </p>
            </div>

            {reasonMessage && !showMFA && !isOtpSent && (
              <div className="p-3 border border-amber-500/20 bg-amber-500/5 rounded-lg text-amber-500/80 text-xs font-mono uppercase tracking-widest text-center">
                {reasonMessage}
              </div>
            )}

            {!showMFA ? (
              !isOtpSent ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">
                      Work Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-xs font-mono text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold text-sm py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:scale-100">
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Enviar Magic Link
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-8 py-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Mail className="w-8 h-8 text-emerald-500" />
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOtpSent(false)}
                    className="w-full text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest text-center">
                    ← Intentar con otro email
                  </button>
                </div>
              )
            ) : (
              <div className={`space-y-8 ${shake ? "animate-shake" : ""}`}>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-center">
                    Verificación MFA
                  </h2>
                  <p className="text-xs text-center text-white/50 font-mono tracking-widest uppercase">
                    Ingresa el código de 6 dígitos
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
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-lg text-center text-xl font-mono text-white focus:outline-none focus:border-emerald-500 focus:bg-emerald-500/5 transition-all"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                {mfaError && (
                  <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-mono uppercase tracking-widest text-center">
                    {mfaError}
                  </div>
                )}

                <div className="space-y-6">
                  <button
                    onClick={() => handleMFAVerify()}
                    disabled={isVerifyingMFA || otpCode.some((d) => d === "")}
                    className="w-full bg-white text-black font-bold text-sm py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                    {isVerifyingMFA ? "Verificando..." : "Verificar Acceso"}
                  </button>
                  <button
                    onClick={() => {
                      setShowMFA(false);
                      setError(null);
                    }}
                    className="w-full text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest text-center">
                    ← Volver al inicio de sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 flex items-center justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <span>© 2026 Noctra Studio</span>
          <span>By the Forge</span>
        </div>
      </div>
    </main>
  );
}
