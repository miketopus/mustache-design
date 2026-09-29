/* Glowing effect (ref. show.saasfly.io · Aceternity "GlowingEffect").
   A colored segment of the border follows the pointer while it is near a card.
   Usage: <script src="js/glowing-effect.js" defer data-glow=".card,.panel"></script>
   Each match gets a <span class="glow">; styles live in css/glowing-effect.css. */
(function () {
  var script = document.currentScript;
  var selector = (script && script.dataset.glow) || '[data-glow]';
  var PROXIMITY = 64;       // px around the card where the glow is active
  var INACTIVE_ZONE = 0.01; // fraction of the card around its center with no glow
  var EASE = 0.12;          // angle smoothing per frame

  if (!window.matchMedia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!matchMedia('(hover: hover)').matches) return;

  function init() {
    var items = Array.prototype.map.call(document.querySelectorAll(selector), function (el) {
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      var g = document.createElement('span');
      g.className = 'glow';
      g.setAttribute('aria-hidden', 'true');
      el.appendChild(g);
      return { el: el, g: g, angle: 0, target: 0 };
    });
    if (!items.length) return;

    var mx = -1e4, my = -1e4, frame = 0;

    function update() {
      frame = 0;
      var moving = false;
      items.forEach(function (it) {
        var r = it.el.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var inactive = 0.5 * Math.min(r.width, r.height) * INACTIVE_ZONE;
        var near = mx > r.left - PROXIMITY && mx < r.right + PROXIMITY &&
                   my > r.top - PROXIMITY && my < r.bottom + PROXIMITY &&
                   Math.hypot(mx - cx, my - cy) > inactive;
        it.g.style.setProperty('--active', near ? '1' : '0');
        if (!near) return;
        it.target = Math.atan2(my - cy, mx - cx) * 180 / Math.PI + 90;
        // shortest path so the segment never spins the long way round
        var diff = ((it.target - it.angle + 180) % 360 + 360) % 360 - 180;
        if (Math.abs(diff) > 0.1) { it.angle += diff * EASE; moving = true; }
        it.g.style.setProperty('--start', it.angle.toFixed(2));
      });
      if (moving) frame = requestAnimationFrame(update);
    }

    function queue(e) {
      if (e) { mx = e.clientX; my = e.clientY; }
      if (!frame) frame = requestAnimationFrame(update);
    }

    document.addEventListener('pointermove', queue, { passive: true });
    window.addEventListener('scroll', function () { queue(); }, { passive: true });
    document.addEventListener('pointerleave', function () { mx = my = -1e4; queue(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
