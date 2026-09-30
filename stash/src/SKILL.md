---
name: mustache-ds
description: Design System de Rappi (Mustache UX System). Úsala siempre que diseñes, maquetes, revises o escribas UI, mockups, prototipos HTML, componentes, pantallas, banners o copies para cualquier producto de Rappi, o cuando se mencione Mustache, tokens, colores, tipografía, spacing, iconos, elevación o voz y tono de Rappi, aunque no se diga "skill". Para documentar un componente desde Figma usa `rappi-component-docs`; para escribir documentación del DS usa `rappi-design-docs`.
---

# Mustache UX System (Rappi)

> **Skill v1.1 · {{VERSION}} · {{DATE}}.** Tema User App (light + dark). Si el pedido es para otra versión de la app u otro tema de producto, avísalo antes de diseñar.

Eres un diseñador del equipo de Rappi. Todo lo que produzcas (mockups, HTML, specs, críticas, copies) sigue el Mustache UX System. Si algo no está definido en el DS, **no lo inventes**: usa lo más cercano y dilo.

## Regla de oro

1. **Habla y diseña en tokens semánticos, nunca en hex.** `ink/standard`, no `#464D59`. En código: `var(--rp-color-ink-standard)`.
2. **Los primitives están ocultos a propósito.** No uses `green/50` ni hex crudos: usa el token que dice DÓNDE se usa (`background/accent`).
3. **Dark mode vive dentro del token.** Nunca definas un color aparte para dark: el mismo token resuelve light y dark.
4. **Si un token no existe, avisa.** Escribe "⚠️ sin token oficial" y propone el semántico más cercano. Nunca uses un token que no esté en `assets/tokens.css`.

## Precedencia (si dos fuentes se contradicen)

1. **Figma** (`semantics` y `primitives`): fuente de verdad. Si tienes el MCP de Figma, gana.
2. **`assets/tokens.css` y `assets/rappi-design-tokens.json`**: exportados de Figma. Definen qué tokens existen.
3. **Este SKILL.md y `references/*.md`**: reglas de uso curadas.
4. **`references/site/**`**: documentación del sitio. Úsala para contexto, patrones y do/don't. Si un nombre o valor choca con 1 a 3, **gana 1 a 3** y avisa de la diferencia.

## Anatomía de un token de color

`familia/rol[-modificador][-estado]`

- **Familias:** `ink` (texto e iconos) · `background` (fondos) · `line` (bordes y divisores) · `interactive` (estados) · `surface` (overlays) · `skeleton` · `chart` · `programs`.
- **Intensidad:** `weak` < `mild` < `standard` < `strong`.
- **Intenciones:** `accent` (acción/marca) · `positive` · `warning` · `error` · `recommendation` (info) · `offer` (promo).
- **Inversión:** `inverse` cambia con el modo. `-on` (`ink/inverse-on`, `ink/strong-on`) es **fijo** en light y dark: úsalo siempre sobre fondos de color.

## Cheat sheet (lo que más se usa)

| Necesito… | Token |
|---|---|
| Fondo de pantalla | `background/standard` |
| Fondo de sección o card secundaria | `background/mild` / `background/weak` |
| Card sobre otra superficie | `background/on-top` |
| Texto principal / secundario / placeholder | `ink/strong` / `ink/standard` / `ink/weak` |
| Botón primario | `background/accent` + `ink/inverse-on`, radio `pill`. ⚠️ 2.2:1, ver "Accesibilidad" |
| Borde de input o card | `line/border-standard` · focus: `line/border-strong` |
| Error (texto / fondo suave / borde) | `ink/error` / `background/error-weak` / `line/border-error` |
| Alerta o banner de feedback | `background/<intención>-weak` + texto `ink/strong` + ícono `ink/<intención>` |
| Promo | `background/offer` + `ink/strong-on` (nunca `ink/strong`: en dark queda blanco sobre amarillo) |
| Scrim de modal | `surface/overlay` |
| Margen lateral de pantalla | `horizontal/inside-screen` = 24 |
| Entre secciones | `vertical/between-sections` = 32 |
| Radio de card / sheet / modal | `card` = 24 · botones y chips: `pill` |
| Borde / selección | stroke `standard` = 1 · `selected` = 2 |
| Texto base | `body` 16/20 (mobile), PP Object Sans Regular |
| Área táctil mínima | **48×48px** y 8px entre áreas táctiles, aunque el elemento se vea más chico |

## Tipografía en 5 líneas

- **PP Object Sans** para UI. Pesos en uso: **Regular (400)** y **Medium (500)**. Medium reemplazó a Bold: los estilos `*Bold` siguen en Figma por legado, no los uses en diseño nuevo.
- **Archivo Black es exclusiva del componente `banner-bigFont`** (mobile-library Rappi 8): solo para su cifra o titular protagonista (ej. el % OFF), con `hugeTitleL/M/S` y tracking −4%. **No es una fuente display general:** en cualquier otro banner, pantalla o pieza usa PP Object Sans (`huge`, `h1`).
- **Text styles** en Figma: `rol/rolPeso` (ej. `body/bodyRegular`, `h2/h2Medium`). Roles: `huge`, `h1`–`h4`, `headline`, `subheadline`, `body`, `caption-1`, `caption-2`, `label`. `subheadline` es un eyebrow: 10px, MAYÚSCULAS, tracking 12%.
- Tamaño y line-height cambian por breakpoint (Mobile, Tablet ≥600, Desktop ≥1024) vía variables de la colección `Typography`.
- Mínimo 12px en UI; cuerpo 16px. `footnote` (8), `disclaimer` (6) y `legal` (4) no van en pantalla. Escala completa y CSS en `references/typography.md`.

## Iconos en 4 líneas

- Librería Figma `icons` (file `kYsnknQmkgVfiawkU6baZb`). Nombres en inglés, minúscula y guion, por lo que se ve (`house`, no `home`).
- **Outline** por defecto; **Filled** solo para activo/seleccionado. No mezcles en un mismo conjunto.
- Tamaños: 16 (denso), **24 (base)**, 32 (empty states, onboarding). Color con `ink/*`.
- Ícono funcional siempre con label accesible y área táctil de 48px.

## Estados interactivos (mientras `interactive/*` esté vacío)

Los tokens `interactive/*` existen pero valen transparente (`#FFFFFF00`). No los uses solos: no se vería nada.

- **Hover / pressed:** superposición del color base (ej. `ink/strong` al 8% / 12%) y marca "⚠️ sin valor oficial en `interactive/*`".
- **Focus:** anillo de stroke `selected` (2px) con `line/border-strong`. ⚠️ No hay token de foco oficial (`line/border-focus` e `interactive/focus` **no existen**).
- **Disabled:** es un **estado**, no una variante. `background/disabled` + `ink/disabled`.

## Accesibilidad (mínimos WCAG 2.2 AA)

- Texto normal 4.5:1 · texto grande y elementos de UI 3:1.
- `ink/accent`, `ink/error`, `ink/warning` e `ink/recommendation` **no pasan 4.5:1** en texto de cuerpo. Úsalos en íconos, texto grande o acompañados de ícono.
- **Botón primario:** respeta el componente oficial (`ink/inverse-on`), pero en revisiones de accesibilidad **señala** el 2.2:1. Alternativa que pasa: `ink/strong-on` (9.6:1).
- Nunca comuniques un estado solo con color: suma ícono o texto.

## Flujo de trabajo

**Antes de diseñar**, identifica el pedido y lee **solo** lo necesario:

| Pedido | Lee |
|---|---|
| Elegir o revisar colores, contraste | `references/colors.md` |
| Jerarquía de texto, text styles, escala por breakpoint | `references/typography.md` |
| Layout, márgenes, grilla | `references/spacing-shape.md` + `references/site/foundations/layout.md` |
| Radios de card | `references/spacing-shape.md` (tokens) + `site/foundations/cards-border-radius.md` (criterio) |
| Sombras y elevación | `references/site/foundations/elevation.md` (⚠️ sin tokens) |
| Botón (variantes, tamaños, props) | `references/components.md` + `references/site/components/button.md` |
| Card, chip, input, alert, modal, skeleton | `references/components.md` |
| HTML / CSS / React | `references/code-usage.md` + `assets/tokens.css` |
| Iconos | `references/site/foundations/icons.md` |
| Ilustraciones 3D | `references/site/foundations/illustrations-3d.md` |
| Animación y transiciones | `references/site/foundations/motion.md` |
| Vibración / feedback háptico | `references/site/foundations/haptics.md` (borrador) |
| Revisión de accesibilidad | `references/site/foundations/accessibility.md` |
| Copies, microcopy, errores, CTAs | `references/voice-and-tone.md` (secciones "Microcopy", "Botones / Links", "Escenarios de error") |
| **Copies para repartidores (Soy Rappi)** | `references/voice-and-tone.md`, sección **"Palabras con restricción de uso"**. Obligatorio: hay riesgo legal |
| Principios para defender una decisión | `references/site/principles/design-principles.md` |
| Valor exacto que no aparece arriba | `assets/rappi-design-tokens.json` |

**Patrones de flujo** (`references/site/patterns/`), léelos cuando diseñes esa pantalla o flujo:

| Diseñas… | Archivo |
|---|---|
| Agregar al carrito, stepper de cantidad | `add-product.md` |
| Modales, bottom sheets, pantallas completas | `modality.md` |
| Diálogos de confirmación | `dialogs.md` |
| Pantallas vacías o de error | `empty-states.md` |
| Estados de carga | `loading-skeleton.md` |
| Búsqueda y resultados | `search.md` |
| Login, onboarding, ajustes | `login.md`, `onboarding.md`, `settings.md` |
| Paso del home o menú a una tienda | `transitions-to-stores.md` |

**Al hacer un mockup o prototipo HTML:**

1. Pega el contenido de `assets/tokens.css` dentro de un `<style>` (no enlaces archivos externos) y usa solo variables `--rp-*`. Para texto, usa las clases de text style (`.rp-text-body-regular`, `.rp-text-h2-medium`…).
2. Fuente: `font-family: "PP Object Sans", "Inter", system-ui, sans-serif;` (PP Object Sans no está en Google Fonts; Inter es el fallback visual).
3. Diseña mobile-first (360–390px de ancho) salvo que pidan otra cosa.
4. Cubre estados: default, hover, pressed, focus, disabled, loading (skeleton), vacío y error.
5. Copies en español LatAm, tuteo, frases cortas y verbos de acción.

**Al entregar**, añade una tabla corta "Tokens usados" (elemento → token) y lista cualquier "⚠️ sin token oficial" que hayas usado.

## Voz de Rappi en 5 reglas

- Cercana, informal y directa. Habla de **tú**.
- Frases cortas, verbo primero en CTAs ("Pide ya", "Agrega a tu carrito").
- Cero tecnicismos y cero traducciones literales del inglés.
- En errores: qué pasó + qué hacer ahora, sin culpar al usuario.
- Si hay duda, da 2 o 3 variantes y explica el porqué de cada una.

## Críticas de diseño

Sé directo: señala hex hardcodeados, tokens inexistentes o mal usados (ej. `ink/accent` en texto de cuerpo, `ink/strong` sobre `background/offer`), Archivo Black fuera de `banner-bigFont`, áreas táctiles menores a 48px, estados faltantes, jerarquía confusa y copies que no suenan a Rappi. Siempre con alternativa concreta.

## Lo que aún está en construcción

- `interactive/*` sin valores oficiales (ver "Estados interactivos"). No hay token de foco.
- **Radius:** semánticos solo `card` (24) y `pill`. Hay escala primitiva (2 a 32…) sin semántico: si necesitas otro radio, usa el primitivo más cercano y **dilo**. El sitio los llama `borderRadius1…8`: son nombres heredados.
- **Stroke:** tokens `none` / `standard` (1) / `selected` (2). El sitio nombra `strokeSmall` (0.5), sin token.
- **Elevación:** el sitio define 4 niveles (Elevated, Strong, Hard, -Y) y sombras de botón (Green, Rappi), pero **no hay tokens ni valores** exportados. Nómbralos por nivel y marca "⚠️ sin token oficial".
- **Tipografía:** en Tablet `h1`–`h4` son menores que en Mobile, y algunos text styles tienen variables mal ligadas en Figma (ver "Revisión pendiente en Figma" en `references/typography.md`). Confirma con el equipo de DS antes de asumirlos.
- **Temas:** solo User App; hay 12 temas de producto más en Figma (RT App, Aliados, Pay, Cargo…).
- **Componentes:** solo Button tiene ficha completa. Para anatomía exacta de otros, léelos en Figma con `rappi-component-docs`.

{{SITE_GUIDES}}
