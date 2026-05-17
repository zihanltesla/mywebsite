// ── NAV scroll effect ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Speed lines ──────────────────────────────────────
const speedContainer = document.getElementById('speed-lines');
function makeSpeedLine() {
  const line = document.createElement('div');
  line.className = 'speed-line';
  line.style.left = Math.random() * 100 + 'vw';
  line.style.animationDuration = (1.2 + Math.random() * 1.5) + 's';
  line.style.animationDelay = (Math.random() * 2) + 's';
  line.style.opacity = (0.15 + Math.random() * 0.4).toString();
  speedContainer.appendChild(line);
  line.addEventListener('animationend', () => line.remove());
}
setInterval(makeSpeedLine, 200);

// ── Skill bars animate on scroll ────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.skill-fill').forEach(el => {
      setTimeout(() => el.classList.add('animated'), 200);
    });
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ── Timeline items animate on scroll ────────────────
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), i * 150);
    tlObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.timeline-item').forEach(el => tlObserver.observe(el));

// ── Generic fade-in on scroll ────────────────────────
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
  '.project-card, .about-card, .skill-row, .edu-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
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
    Object.assign(links.style, {
      flexDirection: 'column', position: 'absolute',
      top: '64px', left: '0', right: '0',
      background: 'rgba(8,8,8,.97)', padding: '1rem 2rem',
      gap: '1rem', borderBottom: '1px solid rgba(255,255,255,.08)'
    });
  }
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').style.display = '';
  });
});

// ── Helmet 3D tilt on mouse ─────────────────────────
const helmet = document.getElementById('helmet-img');
if (helmet) {
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
    const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    helmet.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg)`;
  });
  document.addEventListener('mouseleave', () => { helmet.style.transform = ''; });
}
