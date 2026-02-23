"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useInactivityTimeout } from "@/hooks/useInactivityTimeout";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";
import { ForgeTopBar } from "@/components/forge/ForgeTopBar";
import { ForgeContentWrapper } from "@/components/forge/ForgeContentWrapper";
import { MobileBottomNav } from "@/components/forge/MobileBottomNav";
import { CommandBar } from "@/components/forge/CommandBar";
import { Plus } from "lucide-react";

export default function ForgeLayoutClient({
  children,
  workspace,
}: {
  children: React.ReactNode;
  workspace: any;
}) {
  const supabase = createClient(false); // Disable session persistence for forge
  const router = useRouter();
  const pathname = usePathname();
  const { showWarning, timeLeft, staySignedIn } = useInactivityTimeout();
  const [commandBarOpen, setCommandBarOpen] = useState(false);

  const isLoginPage = pathname.includes("/forge/login");
  const isForgeRoot = /^\/([a-z]{2}\/)?forge\/?$/.test(pathname);
  const isLandingPage = isForgeRoot && !workspace;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/forge/login");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandBarOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <>
      {showWarning && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-300">
              You'll be signed out in {minutes}:
              {seconds.toString().padStart(2, "0")} due to inactivity.
            </p>
          </div>
          <button
            onClick={staySignedIn}
            className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors">
            Stay signed in
          </button>
        </div>
      )}

      {isLoginPage || isLandingPage ? (
        children
      ) : (
        <>
          {/* DESKTOP LAYOUT - STRICT FLEX */}
          <div className="hidden md:flex h-dvh overflow-hidden bg-[#050505] text-white">
            <aside className="border-r border-white/5 shrink-0 flex flex-col">
              <ForgeSidebar workspace={workspace} />
            </aside>

            <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden forge-scroll flex flex-col">
              <ForgeTopBar />
              <ForgeContentWrapper>{children}</ForgeContentWrapper>
            </main>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="md:hidden flex h-dvh overflow-hidden bg-[#050505] text-white">
            <main className="flex-1 h-dvh overflow-y-auto overflow-x-hidden bg-[#050505] pt-14 pb-[calc(env(safe-area-inset-bottom)+4rem)] min-w-0 forge-scroll">
              <ForgeSidebar workspace={workspace} />
              <ForgeContentWrapper>{children}</ForgeContentWrapper>
            </main>
          </div>

          {/* Render new Mobile Bottom Nav layout */}
          <MobileBottomNav />

          {/* Quick Actions FAB (Mobile Only) */}
          <button
            onClick={() => setCommandBarOpen(true)}
            className="md:hidden fixed bottom-24 right-4 w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-xl z-50 hover:bg-emerald-400 transition-all active:scale-95"
            aria-label="Abrir acciones rápidas">
            <Plus className="w-6 h-6" />
          </button>

          {/* Global Command Bar */}
          <CommandBar
            isOpen={commandBarOpen}
            onClose={() => setCommandBarOpen(false)}
          />
        </>
      )}
    </>
  );
}
