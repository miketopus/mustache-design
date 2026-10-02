/**
 * <site-sidebar></site-sidebar>
 *
 * Renders the left doc-nav sidebar (and, if configured, the floating
 * "On this page" card) from a plain object the page defines BEFORE this
 * element, as:
 *
 *   <script>
 *     window.SIDEBAR_CONFIG = {
 *       eyebrow: 'Design',
 *       groups: [
 *         // group with a header + sub-links
 *         { title: 'Foundations', items: [
 *           { label: 'Overview', href: 'foundations/foundation.html' },
 *           { label: 'Colors', href: 'foundations/colors.html' }
 *         ]},
 *         // a group with exactly one plain-link item and no title
 *         // collapses into a single `<a class="sb-title">` instead of
 *         // repeating the label as both a header and its own link
 *         { items: [{ label: 'Overview', href: '#overview' }] },
 *         // collapsible item: locked placeholder ("Coming soon") or, with
 *         // `items`, a folder of sub-links (opens itself on the current page)
 *         { title: 'Get Started', items: [
 *           { label: 'Designing', collapse: true, items: [
 *             { label: 'Design Principles', href: 'design-principles.html' }
 *           ]},
 *           { label: 'Developing', collapse: true, locked: true }
 *         ]}
 *       ],
 *       // optional — only renders if it has 2+ items (a single-section
 *       // page has nothing worth a floating "on this page" nav for)
 *       onThisPage: [
 *         { label: 'Overview', href: '#overview' },
 *         { label: 'Details', href: '#details' }
 *       ]
 *     };
 *   </script>
 *   <site-sidebar></site-sidebar>
 *
 * `window.SIDEBAR_CONFIG` is authored per-page by us, not user input, so
 * the string-concatenation rendering below is the same trust model
 * already used by js/site-header.js.
 *
 * Active-state handling (no per-item "active" flag needed):
 *  - Cross-page links (href without a leading #) get `.on` automatically
 *    when their resolved URL matches the current page.
 *  - Same-page anchor links (href="#...") get `.on` from a scroll-spy
 *    IntersectionObserver scoped to this element, covering both the main
 *    nav and the "on this page" card with one shared observer.
 *  - The bright edge-bar and the "on this page" card's own styling are
 *    handled entirely by css/site-sidebar.css via :has(a.on) — this file
 *    only ever toggles the `.on` class.
 */
(function () {

  var LOCK_SVG = '<svg class="sb-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  var CHEV_SVG = '<svg class="sb-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  function linkAttrs(item) {
    var attrs = ' href="' + item.href + '"';
    if (item.onclick) attrs += ' onclick="' + item.onclick + '"';
    return attrs;
  }

  function renderItem(item) {
    if (item.collapse) {
      return '<div class="sb-collapse-item" data-open="false">' +
        '<button type="button" class="sb-collapse-btn" aria-expanded="false">' +
          item.label + (item.locked ? LOCK_SVG : '') + CHEV_SVG +
        '</button>' +
        '<div class="sb-collapse-body">' + (item.items && item.items.length
          ? '<div class="sb-sub">' + item.items.map(function (it) { return '<a' + linkAttrs(it) + '>' + it.label + '</a>'; }).join('') + '</div>'
          : '<p class="sb-collapse-soon">' + (item.note || 'Coming soon') + '</p>') + '</div>' +
      '</div>';
    }
    return '<a' + linkAttrs(item) + '>' + item.label + '</a>';
  }

  function renderGroup(group) {
    var items = group.items || [];
    var titleCls = 'sb-title' + (group.caps ? ' sb-caps' : '');
    // caps: true renders the title as a small uppercase label; with an href
    // and no items it becomes a link on its own (e.g. { title: 'Otros
    // recursos', caps: true, href: 'resources.html' })
    if (group.title && group.href && !items.length) {
      return '<div class="sb-group"><a class="' + titleCls + '"' + linkAttrs(group) + '>' + group.title + '</a></div>';
    }
    var solo = !group.title && items.length === 1 && !items[0].collapse;
    if (solo) {
      return '<div class="sb-group"><a class="sb-title"' + linkAttrs(items[0]) + '>' + items[0].label + '</a></div>';
    }
    var html = '<div class="sb-group">';
    if (group.title) html += '<div class="' + titleCls + '">' + group.title + '</div>';
    html += '<nav class="sb-links">' + items.map(renderItem).join('') + '</nav>';
    html += '</div>';
    return html;
  }

  function renderOnThis(items) {
    if (!items || items.length < 2) return '';
    return '<div class="sb-group sb-onthis">' +
      '<div class="sb-title">On this page</div>' +
      '<nav class="sb-links">' + items.map(function (it) { return '<a href="' + it.href + '">' + it.label + '</a>'; }).join('') + '</nav>' +
    '</div>';
  }

  class SiteSidebar extends HTMLElement {
    connectedCallback() {
      var config = window.SIDEBAR_CONFIG || {};
      var html = '<aside class="sidebar">';
      if (config.eyebrow) html += '<div class="eyebrow" style="padding:0 12px 14px">' + config.eyebrow + '</div>';
      (config.groups || []).forEach(function (g) { html += renderGroup(g); });
      html += '</aside>';
      html += renderOnThis(config.onThisPage);
      this.innerHTML = html;

      this._markCurrentPage();
      // a folder that holds the current page starts open
      this.querySelectorAll('.sb-collapse-item').forEach(function (it) {
        if (it.querySelector('a.on')) { it.dataset.open = 'true'; it.querySelector('.sb-collapse-btn').setAttribute('aria-expanded', 'true'); }
      });
      this._wireCollapse();
      this._wireGlide();
      this._wireScrollSpy();
    }

    _markCurrentPage() {
      // Normalize away a trailing ".html" (and trailing slash) before
      // comparing: some dev servers rewrite/serve pages without the
      // extension, so location.pathname won't always match an href's
      // resolved pathname byte-for-byte even when they're the same page.
      function normalize(pathname) {
        return pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
      }
      var current = normalize(location.pathname);
      this.querySelectorAll('a[href]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (href.indexOf('#') === 0) return; // same-page anchors: scroll-spy's job
        try {
          var u = new URL(href, location.href);
          if (u.origin === location.origin && normalize(u.pathname) === current) a.classList.add('on');
        } catch (e) { /* ignore malformed hrefs */ }
      });
    }

    // Fondo que se desliza al ítem bajo el cursor (ref. 21st.dev animated-sidebar).
    _wireGlide() {
      if (!window.matchMedia || !matchMedia('(hover: hover)').matches) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var aside = this.querySelector('.sidebar');
      if (!aside) return;
      var glide = document.createElement('span');
      glide.className = 'sb-glide';
      glide.setAttribute('aria-hidden', 'true');
      aside.insertBefore(glide, aside.firstChild);
      aside.classList.add('is-glide');
      var TARGETS = '.sb-links a, .sb-collapse-btn, a.sb-title:not(.sb-caps)';
      var shown = false;
      function moveTo(el) {
        var a = aside.getBoundingClientRect(), r = el.getBoundingClientRect();
        // primera aparición: sin deslizar desde (0,0), solo aparece en su lugar
        glide.classList.toggle('no-anim', !shown);
        glide.style.width = r.width + 'px';
        glide.style.height = r.height + 'px';
        glide.style.transform = 'translate(' + (r.left - a.left + aside.scrollLeft) + 'px,' + (r.top - a.top + aside.scrollTop) + 'px)';
        glide.classList.add('is-on');
        shown = true;
      }
      aside.addEventListener('pointerover', function (e) {
        var el = e.target.closest(TARGETS);
        if (el && aside.contains(el)) moveTo(el);
      });
      aside.addEventListener('pointerleave', function () {
        glide.classList.remove('is-on');
        shown = false;
      });
      // al abrir o cerrar un desplegable los ítems cambian de lugar
      aside.addEventListener('transitionend', function (e) {
        if (!shown || !e.target.classList.contains('sb-collapse-body')) return;
        var hov = aside.querySelector(TARGETS.split(', ').map(function (t) { return t + ':hover'; }).join(', '));
        if (hov) moveTo(hov);
      });
    }

    _wireCollapse() {
      this.querySelectorAll('.sb-collapse-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var item = btn.closest('.sb-collapse-item');
          var open = item.dataset.open === 'true';
          item.dataset.open = String(!open);
          btn.setAttribute('aria-expanded', String(!open));
        });
      });
    }

    _wireScrollSpy() {
      var links = Array.prototype.slice.call(this.querySelectorAll('a[href^="#"]'));
      if (!links.length) return;
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var secs = Array.prototype.slice.call(document.querySelectorAll('section.doc')).filter(function (s) { return map[s.id]; });
      if (!secs.length) return;

      // Recomputed directly from live positions on every scroll frame,
      // rather than driven by IntersectionObserver enter/exit entries: a
      // short section sandwiched between two tall ones can cross an
      // observer's threshold band in the same batch as its neighbor, and
      // deciding from whichever entries fired is order-dependent (and can
      // freeze on a mid-animation snapshot if no further crossing ever
      // fires once a smooth scroll settles). A plain "last section whose
      // top has passed the trigger line" check has neither failure mode.
      var topbar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar')) || 0;
      var triggerY = topbar + 30;
      var ticking = false;

      function recompute() {
        ticking = false;
        // Skip sections hidden by the page (e.g. inactive tab panels): their
        // rect is all zeros, which would always read as "scrolled past".
        var visible = secs.filter(function (s) { return s.getClientRects().length; });
        links.forEach(function (a) { a.classList.remove('on'); });
        if (!visible.length) return;
        var active = visible[0];
        for (var i = 0; i < visible.length; i++) {
          if (visible[i].getBoundingClientRect().top <= triggerY) active = visible[i];
        }
        if (map[active.id]) map[active.id].classList.add('on');
      }

      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(recompute);
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      recompute();
    }
  }

  customElements.define('site-sidebar', SiteSidebar);

})();
