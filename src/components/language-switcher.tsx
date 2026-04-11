"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

export function LanguageSwitcher({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "compact";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: "en" | "es") => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.push(pathname, { locale: newLocale, scroll: false });
    });
  };

  return (
    <div
      className={cn(
        "flex items-center",
        variant === "compact"
          ? "gap-1 rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-1 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-md"
          : "gap-1",
        className,
      )}>
      <button
        onClick={() => handleLocaleChange("en")}
        disabled={isPending}
        className={cn(
          "font-mono font-medium transition-colors",
          variant === "compact"
            ? "min-w-[2.5rem] rounded-full px-2 py-1 text-[11px] tracking-[0.18em]"
            : "text-sm",
          locale === "en"
            ? "bg-white text-black"
            : "text-neutral-300 hover:text-white",
          isPending && "cursor-not-allowed opacity-50",
        )}>
        EN
      </button>
      {variant === "compact" ? null : <span className="text-neutral-400">/</span>}
      <button
        onClick={() => handleLocaleChange("es")}
        disabled={isPending}
        className={cn(
          "font-mono font-medium transition-colors",
          variant === "compact"
            ? "min-w-[2.5rem] rounded-full px-2 py-1 text-[11px] tracking-[0.18em]"
            : "text-sm",
          locale === "es"
            ? "bg-white text-black"
            : "text-neutral-300 hover:text-white",
          isPending && "cursor-not-allowed opacity-50",
        )}>
        ES
      </button>
    </div>
  );
}
