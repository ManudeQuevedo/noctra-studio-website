"use client";

import * as React from "react";
import {
  LazyMotion,
  m,
  domAnimation,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  Variants,
} from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowLeft } from "lucide-react";

export function ForgeNavbar() {
  const pathname = usePathname();
  const t = useTranslations("forge.navbar");

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const headerRef = React.useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key & click outside
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile) return;
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
  }, [isOpen, isMobile]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { label: t("demo"), href: "#demo" },
    { label: t("pricing"), href: "#pricing" },
  ];

  // --- DESKTOP VARIANTS (Matching Header.tsx Reactive Pattern) ---
  const desktopVariants: Variants = {
    closed: {
      height: "80px",
      borderRadius: "2rem",
      backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.6)" : "rgba(5, 5, 5, 0)",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      border: isScrolled
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid transparent",
      opacity: 1,
      y: 0,
    },
    open: {
      height: "650px", // Exact match with main Header.tsx
      borderRadius: "2rem",
      backgroundColor: "rgba(5, 5, 5, 0.9)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      opacity: 1,
      y: 0,
    },
  };

  // --- MOBILE VARIANTS ---
  const mobileOverlayVariants: Variants = {
    closed: { y: "-100%" },
    open: {
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  // Hydration safety
  if (!mounted) return null;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="fixed top-0 left-0 w-full h-24 z-[90] pointer-events-none md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md border-b border-white/5" />
      </m.div>

      {/* --- MOBILE CONTROLS (Fixed Layer / Z-[60]) --- */}
      <div className="fixed top-6 left-6 z-[100] h-12 flex items-center md:hidden mix-blend-difference">
        <Link href="/forge" className="block" aria-label="Noctra Forge">
          <div className="flex items-center gap-2">
            <BrandLogo className="w-[100px] h-auto text-white" />
            <span className="text-white font-mono text-xs mt-0.5 border-l border-white/20 pl-2 opacity-80">
              FORGE
            </span>
          </div>
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-[100] h-12 flex items-center md:hidden mix-blend-difference">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full backdrop-blur-md border border-white/10 transition-transform active:scale-95">
          <div
            className={cn(
              "w-6 h-[14px] flex flex-col justify-between transition-all duration-300",
              isOpen && "h-6 relative",
            )}>
            <span
              className={cn(
                "w-full h-[2px] bg-white rounded-full transition-all duration-300 transform origin-center",
                isOpen && "absolute top-1/2 left-0 -translate-y-1/2 rotate-45",
              )}
            />
            <span
              className={cn(
                "w-full h-[2px] bg-white rounded-full transition-all duration-300 transform origin-center",
                isOpen && "absolute top-1/2 left-0 -translate-y-1/2 -rotate-45",
              )}
            />
            <span
              className={cn(
                "w-full h-[2px] bg-white rounded-full transition-all duration-300",
                isOpen && "opacity-0",
              )}
            />
          </div>
        </button>
      </div>

      {/* --- DESKTOP HEADER (MD+) --- */}
      <header
        data-fixed-header
        className="fixed z-[100] top-0 left-0 right-0 w-full pointer-events-none hidden md:block">
        <m.div
          ref={headerRef}
          initial={{ y: -20, opacity: 0 }}
          animate={isOpen ? "open" : "closed"}
          variants={desktopVariants}
          className={cn(
            "relative z-50 overflow-hidden shadow-2xl pointer-events-auto mx-auto mt-6 w-full max-w-[1280px] transition-all duration-500",
            isOpen || isScrolled
              ? "bg-[#050505]/95 backdrop-blur-2xl border border-white/10"
              : "bg-transparent border border-transparent",
          )}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1.2,
          }}>
          <div className="flex flex-col w-full h-full relative">
            <div className="flex items-center justify-between px-8 h-[80px] shrink-0 z-50 relative">
              {/* Left: Back to Home + Forge Branding */}
              <div className="flex items-center gap-5">
                <m.div whileHover={{ x: -2 }} transition={{ duration: 0.15 }}>
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                    aria-label={t("back_to_home")}>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {t("back_to_home")}
                    </span>
                  </Link>
                </m.div>

                <span className="text-white/10 text-lg font-thin select-none">
                  /
                </span>

                <Link
                  href="/forge"
                  className="relative z-50 hover:opacity-80 transition-opacity flex items-center gap-3">
                  <BrandLogo
                    className="h-8 w-auto text-foreground"
                    showText={true}
                  />
                  <span className="text-white/40 font-mono text-xs mt-1 border-l border-white/10 pl-3">
                    FORGE
                  </span>
                </Link>
              </div>

              {/* Right: Nav Links + CTA + Menu */}
              <div className="flex items-center gap-10">
                <div className="hidden lg:flex items-center gap-10">
                  {navItems.map((item) => {
                    const isAnchor = item.href.startsWith("#");
                    const linkClassName = cn(
                      "text-xs font-bold uppercase tracking-widest transition-all duration-300",
                      "text-neutral-400 hover:text-white",
                    );
                    if (isAnchor) {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className={linkClassName}>
                          {item.label}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href as any}
                        className={linkClassName}>
                        {item.label}
                      </Link>
                    );
                  })}

                  <Link
                    href="/forge/login"
                    className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-all duration-300">
                    {t("sign_in")}
                  </Link>
                </div>

                <m.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}>
                  <Link
                    href="/forge/login"
                    className="flex items-center justify-center px-8 py-2.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    {t("start_free")}
                  </Link>
                </m.div>

                {/* Desktop Menu Toggle (Matching Header.tsx) */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-emerald-500 transition-colors">
                    {isOpen ? "CLOSE" : "MENU"}
                  </span>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      isOpen ? "bg-white/10" : "bg-white/5 active:scale-95",
                    )}>
                    <div
                      className={cn(
                        "flex flex-col gap-[5px] transition-all",
                        isOpen && "gap-0",
                      )}>
                      <span
                        className={cn(
                          "w-5 h-[1.5px] bg-white transition-all",
                          isOpen && "rotate-45 translate-y-[0.75px]",
                        )}
                      />
                      <span
                        className={cn(
                          "w-5 h-[1.5px] bg-white transition-all",
                          isOpen && "-rotate-45 -translate-y-[0.75px]",
                        )}
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </m.div>
      </header>

      {/* --- MOBILE CONTENT OVERLAY (Z-[50]) --- */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <m.div
            initial="closed"
            animate="open"
            exit="exit"
            variants={mobileOverlayVariants}
            className="fixed inset-0 z-[50] bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 flex flex-col pointer-events-auto overflow-hidden touch-none"
            style={{ overscrollBehavior: "none" }}>
            <div className="flex-1 flex flex-col justify-between w-full px-6 pb-24 pt-24">
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col items-center justify-center gap-8">
                {/* Back to Home - Prominent */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full text-center">
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-3 text-2xl font-bold tracking-tight text-neutral-400 hover:text-white transition-colors duration-300"
                    onClick={() => setIsOpen(false)}>
                    <ArrowLeft className="w-5 h-5" />
                    {t("back_to_home")}
                  </Link>
                </m.div>

                {/* Separator */}
                <div className="w-16 border-t border-neutral-800/50" />

                {/* CRM Nav Items */}
                {navItems.map((item, index) => {
                  const isAnchor = item.href.startsWith("#");

                  return (
                    <m.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                      className="w-full text-center">
                      {isAnchor ? (
                        <a
                          href={item.href}
                          className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-neutral-300 hover:text-white transition-colors duration-300"
                          onClick={() => setIsOpen(false)}>
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href as any}
                          className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-neutral-300 hover:text-white transition-colors duration-300"
                          onClick={() => setIsOpen(false)}>
                          {item.label}
                        </Link>
                      )}
                    </m.div>
                  );
                })}

                {/* Sign In link */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="w-full text-center">
                  <Link
                    href="/forge/login"
                    className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-neutral-300 hover:text-white transition-colors duration-300"
                    onClick={() => setIsOpen(false)}>
                    {t("sign_in")}
                  </Link>
                </m.div>
              </div>

              {/* CTA Button - Pinned Bottom */}
              <div className="w-full pt-8 border-t border-neutral-800/50 flex justify-center">
                <Link
                  href="/forge/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-black font-bold text-center rounded-full px-8 py-4 w-full text-base hover:bg-neutral-200 transition-colors">
                  {t("start_free")}
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
