// V4 Atelier del Sorriso — interactions
// Vanilla JS + Lenis CDN smooth scroll + character reveal

(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lenis smooth scroll
  if (window.Lenis && !reduce) {
    const lenis = new window.Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // Character reveal sui titoli .char-reveal
  document.querySelectorAll('.char-reveal').forEach((el) => {
    const text = el.textContent;
    el.innerHTML = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? ' ' : char;
      span.style.animationDelay = `${i * 30}ms`;
      el.appendChild(span);
    });
  });

  // Form submit
  document.querySelectorAll('.contact-form, form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (btn) {
        btn.textContent = '✓ Inviato';
        btn.disabled = true;
      }
    });
  });
})();
