import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Link
        href={pathname}
        locale="en"
        className={cn(
          "text-sm font-medium transition-colors",
          locale === "en"
            ? "text-white dark:text-neutral-950"
            : "text-neutral-500 hover:text-white dark:hover:text-neutral-950"
        )}>
        EN
      </Link>
      <span className="text-neutral-600 dark:text-neutral-400">/</span>
      <Link
        href={pathname}
        locale="es"
        className={cn(
          "text-sm font-medium transition-colors",
          locale === "es"
            ? "text-white dark:text-neutral-950"
            : "text-neutral-500 hover:text-white dark:hover:text-neutral-950"
        )}>
        ES
      </Link>
    </div>
  );
}
