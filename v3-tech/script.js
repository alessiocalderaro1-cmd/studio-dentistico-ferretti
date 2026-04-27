// V3 Studio del Futuro — interactions
// Vanilla JS + Lenis CDN smooth scroll + custom calendar mockup
// + mesh gradient background mouse-reactive

(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Mesh gradient mouse-reactive ───────────────────────────────
  // Inietta 4 blob al body, segue il mouse con easing
  function initMeshBg() {
    const meshBg = document.createElement('div');
    meshBg.className = 'mesh-bg';
    meshBg.setAttribute('aria-hidden', 'true');
    meshBg.innerHTML = `
      <div class="mesh-blob mesh-blob-1"></div>
      <div class="mesh-blob mesh-blob-2"></div>
      <div class="mesh-blob mesh-blob-3"></div>
      <div class="mesh-blob mesh-blob-4"></div>
    `;
    document.body.insertBefore(meshBg, document.body.firstChild);

    if (reduce) return; // respect prefers-reduced-motion

    const blobs = meshBg.querySelectorAll('.mesh-blob');
    // Per ogni blob, peso di reazione al mouse e fattore di easing
    const config = [
      { weightX: 0.05,  weightY: 0.05,  ease: 0.04, baseX: 0,    baseY: 0    },
      { weightX: -0.04, weightY: -0.04, ease: 0.03, baseX: 0,    baseY: 0    },
      { weightX: 0.06,  weightY: -0.06, ease: 0.05, baseX: 0,    baseY: 0    },
      { weightX: -0.05, weightY: 0.05,  ease: 0.035, baseX: 0,   baseY: 0    },
    ];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const positions = config.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }));

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    // Touch: media point degli ultimi touch (così il mesh segue il dito)
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    function animateMesh() {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      blobs.forEach((blob, i) => {
        const c = config[i];
        const p = positions[i];
        p.tx = dx * c.weightX * 6;
        p.ty = dy * c.weightY * 6;
        p.x += (p.tx - p.x) * c.ease;
        p.y += (p.ty - p.y) * c.ease;
        blob.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0)`;
      });
      requestAnimationFrame(animateMesh);
    }
    animateMesh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMeshBg);
  } else {
    initMeshBg();
  }

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
