"use client";

import { useTranslations } from "next-intl";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { AlertTriangle, Clock, Scale } from "lucide-react";

export default function TermsClient() {
  const t = useTranslations("TermsPage");

  const toc = [
    { title: "1. Aceptación", href: "#aceptacion" },
    { title: "2. Servicios", href: "#servicios" },
    { title: "3. Propiedad Intelectual", href: "#propiedad" },
    { title: "4. Obligaciones", href: "#obligaciones" },
    { title: "5. Pagos y Milestones", href: "#pagos" },
    { title: "6. Scope Creep", href: "#scope-creep" },
    { title: "7. Responsabilidad", href: "#responsabilidad" },
    { title: "8. Fuerza Mayor", href: "#fuerza-mayor" },
    { title: "9. Ley y Jurisdicción", href: "#jurisdiccion" },
    { title: "10. Contacto", href: "#contacto" },
  ];

  return (
    <LegalPageLayout
      title={t("title")}
      lastUpdated="13 de febrero de 2026"
      toc={toc}
    >
      <div className="space-y-12">
        {/* HIGHLIGHT BOX */}
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl flex gap-4 items-start not-prose">
          <Scale className="w-6 h-6 text-neutral-900 dark:text-white mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-neutral-900 dark:text-white">Resumen para Humanos</h4>
            <p className="text-sm text-neutral-400 dark:text-neutral-400 leading-relaxed">
              Estamos aquí para construir tecnología increíble para ti. Tú eres dueño de tu código una vez pagado, nosotros somos expertos en lo que hacemos, y ambos nos comprometemos a una comunicación clara y pagos a tiempo.
            </p>
          </div>
        </div>

        <section id="aceptacion">
          <h2>{t("sections.acceptance.title")}</h2>
          <p>{t("sections.acceptance.content")}</p>
        </section>

        <section id="servicios">
          <h2>{t("sections.services.title")}</h2>
          <p>{t("sections.services.content")}</p>
        </section>

        <section id="propiedad">
          <h2>{t("sections.ip.title")}</h2>
          <p>{t("sections.ip.content")}</p>
        </section>

        <section id="obligaciones">
          <h2>{t("sections.obligations.title")}</h2>
          <p>{t("sections.obligations.content")}</p>
        </section>

        <section id="pagos">
          <h2>5. Pagos y Milestones</h2>
          <p>
            Los proyectos se dividen en hitos (milestones) específicos. Cada hito requiere un depósito inicial y un pago final tras su aprobación. Los activos finales se transfieren únicamente tras la liquidación total del hito correspondiente.
          </p>
        </section>

        {/* WARNING BOX */}
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 p-6 rounded-2xl flex gap-4 items-start not-prose">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950 dark:text-amber-50">Scope Creep</h4>
            <p className="text-sm text-amber-800 dark:text-amber-200/70 leading-relaxed">
              Cualquier solicitud de funcionalidad fuera del alcance (scope) definido en la propuesta original será tratada como un requerimiento adicional y estará sujeto a una nueva cotización y cronograma.
            </p>
          </div>
        </div>

        <section id="scope-creep">
          <h2>6. Control de Cambios (Scope Creep)</h2>
          <p>
            En Noctra Studio favorecemos la agilidad, pero protegemos la integridad del proyecto. Los cambios menores están incluidos, pero transformaciones significativas en la lógica o diseño del sitio requieren una orden de cambio formal.
          </p>
        </section>

        <section id="responsabilidad">
          <h2>{t("sections.liability.title")}</h2>
          <p>{t("sections.liability.content")}</p>
        </section>

        <section id="fuerza-mayor">
          <h2>8. Fuerza Mayor</h2>
          <div className="flex gap-3 items-center text-neutral-400 mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-mono">Cláusula de Protección</span>
          </div>
          <p>
            Noctra Studio no será responsable por retrasos o incumplimientos resultantes de causas fuera de nuestro control razonable, incluyendo fallas en infraestructura de terceros (hosting, APIs), desastres naturales o cambios regulatorios.
          </p>
        </section>

        <section id="jurisdiccion">
          <h2>{t("sections.governing.title")}</h2>
          <p>{t("sections.governing.content")}</p>
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
            </a>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": t("title"),
            "description": "Términos y Condiciones de Uso de Noctra Studio.",
            "url": "https://noctra.studio/terms-and-conditions"
          })
        }}
      />
    </LegalPageLayout>
  );
}
