import type { PublicCaseStudyProject } from "@/types/site-project";

type LocalizedCaseStudy = Record<"es" | "en", PublicCaseStudyProject>;

/**
 * Case studies awaiting client approval. Served only on Vercel preview
 * deployments (see getDraftCaseStudy), never in production. Once approved,
 * load the same content in Forge (Supabase `projects`) and delete the entry.
 */
const drafts: Record<string, LocalizedCaseStudy> = {
  "bridge-capital": {
    es: {
      id: "draft-bridge-capital",
      slug: "bridge-capital",
      name: "Bridge Capital",
      tagline:
        "Un sitio que transmite la disciplina y la solidez de una firma de inversión.",
      industry: "Asesoría de inversiones",
      services_delivered: ["Web Design", "Web Development"],
      challenge:
        "Bridge Capital es una firma independiente de asesoría de inversiones en Ciudad de México. Su propuesta es clara y poco común: invertir en empresas sólidas, con directivos transparentes, fundamentales sanos y valuaciones con margen de seguridad. Disciplina de largo plazo, no ganancias rápidas.\n\nEl reto era que el sitio tuviera esa misma disciplina. En asesoría financiera, la gente decide si confía en ti antes de hablar contigo, y lo decide mirando tu sitio. Necesitaba explicar un método de inversión sin tecnicismos, dejar visible su respaldo regulatorio y facilitar que un prospecto diera el siguiente paso.\n\nLa identidad de marca y las redes sociales las desarrolló Mariel de Clover & Tread. Faltaba llevar esa identidad a una experiencia web seria, rápida y fácil de navegar.",
      solution:
        "Mi alcance fue el diseño y desarrollo web. El branding y las redes sociales son trabajo de Mariel (Clover & Tread); mi trabajo fue respetar esa identidad y llevarla al navegador sin que se rompiera.\n\n• Método en primer plano: los cuatro pilares de inversión (Negocio, Liderazgo, Fundamentales y Mercado) se diseñaron como una estructura visual simple, para que alguien sin formación financiera entienda cómo piensa la firma en segundos.\n\n• Credibilidad primero: el respaldo regulatorio de la firma y la certificación de sus asesores tienen un lugar visible en la jerarquía de la página, porque en este sector son el argumento de confianza principal.\n\n• Diseño sobrio: composición limpia, tipografía legible y mucho espacio en blanco. Nada que se sienta promocional ni urgente, porque el cliente ideal valora seguridad por encima de ruido.\n\n• Desarrollo: sitio en Next.js, TypeScript y TailwindCSS, optimizado para velocidad y SEO, con experiencia móvil de primera.\n\n• Conversión de prospectos: un camino claro desde entender el método hasta contactar a la firma, con la ubicación en Insurgentes Sur y los datos de contacto fáciles de encontrar.\n\n• Contenido: estructura pensada para que la firma pueda crecer sus secciones sin rediseñar.",
      results:
        "El sitio está en producción en bridgecapital.mx y funciona como la pieza central de la presencia digital de Bridge Capital: el lugar al que apuntan sus canales y donde un prospecto entiende el método de la firma y puede dar el siguiente paso.",
      metrics: null,
      gallery: null,
    },
    en: {
      id: "draft-bridge-capital",
      slug: "bridge-capital",
      name: "Bridge Capital",
      tagline:
        "A website that conveys the discipline and solidity of an investment firm.",
      industry: "Investment advisory",
      services_delivered: ["Web Design", "Web Development"],
      challenge:
        "Bridge Capital is an independent investment advisory firm in Mexico City. Its proposition is clear and uncommon: invest in solid companies with transparent leadership, healthy fundamentals and valuations with a margin of safety. Long-term discipline, not quick gains.\n\nThe challenge was making the website show that same discipline. In financial advisory, people decide whether to trust you before they talk to you, and they decide by looking at your site. It had to explain an investment method without jargon, keep its regulatory backing visible, and make it easy for a prospect to take the next step.\n\nBrand identity and social media were developed by Mariel at Clover & Tread. What remained was carrying that identity into a serious, fast, easy-to-navigate web experience.",
      solution:
        "My scope was web design and development. Branding and social media are Mariel's work (Clover & Tread); my job was to respect that identity and carry it into the browser without breaking it.\n\n• Method up front: the four investment pillars (Business, Leadership, Fundamentals and Market) were designed as a simple visual structure, so someone with no financial background understands how the firm thinks in seconds.\n\n• Credibility first: the firm's regulatory backing and its advisors' certification have a visible place in the page hierarchy, because in this sector they are the main trust argument.\n\n• Restrained design: clean composition, readable typography and generous white space. Nothing promotional or urgent, because the ideal client values safety over noise.\n\n• Development: built with Next.js, TypeScript and TailwindCSS, optimized for speed and SEO, with a first-class mobile experience.\n\n• Lead conversion: a clear path from understanding the method to contacting the firm, with the Insurgentes Sur location and contact details easy to find.\n\n• Content: a structure that lets the firm grow its sections without a redesign.",
      results:
        "The site is live at bridgecapital.mx and serves as the centerpiece of Bridge Capital's digital presence: the place its channels point to, where a prospect understands the firm's method and can take the next step.",
      metrics: null,
      gallery: null,
    },
  },
};

export function getDraftCaseStudy(
  slug: string,
  locale: string,
): PublicCaseStudyProject | null {
  if (process.env.VERCEL_ENV !== "preview") return null;
  const entry = drafts[slug];
  if (!entry) return null;
  return locale === "en" ? entry.en : entry.es;
}

export function getDraftCaseStudySlugs(): string[] {
  if (process.env.VERCEL_ENV !== "preview") return [];
  return Object.keys(drafts);
}
