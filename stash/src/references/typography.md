# Tipografía (Mustache)

Fuente: Figma **semantics**, colección de variables `Typography` (modos Mobile / Tablet / Desktop) y sus **39 text styles**. Variable CSS: `--rp-type-<familia>-<propiedad>-<rol>` (ej. `--rp-type-pp-object-sans-size-body`); en `assets/tokens.css` ya vienen resueltas por breakpoint.

## Reglas

- Elige por **rol** (h1, headline, body…), no por tamaño. Un rol = size + line-height del mismo breakpoint.
- Breakpoints: **Mobile** (<600px), **Tablet** (≥600px), **Desktop** (≥1024px).
- Pesos en uso: **Regular (400)** y **Medium (500)**. Medium reemplazó a Bold. Los estilos `*Bold` existen en Figma por legado: no los uses en diseño nuevo. La variable `weight/Heavy` existe pero no tiene text style.
- Cuerpo mínimo **16px** (`body`). `caption-1` (14) y `caption-2` (12) solo para apoyo y metadatos. `label` (10) solo para tags y badges cortos.
- `footnote` (8), `disclaimer` (6) y `legal` (4) están en Figma pero **son ilegibles en pantalla**. Si un legal lo exige, usa `caption-2` (12) como mínimo y avísalo.
- Jerarquía con peso Medium y tamaño, no con color de marca.
- PP Object Sans no está en Google Fonts: en HTML usa `font-family: "PP Object Sans", "Inter", system-ui, sans-serif;` y avisa que el render final usa la fuente licenciada.

## Familias

| Familia | Variable Figma | CSS | Uso |
|---|---|---|---|
| PP Object Sans | `PP Object sans/family/title` | `--rp-font-family-title` | `huge` a `subheadline` |
| PP Object Sans | `PP Object sans/family/content` | `--rp-font-family-content` | `body` a `legal` |
| Archivo Black | `Archivo Black/family/title` | `--rp-font-family-display` | **Solo el componente `banner-bigFont`** (`hugeTitle*`) |

## Escala PP Object Sans (size / line-height, px)

| Rol | Nota | Mobile | Tablet | Desktop | Tracking |
|---|---|---|---|---|---|
| `huge` | — | 48 / 48 | 64 / 72 | 64 / 72 | 0 |
| `h1` | — | 40 / 40 | 28 / 34 | 40 / 48 | 0 |
| `h2` | — | 32 / 40 | 24 / 32 | 32 / 40 | 0 |
| `h3` | — | 26 / 32 | 20 / 28 | 24 / 32 | 0 |
| `h4` | — | 24 / 32 | 18 / 26 | 20 / 26 | 0 |
| `headline` | — | 20 / 24 | 20 / 24 | 18 / 24 | 0 |
| `subheadline` | Eyebrow / overline | 10 / 24 | 10 / 16 | 10 / 24 | 12% · MAYÚSCULAS |
| `body` | Texto base | 16 / 20 | 16 / 24 | 16 / 24 | 0 |
| `caption-1` | Apoyo y metadatos | 14 / 16 | 14 / 20 | 14 / 20 | 0 |
| `caption-2` | Metadatos (mínimo en UI) | 12 / 16 | 12 / 18 | 12 / 18 | 0 |
| `label` | Tags y badges cortos | 10 / 12 | 10 / 14 | 10 / 16 | 0 |
| `footnote` | No usar en pantalla | 8 / 12 | 8 / 12 | 8 / 12 | 0 |
| `disclaimer` | No usar en pantalla | 6 / 8 | 6 / 8 | 6 / 8 | 0 |
| `legal` | No usar en pantalla | 4 / 6 | 4 / 6 | 4 / 6 | 0 |

> `subheadline`: la variable `line-height/subheadline` vale 24 / 16 / 24, pero los text styles están ligados a `line-height/headline` (24 en todos los breakpoints). Ver "Revisión pendiente en Figma".

## Archivo Black · exclusiva de banner-bigFont

Archivo Black **solo se usa en el componente `banner-bigFont`** (librería `mobile-library` Rappi 8, file `j7dMt2KutCl1U0BUZN1jqu`, component set `80487:204`), para la cifra o el titular protagonista (ej. el % OFF). **No es una fuente display general:** no la uses en otros banners, pantallas, héroes ni piezas de marketing. Si alguien la pide fuera de bigFont, avísalo y usa PP Object Sans (`huge` o `h1`). El resto del texto del bigFont va en PP Object Sans.

Tracking **−4%** en todos. Line-height menor que el size a propósito: titulares de 1 o 2 líneas, nunca en párrafos.

Los text styles están ligados a `Archivo Black/size/*` y `Archivo Black/line-height/*`: escalan por breakpoint igual en Figma y en CSS (corregido el 1 oct 2026; antes estaban fijos al valor Mobile).

| Rol | Mobile | Tablet | Desktop | Cuándo (dentro del bigFont) |
|---|---|---|---|---|
| `hugeTitleL` | 46 / 34 | 52 / 40 | 64 / 48 | El protagonista: la cifra estrella (precio, % de descuento o nombre del evento). Uno por banner. |
| `hugeTitleM` | 40 / 32 | 48 / 34 | 56 / 40 | El titular de apoyo: titular principal cuando el banner tiene imagen fuerte o poco espacio. |
| `hugeTitleS` | 30 / 26 | 32 / 28 | 46 / 34 | El contenido: banners compactos, formatos verticales o cuando acompaña a otro elemento sin robar el foco. |

## Text styles (39)

Nombre en Figma: `rol/rolPeso`. Clase CSS (en `assets/tokens.css`): `.rp-text-<rol>-<peso>`. Valores Mobile; la clase escala sola por breakpoint.

| Text style | Clase CSS | Fuente | Size / LH | Tracking |
|---|---|---|---|---|
| `huge/hugeBold` (legado) | `.rp-text-huge-bold` | PP Object Sans Bold (700) | 48 / 48 | 0 |
| `huge/hugeMedium` | `.rp-text-huge-medium` | PP Object Sans Medium (500) | 48 / 48 | 0 |
| `huge/hugeRegular` | `.rp-text-huge-regular` | PP Object Sans Regular (400) | 48 / 48 | 0 |
| `h1/h1Bold` (legado) | `.rp-text-h1-bold` | PP Object Sans Bold (700) | 40 / 40 | 0 |
| `h1/h1Medium` | `.rp-text-h1-medium` | PP Object Sans Medium (500) | 40 / 40 | 0 |
| `h1/h1Regular` | `.rp-text-h1-regular` | PP Object Sans Regular (400) | 40 / 40 | 0 |
| `h2/h2Bold` (legado) | `.rp-text-h2-bold` | PP Object Sans Bold (700) | 32 / 40 | 0 |
| `h2/h2Medium` | `.rp-text-h2-medium` | PP Object Sans Medium (500) | 32 / 40 | 0 |
| `h2/h2Regular` | `.rp-text-h2-regular` | PP Object Sans Regular (400) | 32 / 40 | 0 |
| `h3/h3Bold` (legado) | `.rp-text-h3-bold` | PP Object Sans Bold (700) | 26 / 32 | 0 |
| `h3/h3Medium` | `.rp-text-h3-medium` | PP Object Sans Medium (500) | 26 / 32 | 0 |
| `h3/h3Regular` | `.rp-text-h3-regular` | PP Object Sans Regular (400) | 26 / 32 | 0 |
| `h4/h4Bold` (legado) | `.rp-text-h4-bold` | PP Object Sans Bold (700) | 24 / 32 | 0 |
| `h4/h4Medium` | `.rp-text-h4-medium` | PP Object Sans Medium (500) | 24 / 32 | 0 |
| `h4/h4Regular` | `.rp-text-h4-regular` | PP Object Sans Regular (400) | 24 / 32 | 0 |
| `headline/headlineBold` (legado) | `.rp-text-headline-bold` | PP Object Sans Bold (700) | 20 / 24 | 0 |
| `headline/headlineMedium` | `.rp-text-headline-medium` | PP Object Sans Medium (500) | 20 / 24 | 0 |
| `headline/headlineRegular` | `.rp-text-headline-regular` | PP Object Sans Regular (400) | 20 / 24 | 0 |
| `subheadline/subheadlineBold` (legado) | `.rp-text-subheadline-bold` | PP Object Sans Bold (700) | 10 / 24 | 12%, uppercase |
| `subheadline/subheadlineMedium` | `.rp-text-subheadline-medium` | PP Object Sans Medium (500) | 10 / 24 | 12%, uppercase |
| `subheadline/subheadlineRegular` | `.rp-text-subheadline-regular` | PP Object Sans Regular (400) | 10 / 24 | 12%, uppercase |
| `body/bodyBold` (legado) | `.rp-text-body-bold` | PP Object Sans Bold (700) | 16 / 20 | 0 |
| `body/bodyMedium` | `.rp-text-body-medium` | PP Object Sans Medium (500) | 16 / 20 | 0 |
| `body/bodyRegular` | `.rp-text-body-regular` | PP Object Sans Regular (400) | 16 / 20 | 0 |
| `caption-1/caption1Bold` (legado) | `.rp-text-caption-1-bold` | PP Object Sans Bold (700) | 14 / 16 | 0 |
| `caption-1/caption1Medium` | `.rp-text-caption-1-medium` | PP Object Sans Medium (500) | 14 / 16 | 0 |
| `caption-1/caption1Regular` | `.rp-text-caption-1-regular` | PP Object Sans Regular (400) | 14 / 16 | 0 |
| `caption-2/caption2Bold` (legado) | `.rp-text-caption-2-bold` | PP Object Sans Bold (700) | 12 / 16 | 0 |
| `caption-2/caption2Medium` | `.rp-text-caption-2-medium` | PP Object Sans Medium (500) | 12 / 16 | 0 |
| `caption-2/caption2Regular` | `.rp-text-caption-2-regular` | PP Object Sans Regular (400) | 12 / 16 | 0 |
| `label/labelBold` (legado) | `.rp-text-label-bold` | PP Object Sans Bold (700) | 10 / 12 | 0 |
| `label/labelMedium` | `.rp-text-label-medium` | PP Object Sans Medium (500) | 10 / 12 | 0 |
| `label/labelRegular` | `.rp-text-label-regular` | PP Object Sans Regular (400) | 10 / 12 | 0 |
| `footnote/footnoteRegular` | `.rp-text-footnote-regular` | PP Object Sans Regular (400) | 8 / 12 | 0 |
| `disclaimer/disclaimerRegular` | `.rp-text-disclaimer-regular` | PP Object Sans Regular (400) | 6 / 8 | 0 |
| `legal/legalRegular` | `.rp-text-legal-regular` | PP Object Sans Regular (400) | 4 / 6 | 0 |
| `Archivo-Black/hugeTitleL` | `.rp-text-hugetitlel` | Archivo Black Regular | 46 / 34 | −4% |
| `Archivo-Black/hugeTitleM` | `.rp-text-hugetitlem` | Archivo Black Regular | 40 / 32 | −4% |
| `Archivo-Black/hugeTitleS` | `.rp-text-hugetitles` | Archivo Black Regular | 30 / 26 | −4% |

## CSS

```css
.titulo { /* o usa directamente class="rp-text-h2-medium" */
  font-family: var(--rp-font-family-title);
  font-weight: var(--rp-font-weight-medium);
  font-size: var(--rp-type-pp-object-sans-size-h2);
  line-height: var(--rp-type-pp-object-sans-line-height-h2);
}
```

Las variables `--rp-type-*-weight-*` de Figma son strings ("Medium"): en CSS usa `--rp-font-weight-regular` (400), `--rp-font-weight-medium` (500) y `--rp-font-weight-bold` (700).

## Revisión pendiente en Figma

Inconsistencias encontradas en semantics (30 sep 2026). No las corrijas en diseño: repórtalas al equipo de DS.

- **`subheadline/*`** usan `line-height/headline` en vez de `line-height/subheadline`: en Tablet dan 24 en vez de 16.
- **`h1/h1Regular`** tiene el peso ligado al primitivo `font/weight/Regular`, no a `PP Object sans/weight/Regular`.
- **`legal/legalRegular`** tiene size y line-height ligados a primitivos (`font/size/4`, `font/line-height/6`).
- En Tablet, **`size/h1` (28)** y **`line-height/h3` (28)** son valores fijos, sin alias a primitivo.
- En Tablet, **`h1`–`h4` son más chicos que en Mobile** (ej. `h1` 28 vs 40). Parece un error de la data: confirma antes de diseñar para tablet.
- No hay variables de **letter-spacing** ni de **text-case**: el 12% + MAYÚSCULAS de `subheadline` y el −4% de Archivo Black solo viven en el text style.
