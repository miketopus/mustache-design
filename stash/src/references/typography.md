# Tipografía (Mustache)

## Familias

- **PP Object Sans**: familia del sistema para títulos y contenido. Pesos en uso: **Regular (400)** y **Medium (500)**. Medium reemplazó a Bold como peso de énfasis.
- **Archivo Black**: solo display / `hugeTitle` (titulares de marketing, héroes, banners). Nunca en cuerpo de texto.
- PP Object Sans **no está en Google Fonts**. En mockups HTML usa `font-family: "PP Object Sans", "Inter", system-ui, sans-serif;` y avisa que el render final usa la fuente licenciada.

## Reglas

- Elige por **rol** (h1, h2, headline, body, caption…), no por tamaño.
- Un rol = tamaño + line-height del mismo breakpoint. No mezcles el size de Mobile con el line-height de Desktop.
- Breakpoints: **Mobile** (<600px), **Tablet** (≥600px), **Desktop** (≥1024px).
- Cuerpo de texto mínimo **16px** (`body`). `caption-1` (14) y `caption-2` (12) solo para metadatos.
- Jerarquía con peso Medium y tamaño, no con color de marca.
- Variable CSS: `--rp-type-pp-object-sans-size-body`, `--rp-type-pp-object-sans-line-height-body`, etc. (en `tokens.css` ya vienen resueltas por breakpoint).

## Escala (px, size / line-height)

| Rol | Familia | Mobile (size/lh) | Tablet | Desktop |
|---|---|---|---|---|
| `hugeTitleL` | Archivo Black | 46 / 34 | 52 / 40 | 64 / 48 |
| `hugeTitleM` | Archivo Black | 40 / 32 | 48 / 34 | 56 / 40 |
| `hugeTitleS` | Archivo Black | 30 / 26 | 32 / 28 | 46 / 34 |
| `huge` | PP Object Sans | 48 / 48 | 64 / 72 | 64 / 72 |
| `h1` | PP Object Sans | 40 / 40 | 28 / 34 | 40 / 48 |
| `h2` | PP Object Sans | 32 / 40 | 24 / 32 | 32 / 40 |
| `h3` | PP Object Sans | 26 / 32 | 20 / 28 | 24 / 32 |
| `h4` | PP Object Sans | 24 / 32 | 18 / 26 | 20 / 26 |
| `headline` | PP Object Sans | 20 / 24 | 20 / 24 | 18 / 24 |
| `subheadline` | PP Object Sans | 10 / 24 | 10 / 16 | 10 / 24 |
| `body` | PP Object Sans | 16 / 20 | 16 / 24 | 16 / 24 |
| `caption-1` | PP Object Sans | 14 / 16 | 14 / 20 | 14 / 20 |
| `caption-2` | PP Object Sans | 12 / 16 | 12 / 18 | 12 / 18 |
| `label` | PP Object Sans | 10 / 12 | 10 / 14 | 10 / 16 |
| `footnote` | PP Object Sans | 8 / 12 | 8 / 12 | 8 / 12 |
| `disclaimer` | PP Object Sans | 6 / 8 | 6 / 8 | 6 / 8 |
| `legal` | PP Object Sans | 4 / 6 | 4 / 6 | 4 / 6 |

## Notas de calidad de la data

- Los roles `footnote` (8), `disclaimer` (6) y `legal` (4) están en Figma pero **son ilegibles en pantalla**. No los uses para texto de UI; si un legal lo exige, usa `caption-2` (12) como mínimo y avisa.
- `subheadline` tiene size 10 con line-height 24: tratarlo como overline/eyebrow en mayúsculas, no como subtítulo.
- En **Tablet**, `h1`–`h4` son más pequeños que en Mobile (ej. `h1` 28 vs 40). Parece una inconsistencia de la data: si diseñas para tablet, confirma con el equipo de DS antes de asumirlo.
- Los `hugeTitle` (Archivo Black) tienen line-height menor que el size (interlineado negativo). Es intencional para titulares cortos de 1 o 2 líneas; no lo uses en párrafos.
- La colección también expone pesos `Heavy` y `Bold`; el criterio vigente del DS es **Regular + Medium**.
