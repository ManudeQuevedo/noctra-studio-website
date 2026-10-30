type Localized = { es: string; en: string };

export type CaseStudyCredits = {
  /** One-line summary of how the project was delivered. */
  intro: Localized;
  /** What Noctra Studio delivered. */
  scope: { label: Localized; items: Localized[] };
  /** Partner who delivered the rest of the project. */
  partner: {
    name: string;
    role: Localized;
    items: Localized[];
    url: string;
    urlLabel: string;
  };
};

const credits: Record<string, CaseStudyCredits> = {
  "bridge-capital": {
    intro: {
      es: "Proyecto en conjunto con Clover & Tread para Bridge Capital. Cada parte se encargó de lo suyo, y aquí queda claro quién hizo qué.",
      en: "A joint project with Clover & Tread for Bridge Capital. Each side owned its part, and here is exactly who did what.",
    },
    scope: {
      label: { es: "Alcance de Noctra Studio", en: "Noctra Studio scope" },
      items: [
        { es: "Diseño web", en: "Web design" },
        {
          es: "Desarrollo web (Next.js, TypeScript, TailwindCSS)",
          en: "Web development (Next.js, TypeScript, TailwindCSS)",
        },
        {
          es: "Optimización de velocidad, SEO y experiencia móvil",
          en: "Speed, SEO and mobile experience optimization",
        },
      ],
    },
    partner: {
      name: "Clover & Tread",
      role: {
        es: "Branding y redes sociales · a cargo de Mariel",
        en: "Branding and social media · led by Mariel",
      },
      items: [
        { es: "Identidad de marca", en: "Brand identity" },
        { es: "Manejo de redes sociales", en: "Social media management" },
      ],
      url: "https://www.instagram.com/cloverandtread/",
      urlLabel: "@cloverandtread",
    },
  },
};

export function getCaseStudyCredits(slug: string): CaseStudyCredits | undefined {
  return credits[slug];
}
