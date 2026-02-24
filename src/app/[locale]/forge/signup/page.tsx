"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ArrowRight, Loader2, Eye, EyeOff, Check } from "lucide-react";

export default function ForgeSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up the user
      const { data: authData, error: signupError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        },
      );

      if (signupError) throw signupError;

      const user = authData.user;
      if (!user) throw new Error("No se pudo crear el usuario");

      // 2. Create the Workspace
      const { data: workspace, error: workspaceError } = await supabase
        .from("workspaces")
        .insert({
          name: workspaceName,
          slug: workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          owner_id: user.id,
          ai_credits_balance: 1000, // Initial balance
        })
        .select()
        .single();

      if (workspaceError) throw workspaceError;

      // 3. Link user to workspace
      const { error: linkError } = await supabase
        .from("workspace_members")
        .insert({
          workspace_id: workspace.id,
          user_id: user.id,
          role: "owner",
        });

      if (linkError) throw linkError;

      // Ensure session persistence
      sessionStorage.setItem("session_start", Date.now().toString());

      // Redirect to onboarding or dashboard
      router.push("/forge");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al registrarte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex selection:bg-emerald-500/30 selection:text-white">
      {/* Panel Izquierdo — Branding + Form */}
      <div className="w-full md:w-[60%] flex flex-col justify-center px-6 py-12 md:px-16 md:py-0 relative h-screen overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        {/* Top: Logo */}
        <div className="absolute top-8 left-6 md:top-12 md:left-16">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity inline-block">
            <BrandLogo className="h-7 text-white" showText={true} />
          </Link>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-md mx-auto mt-20 md:mt-0 pb-16">
          {/* Form Header */}
          <div className="space-y-1 mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Abre tu cuenta en Noctra Forge
            </h2>
            <p className="text-sm text-white/40">
              Prueba 14 días gratis. No se requiere tarjeta de crédito.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={`w-full bg-white/5 border ${error ? "border-red-500/50 focus:border-red-500/50" : "border-white/10 focus:border-emerald-500/50"} rounded-lg px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:ring-0 transition-colors duration-200`}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    Agencia / Empresa
                  </label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    required
                    className={`w-full bg-white/5 border ${error ? "border-red-500/50 focus:border-red-500/50" : "border-white/10 focus:border-emerald-500/50"} rounded-lg px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:ring-0 transition-colors duration-200`}
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">
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
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className={`w-full bg-white/5 border ${error ? "border-red-500/50 focus:border-red-500/50" : "border-white/10 focus:border-emerald-500/50"} rounded-lg px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:ring-0 transition-colors duration-200`}
                    placeholder="Mínimo 8 caracteres"
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

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-black font-bold rounded-lg py-3 hover:bg-emerald-400 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Creando
                    cuenta...
                  </span>
                ) : (
                  <>
                    Crear cuenta gratis
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-xs text-white/40">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    href="/forge/login"
                    className="text-white hover:text-emerald-400 transition-colors font-medium">
                    Inicia Sesión
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Panel Derecho — Imagen */}
      <div className="hidden md:flex md:w-[40%] h-screen relative border-l border-white/5">
        <div className="absolute inset-0 bg-[#0A0A0A] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>
        <div className="absolute bottom-16 left-16 right-16">
          <div className="space-y-4 mb-12">
            {[
              "Acceso seguro a tus proyectos y tareas.",
              "Facturación, clientes y portales listos.",
              "Gestión de rentabilidad mediante AI.",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-sm font-medium text-white/80">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <p className="text-white font-medium text-lg leading-snug mb-2">
              "En 2 días configuramos Noctra y reemplazamos Asana, Pipedrive y
              Slack."
            </p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
              — Equipo fundador
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
