/* ============================================================
   NAVBAR JS — navbar.js
   Handles: scroll effect, hamburger menu, active link
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const navbar      = document.querySelector('.navbar');
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile-menu');

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
      // prevent body scroll when menu is open
      document.body.style.overflow =
        mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── ACTIVE LINK — based on current page ───────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const allLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');

  allLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage === 'index.html' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});