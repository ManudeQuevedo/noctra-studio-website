export type Language = 'en' | 'es';

export const translations = {
  en: {
    hero: {
      title: "System Initialization Imminent.",
      subtitle: "We are architecting the next generation of digital infrastructure. A studio led by senior engineers with 7+ years of production experience at scale.",
      description: ""
    },
    form: {
      placeholder: "Request Early Access Protocol",
      button: "Notify Me",
      success: "Thank you! We'll keep you posted.",
      error: "Something went wrong. Please try again.",
      sending: "Sending...",
      microcopy: "Join the waitlist for priority architecture audits and engineering insights. No spam."
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
      seconds: "Sec"
    }
  },
  es: {
    hero: {
      title: "Inicialización del Sistema Inminente.",
      subtitle: "Estamos arquitectando la próxima generación de infraestructura digital. Un estudio liderado por ingenieros senior con más de 7 años de experiencia en producción a escala.",
      description: ""
    },
    form: {
      placeholder: "Solicitar Protocolo de Acceso Anticipado",
      button: "Notificarme",
      success: "¡Gracias! Te mantendremos informado.",
      error: "Algo salió mal. Por favor intenta de nuevo.",
      sending: "Enviando...",
      microcopy: "Únete a la lista de espera para auditorías de arquitectura prioritarias e insights de ingeniería. Sin spam."
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
      seconds: "Seg"
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
