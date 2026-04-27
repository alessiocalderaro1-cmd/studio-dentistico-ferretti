// V2 Ambulatorio Autorevole — interactions
// Vanilla JS, no dependencies. Conversion-first: pulse glow CTA telefono.

(function () {
  'use strict';

  // Header behavior
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // Doctor card → modal bio
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalBody = modalBackdrop?.querySelector('.modal-body');

  document.querySelectorAll('[data-bio-target]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = trigger.dataset.bioTarget;
      const source = document.querySelector(`#bio-${slug}`);
      if (!source || !modalBackdrop || !modalBody) return;
      modalBody.innerHTML = source.innerHTML;
      modalBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop || e.target.closest('.modal-close')) {
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

  // Form submit placeholder
  document.querySelectorAll('.book-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (btn) {
        btn.textContent = '✓ Richiesta inviata';
        btn.disabled = true;
        btn.style.background = 'var(--success, #5cb85c)';
      }
    });
  });

  // Services TOC active link
  const tocLinks = document.querySelectorAll('.services-toc a');
  if (tocLinks.length) {
    const sections = Array.from(tocLinks).map((link) =>
      document.querySelector(link.getAttribute('href'))
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove('is-active'));
            const idx = sections.indexOf(entry.target);
            if (idx >= 0) tocLinks[idx].classList.add('is-active');
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => s && observer.observe(s));
  }
})();
