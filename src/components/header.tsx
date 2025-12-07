"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";
import { Instagram } from "lucide-react";
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
  const isCareersPage = nextPathname?.includes("/careers");
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

  // New Logic: Hide Strategy Button on Contact or Careers
  const showStrategyButton = !isContactPage && !isCareersPage;

  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key, Click Outside
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Mobile menu is full screen, so "outside" logic doesn't apply.
      // Also, headerRef points to Desktop Header, causing false positives on mobile.
      if (isMobile) return;

      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Scroll Lock REMOVED by user request to keep scrollbar visible.
    // The "Noctra Style" scrollbar now overlays or persists without shifting layout.
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
    { label: t("index"), href: "/" },
    { label: t("capabilities"), href: "/services" },
    { label: t("deployments"), href: "/work" },
    { label: t("studio"), href: "/about" },
    { label: t("initiate"), href: "/contact" },
  ];

  if (isAdminPage || isStudioPage || isDashboardPage) return null;
  if (shouldHide) return null;

  // --- DESKTOP VARIANTS (Full Width - Footer Match) ---
  const desktopVariants = {
    closed: {
      height: "80px",
      borderRadius: "2rem",
      backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.6)" : "rgba(5, 5, 5, 0)",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      border: isScrolled
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid transparent",
      opacity: 1,
    },
    open: {
      height: "650px", // Expanded height
      borderRadius: "2rem",
      backgroundColor: "rgba(5, 5, 5, 0.9)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      opacity: 1,
    },
  };

  const navContentVariants = {
    hidden: { opacity: 0, transition: { duration: 0.1 } },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.3 } },
  };

  // --- MOBILE VARIANTS (Split Mode Overlay) ---
  const mobileOverlayVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        type: "tween",
      } as const,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        type: "tween",
      } as const,
    },
  };

  // Intro Visibility Control
  const showNavbar = isIntroComplete;

  return (
    <>
      {/* --- DESKTOP HEADER (MD+) --- */}
      <motion.header
        className="fixed z-[50] top-0 left-0 right-0 w-full pointer-events-none hidden md:block"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: showNavbar ? 0 : -20,
          opacity: showNavbar ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        {/* 
            MAIN CONTAINER 
            - CSS controls Width & Position (max-w-[1280px], centered).
            - Framer controls Height & Background.
        */}
        <motion.div
          ref={headerRef}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={desktopVariants}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1.2,
          }}
          className="relative z-50 overflow-hidden shadow-2xl pointer-events-auto mx-auto mt-6 w-full max-w-[1280px]">
          <div className="flex flex-col w-full h-full relative">
            {/* Desktop Header Row (Logo + CTA + Menu) */}
            <div className="flex items-center justify-between px-8 h-[80px] shrink-0 z-50 relative">
              {/* Left: Logo */}
              <Link
                href="/"
                className="relative z-50 hover:opacity-80 transition-opacity">
                <BrandLogo
                  className="h-8 w-auto text-foreground"
                  showText={true}
                />
              </Link>

              {/* Right: CTA + Menu */}
              <div className="flex items-center gap-6 z-50">
                {showStrategyButton && (
                  <Link
                    href="/contact"
                    className="hidden md:flex items-center justify-center px-6 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors">
                    {t("book_strategy_call")}
                  </Link>
                )}

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-4 group cursor-pointer">
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase tracking-widest transition-colors duration-300",
                      isOpen ? "text-neutral-500" : "text-white"
                    )}>
                    {isOpen ? "CLOSE" : "MENU"}
                  </span>
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
                      isOpen ? "bg-white/10" : "bg-black/5 dark:bg-white/10"
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
                            : "bg-white"
                        )}
                      />
                      <span
                        className={cn(
                          "w-5 h-[1.5px] transition-all duration-300",
                          isOpen
                            ? "bg-white -rotate-45 -translate-y-[0.5px]"
                            : "bg-white"
                        )}
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Expanded Desktop Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={navContentVariants}
                  className="flex flex-row h-full w-full pt-4 px-12 pb-25 gap-12 absolute inset-0 top-[80px]">
                  {/* Nav Links */}
                  <div className="flex-1 flex flex-col justify-center items-start gap-4 pl-12">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.1,
                            duration: 0.5,
                          }}>
                          <Link
                            href={item.href as any}
                            className={cn(
                              "group flex items-baseline gap-6 transition-all duration-500",
                              isActive
                                ? "opacity-100"
                                : "opacity-40 hover:opacity-100"
                            )}
                            onClick={() => setIsOpen(false)}>
                            <span className="text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                              0{index + 1}
                            </span>

                            <div className="flex items-center gap-4">
                              {isActive && (
                                <span className="text-emerald-500 text-4xl lg:text-5xl font-bold tracking-tight">
                                  {">_"}
                                </span>
                              )}
                              <span
                                className={cn(
                                  "text-6xl lg:text-7xl font-bold tracking-tighter text-white"
                                )}>
                                {item.label}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Desktop Sidebar */}
                  <div className="w-[300px] border-l border-neutral-800/50 pl-16 py-4 flex flex-col justify-between h-full bg-gradient-to-b from-transparent to-black/20">
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h4 className="text-xs font-mono uppercase text-neutral-500 tracking-[0.2em]">
                          {t("system_capabilities")}
                        </h4>
                        <ul className="space-y-4">
                          {[
                            t("tags.cloud"),
                            t("tags.ai"),
                            t("tags.devops"),
                            t("tags.headless"),
                          ].map((tag, i) => (
                            <motion.li
                              key={tag}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="text-sm font-mono text-neutral-400 flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                              {tag}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-8">
                      {/* Status */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-xs font-mono text-neutral-400">
                            {t("all_systems_operational")}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-neutral-600 pl-4">
                          {t("location", { defaultValue: "Querétaro, MX" })}
                        </p>
                      </div>

                      {/* Socials & Lang */}
                      <div className="flex items-center justify-between pt-8 border-t border-neutral-800/50">
                        <div className="flex gap-4">
                          <a
                            href="https://instagram.com/noctra_studio"
                            target="_blank"
                            className="text-neutral-600 hover:text-white transition-colors">
                            <Instagram className="w-5 h-5" />
                          </a>
                          <a
                            href="https://x.com/NoctraStudio"
                            target="_blank"
                            className="text-neutral-600 hover:text-white transition-colors">
                            <XIcon className="w-5 h-5" />
                          </a>
                        </div>
                        <LanguageSwitcher />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.header>

      {/* --- MOBILE HEADER (MD Hidden) --- */}
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: showNavbar ? 1 : 0 }}
        transition={{ duration: 0.8 }}>
        {/* Mobile Top Bar */}
        <div
          className={cn(
            "fixed top-0 left-0 w-full h-[80px] px-6 flex items-center justify-between z-[10001] transition-all duration-300 pointer-events-auto",
            isScrolled && !isOpen
              ? "bg-black/60 backdrop-blur-md border-b border-neutral-800/50"
              : "bg-transparent"
          )}>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <BrandLogo className="h-6 w-auto text-foreground" showText={true} />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-full backdrop-blur-sm border border-white/5 z-[10002]">
            {/* Mobile Hamburger */}
            <div
              className={cn(
                "w-5 h-[14px] flex flex-col justify-between transition-all duration-300",
                isOpen && "h-5 relative"
              )}>
              <span
                className={cn(
                  "w-full h-[2px] bg-white rounded-full transition-all duration-300 transform origin-center",
                  isOpen && "absolute top-1/2 left-0 -translate-y-1/2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "w-full h-[2px] bg-white rounded-full transition-all duration-300 transform origin-center",
                  isOpen &&
                    "absolute top-1/2 left-0 -translate-y-1/2 -rotate-45"
                )}
              />
              <span
                className={cn(
                  "w-full h-[2px] bg-white rounded-full transition-all duration-300",
                  isOpen && "opacity-0"
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="exit"
              variants={mobileOverlayVariants}
              className="fixed inset-4 z-[10000] bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] flex flex-col pointer-events-auto overflow-hidden touch-none"
              style={{ overscrollBehavior: "none" }}>
              <div className="flex-1 flex flex-col items-center justify-center w-full px-6 gap-8">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="w-full text-center">
                      <Link
                        href={item.href as any}
                        className={cn(
                          "flex items-center justify-center gap-3 text-4xl font-bold tracking-tight transition-colors duration-300",
                          isActive
                            ? "text-white"
                            : "text-neutral-500 hover:text-white"
                        )}
                        onClick={() => setIsOpen(false)}>
                        {isActive && (
                          <span className="text-emerald-500 text-2xl font-bold tracking-tight">
                            {">_"}
                          </span>
                        )}
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="w-full px-8 pb-12 flex justify-between items-center border-t border-neutral-800 pt-6">
                <span className="text-xs font-mono text-neutral-500">
                  {t("all_systems_operational")}
                </span>
                <LanguageSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
