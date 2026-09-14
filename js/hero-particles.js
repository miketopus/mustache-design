/**
 * Hero particle field — adapted from soulwire's "30,000 Particles"
 * (https://codepen.io/soulwire/pen/DdGRYG). Mouse repels a dot grid drawn
 * straight into an ImageData buffer; idles into a Lissajous drift when the
 * pointer isn't over the hero. Sized to the .hero box (not a fixed canvas),
 * capped for dpr/perf, and gated by IntersectionObserver + reduced-motion.
 *
 * Shared across every page whose hero/title block carries a
 * <canvas class="hero-particles">; see css/hero-particles.css for the
 * accompanying .hero/.hero-particles/.hero-fade/.hero-in rules.
 */
(function () {
  var hero = document.querySelector('.hero');
  var canvas = document.querySelector('.hero-particles');
  if (!hero || !canvas) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var ctx = canvas.getContext('2d');
  var SPACING = 6, THICKNESS = Math.pow(70, 2), DRAG = 0.95, EASE = 0.25;
  var COLOR = [255, 255, 255];
  var particles = [], cols = 0, rows = 0, w = 0, h = 0;
  var mx = 0, my = 0, manual = false;
  var running = false, raf = null, dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  function build() {
    var rect = hero.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.max(1, Math.floor(w / SPACING));
    rows = Math.max(1, Math.floor(h / SPACING));
    var offX = (w - cols * SPACING) / 2;
    var offY = (h - rows * SPACING) / 2;

    particles = new Array(cols * rows);
    for (var i = 0; i < particles.length; i++) {
      var ox = offX + SPACING * (i % cols);
      var oy = offY + SPACING * Math.floor(i / cols);
      particles[i] = { x: ox, y: oy, ox: ox, oy: oy, vx: 0, vy: 0 };
    }
    mx = w * 0.5; my = h * 0.5;
  }

  function step(time) {
    if (!manual) {
      var t = time * 0.001;
      mx = w * 0.5 + Math.cos(t * 1.1) * Math.cos(t * 0.5) * w * 0.45;
      my = h * 0.5 + Math.sin(t * 1.7) * Math.tan(Math.sin(t * 0.4)) * h * 0.45;
    }
    var i, p, dx, dy, d, f, a;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      dx = mx - p.x; dy = my - p.y;
      d = dx * dx + dy * dy;
      if (d < THICKNESS) {
        f = -THICKNESS / d;
        a = Math.atan2(dy, dx);
        p.vx += f * Math.cos(a);
        p.vy += f * Math.sin(a);
      }
      p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
      p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
    }

    var cw = canvas.width, ch = canvas.height;
    var img = ctx.createImageData(cw, ch);
    var buf = img.data;
    var px, py, n;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      px = (p.x * dpr) | 0; py = (p.y * dpr) | 0;
      if (px < 0 || px >= cw || py < 0 || py >= ch) continue;
      n = (px + py * cw) * 4;
      buf[n] = COLOR[0]; buf[n + 1] = COLOR[1]; buf[n + 2] = COLOR[2]; buf[n + 3] = 200;
    }
    ctx.putImageData(img, 0, 0);

    raf = requestAnimationFrame(step);
  }

  function start() { if (running) return; running = true; build(); raf = requestAnimationFrame(step); }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

  hero.addEventListener('mousemove', function (e) {
    var bounds = hero.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    manual = true;
  });
  hero.addEventListener('mouseleave', function () { manual = false; });

  var resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { if (running) build(); }, 150);
  });

  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
  }, { threshold: 0 }).observe(hero);
})();
