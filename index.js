 // Particle Background
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
      }
      draw() {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
          particlesArray.splice(i, 1);
          i--;
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

    // Loader
    const loader = document.getElementById('loader');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    let dots = '';
    const textElement = document.querySelector('#terminal').childNodes[0];

    const dotInterval = setInterval(() => {
      dots = dots.length < 3 ? dots + '.' : '';
      textElement.textContent = 'Initializing portfolio' + dots;
    }, 400);

    window.addEventListener('load', () => {
      setTimeout(() => {
        clearInterval(dotInterval);
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        main.classList.add('visible');
        document.body.style.overflow = 'auto';
      }, 2800);
    });

    // Smooth scroll & header shrink
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const button = this.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;

      setTimeout(() => {
        alert('Message sent successfully! (Simulated)');
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
      }, 1500);
    });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });