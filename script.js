(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.innerHTML = isOpen ? 'Close <span aria-hidden="true">−</span>' : 'Menu <span aria-hidden="true">＋</span>';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = 'Menu <span aria-hidden="true">＋</span>';
      });
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  // If a photo file is missing or fails to load, hide it quietly instead of showing a broken-image icon.
  document.querySelectorAll('.photo-frame img').forEach(img => {
    const hide = () => { img.style.display = 'none'; };
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  // Subtle reveal on scroll; content remains visible when reduced motion is preferred.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.project-card, .featured-project, .portfolio-note, .writing-copy, .about-content');
  if ('IntersectionObserver' in window && !reducedMotion) {
    revealItems.forEach(item => item.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  }
})();
