/* ============================================================
   NAVBAR JS — navbar.js
   Handles: scroll effect, hamburger menu, active link (single-page)
   Custom smooth scroll with easing animation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const navbar      = document.querySelector('.navbar');
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile-menu');
  const NAVBAR_H    = 76; // navbar height in px

  /* ── SCROLL — add .scrolled class ──────────────────────── */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ── HAMBURGER TOGGLE ───────────────────────────────────── */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow =
        mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     CUSTOM SMOOTH SCROLL — with easing & navbar offset
     ═══════════════════════════════════════════════════════════ */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(targetY, duration = 800) {
    const startY     = window.scrollY;
    const distance   = targetY - startY;
    const startTime  = performance.now();

    function step(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Intercept nav anchor clicks for custom smooth scroll
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href   = link.getAttribute('href');
    const targetId = href.slice(1);

    // Only handle nav/cta links, skip placeholder href="#" (video buttons etc.)
    const isNavLink = link.closest('.nav-links, .nav-mobile-menu') || link.classList.contains('nav-cta');
    if (!isNavLink) return;

    e.preventDefault();

    if (!targetId) {
      // scroll to top
      smoothScrollTo(0, 600);
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - NAVBAR_H - 10;
    smoothScrollTo(targetPos, 800);
  });

  /* ═══════════════════════════════════════════════════════════
     ACTIVE LINK — scroll-based for single-page
     ═══════════════════════════════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');

  function updateActiveLink() {
    let currentId = 'home';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const offset = NAVBAR_H + 30;
      if (rect.top <= offset && rect.bottom >= offset) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.remove('active');

      if (currentId === 'home' && (href === 'index.html' || href === '#' || href === '')) {
        link.classList.add('active');
      } else if (href === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);
  updateActiveLink();

});