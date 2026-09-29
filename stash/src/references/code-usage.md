# Uso de tokens en código

Cómo consumir los tokens de Rappi en distintos stacks. Regla base: **siempre variable semántica, nunca hex**.

## Nomenclatura

El token del DS pasa a variable CSS reemplazando `/` por `-` y con prefijo por grupo:

| Grupo | Token DS | Variable CSS |
|---|---|---|
| Color | `ink/standard` | `--rp-color-ink-standard` |
| Color | `background/weak` | `--rp-color-background-weak` |
| Spacing | `spacing-16` | `--rp-space-16` |
| Spacing (intención) | `vertical/between-sections` | `--rp-space-v-between-sections` |
| Radius | `card` | `--rp-radius-card` |
| Stroke | `standard` | `--rp-stroke-standard` |
| Tipografía | `PP Object sans/size/body` | `--rp-type-pp-object-sans-size-body` |

## CSS / SCSS

```css
@import "./tokens.css";

.button-primary {
  background: var(--rp-color-background-accent);
  color: var(--rp-color-ink-inverse);
  border-radius: var(--rp-radius-pill);
  padding: var(--rp-space-12) var(--rp-space-24);
  font-size: var(--rp-type-pp-object-sans-size-body);
  line-height: var(--rp-type-pp-object-sans-line-height-body);
}
```

## Dark mode

No dupliques colores por modo. Usa la variable y activa el modo en un ancestro:

```html
<html data-theme="dark"> ... </html>
```

O deja que siga el sistema (ya viene `@media (prefers-color-scheme: dark)` en `tokens.css`). Los colores semánticos ya cambian solos entre light y dark.

## React (inline / styled-components)

```jsx
const Card = styled.div`
  background: var(--rp-color-background-standard);
  border: var(--rp-stroke-standard) solid var(--rp-color-line-border-standard);
  border-radius: var(--rp-radius-card);
  padding: var(--rp-space-16);
`;
```

## Tailwind (opcional)

Mapea los tokens en `tailwind.config` apuntando a las variables:

```js
theme: {
  extend: {
    colors: {
      'ink-standard': 'var(--rp-color-ink-standard)',
      'bg-standard': 'var(--rp-color-background-standard)',
      'bg-accent': 'var(--rp-color-background-accent)',
      // ...
    },
    borderRadius: { card: 'var(--rp-radius-card)', pill: 'var(--rp-radius-pill)' },
  }
}
```

## Qué NO hacer

- ❌ `color: #464D59;` → ✅ `color: var(--rp-color-ink-standard);`
- ❌ inventar un token que no existe → pide el token o usa el semántico más cercano.
- ❌ usar un primitive directo (`Colors/green/50`) en código → usa el semántico que lo referencia (`ink/accent`, `background/accent`, etc.).
- ❌ hardcodear un color distinto para dark → una sola variable, el modo la resuelve.
