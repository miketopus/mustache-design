#!/usr/bin/env node
/**
 * npm run build:components
 *
 * Genera una página por componente a partir de su contrato JSON:
 *   components/data/<slug>.json  ->  components/<slug>.html
 * Imágenes del contrato: assets/components/<slug>/<archivo>.
 *
 * No edites components/<slug>.html a mano si tiene contrato: edita el JSON
 * y vuelve a correr el script. Las páginas sin contrato (ej. button.html)
 * no se tocan.
 *
 * Regla del DS: las celdas de token muestran SOLO el nombre semántico.
 * Si un contrato trae "token (#RRGGBB)" (formato uSpec), el hex se quita.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'components', 'data');
const OUT_DIR = path.join(ROOT, 'components');

// Mismo menú que components.html / button.html. Un item se vuelve link
// cuando existe un contrato cuyo component.family coincide con su label.
const SIDEBAR_GROUPS = [
  { title: 'Bars', items: ['Modal Sheets', 'Navigation Bars', 'Search Bars', 'Tab Bars'] },
  { title: 'Controls', items: ['Buttons', 'Chips', 'Checkboxes', 'Filters', 'Loaders', 'Notifications', 'Pagination', 'Pills', 'Pop-up', 'Progress', 'Radiobuttons', 'Snackbars', 'Sliders', 'Switches', 'Tabs', 'Tags', 'Text fields', 'Tooltips'] },
  { title: 'Views', items: ['Banners', 'Cards', 'Chat', 'Innaps', 'Matrix', 'Rappipay', 'Tables'] },
  { title: 'Elements', items: ['Avatars', 'Media', 'Logos'] }
];
const STATIC_LINKS = { Buttons: 'button.html' };

// Regla: toda página de componente tiene estas 5 pestañas, en este orden.
// Si un componente no tiene contenido para una, se muestra como pendiente.
const TABS = [
  ['uso', 'Uso'],
  ['codigo', 'Código'],
  ['accesibilidad', 'Accesibilidad'],
  ['personalizacion', 'Personalización'],
  ['tokens', 'Tokens']
];
const TAB_EMPTY = {
  codigo: 'Todavía no hay implementación en código documentada para este componente.',
  accesibilidad: 'Pendiente: criterios de accesibilidad de este componente.',
  personalizacion: 'Pendiente: propiedades y estructura del componente en Figma.',
  tokens: 'Pendiente: tokens que usa este componente.'
};

const HEX_RE = /\s*\(?#[0-9a-fA-F]{3,8}\)?/g;

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function tok(s) {
  // "a · b · c" (ej. size + line-height + weight) se pinta como varios chips
  return String(s).split(' · ').map(t => '<code class="tok-name">' + esc(t.replace(HEX_RE, '').trim()).replace(/\//g, '/<wbr>') + '</code>').join(' ');
}
function todo(s) {
  // "[por confirmar]" se pinta como etiqueta, no como texto suelto
  return /^\[por confirmar\]$/i.test(String(s)) ? '<span class="flag flag-todo">Por confirmar</span>' : esc(s);
}
function table(head, rows) {
  return '<div class="spec-wrap"><table class="spec"><thead><tr>' +
    head.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' +
    rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';
}
function stage(slug, file, alt, scale, fit) {
  // capturas a 2x: se muestran a la mitad de su ancho real.
  // fit: la imagen se ajusta al ancho de la columna en vez de tener scroll
  // (component.stage = "fit" en el contrato)
  const w = scale ? ' style="width:' + scale + 'px"' : '';
  return '<div class="stage' + (fit ? ' fit' : '') + '"><img src="../assets/components/' + esc(slug) + '/' + esc(file) + '" alt="' + esc(alt) + '"' + w + ' loading="lazy"></div>';
}
function imgWidth(slug, file) {
  // lee el ancho del PNG (bytes 16-19 del IHDR) para mostrarlo a 1x
  try {
    const buf = fs.readFileSync(path.join(ROOT, 'assets', 'components', slug, file));
    return Math.round(buf.readUInt32BE(16) / 2);
  } catch (e) { return null; }
}

function sidebar(families) {
  const groups = [{ items: [{ label: 'Overview', href: '../components.html#overview' }] }];
  SIDEBAR_GROUPS.forEach(g => {
    groups.push({
      title: g.title,
      items: g.items.map(label => {
        const href = families[label] || STATIC_LINKS[label];
        return href ? { label, href } : { label, collapse: true, locked: true };
      })
    });
  });
  return groups;
}

const ICON_INFO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

function render(c, families) {
  const slug = c.component.slug;
  const fit = c.component.stage === 'fit';
  const byTab = {};
  let tab = 'uso';
  function add(id, label, html) { (byTab[tab] = byTab[tab] || []).push('<section class="doc" id="' + id + '">\n<h2>' + esc(label) + '</h2>\n' + html + '\n</section>'); }

  const s = c.summary;
  add('resumen', 'Resumen',
    '<p>' + esc(s.what) + '</p>' +
    '<div class="use-grid">' +
      '<div class="use-card yes"><h3>Cuándo usarlo</h3><ul>' + s.whenToUse.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul></div>' +
      '<div class="use-card no"><h3>Cuándo no</h3><ul>' + s.whenNotToUse.map(t => '<li>' + esc(t.text) + (t.alt ? '<span class="alt">Usa: ' + (t.altHref ? '<a href="' + esc(t.altHref) + '">' + esc(t.alt) + '</a>' : esc(t.alt)) + '</span>' : '') + '</li>').join('') + '</ul></div>' +
    '</div>' +
    // patrones de Patterns que usan este componente
    (c.patterns && c.patterns.length ? c.patterns.map(p =>
      '<div class="note">' + ICON_INFO + '<p><b>Patrón:</b> <a href="' + esc(p.href) + '"><u>' + esc(p.title) + '</u></a>. ' + esc(p.text) + '</p></div>').join('') : ''));

  const a = c.anatomy;
  add('anatomia', 'Anatomía',
    stage(slug, a.image, c.component.title, imgWidth(slug, a.image), fit) +
    table(['#', 'Elemento', 'Notas'], a.elements.map(e => [esc(e.n), tok(e.name), esc(e.notes)])));

  // Átomos: piezas que el componente usa como nested instances (instancias
  // expuestas). Se cambia el átomo desde el componente en vez de crear una
  // variante por cada combinación.
  if (c.atoms && c.atoms.items && c.atoms.items.length) {
    add('atomos', 'Átomos',
      (c.atoms.intro ? '<p>' + esc(c.atoms.intro) + '</p>' : '') +
      c.atoms.items.map(at =>
        '<div class="example"><h3>' + tok(at.name) + (at.title ? ' ' + esc(at.title) : '') + '</h3>' +
        (at.what ? '<p>' + esc(at.what) + '</p>' : '') +
        (at.image ? stage(slug, at.image, at.name, imgWidth(slug, at.image), fit) : '') +
        (at.usedIn && at.usedIn.length ? table(['Componente', 'Valor por defecto', 'Notas'], at.usedIn.map(u => [tok(u.component), tok(u.value), esc(u.notes || '—')])) : '') +
        '</div>').join(''));
  }

  const api = c.api;
  tab = 'personalizacion';
  const propRows = list => list.map(p => [tok(p.name), esc(p.values), p.default === '—' ? '<span class="dim">—</span>' : (/\//.test(p.default) ? tok(p.default) : '<code>' + esc(p.default) + '</code>'), esc(p.notes)]);
  add('api', 'API',
    table(['Prop', 'Valores', 'Default', 'Notas'], propRows(api.props)) +
    api.subcomponents.map(sc => '<h3>' + esc(sc.title) + ' · <code>' + esc(sc.name) + '</code></h3>' + (sc.note ? '<p>' + esc(sc.note) + '</p>' : '') + table(['Prop', 'Valores', 'Default', 'Notas'], propRows(sc.props))).join(''));

  tab = 'uso';
  add('ejemplos', 'Ejemplos', c.examples.map((ex, i) =>
    '<div class="example"><h3><span class="num">' + String(i + 1).padStart(2, '0') + '</span>' + esc(ex.title) + '</h3>' +
    stage(slug, ex.image, ex.title, imgWidth(slug, ex.image), fit) +
    table(['Prop', 'Valor', 'Notas'], ex.rows.map(r => ['<code>' + esc(r.prop) + '</code>', esc(r.value), esc(r.notes)])) +
    '</div>').join('') +
    (c.examplesNote ? '<p class="stage-cap">' + esc(c.examplesNote) + '</p>' : ''));

  tab = 'personalizacion';
  add('estructura', 'Estructura',
    table(['Elemento', 'Propiedad', 'Valor', 'Token'], c.structure.map(r => [esc(r.element), esc(r.property), esc(r.value), r.token ? tok(r.token) : '<span class="flag flag-warn">Sin token</span>'])));

  tab = 'tokens';
  add('tokens', 'Tokens',
    '<p>Todo en token semántico. Las etiquetas marcan lo que hay que revisar antes de dar el componente por cerrado.</p>' +
    table(['Token', 'Rol', 'Colección'], c.tokens.map(t => [tok(t.token) + (t.flag === 'chart' ? '<span class="flag flag-warn">Paleta de datos</span>' : ''), esc(t.role), esc(t.collection)])) +
    (c.artwork && c.artwork.length ? '<h3>Artwork</h3>' + table(['Componente', 'Dónde'], c.artwork.map(i => [tok(i.name), esc(i.usedIn)])) : ''));

  tab = 'personalizacion';
  add('dependencias', 'Dependencias',
    '<p>Lo que este componente necesita de otras librerías para existir.</p>' +
    table(['Pieza', 'Tipo', 'Librería', 'Para qué'], c.dependencies.map(d => [tok(d.name), esc(d.kind), todo(d.library), esc(d.uses)])));

  tab = 'accesibilidad';
  add('accesibilidad', 'Accesibilidad',
    table(['Tema', 'Regla'], c.accessibility.map(r => ['<strong>' + esc(r.topic) + '</strong>', esc(r.text)])));

  tab = 'uso';
  add('do-dont', 'Do / Don’t', c.dosDonts.map(d =>
    '<div class="dd"><div class="dd-cell dd-do"><b>Do</b><span>' + esc(d.do) + '</span></div><div class="dd-cell dd-dont"><b>Don’t</b><span>' + esc(d.dont) + '</span></div></div>').join(''));

  if (c.knownGaps && c.knownGaps.length) {
    add('pendientes', 'Pendientes',
      '<p>Problemas encontrados al documentar. Se resuelven en Figma, no en esta página.</p>' +
      '<ul class="gaps">' + c.knownGaps.map(g => '<li><span class="sev sev-' + esc(g.severity) + '">' + esc(g.severity) + '</span><span>' + esc(g.text) + '</span></li>').join('') + '</ul>');
  }

  const panels = TABS.map(([key, label]) =>
    '<div class="ctab-panel" data-tab="' + key + '" data-label="' + label + '">\n' +
    (byTab[key] ? byTab[key].join('\n\n') : '<p class="ctab-empty">' + esc(TAB_EMPTY[key]) + '</p>') +
    '\n</div>').join('\n\n');

  const src = c.source;
  // las pestañas reemplazan al índice "On this page"
  const config = { eyebrow: 'Components', groups: sidebar(families) };
  const draft = c.component.status === 'draft';

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/assets/favicon/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
${draft ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<title>Components · ${esc(c.component.title)} — Mustache Design System</title>
<!-- Generado por scripts/build-components.js desde components/data/${esc(slug)}.json. No editar a mano. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/tokens.css">
<link rel="stylesheet" href="../css/site-header.css">
<link rel="stylesheet" href="../css/site-sidebar.css">
<link rel="stylesheet" href="../css/component-page.css">
<link rel="stylesheet" href="../css/component-tabs.css">
<script src="../js/site-header.js" defer></script>
<script src="../js/component-tabs.js" defer></script>
<script src="../js/site-sidebar.js" defer></script>
</head>
<body id="top">

<site-header active="components"></site-header>

<div class="shell">
  <script>window.SIDEBAR_CONFIG = ${JSON.stringify(config)};</script>
  <site-sidebar></site-sidebar>

  <main class="main">
    <div class="main-inner">
      <div class="crumb"><b>Components</b> <span>/</span> ${esc(c.component.group)} <span>/</span> ${esc(c.component.family)} <span>/</span> ${esc(c.component.title)}</div>
      <h1 class="page-h1 display">${esc(c.component.title)}</h1>
      <p class="page-lead">${esc(s.lead)}</p>
      <div class="meta-row">
        <span class="meta-chip${draft ? ' is-draft' : ''}"><b>Estado</b> ${draft ? 'Borrador' : 'Live'}</span>
        <span class="meta-chip"><b>Figma</b> <code style="font-family:var(--mono);font-size:11.5px">${esc(c.component.figmaName)}</code></span>
        <a class="meta-chip" href="${esc(src.figma.url)}" target="_blank" rel="noopener"><b>Abrir en Figma</b> ↗</a>
      </div>

${panels}

      <div class="note">${ICON_INFO}<p><b>Fuente.</b> ${esc(src.capturedWith.join(' · '))}. Capturado el ${esc(src.capturedAt)}. ${esc(src.note || '')}</p></div>

      <a href="#top" class="backtop"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg> Volver arriba</a>
    </div>
  </main>
</div>

<script>
  (function () {
    var btn = document.querySelector('.backtop');
    if (!btn) return;
    function onScroll() { btn.classList.toggle('show', window.scrollY > 200); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
</script>
</body>
</html>
`;
}

function build() {
  if (!fs.existsSync(DATA_DIR)) { console.log('No hay components/data/. Nada que generar.'); return; }
  const contracts = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')));
  const families = {};
  contracts.forEach(c => { families[c.component.family] = c.component.slug + '.html'; });
  contracts.forEach(c => {
    const out = path.join(OUT_DIR, c.component.slug + '.html');
    fs.writeFileSync(out, render(c, families));
    console.log('✓ components/' + c.component.slug + '.html');
  });
}

build();
