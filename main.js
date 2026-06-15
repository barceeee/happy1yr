// Floating petals
const petalContainer = document.getElementById('petals');
for (let i = 0; i < 22; i++) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left             = `${Math.random() * 100}%`;
  petal.style.width            = `${6 + Math.random() * 8}px`;
  petal.style.height           = `${8 + Math.random() * 10}px`;
  petal.style.animationDuration = `${8 + Math.random() * 12}s`;
  petal.style.animationDelay   = `${-Math.random() * 15}s`;
  petal.style.opacity          = `${0.15 + Math.random() * 0.25}`;
  petalContainer.appendChild(petal);
}

// Live countdown from June 3, 2025
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

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 40);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
