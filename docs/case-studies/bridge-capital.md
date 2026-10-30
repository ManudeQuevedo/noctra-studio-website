# Case study: Bridge Capital

Contenido listo para cargar en la tabla `projects` (Forge → proyecto → campos públicos).
Los case studies del sitio salen de Supabase, no de archivos: `/work/[slug]` lee `challenge`, `solution`, `results`, `metrics`, `gallery` y sus versiones `_en`.

Lo marcado con `[[...]]` es un dato que no tengo y no voy a inventar. Llénalo o bórralo.
Si no hay métricas reales, deja `metrics` vacío: la sección de resultados funciona solo con texto.

> Regla para este cliente: es una firma regulada. En el case study **no prometas ni menciones rendimientos**, y no afirmes por tu cuenta el registro CNBV ni la certificación AMIB. Describe lo que el sitio comunica, no lo certifiques tú.

## Campos de la tarjeta

| Campo | Valor |
| --- | --- |
| `slug` | `bridge-capital` |
| `name` | Bridge Capital |
| `industry` (ES) | Asesoría de inversiones |
| `industry_en` | Investment advisory |
| `services_delivered` | `{"Web Design", "Web Development"}` |
| `services_delivered_en` | `{"Web Design", "Web Development"}` |
| `case_study_enabled` | `true` |
| `published_to_site` | `true` |

URL: https://bridgecapital.mx/

## Tagline

- **ES:** Un sitio que transmite la disciplina y la solidez de una firma de inversión.
- **EN:** A website that conveys the discipline and solidity of an investment firm.

## Contexto y problema (`challenge`)

**ES**

Bridge Capital es una firma independiente de asesoría de inversiones en Ciudad de México. Su propuesta es clara y poco común: invertir en empresas sólidas, con directivos transparentes, fundamentales sanos y valuaciones con margen de seguridad. Disciplina de largo plazo, no ganancias rápidas.

El reto era que el sitio tuviera esa misma disciplina. En asesoría financiera, la gente decide si confía en ti antes de hablar contigo, y lo decide mirando tu sitio. Necesitaba explicar un método de inversión sin tecnicismos, dejar visible su respaldo regulatorio y facilitar que un prospecto diera el siguiente paso.

La identidad de marca y las redes sociales las desarrolló Mariel de Clover & Tread. Faltaba llevar esa identidad a una experiencia web seria, rápida y fácil de navegar.

**EN**

Bridge Capital is an independent investment advisory firm in Mexico City. Its proposition is clear and uncommon: invest in solid companies with transparent leadership, healthy fundamentals and valuations with a margin of safety. Long-term discipline, not quick gains.

The challenge was making the website show that same discipline. In financial advisory, people decide whether to trust you before they talk to you, and they decide by looking at your site. It had to explain an investment method without jargon, keep its regulatory backing visible, and make it easy for a prospect to take the next step.

Brand identity and social media were developed by Mariel at Clover & Tread. What remained was carrying that identity into a serious, fast, easy-to-navigate web experience.

## Sistema aplicado (`solution`)

> El panel de diagnóstico se genera por palabras clave de este texto. Las incluidas aquí disparan: "credibilidad", "conversión", "prospectos", "móvil" y "contenido".

**ES**

Mi alcance fue el diseño y desarrollo web. El branding y las redes sociales son trabajo de Mariel (Clover & Tread); mi trabajo fue respetar esa identidad y llevarla al navegador sin que se rompiera.

- **Método en primer plano:** los cuatro pilares de inversión (Negocio, Liderazgo, Fundamentales y Mercado) se diseñaron como una estructura visual simple, para que alguien sin formación financiera entienda cómo piensa la firma en segundos.
- **Credibilidad primero:** el respaldo regulatorio de la firma y la certificación de sus asesores tienen un lugar visible en la jerarquía de la página, porque en este sector son el argumento de confianza principal.
- **Diseño sobrio:** composición limpia, tipografía legible y mucho espacio en blanco. Nada que se sienta promocional ni urgente, porque el cliente ideal valora seguridad por encima de ruido.
- **Desarrollo:** sitio en Next.js, TypeScript y TailwindCSS, optimizado para velocidad y SEO, con experiencia móvil de primera.
- **Conversión de prospectos:** un camino claro desde entender el método hasta contactar a la firma, con la ubicación en Insurgentes Sur y los datos de contacto fáciles de encontrar.
- **Contenido:** estructura pensada para que la firma pueda crecer sus secciones sin rediseñar. [[Confirma si usaste CMS/Supabase/Sanity y dilo aquí]]

**EN**

My scope was web design and development. Branding and social media are Mariel's work (Clover & Tread); my job was to respect that identity and carry it into the browser without breaking it.

- **Method up front:** the four investment pillars (Business, Leadership, Fundamentals and Market) were designed as a simple visual structure, so someone with no financial background understands how the firm thinks in seconds.
- **Credibility first:** the firm's regulatory backing and its advisors' certification have a visible place in the page hierarchy, because in this sector they are the main trust argument.
- **Restrained design:** clean composition, readable typography and generous white space. Nothing promotional or urgent, because the ideal client values safety over noise.
- **Development:** built with Next.js, TypeScript and TailwindCSS, optimized for speed and SEO, with a first-class mobile experience.
- **Lead conversion:** a clear path from understanding the method to contacting the firm, with the Insurgentes Sur location and contact details easy to find.
- **Content:** a structure that lets the firm grow its sections without a redesign. [[Confirm whether you used a CMS/Supabase/Sanity and say so here]]

## Resultados (`results`)

Sin números reales, no pongo números. Dos opciones:

**Opción A, sin métricas (honesta y suficiente)**

- **ES:** El sitio está en producción en bridgecapital.mx y funciona como la pieza central de la presencia digital de Bridge Capital: el lugar al que apuntan sus canales y donde un prospecto entiende el método de la firma y puede dar el siguiente paso.
- **EN:** The site is live at bridgecapital.mx and serves as the centerpiece of Bridge Capital's digital presence: the place its channels point to, where a prospect understands the firm's method and can take the next step.

**Opción B, con métricas reales** (solo si las tienes, de Vercel Analytics / Lighthouse / Search Console)

```json
[
  { "label": "Lighthouse Performance", "value": "[[ej. 95+]]" },
  { "label": "Tiempo de carga (LCP)", "value": "[[ej. 1.4s]]" },
  { "label": "Contactos por formulario", "value": "[[N]]", "delta": "[[periodo]]" },
  { "label": "Lanzamiento", "value": "[[mes/año]]" }
]
```

## Créditos

- Diseño y desarrollo web: Noctra Studio
- Branding y redes sociales: Mariel, [Clover & Tread](https://www.instagram.com/cloverandtread/)

> La página del case study no tiene campo de créditos. El crédito va dentro de `solution` y `challenge`. Si quieres un bloque aparte en la página, es un cambio chico en `CaseStudyClient.tsx`.

## Galería (`gallery`, captions ES/EN)

Sube 4 a 6 capturas. Sugeridas:

1. Home, hero completo. / Home, full hero.
2. Sección de los 4 pilares. / The four pillars section.
3. Sección de credibilidad y respaldo regulatorio. / Credibility and regulatory section.
4. Versión móvil. / Mobile view.
5. Contacto y ubicación. / Contact and location.

## Pendientes antes de publicar

- [ ] Que Bridge Capital apruebe que se publique el case study (es cliente regulado, mejor tener el visto bueno por escrito).
- [ ] Fecha de lanzamiento y stack de contenido (CMS o no).
- [ ] Métricas reales, o quedarse con la Opción A.
- [ ] Capturas.
- [ ] Avisarle a Mariel y confirmar cómo quiere aparecer su crédito (nombre, handle, link).
- [ ] Testimonio del cliente, si lo hay (va en `src/content/testimonials.ts` con `caseStudySlug: "bridge-capital"`).
