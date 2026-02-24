"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderClosed, Plus, BarChart3, Menu } from "lucide-react";
import { MobileProfileDrawer } from "./modals/MobileProfileDrawer";

export function MobileBottomNav({
  onOpenCommandBar,
}: {
  onOpenCommandBar: () => void;
}) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  const checkActive = (href: string, exact: boolean = false) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/90 supports-[backdrop-filter]:bg-black/80 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Home */}
          <Link
            href="/forge"
            className="flex flex-col items-center justify-center w-12 h-full gap-1 pt-2 relative">
            <Home
              className={`w-6 h-6 transition-colors ${
                checkActive("/forge", true)
                  ? "text-emerald-500"
                  : "text-white/40"
              }`}
              strokeWidth={checkActive("/forge", true) ? 2.5 : 1.5}
            />
            {checkActive("/forge", true) && (
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
            )}
          </Link>

          {/* Projects */}
          <Link
            href="/forge/projects"
            className="flex flex-col items-center justify-center w-12 h-full gap-1 pt-2 relative">
            <FolderClosed
              className={`w-6 h-6 transition-colors ${
                checkActive("/forge/projects")
                  ? "text-emerald-500"
                  : "text-white/40"
              }`}
              strokeWidth={checkActive("/forge/projects") ? 2.5 : 1.5}
            />
            {checkActive("/forge/projects") && (
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
            )}
          </Link>

          {/* Center Plus Button */}
          <div className="flex items-center justify-center w-16 h-full pt-1">
            <button
              onClick={onOpenCommandBar}
              className="w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all active:scale-95 -translate-y-4"
              aria-label="Menu de creacion">
              <Plus className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>

          {/* Finance/Metrics */}
          <Link
            href="/forge/metrics"
            className="flex flex-col items-center justify-center w-12 h-full gap-1 pt-2 relative">
            <BarChart3
              className={`w-6 h-6 transition-colors ${
                checkActive("/forge/metrics")
                  ? "text-emerald-500"
                  : "text-white/40"
              }`}
              strokeWidth={checkActive("/forge/metrics") ? 2.5 : 1.5}
            />
            {checkActive("/forge/metrics") && (
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
            )}
          </Link>

          {/* Menu / Profile Drawer Trigger */}
          <button
            onClick={() => setProfileOpen(true)}
            className="flex flex-col items-center justify-center w-12 h-full gap-1 pt-2 relative">
            <Menu
              className={`w-6 h-6 transition-colors ${
                profileOpen ? "text-emerald-500" : "text-white/40"
              }`}
              strokeWidth={profileOpen ? 2.5 : 1.5}
            />
            {profileOpen && (
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>
      </nav>

      <MobileProfileDrawer
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
}
