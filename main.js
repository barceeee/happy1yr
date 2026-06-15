// ── Petals ──
const pc = document.getElementById('petals');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  const size = 6 + Math.random() * 8;
  p.style.cssText = [
    `left:${Math.random()*100}%`,
    `width:${size}px`,
    `height:${size*1.5}px`,
    `background:radial-gradient(ellipse,${Math.random()>0.5?'#e8a4c8':'#c47aac'} 0%,transparent 70%)`,
    `animation-duration:${9+Math.random()*12}s`,
    `animation-delay:${-Math.random()*18}s`
  ].join(';');
  pc.appendChild(p);
}

// ── Slideshow with YouTube autoplay ──
const track    = document.getElementById('slides');
const slideEls = Array.from(track.querySelectorAll('.slide'));
const dotsEl   = document.getElementById('sDots');
const total    = slideEls.length;
let cur        = 0;

// All data-yt values are now valid 11-char YouTube IDs
function ytSrc(videoId) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1`;
}

// Build dots
slideEls.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' on' : '');
  d.setAttribute('aria-label', `Slide ${i+1}`);
  d.addEventListener('click', () => go(i));
  dotsEl.appendChild(d);
});

function go(idx) {
  // Stop current iframe by removing src
  const prevFrame = slideEls[cur].querySelector('.yt-frame');
  if (prevFrame) prevFrame.src = '';

  cur = ((idx % total) + total) % total;
  track.style.transform = `translateX(-${cur * 100}%)`;

  // Update dots
  dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('on', i === cur));

  // Autoplay new slide's video
  const ytId  = slideEls[cur].dataset.yt;
  const frame = slideEls[cur].querySelector('.yt-frame');
  if (frame && ytId) {
    frame.src = ytSrc(ytId);
  }
}

// Init first slide
const firstId    = slideEls[0].dataset.yt;
const firstFrame = slideEls[0].querySelector('.yt-frame');
if (firstFrame && firstId) firstFrame.src = ytSrc(firstId);

document.getElementById('sPrev').addEventListener('click', () => go(cur - 1));
document.getElementById('sNext').addEventListener('click', () => go(cur + 1));

// Swipe
let tx = 0;
track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend',   e => {
  const d = tx - e.changedTouches[0].clientX;
  if (Math.abs(d) > 40) go(d > 0 ? cur + 1 : cur - 1);
});

// Keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(cur + 1);
  if (e.key === 'ArrowLeft')  go(cur - 1);
});

// ── Countdown ──
const START = new Date('2025-06-03T00:00:00');
function tick() {
  const ms = Date.now() - START.getTime();
  const s  = Math.floor(ms / 1000);
  const m  = Math.floor(s / 60);
  const h  = Math.floor(m / 60);
  const d  = Math.floor(h / 24);
  document.getElementById('cnt-days').textContent  = d.toLocaleString();
  document.getElementById('cnt-hours').textContent = String(h % 24).padStart(2,'0');
  document.getElementById('cnt-mins').textContent  = String(m % 60).padStart(2,'0');
  document.getElementById('cnt-secs').textContent  = String(s % 60).padStart(2,'0');
}
tick(); setInterval(tick, 1000);

// ── Scroll reveal ──
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 40);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
