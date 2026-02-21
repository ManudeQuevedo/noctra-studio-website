"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { BrandLogo } from "@/components/ui/BrandLogo";
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
  FolderOpen,
  MoreHorizontal,
  Shield,
  BookOpen,
} from "lucide-react";
import { useFollowUps } from "@/hooks/useFollowUps";

export function ForgeSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [alertCount, setAlertCount] = useState(0);
  const [docsSheetOpen, setDocsSheetOpen] = useState(false);
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | null>(null);

  const { suggestions } = useFollowUps();

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

  const docsItems = [
    { label: "Propuestas", href: "/forge/proposals", icon: StickyNote },
    { label: "Contratos", href: "/forge/contracts", icon: Send },
    { label: "Clientes", href: "/forge/clients", icon: UserCheck },
  ];

  // Helper closing functions
  const closeSheets = () => {
    setDocsSheetOpen(false);
    setMoreSheetOpen(false);
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-[280px] bg-[#0a0a0a] border-r border-neutral-900 flex-col shrink-0 flex-none h-full z-10">
        <div className="p-6 border-b border-neutral-900 flex justify-between items-center">
          <BrandLogo className="h-5 w-auto text-white" showText={true} />
        </div>

        <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <h2 className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-300 mb-4">
            Navigation
          </h2>
          {navItems.map((item) => {
            const isActive =
              item.href === "/forge"
                ? pathname === "/forge"
                : pathname.includes(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all text-sm font-medium ${
                  isActive
                    ? "bg-white/[0.05] text-white border-l-2 border-emerald-500"
                    : "text-neutral-300 hover:text-white hover:bg-white/[0.02] border-l-2 border-transparent"
                }`}>
                <item.icon
                  className={`w-4 h-4 ${isActive ? "text-emerald-400" : ""}`}
                />
                {item.label}
                {item.label === "Pipeline" && alertCount > 0 && (
                  <span className="ml-auto w-4 h-4 rounded-full bg-red-500 text-black text-[9px] font-black flex items-center justify-center animate-pulse">
                    {alertCount}
                  </span>
                )}
                {item.label === "Propuestas" && suggestions.length > 0 && (
                  <span className="ml-auto w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-black flex items-center justify-center animate-pulse">
                    {suggestions.length}
                  </span>
                )}
                {item.label === "Seguridad" && is2FAEnabled !== null && (
                  <span
                    className={`ml-auto px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-tight rounded-sm ${is2FAEnabled ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {is2FAEnabled ? "2FA ✓" : "2FA ⚠"}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-neutral-900">
          <button
            onClick={handleSignOut}
            className="w-full text-left px-3 py-2 text-[10px] font-mono text-neutral-400 hover:text-neutral-400 uppercase tracking-widest flex items-center justify-between transition-colors">
            Sign out <LogOut className="w-3 h-3" />
          </button>
        </div>
      </aside>

      {/* MOBILE TOP HEADER */}
      <header className="md:hidden sticky top-0 z-40 h-12 w-full bg-[#0a0a0a] border-b border-[#1f1f1f] flex items-center justify-between px-4 shrink-0 flex-none">
        <div className="text-[12px] font-bold tracking-widest uppercase flex items-center gap-2 text-white">
          ◆ NOCTRA
        </div>
        <div className="text-[12px] font-mono text-neutral-500 uppercase tracking-widest truncate max-w-[150px]">
          {navItems.find((n) => pathname.includes(n.href))?.label ||
            "Dashboard"}
        </div>
      </header>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-[#1f1f1f] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16 px-1">
          <MobileTabItem
            href="/forge"
            icon={Home}
            label="Inicio"
            isActive={pathname === "/forge"}
            onClick={closeSheets}
          />
          <MobileTabItem
            href="/forge/pipeline"
            icon={Kanban}
            label="Pipeline"
            isActive={pathname.includes("/forge/pipeline")}
            onClick={closeSheets}
          />
          <MobileTabItem
            href="/forge/leads"
            icon={Users}
            label="Leads"
            badge={alertCount}
            isActive={pathname.includes("/forge/leads")}
            onClick={closeSheets}
          />

          <button
            type="button"
            onClick={() => {
              setMoreSheetOpen(false);
              setDocsSheetOpen(true);
            }}
            className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1 pb-1">
            <FolderOpen
              className={`w-5 h-5 ${docsSheetOpen ? "text-white" : "text-neutral-400"}`}
            />
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.1em] ${docsSheetOpen ? "text-white" : "text-neutral-400"}`}>
              Docs
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDocsSheetOpen(false);
              setMoreSheetOpen(true);
            }}
            className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1 pb-1">
            <MoreHorizontal
              className={`w-5 h-5 ${moreSheetOpen ? "text-white" : "text-neutral-400"}`}
            />
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.1em] ${moreSheetOpen ? "text-white" : "text-neutral-400"}`}>
              Más
            </span>
          </button>
        </div>
      </nav>

      {/* DOCS BOTTOM SHEET */}
      <MobileSheet
        isOpen={docsSheetOpen}
        onClose={() => setDocsSheetOpen(false)}>
        <div className="flex flex-col gap-1">
          {docsItems.map((item) => (
            <SheetNavItem
              key={item.href}
              item={item}
              pathname={pathname}
              onClick={() => setDocsSheetOpen(false)}
            />
          ))}
        </div>
      </MobileSheet>

      {/* MORE BOTTOM SHEET */}
      <MobileSheet
        isOpen={moreSheetOpen}
        onClose={() => setMoreSheetOpen(false)}>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SheetNavItem
              key={item.href}
              item={item}
              pathname={pathname}
              onClick={() => setMoreSheetOpen(false)}
            />
          ))}
          <div className="w-full h-px bg-neutral-900 my-4" />
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-4 rounded-xl text-xs font-mono text-red-400 hover:bg-neutral-900 uppercase tracking-widest flex items-center gap-4 transition-colors">
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </MobileSheet>
    </>
  );
}

// Subcomponents for specific Mobile parts
function MobileTabItem({
  href,
  icon: Icon,
  label,
  isActive,
  badge = 0,
  onClick,
}: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1 pb-1 relative">
      {isActive && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-emerald-500 rounded-b-sm" />
      )}
      <div className="relative">
        <Icon
          className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-400"}`}
        />
        {badge > 0 && (
          <div className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-[8px] font-black text-black leading-none">
              {badge}
            </span>
          </div>
        )}
      </div>
      <span
        className={`text-[10px] font-mono uppercase tracking-[0.1em] ${isActive ? "text-white" : "text-neutral-400"}`}>
        {label}
      </span>
    </Link>
  );
}

function MobileSheet({ isOpen, onClose, children }: any) {
  return (
    <>
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-[#111111] z-[70] rounded-t-[16px] pb-[calc(env(safe-area-inset-bottom)+1rem)] transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex justify-center p-4" onClick={onClose}>
          <div className="w-10 h-1 bg-[#333333] rounded-full" />
        </div>
        <div className="px-4 pb-4 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </>
  );
}

function SheetNavItem({ item, pathname, onClick }: any) {
  const isActive = pathname.includes(item.href);
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-4 rounded-xl min-h-[48px] text-xs font-mono uppercase tracking-widest transition-colors ${
        isActive
          ? "bg-white/[0.05] text-white border-l-2 border-emerald-500"
          : "text-neutral-400 hover:text-white"
      }`}>
      <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-400" : ""}`} />
      {item.label}
    </Link>
  );
}
