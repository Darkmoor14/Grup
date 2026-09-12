document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  menuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // --- Cookie consent (TTDSG / GDPR) ---
  const CONSENT_KEY = 'ts_cookie_consent';
  const getConsent = () => {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; }
  };
  const setConsent = (consent) => {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch (e) {}
  };
  const hasFunctionalConsent = () => !!getConsent()?.functional;

  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const applyIcon = () => {
    const isDark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (themeToggle) themeToggle.textContent = isDark ? '☀' : '☾';
  };
  if (hasFunctionalConsent()) {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) root.setAttribute('data-theme', saved);
    } catch (e) {}
  }
  applyIcon();
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    if (hasFunctionalConsent()) {
      try { localStorage.setItem('theme', next); } catch (e) {}
    }
    applyIcon();
  });

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieModal = document.getElementById('cookie-modal');
  const functionalToggle = document.getElementById('cookie-functional');
  const analyticsToggle = document.getElementById('cookie-analytics');

  const showBanner = () => cookieBanner?.classList.add('show');
  const hideBanner = () => cookieBanner?.classList.remove('show');
  const openModal = () => {
    const c = getConsent() || {};
    if (functionalToggle) functionalToggle.checked = !!c.functional;
    if (analyticsToggle) analyticsToggle.checked = !!c.analytics;
    cookieModal?.classList.add('show');
  };
  const closeModal = () => cookieModal?.classList.remove('show');

  const applyConsent = (consent) => {
    if (!consent.functional) {
      try { localStorage.removeItem('theme'); } catch (e) {}
    }
  };

  if (!getConsent()) showBanner();

  document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
    const consent = { necessary: true, functional: true, analytics: true, ts: Date.now() };
    setConsent(consent);
    applyConsent(consent);
    hideBanner();
  });
  document.getElementById('cookie-reject')?.addEventListener('click', () => {
    const consent = { necessary: true, functional: false, analytics: false, ts: Date.now() };
    setConsent(consent);
    applyConsent(consent);
    hideBanner();
  });
  document.getElementById('cookie-manage')?.addEventListener('click', openModal);
  document.getElementById('footer-cookie-settings')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
  document.getElementById('cookie-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('cookie-modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('cookie-save')?.addEventListener('click', () => {
    const consent = {
      necessary: true,
      functional: !!functionalToggle?.checked,
      analytics: !!analyticsToggle?.checked,
      ts: Date.now()
    };
    setConsent(consent);
    applyConsent(consent);
    closeModal();
    hideBanner();
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
