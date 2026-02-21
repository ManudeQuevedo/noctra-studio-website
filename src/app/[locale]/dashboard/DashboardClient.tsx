"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import { LogOut } from "lucide-react";
import OverviewView from "@/components/dashboard/views/OverviewView";
import TasksView from "@/components/dashboard/views/TasksView";
import ActivityView from "@/components/dashboard/views/ActivityView";
import DeliverablesView from "@/components/dashboard/views/DeliverablesView";
import FinancialsView from "@/components/dashboard/views/FinancialsView";
import SettingsView from "@/components/dashboard/views/SettingsView";
import { Cursor } from "@/components/ui/cursor";
import { DashboardData } from "@/types/dashboard";

type TabType =
  | "overview"
  | "deliverables"
  | "financials"
  | "settings"
  | "tasks"
  | "activity";

interface DashboardClientProps {
  initialData: DashboardData | null;
}

export default function DashboardClient({ initialData }: DashboardClientProps) {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
  );

  const renderView = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewView key="overview" data={initialData} />;
      case "tasks":
        return <TasksView key="tasks" />;
      case "activity":
        return <ActivityView key="activity" />;
      case "deliverables":
        return <DeliverablesView key="deliverables" />;
      case "financials":
        return <FinancialsView key="financials" />;
      case "settings":
        return <SettingsView key="settings" />;
      default:
        return <OverviewView key="overview" data={initialData} />;
    }
  };

  if (!initialData) {
    // Fallback for no data / loading state if needed, though page.tsx handles null
    // But if we want a "Project Setup" state as requested:
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome to Noctra</h1>
          <p className="text-neutral-400">Setting up your environment...</p>
        </div>

        <form action={`/${locale}/auth/signout`} method="post">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {/* Custom Cursor */}
      <Cursor />

      {/* Spotlight Background Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: spotlightBackground,
        }}
      />

      <div className="flex h-screen w-screen overflow-hidden text-white relative z-10">
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userEmail={initialData.profile.full_name} // Use name instead of email if available
        />

        <main className="flex-1 h-full overflow-hidden flex flex-col">
          <div className="flex-1 flex flex-col min-h-0 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col">
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <footer className="border-t border-zinc-800 py-4">
            <p className="text-xs text-zinc-500 text-center">
              © 2025 Noctra Studio. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
