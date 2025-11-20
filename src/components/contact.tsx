"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="container py-24 max-w-2xl">
      <div className="space-y-8 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("title")}
        </h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      <form className="mt-12 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Input placeholder={t("name_placeholder")} />
          </div>
          <div className="space-y-2">
            <Input placeholder={t("email_placeholder")} type="email" />
          </div>
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder={t("message_placeholder")}
            className="min-h-[150px]"
          />
        </div>
        <Button className="w-full" size="lg">
          {t("submit_button")}
        </Button>
      </form>
    </section>
  );
}
