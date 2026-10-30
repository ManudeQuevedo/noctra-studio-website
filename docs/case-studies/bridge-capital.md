# Case study: Bridge Capital

Contenido listo para cargar en la tabla `projects` (Forge → proyecto → campos públicos).
Los case studies del sitio salen de Supabase, no de archivos: `/work/[slug]` lee `challenge`, `solution`, `results`, `metrics`, `gallery` y sus versiones `_en`.

Todo lo marcado con `[[...]]` es un dato que no tengo y no voy a inventar. Llénalo o bórralo.
Si no hay métricas reales, deja `metrics` vacío: la sección de resultados funciona solo con texto.

## Campos de la tarjeta

| Campo | Valor |
| --- | --- |
| `slug` | `bridge-capital` |
| `name` | Bridge Capital |
| `industry` (ES) | [[ej. Servicios financieros / Capital privado]] |
| `industry_en` | [[e.g. Financial services / Private capital]] |
| `services_delivered` | `{"Web Design", "Web Development"}` |
| `services_delivered_en` | `{"Web Design", "Web Development"}` |
| `case_study_enabled` | `true` |
| `published_to_site` | `true` |

## Tagline

- **ES:** Un sitio que se siente tan sólido como el capital que respalda.
- **EN:** A website as solid as the capital behind it.

## Contexto y problema (`challenge`)

**ES**

Bridge Capital necesitaba una presencia digital a la altura de una firma que maneja decisiones de dinero. En ese sector, el sitio web es la primera prueba de seriedad: si se ve improvisado, la confianza se pierde antes de la primera conversación.

La marca ya tenía identidad y voz propias, trabajadas por Mariel de Clover & Tread, que también lleva la estrategia de redes sociales. Faltaba el eslabón técnico: un sitio que tradujera esa identidad a una experiencia web clara, rápida y que convirtiera visitas en conversaciones reales.

**EN**

Bridge Capital needed a digital presence worthy of a firm that handles money decisions. In this sector, the website is the first proof of seriousness: if it looks improvised, trust is lost before the first conversation.

The brand already had its own identity and voice, crafted by Mariel at Clover & Tread, who also runs its social media strategy. What was missing was the technical link: a site that translates that identity into a clear, fast web experience that turns visits into real conversations.

## Sistema aplicado (`solution`)

> El panel de diagnóstico se genera por palabras clave de este texto. Las que ya están incluidas disparan estos tags: "credibilidad", "conversión", "prospectos", "móvil", "contenido".

**ES**

Mi alcance fue el diseño y desarrollo web del sitio. El branding y las redes sociales son trabajo de Mariel (Clover & Tread); mi trabajo fue respetar esa identidad y llevarla al navegador sin que se rompiera.

- **Diseño web:** estructura de páginas y jerarquía de contenido pensadas para construir credibilidad y confianza desde el primer scroll, usando la paleta y tipografía definidas en el branding.
- **Desarrollo:** sitio en Next.js, TypeScript y TailwindCSS, optimizado para velocidad y SEO, con una experiencia móvil de primera, no adaptada a última hora.
- **Conversión:** un camino claro para que un prospecto pase de leer a contactar, con formulario y llamadas a la acción en los puntos de decisión.
- **Contenido:** estructura lista para crecer, de modo que actualizar secciones no dependa de rehacer el diseño. [[Confirma si usaste CMS/Supabase/Sanity y dilo aquí]]

**EN**

My scope was the web design and development of the site. Branding and social media are Mariel's work (Clover & Tread); my job was to respect that identity and carry it into the browser without breaking it.

- **Web design:** page structure and content hierarchy built to establish credibility and trust from the first scroll, using the palette and typography defined in the branding.
- **Development:** built with Next.js, TypeScript and TailwindCSS, optimized for speed and SEO, with a first-class mobile experience, not an afterthought.
- **Conversion:** a clear path from reading to reaching out, with a form and calls to action at decision points.
- **Content:** a structure ready to grow, so updating sections doesn't mean redesigning. [[Confirm whether you used a CMS/Supabase/Sanity and say so here]]

## Resultados (`results`)

Sin números reales, no pongo números. Dos opciones:

**Opción A, sin métricas (honesta y suficiente)**

- **ES:** El sitio está en producción y funciona como la pieza central del ecosistema digital de Bridge Capital: el lugar al que apuntan las redes de Clover & Tread y donde un prospecto puede pasar de curiosidad a contacto.
- **EN:** The site is live and works as the centerpiece of Bridge Capital's digital ecosystem: the place Clover & Tread's social channels point to, and where a prospect can go from curiosity to contact.

**Opción B, con métricas reales** (solo si las tienes, de Vercel Analytics / Lighthouse / Search Console)

```json
[
  { "label": "Lighthouse Performance", "value": "[[ej. 95+]]" },
  { "label": "Tiempo de carga (LCP)", "value": "[[ej. 1.4s]]" },
  { "label": "Consultas por formulario", "value": "[[N]]", "delta": "[[periodo]]" },
  { "label": "Lanzamiento", "value": "[[mes/año]]" }
]
```

## Créditos (para el pie del case study o la galería)

- Diseño y desarrollo web: Noctra Studio
- Branding y redes sociales: Mariel, [Clover & Tread](https://www.instagram.com/cloverandtread/)

> La página del case study no tiene campo de créditos. Opciones: dejarlo dentro de `solution` (ya está en el primer párrafo) o agregar un bloque de créditos en `CaseStudyClient.tsx`. Si quieres lo segundo, es un cambio chico.

## Galería (`gallery`, captions ES/EN)

Sube 4 a 6 capturas. Sugeridas:

1. Home, hero completo. / Home, full hero.
2. Versión móvil de la home. / Mobile home.
3. Sección de servicios. / Services section.
4. Formulario de contacto. / Contact form.

## Pendientes antes de publicar

- [ ] Qué hace exactamente Bridge Capital (ajustar industria y el primer párrafo).
- [ ] URL del sitio en producción y fecha de lanzamiento.
- [ ] Métricas reales, o quedarse con la Opción A.
- [ ] Capturas.
- [ ] Avisarle a Mariel y confirmar cómo quiere que aparezca su crédito (nombre, handle, link).
- [ ] Testimonio del cliente, si lo hay (va en `src/content/testimonials.ts` con `caseStudySlug: "bridge-capital"`).
