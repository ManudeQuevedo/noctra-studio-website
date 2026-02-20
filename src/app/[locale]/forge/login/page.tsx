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

      // Store absolute session start time
      sessionStorage.setItem("session_start", Date.now().toString());

      router.push("/forge/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

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
            {reasonMessage && (
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                {reasonMessage}
              </p>
            )}
          </div>

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
        </div>
      </div>
    </main>
  );
}
