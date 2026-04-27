// Landing showcase — minimal interactions
// Smooth scroll behavior + variant card preload hint

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.variant-card, .extra-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const href = card.getAttribute('href');
      if (!href) return;
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }, { once: true });
  });
});
