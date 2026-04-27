// V1 Studio Caldo — interactions
// Vanilla JS, no dependencies

(function () {
  'use strict';

  // Header shrink on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        header.classList.toggle('is-scrolled', window.scrollY > 30);
      },
      { passive: true }
    );
  }

  // Team bio modal
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalContent = document.querySelector('.modal-content');

  document.querySelectorAll('[data-bio-target]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = trigger.dataset.bioTarget;
      const source = document.querySelector(`#bio-${slug}`);
      if (!source || !modalBackdrop || !modalContent) return;
      modalContent.querySelector('.modal-body').innerHTML = source.innerHTML;
      modalBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop || e.target.matches('.modal-close')) {
        modalBackdrop.hidden = true;
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalBackdrop.hidden) {
        modalBackdrop.hidden = true;
        document.body.style.overflow = '';
      }
    });
  }

  // Form submit placeholder (booking)
  document.querySelectorAll('.book-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      btn.textContent = '✓ Richiesta inviata — ti richiamiamo presto';
      btn.disabled = true;
      btn.style.background = '#a3d9c8';
      btn.style.color = '#2a2622';
    });
  });
})();
