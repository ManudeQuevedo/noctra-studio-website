"use client";

import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={cn(
          "text-xs font-medium",
          language === "en" ? "text-foreground" : "text-muted-foreground"
        )}>
        EN
      </Button>
      <span className="text-muted-foreground/30">/</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("es")}
        className={cn(
          "text-xs font-medium",
          language === "es" ? "text-foreground" : "text-muted-foreground"
        )}>
        ES
      </Button>
    </div>
  );
}
