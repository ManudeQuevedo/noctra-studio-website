"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight, Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NextImage from "next/image";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const year = new Date().getFullYear();
  const [time, setTime] = useState("");
  const pathname = usePathname();
  const isContactPage = pathname?.endsWith("/contact");
  const isCareersPage = pathname?.includes("/careers");
  const hideCtaRow = isContactPage || isCareersPage;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Mexico_City",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-neutral-900 text-white font-sans">
      {/* Row 1: The Hook - Hidden on Contact and Careers Pages */}
      {!hideCtaRow && (
        <div className="border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 pb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">
              {t("hook")}
            </h2>
            <Link
              href="/contact"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-lg font-medium hover:text-neutral-300 transition-colors">
              {t("book_discovery")}
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}

      {/* Row 2: The Data Grid */}
      <div className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-900">
            {/* Col 1: Identity */}
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <h3 className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">
                {t("studio_label")}
              </h3>
              <div>
                <NextImage
                  src="/noctra-navbar-dark.svg"
                  alt="Noctra Studio"
                  width={120}
                  height={32}
                  className="h-6 w-auto mb-4 object-contain"
                />
                <p className="text-neutral-400 text-sm">{t("brand_tagline")}</p>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <h3 className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">
                {t("nav_title")}
              </h3>
              <nav className="flex flex-col gap-3 pt-1">
                {[
                  { label: tNav("home"), href: "/" },
                  { label: tNav("about"), href: "/about" },
                  { label: tNav("careers"), href: "/careers" },
                  { label: tNav("contact"), href: "/contact" },
                ].map((item) => {
                  const isActive = pathname?.endsWith(item.href);

                  return isActive ? (
                    <span
                      key={item.label}
                      className="text-white font-medium cursor-default w-fit">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-neutral-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Col 3: Services */}
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <h3 className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">
                {t("services_title")}
              </h3>
              <nav className="flex flex-col gap-3 pt-1">
                {[
                  { label: t("service_work"), href: "/work" },
                  { label: t("service_digital_arch"), href: "/services" },
                  { label: t("service_visual_identity"), href: "/services" },
                  {
                    label: t("service_intelligent_systems"),
                    href: "/services",
                  },
                  { label: t("service_growth"), href: "/services" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 4: Socials */}
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <h3 className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">
                {t("connect_title")}
              </h3>
              <div className="flex flex-col gap-4 pt-1">
                <div className="flex gap-4">
                  <Link
                    href="https://instagram.com/noctra_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram page"
                    className="text-neutral-400 hover:text-white transition-colors">
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link
                    href="https://x.com/NoctraStudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our X profile"
                    className="text-neutral-400 hover:text-white transition-colors">
                    <FaXTwitter className="w-6 h-6" />
                  </Link>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href="/terms"
                    className="text-xs text-neutral-500 hover:text-white transition-colors w-fit">
                    {t("terms_of_service")}
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-xs text-neutral-500 hover:text-white transition-colors w-fit">
                    {t("privacy_policy")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: The Metadata */}
      <div className="bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 gap-4 md:gap-0">
          <div className="w-full md:w-auto text-center md:text-left">
            {t("copyright", { year })}
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="uppercase tracking-wider">
              {t("system_status")}
            </span>
          </div>

          <div className="w-full md:w-auto text-center md:text-right font-mono">
            {t("location")} [{time}]
          </div>
        </div>

        {/* Designed In - Bottom Line */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 pb-8 text-center">
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
            {t("designed_in")}
          </p>
        </div>
      </div>
    </footer>
  );
}
