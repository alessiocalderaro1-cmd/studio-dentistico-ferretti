// Smile upload + canvas preview con overlay sorriso ideale — vanilla JS
// HTML: <div class="smile-upload" data-overlay="ideal"></div>
//   data-overlay: tipo overlay ("ideal" = arco sorriso, "grid" = griglia analisi, "off" = nessuno)

(function () {
  'use strict';

  const SMILE_OVERLAY_PATH = 'M 50 70 Q 100 30 150 70'; // path SVG arco sorriso

  function buildUploader(el) {
    const overlay = el.dataset.overlay || 'ideal';

    el.innerHTML = `
      <label class="smile-dropzone" tabindex="0">
        <input type="file" accept="image/*" hidden aria-label="Carica una foto del tuo sorriso">
        <div class="smile-dropzone-empty">
          <svg class="smile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          <p class="smile-dropzone-text">Trascina qui un selfie sorridente</p>
          <p class="smile-dropzone-sub">oppure clicca per caricare</p>
        </div>
      </label>
      <div class="smile-preview" hidden>
        <canvas class="smile-canvas" aria-label="Anteprima del sorriso"></canvas>
        <button type="button" class="smile-reset" aria-label="Cambia foto">Cambia foto</button>
      </div>
      <form class="smile-form" hidden>
        <label>Nome <input type="text" name="name" required></label>
        <label>Email <input type="email" name="email" required></label>
        <label>Telefono <input type="tel" name="phone"></label>
        <button type="submit" class="smile-submit">Invia per analisi</button>
        <p class="smile-privacy">Riceverai una proiezione personalizzata entro 48h. La foto è cancellata dopo l'analisi.</p>
      </form>
    `;

    const input = el.querySelector('input[type=file]');
    const dropzone = el.querySelector('.smile-dropzone');
    const empty = el.querySelector('.smile-dropzone-empty');
    const preview = el.querySelector('.smile-preview');
    const canvas = el.querySelector('.smile-canvas');
    const reset = el.querySelector('.smile-reset');
    const form = el.querySelector('.smile-form');
    const ctx = canvas.getContext('2d');

    function renderImage(file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const max = 800;
        const ratio = Math.min(max / img.width, max / img.height, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (overlay === 'ideal') drawSmileOverlay(ctx, canvas.width, canvas.height);
        if (overlay === 'grid') drawGridOverlay(ctx, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        empty.hidden = true;
        preview.hidden = false;
        form.hidden = false;
      };
      img.src = url;
    }

    function drawSmileOverlay(ctx, w, h) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      const cx = w / 2, cy = h * 0.65;
      ctx.moveTo(cx - w * 0.18, cy);
      ctx.quadraticCurveTo(cx, cy + h * 0.08, cx + w * 0.18, cy);
      ctx.stroke();
      ctx.restore();
    }

    function drawGridOverlay(ctx, w, h) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += w / 3) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += h / 3) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    input.addEventListener('change', (e) => {
      if (e.target.files[0]) renderImage(e.target.files[0]);
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('is-drag');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('is-drag'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('is-drag');
      if (e.dataTransfer.files[0]) renderImage(e.dataTransfer.files[0]);
    });

    reset.addEventListener('click', () => {
      input.value = '';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      empty.hidden = false;
      preview.hidden = true;
      form.hidden = true;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const submit = form.querySelector('.smile-submit');
      submit.disabled = true;
      submit.textContent = 'Invio in corso…';
      // placeholder: simulate request
      setTimeout(() => {
        submit.textContent = 'Inviato. Ti scriviamo entro 48h.';
        form.querySelectorAll('input').forEach((i) => (i.disabled = true));
      }, 800);
    });
  }

  function init() {
    document.querySelectorAll('.smile-upload').forEach(buildUploader);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
