"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Instagram, Mail, MapPin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import NextImage from "next/image";

type FooterItem = {
  label: string;
  href?: string;
  badge?: string;
};

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const footerColumns: Array<{
    title: string;
    items: FooterItem[];
  }> = [
    {
      title: t("sections.studio"),
      items: [
        { label: t("links.studio_overview"), href: "/services" },
        {
          label: t("links.websites"),
          href: "/services/professional-websites",
        },
        { label: t("links.branding"), href: "/services" },
        { label: t("links.seo"), href: "/services/optimization" },
        { label: t("links.automations"), href: "/services/custom-systems" },
      ],
    },
    {
      title: t("sections.products"),
      items: [
        { label: t("links.radar"), href: "/#radar" },
        { label: t("links.social"), href: "/#social" },
      ],
    },
    {
      title: t("sections.method"),
      items: [
        { label: t("links.method"), href: "/about" },
        { label: t("links.how_we_build"), href: "/technology-explained" },
        { label: t("links.discovery"), badge: t("badges.internal") },
        { label: t("links.proposals"), badge: t("badges.internal") },
      ],
    },
    {
      title: t("sections.resources"),
      items: [
        { label: t("links.insights"), href: "/blog" },
        { label: t("links.academy"), badge: t("badges.ecosystem") },
        { label: t("links.guarantee"), href: "/guarantee" },
      ],
    },
    {
      title: t("sections.company"),
      items: [
        { label: t("links.work"), href: "/work" },
        { label: t("links.contact"), href: "/contact" },
        { label: t("links.network"), href: "/careers" },
      ],
    },
  ];

  return (
    <footer className="bg-[#050505] border-t border-neutral-900 text-neutral-300 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* MAIN FOOTER GRID */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* LOGO + TAGLINE (Col 1: Noctra Studio) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <NextImage
                  src="/noctra-navbar-dark.svg"
                  alt="Noctra Studio"
                  width={140}
                  height={36}
                  className="h-8 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs font-medium">
              {t("brand_tagline")}
            </p>

            {/* Contact Info Shortcut */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                  <MapPin className="h-4 w-4 text-neutral-300 group-hover:text-white" />
                </div>
                <span className="text-sm text-neutral-400">
                  Querétaro, México
                </span>
              </div>
              <a
                href="mailto:hello@noctra.studio"
                className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                  <Mail className="h-4 w-4 text-neutral-300 group-hover:text-white" />
                </div>
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
                  hello@noctra.studio
                </span>
              </a>
            </div>
          </div>

          {/* COLUMNS 2-5 (Grid within grid) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.label}`}>
                      {item.href ? (
                        <Link
                          href={item.href as any}
                          className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                          <span>{item.label}</span>
                          {item.badge ? (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                              {item.badge}
                            </span>
                          ) : null}
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-sm text-neutral-500">
                          <span>{item.label}</span>
                          {item.badge ? (
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neutral-500">
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BOTTOM BAR (SOCIAL + COPYRIGHT + STATUS) */}
        <div className="py-12 border-t border-neutral-900">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-neutral-400">
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors">
                {t("terms_of_service")}
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors">
                {t("privacy_policy")}
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-white transition-colors">
                {t("cookie_policy")}
              </Link>
            </div>

            <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-neutral-300 lg:justify-start">
                <span>{t("copyright", { year: year.toString() })}</span>
                <span className="hidden sm:inline text-neutral-800">•</span>
                <span>{t("location")}</span>
              </div>

              <p className="text-xs font-medium tracking-tight text-neutral-400">
                {t("made_with")}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    {t("status.label")}
                  </span>
                </div>
                <div className="h-3 w-px bg-neutral-800" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                  {t("status.uptime")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/noctra-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social.linkedin")}
                  className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300">
                  <NextImage
                    src="/icons/linkedin-logo.png"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain brightness-0 invert opacity-90 hover:opacity-100"
                  />
                </a>
                <a
                  href="https://instagram.com/noctra_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social.instagram")}
                  className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/NoctraStudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social.twitter")}
                  className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300">
                  <FaXTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
