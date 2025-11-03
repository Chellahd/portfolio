/* ---------- PARTICLES ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = 0;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.8;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.speedY = Math.random() * 0.8 - 0.4;
    this.color = `hsl(${hue}, 100%, 70%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.012;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 120; i++) particlesArray.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hue += 0.5;
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1); i--;
      particlesArray.push(new Particle());
    }
  }
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

initParticles();
animateParticles();

/* ---------- LOADER ---------- */
const loader = document.getElementById('loader');
const main = document.querySelector('main');
let dots = '';
const textEl = document.querySelector('#terminal').childNodes[0];

const dotInt = setInterval(() => {
  dots = dots.length < 3 ? dots + '.' : '';
  textEl.textContent = 'Initializing portfolio' + dots;
}, 400);

const maxWait = setTimeout(() => {
  clearInterval(dotInt);
  loader.style.opacity = '0';
  loader.style.visibility = 'hidden';
  main.classList.add('visible');
  document.body.style.overflow = 'auto';
}, 4000);

window.addEventListener('load', () => {
  clearTimeout(maxWait);
  setTimeout(() => {
    if (loader.style.opacity !== '0') {
      clearInterval(dotInt);
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      main.classList.add('visible');
      document.body.style.overflow = 'auto';
    }
  }, 2800);
});

/* ---------- SCROLL PROGRESS & HEADER ---------- */
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = percent + '%';

  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------- FORM ---------- */
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;
  btn.textContent = 'Sending...'; btn.disabled = true;
  setTimeout(() => {
    alert('Message sent successfully! (Simulated)');
    e.target.reset();
    btn.textContent = orig; btn.disabled = false;
  }, 1500);
});

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

/* ---------- FADE-IN ON SCROLL ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-card, .project, .skill-item').forEach(el => observer.observe(el));

/* ---------- PROJECT MODAL ---------- */
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const close = document.querySelector('.close');

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = btn.dataset.title;
    modalDesc.textContent = btn.dataset.desc;
    modalLink.href = btn.dataset.link || '#';
    modal.style.display = 'flex';
  });
});

close.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
