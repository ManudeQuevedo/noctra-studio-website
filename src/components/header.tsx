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
  const isCareersPage = nextPathname?.includes("/careers"); // Added logic
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
    { label: t("index"), href: "/" },
    { label: t("capabilities"), href: "/services" },
    { label: t("deployments"), href: "/work" },
    { label: t("studio"), href: "/about" },
    { label: t("initiate"), href: "/contact" },
  ];

  const infraTags = [
    t("tags.cloud"),
    t("tags.ai"),
    t("tags.devops"),
    t("tags.headless"),
  ];

  if (isAdminPage || isStudioPage || isDashboardPage) return null;
  if (shouldHide) return null;

  // --- ANTIGRAVITY PROTOCOL: Strict Separation of Concerns ---

  // 1. Desktop Variants (Floating Card)
  const desktopVariants = {
    closed: {
      width: "100%",
      maxWidth: "1280px", // max-w-7xl matches Footer
      height: "80px",
      borderRadius: "2rem",
      backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.6)" : "rgba(5, 5, 5, 0)",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      border: isScrolled
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid transparent",
      top: "1.5rem",
      right: "auto",
      left: "50%",
      x: "-50%",
      opacity: 1, // Explicitly set opacity
    },
    open: {
      width: "100%",
      maxWidth: "1280px", // Keep same max-width as closed
      height: "650px", // Approximate height from image
      borderRadius: "2rem",
      backgroundColor: "#050505",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      top: "1.5rem",
      right: "auto",
      left: "50%", // Keep centered
      x: "-50%", // Keep centered
      opacity: 1,
    },
  };

  // 2. Mobile Variants (Full Screen Overlay)
  const mobileVariants = {
    closed: {
      opacity: 0,
      y: -20,
      pointerEvents: "none" as const,
    },
    open: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto" as const,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* --- DESKTOP HEADER (MD+) --- */}
      <motion.header
        className="fixed z-[100] top-0 left-0 w-full pointer-events-none hidden md:block" // Hidden on mobile
        initial={{ y: 0, opacity: 1 }} // Remove entrance animation for now to guarantee visibility
        animate={{ y: 0, opacity: 1 }}>
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
          }} // Slower, heavier feel
          className="fixed z-50 overflow-hidden shadow-2xl pointer-events-auto">
          <div className="flex flex-col w-full h-full relative">
            {/* Desktop Header Row */}
            <div className="flex items-center justify-between px-8 h-[80px] shrink-0 z-50">
              <Link
                href="/"
                className="relative z-50 hover:opacity-80 transition-opacity">
                <BrandLogo
                  className="h-8 w-auto text-foreground"
                  showText={true}
                />
              </Link>

              <div className="flex items-center gap-6">
                {/* CTA Button - Hidden on Contact/Careers */}
                {showStrategyButton && (
                  <Link
                    href="/contact"
                    className="hidden md:flex items-center justify-center px-6 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors">
                    {t("book_strategy_call")}
                  </Link>
                )}

                {/* Close Button Group */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-4 group cursor-pointer">
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase tracking-widest transition-colors duration-300",
                      isOpen ? "text-neutral-500" : "text-foreground"
                    )}>
                    {isOpen ? "CLOSE" : "MENU"}
                  </span>
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
                      isOpen ? "bg-white/10" : "bg-black/5 dark:bg-white/10"
                    )}>
                    {/* Hamburger Icon Logic */}
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

            {/* Desktop Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-row h-full w-full pt-4 px-12 pb-12 gap-12">
                  {/* Nav Links */}
                  <div className="flex-1 flex flex-col justify-center items-start gap-4 pl-12">
                    {[
                      { label: t("index"), href: "/" },
                      { label: t("capabilities"), href: "/services" },
                      { label: t("deployments"), href: "/work" },
                      { label: t("studio"), href: "/about" },
                      { label: t("initiate"), href: "/contact" },
                    ].map((item, index) => {
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
      {/* Why separate? To guarantee 100% z-index safety and layout purity without "bleeding" styles. */}
      <motion.header
        className="fixed z-[100] top-0 left-0 w-full md:hidden pointer-events-none"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}>
        {/* Mobile Top Bar (Always Visible) */}
        <div
          className={cn(
            "fixed top-0 left-0 w-full h-[80px] px-6 flex items-center justify-between z-[10001] pointer-events-auto transition-all duration-300",
            isScrolled && !isOpen
              ? "bg-black/60 backdrop-blur-md border-b border-neutral-800/50"
              : "bg-transparent"
          )}>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <BrandLogo className="h-6 w-auto text-foreground" showText={true} />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-full backdrop-blur-sm border border-white/5">
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

        {/* Mobile Full Screen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[10000] bg-black w-screen h-[100dvh] flex flex-col pointer-events-auto"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }} // Slide down exit
              transition={{ type: "spring", damping: 25, stiffness: 200 }}>
              {/* Mobile Content Container - Strict Center */}
              <div className="flex-1 flex flex-col items-center justify-center w-full px-6 gap-8">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="w-full text-center">
                      <Link
                        href={item.href as any}
                        className={cn(
                          "text-4xl font-bold tracking-tight transition-colors duration-300",
                          isActive
                            ? "text-white"
                            : "text-neutral-500 hover:text-white"
                        )}
                        onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Footer Area */}
              <div className="w-full px-8 pb-12 flex justify-between items-center border-t border-neutral-800 pt-6">
                <span className="text-xs font-mono text-neutral-500">
                  System Online
                </span>
                <LanguageSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
