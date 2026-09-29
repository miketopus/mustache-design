# Color — tokens semánticos (Mustache)

Tema **User App**, light + dark. Variable CSS: `--rp-color-<token con guiones>` (`ink/standard` → `--rp-color-ink-standard`).

## Cómo elegir un color (en este orden)

1. **¿Qué pinta?** Texto/icono → `ink/*`. Fondo → `background/*`. Borde o divisor → `line/*`. Estado de interacción → `interactive/*`. Scrim/overlay → `surface/*`.
2. **¿Qué intención comunica?** Neutra (`standard`, `weak`, `mild`, `strong`), marca/acción (`accent`), éxito (`positive`), precaución (`warning`), error (`error`), sugerencia/info (`recommendation`), promo (`offer`).
3. **¿Va sobre color o invertido?** Usa `inverse`, `inverse-on` o `-on`.
4. **Intensidad:** `weak` < `mild` < `standard` < `strong`.

## Pares fondo + contenido (con contraste en light)

| Intención | Par | Contraste | WCAG AA texto normal |
|---|---|---|---|
| Neutro | `background/standard` + `ink/strong` | 21:1 | ✅ |
| Neutro secundario | `background/standard` + `ink/standard` | 8.5:1 | ✅ |
| Placeholder / hint | `background/standard` + `ink/weak` | 2.8:1 | ❌ solo placeholders, nunca info clave |
| Acción primaria / marca | `background/accent` + `ink/inverse-on` (blanco) | 2.2:1 | ❌ ver nota |
| Acción primaria (alternativa) | `background/accent` + `ink/strong-on` (negro) | 9.6:1 | ✅ |
| Marca suave | `background/accent-weak` + `ink/accent` | 1.95:1 | ❌ solo iconos decorativos |
| Error | `background/standard` + `ink/error` | 3.4:1 | ⚠️ solo texto ≥18px o Medium ≥14px, o acompáñalo de icono |
| Advertencia | `background/standard` + `ink/warning` | 3.2:1 | ⚠️ igual que error |
| Info | `background/standard` + `ink/recommendation` | 4.0:1 | ⚠️ solo texto grande |
| Oferta / promo | `background/offer` + `ink/strong-on` | 15.4:1 | ✅ |
| Feedback suave | `background/<intención>-weak` + `ink/strong` | ≥15:1 | ✅ usa el icono con `ink/<intención>` |

> ⚠️ **Gap de accesibilidad conocido:** el verde de marca (`ink/accent`, `background/accent`) no alcanza 4.5:1 contra blanco. Cuando diseñes: no uses `ink/accent` para texto de cuerpo; en banners/alerts pon el texto en `ink/strong` y deja el color de intención para el icono y el fondo suave. En botones primarios respeta el componente oficial de Figma, pero si te piden revisión de accesibilidad, **señálalo**.

## Programas de marca

`programs/rappi` (naranja RappiNeon) y `programs/turbo` (verde Turbo) solo para identificar esos programas, no como color de UI genérico.

## Tablas de referencia

Los hex se listan solo para trazabilidad y para diseño a código. **Nunca los escribas a mano**: referencia el token.

### ink

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `ink/strong` | `#000000` | `#FFFFFF` | Colors/neutrals/black |
| `ink/strong-on` | `#000000` | `#000000` | Colors/neutrals/black |
| `ink/standard` | `#464D59` | `#919AAA` | Colors/neutrals/80 |
| `ink/weak` | `#919AAA` | `#464D59` | Colors/neutrals/50 |
| `ink/disabled` | `#919AAACC` | `#464D59` | — |
| `ink/inverse` | `#FFFFFF` | `#000000` | Colors/neutrals/white |
| `ink/inverse-on` | `#FFFFFF` | `#FFFFFF` | Colors/neutrals/white |
| `ink/accent` | `#34C85A` | `#34C85A` | Colors/olive-green/50 |
| `ink/positive` | `#34C85A` | `#34C85A` | Colors/olive-green/50 |
| `ink/warning` | `#DA7400` | `#AE5D00` | Colors/orange/60 |
| `ink/error` | `#FF4242` | `#C43333` | Colors/red/50 |
| `ink/recommendation` | `#007AFF` | `#2C68D4` | Colors/blue/50 |

### background

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `background/standard` | `#FFFFFF` | `#000000` | Colors/neutrals/white |
| `background/weak` | `#ECEFF3` | `#2F343C` | Colors/neutrals/20 |
| `background/mild` | `#F7F8F9` | `#171A1EB2` | Colors/neutrals/10 |
| `background/on-top` | `#FFFFFF` | `#171A1E` | Colors/neutrals/white |
| `background/inverse` | `#000000` | `#FFFFFF` | Colors/neutrals/black |
| `background/inverse-on` | `#000000` | `#000000` | Colors/neutrals/black |
| `background/disabled` | `#ECEFF3` | `#171A1E` | Colors/neutrals/20 |
| `background/accent` | `#34C85A` | `#1D7232` | Colors/olive-green/50 |
| `background/accent-weak` | `#E1F7E7` | `#0B2B13` | Colors/olive-green/10 |
| `background/positive` | `#34C85A` | `#1D7232` | Colors/olive-green/50 |
| `background/positive-weak` | `#DFF9ED` | `#0B2B13` | Colors/green/10 |
| `background/warning` | `#DA7400` | `#7A4100` | Colors/orange/60 |
| `background/warning-weak` | `#FCF0DF` | `#432400` | Colors/orange/10 |
| `background/error` | `#FF4242` | `#661A1A` | Colors/red/50 |
| `background/error-weak` | `#FFE3E3` | `#260A0A` | Colors/red/10 |
| `background/recommendation` | `#007AFF` | `#2C68D4` | Colors/blue/50 |
| `background/recommendation-weak` | `#EFF6FE` | `#061935` | Colors/blue/10 |
| `background/offer` | `#FBDC25` | `#FBDC25` | Colors/yellow/50 |
| `background/offer-weak` | `#FDFAE3` | `#272206` | Colors/yellow/10 |

### interactive

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `interactive/bg-standard-hover` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-standard-pressed` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-mild-hover` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-mild-pressed` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-weak-hover` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-weak-pressed` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-accent-hover` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-accent-pressed` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-inverse-hover` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/bg-inverse-pressed` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/border-focus` | `#FFFFFF00` | `#FFFFFF00` | NA |
| `interactive/border-accent-focus` | `#FFFFFF00` | `#FFFFFF00` | NA |

### surface

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `surface/overlay` | `#000000CC` | `#000000CC` | — |
| `surface/overlay-weak` | `#FFFFFFCC` | `#171A1ECC` | — |

### line

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `line/border-blank` | `#FFFFFF` | `#464D59` | Colors/neutrals/white |
| `line/border-standard` | `#ECEFF3` | `#2F343C` | Colors/neutrals/20 |
| `line/border-strong` | `#171A1E` | `#FFFFFF` | Colors/neutrals/100 |
| `line/border-non-opaque` | `#919AAA33` | `#919AAA4D` | — |
| `line/border-block` | `#F7F8F9` | `#171A1E` | Colors/neutrals/10 |
| `line/border-accent` | `#34C85A` | `#2CAA4C` | Colors/olive-green/50 |
| `line/border-positive` | `#34C85A` | `#2CAA4C` | Colors/olive-green/50 |
| `line/border-warning` | `#DA7400` | `#DA7400` | Colors/orange/60 |
| `line/border-error` | `#FF4242` | `#C43333` | Colors/red/50 |

### programs

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `programs/rappi` | `#FF441F` | `#FF441F` | Colors/rappiNeon |
| `programs/turbo` | `#083410` | `#083410` | Colors/green/90 |

### skeleton

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `skeleton/standard` | `#ECEFF3` | `#171A1E` | Colors/neutrals/20 |
| `skeleton/weak` | `#F7F8F9` | `#2F343C` | Colors/neutrals/10 |

### chart

| Token | Light | Dark | Primitive (light) |
|---|---|---|---|
| `chart/blue/blue-01` | `#EFF6FE` | `#061935` | Colors/blue/10 |
| `chart/blue/blue-02` | `#8DBBF9` | `#133469` | Colors/blue/30 |
| `chart/blue/blue-03` | `#007AFF` | `#478CF7` | Colors/blue/50 |
| `chart/blue/blue-04` | `#133469` | `#BDD8FB` | Colors/blue/80 |
| `chart/green/green-01` | `#DFF9ED` | `#083410` | Colors/green/10 |
| `chart/green/green-02` | `#A0EEC8` | `#105635` | Colors/green/30 |
| `chart/green/green-03` | `#00A86C` | `#64E3A6` | Colors/green/60 |
| `chart/green/green-04` | `#177749` | `#CBF6E2` | Colors/green/70 |
| `chart/red/red-01` | `#FFE3E3` | `#401010` | Colors/red/10 |
| `chart/red/red-02` | `#FF9797` | `#661A1A` | Colors/red/30 |
| `chart/red/red-03` | `#C43333` | `#FF7171` | Colors/red/60 |
| `chart/red/red-04` | `#8C2424` | `#FFC7C7` | Colors/red/70 |
| `chart/orange/orange-01` | `#FCF0DF` | `#432400` | Colors/orange/10 |
| `chart/orange/orange-02` | `#FFBB6D` | `#7A4100` | Colors/orange/30 |
| `chart/orange/orange-03` | `#FE8F10` | `#FFA640` | Colors/orange/50 |
| `chart/orange/orange-04` | `#7A4100` | `#FFD8AC` | Colors/orange/80 |
| `chart/yellow/yellow-01` | `#FDFAE3` | `#272206` | Colors/yellow/10 |
| `chart/yellow/yellow-02` | `#F9EB8F` | `#D7BD3F` | Colors/yellow/30 |
| `chart/yellow/yellow-03` | `#D7BD3F` | `#FBDC25` | Colors/yellow/60 |
| `chart/yellow/yellow-04` | `#625618` | `#FBF2B7` | Colors/yellow/80 |
| `chart/teal/teal-01` | `#DFF4F3` | `#0A2C2B` | Colors/teal/10 |
| `chart/teal/teal-02` | `#89D5D1` | `#104744` | Colors/teal/30 |
| `chart/teal/teal-03` | `#28B2AB` | `#5EC5C0` | Colors/teal/50 |
| `chart/teal/teal-04` | `#16625E` | `#BFE8E6` | Colors/teal/70 |
| `chart/purple/purple-01` | `#E8E2FB` | `#190F38` | Colors/purple/10 |
| `chart/purple/purple-02` | `#AA95EF` | `#28185A` | Colors/purple/30 |
| `chart/purple/purple-03` | `#4D2FAE` | `#8B6EE9` | Colors/purple/60 |
| `chart/purple/purple-04` | `#37227C` | `#D1C5F7` | Colors/purple/70 |
| `chart/indigo/indigo-01` | `#D0D2F5` | `#181A37` | Colors/indigo/20 |
| `chart/indigo/indigo-02` | `#A8ACEB` | `#272A58` | Colors/indigo/30 |
| `chart/indigo/indigo-03` | `#4B50A9` | `#898EE4` | Colors/indigo/60 |
| `chart/indigo/indigo-04` | `#272A58` | `#D0D2F5` | Colors/indigo/80 |
| `chart/magenta/magenta-01` | `#FFE5F0` | `#401426` | Colors/magenta/10 |
| `chart/magenta/magenta-02` | `#FFA0C8` | `#66213E` | Colors/magenta/30 |
| `chart/magenta/magenta-03` | `#FF529A` | `#FF7DB3` | Colors/magenta/50 |
| `chart/magenta/magenta-04` | `#8C2D55` | `#FFCCE1` | Colors/magenta/70 |


## Estado pendiente

- `interactive/*` está definido como placeholder transparente (`#FFFFFF00`) en Figma. Mientras se define, para hover/pressed usa una superposición del mismo color base y **avisa** que el token aún no tiene valor oficial.
- Solo está el tema **User App**. Los otros 12 temas de producto (RT App, Aliados, Pay, Cargo, etc.) existen en Figma pero no están en este kit.
