# Guía de componentes Rappi → código

Cómo construir componentes del Mustache UX System en código mapeando su anatomía a tokens semánticos. Habla siempre en tokens (`--rp-*`), nunca en hex.

> Esta guía cubre el patrón y el mapeo de tokens. Para la anatomía exacta (medidas, variantes y props oficiales) de un componente puntual, léelo desde Figma con el MCP de Figma (skill `rappi-component-docs`) y trae sus tokens; no inventes valores.

## Principios

1. **Superficie:** el fondo del componente sale de `background/*`; el texto e iconos, de `ink/*`; los bordes, de `line/*`.
2. **Estados:** cada componente interactivo cubre `default / hover / pressed / focus / disabled`. Usa los tokens `interactive/*` para las capas de hover/pressed y `line/border-focus` para el foco.
3. **Forma:** radios desde `radius/*` (`card` = 24, `pill` = 1000), grosores desde `stroke/*` (`standard` = 1, `selected` = 2).
4. **Ritmo:** paddings y gaps desde `--rp-space-*`. Prefiere los de intención (`horizontal/between-buttons`, `vertical/docked-buttons`) cuando aplique.
5. **Texto:** tamaño y line-height por rol tipográfico (`--rp-type-*`), respetando el breakpoint.

## Feedback / semántica de color

| Intención | Token de fondo | Token de fondo suave | Token de texto/icono |
|---|---|---|---|
| Acento / marca | `background/accent` | `background/accent-weak` | `ink/accent` |
| Positivo / éxito | `background/positive` | `background/positive-weak` | `ink/positive` |
| Advertencia | `background/warning` | `background/warning-weak` | `ink/warning` |
| Error | `background/error` | `background/error-weak` | `ink/error` |
| Recomendación / info | `background/recommendation` | `background/recommendation-weak` | `ink/recommendation` |
| Oferta | `background/offer` | `background/offer-weak` | `ink/strong` |

## Botón

- **Primario:** fondo `background/accent`, texto `ink/inverse`, radio `radius/pill`, padding `--rp-space-12` / `--rp-space-24`, texto rol `body`.
- **Secundario / outline:** fondo `background/standard`, borde `stroke/standard` + `line/border-standard`, texto `ink/standard`.
- **Estados:** hover/pressed → superponer `interactive/bg-accent-hover` / `-pressed`; disabled → texto `ink/disabled`, fondo `background/disabled`; focus → anillo con `line/border-accent` o `interactive/border-accent-focus`.

```css
.rp-btn--primary {
  background: var(--rp-color-background-accent);
  color: var(--rp-color-ink-inverse);
  border-radius: var(--rp-radius-pill);
  padding: var(--rp-space-12) var(--rp-space-24);
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

- Fondo `background/standard`, borde `stroke/standard` + `line/border-standard`, radio `radius/card` (o el que defina el componente), texto `ink/standard`, placeholder `ink/weak`.
- **Focus:** borde `line/border-strong` o `interactive/border-focus`.
- **Error:** borde `line/border-error`, mensaje `ink/error`.
- **Disabled:** fondo `background/disabled`, texto `ink/disabled`.

## Banner / Alert

- Usa el par `background/<intención>-weak` + `ink/<intención>` según sea positivo, warning, error o recomendación (ver tabla). Icono con el `ink/*` correspondiente, radio `radius/card`, padding `--rp-space-12`/`--rp-space-16`.

## Separadores y bordes

- Línea divisoria estándar: `line/border-standard`. Borde sutil no opaco: `line/border-non-opaque`. Borde fuerte: `line/border-strong`.

## Overlays / modales

- Fondo de scrim: `surface/overlay` (oscuro) o `surface/overlay-weak`. Contenedor del modal: `background/standard` + `radius/card`.

## Skeleton (loading)

- Bloques con `skeleton/standard` y variación `skeleton/weak` para el shimmer.

## Charts / visualización de datos

- Paleta categórica en `chart/<color>/<01..04>` (blue, green, red, orange, yellow, teal, purple, indigo, magenta). Usa los niveles 01–04 para series dentro de un mismo color, o rota colores para series distintas. Ya traen versión light y dark.
