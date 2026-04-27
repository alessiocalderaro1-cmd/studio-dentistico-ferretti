// Before/After slider drag — vanilla JS, ~50 righe
// Init: aggiungi data-before="..." data-after="..." al wrapper .ba-slider
// HTML: <div class="ba-slider" data-before="img1.jpg" data-after="img2.jpg" data-label-before="Prima" data-label-after="Dopo"></div>

(function () {
  'use strict';

  function buildSlider(el) {
    const before = el.dataset.before;
    const after = el.dataset.after;
    const labelBefore = el.dataset.labelBefore || 'Prima';
    const labelAfter = el.dataset.labelAfter || 'Dopo';

    el.innerHTML = `
      <div class="ba-img ba-img-after" style="background-image:url('${after}')" role="img" aria-label="${labelAfter}"></div>
      <div class="ba-img ba-img-before" style="background-image:url('${before}'); clip-path: inset(0 50% 0 0)" role="img" aria-label="${labelBefore}"></div>
      <div class="ba-divider" style="left:50%">
        <button type="button" class="ba-handle" aria-label="Trascina per confrontare prima e dopo" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" role="slider"></button>
      </div>
      <span class="ba-label ba-label-before">${labelBefore}</span>
      <span class="ba-label ba-label-after">${labelAfter}</span>
    `;

    const beforeImg = el.querySelector('.ba-img-before');
    const divider = el.querySelector('.ba-divider');
    const handle = el.querySelector('.ba-handle');
    let dragging = false;

    function setPosition(percent) {
      const p = Math.max(0, Math.min(100, percent));
      beforeImg.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
      divider.style.left = `${p}%`;
      handle.setAttribute('aria-valuenow', Math.round(p));
    }

    function onPointerMove(e) {
      if (!dragging) return;
      const rect = el.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      setPosition((x / rect.width) * 100);
    }

    function startDrag(e) {
      dragging = true;
      onPointerMove(e);
      e.preventDefault();
    }

    function endDrag() {
      dragging = false;
    }

    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: false });
    el.addEventListener('mousedown', startDrag);
    el.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    handle.addEventListener('keydown', (e) => {
      const current = parseFloat(divider.style.left);
      if (e.key === 'ArrowLeft') setPosition(current - 5);
      if (e.key === 'ArrowRight') setPosition(current + 5);
      if (e.key === 'Home') setPosition(0);
      if (e.key === 'End') setPosition(100);
    });
  }

  function init() {
    document.querySelectorAll('.ba-slider').forEach(buildSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
