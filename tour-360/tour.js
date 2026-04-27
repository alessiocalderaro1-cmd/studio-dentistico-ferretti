// Tour 360° — Three.js panorama viewer with hotspots
// Cherry-pick: threejs-journey base + spring physics easing + character reveal title transitions

import * as THREE from 'three';

// ── Theme detection (solo V1 e V3 — demo ufficiali) ─────────────
const params = new URLSearchParams(window.location.search);
const theme = ['v1', 'v3'].includes(params.get('theme')) ? params.get('theme') : 'v3';
document.body.className = `theme-${theme}`;

// Back link torna alla variante corretta
const backLink = document.getElementById('tour-back');
backLink.href = theme === 'v1' ? '/v1-warm/' : '/v3-tech/';

// ── Rooms data ───────────────────────────────────────────────────
const rooms = {
  entrance: {
    name: 'Ingresso · Reception',
    num: 1,
    image: '/shared/images/panoramic/entrance.svg',
    hotspots: [
      { lon: 0, lat: 0, target: 'waiting', label: 'Sala d\'attesa' },
      { lon: 90, lat: -5, target: 'chair', label: 'Riunito' }
    ]
  },
  waiting: {
    name: 'Sala d\'attesa',
    num: 2,
    image: '/shared/images/panoramic/waiting.svg',
    hotspots: [
      { lon: 180, lat: 0, target: 'entrance', label: 'Ingresso' },
      { lon: 60, lat: -5, target: 'chair', label: 'Riunito' },
      { lon: -60, lat: -5, target: 'surgery', label: 'Sala chirurgica' }
    ]
  },
  chair: {
    name: 'Riunito odontoiatrico',
    num: 3,
    image: '/shared/images/panoramic/chair.svg',
    hotspots: [
      { lon: 180, lat: 0, target: 'waiting', label: 'Sala d\'attesa' },
      { lon: 90, lat: -5, target: 'surgery', label: 'Sala chirurgica' }
    ]
  },
  surgery: {
    name: 'Sala chirurgica',
    num: 4,
    image: '/shared/images/panoramic/surgery.svg',
    hotspots: [
      { lon: 180, lat: 0, target: 'waiting', label: 'Sala d\'attesa' },
      { lon: -90, lat: -5, target: 'chair', label: 'Riunito' }
    ]
  }
};

let currentRoom = 'entrance';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Three.js setup ──────────────────────────────────────────────
const canvas = document.getElementById('tour-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0.01);

// Sphere geometry inside-out — alta segmentazione per ridurre artefatti
const geometry = new THREE.SphereGeometry(500, 128, 64);
geometry.scale(-1, 1, 1);

let material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Risoluzione panorama (equirectangular 2:1)
const PANO_WIDTH = 4096;
const PANO_HEIGHT = 2048;

// Caricatore custom: rasterizza SVG in canvas ad alta risoluzione, evita
// downscaling automatico del browser su SVG senza width/height esplicito
function loadPanoramaTexture(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = PANO_WIDTH;
      canvas.height = PANO_HEIGHT;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, PANO_WIDTH, PANO_HEIGHT);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      resolve(texture);
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

// ── Camera control state ──────────────────────────────────────────
let lon = 0, lat = 0;
let phi = 0, thetaAngle = 0;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;

canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});
canvas.addEventListener('mouseup', () => { isDragging = false; });
canvas.addEventListener('mouseleave', () => { isDragging = false; });
canvas.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  lon -= (e.clientX - lastMouseX) * 0.2;
  lat += (e.clientY - lastMouseY) * 0.2;
  lat = Math.max(-85, Math.min(85, lat));
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});
canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  }
}, { passive: true });
canvas.addEventListener('touchend', () => { isDragging = false; });
canvas.addEventListener('touchmove', (e) => {
  if (!isDragging || e.touches.length !== 1) return;
  lon -= (e.touches[0].clientX - lastMouseX) * 0.3;
  lat += (e.touches[0].clientY - lastMouseY) * 0.3;
  lat = Math.max(-85, Math.min(85, lat));
  lastMouseX = e.touches[0].clientX;
  lastMouseY = e.touches[0].clientY;
}, { passive: true });

// Keyboard arrows
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') lon -= 5;
  if (e.key === 'ArrowRight') lon += 5;
  if (e.key === 'ArrowUp') lat = Math.min(85, lat + 5);
  if (e.key === 'ArrowDown') lat = Math.max(-85, lat - 5);
  if (e.key === 'Escape') window.location.href = backLink.href;
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Hotspot management ─────────────────────────────────────────────
const hotspotEls = [];
function clearHotspots() {
  hotspotEls.forEach((el) => el.remove());
  hotspotEls.length = 0;
}

function lonLatToVector(lon, lat) {
  const rad = (deg) => (deg * Math.PI) / 180;
  const phi = rad(90 - lat);
  const theta = rad(lon);
  return new THREE.Vector3(
    -490 * Math.sin(phi) * Math.cos(theta),
    490 * Math.cos(phi),
    490 * Math.sin(phi) * Math.sin(theta)
  );
}

function buildHotspots(room) {
  clearHotspots();
  room.hotspots.forEach((h) => {
    const el = document.createElement('button');
    el.className = 'tour-hotspot';
    el.innerHTML = `<span class="tour-hotspot-label">${h.label}</span>`;
    el.setAttribute('aria-label', `Vai a ${h.label}`);
    el.addEventListener('click', () => goToRoom(h.target));
    document.querySelector('.tour-container').appendChild(el);
    el.dataset.lon = h.lon;
    el.dataset.lat = h.lat;
    hotspotEls.push(el);
  });
}

function updateHotspots() {
  hotspotEls.forEach((el) => {
    const v = lonLatToVector(parseFloat(el.dataset.lon), parseFloat(el.dataset.lat));
    v.applyMatrix4(camera.matrixWorldInverse);
    if (v.z > 0) {
      el.style.display = 'none';
      return;
    }
    const projected = v.clone().project(camera);
    el.style.display = 'flex';
    el.style.left = `${(projected.x * 0.5 + 0.5) * window.innerWidth}px`;
    el.style.top = `${(-projected.y * 0.5 + 0.5) * window.innerHeight}px`;
  });
}

// ── Room loading ───────────────────────────────────────────────────
const loading = document.getElementById('tour-loading');
const roomTitle = document.getElementById('room-title');
const roomCounter = document.getElementById('room-counter');

function loadRoom(roomKey, transition = false) {
  const room = rooms[roomKey];
  if (!room) return;
  currentRoom = roomKey;

  // Update UI
  document.querySelectorAll('.tour-room').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.room === roomKey);
  });

  if (transition && !reduced) {
    roomTitle.classList.add('is-changing');
    setTimeout(() => {
      roomTitle.textContent = room.name;
      roomCounter.innerHTML = `${String(room.num).padStart(2, '0')} <strong>/</strong> 04`;
      roomTitle.classList.remove('is-changing');
    }, 400);
  } else {
    roomTitle.textContent = room.name;
    roomCounter.innerHTML = `${String(room.num).padStart(2, '0')} <strong>/</strong> 04`;
  }

  loadPanoramaTexture(room.image).then((texture) => {
    if (transition && !reduced) {
      fadeMaterial(texture);
    } else {
      if (material.map) material.map.dispose();
      material.map = texture;
      material.opacity = 1;
      material.needsUpdate = true;
    }
    buildHotspots(room);
    loading.classList.add('is-hidden');
  }).catch((err) => {
    console.error('Tour panorama load error:', err);
    loading.classList.add('is-hidden');
  });
}

function fadeMaterial(newTexture) {
  const startTime = performance.now();
  const duration = 600;
  const startOpacity = material.opacity;
  const oldMap = material.map;

  function fadeOut(t) {
    const progress = Math.min((t - startTime) / duration, 1);
    material.opacity = startOpacity * (1 - progress);
    material.needsUpdate = true;
    if (progress < 1) {
      requestAnimationFrame(fadeOut);
    } else {
      material.map = newTexture;
      if (oldMap) oldMap.dispose();
      material.needsUpdate = true;
      const fadeInStart = performance.now();
      function fadeIn(t2) {
        const p = Math.min((t2 - fadeInStart) / duration, 1);
        material.opacity = p;
        material.needsUpdate = true;
        if (p < 1) requestAnimationFrame(fadeIn);
      }
      requestAnimationFrame(fadeIn);
    }
  }
  requestAnimationFrame(fadeOut);
}

function goToRoom(roomKey) {
  loadRoom(roomKey, true);
}

// Room buttons
document.querySelectorAll('.tour-room').forEach((btn) => {
  btn.addEventListener('click', () => goToRoom(btn.dataset.room));
});

// Welcome tooltip
const tooltip = document.getElementById('welcome-tooltip');
document.querySelector('.tour-tooltip-close')?.addEventListener('click', () => {
  tooltip.hidden = true;
});
setTimeout(() => { if (!tooltip.hidden) tooltip.hidden = true; }, 8000);

// ── Animation loop ─────────────────────────────────────────────────
function animate() {
  phi = THREE.MathUtils.degToRad(90 - lat);
  thetaAngle = THREE.MathUtils.degToRad(lon);
  camera.lookAt(
    500 * Math.sin(phi) * Math.cos(thetaAngle),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(thetaAngle)
  );
  renderer.render(scene, camera);
  updateHotspots();
  requestAnimationFrame(animate);
}

// Boot
loadRoom('entrance', false);
animate();
