# Mustache UX System · Guía para Claude

> Archivo único para cargar en un **Project de Claude** (Project knowledge) o adjuntar en un chat. Versión **Rappi 8** · 1 oct 2026 · tema User App · light + dark · generado desde las librerías de Figma `semantics` y `primitives` y el sitio de Mustache.

# Mustache UX System (Rappi)

> **Skill v1.1 · Rappi 8 · 1 oct 2026.** Tema User App (light + dark). Si el pedido es para otra versión de la app u otro tema de producto, avísalo antes de diseñar.

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

## Guías del sistema (sitio Mustache)

Generadas desde el sitio de documentación. Léelas cuando el pedido toque ese tema; no las cargues todas.

**Tokens y temas**

- `references/site/tokens/tokens-temas.md`: Tokens y temas. Un mismo nombre de token funciona en 13 productos, en light y dark, y en tres tamaños de pantalla. Aquí está cómo: las capas, cómo se nombra un token, los temas y cómo elegir el correcto.

**Foundations**

- `references/site/foundations/accessibility.md`: Accessibility. Cómo Mustache garantiza que cualquier persona, sin importar su capacidad visual, motriz, auditiva o cognitiva, pueda usar Rappi. No es un checklist al final: es la base que sostiene color, tipografía, iconografía y spacing.
- `references/site/foundations/cards-border-radius.md`: Cards/Border Radius. El uso de tarjetas o contenedores en nuestros diseños es la manera más sencilla de integrar y organizar imágenes, textos, botones y listas.
- `references/site/foundations/colors.md`: Colors. El color es el lenguaje visual de Mustache. Cada tono tiene un propósito: comunicar identidad de marca, jerarquía, estados de feedback y accesibilidad.
- `references/site/foundations/elevation.md`: Elevation. Las elevaciones simulan el efecto visual de un elemento "flotando" sobre una superficie: sombras y orientaciones con un uso definido.
- `references/site/foundations/haptics.md`: Haptics. Cómo Mustache usa la vibración del dispositivo para confirmar, advertir y dar textura física a las interacciones de Rappi, siempre de forma consistente y como refuerzo de lo que la persona ya ve y oye.
- `references/site/foundations/icons.md`: Icons. Guía de estilo de iconografía del Mustache Design System: cómo construir, nombrar y usar los íconos de Rappi de forma consistente.
- `references/site/foundations/illustrations-3d.md`: Illustrations 3D's. Mustache utiliza un estilo de ilustración preciso para ayudar a los usuarios a comprender rápida y claramente cómo funcionan las cosas en cada experiencia.
- `references/site/foundations/layout.md`: Layout. En Rappi todos los diseños deben tener como principio el uso correcto de los elementos y espacios, para crear consistencia y claridad en la marca.
- `references/site/foundations/motion.md`: Motion. El movimiento puede dar vida a la pantalla, guiar a los usuarios a través de experiencias complejas y ayudarlos a progresar.
- `references/site/foundations/stroke.md`: Stroke. El objeto para definir el color, el ancho y el estilo de un borde o divisor.
- `references/site/foundations/typography.md`: Typography. La tipografía da voz al sistema. Una familia para la interfaz, dos pesos y una escala por breakpoint que mantiene la jerarquía consistente en toda la app.

**Patterns**

- `references/site/patterns/add-product.md`: Add Product. Agregar los productos a la canasta en Rappi, al igual que como se hace en la vida real, es una de las experiencias que nos hace diferentes e innovadores.
- `references/site/patterns/dialogs.md`: Dialogs. En nuestra interfaz, un diálogo es una “conversación” entre el sistema y las personas usuarias con el fin de solicitar o brindar información.
- `references/site/patterns/empty-states.md`: Empty states. Pantallas en nuestra interfaz o sistema que no contienen información, o que informan sobre alguna falla o error.
- `references/site/patterns/loading-skeleton.md`: Loading / Skeleton. Elementos visuales que comunican a las personas usuarias la continuidad de un proceso en la interfaz o sistema.
- `references/site/patterns/login.md`: Login. El inicio de sesión en un sistema es la acción que permite a las personas usuarias tener acceso a una app o programa.
- `references/site/patterns/modality.md`: Modality. Soluciones gráficas que, a través de un diseño fluido y sencillo, presentan el contenido de una manera clara que facilita la toma de decisiones.
- `references/site/patterns/onboarding.md`: Onboarding. Brindarle a nuestras personas usuarias una primera experiencia sencilla, rápida e intuitiva en nuestra app nos acercará a cautivarlos.
- `references/site/patterns/search.md`: Search. El principal objetivo de nuestros usuarios está en encontrar de manera rápida y sencilla aquello que necesitan en minutos.
- `references/site/patterns/settings.md`: Settings. Las personas prefieren las aplicaciones que se adaptan cada vez mejor a sus necesidades a través de sus ajustes personalizados.
- `references/site/patterns/transitions-to-stores.md`: Transitions to stores. Conoce de manera detallada cómo ocurren las transiciones desde el Menú hacia una tienda dentro de la app.

**Components**

- `references/site/components/button.md`: Button. Disparador de acción principal en cualquier superficie. Renderiza un `<button>` (o cualquier elemento vía `asChild`) con tokens semánticos de variante y tamaño.

**Principios de diseño**

- `references/site/principles/design-principles.md`: Principios de Diseño. Los principios de producto son la base de la marca en el área de diseño. Con ellos no solo creamos una marca atractiva, sino una consistente y escalable que responde a las necesidades de las personas usuarias y de nuestro negocio.


# Anexo A · Color
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


# Anexo B · Tipografía
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


# Anexo C · Spacing, radius y stroke
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


# Anexo D · Componentes
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


# Anexo E · Guías del sitio


## Tokens y temas

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Un mismo nombre de token funciona en 13 productos, en light y dark, y en tres tamaños de pantalla. Aquí está cómo: las capas, cómo se nombra un token, los temas y cómo elegir el correcto.

### Tres capas

Mustache separa el **valor** de la **intención**. Diseñas y construyes siempre con la capa del medio.

Capa 1
Primitives

La paleta y las escalas crudas: `olive-green/50`, `font/size/16`. Están ocultos en Figma a propósito.

→

Capa 2
Semantics

El rol: `background/accent`, `ink/strong`. Apuntan a un primitivo distinto según tema, modo o breakpoint.

→

Capa 3
Componentes

Botones, cards, chips. Solo usan semantics, por eso cambian de tema sin tocarlos.

**Por qué no hex:** si un botón usa `#34C85A`, se queda verde en Pay, en dark mode y para siempre. Si usa `background/accent`, toma el color de cada producto y se actualiza solo cuando cambia la marca.

### Cómo se nombra un token

Cada nombre de color se lee como una frase: **dónde se pinta**, **qué comunica** y **con qué fuerza**.

Familia background /
Intención accent -
Intensidad weak

`background/accent-weak` = familia `background` + intención `accent` + intensidad `weak`: un fondo suave con el color de marca.

| Parte | Opciones | Qué decide |
| --- | --- | --- |
| Familia | `ink` (12) · `background` (19) · `line` (9) · `interactive` (12) · `surface` (2) · `skeleton` (2) · `programs` (2) · `chart` (36) | Qué pinta: texto e íconos, fondos, bordes, estados hover y pressed, overlays, cargas, programas de marca, gráficos. |
| Intención | `standard` · `accent` · `positive` · `warning` · `error` · `recommendation` · `offer` | Qué comunica: neutro, marca o acción, éxito, precaución, error, sugerencia, promo. |
| Intensidad | `weak` < `mild` < `standard` < `strong` | Cuánto pesa en la jerarquía. |
| Variante | `-on` · `inverse` · `inverse-on` · `disabled` | Si va encima de un color, invertido o deshabilitado. |

La librería tiene **94 tokens de color**. Los fondos de intención vienen en par fuerte y suave (`background/error` y `background/error-weak`), y su texto o ícono usa el `ink` de la misma intención.

### Temas de producto

La colección de color tiene **13 temas**, uno por producto. Todos usan los mismos 94 nombres; cada tema decide a qué primitivo apunta. Así un componente funciona en todos los productos sin cambios.

Ejemplo: `background/accent` en light, tema por tema.

| Tema | `background/accent` apunta a | Dark mode propio |
| --- | --- | --- |
| User App | `olive-green/50` | 72 de 94 |
| RT App | `teal/70` | 1 |
| Nitro | `purple/50` | — |
| Consumer CMS | `teal/70` | — |
| Aliados | `chart/teal/teal-03 ⚠️` | — |
| Portal Partners | `blue/50` | — |
| Brands | `valor fijo ⚠️` | — |
| Mi Tienda | `blue/50` | — |
| Nexus | `olive-green/80` | 1 |
| Marketing Suite | `valor fijo ⚠️` | — |
| Merchants | `rappiNeon` | — |
| Cargo | `rappiNeon` | — |
| Pay | `indigo/50` | 84 de 94 |

> **⚠️ Revisión pendiente en Figma.** En Aliados, Brands y Marketing Suite el acento no apunta a un primitivo de la paleta: Aliados usa un color de `chart` y los otros dos tienen el valor escrito a mano. Funciona, pero si la paleta cambia, esos temas no se actualizan.

### Light y dark

Dark mode es una **extensión** de la colección de color: hereda todo de light y solo sobrescribe lo que cambia. Por eso un tema sin overrides se ve igual en los dos modos.

| Token (User App) | Light | Dark |
| --- | --- | --- |
| `background/standard` | `neutrals/white` | `neutrals/black` |
| `ink/strong` | `neutrals/black` | `neutrals/white` |
| `background/accent` | `olive-green/50` | `olive-green/80` |

> **Hoy, dark mode completo solo existe en User App y Pay.** User App sobrescribe 72 de 94 tokens y Pay 84. RT App y Nexus cambian uno; los otros 9 temas todavía no tienen dark. Si diseñas dark para un producto sin overrides, avísale al equipo de DS antes de inventar valores.

### Más allá del color

La misma idea, un nombre con valores según el contexto, también vive en otras colecciones de semantics.

- **Typography** cambia por breakpoint: **Mobile** (<600px), **Tablet** (≥600px) y **Desktop** (≥1024px). `size/h1` vale 40, 28 o 40 según la pantalla. Detalle en [Typography](foundations/typography.html).

- **Spacing** tiene dos niveles: la escala (`spacing-0` a `spacing-64`) y tokens con intención (`horizontal/inside-screen` = 24, `vertical/between-sections` = 32). Usa los de intención cuando existan.

- **Radius** (`card` 24, `pill`), **Stroke** (`none`, `standard` 1, `selected` 2) y **Opacity** (10% a 100%) tienen un solo valor para todos.

### Cómo elegir un token

Cuatro preguntas, en este orden:

- **¿Qué pinta?** Texto o ícono → `ink`. Fondo → `background`. Borde o divisor → `line`. Hover o pressed → `interactive`. Overlay → `surface`.

- **¿Qué comunica?** Neutro → `standard`. Marca o acción → `accent`. Y si es estado: `positive`, `warning`, `error`, `recommendation` u `offer`.

- **¿Va sobre color o invertido?** Usa la variante `-on`, `inverse` o `inverse-on`.

- **¿Cuánto pesa?** Ajusta con `weak`, `mild`, `standard` o `strong`.

Si ningún token cubre el caso, no inventes uno: usa el más cercano y avísale al equipo de DS.

### Mapa de colecciones

Lo que hay en la librería **semantics** de Figma, dónde se documenta y cómo se llama en código.

| Colección | Modos | Tokens | Se documenta en | En CSS |
| --- | --- | --- | --- | --- |
| Colors | 13 temas | 94 | [Colors](foundations/colors.html) | `--rp-color-*` |
| Darkmode | 13 temas (extiende Colors) | 94 | [Colors](foundations/colors.html) | mismas variables en `prefers-color-scheme: dark` |
| Typography | Mobile · Tablet · Desktop | 42 | [Typography](foundations/typography.html) | `--rp-type-*` · `.rp-text-*` |
| Spacing | 1 | 28 | [Layout](foundations/layout.html) | `--rp-space-*` |
| Radius | 1 | 2 | [Cards/Border Radius](foundations/cards-border-radius.html) | `--rp-radius-*` |
| Stroke | 1 | 3 | [Stroke](foundations/stroke.html) | `--rp-stroke-*` |
| Opacity | 1 | 10 | — | `--rp-opacity-*` |
| Glass | 1 | 3 | — | — (en Figma valen 0: sin definir) |

El `tokens.css` del kit trae solo el tema **User App**, en light y dark.


## Accessibility

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.
>
> Versión 0.1 (en construcción). Los mínimos (4.5:1, 3:1, 48×48px, 8px) sí son regla. No existe token de foco: usa anillo 2px `line/border-strong` y marca "⚠️ sin token oficial".

Cómo Mustache garantiza que cualquier persona, sin importar su capacidad visual, motriz, auditiva o cognitiva, pueda usar Rappi. No es un checklist al final: es la base que sostiene color, tipografía, iconografía y spacing.

- **Estado** En construcción

- **Estándar** WCAG 2.2 AA

- **Versión** 0.1

### Overview

La accesibilidad es que una persona con baja visión, daltonismo, movilidad reducida o que usa un lector de pantalla pueda pedir un domicilio, cobrar como Rappitendero o repartir un pedido sin fricción extra.

Para Rappi como compañía madura, esto ya no es "nice to have":

- **Escala del problema.** En EE. UU. 1 de cada 4 adultos vive con alguna discapacidad; en Canadá es 22%; en el resto del mundo, cerca de 1 de cada 7 (fuentes: CDC, Statistics Canada, Banco Mundial).

- **Envejecimiento del mercado.** La visión empeora de forma gradual desde los 40 años. Rappi tiene usuarios de todas las edades pidiendo domicilios; un mejor contraste ayuda a esa base cada vez más grande, no solo a quien tiene una discapacidad diagnosticada.

- **Contexto real de uso.** Un repartidor viendo la app bajo sol directo, con guantes, en movimiento, tiene básicamente las mismas necesidades que alguien con baja visión o destreza motriz reducida: texto legible, áreas táctiles grandes, poca dependencia del color.

- **Riesgo legal en LATAM.** Colombia (Ley 1618 de 2013 y Resolución 1519 de 2020 sobre accesibilidad digital), Brasil (Lei Brasileira de Inclusão / LBI) y otros mercados donde opera Rappi ya exigen accesibilidad digital en servicios esenciales. Un domicilio de comida cada vez se lee más como servicio esencial.

### Principles

- **Accesible por defecto, no como parche.** La regla no es documentar accesibilidad al final, es que los tokens y componentes ya vengan resueltos, así el equipo de producto no tiene que resolverlo cada vez.

- **Perceptible, operable, comprensible y robusto (POUR).** Estos cuatro principios ordenan cualquier decisión: se puede percibir con cualquier sentido, se puede operar con cualquier método de entrada, se entiende sin ambigüedad, y funciona con cualquier tecnología asistiva.

- **Bajo carga cognitiva beneficia a todos.** Lenguaje simple, flujos lineales y poca sobrecarga no son solo para discapacidad cognitiva: ayudan a cualquiera usando la app con una mano, apurado, mientras reparte un pedido.

- **Construir una vez, accesible en todas partes.** Si el componente de Mustache ya trae foco visible, contraste correcto y `contentDescription`, cada equipo de producto hereda eso gratis. Es más barato resolverlo en el Design System que auditar 40 pantallas después.

- **Probar con tecnología real, no solo con checklist.** Un componente puede "pasar" el criterio en papel y seguir siendo confuso con VoiceOver o TalkBack activado. La validación final es usar el lector de pantalla, no solo revisar la lista de criterios.

### Minimum specs

Mínimos que Mustache exige, alineados al estándar internacional **WCAG 2.2 nivel AA**:

| Criterio | Mínimo Mustache | Por qué |
| --- | --- | --- |
| Contraste texto normal | 4.5:1 | Legible para baja visión y bajo sol directo |
| Contraste texto grande (≥18pt o ≥14pt bold) | 3:1 | El tamaño ya compensa parte del contraste |
| Contraste de elementos gráficos y UI (íconos, bordes de input, foco) | 3:1 | Si no se ve el borde, no se sabe que es interactivo |
| Área táctil mínima | 48×48px | Clave para repartidores en movimiento |
| Separación entre áreas táctiles adyacentes | 8px | Evita toques accidentales |
| Foco visible | Siempre, con token interactive/focus | Navegación por teclado/switch debe verse, no solo funcionar |
| Escalado de texto | Hasta 200% sin romper el layout | Personas que agrandan la fuente del sistema |
| Animaciones/parpadeo | Máx. 3 veces por segundo; respeta "reducir movimiento" | Riesgo de crisis fotosensibles |

> **Por confirmar:** valores exactos de contraste ya resueltos en la colección "Colors (Light mode)" de **semantics**; falta correr `get_variable_defs` sobre pares reales (texto/fondo) para confirmar que todos los tokens `ink/*` sobre `background/*` cumplen 4.5:1.

### How to use it

#### Diseño

- Nunca uses el color como único indicador de estado (error, éxito, deshabilitado). Súmale ícono o texto.

- Verifica contraste con un checker antes de entregar, no después.

- Diseña el estado de foco de cada componente interactivo, no lo dejes al navegador/OS por defecto.

#### Contenido

- Escribe labels que digan qué hace el control ("Confirmar pedido", no "Aceptar").

- Evita depender solo de un ícono para comunicar una acción crítica.

#### Desarrollo

- Usa los componentes de Mustache tal cual: ya traen `contentDescription`/`aria-label`, foco y área táctil resueltos.

- Si necesitas un elemento custom, primero revisa si existe en la librería antes de reinventarlo sin accesibilidad.

### Across foundations

Esta ficha es el paraguas. Cada foundation hereda una parte:

- **[Colors](colors.html)** — los pares `ink/*` sobre `background/*` deben cumplir el contraste de la tabla de arriba, en light y dark.

- **[Typography](typography.html)** — la escala debe seguir siendo legible al 200% de zoom; el peso Medium (que reemplaza a Bold en Mustache) necesita suficiente contraste de peso, no solo de color.

- **[Icons](icons.html)** — todo ícono funcional lleva texto o label accesible; el trazo de 2px ayuda al reconocimiento con baja visión.

- **[Layout / Spacing](layout.html#spacing)** — la escala de spacing es la que sostiene el área táctil de 48px y los 8px de separación.

- **[Motion](motion.html)** — nada de parpadeo agresivo; respeta la preferencia de "reducir movimiento" del sistema operativo. [por documentar en detalle]

### Scaling it at Rappi

Para escalarlo dentro de Rappi:

- **Empieza por foundations, no por componentes sueltos.** Si color, tipografía y spacing ya cumplen los mínimos, cada componente nuevo hereda accesibilidad gratis. Auditar 200 componentes uno por uno es más caro que arreglar 3 foundations.

- **Prioriza por uso, no por visibilidad.** Botón, input, tarjeta de producto y navegación inferior se repiten en miles de pantallas: ahí vive el 80% del impacto real para el usuario final y el repartidor.

- **Un dueño, no un comité difuso.** Alguien en el equipo de DS necesita ser el punto de referencia de accesibilidad, aunque sea part-time al inicio.

- **Súmalo al changelog del DS.** Cada mejora de contraste o de foco que se resuelva en semantics queda registrada ahí, así el criterio de "por qué cambió este token" no se pierde.

- **Piensa multi-país desde el día uno.** Lo que en Colombia es buena práctica, en Brasil es requisito legal (LBI). Documentar el mínimo como WCAG 2.2 AA evita rehacer el trabajo por país.

- **Que se note en el negocio, no solo en QA.** Menos fricción para reparar un pedido con una mano, mejor legibilidad bajo sol, menos tickets de soporte por "no encuentro el botón": la accesibilidad bien hecha reduce carga operativa, no solo riesgo legal.

### Do & Don't

- **Marca un error con ícono + texto + color** — no lo marques solo con el borde rojo.

- **Diseña el estado de foco de cada control** — no confíes en el foco por defecto del navegador.

- **Prueba el flujo crítico con VoiceOver/TalkBack antes de publicar** — no asumas que "pasa el checklist" es lo mismo que "funciona con lector de pantalla".

- **Da 48×48px de área táctil aunque el ícono visual sea de 24px** — no reduzcas el área táctil para que el diseño "se vea más limpio".

### Standards & compliance

#### Estándar de referencia

WCAG 2.2, nivel de conformidad AA (World Wide Web Consortium). Es el criterio técnico que sostiene toda la tabla de mínimos de este documento.

#### Marco regulatorio por país (mercados donde opera Rappi)

- **Colombia:** Ley Estatutaria 1618 de 2013 y Resolución 1519 de 2020 (accesibilidad digital en entornos TIC).

- **Brasil:** Lei Brasileira de Inclusão (Lei nº 13.146/2015).

> **Pendiente:** mapear el resto de países donde opera Rappi (México, Argentina, Chile, Perú, Costa Rica, Ecuador, Uruguay) contra su marco local de accesibilidad digital.

#### Control de versión

| Campo | Valor |
| --- | --- |
| Versión | 0.1 (borrador para revisión interna) |
| Propietario | Equipo de Design System, Mustache |
| Última actualización | 23 sep, 2026 |


## Cards/Border Radius

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.
>
> ⚠️ **Nombres heredados.** `borderRadius1…8` no existen como tokens. En Figma son primitivos (`borderRadius/4…32`); los únicos semánticos son `card` (24) y `pill`. Nombra el valor en px y marca "⚠️ sin token semántico".

El uso de tarjetas o contenedores en nuestros diseños es la manera más sencilla de integrar y organizar imágenes, textos, botones y listas.

### Cards/Border Radius

El uso de tarjetas o contenedores en nuestros diseños, es la manera más sencilla de integrar y organizar imágenes, textos, botones, listas, etc.

#### Anatomy

On top of white background — lightmode. On top of black background — darkmode.

### Card Scale/Border Radius

Al momento de usar una card para la construcción de un componente, es necesario tener en cuenta que el "Border radius" de esta se adaptará según la interfaz de usuario.

Hay que tener en cuenta que el tamaño de una Card siempre está en una escala de 4px min. a 32px máx.

| Token | Border Radius |
| --- | --- |
| borderRadius1 | 4px |
| borderRadius2 | 8px |
| borderRadius3 | 12px |
| borderRadius4 | 16px |
| borderRadius5 | 20px |
| borderRadius6 | 24px |
| borderRadius7 | 28px |
| borderRadius8 | 32px |


## Colors

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

El color es el lenguaje visual de Mustache. Cada tono tiene un propósito: comunicar identidad de marca, jerarquía, estados de feedback y accesibilidad.

- **Estado** Estable

- **Temas** Light & Dark · Multi-producto

- **Capas** Primitivos · Semánticos

### Introducción

Los colores se organizan en dos capas: **Primitivos** (escalas tonales crudas) y **Semánticos** (tokens por rol y uso). Sobre esa base, cada equipo de producto tiene un tema propio dentro de Semánticos, garantizando que todos usen exactamente los mismos nombres de token apuntando a su propia paleta de marca.

### Capa 1 · Primitivos

Los primitivos son las escalas tonales que alimentan todo el sistema. Cada color parte de un valor base validado, del cual se genera un rango completo de sombras y tintes, dando a cada matiz una escala predecible y consistente.

Los primitivos **nunca se usan directamente** en diseño: existen como fuente de verdad que los tokens semánticos referencian. Actualizar un primitivo se propaga automáticamente a todos los tokens y componentes que lo usan.

### Capa 2 · Semánticos y temas

Los tokens semánticos le dan propósito al color. En lugar de referenciar un valor crudo, los componentes usan tokens como **Ink.Strong** o **Background.disabled**: nombres que describen el rol, no el color en sí.

Semánticos también impulsa el sistema de temas multi-producto. Cada equipo en Rappi tiene un tema dentro de la librería; todos usan exactamente los mismos nombres de token, pero los mapean a una paleta de primitivos diferente. Así un componente funciona en todos los productos sin ninguna modificación.

Cómo se nombra un token, los 13 temas y qué productos tienen dark mode: [Tokens y temas →](../tokens-temas.html)

### Semantics

Listado 1:1 de la librería **semantics** en Figma: cada token, su uso y el primitivo al que apunta hoy. Se diseña y se nombra con el token de la izquierda, nunca con el valor de la derecha.

### Accesibilidad

Todas las combinaciones de color en Mustache se validan contra **WCAG 2.2 nivel AA**. Cuando una combinación no alcanza el ratio de contraste requerido, ajustamos solo la luminosidad (preservando tono y saturación) para encontrar el valor más cercano que cumpla la norma. Ver la ficha completa en [Accessibility](accessibility.html).

| Estado | **Estable** |
| --- | --- |
| Temas | Light & Dark · Multi-producto |
| Diseñadores | Core |


## Elevation

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.
>
> ⚠️ **Borrador sin tokens.** Los niveles existen en el sitio, pero no hay valores de sombra exportados en `tokens.css`. Nombra el nivel (ej. "Elevated Strong") y marca "⚠️ sin token oficial". Nunca inventes valores de sombra como si fueran del DS.

Las elevaciones simulan el efecto visual de un elemento "flotando" sobre una superficie: sombras y orientaciones con un uso definido.

- **Estado** New

### Elevation

In Rappi the elevations, also known as shadows or orientations, are the visual effect that simulates an elevation of a "floating" element on a surface.

One of the challenges at the moment to apply on our interface the elevations are the variety of plans that are through the experiences like maps or widgets.

> En la fuente esta sección incluye un ejemplo 3D creado en Spline mostrando una elevación (contenido visual, sin texto adicional).

### Niveles de sombra y orientación en Mustache

En nuestro Sistema de Diseño contamos con 4 niveles de sombras y orientaciones para el uso correcto de las elevaciones.

A continuación, encontrarás a detalle los tipos de elevaciones y la distancia necesaria entre la capa principal para implementar de la forma correcta este efecto visual.

Recuerda, los efectos, definen su intensidad y profundidad según las sombras proyectadas en el componente aplicado.

#### Styles

Las elevaciones, como todo efecto visual cuenta con diferentes tipos de aplicaciones, a continuación encontrarás los 4 tipos de elevaciones más aplicados en Rappi.

| Name style | Descripción |
| --- | --- |
| Elevated | Superposiciones contextuales, para componentes como Seleccionar y Barra de menús, tooltips. |
| Elevated Strong | Elementos más altos en el orden de apilamiento, por ejemplo, notificaciones, que deben estar por encima de cualquier otro contenido. |
| Elevated Hard | Superposiciones… |
| Elevated (-Y) | Superposiciones contextuales, para componentes anidados como navegaciones inferiores. |

> **Así está en la fuente.** La descripción de `Elevated Hard` queda cortada ("Superposiciones…") en la página original.

Es importante tener en cuenta, que en algunos componentes el uso de las elevaciones busca principalmente generar una jerarquía visual en los elementos; ejemplo de ello: la "navegación inferior" y el "botón de acción flotante".

En el caso de componentes específicos, como la navegación inferior y el botón de acción flotante, se aplican las elevaciones para otorgar una mayor jerarquía visual a los elementos. Así mismo en casos como los formularios de registro y de inicio de sesión.

### Style Buttons

Las elevaciones, como hemos podido ver en secciones anteriores son un efecto visual versátil y de alta carga semántica, sin embargo, su aplicación en los botones solo es posibles en casos específicos como los botones principales de la app.

| Name style | Descripción |
| --- | --- |
| Rappi | Elevación con el color Rappi que solo puede ser usado si la superficie del botón cumple con el mismo tono. |
| Green | Elevación con el color verde que solo puede ser usado en los botones de canasta o pagos que contengan el mismo tono en la superficie. |
| Blue | — |

> **Así está en la fuente.** La fila `Blue` no tiene descripción en la tabla original.

### Guidelines

El objetivo principal de las elevaciones, además de enfocar u otorgar una mayor jerarquía visual a cualquier componente, es igual mente simular un efecto similar al de la experiencia física que se tiene con los objetos en la realidad.

> **Nota:** al aplicar las elevaciones es importante tener en cuenta que los objetos si bien pueden apilarse, no pueden atravesarse entre sí.

#### Don't

- No use elevaciones en los iconos.

- No use elevaciones en los textos.

#### Aplicación de elevaciones en Figma

Al momento de buscar aplicar una "elevación" de manera individual en un cuadro de contenido, es fundamental tener en cuenta el propósito de esta aplicación.

¿Qué se necesita para aplicar de manera correcta una elevación en un contenido? Sencillo, solo es necesario aplicar el estilo de elevación deseado en rectángulo que sea similar, en tamaño, al cuadro de texto el cual se busca mejorar y listo.

Para encontrar todas nuestras variables de "elevaciones" es necesario conectar Foundations, nuestra librería CORE, con la aplicación de Figma y usarla a través de capas que se pueden aplicar fácilmente en los elementos a intervenir.

### Elevaciones por defecto

Todos los elementos tienen valores predeterminados, en el caso de la elevación de reposo o los desplazamientos dinámicos; esto se ve reflejado en su jerarquía.

Un ejemplo de lo mencionado anteriormente son: los cuadros de diálogo que sobreponen a otros componentes en una interfaz.

La siguiente tabla organiza los valores predeterminados según la elevación necesaria para el reposo y los desplazamientos dinámicos de cada componente.

| Component | Valor de elevación predeterminado |
| --- | --- |
| Button Basket | Green |
| Button Checkout | Green |
| Pricing Tables | Hard |
| Notifications flotantes | Strong |
| Pop-ups | Strong |
| FAB (floating action button) | Strong |

#### Soporte para elevaciones

Las elevaciones siguen una lógica simple: a mayor número en la elevación, más evidente es la sombra.

En el caso puntual de algunas elevaciones, estás vienen de manera similar a una combinación de dos colores en su estilo, por ejemplo: Elevation Hard.


## Haptics

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.
>
> ⚠️ **Borrador.** Nomenclatura y varios casos están "por confirmar". Úsalo como criterio, no como spec cerrada.

Cómo Mustache usa la vibración del dispositivo para confirmar, advertir y dar textura física a las interacciones de Rappi, siempre de forma consistente y como refuerzo de lo que la persona ya ve y oye.

- **Estado** En construcción

- **Versión** 0.1

### Overview

Un haptic es cualquier respuesta física que la persona siente en el cuerpo a través del dispositivo, normalmente una vibración corta. Estimula el sentido del tacto para **transmitir y reforzar** acciones puntuales dentro de la app.

Por qué le importa a Rappi:

- **Comunica sin molestar a otros.** El teléfono avisa a quien lo tiene en la mano, sin sonido ni alerta visible para los demás.

- **Funciona cuando no se mira la pantalla.** Un Rappitendero en movimiento o bajo sol directo recibe la confirmación aunque no alcance a leerla.

- **Es un canal poco aprovechado.** Frente a la señal visual y de audio, el tacto es la forma de interacción más cercana al cuerpo, y la mayoría de productos aún no la usa con intención.

- **Sin estándar, se vuelve ruido.** Hoy no existe un estándar de haptics para toda la industria. Si cada equipo elige su propia vibración, la misma sensación puede significar "listo" en una app y "error" en otra.

### Key terms

| Término | Qué significa |
| --- | --- |
| Haptic del sistema | Patrón predefinido por iOS o Android. Es la opción por defecto en Mustache. |
| Haptic personalizado | Patrón diseñado a mano (Core Haptics en iOS, composiciones en Android). Solo se usa si el sistema no cubre el caso. |
| Fuerza | Qué tan fuerte se siente la vibración. En iOS se divide en nitidez e intensidad; en Android se llama amplitud. |
| Comportamiento | El patrón de la vibración: un toque, dos toques, una vibración larga. |
| Nitidez (iOS) | Si la vibración se siente estrecha y precisa, o difusa. |
| Intensidad (iOS) | Qué tan fuerte es el golpe. |
| Amplitud (Android) | La fuerza del haptic. Los mensajes importantes pueden ser más fuertes y con un patrón más largo. |

### Principles

- **Causa y efecto clara.** Cada haptic tiene un disparador que la persona reconoce. Por qué: si la vibración no responde a algo que la persona hizo o vio, se siente gratuita y confunde.

- **Refuerza, nunca reemplaza.** El haptic acompaña una señal visual o sonora, o un gesto (scroll, pulsación larga, transacción). Por qué: cuando lo visual, lo sonoro y lo táctil van en armonía, la experiencia se siente natural, como en el mundo físico.

- **Con prudencia.** Pocas interacciones importantes y con consecuencia, no muchas triviales. Por qué: usarlos para agregar novedad hace que la app se sienta efectista y termina abrumando.

- **Mismo patrón, mismo significado.** Un patrón se asocia siempre al mismo tipo de resultado, en todas las apps de Rappi. Por qué: la gente aprende asociaciones táctiles; si el patrón de "error" aparece en un éxito, se rompe la confianza.

- **Sistema primero.** Usa los patrones nativos de cada plataforma y crea patrones propios solo cuando el sistema no tenga uno que encaje. Por qué: la persona ya los conoce del resto de su teléfono.

- **Opcional y respetuoso.** Respeta el ajuste de haptics del sistema y deja que la persona los apague; la app debe funcionar igual de bien sin ellos. Por qué: la sensibilidad a la vibración varía mucho entre personas.

### Types

Mustache trabaja con **tres tipos** de haptic, heredados de las familias de feedback de iOS y mapeados a su equivalente en Android.

> **Por confirmar:** diagrama nitidez vs. intensidad, tomado del tablero FigJam `haptics-rappi`.

| Tipo | Para qué | iOS | Android (tablero actual) | Android (recomendado) |
| --- | --- | --- | --- | --- |
| selection | Feedback mientras cambia el valor de un elemento de UI (elegir toppings, agregar a la canasta, stepper) | `UISelectionFeedbackGenerator` | `EFFECT_TICK` | `SEGMENT_TICK` / `CLOCK_TICK` |
| notification · success | Una tarea o acción se completó | `UINotificationFeedbackGenerator .success` | `EFFECT_CLICK` | `CONFIRM` |
| notification · warning | La acción produjo una advertencia | `UINotificationFeedbackGenerator .warning` | `EFFECT_CLICK` | [por definir] (no hay constante nativa de advertencia) |
| notification · error | La tarea o acción falló | `UINotificationFeedbackGenerator .error` | `EFFECT_CLICK` | `REJECT` |
| impact | Metáfora física que complementa algo visual (una vista que encaja en su lugar, un toggle) | `UIImpactFeedbackGenerator` (estilo `medium` para toggles) | [por definir] | `TOGGLE_ON` / `TOGGLE_OFF` para toggles |

Constantes Android listadas en el tablero como catálogo base:

EFFECT_TICK
EFFECT_CLICK
EFFECT_HEAVY_CLICK
EFFECT_DOUBLE_CLICK

> **Nomenclatura propuesta (por confirmar):** nombrar el haptic por intención, no por plataforma: `haptic/selection`, `haptic/success`, `haptic/warning`, `haptic/error`, `haptic/impact-medium`. Cada plataforma resuelve el nombre a su API nativa, igual que un token semántico resuelve a un primitive.

### How it maps to Rappi

Mapeo de interacciones reales de la app a cada tipo. El estado refleja lo marcado en el tablero de diseño.

#### selection

| Interacción | Estado |
| --- | --- |
| Agregar un producto a la canasta | Propuesto |
| Dar like a un producto o tienda | Propuesto |
| Aumentar unidades de producto (stepper) | Propuesto |
| Slider con opciones de selección (ej. madurez del producto) | Propuesto |
| Confirmar sustitutos (selección múltiple) | Propuesto |
| Activar o desactivar filtros | Propuesto |
| Filtros con selección | En revisión |
| Selección de storetype | En revisión (entrar a un storetype es navegación; no parece necesario) |
| Ir a pagar | En revisión |
| Tocar ver canasta | En revisión |
| Cerrar modales | En revisión |

#### notification

| Resultado | Interacción | Estado |
| --- | --- | --- |
| success | Confirmación del código enviado al celular | Propuesto (revisar si el sistema ya vibra cuando el código llega por SMS) |
| success | Aceptar un sustituto | Propuesto |
| success | Confirmación de un pedido | Propuesto |
| warning | Intentar agregar un producto sin completar los toppings | Propuesto |
| warning | Dirección de entrega lejos de la ubicación actual | Propuesto |
| error | Código inválido al ingresarlo (ej. cupón no válido, con snackbar o microinteracción en el input) | Propuesto |
| error | Dirección de entrega errónea | Propuesto |
| warning o error | Realizar un pedido sin seleccionar método de pago | [por decidir]: aparece en ambas columnas del tablero |

#### impact

| Interacción | Estilo | Estado |
| --- | --- | --- |
| Prender o apagar toggles | medium | En revisión |

#### Dónde NO usar haptic (por revisar)

- Cancelar una búsqueda.

- Modales nativas con selección (el sistema ya resuelve su feedback).

- Tab bar: es un componente donde la persona se mueve mucho; apps nativas y de delivery revisadas no lo usan.

- Entrada al home o a un storetype: pendiente validar, se inclina a no usar.

### Accessibility

- **Nunca como único canal.** Todo haptic tiene su par visual (color + ícono + texto) y, cuando aplique, sonoro. Es la misma regla que en [Accessibility](accessibility.html): el color no es el único indicador de estado, y la vibración tampoco.

- **Respetar el ajuste del sistema.** Si la persona desactivó las vibraciones del sistema, la app no las fuerza (en Android, nunca usar `FLAG_IGNORE_GLOBAL_SETTING`).

- **Consistencia como apoyo real.** Muchas personas usan los haptics del sistema para saber si algo funcionó o falló cuando no pueden ver la pantalla. Usar los patrones de éxito y error de forma coherente es parte de la accesibilidad, no un extra.

- **Nada largo ni repetitivo.** Evita vibraciones prolongadas o en bucle: pueden resultar incómodas y generan fatiga.

- **No interferir con sensores.** La vibración no debe interrumpir experiencias con cámara, giroscopio o micrófono (ej. escanear un código, grabar un audio para el Rappitendero).

- **Probar con personas reales.** La sensibilidad varía; valida en dispositivos físicos iOS y Android de gama baja y alta, no solo en simulador.

### Do & Don't

- **Usar success al confirmar un pedido, junto al check y el mensaje en pantalla** — no vibres sin ningún cambio visible en la UI.

- **Usar el patrón nativo del switch del sistema** — no sumes un haptic custom a un control que ya vibra por defecto (se duplica).

- **Reservar error para fallas reales (cupón no válido)** — no uses el mismo patrón para éxito y error.

- **Un haptic corto y nítido por evento** — no uses vibraciones largas, en bucle o en cada scroll.

- **Dejar que la persona apague los haptics y que la app siga siendo clara** — no dependas del haptic para comunicar información compleja.

### Dependencies

- [Accessibility](accessibility.html): los haptics son un canal más de feedback y heredan la regla de "nunca un solo indicador".

- [Motion](motion.html): haptic y animación deben ir sincronizados (ej. el impact al encajar una vista coincide con el final de la animación). [por documentar]

- **Componentes que disparan haptics:** stepper (`button-stepper`), toggle (`switch`), slider, filtros (`tags/carousel/standard-filters`), snackbars, `inputs/PIN`. Documentar en cada ficha de componente qué haptic dispara y cuándo. [por confirmar]

- [Content](../content.html): el mensaje visual que acompaña a un warning o error sigue la guía de voz y tono.

### Open items before Stable

> **Decidir** si "pedido sin método de pago" es warning o error. **Cerrar** los ítems "En revisión" de selection (filtros con selección, ir a pagar, ver canasta, cerrar modales, storetype). **Definir** el uso de impact: el tablero lo deja en revisión porque sus niveles no tienen una intención clara para Rappi. **Validar** la migración en Android de EFFECT_* a constantes por acción (CONFIRM, REJECT, SEGMENT_TICK, TOGGLE_ON/OFF), y definir qué usar para warning. **Confirmar** con desarrollo la nomenclatura haptic/*.

### References

- Origen en Figma: FigJam **haptics-rappi** (`fileKey 5aOqmDJMcu1dsNZIIWhe94`), secciones "Haptics ¿Qué son?", "Dimensiones hápticas", "Tipos de Haptics", "Principios", "Implementación" y "Proposal Rappi experience".

- DS y guías consultadas: Apple Human Interface Guidelines (Playing haptics, Accessibility), Android Developers (Haptics design principles, Add haptic feedback to events), AOSP (UX foundation for haptic framework).

| Campo | Valor |
| --- | --- |
| Versión | 0.1 (borrador para revisión interna) |
| Propietario | Equipo de Design System, Mustache |
| Última actualización | 24 sep, 2026 |


## Icons

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Guía de estilo de iconografía del Mustache Design System: cómo construir, nombrar y usar los íconos de Rappi de forma consistente.

- **Versión** 2.0

- **Estilos** Outline · Filled

- **Grilla** 24×24px

- **Export** SVG · PNG · JPG

### ¿Qué es un ícono?

Los íconos son símbolos visuales que representan objetos, acciones o conceptos de forma inmediata y universal. Son independientes del idioma, ocupan poco espacio y reducen la carga cognitiva del usuario cuando se usan correctamente.

Un ícono efectivo es:

- **Reconocible:** el usuario entiende su significado de forma inmediata.

- **Distinto:** no se confunde con otros íconos del sistema.

- **Consistente:** sigue las mismas reglas de construcción que el resto del set.

- **Escalable:** funciona correctamente en todos los tamaños definidos.

> Los íconos deben usarse con moderación. Un exceso de íconos sin texto de apoyo aumenta la ambigüedad, no la reduce.

### Principios de diseño

Los íconos son una extensión visual de la marca. **Rappi es directa, accesible, dinámica y cercana**, y eso se traduce en íconos que:

- Tienen trazos de peso consistente (ni demasiado delgados ni pesados).

- Usan esquinas ligeramente redondeadas (ni puntiagudas ni excesivamente suaves).

- Son figurativos y literales, no abstractos.

- Priorizan la claridad sobre la complejidad.

house

email

stopwatch

lightbulb

credit-card

### Anatomía del ícono

#### Grilla base

Todos los íconos se construyen sobre una grilla de **24×24px**, con un área viva de **20×20px** y un margen de contenedor de **2px** por lado.

Frame total · 24×24px — el espacio que ocupa en la interfaz.

Área viva · 20×20px — donde vive el elemento principal.

Margen · 2px por lado — zona de respiro.

#### Grilla de píxeles

Alinea siempre los elementos a la grilla de píxeles para que las líneas se rendericen nítidas. Las líneas rectas deben quedar exactamente sobre un píxel; las curvas también se construyen sobre la grilla. En Figma, activa `Snap to pixel grid`.

#### Grilla óptica

Los objetos circulares se perciben más pequeños que los rectangulares aunque midan lo mismo. Para compensarlo:

- **Cuadrado / rectángulo** → llega al borde del área viva.

- **Círculo** → se extiende ligeramente más allá para equilibrar el peso visual.

- **Formas diagonales o irregulares** → el objeto dominante se centra óptica y geométricamente.

#### Bounding box

El cuadro completo de 24×24px se usa **solo** cuando el ícono incluye elementos extra (badges, alertas, indicadores). Para íconos simples, el elemento principal vive dentro del área viva de 20×20px.

### Estilos

Rappi tiene dos estilos de íconos; la elección depende del contexto y la necesidad de comunicación.

Outline (trazo)

star

heart

Usa líneas para definir la forma. Es el **estilo principal**: más detalle y precisión, percepción ligera y moderna, para la mayoría de contextos.

Filled (relleno)

star

heart

Usa formas sólidas. Para estados **activo/seleccionado** (ej. un tab activo), contextos de alta densidad o cuando la reconocibilidad inmediata es prioritaria.

> **Regla de consistencia:** nunca mezcles outline y filled en el mismo conjunto o componente, a menos que sea intencional para comunicar un estado diferente.

### Construcción

#### Color

Los íconos de producto usan **un solo color: negro** (o el color de texto del sistema), para que sean fáciles de reutilizar y adaptar.

- Íconos de producto: 1 color.

- Íconos de marketing: máximo 2 colores si es esencial para la marca.

- 3 o más colores = ilustración, no ícono.

Los diseñadores ajustan el color en sus archivos individuales, nunca en el archivo maestro.

#### Tamaño y escala

16px

24px · base

32px

| Tamaño | Uso recomendado |
| --- | --- |
| **16px** | Alta densidad: tablas, listas compactas, inputs. |
| **24px** | Uso general en la interfaz (tamaño base). |
| **32px** | Mayor jerarquía: empty states, onboarding, encabezados. |

Diseña primero en el tamaño más grande y reduce: es más fácil simplificar que añadir detalle. Para marketing (80px+), considera añadir detalle que a 24px no sería visible.

#### Trazos (strokes)

- Grosor de línea estándar: **2px**, igual en todo el set.

- El espacio entre trazos paralelos no debe ser menor que el grosor del trazo (2px mínimo).

- No usar íconos outline en tamaños menores a **10px** (se vuelven ilegibles).

#### Terminaciones y esquinas

**Terminaciones:** redondeadas en todo el set, de forma consistente. **Esquinas:** redondeadas según la composición; en formas concéntricas, el radio interior siempre es menor que el exterior.

#### Formas geométricas

Parte de formas básicas (rectángulos, cuadrados, círculos). Para diagonales, **no rotes un rectángulo**: dibuja los vértices directamente sobre la grilla de píxeles.

#### Metáfora y legibilidad

La metáfora es la asociación conceptual que hace entendible el ícono (una casa = inicio, un insecto = error). Al reducir de tamaño, mantén la metáfora, no la forma exacta: conserva los detalles importantes y simplifica en lugar de eliminar.

#### Boolean operations en Figma

| Operación | Qué hace |
| --- | --- |
| **Union** | Combina formas; la ruta exterior es la suma menos los solapamientos. |
| **Subtract** | Elimina el área de una forma sobre otra (huecos, ventanas). |
| **Intersect** | Conserva solo el área donde las formas se superponen. |
| **Exclude** | Conserva solo las áreas que no se superponen. |

Al terminar un ícono, aplica **Union** para dejarlo como un solo objeto: así otros diseñadores pueden cambiar el color fácilmente.

### Nombrado y organización

Nombra los íconos por **lo que representan visualmente**, no por su función conceptual.

| Correcto | Incorrecto |
| --- | --- |
| `stopwatch` | `speed` |
| `lightbulb` | `idea` |
| `house` | `home` |

- Nombres en minúsculas, palabras separadas por guión: `chef-hat`, `credit-card`.

- Cortos y descriptivos.

#### Variantes con slash

Usa `/` para separar el estilo y las variantes del nombre base:

> outline/email · filled/email outline/shield · outline/shield-dollar · outline/shield-euro

#### Jerarquía de organización

> Estilo (outline / filled)   └── Categoría (communication, navigation, finance…)       └── Nombre del ícono (email, arrow-right…)

> **Keywords:** usa el campo de descripción del componente en Figma para sinónimos de búsqueda. Ej. `lightbulb` → "idea, sugerencia, consejo, tip, inspiración".

### Categorías del sistema

El set de íconos de Rappi está organizado en las siguientes categorías:

AccessibilityAlertAlphabetAnimalsArrowsAstronomyAutomotiveBuildingsBusinessCampingCharityCharts + DiagramsChildhoodClothing + FashionCodingCommunicationConnectivityConstructionDesignDevices + HardwareDisaster + CrisisEditingEducationEmojiEnergyFilesFilm + VideoFood + BeverageFruits + VegetablesGamingGendersHalloweenHandsHolidaysHouseholdHumanitarianLogisticsMapsMaritimeMarketingMathematicsMedia PlaybackMedical + HealthMoneyMovingMusic + AudioNatureNumbersPhotos + ImagesPoliticalPunctuation + SymbolsReligionScienceScience FictionSecurityShapesShoppingSocialSpinnersSports + FitnessText FormattingTimeToggleTransportationTravel + HotelUsers + PeopleWeatherWriting

### Exportación y formatos

| Formato | Uso |
| --- | --- |
| **SVG** | Desarrollo (web y app). Código limpio y escalable. |
| **PNG** @1x/@2x/@3x | Partners externos, materiales de marketing. |
| **JPG** | Casos específicos donde no se requiere transparencia. |

Al exportar SVGs desde Figma: el ícono debe ser un solo objeto (aplica Union), sin capas vacías, líneas sobrantes ni elementos fuera del frame de 24×24px.

### Gobernanza y colaboración

#### Quién puede editar

El archivo maestro tiene edición **solo para el equipo de Design Systems**; el resto tiene acceso de visualización y uso de librería. Así cada ícono se audita antes de entrar, no hay duplicados y los cambios se propagan a todos los usos.

#### Proceso para agregar un ícono nuevo

- El diseñador solicita el ícono al equipo de Design Systems.

- Se verifica que no exista ya un equivalente (revisar keywords).

- Se diseña siguiendo esta guía.

- Peer review con al menos otro diseñador.

- Se agrega al maestro con nombre y categoría correctos.

- Se comunica la actualización al equipo.

#### Coordinación con Ingeniería

Antes de iniciar un set nuevo o cambios estructurales, habla con ingeniería: formatos preferidos para el stack, tamaños ya en uso y convenciones de nombres esperadas en los componentes.

### Checklist de calidad

Antes de agregar un ícono al sistema, verifica:

- Construido sobre grilla de 24×24px con área viva de 20×20px.

- Alineado a la grilla de píxeles.

- Grosor de trazo de 2px (si es outline).

- Terminaciones redondeadas y consistentes.

- Esquinas redondeadas según la composición.

- Un solo objeto (Boolean Union aplicado).

- Sin capas vacías ni elementos fuera del frame.

- Nombre correcto: describe lo que se ve, no lo que significa.

- Categoría asignada.

- Keywords en la descripción del componente.

- Revisado por un segundo diseñador.


## Illustrations 3D's

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Mustache utiliza un estilo de ilustración preciso para ayudar a los usuarios a comprender rápida y claramente cómo funcionan las cosas en cada experiencia.

- **Tabs** Storetypes · Placeholders · Objects · Prime

### Illustrations 3D's

Mustache utiliza un estilo de ilustración preciso para ayudar a los usuarios a comprender rápida y claramente cómo funcionan las cosas en cada experiencia.

Pestañas de esta sección en la fuente: Storetypes | Placeholders | Objects | Prime.

#### Storetypes

| Ilustración | Descripción |
| --- | --- |
| Restaurants | Icono de restaurantes. |
| CPG's | Icono de Mercados. |
| Pharmacy | — |
| More Services | — |
| ecommerce | — |

> **Así está en la fuente.** Pharmacy, More Services y ecommerce no tienen descripción de texto en la página original.

### Placeholders

Galería de ilustraciones, solo con nombre debajo de cada glifo (el resto es contenido visual):

mustacheprofilebasketcpgcpg-whimwhimrest-storeshoptoppingsrestrest-dark

### Objects

gift+coinsgift-detachedgift-goldgift-purpleheartheartsopen-gift-goldopen-gift-gold-promoopen-gift-purpleprime-crownpromospromos-notificationstagtag-primetag-prime-confettiturbo-couponturbo-free-moneyturbo-gold-coupon

### Prime

ATMbubble-chatburgercalendarcashbackchronometercoinscommentsconfettigiftlikemotorcycleprime-crownpromosside-motorcycletag


## Layout

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

En Rappi todos los diseños deben tener como principio el uso correcto de los elementos y espacios, para crear consistencia y claridad en la marca.

- **Tabs** Spacing · Grid

### Layout

En Rappi todos los diseños deben tener como principio, el uso correcto de los elementos y espacios; esto con el fin de crear consistencia y claridad en la marca.

Pestañas de esta sección en la fuente: Spacing | Grid.

### Spacing

El espaciado en un diseño, es una parte fundamental en la consistencia y funcionalidad de una pieza; por esta razón en Mustache, para evitar inconsistencias se establecieron algunos parámetros sobre el espaciado y su uso.

Para el caso de los métodos más usados como: Línea base, líneas claves, líneas de relleno y espaciado incremental; estos lineamientos también son aplicables.

Es necesario tener en cuenta que, la función de los métodos de espaciado es no solo ajustar las proporciones de los contenedores y elementos presentes en la interfaz de usuario, sino también otorgar una consistencia visual a la marca.

Recomendaciones de uso según el sistema operativo para los espaciados son:

- En iOS los componentes deben alinearse a una cuadrícula de línea base (cuadrada) de 8px.

- En el caso de Android, tablets o computadoras de escritorio debe ser de 8dp.

#### Spacing scale

Las escalas en el espaciado, son indispensables para crear proporciones adecuadas. Por esta razón siempre deben ser aplicadas en componentes individuales, organizando los elementos con distancias cortas que generen relaciones balanceadas y con detalles.

| Token | Spacing |
| --- | --- |
| Spacing - 0 | 0px |
| Spacing - 1 | 2px |
| Spacing - 2 | 4px |
| Spacing - 3 | 8px |
| Spacing - 4 | 12px |
| Spacing - 5 | 16px |
| Spacing - 6 | 20px |
| Spacing - 7 | 24px |
| Spacing - 8 | 28px |
| Spacing - 9 | 32px |
| Spacing - 10 | 36px |
| Spacing - 11 | 40px |
| Spacing - 12 | 44px |
| Spacing - 13 | 48px |
| Spacing - 14 | 52px |
| Spacing - 15 | 56px |
| Spacing - 16 | 60px |

#### Margins

Las márgenes, o más conocidas como áreas de seguridad en una pieza, son las propiedades que permiten visualizar de manera clara y sencilla cualquier diseño, haciéndolo más amigable con las personas usuarias.

Al momento de crear márgenes para espaciar y organizar los elementos, se debe tener en cuenta que estas son construidas con base a la cuadrícula y sus propiedades ej.: Una cuadrícula de 8px debe mantener estas mismas proporciones de izquierda a derecha.

Para mantener una consistencia visual, los píxeles mínimos en los costados son de 24px y, de ser necesario según la situación, estos aumentarán sus proporciones de 8px en adelante.

#### Padding

El Padding en nuestros diseños, hace referencia al espaciado presente entre algunos elementos entre sí de la interfaz de la app de Rappi. Este método de espaciado, establece la distancia entre cada elemento en incrementos de 8px o de 4px.

El Padding presente entre un objeto y otro puede ser medido tanto vertical como horizontalmente.

#### Alignment

Las alineaciones en Rappi, corresponden a la ubicación de los elementos dentro de un componente; su uso correcto en cada diseño, genera una mejor lecturabilidad y jerarquía de los objetos dentro de la interfaz.

### Grid

#### Baseline grid

Las cuadrículas base en cada diseño de nuestra app, tienen como finalidad, brindar experiencias más fluidas y claras para nuestras personas usuarias. Su uso en nuestra tipografía, nos garantiza como marca una mayor consistencia visual.

En el caso de los sistemas espaciales, este conjunto de reglas, está creado con el fin de establecer las medidas, espaciados y dimensiones correctas a implementar en nuestra interfaz de usuario.

Las recomendaciones de uso para una cuadrícula son:

- Cada cuadrícula debe utilizar una línea base de 4px.

- Su crecimiento debe ser exponencial en múltiplos de 4px (tanto en iconos como en componentes y dimensiones de cualquier diseño).

- Los objetos dentro de una cuadrícula de 8px deben estar alineados a esta y, de ser necesario, pueden ser múltiplos de 4px.

> **Nota:** las cuadrículas de 4px dan mayor flexibilidad al momento de la creación de los componentes y la organización de la información en la interfaz de usuario.

#### 8pt spatial system

Al momento de aplicar la escala espacial, en la interfaz de usuario, esta puede ser en la margen, espacio, altura y ancho de un elemento o sección.

En el siguiente ejemplo, podrás ver la altura de la línea del texto con 16px, el espaciado de 8px y en la parte superior e inferior, en el caso del botón, una altura de 40px.


## Motion

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

El movimiento puede dar vida a la pantalla, guiar a los usuarios a través de experiencias complejas y ayudarlos a progresar.

### Motion

El movimiento puede dar vida a la pantalla, guiar a los usuarios a través de experiencias complejas y ayudarlos a avanzar, de aquí para allá, de allá a aquí, de principio a fin, y progresar.

Motion ayuda a que una interfaz de usuario sea expresiva y fácil de usar.

### Principles

- **Movimientos suaves y realistas** — Al momento de crear la animación ideal, es necesario a través de las transiciones o movimientos en una composición, narrar de forma coherente y realista el contenido para nuestras personas usuarias.

- **El timing correcto** — Aplicar de manera correcta el tiempo en una transición, permite que la información o mensaje que buscamos comunicar visualmente sea clara y coherente, evitando saltos de tiempo en la narrativa que puedan confundir a las personas usuarias.

- **Coherencia visual** — Lograr sorprender y guiar a nuestras personas usuarias a través del movimiento correcto de los elementos en una composición, aporta además de consistencia, y coherencia una atención diferencial en los contenidos de la marca.

- **Consistencia y carácter** — La personalidad de Rappi vive en todas sus interacciones y comunicaciones, por esta razón cada frame, movimiento o detalle debe reflejar su estilo solucionador, innovador y disruptivo.

### Do & Don't

- **Evita la deformación** — No distorsiones en las dimensiones de los componentes; en el caso de los elementos de aspecto "sólido" su adaptación debe darse de manera realista y controlada sin alterar la calidad visual de la pieza.

- **Aplica una velocidad realista y controlada** — Controlar la aceleración y el frenado en cada gráfica es la forma perfecta para crear en los elementos un efecto de movimiento realista y fresco; por esta razón debemos evitar aplicar acciones que puedan verse rígidas y bruscas en las composiciones.

- **Dibujos sólidos y proporcionados** — Crear objetos o composiciones que reflejen de manera realista su peso, masa o volumen nos asegura que cada diseño sea realista, consistente y pulido.

- **Crea contenidos basados en un objetivo** — El mejor contenido es aquel que guía a nuestras personas usuarias, responde a sus necesidades y tiene un objetivo de negocio; por eso, al momento de crear una animación, cuenta siempre una historia coherente y clara.


## Stroke

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.
>
> ⚠️ **Nombres heredados.** Tokens reales: `stroke/none` (0), `stroke/standard` (1) = strokeMedium, `stroke/selected` (2) = strokeLarge. `strokeSmall` (0.5) no tiene token.

El objeto para definir el color, el ancho y el estilo de un borde o divisor.

### Stroke

El objeto para definir el color, el ancho y el estilo de un borde o divisor.

Puede especificar el color, el ancho y el estilo (sólido, discontinuo o punteado) de un trazo. Dichos trazos tienen muchos usos, incluidos los bordes de los componentes y los componentes divisores.

### Properties

**color** — The stroke color.

**style** — Defines the style of the stroke. Valid values:

- **solid** (default) — a solid stroke.

- **dashed** — a dashed stroke.

- **dotted** — a dotted stroke.

### Stroke Scale

El tamaño del borde está en una escala de 0.5px min.

| Token | Thickness |
| --- | --- |
| strokeSmall | 0.5px |
| strokeMedium | 1px |
| strokeLarge | 2px |


## Typography

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

La tipografía da voz al sistema. Una familia para la interfaz, dos pesos y una escala por breakpoint que mantiene la jerarquía consistente en toda la app.

- **Familia** PP Object Sans

- **Pesos** Regular · Medium

- **Text styles** 39

- **Breakpoints** Mobile · Tablet · Desktop

### Familias tipográficas

**PP Object Sans** es la familia de la interfaz: títulos y contenido. **Archivo Black** es exclusiva del componente **banner-bigFont** (`hugeTitle*`): no es una fuente display general ni se usa en ninguna otra pieza.

Aa Bb Cc 0123

PP Object Sans · interfaz

Aa Bb Cc 0123

Archivo Black · solo banner-bigFont

| Variable | Valor | Uso |
| --- | --- | --- |
| PP Object sans/family/title | PP Object Sans | huge a subheadline |
| PP Object sans/family/content | PP Object Sans | body a legal |
| Archivo Black/family/title | Archivo Black | Solo banner-bigFont (hugeTitleL · M · S) |

> **Nota:** PP Object Sans no está en Google Fonts, así que estos especímenes se muestran con la fuente del sitio como aproximación. El render final usa PP Object Sans embebida.

### Pesos

El sistema trabaja con dos pesos. **Medium (500) reemplazó a Bold** como el peso de énfasis: da jerarquía sin sentirse pesado, alineado con el tono fresco y directo de la marca.

Regular
PP Object sans/weight/Regular · 400

Medium
PP Object sans/weight/Medium · 500

> **Legado:** los text styles `*Bold` (700) siguen en Figma para no romper archivos existentes, y la variable `weight/Heavy` existe sin text style. No los uses en diseño nuevo.

### Escala tipográfica

Cada rol combina familia, peso, tamaño, interlineado y tracking. Tamaño e interlineado cambian por breakpoint: **Mobile** (<600px), **Tablet** (≥600px) y **Desktop** (≥1024px). Especímenes en Mobile.

Huge

huge/hugeMediumPP Object Sans · Medium 50048 / 48 · tracking 0

H1

h1/h1MediumPP Object Sans · Medium 50040 / 40 · tracking 0

H2

h2/h2MediumPP Object Sans · Medium 50032 / 40 · tracking 0

H3

h3/h3MediumPP Object Sans · Medium 50026 / 32 · tracking 0

H4

h4/h4MediumPP Object Sans · Medium 50024 / 32 · tracking 0

Headline

headline/headlineMediumPP Object Sans · Medium 50020 / 24 · tracking 0

Eyebrow de sección

subheadline/subheadlineMediumPP Object Sans · Medium 50010 / 24 · tracking 12% · mayúsculas

Body: el texto base de la interfaz.

body/bodyRegularPP Object Sans · Regular 40016 / 20 · tracking 0

Caption 1: texto de apoyo y metadatos.

caption-1/caption1RegularPP Object Sans · Regular 40014 / 16 · tracking 0

Caption 2: metadatos secundarios.

caption-2/caption2RegularPP Object Sans · Regular 40012 / 16 · tracking 0

Label: tags y badges

label/labelRegularPP Object Sans · Regular 40010 / 12 · tracking 0

#### Tabla completa por breakpoint

| Rol | Mobile | Tablet | Desktop | Pesos |
| --- | --- | --- | --- | --- |
| huge | 48 / 48 | 64 / 72 | 64 / 72 | Bold · Medium · Regular |
| h1 | 40 / 40 | 28 / 34 | 40 / 48 | Bold · Medium · Regular |
| h2 | 32 / 40 | 24 / 32 | 32 / 40 | Bold · Medium · Regular |
| h3 | 26 / 32 | 20 / 28 | 24 / 32 | Bold · Medium · Regular |
| h4 | 24 / 32 | 18 / 26 | 20 / 26 | Bold · Medium · Regular |
| headline | 20 / 24 | 20 / 24 | 18 / 24 | Bold · Medium · Regular |
| subheadline | 10 / 24 | 10 / 16 | 10 / 24 | Bold · Medium · Regular |
| body | 16 / 20 | 16 / 24 | 16 / 24 | Bold · Medium · Regular |
| caption-1 | 14 / 16 | 14 / 20 | 14 / 20 | Bold · Medium · Regular |
| caption-2 | 12 / 16 | 12 / 18 | 12 / 18 | Bold · Medium · Regular |
| label | 10 / 12 | 10 / 14 | 10 / 16 | Bold · Medium · Regular |
| footnote | 8 / 12 | 8 / 12 | 8 / 12 | Regular |
| disclaimer | 6 / 8 | 6 / 8 | 6 / 8 | Regular |
| legal | 4 / 6 | 4 / 6 | 4 / 6 | Regular |

> **Legibilidad:** cuerpo mínimo 16px (`body`) y 12px en UI (`caption-2`). `footnote` (8), `disclaimer` (6) y `legal` (4) existen en Figma pero son ilegibles en pantalla: si un legal lo exige, usa `caption-2`.

### Archivo Black · banner-bigFont

Archivo Black **solo vive en el componente banner-bigFont** (mobile-library Rappi 8), para la cifra o titular protagonista, como el % OFF. El resto del texto del banner va en PP Object Sans. No la uses en otros banners, pantallas ni piezas de marketing: ahí usa `huge` o `h1`.

Tracking **−4%** e interlineado menor que el tamaño, a propósito: titulares de 1 o 2 líneas.

          -50% hoy

Archivo-Black/hugeTitleL46/34 · 52/40 · 64/48tracking −4%

          -50% hoy

Archivo-Black/hugeTitleM40/32 · 48/34 · 56/40tracking −4%

          -50% hoy

Archivo-Black/hugeTitleS30/26 · 32/28 · 46/34tracking −4%

| Estilo | Cuándo usarlo dentro del bigFont |
| --- | --- |
| hugeTitleL | El protagonista: la cifra estrella (precio, % de descuento o nombre del evento). Uno por banner. |
| hugeTitleM | El titular de apoyo: titular principal cuando el banner tiene imagen fuerte o poco espacio. |
| hugeTitleS | El contenido: banners compactos, formatos verticales o cuando acompaña a otro elemento sin robar el foco. |

### Text styles

Hay **39 text styles** en la librería semantics, todos ligados a las variables de la colección `Typography`. Nombre: `rol/rolPeso`. En código, cada uno tiene su clase en `tokens.css`.

| Text style | Clase CSS | Peso | Mobile |
| --- | --- | --- | --- |
| huge/hugeBold | `.rp-text-huge-bold` | Bold 700 (legado) | 48 / 48 |
| huge/hugeMedium | `.rp-text-huge-medium` | Medium 500 | 48 / 48 |
| huge/hugeRegular | `.rp-text-huge-regular` | Regular 400 | 48 / 48 |
| h1/h1Bold | `.rp-text-h1-bold` | Bold 700 (legado) | 40 / 40 |
| h1/h1Medium | `.rp-text-h1-medium` | Medium 500 | 40 / 40 |
| h1/h1Regular | `.rp-text-h1-regular` | Regular 400 | 40 / 40 |
| h2/h2Bold | `.rp-text-h2-bold` | Bold 700 (legado) | 32 / 40 |
| h2/h2Medium | `.rp-text-h2-medium` | Medium 500 | 32 / 40 |
| h2/h2Regular | `.rp-text-h2-regular` | Regular 400 | 32 / 40 |
| h3/h3Bold | `.rp-text-h3-bold` | Bold 700 (legado) | 26 / 32 |
| h3/h3Medium | `.rp-text-h3-medium` | Medium 500 | 26 / 32 |
| h3/h3Regular | `.rp-text-h3-regular` | Regular 400 | 26 / 32 |
| h4/h4Bold | `.rp-text-h4-bold` | Bold 700 (legado) | 24 / 32 |
| h4/h4Medium | `.rp-text-h4-medium` | Medium 500 | 24 / 32 |
| h4/h4Regular | `.rp-text-h4-regular` | Regular 400 | 24 / 32 |
| headline/headlineBold | `.rp-text-headline-bold` | Bold 700 (legado) | 20 / 24 |
| headline/headlineMedium | `.rp-text-headline-medium` | Medium 500 | 20 / 24 |
| headline/headlineRegular | `.rp-text-headline-regular` | Regular 400 | 20 / 24 |
| subheadline/subheadlineBold | `.rp-text-subheadline-bold` | Bold 700 (legado) | 10 / 24 |
| subheadline/subheadlineMedium | `.rp-text-subheadline-medium` | Medium 500 | 10 / 24 |
| subheadline/subheadlineRegular | `.rp-text-subheadline-regular` | Regular 400 | 10 / 24 |
| body/bodyBold | `.rp-text-body-bold` | Bold 700 (legado) | 16 / 20 |
| body/bodyMedium | `.rp-text-body-medium` | Medium 500 | 16 / 20 |
| body/bodyRegular | `.rp-text-body-regular` | Regular 400 | 16 / 20 |
| caption-1/caption1Bold | `.rp-text-caption-1-bold` | Bold 700 (legado) | 14 / 16 |
| caption-1/caption1Medium | `.rp-text-caption-1-medium` | Medium 500 | 14 / 16 |
| caption-1/caption1Regular | `.rp-text-caption-1-regular` | Regular 400 | 14 / 16 |
| caption-2/caption2Bold | `.rp-text-caption-2-bold` | Bold 700 (legado) | 12 / 16 |
| caption-2/caption2Medium | `.rp-text-caption-2-medium` | Medium 500 | 12 / 16 |
| caption-2/caption2Regular | `.rp-text-caption-2-regular` | Regular 400 | 12 / 16 |
| label/labelBold | `.rp-text-label-bold` | Bold 700 (legado) | 10 / 12 |
| label/labelMedium | `.rp-text-label-medium` | Medium 500 | 10 / 12 |
| label/labelRegular | `.rp-text-label-regular` | Regular 400 | 10 / 12 |
| footnote/footnoteRegular | `.rp-text-footnote-regular` | Regular 400 | 8 / 12 |
| disclaimer/disclaimerRegular | `.rp-text-disclaimer-regular` | Regular 400 | 6 / 8 |
| legal/legalRegular | `.rp-text-legal-regular` | Regular 400 | 4 / 6 |
| Archivo-Black/hugeTitleL | `.rp-text-hugetitlel` | Regular | 46 / 34 |
| Archivo-Black/hugeTitleM | `.rp-text-hugetitlem` | Regular | 40 / 32 |
| Archivo-Black/hugeTitleS | `.rp-text-hugetitles` | Regular | 30 / 26 |

### Variables

Colección `Typography` en semantics: **42 variables** con modos Mobile, Tablet y Desktop. En CSS: `--rp-type-<familia>-<propiedad>-<rol>`, ya resueltas por breakpoint.

| Grupo | Variables | Ejemplo CSS |
| --- | --- | --- |
| PP Object sans/family | title, content | `--rp-font-family-title` |
| PP Object sans/weight | Heavy, Bold, Medium, Regular | `--rp-font-weight-medium` (500) |
| PP Object sans/size | huge, h1–h4, headline, subheadline, body, caption-1, caption-2, label, footnote, disclaimer, legal | `--rp-type-pp-object-sans-size-body` |
| PP Object sans/line-height | los mismos 14 roles | `--rp-type-pp-object-sans-line-height-body` |
| Archivo Black/family · weight | title · Regular | `--rp-font-family-display` |
| Archivo Black/size · line-height | hugeTitleL, hugeTitleM, hugeTitleS | `--rp-type-archivo-black-size-hugetitlel` |

### Revisión pendiente en Figma

Inconsistencias encontradas en semantics. Hasta resolverlas, los valores de esta página siguen las **variables**.

- **subheadline/*** usan `line-height/headline` en vez de `line-height/subheadline`: en Tablet dan 24 en vez de 16.

- **h1/h1Regular** tiene el peso ligado al primitivo `font/weight/Regular`.

- **legal/legalRegular** tiene size y line-height ligados a primitivos.

- En Tablet, `size/h1` (28) y `line-height/h3` (28) son valores fijos sin alias.

- En Tablet, h1 a h4 son más chicos que en Mobile (h1 28 vs 40).

- No hay variables de letter-spacing ni text-case: el 12% de subheadline y el −4% de Archivo Black solo viven en el text style.


## Add Product

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Agregar los productos a la canasta en Rappi, al igual que como se hace en la vida real, es una de las experiencias que nos hace diferentes e innovadores.

### Add Product

Agregar los productos a la canasta en Rappi, al igual que como se hace en la vida real, es una de las experiencias que nos hace diferentes e innovadores.

### Agregar producto con stepper - Shop

Al momento de agregar un producto a la canasta, los elementos visuales dentro de la card del producto viven una transición visual. Por esto, es necesario tener claro que al momento de dar tap en el signo (+) en la esquina superior derecha, el stepper modificará su tamaño de derecha a izquierda.

Esta modificación en su tamaño sucede en una escala de 0% a 120% (0s - 0,20s) y de 120% a 100% (0,20s - 0,35s); su duración total es de 0,35s logrando así el efecto perfecto en la acción.

Ten en cuenta que, al mismo tiempo que el stepper cambia su visualización, sobre la imagen del producto se colocará una capa blanca con opacidad de 0% a 80% y un fade de duración de 0,35s.

Recuerda, las transiciones mencionadas anteriormente cambian el estado de la canasta. Si deseas conocer más sobre esta interacción visita la sección de Estados de canasta.

### Agregar un producto desde su modal de detalle - Shop

Cuando agregamos un producto desde su modal de detalle, con el stepper del signo (+) ubicado en la parte inferior izquierda, suceden cambios en simultánea: el contador de unidades aumenta, el color del icono (-) cambia a negro y el monto que se visualiza en el botón de "Agregar" se modifica proporcionalmente.

Al momento en que se selecciona el botón "Agregar", la modal desciende, y sobre el signo de (+) sobre el producto agregado, aparece el contador de unidades que entra con una expansión de 0% a 120% (0s - 0,20s) - 120% a 100% (0,20s - 0,35s).

Recuerda que al aplicarse los cambios mencionados, la canasta cambia de estado. Para conocer más sobre estos, visita la sección Estados de canasta.

### Agregar un producto desde su modal de detalle en Restaurantes

En el caso de la vertical de Restaurantes, al momento de agregar un producto desde su modal de detalle, este puede presentar ciertas variaciones como lo es en el caso de los toppings "obligatorios", los cuales, hasta no ser seleccionados y agregados, no permitirán al botón de "Agregar" cambiar su color a verde y así ser accionable para continuar.

Una vez el botón "Agregar" haya sufrido la modificación para ser accionado, la modal descenderá y el título del producto, que se encontraba alineado con el resto de los contenidos, se desplazará 22px a la derecha para dar paso al contador.

En el caso de la animación del contador, esta sufrirá una expansión del 0% a 120% (0s - 0,20s) y de 120% a 100% (0,20s - 0,35s). Simultáneamente, aparece el botón de la canasta de abajo hacia arriba con una duración de 0,45s.

### Estados de canasta

#### Transición de canasta vacía al agregar 1 producto

En el momento en que se agrega el primer producto a la Canasta, el ícono sufre un cambio de color blanco a verde; esta expansión y transición visual se da en una escala de 0% a 120% (0s - 0,20s) y de 120% a 100% (0,20s - 0,35s).

En el instante en que la canasta cambia su color a verde, ocurren 3 rotaciones:

- La primera de 0º a -9º (0s - 0,10s)

- La segunda de -9º a 9º (0,10s - 0,20s)

- La tercera de 9º a 0º (0,20s - 0,30s)

Al finalizar estas 3 rotaciones la canasta pasa a un estado de reposo por 0,20s con escala de 100% para luego tener otra serie de rotaciones:

- La primera de 0º a -9º (0,5s - 1s)

- La segunda de -9º a 9º (1s - 1,10s)

- La tercera de 9º a 0º (1,1s - 1,2s)

Para una duración total de la animación de 1,2s.

#### Transición de la canasta al tener 1 elemento o más

En el momento en el que la canasta ya cuenta con un elemento dentro de esta y se le agrega otro(s), esta experimenta 3 rotaciones:

- La primera de 0º a -9º (0s - 0,10s)

- La segunda -9º a 9º (0,10s - 0,20s)

- La tercera de 9º a 0º (0,20s - 0,30s)

Concluyendo una duración total de 0,3s.


## Dialogs

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

En nuestra interfaz, un diálogo es una “conversación” entre el sistema y las personas usuarias con el fin de solicitar o brindar información.

### Dialogs

En nuestra interfaz, un diálogo es una "conversación" entre el sistema y las personas usuarias con el fin de solicitar o brindar información.

Hay dos tipos de diálogos: modales y no modales; su uso dependerá de aquello que deseamos comunicar.

### Overview

Usar los diálogos en el momento adecuado y de forma clara, nos permite brindar a nuestras personas usuarias información relevante y pertinente. Su aplicación en diferentes escenarios hace del recorrido dentro de nuestra interfaz una experiencia más fluida.

El propósito de un diálogo surge de la acción realizada por la persona usuaria; su principal razón de ser es comunicar de manera clara, sencilla y concisa una información o acción.

#### Anatomía de los diálogos

#### Mejores prácticas

> **Así está en la fuente.** Los títulos "Anatomía de los diálogos" y "Mejores prácticas" no tienen texto de cuerpo debajo en la página original; probablemente sea solo contenido visual.


## Empty states

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Pantallas en nuestra interfaz o sistema que no contienen información, o que informan sobre alguna falla o error.

### Empty states

Los "Empty states" o más conocidos en español como "Espacios vacíos", son aquellas pantallas en nuestra interfaz o sistema que no contienen información o informan sobre alguna falla o error.

> **Así está en la fuente.** La página fuente es muy corta: solo tiene este párrafo introductorio, sin más contenido de cuerpo.


## Loading / Skeleton

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Elementos visuales que comunican a las personas usuarias la continuidad de un proceso en la interfaz o sistema.

### Loading / Skeleton

Los patrones de carga, o animaciones de espera, son elementos visuales que comunican a las personas usuarias la continuidad de un proceso en la interfaz o sistema.

### Overview

Al aplicar las animaciones de carga en nuestra interfaz, podemos asegurarnos que nuestras personas usuarias podrán tener la tranquilidad de entender el proceso o tiempo de carga que está tomando su actividad en la app.

Nielsen Norman Group asegura en su artículo Progress Indicators Make a Slow System Less Insufferable que una correcta aplicación de estos procesos crea una experiencia en nuestra interfaz mucho más amigable.

A continuación encontrarás los diseños más usados en los estados de carga en nuestra interfaz y sus recomendaciones de uso:

- **Animaciones tipo loop** — Recomendado para cargas rápidas o transiciones en el sistema; es conocido por su estilo circular y sencillo.

- **Barras de progreso** — Este tipo de diseño permite comunicarle de manera clara a nuestros usuarios que el sistema necesita unos segundos más para cargar su información o acción.

### Skeleton states

Los estados de esqueleto son la manera simplificada y consistente de mostrar en nuestra interfaz que una acción o información se encuentra cargando.

La función y el uso correcto de los estados de esqueleto simplifica y comunica la información o acción que se está llevando a cabo de forma dinámica en la interfaz.

El uso principal de este estado es en:

- Componentes

- Algunas tablas o tarjetas de datos

- Contenedores (mosaicos)

- Listas estructuradas

En algunos componentes accionables como botones, casillas de relleno o campos dinámicos su aplicación no es del todo necesaria. De igual manera, es importante evitar su uso en modales como notificaciones, menús, etc.

La animación de carga del skeleton se visualiza a través de un reflejo blanco que se desplaza de derecha a izquierda, en un ángulo de 2º con una duración de 0,30s. Esta animación se repite con un intervalo de 1 segundo de duración, hasta que el contenido que se va a mostrar esté listo para ser mostrado.

Una vez el contenido que se presenta donde estaba el skeleton esté cargado, este aparece con una animación de desvanecimiento con un cambio de opacidad de 0% a 100% y una duración total de 0,25 segundos.


## Login

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

El inicio de sesión en un sistema es la acción que permite a las personas usuarias tener acceso a una app o programa.

### Login

El inicio de sesión en un sistema es la acción que permite a las personas usuarias, a través de un nombre de usuario y contraseña, tener acceso a una app o programa.

### Overview

El momento de registro en nuestra app o sistema es la primera interacción con nuestras personas usuarias; por esta razón es necesario crear una experiencia acorde a la etapa a través de nuestro tono de marca.

> **Así está en la fuente.** La página fuente es corta: solo tiene la introducción y este párrafo bajo "Overview".


## Modality

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Soluciones gráficas que, a través de un diseño fluido y sencillo, presentan el contenido de una manera clara que facilita la toma de decisiones.

- **Tabs** Design · Usage

### Modality

Estas soluciones gráficas tienen como fin, a través de su diseño fluido y sencillo, presentar el contenido de una manera clara que facilite la toma de decisiones en las personas usuarias.

Pestañas de esta sección en la fuente: Design | Usage.

### Design

iOS: another component of iOS 13's new look is cards. Since the original SDK, the default presentation style in iPhone has covered the full screen. We're changing that default to a much more fluid, card presentation — and even better, they are dismissible with just a single downwards swipe.

New in iOS 13 we have a standard design for presentations. For example, if I'm here in the Contacts app and I tap plus to add a new contact, we have a new presentation style that looks like this, rather than the full screen presentation that we had before. You can see that the root view controller's view is not as scaled down and not removed from the view hierarchy.

#### ¿Cuándo usar un estilo determinado?

Elegir entre todas las opciones que nos da Apple/Android puede ser algo complejo.

En primer lugar, debemos evaluar si realmente necesitamos una vista modal o no.

Una experiencia modal saca a las personas de su contexto actual, por lo que es esencial usar modales solo cuando le brindan un beneficio al usuario.

No deseamos molestar a nuestros usuarios. Pero, cuando decida utilizar un modal, su elección debe basarse en el nivel o la complejidad del compromiso. Use una hoja para contenido modal no inmersivo que no resulte en una tarea compleja.

Utilice una vista modal de pantalla completa para contenido envolvente, como videos, fotos o vistas de cámara, o una tarea compleja que se beneficie de una presentación de pantalla completa, como marcar un documento o editar una foto.

#### Buenas prácticas

Si al final decide usar una modal, considere y recuerde lo siguiente:

- ¿Puedes decir claramente cuál es el propósito de este modal? Mantenga las tareas modales simples, cortas y enfocadas.

- Las modales siempre deben incluir un botón de descarte. No solo permitirá a los usuarios que no conocen el gesto de descartar el modal, sino que también mejorará la accesibilidad.

- Independientemente de si las personas usan el gesto de deslizar o un botón para cerrar la vista, si la acción puede provocar la pérdida de datos generados por el usuario, presente una hoja de acciones que explique la situación y brinde a las personas formas de resolverla (como "Eliminar borrador" y "Guardar borrador" al descartar un nuevo correo electrónico).

- En general, es recomendable agregar un título a un modal que describa su propósito. A veces es necesario incluir un subtítulo para mayor comprensión.

#### Tipos de Modales

Pueden ocupar toda la pantalla, o una parte de ella. Pueden estar centrados, fijados en la parte superior o inferior. A veces aparecen, a veces se deslizan. No es de extrañar que esto sea confuso.

**Pickers** — Este tipo de modal requiere una decisión antes de poder continuar. Puede ser un cuadro de diálogo de advertencia que le permite especificar qué desea hacer o qué modo desea seleccionar.

**Popover / Hoja de acciones / Innap** — Popover ayuda si el contexto de la pantalla anterior es importante. La hoja de acciones es la mejor para mostrar múltiples acciones: es una opción segura cuando no tiene mucho contenido adicional para mostrar además de la lista. Innap hace un gran trabajo explicando la relación entre puntos de vista; si necesita hacer una pregunta u obtener un permiso del usuario, lo mejor es ir con una alerta. Ninguno de esos ocupa toda la pantalla, porque están destinados a ser rápidos de usar: haces una selección y estás de vuelta.

**Doers** — Esos modales son para realizar tareas. Son excelentes para agregar, editar, básicamente cualquier tarea compleja.

**Pantalla completa** — El tipo más común de modal. Cubre toda la pantalla, lo que requiere toda la atención. Diseñado para tareas complejas que pueden tener múltiples pasos. Para los modales de pantalla completa, generalmente se acepta que la acción principal (Listo / Guardar / Cerrar) siempre está en la esquina superior derecha, y la acción destructiva (Cancelar) debe estar en la esquina superior izquierda.

**Pantalla Parcial** — A veces tiene una función que afecta una parte de la vista principal. En ese caso, es útil mostrarlo en segundo plano, para el contexto: la gente obtendrá instantáneamente lo que hace el modal. Cuando selecciona la vista de la pantalla parcial, hay dos cosas adicionales a tener en cuenta: elige una animación apropiada (si una vista está relacionada con algo en la parte superior de la pantalla, deja que se deslice desde allí) y agrega un gesto cercano (cuando los modales aparecen con una cierta animación, las personas a menudo intentan revertirla con gestos; apoyarlo hará que la aplicación se sienta más natural). A veces la función puede referirse a una parte específica de la vista anterior, lo que significa que también se puede usar un popover ahí.

**Sábanas** — El estilo de presentación de la hoja aparece como una tarjeta que cubre parcialmente el contenido subyacente y atenúa todas las áreas descubiertas para evitar la interacción con ellas. El borde superior de la vista principal o una tarjeta anterior es visible detrás de la tarjeta actual para ayudar a las personas a recordar la tarea que suspendieron cuando abrieron la tarjeta. Las personas descartan una tarjeta deslizando hacia abajo desde la parte superior de la pantalla, deslizando hacia abajo desde cualquier lugar de la pantalla cuando el contenido de la tarjeta se desplaza hacia arriba, o tocando un botón. Use una hoja para contenido modal no inmersivo que no permita una tarea compleja.

**Pantalla Completa** — El estilo de presentación a pantalla completa cubre toda la pantalla. La vista anterior está completamente cubierta, minimizando la distracción visual. Las personas descartan una vista modal de pantalla completa tocando un botón. Use una vista modal de pantalla completa para contenido envolvente, como videos, fotos o vistas de cámara, o una tarea compleja que se beneficie de una presentación de pantalla completa, como marcar un documento o editar una foto.

Los modales son una herramienta muy efectiva. Al principio puede resultarle difícil de conseguir. Pero cuando lo haces bien, tu aplicación se sentirá mucho más rápida y fácil de usar.

> **Así está en la fuente.** La página menciona un diagrama de flujo de referencia rápida para elegir el tipo de modal, pero es solo contenido visual (sin texto extraíble).

### Usage

#### Ejemplo Sábana - Detalle de producto

Cuando seleccionamos un elemento para conocer sus detalles o elegir sus características, la modal en la que este se encuentra presente inicia una transición desde la parte inferior hacia la parte superior de la pantalla con una duración de 0,20s.

En el mismo momento en el que la modal, con el elemento mencionado, atraviesa esa transición, una capa de color negro se sobrepone en la pantalla inicial con opacidad de 0% a 80% junto a un fade de 0,20s.

Una vez comienza la animación, a los 0,10s, la modal da paso al Tab bar (con el stepper y botón de agregar) desde la parte inferior de la pantalla con una trayectoria de 0,10 segundos en donde ambos elementos concluyen al mismo tiempo su recorrido.

Al cerrarse la modal, esta se convierte en una animación que asciende 24px en 0,10s, posterior a ello desciende hasta el final de la pantalla con una duración de 0,20s.

Es necesario tener presente que, al mismo momento en que la animación de la modal desciende para finalizar su recorrido en la pantalla, en un trayecto de 0,20s, la Tab bar experimenta la misma transición. Así mismo, en el momento en que la modal asciende, el fade de color negro que se encuentra detrás experimenta una opacidad de 80% a 0% con una duración de 0,20s.

#### Ejemplo pantalla parcial - Modal más servicios Home

En el momento en el que se selecciona el botón "Más servicios" en el Home de la app, la modal que ingresa desde la parte inferior de la pantalla hace un recorrido hacia la parte superior de la pantalla con una duración total de 0,20s. Al mismo momento en el que el movimiento sucede, una capa negra se ubica sobre la pantalla con una opacidad de 0% a 80% con 0,20s de duración total.

Al cerrarse la modal, esta se transforma en una animación que asciende 24px con 0,10s de duración, en donde posteriormente la modal vuelve a descender hasta finalizar su interacción en la pantalla con una duración total de 0,20s.

Es necesario tener en cuenta que al momento en que la modal asciende, el fade de la capa negra detrás de esta experimenta una opacidad de 80% a 0% con una duración total de 0,20s.

#### Ejemplo pantalla parcial - Oferta

La modal promocional, que surge en la pantalla del Home sin que el usuario realice alguna acción previa, ocurre cuando buscamos comunicar algún deal o contenido de forma rápida y clara. Esta modal surge de la parte inferior de la pantalla hacia la parte superior y ejecuta un recorrido con una duración de 0,20s hasta su final.

A este tipo de modal, en el momento en el que hace su aparición en pantalla, una capa negra se le sobrepone dándole una opacidad de 0% a 80% con una duración de 0,20s.

Al cerrarse la modal, esta se transforma en una animación que asciende 24px con 0,10s de duración, en donde posteriormente la modal vuelve a descender para finalizar su interacción en la pantalla con una duración total de 0,20s.

Es necesario tener en cuenta que al momento en que la modal asciende, el fade de la capa negra detrás de esta experimenta una opacidad de 80% a 0% con una duración total de 0,15s.

#### Ejemplo pantalla parcial - Modal Pantalla de rescate

La modal de rescate, que surge en la pantalla del Home sin que el usuario realice alguna acción previa, ocurre cuando buscamos comunicar al usuario que su pedido fue entregado y damos opciones para tener soporte sobre esta orden. Esta modal surge de la parte inferior de la pantalla hacia la parte superior y ejecuta un recorrido con una duración de 0,20s hasta su final.

A este tipo de modal, en el momento en el que hace su aparición en pantalla, una capa negra se le sobrepone dándole una opacidad de 0% a 80% con una duración de 0,20s.

Al cerrarse la modal, esta se transforma en una animación que asciende 24px con 0,10s de duración, en donde posteriormente la modal vuelve a descender hasta finalizar su interacción en la pantalla con una duración total de 0,20s.

Es necesario tener en cuenta que al momento en que la modal asciende, el fade de la capa negra detrás de esta experimenta una opacidad de 80% a 0% con una duración total de 0,15s.

#### Ejemplo pantalla completa - Modal entrega estimada

Al seleccionar el componente del seguimiento de la orden en el header, comienza la entrada de la pantalla del ETA. Esta pantalla completa surge de la parte inferior de la pantalla hacia la parte superior y ejecuta un recorrido con una duración de 0,20s hasta su final.

0,10s después de que la pantalla llega a su posición final, se incorpora a la visualización de esta un componente de Handle desde la parte inferior, con una duración total de 0,20s.

Al mismo tiempo, desde la parte superior de la pantalla, entra el componente del Tiempo de Entrega con una duración total de 0,20s con un desplazamiento hacia abajo.

0,20s después de que la pantalla completa entra a su posición final, entra el componente de informational messages. Este componente asciende desde la parte de atrás del componente con Handle, realizando un desplazamiento de 50px hacia arriba con una duración total de 0,20s.

Al cerrarse esta pantalla del ETA, esta desciende hasta finalizar su recorrido en la parte inferior de la pantalla con un tiempo total de 0,20s.


## Onboarding

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Brindarle a nuestras personas usuarias una primera experiencia sencilla, rápida e intuitiva en nuestra app nos acercará a cautivarlos.

### Onboarding

Brindarle a nuestras personas usuarias una primera experiencia sencilla, rápida e intuitiva en nuestra app nos acercará a cautivarlos.

### Mejores prácticas

Para brindar esta primera gran experiencia en nuestra app, es ideal tener en cuenta estas acciones a través de los contenidos y elementos implementados:

- Crea una experiencia disfrutable que no requiera que las personas deban recordar pasos o información que le solicitarás después.

- Guía y ayuda a través de los elementos y el contenido ideal a las nuevas personas usuarias con el fin de lograr su propósito en el app de una forma sencilla y entretenida.

- Enseña a través de elementos interactivos y un buen storytelling cómo la persona usuaria puede lograr sus objetivos en nuestra app, ya sea desde pedir su hamburguesa favorita, hasta su mercado del mes.

- Integra elementos visuales que guíen el proceso y gestionen paso a paso el recorrido del usuario en el app.


## Search

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

El principal objetivo de nuestros usuarios está en encontrar de manera rápida y sencilla aquello que necesitan en minutos.

### Search

El principal objetivo de nuestros usuarios está en encontrar de manera rápida y sencilla aquello que necesitan en minutos.

El buen diseño e implementación de las barras de búsqueda, les ayudará a cumplir con su objetivo.

A search bar allows people to search through a large collection of values by typing text into a field. A search bar can be displayed alone, or in a navigation bar or content view. When displayed in a navigation bar, a search bar can be pinned to the navigation bar so it's always accessible, or it can be collapsed until the user swipes down to reveal it.

### Buscador en vertical

Al momento de seleccionar el Buscador presente dentro del Home de una vertical, este se desplazará 20px hacia arriba con una duración total de 0,25s; al mismo momento la barra disminuye su tamaño de forma uniforme de 100% a 72%. En el mismo momento en el que la barra se desplaza viviendo estas transiciones, el ícono presente al interior de la barra se desvanece con una opacidad de 100% a 0%.

Simultáneamente, el contenido del Home de la vertical se desplaza hacia arriba con una duración total de 0,40s al mismo tiempo que se desvanece con una opacidad de 100% a 0% con fade de 0,25s de duración para salir de la pantalla. Paralelamente aparecen las sugerencias del buscador: estas se desplazan 120px hacia arriba y al mismo tiempo cambian su opacidad de 0% a 100% con una duración total de 0,30s.

### Buscador en tienda - Shop

Al estar dentro de una tienda y seleccionar la barra del Buscador, esta se desplaza 235px hacia arriba con una duración de 0,25s hasta su posición final y simultáneamente desaparece el icono dentro de la barra con un desvanecimiento de 100% a 0%. En paralelo, el Header de la pantalla de búsqueda comienza su animación desplazándose 138px de arriba hacia abajo (desde la parte superior de la pantalla) hasta finalizar su recorrido.

Simultáneamente, el contenido del Home de la tienda se desplaza hacia arriba con una duración total de 0,40s al mismo tiempo que se desvanece con una opacidad de 100% a 0% con fade de 0,1s de duración para salir de la pantalla. Paralelamente aparecen las sugerencias del buscador: estas se desplazan 120px hacia arriba y al mismo tiempo cambian su opacidad de 0% a 100% con una duración total de 0,15s.

### Buscador global - Entrada a una tienda

En el momento en que se selecciona una tienda en el listado de resultados del buscador global, la pantalla de la tienda ingresa de izquierda a derecha (para más detalles de esta transición ver la sección "Tipos de entradas").

Sin embargo, al ser una entrada que surge desde el Buscador Global, se diferencia pues al entrar a la pantalla aparece un pop up antes de dar paso a la tienda. El pop up presente en esta transición aparece con una escala de 90% a 100% con una duración de 0,20s con un desvanecimiento de 0% a 100%. Una vez el contenido de la tienda empieza a aparecer, el pop up desaparece cambiando su opacidad de 100% a 0% con una duración total de 0,25s.

Inmediatamente después de que carga por completo la pantalla de la tienda, automáticamente entra al buscador mostrando los resultados de la búsqueda previamente realizada en el buscador global. Los detalles de esta entrada al buscador la puedes encontrar en la sección "Buscador en tienda-shop".


## Settings

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Las personas prefieren las aplicaciones que se adaptan cada vez mejor a sus necesidades a través de sus ajustes personalizados.

### Settings

Las personas prefieren las aplicaciones que se adaptan cada vez mejor a sus necesidades a través de sus ajustes personalizados, conoce cómo hacerlo.

### Mejores prácticas

- Ofrece al momento de cada personalización en los ajustes un contexto breve y claro que le permita a las personas usuarias personalizar esas acciones con base a sus necesidades.

- Permítele a las personas usuarias de forma específica y clara hacer los ajustes y personalizaciones en la interfaz que requieran necesarios para tener una mejor experiencia de uso.

- Elige un elemento gráfico que represente claramente esta función de "ajustes".

- Mantén las configuraciones de sistemas globales, pero adaptables a las personas según su ubicación y cultura. Ej: Accesibilidad, Navegación, Métodos de autenticación, lenguaje, etc.

- Haz de la selección de configuraciones como los Inapp algo de fácil selección sin influenciar o interferir en la activación y vista de estos.


## Transitions to stores

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Conoce de manera detallada cómo ocurren las transiciones desde el Menú hacia una tienda dentro de la app.

### Transitions to stores

Conoce de manera detallada cómo ocurren las transiciones desde el Menú hacia una tienda dentro de la app.

#### Tipos de entradas

### Shop

Al momento de seleccionar y entrar a una tienda, entra la pantalla de la tienda con una transición de 0,40s de derecha a izquierda; en ese mismo lapso de tiempo la barra del buscador también cambia su opacidad de 0% a 100%.

Pasados 0,05 segundos desde que inicia la entrada de la pantalla de la tienda, inicia la animación de la tabla de información. Esta se desplaza de arriba hacia abajo, iniciando detrás de la imagen de la tienda y terminando en su posición final con una duración total de 0,40 segundos.

Pasados 0,30s desde que inicia la entrada de la pantalla, se da paso a la animación del Tab bar, la cual se desplaza desde la parte inferior de la pantalla hasta su posición final con una duración total de 0,3 segundos.

Pasados 0,05 segundos desde que inicia la entrada de la pantalla de la tienda, comienza la animación del Skeleton. Este se desplaza 20px de derecha a izquierda con una duración total de 1 segundo. A los 0,20s de empezar esta transición, al mismo tiempo, el componente cambia su opacidad de 0% a 100% con una duración de 0,40 segundos.

Ten en cuenta que, en caso tal de que el contenido demore en cargar, la animación del Skeleton debe ajustarse con base a las necesidades; para conocer más sobre estas adaptaciones visita la sección Loading / Skeleton states.

Una vez el contenido que se presenta donde estaba el skeleton termine de cargar, este aparece con una animación de desvanecimiento con un cambio de opacidad de 0% a 100% y una duración total de 0,25 segundos.

### Restaurants

Al seleccionar una tienda de restaurantes, la pantalla de este entra con movimientos de derecha a izquierda con una duración total de 0,40 segundos.

Pasados 0,05 segundos desde que inicia la entrada de la pantalla de la tienda, inicia la animación de la tabla de información. Esta se desplaza de arriba hacia abajo, iniciando detrás de la imagen de la tienda y terminando en su posición final con una duración total de 0,40 segundos.

Simultáneamente, comienza la animación del Skeleton. Este se desplaza 20px de derecha a izquierda con una duración total de 1 segundo.

A los 0,20s de empezar esta transición, al mismo tiempo, el componente cambia su opacidad de 0% a 100% con una duración de 0,40 segundos.

Ten en cuenta que, en caso tal de que el contenido demore en cargar, la animación del Skeleton debe ajustarse con base a las necesidades; para conocer más sobre estas adaptaciones visita la sección Loading / Skeleton states.

Una vez el contenido que se presenta donde estaba el skeleton termine de cargar, este aparece con una animación de desvanecimiento con un cambio de opacidad de 0% a 100% y una duración total de 0,25 segundos.


## Button

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.
>
> `disabled` aparece como variante en el paquete, pero en diseño trátalo como **estado**. Tamaños menores a `large` (48px) necesitan hit area extendida a 48px.

Disparador de acción principal en cualquier superficie. Renderiza un `<button>` (o cualquier elemento vía `asChild`) con tokens semánticos de variante y tamaño.

- **Estado** Live

- **Paquete** @rappi/ds-web

- **Extiende** <button>

### Uso

Extiende `<button>`: todos los atributos nativos de HTML, event handlers, props ARIA y atributos `data-*` están soportados junto con las props de abajo.

```
import Button from '@rappi/ds-web/web/atoms/Button';

export function CheckoutCta() {
  return <Button onClick={handle}>Save</Button>;
}
```

```
<Button variant="primary" size="medium" onClick={handle}>Save</Button>
<Button asChild variant="secondary"><a href="/path">Go</a></Button>
```

### Variantes

`variant` define la intención visual y mapea a un rol semántico: **primary** = acción dominante, **secondary** = acción de soporte, **error** = destructiva, **inverse** = sobre superficies oscuras, **disabled** = no disponible. (`neutral` / `outline` existen como alternativas de bajo énfasis, sin story dedicado en la fuente.)

#### Primary variant="primary"

<Button variant="primary">Click me</Button>

#### Secondary variant="secondary"

<Button variant="secondary">Click me</Button>

#### Disabled variant="disabled"

<Button variant="disabled" disabled>Click me</Button>

#### Error variant="error"

<Button variant="error">Click me</Button>

#### Inverse variant="inverse"

<Button variant="inverse">Click me</Button>

### Tamaños

`size` combina escala de spacing y tipografía. **xsmall** es de tipo tag, **xlarge** es para un CTA hero.

| Token | Alto |
| --- | --- |
| `xsmall` | 24px |
| `small` | 32px |
| `medium` | 40px |
| `large` | 48px |
| `xlarge` | 56px |

### Props

| Prop | Descripción | Default |
| --- | --- | --- |
| `variant` | Intención visual. Mapea a un rol semántico: `primary`, `secondary`, `error`, `inverse`, `disabled`, `neutral`, `outline`. | `'primary'` |
| `size` | Escala de spacing + tipografía: `xsmall`, `small`, `medium`, `large`, `xlarge`. | `'medium'` |
| `asChild` | Cuando es `true`, renderiza vía Radix Slot y fusiona las props sobre el único hijo. Úsalo para aplicar el estilo de Button a un link o elemento custom. | `false` |
| `onClick` | Evento — `function`. | — |
| `children` | Slot — `string`. | — |
| `disabled` | Estado — `boolean`. | — |

> **Fuente.** Descripción, props y variantes replicadas 1:1 desde `Rappi Web DS` (Storybook, Atoms / Button). Los colores usan nuestros propios tokens semánticos (`background.accent`, `background.error`, etc.) en vez de los valores originales del paquete.


## Principios de Diseño

> **Fuente: sitio Mustache (contexto).** Si un nombre o valor de este archivo choca con `SKILL.md`, `references/*.md` o `assets/tokens.css`, ganan esos. Avisa de la diferencia.

Los principios de producto son la base de la marca en el área de diseño. Con ellos no solo creamos una marca atractiva, sino una consistente y escalable que responde a las necesidades de las personas usuarias y de nuestro negocio.

#### La data es nuestra principal aliada

Por eso creamos nuestras soluciones basadas en la data y la aplicamos con creatividad en cada uno de nuestros diseños.

**Data, our principal ally.** That's why we create our solutions based on the data and mix them up with the creativity to achieve amazing products.

#### Consistencia y UX

En la búsqueda de brindarle la mejor experiencia a todas nuestras personas usuarias, los diseños que creamos, deben ser fieles a los principios de usabilidad y consistencia básicos como: la simpleza, la relevancia, la eficiencia y la claridad.

**Consistency and UX.** To give our users the best experience, the designs that we create should be human-centered, also respond to basic usability principles like: Simplicity, relevance, efficiency, and clearness.

#### Soluciones innovadoras

Cuando hablamos de soluciones innovadoras en nuestros diseños, hacemos referencia a los principios del Design Thinking, en donde a través de las preguntas correctas y las ideas colaborativas se obtienen grandes resultados.

¡Crear soluciones innovadoras, requiere juntar la creatividad con las herramientas y la data correcta!

**Innovate solutions.** What we're referring to innovated solutions in our designs, we talk about of the Designs Thinking principles. That's because, through the correct questions and collaborative ideas, we can achieve remarkable goals. ¡To make innovative solutions, we need to co-create in a team with the perfect tools like: data, technology, and creativity!

#### Los detalles son nuestra prioridad

Para lograr un gran producto o entregable, se requiere del conjunto ideal de elementos. Por esta razón, cada detalle incluido en una pieza o flujo contribuye a obtener el mejor resultado posible con la misma.

¡Porque un gran diseño no solo luce bien, también es de gran utilidad!

**Details are our priority.** Create a great product or piece, require the perfect set of elements. That's why any detail includes in a piece or flow contributes to having the best result. ¡Remember, a great design does not just look good, it's also much useful!
