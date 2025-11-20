"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background pt-32 pb-16 text-center">
      <BackgroundBeamsWithCollision className="absolute inset-0 h-full w-full">
        {/* Empty children for the beams component itself, content sits on top or inside if designed that way. 
            The user's demo puts content INSIDE. Let's put our content inside. */}
        <div className="relative z-20 flex flex-col items-center justify-center px-6 md:px-8 w-full h-full pointer-events-none">
          {/* We need pointer-events-auto for buttons */}
        </div>
      </BackgroundBeamsWithCollision>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl space-y-8 w-full z-30 relative pointer-events-auto">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] text-balance">
          {t("title")}
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl font-medium">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="rounded-full h-12 px-8 text-base">
            <Link href="/contact">{t("cta_start")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 text-base">
            <Link href="/services">{t("cta_services")}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
