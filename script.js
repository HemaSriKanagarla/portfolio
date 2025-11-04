// Small site interactions: reveal on scroll, nav hide on scroll, and year update
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for reveal animations
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('reveal-multi')) {
        const children = [...entry.target.children];
        children.forEach((c, i) => {
          setTimeout(()=> c.classList.add('active'), i * 80);
        });
      } else {
        entry.target.classList.add('active');
      }
      obs.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal, .reveal-multi').forEach(el => revealObserver.observe(el));

// Nav hide on scroll down
let lastScroll = window.scrollY;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastScroll && y > 120) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = y;
});

// Smooth behaviour: handle internal links offset
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = a.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Keyboard shortcut: press "c" to go to contact
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'c') {
    document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
  }
});
