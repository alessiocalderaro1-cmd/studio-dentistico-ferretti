// Reveal-on-scroll IntersectionObserver helper — vanilla JS
// Aggiungi class .reveal a qualsiasi elemento; opzionale data-reveal-delay="100" per ritardo ms
// Aggiungi data-reveal-stagger sul wrapper per applicare stagger ai figli con .reveal
// CSS: .reveal { opacity: 0; transform: translateY(20px); transition: opacity .6s ease-out, transform .6s ease-out; }
//      .reveal.is-visible { opacity: 1; transform: none; }

(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal() {
    const items = document.querySelectorAll('.reveal:not(.is-visible)');
    if (reduce) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseInt(el.dataset.revealDelay || '0', 10);
          setTimeout(() => el.classList.add('is-visible'), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => io.observe(el));

    // Stagger: per ogni .reveal-stagger trova .reveal figli e calcola delay incrementali
    document.querySelectorAll('[data-reveal-stagger]').forEach((wrap) => {
      const step = parseInt(wrap.dataset.revealStagger || '100', 10);
      wrap.querySelectorAll('.reveal').forEach((child, i) => {
        if (!child.dataset.revealDelay) child.dataset.revealDelay = String(i * step);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }
})();
