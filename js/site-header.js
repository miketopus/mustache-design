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
    { id: 'design',     href: 'design.html',  label: 'Design'     },
    { id: 'content',    href: 'content.html', label: 'Content'    },
    { id: 'components', href: '#',            label: 'Components' },
    { id: 'brand',      href: '#',            label: 'Brand'      },
    { id: 'resources',  href: '#',            label: 'Resources'  },
  ];

  // Brand lockup = isotype (full-color, self-contained) + 4px gap + "Mustache"
  // wordmark. The wordmark is one asset (assets/mustache.svg) used as a CSS mask
  // over var(--text) in site-header.css, so it recolours from a single file.
  const BRAND = `
    <img class="tb-mark" src="assets/isotype-mustache.svg" width="28" height="28" alt="" aria-hidden="true">
    <span class="tb-word" role="img" aria-label="Mustache"></span>`;

  const LOGIN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

  const CHEVRON = `<svg class="tb-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;

  function navItem(item, active) {
    const on = item.id === active;
    return `<a href="${item.href}"${on ? ' class="on"' : ''}>${item.label}</a>`;
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
          <a href="index.html" class="tb-brand" aria-label="Mustache Design System">${BRAND}</a>
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
