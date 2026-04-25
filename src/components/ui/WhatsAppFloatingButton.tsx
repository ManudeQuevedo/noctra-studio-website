"use client";

import { LazyMotion, m, domAnimation } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export const WhatsAppFloatingButton = () => {
  const pathname = usePathname();
  const t = useTranslations("WhatsAppWidget");

  // Don't show on forge routes or contact page
  const isForgePage =
    pathname?.startsWith("/forge") || pathname?.includes("/forge");
  const isContactPage = pathname?.endsWith("/contact");

  if (isForgePage || isContactPage) return null;

  const waMessage = encodeURIComponent(t("message"));

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        role="region"
        aria-label={t("aria_label")}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 left-6 z-[100] group">
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
          {t("tooltip")}
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-neutral-900" />
        </div>

        <a
          href={`https://wa.me/524463731451?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("aria_label")}
          className="flex items-center justify-center w-12 h-12 bg-[#1a7a45] rounded-full text-white shadow-lg hover:bg-[#1f9152] hover:shadow-[#1a7a45]/30 hover:scale-105 transition-all duration-300">
          <FaWhatsapp className="w-6 h-6" />
        </a>
      </m.div>
    </LazyMotion>
  );
};
