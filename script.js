document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  menuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const applyIcon = () => {
    const isDark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (themeToggle) themeToggle.textContent = isDark ? '☀' : '☾';
  };
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}
  applyIcon();
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    applyIcon();
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form-el');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = "Thanks — your message has been noted. Replace this form action with your email/service to receive real submissions.";
    status.classList.add('show', 'ok');
    form.reset();
  });
});
