"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useFollowUps } from "@/hooks/useFollowUps";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Kanban,
  BarChart3,
  StickyNote,
  Send,
  UserCheck,
  Home,
  BookOpen,
  Shield,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

export interface ForgeSidebarProps {
  workspace?: {
    name: string;
    logo_url: string | null;
    primary_color: string;
  };
}

export function ForgeSidebar({ workspace }: ForgeSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { suggestions } = useFollowUps();

  const [alertCount, setAlertCount] = useState(0);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | null>(null);

  // Collapsible state handling
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem("forge-sidebar-collapsed");
    if (savedState) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data, error } = await supabase.rpc("get_leads_needing_attention");
      if (!error && data) {
        setAlertCount(data.length);
      }
    };
    fetchAlerts();

    const fetchMFAStatus = async () => {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (!error && data) {
        setIs2FAEnabled(data.totp.some((f) => f.status === "verified"));
      }
    };
    fetchMFAStatus();

    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [supabase]);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("forge-sidebar-collapsed", String(newState));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/forge/login");
  };

  const navItems = [
    { label: "Inicio", href: "/forge", icon: Home },
    { label: "Projects", href: "/forge/projects", icon: LayoutDashboard },
    { label: "Pipeline", href: "/forge/pipeline", icon: Kanban },
    { label: "Propuestas", href: "/forge/proposals", icon: StickyNote },
    { label: "Contratos", href: "/forge/contracts", icon: Send },
    { label: "Clientes", href: "/forge/clients", icon: UserCheck },
    { label: "Leads", href: "/forge/leads", icon: Users },
    { label: "Métricas", href: "/forge/metrics", icon: BarChart3 },
    { label: "Docs", href: "/forge/docs", icon: BookOpen },
    { label: "Seguridad", href: "/forge/settings/security", icon: Shield },
  ];

  if (!isMounted) return null; // Prevent hydration mismatch to visual flicker

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden md:flex flex-col h-full bg-[#0a0a0a] transition-all duration-200 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}>
        <div
          className={`p-4 border-b border-neutral-900 flex items-center ${isCollapsed ? "justify-center" : "justify-between"} h-[72px]`}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="/images/noctra-logo-white.png"
                alt="Noctra Studio"
                className="h-6 w-auto flex-none"
              />
              {workspace && workspace.name !== "Noctra Studio" && (
                <>
                  <div className="h-4 w-px bg-neutral-800 flex-none" />
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest truncate">
                    {workspace.name}
                  </span>
                </>
              )}
            </div>
          ) : (
            // Just the isotropic mark/icon when collapsed
            <div className="flex-none p-1 flex items-center justify-center">
              <img
                src="/images/noctra-logo-white.png"
                alt="Noctra Logo"
                className="h-6 w-auto object-left object-none max-w-[24px]"
              />
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className={`p-1 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors flex-none ${isCollapsed ? "hidden" : "block"}`}
            title="Contraer menú">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Expand Button when collapsed */}
        {isCollapsed && (
          <div className="flex justify-center mt-4">
            <button
              onClick={toggleCollapse}
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Expandir menú">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          className={`flex-1 overflow-y-auto custom-scrollbar ${isCollapsed ? "py-4" : "px-4 py-8"} space-y-2`}>
          {!isCollapsed && (
            <h2 className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">
              Navigation
            </h2>
          )}

          <div
            className={`flex flex-col ${isCollapsed ? "gap-4 px-2" : "gap-1"}`}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/forge"
                  ? pathname === "/forge"
                  : pathname.includes(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center ${isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-3"} rounded-md transition-all text-sm font-medium group relative ${
                    isActive
                      ? isCollapsed
                        ? "text-emerald-500 border-l-2 border-emerald-500 bg-white/[0.05]"
                        : "bg-white/[0.05] text-white border-l-2 border-emerald-500"
                      : "text-neutral-300 hover:text-white hover:bg-white/[0.02] border-l-2 border-transparent"
                  }`}>
                  <item.icon
                    className={`w-4 h-4 flex-none ${isActive ? "text-emerald-400" : ""}`}
                  />

                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {/* Badges - Hidden when collapsed, or shown as simple dot */}
                  {item.label === "Pipeline" &&
                    alertCount > 0 &&
                    (isCollapsed ? (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    ) : (
                      <span className="ml-auto w-4 h-4 rounded-full bg-red-500 text-black text-[9px] font-black flex items-center justify-center animate-pulse">
                        {alertCount}
                      </span>
                    ))}

                  {item.label === "Propuestas" &&
                    suggestions.length > 0 &&
                    (isCollapsed ? (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    ) : (
                      <span className="ml-auto w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-black flex items-center justify-center animate-pulse">
                        {suggestions.length}
                      </span>
                    ))}

                  {item.label === "Seguridad" &&
                    is2FAEnabled !== null &&
                    !isCollapsed && (
                      <span
                        className={`ml-auto px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-tight rounded-sm ${is2FAEnabled ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {is2FAEnabled ? "2FA ✓" : "2FA ⚠"}
                      </span>
                    )}
                  {item.label === "Seguridad" &&
                    is2FAEnabled === false &&
                    isCollapsed && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 hidden group-hover:block bg-neutral-800 text-white text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded shadow-xl whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className={`p-4 border-t border-neutral-900 ${isCollapsed ? "flex justify-center" : ""}`}>
          <button
            onClick={handleSignOut}
            title={isCollapsed ? "Cerrar sesión" : undefined}
            className={`w-full ${isCollapsed ? "justify-center p-2" : "text-left px-3 py-3"} rounded-xl text-xs font-mono text-red-500 hover:bg-neutral-900 uppercase tracking-widest flex items-center gap-3 transition-colors group relative`}>
            <LogOut className="w-4 h-4 flex-none" />
            {!isCollapsed && <span>Cerrar sesión</span>}

            {isCollapsed && (
              <div className="absolute left-full ml-4 hidden group-hover:block bg-neutral-800 text-white text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded shadow-xl whitespace-nowrap z-50">
                Cerrar sesión
              </div>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE TOP HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f] flex items-center justify-between px-4">
        <div className="w-8" /> {/* Placeholder for balance/alignment */}
        <div className="flex justify-center items-center flex-1">
          <img
            src="/images/noctra-logo-white.png"
            alt="Noctra Studio"
            className="h-5 w-auto"
          />
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <User className="w-4 h-4 text-white/50" />
        </div>
      </header>
    </>
  );
}
