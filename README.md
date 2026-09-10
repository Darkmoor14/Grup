# Tag Stop — website

A static one-page site for Tag Stop, an engineering / project management
consultancy specializing in project management, IT solutions, and
electrical and mechanical engineering.

## Files

- `index.html` — page content and structure
- `styles.css` — all styling (light/dark theme via CSS custom properties)
- `script.js` — mobile nav toggle, theme toggle, contact form handling

## Before publishing, edit:

- Hero copy and stats (currently placeholder: 12 years, 80+ projects, etc.)
- About section bio and credentials
- Services, skills, and project case studies
- Testimonials
- Contact details (email, phone) and social links in the footer/contact section
- The contact form currently only shows a confirmation message client-side —
  wire it to your email (e.g. via [Formspree](https://formspree.io)) or a
  backend endpoint to actually receive submissions.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```
