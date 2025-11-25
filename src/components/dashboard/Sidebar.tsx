"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderGit2,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ListTodo,
  History,
} from "lucide-react";
import { useLocale } from "next-intl";

type TabType =
  | "overview"
  | "deliverables"
  | "financials"
  | "settings"
  | "tasks"
  | "activity";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userEmail?: string;
}

const navItems = [
  { id: "overview" as TabType, label: "Overview", icon: LayoutDashboard },
  { id: "tasks" as TabType, label: "Tasks", icon: ListTodo },
  { id: "deliverables" as TabType, label: "Deliverables", icon: FolderGit2 },
  { id: "financials" as TabType, label: "Financials", icon: CreditCard },
  { id: "activity" as TabType, label: "Activity", icon: History },
  { id: "settings" as TabType, label: "Settings", icon: Settings },
];

// Generate initials from email
const getInitials = (email?: string) => {
  if (!email) return "U";
  const name = email.split("@")[0];
  const parts = name.split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Get display name from email
const getDisplayName = (email?: string) => {
  if (!email) return "User";
  const name = email.split("@")[0];
  const formatted = name
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  // Smart truncation: If > 18 chars, show First Name + Last Initial
  if (formatted.length > 18) {
    const parts = formatted.split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
    }
    return formatted.substring(0, 18);
  }
  return formatted;
};

// Get company name from email domain
const getCompanyName = (email?: string) => {
  if (!email) return "Noctra Client";
  const domain = email.split("@")[1];
  if (!domain) return "Noctra Client";

  // Remove common TLDs and capitalize
  const companyPart = domain.split(".")[0];
  return companyPart.charAt(0).toUpperCase() + companyPart.slice(1);
};

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  userEmail,
}: SidebarProps) {
  const locale = useLocale();
  const initials = getInitials(userEmail);
  const displayName = getDisplayName(userEmail);
  const companyName = getCompanyName(userEmail);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full bg-neutral-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/60 border-r border-neutral-800 flex flex-col relative">
      {/* Header with Logo and Collapse Toggle */}
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-sm font-semibold tracking-tight text-white">
            {companyName}
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition-colors">
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-neutral-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}>
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium text-sm">
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-neutral-800 space-y-3">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-2" title={userEmail}>
            {/* Avatar with Initials */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-white">{initials}</span>
            </div>
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {displayName}
              </p>
              <p className="text-xs text-neutral-500">Client Account</p>
            </div>
          </div>
        )}

        {/* Sign Out */}
        <form action={`/${locale}/auth/signout`} method="post">
          <button
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all ${
              isCollapsed ? "justify-center" : ""
            }`}>
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <span className="font-medium text-sm">Sign Out</span>
            )}
          </button>
        </form>
      </div>
    </motion.aside>
  );
}
