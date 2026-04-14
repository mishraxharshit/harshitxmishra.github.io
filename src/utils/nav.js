// ── Shared Navigation Logic ──
export function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose = document.getElementById('nav-close');

  if (!hamburger) return;

  function open() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
    navMenu.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => navMenu.classList.contains('open') ? close() : open());
  navClose?.addEventListener('click', close);
  navOverlay?.addEventListener('click', close);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => e.key === 'Escape' && close());
}

// Auto-init
document.addEventListener('DOMContentLoaded', initNav);
