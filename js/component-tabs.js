/* Tabs de página de componente (ver css/component-tabs.css).
   Arma la barra desde los paneles .ctab-panel, sincroniza con el hash
   (#codigo abre Código; #tokens abre la pestaña que contiene #tokens)
   y soporta flechas, Inicio y Fin del teclado. */
(function () {
  function init() {
    var panels = [].slice.call(document.querySelectorAll('.ctab-panel'));
    if (panels.length < 2) return;
    var bar = document.createElement('div');
    bar.className = 'ctabs';
    bar.setAttribute('role', 'tablist');
    bar.setAttribute('aria-label', 'Secciones del componente');
    var tabs = panels.map(function (p) {
      var id = p.dataset.tab;
      p.id = p.id || 'tab-' + id;
      p.setAttribute('role', 'tabpanel');
      var t = document.createElement('button');
      t.type = 'button';
      t.className = 'ctab';
      t.id = 'ctab-' + id;
      t.textContent = p.dataset.label;
      t.setAttribute('role', 'tab');
      t.setAttribute('aria-controls', p.id);
      p.setAttribute('aria-labelledby', t.id);
      bar.appendChild(t);
      return t;
    });
    panels[0].parentNode.insertBefore(bar, panels[0]);

    function show(i, push) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (push) history.replaceState(null, '', '#' + panels[i].dataset.tab);
    }
    function fromHash() {
      var h = decodeURIComponent(location.hash.slice(1));
      if (!h) return show(0);
      for (var i = 0; i < panels.length; i++) {
        if (panels[i].dataset.tab === h) return show(i);
        var el = document.getElementById(h);
        if (el && panels[i].contains(el)) { show(i); return el.scrollIntoView(); }
      }
      show(0);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        show(i, true);
        var top = bar.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar')) || 64);
        if (window.scrollY > top) window.scrollTo(0, top);
      });
      t.addEventListener('keydown', function (e) {
        var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (n === undefined) return;
        e.preventDefault();
        n = (n + tabs.length) % tabs.length;
        show(n, true); tabs[n].focus();
      });
    });
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
