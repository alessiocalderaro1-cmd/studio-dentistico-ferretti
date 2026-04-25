// Studio Dentistico Ferretti — main.js
// Vanilla JS minimal: header shrink + form submit

// Header shrink on scroll
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  }, { passive: true });
}

// Form submit placeholder (da collegare a CF Worker o Brevo)
const form = document.querySelector('.prenota__form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = '✓ Richiesta inviata — ti richiamiamo presto!';
    btn.disabled = true;
    btn.style.background = '#0D9488';
  });
}
