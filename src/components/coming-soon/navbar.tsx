"use client";

import Image from "next/image";
import { LanguageSwitcher } from "@/components/coming-soon/language-switcher";

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex justify-center w-full pointer-events-none">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-6 md:py-10 flex justify-between items-center pointer-events-auto">
        <Image
          src="/noctra-navbar-dark.svg"
          alt="Noctra Studio"
          width={120}
          height={24}
          className="h-6 w-auto"
        />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
