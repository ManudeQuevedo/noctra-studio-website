"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Kanban,
  Users,
  FileText,
  MoreHorizontal,
  Settings,
  LogOut,
  Shield,
  BarChart3,
  Presentation,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  const supabase = createClient(false);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/forge/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const mainTabs = [
    { href: "/forge", icon: Home, label: "Inicio", exact: true },
    { href: "/forge/projects", icon: Presentation, label: "Proyectos" },
    { href: "/forge/pipeline", icon: Kanban, label: "Pipeline" },
    { href: "/forge/proposals", icon: FileText, label: "Propuestas" },
  ];

  const secondaryTabs = [
    { href: "/forge/contracts", icon: Shield, label: "Contratos" },
    { href: "/forge/leads", icon: Users, label: "Leads" },
    { href: "/forge/metrics", icon: BarChart3, label: "Métricas" },
    { href: "/forge/security", icon: Settings, label: "Seguridad" },
  ];

  const checkActive = (href: string, exact: boolean = false) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <>
      {/* Spacer to prevent content from hiding behind the absolute fixed nav */}
      <div className="md:hidden h-20 w-full flex-none" />

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-between items-center h-16 px-2">
          {mainTabs.map((tab) => {
            const isActive = checkActive(tab.href, tab.exact);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMoreSheetOpen(false)}
                className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1 pb-1 relative">
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-emerald-500 rounded-b-sm" />
                )}
                <tab.icon
                  className={`w-[22px] h-[22px] ${isActive ? "text-emerald-500" : "text-white/30"}`}
                  strokeWidth={1.5}
                />
                <span
                  className={`text-[9px] uppercase tracking-widest mt-1 ${isActive ? "text-emerald-500 font-bold" : "text-white/30"}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreSheetOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1 pb-1">
            <MoreHorizontal
              className={`w-[22px] h-[22px] ${moreSheetOpen ? "text-white" : "text-white/30"}`}
              strokeWidth={1.5}
            />
            <span
              className={`text-[9px] uppercase tracking-widest mt-1 ${moreSheetOpen ? "text-white font-bold" : "text-white/30"}`}>
              Más
            </span>
          </button>
        </div>
      </nav>

      {/* MORE BOTTOM SHEET (Drawer) */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          moreSheetOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMoreSheetOpen(false)}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div
        className={`md:hidden fixed bottom-16 left-0 right-0 z-[70] bg-[#0a0a0a] border-t border-white/10 rounded-t-2xl pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-out flex flex-col pt-2 ${
          moreSheetOpen ? "translate-y-0" : "translate-y-full"
        }`}>
        {/* Drag Handle */}
        <div
          className="w-full flex justify-center py-2 pb-4 cursor-pointer"
          onClick={() => setMoreSheetOpen(false)}>
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 max-h-[60vh]">
          <div className="flex flex-col">
            {secondaryTabs.map((item) => {
              const isActive = checkActive(item.href, false);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreSheetOpen(false)}
                  className={`flex items-center gap-4 py-4 border-b border-white/5 transition-colors ${
                    isActive
                      ? "text-emerald-500"
                      : "text-white/70 hover:text-white"
                  }`}>
                  <item.icon className="w-[22px] h-[22px]" strokeWidth={1.5} />
                  <span className="text-[12px] uppercase tracking-widest font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-red-500/10 text-red-500 text-[10px] uppercase tracking-widest font-bold hover:bg-red-500/20 transition-colors">
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
