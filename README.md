# Mustache — Sitio de documentación

Sitio web de referencia del **Mustache Design System** de Rappi. No es la fuente
de verdad del sistema (eso vive en Figma); es el sitio público/interno que
documenta foundations, contenido y marca.

- **Producción:** https://mustache-ds.vercel.app _(confirmar dominio canónico)_
- **Diseño:** Figma — 3 librerías: `primitives`, `icons`, `semantics`

---

## Stack

Sitio 100% estático. **Sin build, sin framework, sin dependencias, sin `package.json`.**

| Capa    | Implementación                                                                 |
| ------- | ----------------------------------------------------------------------------- |
| Markup  | HTML plano. Una página = un archivo `.html` autocontenido                     |
| Estilos | `<style>` en el `<head>` de cada página + `css/site-header.css` compartido    |
| JS      | Vanilla, `<script>` al final del `<body>` + `js/site-header.js` compartido    |
| Fuentes | Google Fonts CDN — Archivo Black (display), Inter (texto), IBM Plex Mono      |
| Deploy  | Vercel, zero-config, auto-deploy en `main`                                    |

**Por qué sin build:** el sitio es chico, tiene que poder editarlo cualquier
diseñador con un editor de texto, y no queremos ni superficie de supply-chain ni
un paso de compilación entre "edito" y "veo".

---

## Estructura

```
├── index.html            Home público
├── design.html           Foundations · Overview + Introduction (enlaza a foundations/)
├── content.html          Content · Voice & tone, product content, gramática
├── brand.html            Neon805 · PromptMaker Neon + Identidad Visual
├── patterns.html         Patterns · Overview (enlaza a patterns/)
├── foundations/          Foundations: una página por tema
│   ├── foundation.html   Foundation · Overview
│   ├── colors.html       Foundation · Color
│   ├── typography.html   Foundation · Typography
│   ├── icons.html        Foundation · Iconografía
│   └── ...               (resto de Foundations — ver sidebar de design.html)
├── patterns/             Patterns: una página por tema (search, onboarding, dialogs…)
├── css/
│   └── site-header.css   Estilos del <site-header> — único CSS compartido
├── js/
│   └── site-header.js    <site-header> Web Component — único JS compartido
└── assets/
    ├── isotype-mustache.svg        Isotipo a color (cuadro + bigote), autocontenido
    ├── isotype-mustache-tint.svg   Isotipo monocromo (currentColor)
    ├── mustache.svg                Wordmark "Mustache" (currentColor)
    ├── system-DSystem.svg          Descriptor "Design System" + divisor (currentColor)
    ├── system-uxSystem.svg         Descriptor "UX System" + divisor (currentColor)
    └── identidad-visual/           Fuentes, fotos y logos usados en brand.html
```

Las páginas dentro de `foundations/` y `patterns/` cargan `css/` y `js/`
compartidos con `../` (por ejemplo `../css/tokens.css`), y el `<site-header>`
usa rutas absolutas (`/design.html`, `/assets/...`) para que el mismo
componente funcione sin importar la profundidad de carpeta de la página que
lo incluye.

El fondo del hero del home es procedural (bubbles orgánicos en CSS +
starfield en `<canvas>`), no una imagen.


Cada página de Foundations es independiente: su propio `<style>`, su propio
scrollspy. Lo único que comparten es el `<site-header>`.

---

## Convenciones

### Design tokens

CSS custom properties semánticas en `:root`, tema oscuro. Hoy se **redeclaran en
cada página** (deuda conocida — ver [Roadmap](#roadmap--deuda-técnica)). Núcleo:

```css
--bg  --bg-2  --panel  --panel-2  --tile      /* superficies */
--line  --line-2                              /* bordes */
--text  --muted  --muted-2  --white           /* tinta */
--display  --body  --mono                     /* familias */
--radius  --topbar  --side  --maxw            /* medidas */
```

Regla: en el markup y CSS del sitio se habla en token, nunca en hex. Hex solo si
ningún token cubre el caso.

### `<site-header>` (Web Component)

Topbar compartida. Light DOM (hereda los estilos globales; requiere
`css/site-header.css` en el `<head>`).

```html
<link rel="stylesheet" href="css/site-header.css" />
<script src="js/site-header.js" defer></script>
...
<site-header active="design"></site-header>
```

- `active` marca el ítem de nav actual: `design` | `content`.
- Bajo **960px** el nav inline colapsa en una pill (sección actual + chevron) que
  abre un dropdown con los mismos ítems. Operable por teclado; cierra con
  `Escape`, click afuera, elegir un ítem o ensanchar sobre el breakpoint.

### Marca — lockup en piezas

El logo se compone de piezas SVG, no de un archivo único:

```
isotipo  +4px  wordmark  [ +4px  descriptor ]
```

Las piezas de una tinta usan `fill="currentColor"` → un archivo sirve en
cualquier color según el `color` del contenedor. El isotipo a color trae su
propio cuadro y va tal cual. En el header, el wordmark se pinta con un CSS
`mask` sobre `var(--text)` para funcionar en la barra oscura desde un solo asset.

### i18n

Atributos `data-en` / `data-es` + un script inline que hace el swap con el toggle
ES/EN. `data-html` cuando el valor lleva markup. **Hoy solo está cableado en
`index.html`.**

```html
<h1 data-html
    data-en="Living.<br>Evolving."
    data-es="Vivo.<br>Evolucionando.">Living.<br>Evolving.</h1>
```

### Motion

Transiciones y `@keyframes` en CSS. Las animaciones de entrada del home se
controlan con una clase `.preload` en `<html>` (la pone un script en el `<head>`
para evitar flash de contenido) que el JS de entrada libera al terminar. Todo
respeta `prefers-reduced-motion: reduce`.

### Layout de Foundations

Sidebar sticky (`--side` = 288px) + `IntersectionObserver` para el scrollspy. El
JS del scrollspy está inline y duplicado por página (deuda — ver Roadmap).

---

## Correr local

No hay que instalar nada. Cualquier server estático sirve:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

**Ábrelo por `http://`, no por `file://`:** el `<site-header>` referencia
`assets/` con rutas relativas y los CSS `mask` no resuelven bien bajo `file://`.

---

## Deploy

Vercel, proyecto `mustache-ds` (team `wspace`). Zero-config: no hay `vercel.json`,
se sirve la raíz tal cual.

- Merge a `main` → deploy a producción.
- Cada PR → preview deploy en `mustache-ds-git-<rama>-wspace.vercel.app`.

---

## Contribuir

1. Rama desde `main` → PR → **squash merge**.
2. CSS de una página va **en esa página**. UI compartida va en
   `css/site-header.css` + `js/site-header.js`.
3. Habla en tokens, no en hex.
4. Si agregas copy al home, pon `data-en` **y** `data-es`.
5. Assets nuevos → `assets/`, SVG optimizado; piezas de una tinta con
   `fill="currentColor"`.

---

## Fuente de verdad

El sistema vive en **Figma** — 3 librerías publicadas: `primitives`, `icons`,
`semantics`. Este repo documenta, no define.

Tipografía oficial: **PP Object Sans** (Regular 400 / Medium 500). No está en
Google Fonts; el sitio la aproxima con Archivo Black (display) + Inter (texto)
hasta auto-hospedarla. Archivo Black trae una sola pesa (400); el `font-weight`
del display queda para el fallback y `font-synthesis: style` en `body` evita el
faux-bold.

---

## Roadmap / deuda técnica

- [ ] Extraer los tokens a un `tokens.css` compartido. Hoy están duplicados por
      página y **ya divergen** (`--radius` es `18px` en `index.html` y `16px` en
      el resto; `--mono` no está en `design.html` ni `content.html`).
- [ ] Auto-hospedar PP Object Sans y reemplazar Archivo Black / Inter.
- [ ] Extraer el scrollspy de Foundations a `js/` compartido.
- [ ] Extender `data-en` / `data-es` más allá del home.
- [ ] Páginas de Components, Brand y Resources.
- [ ] Alinear el footer del home con el sistema de piezas de marca nuevo.

---

Interno · Rappi. No open source.
