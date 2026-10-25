export type Testimonial = {
  id: string;
  quote: { en: string; es: string };
  highlight: { en: string; es: string };
  originalLocale: "en" | "es";
  author: string;
  role?: string;
  company: string;
  caseStudySlug?: string;
  approved: true;
};

const testimonials: Testimonial[] = [
  {
    id: "woodax-adrian",
    quote: {
      en: "Working with Noctra was one of the best experiences I've had. Their communication was excellent from the very beginning, and I could tell their priority was understanding exactly what the client needs. They pay attention to every small detail and explained every step of the process. I couldn't be more satisfied with their work. The websites they built for me turned out excellent. I highly recommend them to anyone who wants to build a website without headaches or complications.",
      es: "Trabajar con Noctra fue de las mejores experiencias que he tenido. La comunicación fue excelente desde el principio y se notaba que su prioridad era entender exactamente lo que necesita el cliente. Cuidan cada detalle y me explicaron cada paso del proceso. No podría estar más satisfecho: los sitios quedaron excelentes. Los recomiendo a cualquiera que quiera hacer su página sin dolores de cabeza ni complicaciones.",
    },
    highlight: {
      en: "Without headaches or complications.",
      es: "Sin dolores de cabeza ni complicaciones.",
    },
    originalLocale: "en",
    author: "Adrian Acs",
    company: "Woodax Design",
    caseStudySlug: "woodax-design",
    approved: true,
  },
];

export function getApprovedTestimonials(): Testimonial[] {
  return testimonials.filter((item) => item.approved === true);
}

export function getTestimonialByCaseStudySlug(
  slug: string,
): Testimonial | undefined {
  return getApprovedTestimonials().find((item) => item.caseStudySlug === slug);
}
