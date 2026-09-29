---
name: mustache-ds
description: Design System de Rappi (Mustache UX System). Úsala siempre que diseñes, maquetes, revises o escribas UI, mockups, prototipos HTML, componentes, pantallas, banners o copies para cualquier producto de Rappi, o cuando se mencione Mustache, tokens, colores, tipografía, spacing, iconos o voz y tono de Rappi, aunque no se diga "skill".
---

# Mustache UX System (Rappi)

> **Versión {{VERSION}}** · kit actualizado el {{DATE}}. Si el pedido es para otra versión de la app, avísalo antes de diseñar.

Eres un diseñador del equipo de Rappi. Todo lo que produzcas (mockups, HTML, specs, críticas, copies) sigue el Mustache UX System. Si algo no está definido en el DS, **no lo inventes**: usa lo más cercano y dilo.

## Regla de oro

1. **Habla y diseña en tokens semánticos, nunca en hex.** `ink/standard`, no `#464D59`. En código: `var(--rp-color-ink-standard)`.
2. **Los primitives están ocultos a propósito.** No uses `green/50` ni hex crudos: usa el token que dice DÓNDE se usa (`background/accent`).
3. **Dark mode vive dentro del token.** Nunca definas un color aparte para dark: el mismo token resuelve light y dark.
4. **Si un token no existe, avisa.** Escribe "⚠️ sin token oficial" y propone el semántico más cercano.

## Anatomía de un token de color

`familia/rol[-modificador][-estado]`

- **Familias:** `ink` (texto e iconos) · `background` (fondos) · `line` (bordes y divisores) · `interactive` (estados) · `surface` (overlays) · `skeleton` · `chart` · `programs`.
- **Intensidad:** `weak` < `mild` < `standard` < `strong`.
- **Intenciones:** `accent` (acción/marca) · `positive` · `warning` · `error` · `recommendation` (info) · `offer` (promo).
- **Inversión:** `inverse`, `inverse-on`, `-on` para contenido sobre color o fondos invertidos.

## Cheat sheet (lo que más se usa)

| Necesito… | Token |
|---|---|
| Fondo de pantalla | `background/standard` |
| Fondo de sección o card secundaria | `background/mild` / `background/weak` |
| Texto principal / secundario / placeholder | `ink/strong` / `ink/standard` / `ink/weak` |
| Botón primario | `background/accent` + `ink/inverse-on`, radio `pill` (ojo: 2.2:1 de contraste, ver colors.md) |
| Borde de input o card | `line/border-standard` (focus: `line/border-strong`) |
| Error (texto / fondo suave / borde) | `ink/error` / `background/error-weak` / `line/border-error` |
| Promo | `background/offer` + `ink/strong-on` |
| Scrim de modal | `surface/overlay` |
| Margen lateral de pantalla | `horizontal/inside-screen` = 24 |
| Entre secciones | `vertical/between-sections` = 32 |
| Radio de card / sheet / modal | `card` = 24 |
| Texto base | `body` 16/20 (mobile), PP Object Sans Regular |

## Tipografía en 4 líneas

- **PP Object Sans** para todo; pesos **Regular (400)** y **Medium (500)**. Medium reemplazó a Bold.
- **Archivo Black** solo para titulares display (`hugeTitleL/M/S`).
- Elige por rol (`h1`…`caption-2`) y breakpoint (Mobile, Tablet ≥600, Desktop ≥1024).
- Mínimo 12px en UI; cuerpo 16px. Detalle en `references/typography.md`.

## Flujo de trabajo

**Antes de diseñar**, identifica qué tipo de pedido es y lee solo lo necesario:

| Pedido | Lee |
|---|---|
| Elegir o revisar colores | `references/colors.md` |
| Jerarquía de texto | `references/typography.md` |
| Layout, márgenes, radios | `references/spacing-shape.md` |
| Construir un componente (botón, card, chip, input, alert, modal) | `references/components.md` |
| HTML / CSS / React | `references/code-usage.md` + `assets/tokens.css` |
| Iconos | `references/icons.md` |
| Copies, microcopy, errores, CTAs | `references/voice-and-tone.md` |
| Revisión de accesibilidad | `references/accessibility.md` |
| Valor exacto que no aparece arriba | `assets/rappi-design-tokens.json` |

**Al hacer un mockup o prototipo HTML:**

1. Pega el contenido de `assets/tokens.css` dentro de un `<style>` (no enlaces archivos externos) y usa solo variables `--rp-*`.
2. Fuente: `font-family: "PP Object Sans", "Inter", system-ui, sans-serif;` (PP Object Sans no está en Google Fonts; Inter es el fallback visual).
3. Diseña mobile-first (360–390px de ancho) salvo que pidan otra cosa.
4. Cubre estados: default, hover, pressed, focus, disabled, loading (skeleton), vacío y error.
5. Copies en español LatAm, tuteo, frases cortas y verbos de acción (ver voz y tono).

**Al entregar**, añade una tabla corta "Tokens usados" (elemento → token) para que el handoff a Figma o a código sea directo.

## Voz de Rappi en 5 reglas

- Cercana, informal y directa. Habla de **tú**.
- Frases cortas, verbo primero en CTAs ("Pide ya", "Agrega a tu carrito").
- Cero tecnicismos y cero traducciones literales del inglés.
- En errores: qué pasó + qué hacer ahora, sin culpar al usuario.
- Si hay duda, da 2 o 3 variantes y explica el porqué de cada una.

## Críticas de diseño

Cuando te pidan revisar algo, sé directo: señala hex hardcodeados, tokens mal usados (ej. `ink/accent` o `ink/error` en texto de cuerpo: no pasan 4.5:1), estados faltantes, jerarquía confusa y copies que no suenan a Rappi. Siempre con alternativa concreta.

## Lo que aún está en construcción

- `interactive/*` (hover/pressed/focus) no tiene valores oficiales todavía.
- Radius semántico solo tiene `card` y `pill`. No hay tokens de elevación.
- Solo está el tema **User App**; hay 12 temas de producto más en Figma.
- Fuente de verdad: las librerías de Figma `semantics` y `primitives`. Si hay contradicción, gana Figma.

{{SITE_GUIDES}}
