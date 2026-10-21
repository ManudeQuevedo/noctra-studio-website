export const PROJECT_OVERRIDES: Record<string, { challenge: string; solution: string }> = {
  valtru: {
    challenge: "Transformar entornos cotidianos en espacios de autor que respiren armonía y equilibrio. El desafío reside en interpretar la esencia de cada cliente para crear un diseño 100% adaptado que fusione funcionalidad profesional con una estética emocionalmente resonante.",
    solution: "Desarrollamos una identidad visual y presencia web que comunica paz y orden, utilizando un lenguaje visual minimalista y herramientas interactivas que permiten al cliente visualizar la transformación de su espacio desde la primera consulta."
  }
};

export function getProjectOverrides(slug: string) {
  const lowerSlug = slug.toLowerCase();
  for (const [key, value] of Object.entries(PROJECT_OVERRIDES)) {
    if (lowerSlug.includes(key)) {
      return value;
    }
  }
  return null;
}
