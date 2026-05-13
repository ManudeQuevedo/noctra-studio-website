"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  homeSectionContainerClass,
  homeSectionKickerClass,
} from "@/components/home/homeSectionFrame";

const industries = [
  {
    name: { es: "Doctores", en: "Doctors" },
    painPoint: {
      es: "Tus pacientes te buscan en Google antes de llamar. Si no apareces en los primeros resultados, llaman a otro médico — aunque seas mejor.",
      en: "Your patients search Google before calling. If you're not in the top results, they call another doctor — even if you're better.",
    },
    solution: {
      es: "Noctra construye tu presencia digital completa: sitio médico optimizado, perfil de Google Business activo y visibilidad real en búsquedas locales y en IA.",
      en: "Noctra builds your complete digital presence: optimized medical website, active Google Business profile, and real visibility in local search and AI.",
    },
    benefits: {
      es: [
        "Más consultas desde Google",
        "Pacientes pre-calificados antes de la llamada",
      ],
      en: [
        "More appointments from Google",
        "Pre-qualified patients before the call",
      ],
    },
  },
  {
    name: { es: "Despachos legales", en: "Law firms" },
    painPoint: {
      es: "Tu reputación es tu negocio, pero en línea eres invisible. Los clientes buscan abogados en Google y encuentran a tu competencia primero.",
      en: "Your reputation is your business, but online you're invisible. Clients search for lawyers on Google and find your competition first.",
    },
    solution: {
      es: "Creamos tu identidad legal digital: sitio que transmite autoridad, posicionamiento por especialidad y área geográfica, y contenido que demuestra tu experiencia.",
      en: "We create your legal digital identity: a website that conveys authority, positioning by specialty and geography, and content that demonstrates your expertise.",
    },
    benefits: {
      es: [
        "Visibilidad por especialidad legal",
        "Autoridad percibida antes del primer contacto",
      ],
      en: [
        "Visibility by legal specialty",
        "Perceived authority before first contact",
      ],
    },
  },
  {
    name: { es: "Escuelas privadas", en: "Private schools" },
    painPoint: {
      es: "Los padres investigan en línea antes de agendar visitas. Si tu propuesta educativa no es clara en 10 segundos, pierdes la inscripción antes de conocerlos.",
      en: "Parents research online before scheduling visits. If your educational value isn't clear in 10 seconds, you lose the enrollment before meeting them.",
    },
    solution: {
      es: "Diseñamos tu presencia institucional: sitio que comunica valores, metodología y diferenciadores, optimizado para búsquedas de padres en tu ciudad.",
      en: "We design your institutional presence: a website that communicates values, methodology, and differentiators, optimized for parent searches in your city.",
    },
    benefits: {
      es: [
        "Más solicitudes de información calificadas",
        "Reducción de tiempo en ciclo de inscripción",
      ],
      en: ["More qualified information requests", "Shorter enrollment cycle"],
    },
  },
  {
    name: { es: "Inmobiliarias", en: "Real estate" },
    painPoint: {
      es: "El comprador promedio visita 10 propiedades en línea antes de llamar. Sin presencia digital estructurada, tus propiedades desaparecen antes de la primera visita presencial.",
      en: "The average buyer views 10 properties online before calling. Without structured digital presence, your properties disappear before the first in-person visit.",
    },
    solution: {
      es: "Construimos tu sistema de captación inmobiliaria: sitio con catálogo optimizado, SEO local por zona y automatización para dar seguimiento a leads sin esfuerzo manual.",
      en: "We build your real estate capture system: optimized property catalog, local SEO by zone, and automation to follow up on leads without manual effort.",
    },
    benefits: {
      es: [
        "Leads calificados con intención de compra",
        "Seguimiento automático sin esfuerzo manual",
      ],
      en: [
        "Qualified leads with purchase intent",
        "Automatic follow-up without manual effort",
      ],
    },
  },
  {
    name: { es: "PYMEs", en: "SMBs" },
    painPoint: {
      es: "Tu negocio depende de referidos y contactos conocidos. Cuando el flujo de referidos se detiene, no hay sistema que lo reemplace. Eso no escala.",
      en: "Your business depends on referrals and known contacts. When the referral flow stops, there's no system to replace it. That doesn't scale.",
    },
    solution: {
      es: "Creamos tu motor de adquisición digital: marca clara, sitio que convierte visitas en contactos, y visibilidad continua en Google e IA para atraer clientes nuevos cada mes.",
      en: "We create your digital acquisition engine: clear brand, website that converts visits to contacts, and continuous visibility on Google and AI to attract new clients every month.",
    },
    benefits: {
      es: [
        "Clientes nuevos fuera de la red de referidos",
        "Presencia medible desde el mes 1",
      ],
      en: [
        "New clients outside the referral network",
        "Measurable presence from month 1",
      ],
    },
  },
  {
    name: { es: "Startups", en: "Startups" },
    painPoint: {
      es: "Tienes un producto o servicio valioso, pero cada vez que explicas qué haces necesitas 10 minutos. Tu presencia digital debe hacer ese trabajo por ti antes de que lleguen a ti.",
      en: "You have a valuable product or service, but every time you explain what you do it takes 10 minutes. Your digital presence should do that work before they reach you.",
    },
    solution: {
      es: "Construimos tu narrativa de marca y presencia digital desde cero: posicionamiento claro, sitio que explica tu propuesta en segundos y visibilidad para los primeros tracciones.",
      en: "We build your brand narrative and digital presence from scratch: clear positioning, a site that explains your value in seconds, and visibility for early traction.",
    },
    benefits: {
      es: [
        "Propuesta entendida sin explicación verbal",
        "Credibilidad digital desde el día 1",
      ],
      en: [
        "Value proposition understood without explanation",
        "Digital credibility from day 1",
      ],
    },
  },
] as const;

type LocaleKey = "es" | "en";

/**
 * Desktop: wheel can step industries while the section fills the viewport.
 * All viewports: Framer Motion + chevron navigation (no progress dots).
 */
export function ForWhoSection() {
  const rawLocale = useLocale();
  const locale = (rawLocale === "en" ? "en" : "es") as LocaleKey;
  const tLabel = useTranslations("HomePage.solutions");

  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const wheelCooldownRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const fillsViewport =
        rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!fillsViewport) return;

      if (wheelCooldownRef.current) return;

      const a = activeRef.current;
      if (e.deltaY > 0) {
        if (a < industries.length - 1) {
          e.preventDefault();
          wheelCooldownRef.current = true;
          setActive(a + 1);
          window.setTimeout(() => {
            wheelCooldownRef.current = false;
          }, 500);
        }
        return;
      }
      if (e.deltaY < 0 && a > 0) {
        e.preventDefault();
        wheelCooldownRef.current = true;
        setActive(a - 1);
        window.setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 500);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const ctaEs = "¿Tu industria no está aquí? Hablemos";
  const ctaEn = "Your industry isn't here? Let's talk";
  const prefixEs = "Diseñado para";
  const prefixEn = "Built for";
  const prefix = locale === "es" ? prefixEs : prefixEn;

  const solutionLabelEs = "CÓMO LO RESUELVE NOCTRA";
  const solutionLabelEn = "HOW NOCTRA SOLVES IT";
  const solutionLabel = locale === "es" ? solutionLabelEs : solutionLabelEn;

  const industry = industries[active];
  const [b1, b2] = industry.benefits[locale];

  return (
    <section
      id="para-quien"
      ref={sectionRef}
      className="relative min-h-dvh scroll-mt-28 bg-[#050505] py-24 md:min-h-screen md:py-24">
      <div className={homeSectionContainerClass}>
        <div className="grid min-h-[60vh] grid-cols-1 items-start gap-12 md:grid-cols-[3fr_2fr]">
          <div className="flex min-h-[60vh] flex-col">
            <div className="flex-1">
              <p className={homeSectionKickerClass}>{tLabel("label")}</p>

              <p className="mb-4 text-base text-white/30">{prefix}</p>

              <div className="relative mb-6 pb-1">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={active}
                    initial={{ y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -48, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-5xl font-black tracking-tight text-white leading-[1.08] md:text-7xl md:leading-[1.06] lg:text-8xl lg:leading-[1.05] xl:text-9xl xl:leading-[1.04]">
                    {industry.name[locale]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <div className="relative mb-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.04,
                    }}
                    className="max-w-xl text-lg leading-relaxed text-white/50">
                    {industry.painPoint[locale]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="relative mb-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.06,
                    }}>
                    <p className="mb-2 text-xs tracking-widest text-white/20 uppercase">
                      {solutionLabel}
                    </p>
                    <p className="max-w-lg text-base leading-relaxed text-white/40">
                      {industry.solution[locale]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mb-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.08,
                    }}
                    className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/30">
                      {b1}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/30">
                      {b2}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {active === industries.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="mb-10">
                    <Link
                      href="/diagnostico"
                      className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-white">
                      {locale === "es" ? ctaEs : ctaEn}
                      <ChevronRight size={14} aria-hidden />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-auto shrink-0 border-t border-white/5 pt-8">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setActive((prev) => Math.max(0, prev - 1))}
                  disabled={active === 0}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
                    active === 0
                      ? "cursor-not-allowed border-white/10 text-white/20"
                      : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                  aria-label={locale === "es" ? "Anterior" : "Previous"}>
                  <ChevronLeft size={18} />
                </button>

                <span className="font-mono text-xs text-white/30 tabular-nums">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(industries.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setActive((prev) =>
                      Math.min(industries.length - 1, prev + 1),
                    )
                  }
                  disabled={active === industries.length - 1}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
                    active === industries.length - 1
                      ? "cursor-not-allowed border-white/10 text-white/20"
                      : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                  aria-label={locale === "es" ? "Siguiente" : "Next"}>
                  <ChevronRight size={18} />
                </button>

                <span className="ml-4 hidden min-w-0 truncate text-xs text-white/20 md:inline">
                  {industry.name[locale]}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden min-h-[60vh] flex-col items-center justify-center self-stretch md:flex">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="select-none text-[clamp(96px,14vw,200px)] font-black leading-none text-white/5 tabular-nums">
                {String(active + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
