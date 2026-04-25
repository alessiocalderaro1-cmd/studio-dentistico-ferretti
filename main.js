/* ═══════════════════════════════════════════════
   main.js — Studio Dentistico Ferretti
═══════════════════════════════════════════════ */

// ── Header shadow on scroll ──────────────────
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// ── Mobile nav ───────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mainNav     = document.getElementById('main-nav');
const navOverlay  = document.getElementById('nav-overlay');

function openNav() {
  hamburger.classList.add('active');
  mainNav.classList.add('open');
  navOverlay.classList.add('active');
  navOverlay.removeAttribute('aria-hidden');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  hamburger.classList.remove('active');
  mainNav.classList.remove('open');
  navOverlay.classList.remove('active');
  navOverlay.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () =>
  hamburger.classList.contains('active') ? closeNav() : openNav()
);
navOverlay.addEventListener('click', closeNav);
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// ── Scroll-in animations ─────────────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay ?? 0);
    setTimeout(() => entry.target.classList.add('visible'), delay);
    animObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

// ── Active nav link on scroll ────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.main-nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.classList.remove('active'));
    const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
    active?.classList.add('active');
  });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));

// ── Booking form ─────────────────────────────
const form       = document.getElementById('booking-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');
    const isEmpty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
    if (isEmpty) { field.classList.add('error'); valid = false; }
  });

  if (!valid) {
    const first = form.querySelector('.error');
    first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    first?.focus();
    return;
  }

  const btn = form.querySelector('[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Invio in corso…';

  setTimeout(() => {
    form.style.display = 'none';
    successMsg.hidden = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1100);
});

form.querySelectorAll('input, select, textarea').forEach(field =>
  field.addEventListener('input', () => field.classList.remove('error'))
);
