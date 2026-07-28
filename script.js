// Menu mobile : ouverture/fermeture au clic sur le burger
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fermer le menu après clic sur un lien (mobile)
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Année courante dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

// Filigrane du hero : grille blueprint + icônes (crayon, équerre) en fondu.
// Le ruban gradué est déjà la vedette visuelle, on garde ce filigrane discret.
// Desktop uniquement, 30fps, zéro dépendance.
(function () {
  if (window.innerWidth < 768) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    const hero = canvas.parentElement;
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const C_OCRE = 'rgba(242, 102, 29,';
  const C_YELLOW = 'rgba(239, 177, 58,';
  const C_LINE = 'rgba(247, 242, 231,';
  const GRID = 60;

  const NPART = 16;
  const parts = [];
  for (let i = 0; i < NPART; i++) {
    parts.push({
      x: Math.random() * 1200,
      y: Math.random() * 600,
      r: Math.random() * 1.4 + 0.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.16,
      a: Math.random() * 0.12 + 0.04,
      color: Math.random() < 0.7 ? C_OCRE : C_YELLOW
    });
  }

  const icons = [
    // Crayon
    { draw(c, x, y, s) {
      c.beginPath();
      c.moveTo(x - s * 10, y + s * 10); c.lineTo(x + s * 8, y - s * 8); c.lineTo(x + s * 12, y - s * 4); c.lineTo(x - s * 6, y + s * 14);
      c.closePath(); c.stroke();
    }},
    // Règle graduée (écho du ruban)
    { draw(c, x, y, s) {
      c.beginPath();
      c.rect(x - s * 14, y - s * 4, s * 28, s * 8);
      c.stroke();
      c.beginPath();
      c.moveTo(x - s * 7, y - s * 4); c.lineTo(x - s * 7, y);
      c.moveTo(x, y - s * 4); c.lineTo(x, y);
      c.moveTo(x + s * 7, y - s * 4); c.lineTo(x + s * 7, y);
      c.stroke();
    }}
  ];

  const NICONS = 2;
  const active = [];
  function spawnIcon() {
    active.push({
      ico: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * (W - 120) + 60,
      y: Math.random() * (H - 100) + 50,
      s: Math.random() * 1.3 + 2.2,
      alpha: 0,
      phase: 'in',
      t: 0,
      holdMax: 90 + Math.floor(Math.random() * 60)
    });
  }
  for (let k = 0; k < NICONS; k++) spawnIcon();

  let lastT = 0;
  const FPS_INTERVAL = 1000 / 30;

  function draw(now) {
    requestAnimationFrame(draw);
    const delta = now - lastT;
    if (delta < FPS_INTERVAL) return;
    lastT = now - (delta % FPS_INTERVAL);

    ctx.clearRect(0, 0, W, H);

    ctx.save();
    ctx.strokeStyle = C_LINE + '0.05)';
    ctx.lineWidth = 0.5;
    for (let gx = 0; gx < W; gx += GRID) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
    for (let gy = 0; gy < H; gy += GRID) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
    ctx.restore();

    ctx.save();
    parts.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.a + ')';
      ctx.fill();
    });
    ctx.restore();

    ctx.save();
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let j = active.length - 1; j >= 0; j--) {
      const a = active[j];
      a.t++;
      if (a.phase === 'in') {
        a.alpha = Math.min(1, a.t / 20);
        if (a.alpha >= 1) { a.phase = 'hold'; a.t = 0; }
      } else if (a.phase === 'hold') {
        if (a.t >= a.holdMax) { a.phase = 'out'; a.t = 0; }
      } else {
        a.alpha = Math.max(0, 1 - a.t / 20);
        if (a.alpha <= 0) { active.splice(j, 1); spawnIcon(); continue; }
      }
      ctx.strokeStyle = C_OCRE + (a.alpha * 0.3) + ')';
      a.ico.draw(ctx, a.x, a.y, a.s);
    }
    ctx.restore();
  }

  const ric = window.requestIdleCallback || function (fn) { setTimeout(fn, 100); };
  ric(() => requestAnimationFrame(draw));
})();
