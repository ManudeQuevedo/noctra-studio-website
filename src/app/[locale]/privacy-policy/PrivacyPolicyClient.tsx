"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Shield, Info, ExternalLink } from "lucide-react";

export default function PrivacyPolicyClient() {
  const t = useTranslations("PrivacyPage");

  const toc = [
    { title: "1. Introducción", href: "#introduccion" },
    { title: "2. Información que Recopilamos", href: "#informacion" },
    { title: "3. Propósito del Procesamiento", href: "#proposito" },
    { title: "4. Derechos ARCO", href: "#derechos" },
    { title: "5. Cookies", href: "#cookies" },
    { title: "6. Cambios", href: "#cambios" },
    { title: "7. Contacto", href: "#contacto" },
  ];

  return (
    <LegalPageLayout
      title={t("title")}
      lastUpdated="13 de febrero de 2026"
      toc={toc}
    >
      <div className="space-y-12">
        {/* HELP BOX */}
        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 p-6 rounded-2xl flex gap-4 items-start not-prose">
          <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-50">Privacidad Simplificada</h4>
            <p className="text-sm text-emerald-800 dark:text-emerald-200/70 leading-relaxed">
              Valoramos tu privacidad tanto como la nuestra. Solo recopilamos los datos estrictamente necesarios para trabajar en tu proyecto y nunca vendemos tu información a terceros. Así de simple.
            </p>
          </div>
        </div>

        <section id="introduccion">
          <h2>{t("sections.intro.title")}</h2>
          <p>{t("sections.intro.content")}</p>
        </section>

        <section id="informacion">
          <h2>{t("sections.collection.title")}</h2>
          <p>{t("sections.collection.content")}</p>
          <ul>
            <li><strong>{t("sections.collection.list.identity")}</strong></li>
            <li><strong>{t("sections.collection.list.contact")}</strong></li>
            <li><strong>{t("sections.collection.list.project")}</strong></li>
            <li><strong>{t("sections.collection.list.technical")}</strong></li>
          </ul>
        </section>

        <section id="proposito">
          <h2>{t("sections.purpose.title")}</h2>
          <p>{t("sections.purpose.content")}</p>
          <ul>
            <li>{t("sections.purpose.list.service")}</li>
            <li>{t("sections.purpose.list.communication")}</li>
            <li>{t("sections.purpose.list.improvement")}</li>
            <li>{t("sections.purpose.list.legal")}</li>
          </ul>
        </section>

        <section id="derechos">
          <h2>{t("sections.rights.title")}</h2>
          <p>{t("sections.rights.content")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {[
              { id: "access", label: "Acceso" },
              { id: "rectification", label: "Rectificación" },
              { id: "cancellation", label: "Cancelación" },
              { id: "opposition", label: "Oposición" }
            ].map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50">
                <h4 className="font-bold text-neutral-950 dark:text-white mb-1">{item.label}</h4>
                <p className="text-xs text-neutral-500 leading-normal">{t(`sections.rights.list.${item.id}`)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            {t("sections.rights.contact_text")}{" "}
            <a href="mailto:hello@noctra.studio" className="font-bold hover:underline">hello@noctra.studio</a>.
          </p>
        </section>

        {/* WARNING BOX FOR THIRD PARTIES */}
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 p-6 rounded-2xl flex gap-4 items-start not-prose">
          <Info className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950 dark:text-amber-50">Transferencias de Datos</h4>
            <p className="text-sm text-amber-800 dark:text-amber-200/70 leading-relaxed">
              Podemos compartir datos con proveedores de servicios autorizados (como hosting o herramientas de análisis) bajo estrictos acuerdos de confidencialidad, siempre para cumplir con los fines descritos en esta política.
            </p>
          </div>
        </div>

        <section id="cookies">
          <h2>{t("sections.cookies.title")}</h2>
          <p>{t("sections.cookies.content")}</p>
          <p className="text-sm italic">
            Para más detalles, consulta nuestra <Link href="/cookie-policy" className="underline hover:text-black dark:hover:text-white">Política de Cookies</Link>.
          </p>
        </section>

        <section id="cambios">
          <h2>{t("sections.changes.title")}</h2>
          <p>{t("sections.changes.content")}</p>
        </section>

        <section id="contacto">
          <h2>{t("sections.contact.title")}</h2>
          <p>{t("sections.contact.content")}</p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <a
              href="mailto:hello@noctra.studio"
              className="inline-flex items-center gap-2 group px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-black rounded-full font-bold transition-all hover:scale-105"
            >
              hello@noctra.studio
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>

      {/* SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": t("title"),
            "description": "Política de Privacidad de Noctra Studio - Cómo protegemos tus datos.",
            "url": "https://noctra.studio/privacy-policy",
            "dateModified": "2026-02-13",
            "publisher": {
              "@type": "Organization",
              "name": "Noctra Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://noctra.studio/logo.png"
              }
            }
          })
        }}
      />
    </LegalPageLayout>
  );
}
