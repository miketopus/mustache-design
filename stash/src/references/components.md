# Guía de componentes Rappi → código

Cómo construir componentes del Mustache UX System en código mapeando su anatomía a tokens semánticos. Habla siempre en tokens (`--rp-*`), nunca en hex.

> Esta guía cubre el patrón y el mapeo de tokens. Para la anatomía exacta (medidas, variantes y props oficiales) de un componente puntual, léelo desde Figma con el MCP de Figma (skill `rappi-component-docs`) y trae sus tokens; no inventes valores.

## Principios

1. **Superficie:** el fondo del componente sale de `background/*`; el texto e iconos, de `ink/*`; los bordes, de `line/*`.
2. **Estados:** cada componente interactivo cubre `default / hover / pressed / focus / disabled`. ⚠️ `interactive/*` hoy vale transparente: para hover/pressed usa una superposición del color base (8% / 12%) y avísalo. Foco: anillo de stroke `selected` (2px) con `line/border-strong` (⚠️ no existe token de foco oficial; `line/border-focus` no existe).
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

- **Variantes** (ver `site/components/button.md`): `primary`, `secondary`, `error`, `inverse`, `neutral`, `outline`. `disabled` es un **estado** (`disabled`), no una variante de diseño.
- **Tamaños:** `xsmall` 24 · `small` 32 · `medium` 40 (default) · `large` 48 · `xlarge` 56. Por debajo de `large`, el área táctil debe extenderse a 48px (padding invisible o hit area).
- **Primario:** fondo `background/accent`, texto `ink/inverse-on` (blanco fijo en light y dark), radio `radius/pill`, padding horizontal `--rp-space-24`, texto rol `body` en Medium. ⚠️ 2.2:1 de contraste: si piden revisión de accesibilidad, señálalo (alternativa: `ink/strong-on`, 9.6:1).
- **Secundario / outline:** fondo `background/standard`, borde `stroke/standard` + `line/border-standard`, texto `ink/standard`.
- **Error:** fondo `background/error` + `ink/inverse-on`.
- **Estados:** hover/pressed → superposición del color base (⚠️ `interactive/bg-accent-hover` / `-pressed` existen pero están vacíos); disabled → texto `ink/disabled`, fondo `background/disabled`; focus → anillo 2px `line/border-strong` con separación de 2px.

```css
.rp-btn--primary {
  background: var(--rp-color-background-accent);
  color: var(--rp-color-ink-inverse-on);
  border-radius: var(--rp-radius-pill);
  min-height: 48px; /* size large; en medium (40) extiende el hit area */
  padding: 0 var(--rp-space-24);
  font-size: var(--rp-type-pp-object-sans-size-body);
  line-height: var(--rp-type-pp-object-sans-line-height-body);
}
.rp-btn--primary:disabled {
  background: var(--rp-color-background-disabled);
  color: var(--rp-color-ink-disabled);
}
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
