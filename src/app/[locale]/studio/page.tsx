"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { useLocale } from "next-intl";
import { handleSignOut } from "./actions";
import {
  Terminal,
  MessageSquare,
  Users,
  Layers,
  Send,
  Loader2,
  Cpu,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

type AgentType = "social" | "lead" | "scope";

export default function CommandCenter() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<AgentType>("social");

  const tabs = [
    {
      id: "social",
      label: "Social Architect",
      icon: MessageSquare,
      color: "text-blue-400",
      borderColor: "border-blue-400/20",
      bg: "bg-blue-400/10",
      system:
        "You are the Lead Editor for Noctra. Tone: Precise, Architectural. Output: X Thread & IG Caption.",
    },
    {
      id: "lead",
      label: "Lead Analyzer",
      icon: Users,
      color: "text-green-400",
      borderColor: "border-green-400/20",
      bg: "bg-green-400/10",
      system:
        "You are the Sales Director. Analyze this email for budget/fit and draft a high-status reply.",
    },
    {
      id: "scope",
      label: "Scope Generator",
      icon: Layers,
      color: "text-purple-400",
      borderColor: "border-purple-400/20",
      bg: "bg-purple-400/10",
      system:
        "You are the Solution Architect. Create a project scope and tech stack recommendation based on this request.",
    },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab);

  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/completion",
      body: {
        system: activeTabData?.system,
      },
    });

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                NOCTRA_COMMAND_CENTER
              </h1>
              <p className="text-xs text-neutral-500">v2.0.0 | SYSTEM_ONLINE</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Cpu className="w-4 h-4" />
              <span>GEMINI_1.5_FLASH_ACTIVE</span>
            </div>
            <button
              onClick={() => handleSignOut(locale)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all">
              <LogOut className="w-3 h-3" />
              LOGOUT
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AgentType)}
              className={`relative p-4 rounded-xl border transition-all duration-300 text-left group ${
                activeTab === tab.id
                  ? `${tab.borderColor} ${tab.bg}`
                  : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
              }`}>
              <div className="flex items-center gap-3 mb-2">
                <tab.icon
                  className={`w-5 h-5 ${
                    activeTab === tab.id ? tab.color : "text-neutral-500"
                  }`}
                />
                <span
                  className={`font-bold ${
                    activeTab === tab.id ? "text-white" : "text-neutral-400"
                  }`}>
                  {tab.label}
                </span>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-glow"
                  className={`absolute inset-0 rounded-xl ring-1 ring-inset ${tab.color} opacity-20`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Input Area */}
          <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 flex flex-col">
            <h2 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-wider">
              Input Stream
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-4">
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder={
                  activeTab === "social"
                    ? "Enter raw thoughts or topic..."
                    : activeTab === "lead"
                    ? "Paste client email or inquiry..."
                    : "Describe project requirements..."
                }
                className="flex-1 bg-black/50 border border-neutral-800 rounded-lg p-4 text-sm focus:ring-1 focus:ring-white focus:border-white outline-none resize-none placeholder:text-neutral-700"
              />
              <button
                type="submit"
                disabled={isLoading || !input}
                className={`w-full py-4 rounded-lg font-bold text-black transition-all flex items-center justify-center gap-2 ${
                  isLoading || !input
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : "bg-white hover:bg-neutral-200"
                }`}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Execute Agent
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output Area */}
          <div className="bg-black border border-neutral-800 rounded-xl p-6 overflow-hidden flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                System Output
              </h2>
              {isLoading && (
                <span className="text-xs text-green-500 animate-pulse">
                  ● STREAMING_DATA
                </span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap text-neutral-300 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent pr-2">
              {completion ? (
                completion
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-700 italic">
                  {/* Waiting for input... */}
                </div>
              )}
            </div>
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
