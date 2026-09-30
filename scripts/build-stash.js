#!/usr/bin/env node
/**
 * Builds the "Mustache for Claude" kit that claude-md.html (Tools › AI › Kit Claude) offers for download,
 * so the kit always matches what the site documents.
 *
 * Sources (the only things anyone edits by hand):
 *   stash/stash.config.json   app version label + which site pages go in
 *   stash/src/                SKILL.md, hand-written references/, assets/
 *   foundations/, patterns/,  site pages — converted to Markdown on every
 *   components/, …            build, so the kit follows the docs
 *
 * Outputs:
 *   downloads/mustache-ds-skill.zip     the Skill (SKILL.md + references + assets)
 *   downloads/mustache-ds-guidelines.md single-file version for Projects
 *   downloads/tokens.css, downloads/rappi-design-tokens.json
 *   claude-md.html                      version, date, sizes, file tree and site counts
 *                                       (every element with data-stash="…")
 *
 * Usage:
 *   npm run build:stash
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'stash', 'src');
const OUT = path.join(ROOT, 'downloads');
// pages with data-stash="…" fields to stamp
const PAGES = ['claude-md.html'].map(function (f) { return path.join(ROOT, f); });
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'stash', 'stash.config.json'), 'utf8'));

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const now = new Date();
const pad = function (n) { return String(n).padStart(2, '0'); };
const DATE_ISO = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
const DATE_ES = now.getDate() + ' ' + MONTHS[now.getMonth()] + ' ' + now.getFullYear();

function log(msg) { console.log('[build-stash] ' + msg); }

/* ---------- HTML → Markdown (just enough for the site's doc pages) ---------- */

function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&hellip;/g, '…').replace(/&middot;/g, '·')
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(+n); })
    .replace(/\\u([0-9a-f]{4})/gi, function (_, h) { return String.fromCharCode(parseInt(h, 16)); });
}

// Entities stay encoded here so escaped markup like `&lt;button&gt;` survives
// the final tag strip; pageToMarkdown decodes once at the very end.
function inline(html) {
  return (html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<(b|strong)\b[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<a\b[^>]*href="([^"#][^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .replace(/\*\*\s*\*\*/g, '')
    .trim();
}

function table(html) {
  const rows = [];
  html.replace(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi, function (_, tr) {
    const cells = [];
    tr.replace(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi, function (__, c) { cells.push(inline(c).replace(/\|/g, '\\|')); });
    if (cells.length) rows.push(cells);
  });
  if (!rows.length) return '';
  const w = Math.max.apply(null, rows.map(function (r) { return r.length; }));
  const line = function (r) { while (r.length < w) r.push(''); return '| ' + r.join(' | ') + ' |'; };
  return '\n\n' + [line(rows[0]), '|' + ' --- |'.repeat(w)].concat(rows.slice(1).map(line)).join('\n') + '\n\n';
}

function pageToMarkdown(html) {
  const main = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [])[1];
  if (!main) return null;
  const lead = decode(inline((main.match(/<p class="page-lead"[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || ''));
  const blocks = [];   // <pre> code, kept verbatim (indentation included)

  let s = main
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>|<div class="code-block"[^>]*>([\s\S]*?)<\/div>/gi, function (_, pre, div) {
      const t = pre || div;
      blocks.push('```\n' + decode(t.replace(/<[^>]+>/g, '')).replace(/^\n+|\s+$/g, '') + '\n```');
      return '\n\n@@BLOCK' + (blocks.length - 1) + '@@\n\n';
    })
    .replace(/<(script|style|svg|canvas|button)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<div class="crumb"[\s\S]*?<\/div>/gi, '')
    .replace(/<a [^>]*class="backtop"[\s\S]*?<\/a>/gi, '')
    .replace(/<table\b[\s\S]*?<\/table>/gi, table)
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, function (_, n, t) { return '\n\n' + '#'.repeat(+n) + ' ' + inline(t) + '\n\n'; })
    .replace(/<div class="note[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, function (_, t) { return '\n\n> ' + inline(t) + '\n\n'; })
    .replace(/<div class="(?:quote)"[^>]*>([\s\S]*?)<\/div>/gi, function (_, t) { return '\n\n> ' + inline(t) + '\n\n'; })
    .replace(/<span class="meta-chip"[^>]*>([\s\S]*?)<\/span>/gi, function (_, t) { return '\n- ' + inline(t); })
    .replace(/<div class="(?:tk|ds-card-t)"[^>]*>([\s\S]*?)<\/div>/gi, function (_, t) { return '\n\n**' + inline(t) + '**\n'; })
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, function (_, t) { return '\n- ' + inline(t); })
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, function (_, t) { return '\n\n' + inline(t) + '\n\n'; })
    .replace(/<\/(div|section|ul|ol)>/gi, '\n')
    .replace(/<[^>]+>/g, '');

  s = decode(s)
    .split('\n').map(function (l) { return l.replace(/[ \t]+$/g, '').replace(/^[ \t]+(?=[^-|>#*\s])/, ''); })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/@@BLOCK(\d+)@@/g, function (_, i) { return blocks[+i]; })
    .trim();
  return { md: s, lead: lead };
}

/* ---------- collect site pages ---------- */

function sectionFiles(sec) {
  if (sec.files) return sec.files;
  return fs.readdirSync(path.join(ROOT, sec.dir))
    .filter(function (f) { return f.endsWith('.html') && (sec.exclude || []).indexOf(f) < 0; })
    .sort()
    .map(function (f) { return path.join(sec.dir, f); });
}

function titleOf(md, file) {
  const m = md.match(/^# (.+)$/m);
  return m ? m[1].trim() : path.basename(file, '.html');
}

const guides = [];   // { section, title, lead, rel, md }
CFG.sections.forEach(function (sec) {
  sectionFiles(sec).forEach(function (file) {
    const out = pageToMarkdown(fs.readFileSync(path.join(ROOT, file), 'utf8'));
    if (!out || out.md.length < 40) { log('skipped ' + file + ' (no content)'); return; }
    const slug = path.basename(file, '.html');
    guides.push({
      section: sec, title: titleOf(out.md, file), lead: out.lead,
      rel: 'references/site/' + sec.id + '/' + slug + '.md',
      md: '<!-- generado desde ' + file + ' · ' + CFG.appVersion + ' · ' + DATE_ISO + ' — no editar a mano -->\n\n' + out.md + '\n',
    });
  });
});

/* ---------- assemble the Skill ---------- */

function siteGuidesBlock() {
  let s = '## Guías del sistema (sitio Mustache)\n\n' +
    'Generadas desde el sitio de documentación. Léelas cuando el pedido toque ese tema; no las cargues todas.\n';
  CFG.sections.forEach(function (sec) {
    const list = guides.filter(function (g) { return g.section === sec; });
    if (!list.length) return;
    s += '\n**' + sec.title + '**\n\n' + list.map(function (g) {
      return '- `' + g.rel + '`: ' + g.title + (g.lead ? '. ' + g.lead : '');
    }).join('\n') + '\n';
  });
  return s;
}

function fill(text) {
  return text
    .replace(/{{VERSION}}/g, CFG.appVersion)
    .replace(/{{DATE}}/g, DATE_ES)
    .replace(/{{SITE_GUIDES}}/g, siteGuidesBlock());
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stash-'));
const kit = path.join(tmp, CFG.skillName);
fs.cpSync(SRC, kit, { recursive: true });
fs.writeFileSync(path.join(kit, 'SKILL.md'), fill(fs.readFileSync(path.join(SRC, 'SKILL.md'), 'utf8')));
guides.forEach(function (g) {
  const dest = path.join(kit, g.rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, g.md);
});

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(function (d) {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? listFiles(p) : (d.name === '.DS_Store' ? [] : [p]);
  });
}
const kitFiles = listFiles(kit);

/* ---------- write downloads/ ---------- */

fs.mkdirSync(OUT, { recursive: true });
const zipPath = path.join(OUT, CFG.skillName + '-skill.zip');
fs.rmSync(zipPath, { force: true });
execFileSync('zip', ['-r', '-X', '-q', zipPath, CFG.skillName, '-x', '*.DS_Store'], { cwd: tmp });

['tokens.css', 'rappi-design-tokens.json'].forEach(function (f) {
  fs.copyFileSync(path.join(SRC, 'assets', f), path.join(OUT, f));
});

// single-file guide: SKILL body + annexes + every site guide (headings pushed one level down)
const skillBody = fill(fs.readFileSync(path.join(SRC, 'SKILL.md'), 'utf8')).replace(/^---[\s\S]*?---\s*/, '');
let guide = '# Mustache UX System · Guía para Claude\n\n' +
  '> Archivo único para cargar en un **Project de Claude** (Project knowledge) o adjuntar en un chat. ' +
  'Versión **' + CFG.appVersion + '** · ' + DATE_ES + ' · tema ' + CFG.theme + ' · generado desde las librerías de Figma ' +
  '`semantics` y `primitives` y el sitio de Mustache.\n\n' + skillBody.trim() + '\n';
CFG.guidelinesAnnexes.forEach(function (a) {
  const md = fs.readFileSync(path.join(SRC, 'references', a.file), 'utf8').replace(/^# .+\n/, '');
  guide += '\n\n# ' + a.title + '\n' + md.trim() + '\n';
});
guide += '\n\n# Anexo E · Guías del sitio\n';
guides.forEach(function (g) {
  guide += '\n\n' + g.md.replace(/^<!--.*-->\n\n/, '').replace(/^(#{1,5}) /gm, '#$1 ').trim() + '\n';
});
const mdPath = path.join(OUT, CFG.skillName + '-guidelines.md');
fs.writeFileSync(mdPath, guide);

/* ---------- update claude-md.html ---------- */

function kb(file) { return Math.max(1, Math.round(fs.statSync(file).size / 1024)) + ' KB'; }

function tree() {
  const refs = fs.readdirSync(path.join(SRC, 'references')).filter(function (f) { return f.endsWith('.md'); }).sort();
  const counts = CFG.sections.map(function (sec) {
    const n = guides.filter(function (g) { return g.section === sec; }).length;
    return n ? sec.id + '/ (' + n + ')' : null;
  }).filter(Boolean);
  let t = '<b>' + CFG.skillName + '/</b>\n├─ <b>SKILL.md</b>          reglas + cheat sheet\n├─ references/\n';
  refs.forEach(function (f) { t += '│  ├─ ' + f + '\n'; });
  t += '│  └─ site/           guías del sitio\n';
  counts.forEach(function (c, i) { t += '│     ' + (i === counts.length - 1 ? '└─ ' : '├─ ') + c + '\n'; });
  t += '└─ assets/\n   ├─ tokens.css\n   └─ rappi-design-tokens.json';
  return t;
}

const byId = function (id) { return guides.filter(function (g) { return g.section.id === id; }).length; };
const values = {
  version: CFG.appVersion,
  date: DATE_ES,
  'zip-meta': kb(zipPath) + ' · ' + kitFiles.length + ' archivos',
  'zip-size': kb(zipPath),
  'guide-count': String(guides.length),
  'md-size': kb(mdPath),
  'css-size': kb(path.join(OUT, 'tokens.css')),
  'json-size': kb(path.join(OUT, 'rappi-design-tokens.json')),
  'site-count': CFG.sections.map(function (s) { return s.title + ' ' + byId(s.id); }).join(' · '),
  tree: tree(),
};

let hits = 0;
PAGES.forEach(function (file) {
  let page = fs.readFileSync(file, 'utf8');
  page = page.replace(/(<(\w+)\b[^>]*\bdata-stash="([\w-]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, function (m, open, tag, key, _, close) {
    if (!(key in values)) return m;
    hits++;
    return open + values[key] + close;
  });
  fs.writeFileSync(file, page);
});

fs.rmSync(tmp, { recursive: true, force: true });
log(CFG.appVersion + ' · ' + DATE_ES + ' — ' + guides.length + ' site guides, ' + kitFiles.length +
  ' files in the skill (' + kb(zipPath) + '), guide ' + kb(mdPath) + ', ' + hits + ' fields updated in claude-md.html');
