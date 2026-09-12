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
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.classList.remove('show', 'ok', 'error');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (response.ok) {
        status.textContent = "Thanks — your message has been sent. Expect a reply within one business day.";
        status.classList.add('show', 'ok');
        form.reset();
      } else {
        status.textContent = "Something went wrong sending that — please try again or email hello@tagstop.com directly.";
        status.classList.add('show', 'error');
      }
    } catch (err) {
      status.textContent = "Something went wrong sending that — please try again or email hello@tagstop.com directly.";
      status.classList.add('show', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
});
