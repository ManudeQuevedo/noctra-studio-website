"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useInactivityTimeout } from "@/hooks/useInactivityTimeout";
import { ForgeSidebar } from "@/components/forge/ForgeSidebar";
import { ForgeContentWrapper } from "@/components/forge/ForgeContentWrapper";

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

  const isLoginPage = pathname.includes("/forge/login");

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

      {isLoginPage ? (
        children
      ) : (
        <div className="flex h-screen overflow-hidden bg-[#050505] text-white">
          {/* Sidebar container - ForgeSidebar handles its own visibility internaly */}
          <aside className="flex-none h-screen border-r border-[#1f1f1f] md:w-[280px]">
            <ForgeSidebar workspace={workspace} />
          </aside>

          {/* Main Content - Independent Scroll */}
          <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden bg-[#050505] pt-14 md:pt-0 pb-24 md:pb-0 min-w-0 forge-scroll">
            <ForgeContentWrapper>{children}</ForgeContentWrapper>
          </main>
        </div>
      )}
    </>
  );
}
