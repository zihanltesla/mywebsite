// ── NAV scroll effect ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Speed lines generator ───────────────────────────
const speedContainer = document.getElementById('speed-lines');
function makeSpeedLine() {
  const line = document.createElement('div');
  line.className = 'speed-line';
  line.style.left = Math.random() * 100 + 'vw';
  line.style.animationDuration = (1.2 + Math.random() * 1.5) + 's';
  line.style.animationDelay = (Math.random() * 2) + 's';
  line.style.opacity = (0.2 + Math.random() * 0.5).toString();
  speedContainer.appendChild(line);
  line.addEventListener('animationend', () => line.remove());
}
setInterval(makeSpeedLine, 180);

// ── Intersection Observer for animations ────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // stat counters
    entry.target.querySelectorAll('.stat-value[data-target]').forEach(el => {
      const target = +el.dataset.target;
      const duration = 1400;
      const step = 16;
      const increment = target / (duration / step);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) clearInterval(timer);
      }, step);
    });

    // stat bars
    entry.target.querySelectorAll('.stat-fill').forEach(el => {
      setTimeout(() => el.classList.add('animated'), 200);
    });

    // skill bars
    entry.target.querySelectorAll('.skill-fill').forEach(el => {
      setTimeout(() => el.classList.add('animated'), 200);
    });

    io.unobserve(entry.target);
  });
}, { threshold: 0.25 });

document.querySelectorAll('#stats, #skills').forEach(el => io.observe(el));

// ── Fade-in on scroll ───────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.project-card, .about-card, .stat-card, .skill-row'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});

// ── Contact form ────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('form-submit');
  btn.textContent = '✓ MESSAGE SENT!';
  btn.style.background = '#00c853';
  btn.style.borderColor = '#00c853';
  setTimeout(() => {
    btn.textContent = 'SEND MESSAGE ›';
    btn.style.background = '';
    btn.style.borderColor = '';
    e.target.reset();
  }, 3000);
});

// ── Hamburger menu (mobile) ─────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const isOpen = links.style.display === 'flex';
  links.style.display = isOpen ? '' : 'flex';
  if (!isOpen) {
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(8,8,8,.97)';
    links.style.padding = '1rem 2rem';
    links.style.gap = '1rem';
    links.style.borderBottom = '1px solid rgba(255,255,255,.08)';
  }
});

// close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    links.style.display = '';
  });
});

// ── Helmet tilt on mouse move ───────────────────────
const helmet = document.getElementById('helmet-img');
if (helmet) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    helmet.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    helmet.style.transform = '';
  });
}
