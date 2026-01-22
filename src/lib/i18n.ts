export type Language = 'en' | 'es';

export const translations = {
  en: {
    hero: {
      title: "Noctra Is Coming Online.",
      subtitle: "We are architecting the next generation of digital infrastructure. A studio led by senior engineers with 7+ years of production experience at scale.",
      description: "",
      badge: "EST. 2025 || LED BY SENIOR ENGINEERING TALENT"
    },
    form: {
      name_placeholder: "Enter your name...",
      placeholder: "Request Early Access Protocol",
      button: "Notify Me",
      success: "Thank you! We'll keep you posted.",
      error: "Something went wrong. Please try again.",
      sending: "Sending...",
      duplicate_signal: "Signal already received. Check your inbox.",
      microcopy: "Join the waitlist for priority architecture audits and engineering insights. No spam.",
      terminal: {
        line1: "> Establishing secure connection... [OK]",
        line2: "> Encrypting payload... [OK]",
        line3: "> Protocol Initiated.",
        authorize: "Secure Studio Identity",
        vcard_hint: "Save our contact card to ensure priority dispatches reach your inbox and bypass spam filters.",
        signal_secured: "IDENTITY SAVED",
        confirmation_dispatch: "Transmission complete. A confirmation dispatch has been sent to your inbox."
      }
    },
    footer: {
      copyright: "© 2025 Engineered by Noctra Studio",
      rights: "All rights reserved.",
      status: "ALL SYSTEMS OPERATIONAL",
      connect: "CONNECT:",
      location: "DESIGNED & ENGINEERED IN QUERÉTARO, MX. OPERATIONAL WORLDWIDE."
    },
    countdown: {
      title: "Estimated Deployment",
      days: "Days",
      hours: "Hrs",
      minutes: "Min",
      seconds: "Sec",
      deploymentWindow: "Deployment Window: Q1 2026",
      systemStatus: "System Architecture Protocols Under Finalization."
    }
  },
  es: {
    hero: {
      title: "Noctra Está Entrando en Línea.",
      subtitle: "Estamos arquitectando la próxima generación de infraestructura digital. Un estudio liderado por ingenieros senior con más de 7 años de experiencia en producción a escala.",
      description: "",
      badge: "EST. 2025 || LIDERADO POR TALENTO DE INGENIERÍA SENIOR"
    },
    form: {
      name_placeholder: "Ingresa tu nombre...",
      placeholder: "Solicitar Protocolo de Acceso Anticipado",
      button: "Notificarme",
      success: "¡Gracias! Te mantendremos informado.",
      error: "Algo salió mal. Por favor intenta de nuevo.",
      sending: "Enviando...",
      duplicate_signal: "Señal ya recibida. Revisa tu bandeja de entrada.",
      microcopy: "Únete a la lista de espera para auditorías de arquitectura prioritarias e insights de ingeniería. Sin spam.",
      terminal: {
        line1: "> Estableciendo conexión segura... [OK]",
        line2: "> Encriptando carga útil... [OK]",
        line3: "> Protocolo Iniciado.",
        authorize: "Asegurar Identidad del Estudio",
        vcard_hint: "Guarda nuestra tarjeta de contacto para asegurar que los envíos prioritarios lleguen a tu bandeja de entrada y eviten filtros de spam.",
        signal_secured: "IDENTIDAD GUARDADA",
        confirmation_dispatch: "Transmisión completada. Hemos enviado una confirmación a tu bandeja de entrada."
      }
    },
    footer: {
      copyright: "© 2025 Engineered by Noctra Studio",
      rights: "Todos los derechos reservados.",
      status: "TODOS LOS SISTEMAS OPERATIVOS",
      connect: "CONECTAR:",
      location: "DISEÑADO E INGENIADO EN QUERÉTARO, MX. OPERACIONAL EN TODO EL MUNDO."
    },
    countdown: {
      title: "Despliegue Estimado",
      days: "Días",
      hours: "Hrs",
      minutes: "Min",
      seconds: "Seg",
      deploymentWindow: "Ventana de Despliegue: 1er Trimestre 2026",
      systemStatus: "Protocolos de Arquitectura del Sistema Bajo Finalización."
    }
  }
};

import { create } from 'zustand';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang, t: translations[lang] }),
  t: translations.en
}));
