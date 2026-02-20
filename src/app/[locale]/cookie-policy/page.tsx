import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Política de Cookies | Noctra Studio",
  description:
    "Conoce cómo utilizamos cookies en Noctra Studio para mejorar tu experiencia de navegación.",
  robots: { index: false, follow: false },
};
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { Cookie, MousePointer2 } from "lucide-react";

export default function CookiePolicyPage() {
  const t = useTranslations("PrivacyPage"); // Using Privacy translations as proxy for now

  const toc = [
    { title: "1. ¿Qué son las Cookies?", href: "#que-son" },
    { title: "2. Tipos de Cookies", href: "#tipos" },
    { title: "3. Cómo Gestionarlas", href: "#gestion" },
    { title: "4. Terceros", href: "#terceros" },
  ];

  return (
    <LegalPageLayout 
      title="Política de Cookies" 
      lastUpdated="13 de febrero de 2026"
      toc={toc}
    >
      <div className="space-y-12">
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 p-6 rounded-2xl flex gap-4 items-start not-prose">
          <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-blue-950 dark:text-blue-50">Uso de Tecnologías</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200/70 leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico y recordar tus preferencias. No recopilamos información sensible sin tu consentimiento explícito.
            </p>
          </div>
        </div>

        <section id="que-son">
          <h2>1. ¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu computadora o dispositivo móvil cuando los visitas. Se utilizan para que el sitio funcione mejor y para proporcionar información analítica a los propietarios.
          </p>
        </section>

        <section id="tipos">
          <h2>2. Tipos de Cookies que Utilizamos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-900">
              <h4 className="font-bold mb-2">Esenciales</h4>
              <p className="text-sm text-neutral-300">Necesarias para el funcionamiento básico del sitio y seguridad.</p>
            </div>
            <div className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-900">
              <h4 className="font-bold mb-2">Analíticas</h4>
              <p className="text-sm text-neutral-300">Nos ayudan a entender cómo interactúas con el sitio de forma anónima.</p>
            </div>
          </div>
        </section>

        <section id="gestion">
          <h2>3. Cómo Gestionarlas</h2>
          <p>
            Puedes restringir, bloquear o borrar las cookies de cualquier sitio web utilizando tu navegador. Cada navegador tiene una configuración diferente:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Chrome / Edge: Configuración {">"} Privacidad y seguridad {">"} Cookies.</li>
            <li>Safari: Ajustes {">"} Privacidad {">"} Cookies.</li>
            <li>Firefox: Opciones {">"} Privacidad y Seguridad {">"} Cookies.</li>
          </ul>
        </section>

        <section id="terceros">
          <h2>4. Cookies de Terceros</h2>
          <p>
            A veces utilizamos servicios de terceros (como Analytics o Vercel) que pueden instalar sus propias cookies para fines de diagnóstico técnico o estadísticas agregadas.
          </p>
        </section>

        <div className="bg-neutral-950 dark:bg-white text-white dark:text-black p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 not-prose">
          <div className="flex gap-4 items-center">
             <MousePointer2 className="w-8 h-8" />
             <p className="font-bold text-lg">¿Quieres restablecer tus preferencias?</p>
          </div>
          <button className="px-6 py-3 border border-white/20 dark:border-black/20 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors">
            Limpiar Cookies del Sitio
          </button>
        </div>
      </div>
    </LegalPageLayout>
  );
}
