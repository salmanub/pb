/**
 * motion.js — Micro-interactions & favicon attention
 * 1. Scroll reveal (IntersectionObserver)
 * 2. Favicon blink on tab hidden (Page Visibility API)
 */

/* ── 1. Scroll reveal ── */
(function initReveal() {
  // Mark all sections for reveal
  const sections = document.querySelectorAll(
    'main > section, main > div > section, article[itemprop="hasPart"]'
  );

  if (!sections.length || !('IntersectionObserver' in window)) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  sections.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach(el => observer.observe(el));
})();


/* ── 2. Favicon blink on tab hidden ── */
(function initFaviconBlink() {
  const linkEl = document.querySelector('link[rel="icon"]')
              || document.querySelector('link[rel="shortcut icon"]');
  if (!linkEl) return;

  const originalHref = linkEl.href;
  let blinkInterval = null;
  let isRed = false;

  // Create red-dot favicon via canvas
  function createRedFavicon() {
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    const ctx = c.getContext('2d');

    // Red circle
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#dc3545';
    ctx.fill();

    // White "!" exclamation
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', 16, 15);

    return c.toDataURL('image/png');
  }

  const redFavicon = createRedFavicon();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Start blinking
      blinkInterval = setInterval(() => {
        isRed = !isRed;
        linkEl.href = isRed ? redFavicon : originalHref;
      }, 800);
    } else {
      // Stop blinking, restore original
      clearInterval(blinkInterval);
      blinkInterval = null;
      isRed = false;
      linkEl.href = originalHref;
    }
  });
})();
