"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- Icons ---

const IconX = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    className={cn("w-6 h-6", className)}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconInstagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6", className)}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- Components ---

const FooterLink = ({
  href,
  children,
  disabled = false,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <a
    href={href}
    className={cn(
      "block text-zinc-500 hover:text-white transition-colors duration-200 text-sm",
      disabled && "pointer-events-none opacity-50"
    )}>
    {children}
  </a>
);

export function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative w-full bg-black text-white border-t border-white/5 z-40">
      {/* Bottom Status Bar */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          {/* Copyright with Logo */}
          <div className="flex items-center gap-2 order-2 md:order-1 text-sm">
            <span>© 2025</span>
            <img
              src="/noctra-navbar-dark.svg"
              alt="Noctra Studio"
              className="h-4 w-auto opacity-80"
            />
            <span>All rights reserved.</span>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="tracking-wider">ALL SYSTEMS OPERATIONAL</span>
          </div>

          {/* Connect Icons */}
          <div className="flex items-center gap-4 order-3">
            <span className="uppercase tracking-wider">CONNECT:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/noctra_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Instagram">
                <IconInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/noctrastudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="X (Twitter)">
                <IconX className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full text-center border-t border-white/5 pt-6">
          <p className="text-[10px] md:text-xs font-mono text-zinc-600 tracking-widest uppercase">
            DESIGNED & ENGINEERED IN QUERÉTARO, MX. OPERATIONAL WORLDWIDE.
          </p>
        </div>
      </div>
    </footer>
  );
}
