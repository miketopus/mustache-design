/**
 * <site-header active="design|content"></site-header>
 *
 * Custom Element that renders the shared documentation topbar
 * (brand mark + primary nav). Set `active` to the current section's
 * slug to highlight the matching nav item.
 *
 * Below the nav breakpoint (see css/site-header.css) the inline nav is
 * replaced by a compact box with a down chevron that toggles a dropdown
 * holding the same items. The button is keyboard-operable (Enter/Space);
 * Escape, an outside click, choosing an item, or widening past the
 * breakpoint all close it.
 *
 * No shadow DOM — inherits global styles from css/site-header.css,
 * which every page using this component must link in <head>.
 */
(function () {

  const NAV = [
    { id: 'design',     href: '/design.html',   label: 'Design'                  },
    { id: 'content',    href: '/content.html',  label: 'Content'                 },
    { id: 'components', href: '/components.html', label: 'Components'            },
    { id: 'patterns',   href: '/patterns.html', label: 'Patterns'                },
    { id: 'ai',         href: '#',              label: 'AI',          lock: true  },
    { id: 'brand',      href: '/brand.html',    label: 'Brand'                   },
    { id: 'stash',      href: '/stash.html',    label: 'Stash',       ai: true, divider: true },
  ];

  // AI mark for Stash — a Claude-style starburst drawn for this site
  const AI = `<svg class="tb-ai" viewBox="0 0 24 24" aria-hidden="true"><g fill="#D97757" transform="translate(12 12)"><rect x="-1.25" y="-10.6" width="2.5" height="10.6" rx="1.25" transform="rotate(0)"/><rect x="-1.25" y="-8.6" width="2.5" height="8.6" rx="1.25" transform="rotate(30)"/><rect x="-1.25" y="-10.0" width="2.5" height="10.0" rx="1.25" transform="rotate(60)"/><rect x="-1.25" y="-9.2" width="2.5" height="9.2" rx="1.25" transform="rotate(90)"/><rect x="-1.25" y="-10.8" width="2.5" height="10.8" rx="1.25" transform="rotate(120)"/><rect x="-1.25" y="-8.4" width="2.5" height="8.4" rx="1.25" transform="rotate(150)"/><rect x="-1.25" y="-9.8" width="2.5" height="9.8" rx="1.25" transform="rotate(180)"/><rect x="-1.25" y="-9.0" width="2.5" height="9.0" rx="1.25" transform="rotate(210)"/><rect x="-1.25" y="-10.4" width="2.5" height="10.4" rx="1.25" transform="rotate(240)"/><rect x="-1.25" y="-8.8" width="2.5" height="8.8" rx="1.25" transform="rotate(270)"/><rect x="-1.25" y="-10.2" width="2.5" height="10.2" rx="1.25" transform="rotate(300)"/><rect x="-1.25" y="-9.4" width="2.5" height="9.4" rx="1.25" transform="rotate(330)"/></g></svg>`;

  const LOCK = `<svg class="tb-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

  // Brand lockup = isotype (single-tint, white) + 4px gap + "Mustache / Design
  // System" wordmark. Both pieces are CSS masks over a solid background
  // (isotype-mustache-tint.svg, mustache-lockup.svg) so they recolour from
  // one file instead of needing separate light/dark exports.
  const BRAND = `
    <span class="tb-mark" role="img" aria-label="Mustache"></span>
    <span class="tb-word" role="img" aria-label="Mustache Design System"></span>`;

  const LOGIN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

  const CHEVRON = `<svg class="tb-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;

  function navItem(item, active) {
    const on = item.id === active;
    const divider = item.divider ? '<span class="tb-divider" aria-hidden="true"></span>' : '';
    const icon = item.lock ? LOCK : item.ai ? AI : '';
    return `${divider}<a href="${item.href}"${on ? ' class="on" aria-current="page"' : ''}>${icon}${item.label}</a>`;
  }

  class SiteHeader extends HTMLElement {
    static get observedAttributes() { return ['active']; }

    connectedCallback() {
      this._render();

      this._onDocClick = (e) => { if (!this.contains(e.target)) this._setOpen(false); };
      document.addEventListener('click', this._onDocClick);

      this._mq = window.matchMedia('(min-width: 961px)');
      this._onWide = () => { if (this._mq.matches) this._setOpen(false); };
      this._mq.addEventListener('change', this._onWide);
    }

    disconnectedCallback() {
      document.removeEventListener('click', this._onDocClick);
      if (this._mq) this._mq.removeEventListener('change', this._onWide);
    }

    attributeChangedCallback(n, old, val) { if (old !== null) this._render(); }

    _setOpen(want) {
      const more = this.querySelector('.tb-more');
      const btn  = this.querySelector('.tb-more-btn');
      const menu = this.querySelector('.tb-menu');
      if (!more || !btn || !menu) return;
      more.dataset.open = String(want);
      btn.setAttribute('aria-expanded', String(want));
      menu.hidden = !want;
    }

    _wire() {
      const more = this.querySelector('.tb-more');
      const btn  = this.querySelector('.tb-more-btn');
      const menu = this.querySelector('.tb-menu');
      if (!more || !btn || !menu) return;

      btn.addEventListener('click', () => this._setOpen(more.dataset.open !== 'true'));
      menu.addEventListener('click', (e) => { if (e.target.closest('a')) this._setOpen(false); });
      this.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && more.dataset.open === 'true') { this._setOpen(false); btn.focus(); }
      });
    }

    _render() {
      const active = this.getAttribute('active') || '';
      const items  = NAV.map((item) => navItem(item, active)).join('');
      const current = NAV.find((item) => item.id === active);
      const label = current ? current.label : 'Menú';

      this.innerHTML = `
        <header class="topbar">
          <a href="/index.html" class="tb-brand" aria-label="Mustache Design System">${BRAND}</a>
          <nav class="tb-nav">${items}</nav>
          <div class="tb-right">
            <div class="tb-more" data-open="false">
              <button type="button" class="tb-more-btn" aria-haspopup="true" aria-expanded="false" aria-controls="tb-menu">
                <span class="tb-more-label">${label}</span>${CHEVRON}
              </button>
              <nav class="tb-menu" id="tb-menu" hidden>${items}</nav>
            </div>
            <a href="#" class="tb-login">${LOGIN_ICON} Login</a>
          </div>
        </header>`;

      this._wire();
    }
  }

  customElements.define('site-header', SiteHeader);

})();
