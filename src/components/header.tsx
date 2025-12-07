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
import { useIntro } from "@/context/IntroContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const { isIntroComplete, showIntro, initialized } = useIntro();
  const pathname = usePathname();
  const nextPathname = useNextPathname();
  const t = useTranslations("Navigation");

  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const headerRef = React.useRef<HTMLDivElement>(null);

  // Use the hook for JS-side media query
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isContactPage = nextPathname?.includes("/contact");
  const isAdminPage = nextPathname?.includes("/admin");
  const isStudioPage = nextPathname?.includes("/studio");
  const isDashboardPage = nextPathname?.includes("/dashboard");

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash of navbar on homepage before intro check
  const isHomePage =
    pathname === "/" ||
    (pathname as string) === "/en" ||
    (pathname as string) === "/es";
  const shouldHide = isHomePage && !initialized;

  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key, Click Outside, and Scroll Lock
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
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
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
    { label: t("case_studies"), href: "/work" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  const infraTags = [
    t("tags.cloud"),
    t("tags.ai"),
    t("tags.devops"),
    t("tags.headless"),
  ];

  if (isAdminPage || isStudioPage || isDashboardPage) return null;
  if (shouldHide) return null;

  // Explicit Variants
  const variants = {
    closed: {
      position: "fixed" as any,
      top: "1.5rem", // top-6
      left: "50%",
      x: "-50%",
      y: 0,
      right: "auto",
      bottom: "auto",
      width: "calc(100% - 2rem)", // px-4 equivalent
      maxWidth: "80rem", // max-w-7xl
      height: "80px",
      borderRadius: "2rem",
      backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.6)" : "transparent",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      zIndex: 50,
      border: isScrolled
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid transparent",
    },
    openDesktop: {
      position: "fixed" as any,
      top: "1.5rem", // top-6
      left: "50%",
      x: "-50%",
      y: 0,
      right: "auto",
      bottom: "auto",
      width: "calc(100% - 2rem)", // Maintain same width
      maxWidth: "80rem", // Maintain same max-width
      height: "600px", // Fixed large height for dropdown feel
      borderRadius: "2rem",
      backgroundColor: "#050505",
      zIndex: 100,
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    openMobile: {
      position: "fixed" as any,
      top: 0,
      left: 0,
      x: 0, // Reset transform
      y: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100dvh",
      maxWidth: "none",
      borderRadius: "0px",
      backgroundColor: "#050505",
      zIndex: 100,
      border: "none",
    },
  };

  return (
    // Z-Index wrapper for safety
    // Added slide-down entrance animation
    <motion.header
      className="fixed z-[100] top-0 left-0 w-full pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}>
      <motion.div
        ref={headerRef}
        initial="closed"
        animate={isOpen ? (isMobile ? "openMobile" : "openDesktop") : "closed"}
        variants={variants as any}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        // Removed local opacity control to rely on parent header entrance
        className={cn(
          "pointer-events-auto overflow-hidden shadow-2xl transition-all duration-500",
          isOpen
            ? "border border-neutral-800"
            : "border-transparent shadow-none"
        )}>
        {" "}
        <div className="flex flex-col w-full h-full relative">
          {/* Header Row: Logo & Toggle */}
          <div className="flex items-center justify-between px-8 h-[80px] shrink-0 z-50">
            {/* Logo - Hide text on desktop closed if needed, but keeping simple for now */}
            <Link
              href="/"
              className="relative z-50 transition-opacity duration-300 hover:opacity-80 flex items-center">
              <BrandLogo
                className="h-8 w-auto text-foreground"
                showText={isOpen || !isMobile || true}
              />
            </Link>

            <motion.div className="flex items-center gap-4">
              {/* CTA - visible only when open or huge screens? Keeping it simpler as per requested refactor */}
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
            </motion.div>
          </div>

          {/* Collapsible Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }} // Wait for bg to expand
                // Refactored Wrapper: Force Center, Z-Index, Relative
                className="relative z-[102] flex flex-col items-center justify-center w-full h-full overflow-y-auto">
                <div className="flex flex-col md:flex-row w-full h-full px-6 md:px-8 pb-8 pt-8 md:pt-8 gap-8 md:gap-12 overflow-y-auto items-center md:items-stretch justify-center md:justify-start">
                  {/* Left Column: Navigation Links */}
                  <div className="w-full md:flex-1 flex flex-col justify-center items-center md:items-start z-[101]">
                    {/* Content Wrapper - Enforce Center Mobile */}
                    <div className="flex flex-col items-center justify-center w-full md:w-auto md:items-start gap-6">
                      {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                          <motion.div
                            key={item.href}
                            // Simplified Child Animation for Stability
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="w-full text-center md:text-left">
                            <Link
                              href={item.href as any}
                              className="group inline-flex items-center gap-4 text-4xl md:text-6xl font-bold transition-colors duration-300 whitespace-nowrap text-neutral-500 hover:text-white justify-center md:justify-start"
                              onClick={() => setIsOpen(false)}>
                              <span className="text-xs font-mono text-neutral-700 pt-2 hidden md:block">
                                0{index + 1}
                              </span>

                              <motion.span
                                className={cn(
                                  "transition-transform duration-300 flex items-center gap-3",
                                  isActive ? "text-white" : ""
                                )}
                                whileHover={{ x: 10 }}>
                                {isActive && (
                                  <span className="text-emerald-500 text-2xl md:text-3xl">
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

                  {/* Right Column: Infrastructure Tags & Info - Hidden on mobile if needed, or displayed at bottom */}
                  <div className="hidden md:flex flex-col justify-between w-64 border-l border-neutral-800 pl-8 py-4">
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
                            transition={{ delay: 0.4 + i * 0.05 }}
                            className="text-sm font-mono text-neutral-400 flex items-center gap-2">
                            <div className="w-1 h-1 bg-emerald-500/50 rounded-full" />
                            {tag}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <a
                          href="https://instagram.com/noctra_studio"
                          target="_blank"
                          className="text-neutral-500 hover:text-white">
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a
                          href="https://x.com/NoctraStudio"
                          target="_blank"
                          className="text-neutral-500 hover:text-white">
                          <XIcon className="w-4 h-4" />
                        </a>
                      </div>
                      <LanguageSwitcher />
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="md:hidden mt-auto pt-8 border-t border-neutral-800 w-full flex justify-between items-center pb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-xs font-mono text-neutral-400">
                        Online
                      </span>
                    </div>
                    <LanguageSwitcher />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.header>
  );
}
