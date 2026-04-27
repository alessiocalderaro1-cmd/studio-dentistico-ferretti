// V3 Studio del Futuro — interactions
// Vanilla JS + Lenis CDN smooth scroll + custom calendar mockup

(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lenis smooth scroll (loaded via CDN)
  if (window.Lenis && !reduce) {
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Phase title settle (hero)
  const phaseTitles = document.querySelectorAll('.phase-settle');
  const ioPhase = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          ioPhase.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  phaseTitles.forEach((t) => ioPhase.observe(t));

  // Calendar mockup
  const calendar = document.querySelector('.calendar-mock');
  if (calendar) {
    const days = calendar.querySelectorAll('.calendar-day:not(.is-disabled)');
    days.forEach((day) => {
      day.addEventListener('click', () => {
        days.forEach((d) => d.classList.remove('is-selected'));
        day.classList.add('is-selected');
        const slotsContainer = calendar.querySelector('.calendar-slots');
        if (slotsContainer) slotsContainer.style.opacity = '1';
      });
    });

    const slots = calendar.querySelectorAll('.slot:not(.is-booked)');
    slots.forEach((slot) => {
      slot.addEventListener('click', () => {
        slots.forEach((s) => s.classList.remove('is-selected'));
        slot.classList.add('is-selected');
      });
    });
  }

  // Form submit placeholder
  document.querySelectorAll('.book-form, form.contact-form').forEach((form) => {
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
