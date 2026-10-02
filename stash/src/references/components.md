# Guía de componentes Rappi → código

Cómo construir componentes del Mustache UX System en código mapeando su anatomía a tokens semánticos. Habla siempre en tokens (`--rp-*`), nunca en hex.

> Esta guía cubre el patrón y el mapeo de tokens. Para la anatomía exacta (medidas, variantes y props oficiales) de un componente puntual, léelo desde Figma con el MCP de Figma (skill `rappi-component-docs`) y trae sus tokens; no inventes valores.

## Principios

1. **Superficie:** el fondo del componente sale de `background/*`; el texto e iconos, de `ink/*`; los bordes, de `line/*`.
2. **Estados:** cada componente interactivo cubre `default / hover / pressed / focus / disabled`. En **mobile** (User App) hover y foco no aplican: `interactive/*` es N/A. En **web** usa `interactive/bg-<fondo>-hover` / `-pressed` y foco `interactive/border-focus` con los valores del tema web en Figma.
3. **Forma:** radios desde `radius/*` (`card` = 24, `pill` = 1000), grosores desde `stroke/*` (`standard` = 1, `selected` = 2).
4. **Ritmo:** paddings y gaps desde `--rp-space-*`. Prefiere los de intención (`horizontal/between-buttons`, `vertical/docked-buttons`) cuando aplique.
5. **Texto:** tamaño y line-height por rol tipográfico (`--rp-type-*`), respetando el breakpoint.
6. **Área táctil:** mínimo 48×48px y 8px entre áreas táctiles, aunque el elemento visual sea más chico.

## Feedback / semántica de color

| Intención | Token de fondo | Token de fondo suave | Token de texto/icono |
|---|---|---|---|
| Acento / marca | `background/accent` | `background/accent-weak` | `ink/accent` |
| Positivo / éxito | `background/positive` | `background/positive-weak` | `ink/positive` |
| Advertencia | `background/warning` | `background/warning-weak` | `ink/warning` |
| Error | `background/error` | `background/error-weak` | `ink/error` |
| Recomendación / info | `background/recommendation` | `background/recommendation-weak` | `ink/recommendation` |
| Oferta | `background/offer` | `background/offer-weak` | `ink/strong-on` sobre `offer` · `ink/strong` sobre `offer-weak` |

## Botón

Componente `flexible` de mobile-library Rappi 8 (Figma `j7dMt2KutCl1U0BUZN1jqu`, set `40115:170`).

- **Estilos:** `primary` (acción principal, una por vista) · `secondary` (apoyo) · `tertiary` (menor énfasis, con borde).
- **Tamaños:** `xSmall` 24 · `small` 32 · `medium` 40 · `large` 48 · `xLarge` 56. Padding lateral 8 · 16 · 16 · 24 · 28. Texto `caption-2` (xSmall), `caption-1` (small, medium), `body` (large, xLarge), siempre Medium. Por debajo de `large`, extiende el área táctil a 48px.
- **Estados:** `enable` · `loading` (3 puntos en lugar del label) · `disable` · `skeleton`. `disable` es un estado, no un estilo.
- **Ícono:** a la izquierda o a la derecha (nunca los dos), o solo ícono (`label=false`, cuadrado del alto del tamaño). `loading` no existe con ícono + label. Ícono 16 (xSmall), 20 (small), 24 (resto).
- **Tokens:**

| style · state | Fondo | Texto / ícono | Borde |
|---|---|---|---|
| primary | `background/accent` | `ink/inverse-on` | — |
| secondary | `background/weak` | `ink/strong` | — |
| tertiary | `background/standard` | `ink/strong` | `stroke/standard` + `line/border-standard` |
| primary · disable | `background/disabled` | `ink/disabled` | — |
| secondary / tertiary · disable | el de su estilo | `ink/disabled` | el de su estilo |
| loading | el de su estilo | puntos `ink/inverse-on` (primary) · `ink/strong` (secondary, tertiary) | el de su estilo |
| skeleton | `skeleton/standard` | `skeleton/standard` | — |

- Radio `radius/pill`. ⚠️ `primary` da 2.2:1 de contraste: si piden revisión de accesibilidad, señálalo (alternativa: `ink/strong-on`, 9.6:1).
- **Hover / pressed / focus:** no son variantes en Figma y no aplican en mobile. En web: primary → `interactive/bg-accent-hover` / `-pressed`, secondary → `interactive/bg-weak-*`, tertiary → `interactive/bg-standard-*`; foco → `interactive/border-focus` (stroke `selected`, 2px, separación 2px).

```css
.rp-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: 40px; padding: 0 16px;              /* medium */
  border-radius: var(--rp-radius-pill);
  font-family: var(--rp-font-family-content);
  font-weight: var(--rp-font-weight-medium);
  font-size: var(--rp-type-pp-object-sans-size-caption-1);
}
.rp-btn--primary   { background: var(--rp-color-background-accent);   color: var(--rp-color-ink-inverse-on); }
.rp-btn--secondary { background: var(--rp-color-background-weak);     color: var(--rp-color-ink-strong); }
.rp-btn--tertiary  { background: var(--rp-color-background-standard); color: var(--rp-color-ink-strong);
                     border: var(--rp-stroke-standard) solid var(--rp-color-line-border-standard); }
.rp-btn:disabled          { color: var(--rp-color-ink-disabled); }
.rp-btn--primary:disabled { background: var(--rp-color-background-disabled); }
```

## Card

- Fondo `background/standard` (o `background/on-top` si va sobre otra superficie), radio `radius/card`, borde opcional `stroke/standard` + `line/border-standard`, padding interno `--rp-space-16`.
- Título rol `h4`/`headline`, cuerpo rol `body`, texto secundario `ink/weak`.

## Chip

- Fondo `background/weak` (default) o `background/accent-weak` (seleccionado), radio `radius/pill`, texto `ink/standard`, gap entre chips `--rp-space-h-between-chips` (8).
- Seleccionado: borde `stroke/selected` + `line/border-accent`, texto `ink/accent`.

## Input / Campo de texto

- Fondo `background/standard`, borde `stroke/standard` + `line/border-standard`, texto `ink/strong`, placeholder `ink/weak`, alto mínimo 48px.
- **Radio:** ⚠️ sin token semántico para inputs. Léelo del componente en Figma; si no está disponible, usa el primitivo más cercano al componente y avísalo (no uses `card` = 24 por defecto).
- **Focus:** borde `stroke/selected` + `line/border-strong`.
- **Error:** borde `line/border-error`, mensaje con ícono de error. Texto del mensaje en `ink/error` solo si es Medium ≥14px; si no, `ink/strong` + ícono `ink/error`.
- **Disabled:** fondo `background/disabled`, texto `ink/disabled`.

## Banner / Alert

- Fondo `background/<intención>-weak`, **texto `ink/strong`**, ícono `ink/<intención>` (los `ink/<intención>` no pasan 4.5:1 en texto). Radio `radius/card`, padding `--rp-space-12`/`--rp-space-16`.

## Separadores y bordes

- Línea divisoria estándar: `line/border-standard`. Borde sutil no opaco: `line/border-non-opaque`. Borde fuerte: `line/border-strong`.

## Overlays / modales

- Fondo de scrim: `surface/overlay` (oscuro) o `surface/overlay-weak`. Contenedor del modal: `background/standard` (o `background/on-top` en dark) + `radius/card`.
- Cuándo usar modal, bottom sheet o pantalla completa: `site/patterns/modality.md`. Elevación: `site/foundations/elevation.md` (⚠️ sin tokens).

## Skeleton (loading)

- Bloques con `skeleton/standard` y variación `skeleton/weak` para el shimmer.

## Charts / visualización de datos

- Paleta categórica en `chart/<color>/<01..04>` (blue, green, red, orange, yellow, teal, purple, indigo, magenta). Usa los niveles 01–04 para series dentro de un mismo color, o rota colores para series distintas. Ya traen versión light y dark.
