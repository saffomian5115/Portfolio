/* ============================================================
   MAIN.JS — Global JS
   - Footer injection
   - Scroll-to-top button
   - Page load fade-in
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── FOOTER HTML (single-page) ──────────────────────────── */
  const footerHTML = `
    <div class="footer-inner">
      <div class="footer-bottom">
        <p class="footer-copy">© 2025 <span>Sarfraz</span>. All rights reserved.</p>
        <p class="footer-made">Made with <span class="heart">♥</span> in Punjab, Pakistan</p>
      </div>
    </div>
  `;

  const footerEl = document.querySelector('footer');
  if (footerEl) footerEl.innerHTML = footerHTML;

  /* ── SCROLL TO TOP BUTTON ────────────────────────────────── */
  const scrollBtn = document.createElement('button');
  scrollBtn.className   = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
    stroke-linecap="round" stroke-linejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>`;
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── PAGE LOAD FADE-IN ───────────────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

});