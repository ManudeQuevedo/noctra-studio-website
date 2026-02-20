"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Instagram,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import NextImage from "next/image";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const year = new Date().getFullYear();
  const pathname = usePathname();

  const isContactPage = pathname?.endsWith("/contact");
  const isCareersPage =
    pathname?.includes("/careers") || pathname?.includes("/talento");
  const isWorkPage = pathname?.endsWith("/work");
  const hideCtaRow = isContactPage || isCareersPage || isWorkPage;

  return (
    <footer className="bg-[#050505] border-t border-neutral-900 text-neutral-300 font-sans">
      {/* 1. CTA SECTION */}
      {!hideCtaRow && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="p-8 md:p-12 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-[2.5rem] border border-neutral-800 relative overflow-hidden group">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />

            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                {t("cta.title")}
              </h3>
              <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={{
                    pathname: "/contact",
                    query: { intent: "general", cta: "footer_cta" },
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  {t("cta.button_primary")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-2xl font-bold border border-neutral-800 hover:border-neutral-700 transition-all">
                  {t("cta.button_secondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 2. MAIN FOOTER GRID */}
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
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* EMPRESA */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
                {t("sections.company")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.work")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {tNav("careers")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* SERVICIOS */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
                {t("sections.services")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/services/professional-websites"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.websites")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/ecommerce"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.ecommerce")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/custom-systems"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.systems")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/services#visual-identity" as any}
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.branding")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/optimization"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.seo")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* RECURSOS */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
                {t("sections.resources")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guarantee"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.guarantee")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/technology-explained"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.technology")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/contact" as any,
                      query: { tipo: "consulta" },
                    }}
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("links.consultation")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/#roi-calculator" as any}
                    className="text-sm text-neutral-300 hover:text-white transition-colors font-bold text-emerald-500/80 hover:text-emerald-400 underline decoration-emerald-500/20 underline-offset-4">
                    {t("links.roi_calculator")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
                {t("sections.legal")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("terms_of_service")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("privacy_policy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-sm text-neutral-300 hover:text-white transition-colors">
                    {t("cookie_policy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM BAR (SOCIAL + COPYRIGHT + STATUS) */}
        <div className="py-12 border-t border-neutral-900">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            {/* Left: Metadata & Status */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-xs text-neutral-300 font-medium">
                <span>{t("copyright", { year: year.toString() })}</span>
                <span className="hidden sm:inline text-neutral-800">•</span>
                <span>{t("location")}</span>
              </div>

              <div className="flex items-center gap-6">
                {/* Professional Status Badge */}
                <div className="flex items-center gap-4 py-2 px-4 bg-neutral-900/50 rounded-full border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                      {t("status.label")}
                    </span>
                  </div>
                  <div className="w-px h-3 bg-neutral-800" />
                  <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold">
                    {t("status.uptime")}
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Casual Tagline (Visible on Desktop) */}
            <div className="hidden xl:block">
              <p className="text-xs text-neutral-400 font-medium tracking-tight">
                {t("made_with")}
              </p>
            </div>

            {/* Right: Social Media Row */}
            <div className="flex items-center gap-3">
              {[
                {
                  icon: Instagram,
                  href: "https://instagram.com/noctra_studio",
                  label: t("social.instagram"),
                },
                {
                  icon: FaXTwitter,
                  href: "https://x.com/NoctraStudio",
                  label: t("social.twitter"),
                },
              ].map((social, i) => (
                <Link
                  key={social.href}
                  href={social.href as any}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300">
                  <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Only Casual Tagline */}
          <div className="mt-12 xl:hidden text-center">
            <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
              {t("made_with")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
