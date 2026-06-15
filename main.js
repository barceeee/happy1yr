// Floating petals
const petalContainer = document.getElementById('petals');
for (let i = 0; i < 22; i++) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left              = `${Math.random() * 100}%`;
  petal.style.width             = `${6 + Math.random() * 8}px`;
  petal.style.height            = `${8 + Math.random() * 10}px`;
  petal.style.animationDuration = `${8 + Math.random() * 12}s`;
  petal.style.animationDelay    = `${-Math.random() * 15}s`;
  petal.style.opacity           = `${0.15 + Math.random() * 0.25}`;
  petalContainer.appendChild(petal);
}

// ── Slideshow ──
const track  = document.getElementById('slidesTrack');
const slides = track.querySelectorAll('.slide');
const dotsEl = document.getElementById('slideDots');
const total  = slides.length;
let current  = 0;
let autoTimer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

function goTo(index) {
  current = (index + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  dotsEl.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );
  resetAuto();
}

function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), 5000);
}

document.getElementById('slidePrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('slideNext').addEventListener('click', () => goTo(current + 1));

// Swipe support
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
});

resetAuto();

// ── Countdown ──
const START = new Date('2025-06-03T00:00:00');

function tick() {
  const diff  = Date.now() - START.getTime();
  const secs  = Math.floor(diff / 1000);
  const mins  = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  document.getElementById('cnt-days').textContent  = days.toLocaleString();
  document.getElementById('cnt-hours').textContent = String(hours % 24).padStart(2, '0');
  document.getElementById('cnt-mins').textContent  = String(mins  % 60).padStart(2, '0');
  document.getElementById('cnt-secs').textContent  = String(secs  % 60).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

// ── Scroll Reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 40);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
