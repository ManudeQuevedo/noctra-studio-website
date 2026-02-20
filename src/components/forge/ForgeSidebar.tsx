"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

export function ForgeSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/forge/login");
  };

  const navItems = [
    {
      label: "Projects",
      href: "/forge/projects",
      icon: LayoutDashboard,
    },
    {
      label: "Leads",
      href: "/forge/leads",
      icon: Users,
    },
  ];

  return (
    <aside className="w-full md:w-[280px] bg-[#0a0a0a] border-r border-neutral-900 flex flex-col shrink-0 flex-none h-auto md:h-full z-10">
      <div className="p-6 border-b border-neutral-900 flex justify-between items-center">
        <BrandLogo className="h-5 w-auto text-white" showText={true} />
      </div>

      <div className="flex-1 px-4 py-8 space-y-2">
        <h2 className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">
          Navigation
        </h2>
        {navItems.map((item) => {
          const isActive = pathname.includes(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all text-sm font-medium ${
                isActive
                  ? "bg-white/[0.05] text-white border-l-2 border-emerald-500"
                  : "text-neutral-500 hover:text-white hover:bg-white/[0.02] border-l-2 border-transparent"
              }`}>
              <item.icon
                className={`w-4 h-4 ${isActive ? "text-emerald-400" : ""}`}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-neutral-900">
        <button
          onClick={handleSignOut}
          className="w-full text-left px-3 py-2 text-[10px] font-mono text-neutral-600 hover:text-neutral-400 uppercase tracking-widest flex items-center justify-between transition-colors">
          Sign out <LogOut className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
