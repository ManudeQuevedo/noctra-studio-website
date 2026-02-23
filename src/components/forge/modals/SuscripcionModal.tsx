"use client";

import { useTranslations } from "next-intl";
import { X, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";

interface SuscripcionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuscripcionModal({ isOpen, onClose }: SuscripcionModalProps) {
  const t = useTranslations("forge.suscripcion");
  const currentPlan = "free";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl overflow-hidden rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
              {t("titulo")}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-md text-white/50 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8 forge-scroll">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              {t("planActual")}
            </h3>
            <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-emerald-400 font-mono text-sm uppercase tracking-widest font-bold">
                    {t(`planes.${currentPlan}.nombre`)}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-widest rounded-full font-bold">
                    Default
                  </span>
                </div>
                <p className="text-sm text-white/50">
                  {t(`planes.${currentPlan}.descripcion`)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/50 flex items-center gap-2">
              <span className="w-full h-px bg-white/5 inline-block" />
              <span className="shrink-0">{t("actualizarPlan")}</span>
              <span className="w-full h-px bg-white/5 inline-block" />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pro Plan */}
              <div className="p-6 border border-white/10 rounded-xl bg-neutral-900/50 hover:border-white/20 transition-colors flex flex-col h-full opacity-50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10">
                    {t("proximamente")}
                  </span>
                </div>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold">
                    {t("planes.pro.nombre")}
                  </h4>
                  <span className="text-xl font-mono tracking-tighter">
                    $49
                    <span className="text-[10px] text-white/40 tracking-normal">
                      /mo
                    </span>
                  </span>
                </div>
                <p className="text-sm text-white/40 mb-6">
                  {t("planes.pro.descripcion")}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <button className="w-full py-2 bg-white/5 text-white/50 text-[10px] uppercase tracking-widest rounded-md cursor-not-allowed hidden">
                    Upgrade
                  </button>
                </div>
              </div>

              {/* Business Plan */}
              <div className="p-6 border border-white/10 rounded-xl bg-neutral-900/50 hover:border-white/20 transition-colors flex flex-col h-full opacity-50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10">
                    {t("proximamente")}
                  </span>
                </div>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold">
                    {t("planes.business.nombre")}
                  </h4>
                  <span className="text-xl font-mono tracking-tighter">
                    $199
                    <span className="text-[10px] text-white/40 tracking-normal">
                      /mo
                    </span>
                  </span>
                </div>
                <p className="text-sm text-white/40 mb-6">
                  {t("planes.business.descripcion")}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <button className="w-full py-2 bg-white/5 text-white/50 text-[10px] uppercase tracking-widest rounded-md cursor-not-allowed hidden">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="mailto:contact@noctra.com"
                className="text-xs text-white/40 hover:text-white flex items-center gap-2 transition-colors">
                ¿Necesitas más capacidad? {t("contactar")}{" "}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
