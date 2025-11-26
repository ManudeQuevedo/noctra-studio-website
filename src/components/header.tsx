"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";
import { Instagram } from "lucide-react";
import NextImage from "next/image";
import { usePathname as useNextPathname } from "next/navigation";

// Custom X Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Header() {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const nextPathname = useNextPathname();
  const headerRef = React.useRef<HTMLDivElement>(null);

  const isContactPage = nextPathname?.includes("/contact");
  const isAdminPage = nextPathname?.includes("/admin");
  const isStudioPage = nextPathname?.includes("/studio");
  const isDashboardPage = nextPathname?.includes("/dashboard");

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (isAdminPage || isStudioPage || isDashboardPage) return null;

  // Determine effective theme for logo selection
  // If isOpen is true, colors are inverted (Light System -> Dark Header Bg -> Need Dark Theme Logo)
  const effectiveTheme = isOpen
    ? resolvedTheme === "dark"
      ? "light"
      : "dark"
    : resolvedTheme;

  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ... (rest of effects)

  // Handle Escape key and Click Outside
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("services"), href: "/services" },
    { label: t("case_studies"), href: "/case-studies" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  const infraTags = [
    t("tags.cloud"),
    t("tags.ai"),
    t("tags.devops"),
    t("tags.headless"),
  ];

  return (
    <header className="fixed top-6 left-0 z-50 w-full flex justify-center pointer-events-none px-6 md:px-0">
      <motion.div
        ref={headerRef}
        layout
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "relative overflow-hidden pointer-events-auto transition-all duration-500 w-full max-w-7xl",
          isOpen
            ? "bg-neutral-950 dark:bg-black shadow-2xl border border-neutral-800" // Open: Dark Command Center
            : isScrolled
            ? "bg-white/80 dark:bg-neutral-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border border-neutral-200/50 dark:border-white/10 shadow-lg" // Closed & Scrolled
            : "bg-transparent border-transparent shadow-none backdrop-blur-none" // Closed & Top
        )}
        variants={{
          open: {
            height: "600px",
            borderRadius: "1rem", // Sharper corners for "engineered" look
          },
          closed: {
            height: "80px",
            borderRadius: "2rem",
          },
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 1,
        }}>
        <div className="flex flex-col w-full h-full">
          {/* Header Row: Logo & Toggle */}
          <div
            className={cn(
              "flex items-center justify-between px-8 shrink-0 z-50 transition-all duration-500",
              "h-[80px]"
            )}>
            <Link
              href="/"
              className="relative z-50 transition-opacity duration-300 hover:opacity-80">
              {mounted ? (
                <>
                  {/* Desktop Logo */}
                  <NextImage
                    src={
                      isOpen || effectiveTheme === "dark"
                        ? "/noctra-navbar-dark.svg"
                        : "/noctra-navbar-light.svg"
                    }
                    alt="Noctra Studio"
                    width={120}
                    height={32}
                    className="hidden md:block h-8 w-auto object-contain"
                    priority
                  />
                  {/* Mobile Logo */}
                  <NextImage
                    src={
                      isOpen || effectiveTheme === "dark"
                        ? "/noctra-studio-icon-dark-theme.svg"
                        : "/noctra-studio-icon-light-theme.svg"
                    }
                    alt="Noctra Studio"
                    width={32}
                    height={32}
                    className="block md:hidden h-8 w-auto object-contain"
                    priority
                  />
                </>
              ) : (
                <span className="text-xl font-bold tracking-tight">NOCTRA</span>
              )}
            </Link>

            <div className="flex items-center gap-4">
              {/* Start Project CTA - Desktop Only - Hidden on Contact Page */}
              {!isContactPage && (
                <Link
                  href="/contact"
                  className={cn(
                    "hidden md:block rounded-full px-5 py-2 text-xs font-medium transition-transform hover:scale-105",
                    isOpen
                      ? "bg-white text-black"
                      : "bg-neutral-900 text-white dark:bg-white dark:text-black"
                  )}>
                  {t("start_project")}
                </Link>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 group cursor-pointer">
                <span
                  className={cn(
                    "text-xs font-mono uppercase tracking-wider hidden sm:block transition-colors duration-300",
                    isOpen ? "text-neutral-400" : "text-foreground"
                  )}>
                  {isOpen ? t("menu_close") : t("menu_open")}
                </span>
                <div
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
                    isOpen
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
                  )}>
                  <div
                    className={cn(
                      "w-full h-full flex flex-col items-center justify-center gap-[5px] transition-all duration-300",
                      isOpen && "gap-0"
                    )}>
                    <span
                      className={cn(
                        "w-5 h-[1.5px] transition-all duration-300",
                        isOpen
                          ? "bg-white rotate-45 translate-y-[0.5px]"
                          : "bg-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "w-5 h-[1.5px] transition-all duration-300",
                        isOpen
                          ? "bg-white -rotate-45 -translate-y-[0.5px]"
                          : "bg-foreground"
                      )}
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col md:flex-row px-8 pb-8 h-full gap-12 pt-8">
                {/* Left Column: Navigation Links */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex flex-col items-start gap-6">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}>
                          <Link
                            href={item.href}
                            className="group flex items-center gap-4 text-4xl md:text-6xl font-bold transition-colors duration-300 whitespace-nowrap text-neutral-500 hover:text-white">
                            <span className="text-xs font-mono text-neutral-700 pt-2">
                              0{index + 1}
                            </span>

                            <motion.span
                              className={cn(
                                "transition-transform duration-300 flex items-center gap-3",
                                isActive ? "text-white" : ""
                              )}
                              whileHover={{ x: 10 }}>
                              {isActive && (
                                <span className="text-emerald-500 text-2xl md:text-4xl">
                                  {">_"}
                                </span>
                              )}
                              {item.label}
                            </motion.span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Infrastructure Tags & Info */}
                <div className="hidden md:flex flex-col justify-between w-64 border-l border-neutral-800 pl-12 py-4">
                  {/* Infrastructure Tags */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      System Capabilities
                    </h4>
                    <ul className="space-y-3">
                      {infraTags.map((tag, i) => (
                        <motion.li
                          key={tag}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="text-sm font-mono text-neutral-400 flex items-center gap-2">
                          <div className="w-1 h-1 bg-emerald-500/50 rounded-full" />
                          {tag}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Info */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-mono text-neutral-300">
                          All Systems Operational
                        </span>
                      </div>
                      <div className="text-xs font-mono text-neutral-500">
                        Querétaro, MX
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <a
                          href="https://instagram.com/noctra_studio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 hover:text-white transition-colors">
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a
                          href="https://x.com/NoctraStudio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 hover:text-white transition-colors">
                          <XIcon className="w-4 h-4" />
                        </a>
                      </div>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>

                {/* Mobile Footer (Visible only on mobile) */}
                <div className="md:hidden mt-auto pt-8 border-t border-neutral-800 w-full flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-mono text-neutral-400">
                      Online
                    </span>
                  </div>
                  <LanguageSwitcher />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
