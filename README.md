# Mustache

Sitio de documentación del **Design System de Rappi**. La fuente de verdad es **Figma** (`primitives`, `semantics`, `icons`); este repo documenta y distribuye.

## Correr local

Necesitas Node 18+.

```bash
npm run dev
```

Abre http://localhost:5173 (siempre por `http://`, no con doble clic).

## Qué hay

| Sección | Archivos |
|---|---|
| Home | `index.html` |
| Design · Foundations | `design.html`, `foundations/` |
| Content | `content.html` |
| Components | `components.html`, `components/` |
| Patterns | `patterns.html`, `patterns/` |
| Brand | `brand.html` |
| Stash/Resources | `stash.html` (overview), `claude-md.html` (kit para Claude), `resources.html` (otros recursos) |

## Stash

Kit para usar Mustache con Claude: skill, guía `.md` y tokens. Se descarga desde `claude-md.html`.

```bash
npm run build:stash
```

- Regenera todo en `downloads/` desde las páginas del sitio y `stash/src/`. **No edites `downloads/` a mano.**
- La versión de la app (hoy **Rappi 8**) está en `stash/stash.config.json`.
- Córrelo antes del commit si cambiaste el sitio o `stash/src/`. Detalle en [`stash/README.md`](stash/README.md).

## Reglas básicas

- HTML, CSS y JS sin framework. Lo compartido vive en `css/` y `js/`; lo de una página, en esa página.
- Tokens de `css/tokens.css`, no hex.
- El menú está en `js/site-header.js`. **Si lo cambias, cambia también el menú del home** (`index.html`).
- Logos nuevos en `assets/identidad-visual/logos/`, en SVG.

## Deploy

Vercel. Merge a `main` publica; cada PR tiene su preview.
