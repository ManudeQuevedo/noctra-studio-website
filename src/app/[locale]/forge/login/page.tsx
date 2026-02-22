"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ArrowRight, Loader2, Eye, EyeOff, Check } from "lucide-react";

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
    <main className="min-h-screen bg-[#000000] text-white flex selection:bg-emerald-500/30 selection:text-white">
      {/* Panel Izquierdo — Branding + Form (60% width on md) */}
      <div className="w-full md:w-[60%] flex flex-col justify-center px-6 py-12 md:px-16 md:py-0 relative h-screen overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        {/* Top: Logo */}
        <div className="absolute top-8 left-6 md:top-12 md:left-16">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity inline-block">
            <BrandLogo className="h-7 text-white" showText={true} />
          </Link>
        </div>

        {/* Cntent Container */}
        <div className="w-full max-w-md mx-auto mt-20 md:mt-0 pb-16">
          {/* Header Typography */}
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Tu proyecto.
              <br />
              Tu portal.
              <br />
              Tu control.
            </h1>
          </div>

          {/* Green Separator */}
          <div className="w-8 h-[2px] bg-emerald-500 rounded-full mt-6 mb-8" />

          {/* Feature List (Desktop Only) */}
          <div className="hidden md:flex flex-col space-y-4 mb-12">
            {[
              "Acceso seguro a tus entregables",
              "Actualizaciones en tiempo real",
              "Comunicación directa con tu equipo",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 flex-none" />
                <span className="text-xs uppercase tracking-widest text-white/50">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Form Header */}
          <div className="space-y-1 mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Bienvenido a Noctra CRM
            </h2>
            <p className="text-sm text-white/40">
              Ingresa tus credenciales para acceder al panel.
            </p>
          </div>

          {reasonMessage && !showMFA && (
            <div className="p-3 mb-6 border border-white/10 bg-white/5 rounded-lg text-white/60 text-[10px] font-mono uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-2 duration-300">
              {reasonMessage}
            </div>
          )}

          {!showMFA ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full bg-white/5 border ${error ? "border-red-500/50 focus:border-red-500/50" : "border-white/10 focus:border-emerald-500/50"} rounded-lg px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:ring-0 transition-colors duration-200`}
                    placeholder="nombre@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`w-full bg-white/5 border ${error ? "border-red-500/50 focus:border-red-500/50" : "border-white/10 focus:border-emerald-500/50"} rounded-lg px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:ring-0 transition-colors duration-200`}
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
                <div className="text-red-400 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
                  {error}
                </div>
              )}

              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-semibold rounded-lg py-3 hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100">
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Iniciar Sesión
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/25">
                    🔒 Conexión cifrada SSL · noctra.studio
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <div className={`space-y-8 ${shake ? "animate-shake" : ""}`}>
              <div className="space-y-2 text-center">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  Verificación MFA
                </h2>
                <p className="text-[9px] text-white/40 font-mono tracking-widest uppercase">
                  Código de seguridad de 6 dígitos
                </p>
              </div>

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
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-lg text-center text-lg font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-all duration-200"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {mfaError && (
                <div className="text-red-400 text-xs mt-1 text-center animate-in fade-in slide-in-from-top-1">
                  {mfaError}
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => handleMFAVerify()}
                  disabled={isVerifyingMFA || otpCode.some((d) => d === "")}
                  className="w-full bg-white text-black font-semibold rounded-lg py-3 hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:scale-100">
                  {isVerifyingMFA ? "Verificando..." : "Confirmar Identidad"}
                </button>
                <button
                  onClick={() => setShowMFA(false)}
                  className="w-full text-[9px] font-mono text-white/20 hover:text-white/40 transition-colors uppercase tracking-[0.2em] text-center">
                  ← Volver al Login
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Absolute Links */}
        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-16 flex flex-col gap-2">
          <Link
            href="/"
            className="text-xs text-white/20 hover:text-white/40 transition-colors">
            Volver al sitio
          </Link>
          <div className="hidden md:block text-white/15 text-xs">
            &copy; 2026 Noctra Studio &middot; Querétaro, MX
          </div>
        </div>
      </div>

      {/* Panel Derecho — Imagen (40% width on md, hidden on mobile) */}
      <div className="hidden md:flex md:w-[40%] h-screen relative border-l border-white/5">
        <img
          src="/images/login-client-portal.jpg"
          alt="Noctra Studio Portal"
          className="object-cover w-full h-full"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Embedded Text */}
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-white font-bold text-xl leading-snug">
            "Diseñamos y construimos
            <br />
            presencias digitales que convierten."
          </p>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-2">
            — Noctra Studio, Querétaro MX
          </p>
        </div>
      </div>
    </main>
  );
}
