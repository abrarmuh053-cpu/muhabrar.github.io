/* ============================================================
   CREATOR PORTFOLIO — script.js
   ============================================================
   1. Scroll-Reveal   – fades sections in as they enter the viewport
   2. Nav Active State – highlights the correct nav link on scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. SCROLL REVEAL ───────────────────────────────────────
  // Every element with class "reveal" starts invisible (handled in CSS).
  // Once it crosses the threshold it gets the "visible" class → animates in.

  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // small staggered delay so sibling sections don't all pop at once
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);

        // only trigger once
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12   // element must be 12 % visible before it animates
  });

  revealEls.forEach((el) => revealObserver.observe(el));


  // ─── 2. NAV ACTIVE STATE ON SCROLL ──────────────────────────
  // Reads every <section id="…"> and highlights the matching nav link
  // as the user scrolls through the page.

  const navLinks  = document.querySelectorAll('.nav-pill a');
  const sections  = [...document.querySelectorAll('section[id]')];

  function updateActiveNav() {
    let currentId = '';

    sections.forEach((section) => {
      // 120 px offset accounts for the sticky nav height
      if (window.scrollY + 120 >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  // throttle scroll listener to ~60 fps
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // run once on page load so the first section is already highlighted
  updateActiveNav();

});