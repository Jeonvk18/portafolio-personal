// ============================================================
// MENÚ MÓVIL
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// NAV ACTIVO + WAYPOINTS DEL SENDERO SEGÚN SECCIÓN VISIBLE
// ============================================================
const sections = document.querySelectorAll('main section[id], .hero[id]');
const navAnchors = document.querySelectorAll('[data-nav]');
const waypoints = document.querySelectorAll('.trail-rail .waypoint');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });

      waypoints.forEach(n => {
        n.classList.toggle('active', n.dataset.node === id);
      });
    }
  });
}, { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ============================================================
// EL SENDERO SE "DIBUJA" A MEDIDA QUE SE HACE SCROLL
// ============================================================
const trailPath = document.getElementById('trail-path');

function updateTrail() {
  if (!trailPath) return;
  const length = trailPath.getTotalLength();
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

  trailPath.style.strokeDasharray = `${length}`;
  trailPath.style.strokeDashoffset = `${length * (1 - progress)}`;
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (trailPath && !prefersReducedMotion) {
  window.addEventListener('scroll', updateTrail, { passive: true });
  window.addEventListener('resize', updateTrail);
  updateTrail();
} else if (trailPath) {
  trailPath.style.strokeDasharray = 'none';
}

// ============================================================
// FORMULARIO DE CONTACTO
// ============================================================
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  // EDITA AQUÍ: conecta este formulario a tu backend, Formspree,
  // EmailJS o similar. Por ahora solo muestra una confirmación visual.
  status.textContent = '✓ Mensaje listo para enviar — conecta este formulario a tu servicio de correo preferido.';

  form.reset();
});