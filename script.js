(() => {
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme');
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const year = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');

  // Year
  if (year) year.textContent = String(new Date().getFullYear());

  // Theme
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (prefersLight ? 'light' : 'dark');
  if (initial === 'light') root.setAttribute('data-theme', 'light');

  const setIcon = () => {
    if (!themeBtn) return;
    const isLight = root.getAttribute('data-theme') === 'light';
    themeBtn.innerHTML = isLight
      ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
  };
  setIcon();

  themeBtn?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    setIcon();
  });

  // Mobile nav
  const closeNav = () => {
    navList?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  navToggle?.addEventListener('click', () => {
    const open = navList?.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navList?.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.tagName === 'A') closeNav();
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!navList || !navToggle) return;
    if (navList.classList.contains('is-open')) {
      const clickedInside = navList.contains(target) || navToggle.contains(target);
      if (!clickedInside) closeNav();
    }
  });

  // Contact form -> mailto
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();

    const subject = encodeURIComponent(`Contacto desde portfolio — ${name}`);
    const body = encodeURIComponent(
      `Hola Agus!\n\n` +
      `Nombre: ${name}\n` +
      `Email: ${email}\n\n` +
      `${message}\n\n` +
      `— Enviado desde tu portfolio`
    );

    window.location.href = `mailto:agustinhborda@gmail.com?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
})();
