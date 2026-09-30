# Spacing, radius y stroke (Mustache)

Base 4/8. Usa el token, no el número suelto. Prefiere los tokens de **intención** (`horizontal/*`, `vertical/*`) cuando describan tu caso: comunican el porqué.

Variables CSS: `--rp-space-16`, `--rp-space-h-between-cards`, `--rp-space-v-between-sections`, `--rp-radius-card`, `--rp-stroke-standard`.

## Guía rápida

- Margen lateral de pantalla: `horizontal/inside-screen` (24).
- Entre secciones: `vertical/between-sections` (32).
- Debajo del header: `vertical/below-header` (16).
- Entre cards: `horizontal/between-cards` (16). Entre chips: `horizontal/between-chips` (8).
- Botones anclados abajo: `vertical/docked-buttons` (20).
- Radio de cards, sheets y modales: `card` (24). Botones, chips y pills: `pill` (1000).
- Bordes: `standard` (1px). Selección: `selected` (2px).

> **En construcción:** el DS aún no tiene tokens semánticos completos de border radius (solo `card` y `pill`) ni de elevación (el sitio define niveles de elevación sin valores, ver `site/foundations/elevation.md`). Si necesitas otro radio, usa el valor primitivo más cercano (2, 4, 8, 12, 16, 20…) y **dilo explícitamente** para que se revise.

## Spacing (semántico)

CSS: `--rp-space-*`. Los `spacing-N` son la escala base; los de `horizontal/` y `vertical/` son intenciones de layout.

> En Figma estos tokens llevan el prefijo `✍️` (ej. `horizontal/✍️ between-chips`). Aquí se omite; en CSS no existe.

| Token | px |
|---|---|
| `horizontal/between-chips` | 8 |
| `horizontal/between-cards` | 16 |
| `horizontal/between-buttons` | 16 |
| `horizontal/between-products-2col` | 24 |
| `horizontal/between-products-3col` | 12 |
| `horizontal/between-default` | 12 |
| `horizontal/inside-screen` | 24 |
| `horizontal/none` | 0 |
| `vertical/below-header` | 16 |
| `vertical/between-sections` | 32 |
| `vertical/docked-buttons` | 20 |
| `vertical/margin-top-bottom` | 8 |
| `vertical/none` | 0 |
| `spacing-0` | 0 |
| `spacing-2` | 2 |
| `spacing-4` | 4 |
| `spacing-6` | 6 |
| `spacing-8` | 8 |
| `spacing-10` | 10 |
| `spacing-12` | 12 |
| `spacing-16` | 16 |
| `spacing-20` | 20 |
| `spacing-24` | 24 |
| `spacing-32` | 32 |
| `spacing-40` | 40 |
| `spacing-48` | 48 |
| `spacing-56` | 56 |
| `spacing-64` | 64 |

## Radius

| Token | px | CSS |
|---|---|---|
| `card` | 24 | `--rp-radius-card` |
| `pill` | 1000 | `--rp-radius-pill` |

## Stroke

| Token | px | CSS |
|---|---|---|
| `none` | 0 | `--rp-stroke-none` |
| `standard` | 1 | `--rp-stroke-standard` |
| `selected` | 2 | `--rp-stroke-selected` |

