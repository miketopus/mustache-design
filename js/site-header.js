/**
 * <site-header active="design|content"></site-header>
 *
 * Custom Element that renders the shared documentation topbar
 * (brand mark + primary nav). Set `active` to the current section's
 * slug to highlight the matching nav item.
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

  const LOGO_SVG = `<img src="assets/logo-mustache.svg" width="24" height="24" alt="" aria-hidden="true">`;

  const LOGIN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

  function navItem(item, active) {
    const on = item.id === active;
    return `<a href="${item.href}"${on ? ' class="on"' : ''}>${item.label}</a>`;
  }

  class SiteHeader extends HTMLElement {
    static get observedAttributes() { return ['active']; }

    connectedCallback()                   { this._render(); }
    attributeChangedCallback(n, old, val) { if (old !== null) this._render(); }

    _render() {
      const active = this.getAttribute('active') || '';

      this.innerHTML = `
        <header class="topbar">
          <a href="index.html" class="tb-brand" aria-label="Mustache Design System">
            <span class="tb-logo">${LOGO_SVG}</span>
            <span><b>Mustache</b><small>DESIGN SYSTEM</small></span>
          </a>
          <nav class="tb-nav">
            ${NAV.map(item => navItem(item, active)).join('')}
          </nav>
          <div class="tb-right">
            <a href="#" class="tb-login">${LOGIN_ICON} Login</a>
          </div>
        </header>`;
    }
  }

  customElements.define('site-header', SiteHeader);

})();
