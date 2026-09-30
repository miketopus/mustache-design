# Stash · kit "Mustache for Claude"

Todo lo que se descarga desde `claude-md.html` (Tools › AI › Kit Claude) se genera con un comando. No edites `downloads/` a mano.

```bash
npm run build:stash
```

## Qué se edita y dónde

| Quiero cambiar… | Edita |
|---|---|
| La versión de la app (ej. Rappi 8 → Rappi 9) | `stash/stash.config.json` → `appVersion` |
| Qué páginas del sitio entran al kit | `stash/stash.config.json` → `sections` |
| Reglas, cheat sheet y flujo de la skill | `stash/src/SKILL.md` |
| Guías escritas a mano (color, tipografía, voz y tono, íconos…) | `stash/src/references/*.md` |
| Tokens | `stash/src/assets/tokens.css` y `rappi-design-tokens.json` |
| Foundations, patterns, components, principios | Las páginas del sitio (`foundations/`, `patterns/`…). El build las convierte solo. |

## Qué genera

- `downloads/mustache-ds-skill.zip`: la skill, con `references/site/` armado desde el sitio.
- `downloads/mustache-ds-guidelines.md`: todo en un archivo, para Projects.
- `downloads/tokens.css` y `downloads/rappi-design-tokens.json`.
- `claude-md.html`: versión, fecha, pesos, cantidad de archivos y árbol de la skill (elementos con `data-stash="…"`).

## Cuándo correrlo

Cada vez que publiques cambios en el sitio o en `stash/src/`, antes del commit. Revisa el diff de `claude-md.html` y súbelo junto con `downloads/`.

## Placeholders en `SKILL.md`

- `{{VERSION}}`: versión de la app.
- `{{DATE}}`: fecha del build.
- `{{SITE_GUIDES}}`: índice de las guías del sitio. Va al final del archivo.
