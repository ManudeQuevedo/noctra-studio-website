"use client";

import { useTranslations } from "next-intl";
import { Shield, Lock, Zap, Copyright, CheckCircle2 } from "lucide-react";

export function OperationalDirectives() {
  const t = useTranslations("OperationalDirectives");

  const protocols = [
    {
      id: "ip_transfer",
      icon: Copyright,
      title: t("protocols.ip_transfer.title"),
      desc: t("protocols.ip_transfer.desc"),
    },
    {
      id: "exclusivity",
      icon: Shield,
      title: t("protocols.exclusivity.title"),
      desc: t("protocols.exclusivity.desc"),
    },
    {
      id: "output_first",
      icon: Zap,
      title: t("protocols.output_first.title"),
      desc: t("protocols.output_first.desc"),
    },
    {
      id: "silence",
      icon: Lock,
      title: t("protocols.silence.title"),
      desc: t("protocols.silence.desc"),
    },
  ];

  return (
    <div className="w-full border border-neutral-800 bg-black/50 backdrop-blur-sm rounded-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/50">
        <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {t("title")}
        </h3>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-neutral-700" />
          <div className="w-1 h-1 rounded-full bg-neutral-700" />
          <div className="w-1 h-1 rounded-full bg-neutral-700" />
        </div>
      </div>

      {/* Protocols List */}
      <div className="divide-y divide-neutral-800">
        {protocols.map((protocol, index) => (
          <div
            key={protocol.id}
            className="p-4 flex gap-4 group hover:bg-neutral-900/30 transition-colors">
            <div className="mt-1 text-neutral-500 group-hover:text-white transition-colors">
              <protocol.icon className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-600">
                  0{index + 1} //
                </span>
                <h4 className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">
                  {protocol.title}
                </h4>
                <CheckCircle2 className="w-3 h-3 text-green-900/50 group-hover:text-green-500 transition-colors ml-auto opacity-0 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {protocol.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Disclaimer */}
      <div className="px-4 py-3 bg-neutral-900/30 border-t border-neutral-800">
        <p className="text-[10px] font-mono text-neutral-600 text-center uppercase tracking-wide">
          {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
