export type Language = 'en' | 'es';

export const translations = {
  en: {
    hero: {
      title: "Coming Soon",
      subtitle: "We are crafting a new digital experience.",
      description: "Noctra Studio is a premium digital product studio. We build scalable, secure, and evolving infrastructure for your business."
    },
    form: {
      placeholder: "Enter your email for early access",
      button: "Notify Me",
      success: "Thank you! We'll keep you posted.",
      error: "Something went wrong. Please try again.",
      sending: "Sending...",
      microcopy: "No spam. Just value."
    },
    footer: {
      copyright: "© 2025 Engineered by Noctra Studio"
    }
  },
  es: {
    hero: {
      title: "Una nueva experiencia digital está por llegar.",
      subtitle: "Estamos construyendo soluciones rápidas, seguras y diseñadas para marcas que quieren crecer.",
      description: "Infraestructura premium, diseño impecable y tecnología de alto rendimiento."
    },
    form: {
      placeholder: "Ingresa tu correo para obtener acceso anticipado",
      button: "Notificarme",
      success: "¡Gracias! Te mantendremos informado.",
      error: "Algo salió mal. Por favor intenta de nuevo.",
      sending: "Enviando...",
      microcopy: "No spam. Solo valor."
    },
    footer: {
      copyright: "© 2025 Engineered by Noctra Studio"
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
