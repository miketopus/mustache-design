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
 *           { label: 'Overview', href: 'patterns/foundation.html' },
 *           { label: 'Colors', href: 'patterns/colors.html' }
 *         ]},
 *         // a group with exactly one plain-link item and no title
 *         // collapses into a single `<a class="sb-title">` instead of
 *         // repeating the label as both a header and its own link
 *         { items: [{ label: 'Overview', href: '#overview' }] },
 *         // a locked, collapsible placeholder (chevron + "Coming soon")
 *         { title: 'Get Started', items: [
 *           { label: 'Get Started', href: '#get-started' },
 *           { label: 'Designing', collapse: true, locked: true }
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
        '<div class="sb-collapse-body"><p class="sb-collapse-soon">' + (item.note || 'Coming soon') + '</p></div>' +
      '</div>';
    }
    return '<a' + linkAttrs(item) + '>' + item.label + '</a>';
  }

  function renderGroup(group) {
    var solo = !group.title && group.items.length === 1 && !group.items[0].collapse;
    if (solo) {
      return '<div class="sb-group"><a class="sb-title"' + linkAttrs(group.items[0]) + '>' + group.items[0].label + '</a></div>';
    }
    var html = '<div class="sb-group">';
    if (group.title) html += '<div class="sb-title">' + group.title + '</div>';
    html += '<nav class="sb-links">' + group.items.map(renderItem).join('') + '</nav>';
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
      this._wireCollapse();
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
        var active = secs[0];
        for (var i = 0; i < secs.length; i++) {
          if (secs[i].getBoundingClientRect().top <= triggerY) active = secs[i];
        }
        links.forEach(function (a) { a.classList.remove('on'); });
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
