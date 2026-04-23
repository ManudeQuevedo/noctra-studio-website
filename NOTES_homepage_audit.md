# Homepage Audit — noctra.studio
**Fecha:** 2026-04-23 | **Auditor:** Claude (solo lectura, sin modificaciones)

---

## 1. Secciones en orden de renderizado

| # | Componente | Namespace i18n | Mensaje en una línea | Animaciones |
|---|------------|----------------|----------------------|-------------|
| 1 | `PageHero` + `HeroSystemPanel` | `HomePage.hero.*` | "Tu negocio no necesita otra agencia. Necesita un sistema." + diagrama SVG de 4 capas | Sí — LazyMotion, `m`, whileInView |
| 2 | `Thesis` | `HomePage.thesis.*` | "Las agencias LATAM están rotas." — 3 párrafos de tesis fundacional | Sí — LazyMotion, `m`, whileInView, stagger |
| 3 | `Ecosystem` | `HomePage.ecosystem.*` | "Siete productos. Una tesis." — grid de 7 cards del portafolio de productos | Sí — LazyMotion, `m`, whileInView, stagger por index |
| 4 | `HybridModelSection` | `HomePage.hybrid_model.*` | "Construimos la base digital que hace que un negocio se vea serio..." — 5 servicios + modelo Noctra | Sí — LazyMotion, `m`, whileInView |
| 5 | `AudienceSection` | `HomePage.solutions.*` | "Soluciones para negocios que necesitan crecer con más estructura." — bento por tipo de negocio (5 segmentos) | Sí — LazyMotion, `m`, whileInView, scale, stagger |
| 6 | `CapabilitiesSection` | `HomePage.services_section.*` + `HomeCapabilities.*` | "Cuando necesitas ejecución completa, Noctra Studio la construye contigo." — 4 servicios con bullet points | Sí — LazyMotion, `m`, whileInView |
| 7 | `ExamplesSection` | `HomeExamples.*` | 3 cards de metodología/ejemplos + closing copy + CTA a /work | Sí — LazyMotion, **`motion`** (no `m`), whileInView |
| 8 | `TheSystemSection` | `HomePage.the_system.*` | "La Arquitectura Noctra: Studio + Software en Sincronía" — 6 productos en 3 capas detalladas | Sí — LazyMotion, `m`, whileInView |
| 9 | `RadarSection` | `HomePage.radar.*` | "Noctra Radar te muestra qué está frenando el rendimiento de tu sitio..." — landing completa del producto Radar | Sí — LazyMotion, `m`, whileInView |
| 10 | `SocialSection` | `HomePage.social.*` | "Noctra Social ayuda a mantener una presencia relevante sin convertir el contenido en una carga operativa." — landing del producto Social | Sí — LazyMotion, `m`, whileInView |
| 11 | `FinalCTASection` | `HomeFinalCta.*` | 2 paths: Studio (consulta) + Productos (ver Radar) | Sí — LazyMotion, `m`, whileInView |

**Total: 11 secciones** (sin contar `BrandNarrativeVisual` que es decoración de fondo)

---

## 2. Problemas detectados

---

### A) Duplicación de mensaje

#### A1 — CRÍTICO: Ecosystem vs TheSystemSection presentan los mismos 6 productos
- **Ecosystem** (pos 3): grid de 7 cards listando noctra.studio, Radar, Social, CRM, Discovery, Proposals, Academy con descripción breve de cada uno.
- **TheSystemSection** (pos 8): mismos 6 productos (studio, radar, social, discovery, proposals, academy) organizados en 3 capas de arquitectura, con descripciones más detalladas.
- El usuario ve los 7 productos en el card de Ecosystem y luego vuelve a ver 6 de ellos en TheSystemSection 5 secciones después. La segunda presentación no añade narrativa nueva — solo más detalle de los mismos objetos.
- **Impacto:** redundancia severa, sensación de repetición, página innecesariamente larga.

#### A2 — ALTO: RadarSection y SocialSection duplican cards del Ecosystem
- **RadarSection** (pos 9): sección completa de marketing del producto Radar (tagline, copy, CTA).
- **SocialSection** (pos 10): sección completa de marketing del producto Social (tagline, copy, CTA).
- Ambos productos ya aparecen en Ecosystem (pos 3) y en TheSystemSection (pos 8).
- El usuario ve Radar 3 veces y Social 3 veces antes del CTA final.

#### A3 — ALTO: Hero subtitle y Thesis paragraph_1 dicen lo mismo
- **Hero subtitle** (`hero.subtitle`): "Las agencias LATAM venden plantillas disfrazadas de estrategia."
- **Thesis paragraph_1** (`thesis.paragraph_1`): "Entregan 'sitios a la medida' que son plantillas disfrazadas."
- La misma acusación ("plantillas disfrazadas") aparece en ambas, una encima de la otra.

#### A4 — MEDIO: HybridModelSection y CapabilitiesSection listan los mismos servicios
- **HybridModelSection items**: Claridad de marca / Sitios que convierten / Visibilidad orgánica / Captación más ordenada / Operación reforzada con software (5 items).
- **CapabilitiesSection** (`HomeCapabilities.items`): mismas 4 categorías de servicio con más detalle (bullets).
- Dos secciones consecutivas (pos 4 y pos 6, con AudienceSection en medio) presentan el catálogo de servicios.

#### A5 — BAJO: "sistema conectado" y frases similares se repiten en múltiples lugares
- `hero.subtitle`: "operando como un sistema conectado"
- `hero.product_anchor`: "todo en un sistema conectado"
- `ecosystem.subtitle`: "Todos conectados por el mismo sistema"
- `the_system.subtitle`: "Branding, web, visibilidad y automatización conectados para que nada funcione de forma aislada"
- `hybrid_model.note`: "Es tener una capa de implementación y una capa de software que se fortalecen mutuamente."
- La frase núcleo del posicionamiento se repite ≥5 veces a lo largo de la página.

---

### B) Coherencia narrativa

#### B1 — CRÍTICO: HybridModelSection contradice la Tesis
- La Tesis (pos 2) declara: "No somos una agencia más."
- HybridModelSection (pos 4) abre con: "Construimos la base digital que hace que un negocio **se vea serio**, aparezca mejor y convierta con menos fricción."
- El copy de HybridModel —especialmente el `subtitle`: "Ayudamos a negocios que ya no quieren improvisar su presencia digital. Aclaramos la marca, mejoramos el sitio..."— suena exactamente como el lenguaje de las "agencias LATAM rotas" que la Tesis acababa de criticar.
- Los `model_points` usan un tono más cercano a la nueva narrativa, pero el encabezado de sección ya rompió el hilo.

#### B2 — ALTO: El flujo narrativo post-Ecosystem se desordena
- Flujo ideal: Tesis (problema) → Ecosistema (nuestra respuesta) → Modelo/Servicios (cómo trabajamos) → Prueba (casos) → Productos (herramientas) → CTA
- Flujo actual: Tesis → Ecosistema → HybridModel (repetición de servicios) → Audience (segmentación) → Capabilities (servicios otra vez) → Examples (metodología) → TheSystem (productos otra vez) → Radar (producto) → Social (producto) → CTA
- Hay 3 secciones distintas que explican "qué servicios ofrecemos" (HybridModel, AudienceSection, CapabilitiesSection) y 4 que mencionan los productos (Ecosystem, TheSystem, Radar, Social).

#### B3 — MEDIO: AudienceSection interrumpe el flujo del sistema
- "Por tipo de negocio" (pos 5) interrumpe la narrativa del sistema con segmentación por industria. Viene después del Ecosistema y antes de Capabilities.
- El kicker dice "POR TIPO DE NEGOCIO" — lenguaje de segmentación de agencia, no de "sistema que opera por sí solo". Contrasta con el tono fundacional de las nuevas secciones.

#### B4 — BAJO: ExamplesSection no tiene casos reales documentados
- El componente renderiza 3 cards de metodología ("Diagnóstico → Estrategia → Ejecución" o similar) desde `HomeExamples.cards`, pero no son casos de clientes reales con resultados medibles.
- El anchor `id="proof"` y el `HomeExamples.label` insinúan "prueba social" que el contenido no cumple.

---

### C) Coherencia visual

#### C1 — ALTO: Solo las nuevas secciones usan kickers numerados
- Thesis: `"02 / TESIS"` | Ecosystem: `"03 / ECOSISTEMA"`
- El resto de secciones usan kickers sin número: "QUÉ HACE NOCTRA", "POR TIPO DE NEGOCIO", "IMPLEMENTAMOS EL SISTEMA POR TI", "ARQUITECTURA CONECTADA", "PRODUCTO PRINCIPAL", "PRODUCTO SECUNDARIO"
- La secuencia 01/02/03 implica una progresión que se rompe en la posición 4. El usuario asume que HybridModel sería "04" y se encuentra sin número.
- Si se completa la numeración de todas las secciones, la página tendría 10+ números, lo que es excesivo. Hay que decidir: o todas numeradas o ninguna.

#### C2 — MEDIO: Tamaños de h2 inconsistentes
- Nuevas secciones (Thesis, Ecosystem): `text-4xl md:text-5xl` / `text-3xl md:text-4xl`
- Secciones antiguas: muchas llegan a `lg:text-6xl` (HybridModel, TheSystem, Radar, Social)
- El h2 del hero es `text-5xl md:text-7xl` — mucho más grande que cualquier sección
- No hay un sistema tipográfico consistente: las secciones no tienen jerarquía progresiva definida.

#### C3 — MEDIO: Colores de subtítulo inconsistentes
- Thesis: `text-[#F0EDE6]/85` (bone white del sistema del hero)
- Ecosystem: `text-neutral-400`
- Secciones antiguas: mezcla de `text-neutral-300` y `text-neutral-400`
- El token `#F0EDE6` solo aparece en Hero y Thesis (las nuevas secciones no lo usan de forma consistente).

#### C4 — BAJO: Backgrounds alternantes inconsistentes
- Nuevas secciones: `bg-transparent` (flotan sobre el fondo de la página)
- Secciones antiguas: alternan entre `bg-black`, `bg-neutral-950`, y `bg-white/[0.02]`
- HybridModelSection y TheSystemSection tienen `bg-black` explícito — crean "bloques" visuales que contrastan con el estilo editorial de Hero/Thesis/Ecosystem.

#### C5 — BAJO: ExamplesSection usa `motion` en lugar de `m`
- Todos los demás componentes usan `import { m } from "framer-motion"` (lazy).
- ExamplesSection usa `import { motion } from "framer-motion"` (full bundle).
- Inconsistencia de patrón + peso de bundle innecesariamente mayor en esa sección.

---

### D) Claves i18n huérfanas (no referenciadas en componentes activos)

| Clave | Por qué es huérfana |
|-------|---------------------|
| `HomePage.hero.trust_badge.*` | Usado por `src/components/hero.tsx` (viejo Hero), que **no** está en `page.tsx`. `PageHero` no usa esas claves. |
| `HomePage.cta_start` | Usado por `hero.tsx` viejo. No referenciado en ningún componente activo de la homepage. |
| `HomePage.cta_services` | No aparece referenciado en ningún componente activo. |
| `HomePage.cta_work` | Usado por `hero.tsx` viejo. |
| `HomePage.manifesto.*` | `ManifestoText` en `TextReveal.tsx` referencia `HomePage.manifesto.text`, pero esa clave **no existe** en el JSON y `ManifestoText` no se usa en la homepage. Si se llama, lanzaría error de missing key. |
| `HomePage.social.pipeline` | `SocialSection` importa `t.raw("pipeline")` como `pipeline`, pero **nunca lo renderiza** en JSX. Igualmente `pipelineIcons` de lucide-react se define pero nunca se usa. |
| `HomePage.social.workflow_label` | No referenciado en `SocialSection.tsx` ni en ningún otro componente activo. |
| `HomePage.social.workflow_title` | Ídem. |
| `HomePage.social.workflow_badge` | Ídem. |
| `HomePage.social.step_label` | Ídem. |
| `HomePage.social.workflow_note_label` | Ídem. |
| `HomePage.social.workflow_note` | Ídem. |

**Nota:** `hero.metric_value`, `hero.metric_label`, `hero.metric_footnote` probablemente existen en el JSON como residuo del HeroSystemPanel con card (versión anterior). El HeroSystemPanel actual no los referencia — confirmar con grep antes de eliminar.

---

### E) Imports sin usar

| Componente | Import no usado |
|------------|----------------|
| `SocialSection.tsx` | `pipelineIcons = [CalendarRange, PenLine, Bot, Share2]` — definido, nunca usado en JSX |
| `SocialSection.tsx` | `const pipeline = t.raw("pipeline")` — cargado, nunca renderizado |
| `src/components/hero.tsx` | El archivo completo — existe como componente pero `page.tsx` usa `PageHero` (alias `Hero`), no este. El viejo `hero.tsx` es dead code. |

---

## 3. Recomendaciones (sin orden de prioridad de implementación)

### R1 — Eliminar o fusionar TheSystemSection
**Problema:** A1, A2
TheSystemSection (pos 8) presenta los mismos productos que Ecosystem (pos 3). Opciones:
- **Opción A (recomendada):** Eliminar TheSystemSection completamente. Ecosystem ya cubre el mapa de productos.
- **Opción B:** Convertir TheSystemSection en algo diferente: demostración técnica, arquitectura de datos, o una sección "cómo funciona el stack" que complemente sin repetir.

### R2 — Eliminar RadarSection y SocialSection como secciones independientes
**Problema:** A2
Radar y Social ya tienen presencia en Ecosystem. Tener secciones de marketing individual de cada producto en la homepage de un studio es confuso para el usuario (¿es un studio o una tienda de productos?).
- **Alternativa:** Un solo "Productos en profundidad" que enlace a páginas dedicadas `/products/radar` y `/products/social`.

### R3 — Reescribir el encabezado de HybridModelSection
**Problema:** B1
El título y subtítulo de HybridModel deben alinearse con la voz post-Tesis. Sugerencia de dirección:
- Actual: "Construimos la base digital que hace que un negocio se vea serio, aparezca mejor y convierta con menos fricción."
- Nueva dirección: algo que conecte con "Cada capa del sistema que te vendemos como servicio hoy..." de Thesis paragraph_3.

### R4 — Decidir y aplicar un sistema de kickers consistente
**Problema:** C1
Dos opciones:
- **Opción A:** Numerar todas las secciones activas secuencialmente. Requiere actualizar todos los `label` en los JSON de secciones antiguas.
- **Opción B:** Eliminar la numeración de Thesis y Ecosystem, usar kickers sin número en toda la página.

### R5 — Unificar escala tipográfica de h2
**Problema:** C2
Establecer un único estándar para los h2 de sección (ejemplo: `text-3xl md:text-4xl` para el nuevo stack editorial, `text-4xl md:text-5xl` como máximo). Las secciones con `lg:text-6xl` compiten visualmente con el h1 del hero.

### R6 — Estandarizar color de subtítulo
**Problema:** C3
Elegir entre `text-neutral-400` (Tailwind) y `text-[#F0EDE6]/85` (token propio). Aplicar el mismo en todas las secciones para coherencia.

### R7 — Depurar claves i18n huérfanas
**Problema:** D
1. Eliminar `hero.trust_badge.*`, `cta_start`, `cta_services`, `cta_work` del JSON (pertenecen al viejo `hero.tsx`).
2. Eliminar o mover a `AboutPage` el bloque `manifesto.*` si `ManifestoText` no se usa en la homepage.
3. Eliminar `social.pipeline`, `workflow_label`, `workflow_title`, `workflow_badge`, `step_label`, `workflow_note_label`, `workflow_note` o implementarlos en SocialSection.
4. Confirmar si `hero.metric_*` existen y si están referenciados en el HeroSystemPanel actual.

### R8 — Eliminar `hero.tsx` viejo
**Problema:** E
`src/components/hero.tsx` es dead code desde que se adoptó `PageHero`. Eliminar para evitar confusión.

### R9 — Limpiar imports en SocialSection
**Problema:** E
Eliminar `pipelineIcons`, `CalendarRange`, `PenLine`, `Bot` (excepto si Bot se usa en el float overlay, donde sí se usa), `Share2` del import y la constante `pipeline` del componente.
**Nota:** `Bot` SÍ se usa en el float overlay (`<Bot className="h-5 w-5 text-emerald-400" />`). Solo eliminar los otros 3 (`CalendarRange`, `PenLine`, `Share2`) y `pipelineIcons`.

### R10 — Migrar ExamplesSection a `m` en lugar de `motion`
**Problema:** C5
Cambiar `import { LazyMotion, domAnimation, motion }` a `import { LazyMotion, domAnimation, m }` y actualizar todas las referencias `motion.` a `m.`.

---

## 4. Resumen ejecutivo

La homepage tiene **11 secciones** renderizadas. Las 3 nuevas (Hero rediseñado, Thesis, Ecosystem) establecen una narrativa editorial sólida y diferenciada. Las **8 secciones antiguas** fueron construidas antes de ese posicionamiento y presentan tres problemas estructurales:

1. **Redundancia producto**: los mismos 6-7 productos aparecen hasta 3 veces cada uno (Ecosystem, TheSystem, y su sección individual).
2. **Contradicción de voz**: HybridModelSection habla como la "agencia rota" que Thesis acaba de criticar.
3. **Falta de progresión narrativa**: hay 3 secciones sobre "nuestros servicios" y 4 sobre "nuestros productos" — sin avanzar la historia.

**Secciones candidatas a eliminación:** `TheSystemSection`, `RadarSection`, `SocialSection` (las 3 son subsumidas por Ecosystem o tienen páginas dedicadas).

**Secciones candidatas a reescritura de copy:** `HybridModelSection` (alinear voz), `AudienceSection` (alinear kicker), `ExamplesSection` (añadir prueba real o renombrar).
