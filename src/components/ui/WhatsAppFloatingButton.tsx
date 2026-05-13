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
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 max-w-[calc(100vw-2rem)] whitespace-normal rounded-full border border-white/10 bg-[rgba(12,12,14,0.92)] px-2.5 py-1 text-center text-[11px] leading-tight text-white/95 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 ease-[ease] group-hover:opacity-100">
          {t("tooltip")}
        </span>

        <a
          href={`https://wa.me/524463731451?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("aria_label")}
          className="flex h-11 w-11 items-center justify-center rounded-full border-[0.5px] border-white/15 bg-[rgba(255,255,255,0.08)] text-white shadow-sm backdrop-blur-[8px] transition-all duration-200 ease-[ease] hover:border-white/30 hover:bg-[rgba(255,255,255,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40">
          <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden />
        </a>
      </m.div>
    </LazyMotion>
  );
};
