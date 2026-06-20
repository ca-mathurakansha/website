# Akansha Mathur CA Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-page + 1-sub-page static marketing website for Akansha Mathur CA targeting UK and Irish accounting firms.

**Architecture:** Four plain HTML files (index.html, services.html, contact.html, controls-sox.html) sharing one stylesheet (css/styles.css) and one JS file (js/main.js) for the mobile hamburger only. No build tool, no framework, no backend.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Google Fonts (Fraunces + Plus Jakarta Sans + JetBrains Mono).

## Global Constraints

- Static files only — open directly in a browser, no local server needed
- Fonts: Fraunces (headings — variable optical-size serif), Plus Jakarta Sans (body), JetBrains Mono (numbers and data callouts only)
- Palette: `#F4F3ED` bg · `#1B4332` green primary · `#0F2D21` green dark · `#9C6B2E` bronze accent · `#16150F` text · `#6E6A5E` muted · `#DDD9CF` border
- No prices anywhere on the site
- All services framed as prep returned for UK/Irish firm to review — never implies direct HMRC filing or UK filing authority
- Controls & SOX work framed as support/readiness/testing only — not audit opinions
- No Xero Advisor Certified badge (not yet earned)
- Placeholders `[email]`, `[phone]`, `[LinkedIn]`, `[ICAI No.]` left as-is; site owner fills before publish
- Mobile-first, 44px minimum touch targets, keyboard-accessible, visible focus states
- `prefers-reduced-motion` respected everywhere
- No console.logs in committed code

---

## File Map

```
index.html            Home — hero, profile, service cards, how it works, trust strip, timezone, CTA
services.html         Services — all 5 services in detail with quote CTAs
contact.html          Contact — email/phone/LinkedIn + mailto form
controls-sox.html     Sub-page — US SOX/ICFR + UK Provision 29
css/styles.css        All styles (tokens, reset, typography, layout, each component)
js/main.js            Hamburger menu toggle + mailto form handler
docs/                 Plans only — not served
```

---

### Task 1: Scaffold + Design System

**Files:**
- Create: `css/styles.css`
- Create: `js/main.js` (stub)
- Create: `index.html` (shell)

**Interfaces:**
- Produces: CSS custom properties and utility classes consumed by every subsequent task; `index.html` shell extended across Tasks 3–5

- [ ] **Step 1: Create directories**

```bash
mkdir -p "/Users/aasmac/Desktop/Akansha/UK Tax Website/css"
mkdir -p "/Users/aasmac/Desktop/Akansha/UK Tax Website/js"
```

Expected: no output, directories created.

- [ ] **Step 2: Create `css/styles.css`**

```css
/* =========================================================
   FONTS + DESIGN TOKENS
   ========================================================= */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,600;1,9..144,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg:           #F4F3ED;
  --surface:      #FFFFFF;
  --primary:      #1B4332;
  --primary-dark: #0F2D21;
  --accent:       #9C6B2E;
  --text:         #16150F;
  --text-muted:   #6E6A5E;
  --border:       #DDD9CF;

  --font-heading: 'Fraunces', Georgia, serif;
  --font-body:    'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;

  --sp-1: 0.5rem;
  --sp-2: 1rem;
  --sp-3: 1.5rem;
  --sp-4: 2rem;
  --sp-6: 3rem;
  --sp-8: 4rem;
  --sp-12: 6rem;

  --max-w: 1100px;
  --nav-h: 64px;

  --r-sm: 6px;
  --r-md: 12px;
  --r-lg: 20px;
}

/* =========================================================
   RESET
   ========================================================= */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 16px; scroll-behavior: smooth; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }

/* =========================================================
   TYPOGRAPHY
   ========================================================= */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.1;
  font-variant-numeric: oldstyle-nums;
}
/* Fraunces optical size: larger text uses the display axis automatically */
h1 {
  font-size: clamp(2.6rem, 6vw, 4rem);
  font-weight: 700;
  font-style: italic;   /* Fraunces italic at display size is the signature look */
  letter-spacing: -0.01em;
}
h2 {
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 600;
  font-style: normal;
  letter-spacing: -0.01em;
}
h3 {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 600;
  font-style: normal;
}
p  { max-width: 66ch; }

/* Mono for numbers/data — only apply where signalled by class */
.mono {
  font-family: var(--font-mono);
  font-size: 0.9em;
  letter-spacing: 0.01em;
}

/* =========================================================
   LAYOUT
   ========================================================= */
.container {
  width: 100%;
  max-width: var(--max-w);
  margin-inline: auto;
  padding-inline: var(--sp-4);
}

.section      { padding-block: var(--sp-12); }
.section--tight { padding-block: var(--sp-8); }

/* =========================================================
   BUTTONS
   ========================================================= */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  padding: 0.75rem 1.75rem;
  border-radius: var(--r-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
  min-height: 44px;
}

.btn--primary {
  background: var(--primary);
  color: #fff;
}
.btn--primary:hover,
.btn--primary:focus-visible {
  background: var(--primary-dark);
}

.btn--outline {
  background: transparent;
  color: var(--primary);
  border-color: var(--primary);
}
.btn--outline:hover,
.btn--outline:focus-visible {
  background: var(--primary);
  color: #fff;
}

:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 3px;
}

/* =========================================================
   SHARED SECTION LABELS
   ========================================================= */
.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--sp-2);
}

.section__heading { margin-bottom: var(--sp-6); }

/* =========================================================
   SHARED HOME CTA BLOCK
   ========================================================= */
.home-cta {
  text-align: center;
  padding-block: var(--sp-12);
  border-top: 1px solid var(--border);
}
.home-cta h2 { margin-bottom: var(--sp-2); }
.home-cta p {
  color: var(--text-muted);
  margin: 0 auto var(--sp-4);
  font-size: 1.05rem;
}
```

- [ ] **Step 3: Create `js/main.js` stub**

```js
// Hamburger menu toggle added in Task 2
// Contact form handler added in Task 8
```

- [ ] **Step 4: Create `index.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Remote bookkeeping, accounting and controls support for UK and Irish firms — Big 4 training, delivered from India. Akansha Mathur CA.">
  <title>Akansha Mathur, CA — Remote Accounting Support</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- SKIP LINK: Task 9 -->
  <!-- NAV: Task 2 -->
  <!-- MAIN: Tasks 3–5 -->

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 5: Verify file structure**

```bash
find "/Users/aasmac/Desktop/Akansha/UK Tax Website" -not -path "*/docs/*" -type f | sort
```

Expected:
```
.../UK Tax Website/css/styles.css
.../UK Tax Website/index.html
.../UK Tax Website/js/main.js
.../UK Tax Website/website-build-prompt.md
```

- [ ] **Step 6: Open in browser to confirm no errors**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: warm off-white blank page, no console errors, Google Fonts request fires.

- [ ] **Step 7: Init git and commit**

```bash
cd "/Users/aasmac/Desktop/Akansha/UK Tax Website" && git init && git add css/styles.css js/main.js index.html && git commit -m "scaffold: design tokens, reset, base layout shell"
```

---

### Task 2: Navigation (all 4 pages)

**Files:**
- Modify: `index.html` — add nav HTML
- Create: `services.html` — shell with nav
- Create: `contact.html` — shell with nav
- Create: `controls-sox.html` — shell with nav
- Modify: `css/styles.css` — nav styles appended
- Modify: `js/main.js` — hamburger toggle

**Interfaces:**
- Consumes: `--bg`, `--border`, `--primary`, `--text-muted`, `--nav-h` from Task 1
- Produces: `.nav`, `.nav__logo`, `.nav__links`, `.nav__burger`, `.is-open` CSS classes; `initNav()` function in `js/main.js`; nav HTML block reused verbatim across all four files

- [ ] **Step 1: Append nav styles to `css/styles.css`**

```css
/* =========================================================
   NAVIGATION
   ========================================================= */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-h);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
}

.nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav__logo {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}
.nav__logo span { color: var(--primary); }

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  list-style: none;
}

.nav__links a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.15s;
}
.nav__links a:hover,
.nav__links a[aria-current="page"] { color: var(--primary); }

.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--sp-1);
  min-height: 44px;
  min-width: 44px;
  justify-content: center;
  align-items: center;
}
.nav__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}

@media (max-width: 640px) {
  .nav__links {
    position: fixed;
    inset: var(--nav-h) 0 0 0;
    background: var(--bg);
    flex-direction: column;
    justify-content: flex-start;
    padding-top: var(--sp-6);
    gap: var(--sp-4);
    transform: translateX(100%);
    transition: transform 0.25s ease;
  }
  .nav__links.is-open { transform: translateX(0); }
  .nav__burger { display: flex; }
  .nav__links a { font-size: 1.25rem; }
}
```

- [ ] **Step 2: Replace `js/main.js` with hamburger toggle**

```js
function initNav() {
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    });
  });
}

document.addEventListener('DOMContentLoaded', initNav);

// Contact form handler: Task 8
```

- [ ] **Step 3: Replace the nav comment in `index.html` with nav HTML**

Replace `<!-- NAV: Task 2 -->` with:

```html
  <nav class="nav" role="navigation" aria-label="Main">
    <div class="container">
      <a class="nav__logo" href="index.html">Akansha Mathur, <span>CA</span></a>
      <button class="nav__burger" aria-expanded="false" aria-label="Open menu" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" id="nav-links" role="list">
        <li><a href="index.html" aria-current="page">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </nav>
```

- [ ] **Step 4: Create `services.html` shell with nav**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Bookkeeping, VAT, year-end accounts, management reporting and controls support — prep returned for your review. Akansha Mathur CA.">
  <title>Services — Akansha Mathur, CA</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- SKIP LINK: Task 9 -->

  <nav class="nav" role="navigation" aria-label="Main">
    <div class="container">
      <a class="nav__logo" href="index.html">Akansha Mathur, <span>CA</span></a>
      <button class="nav__burger" aria-expanded="false" aria-label="Open menu" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" id="nav-links" role="list">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html" aria-current="page">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- MAIN: Task 6 -->

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 5: Create `contact.html` shell with nav**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Get in touch with Akansha Mathur CA for remote bookkeeping and accounting support.">
  <title>Contact — Akansha Mathur, CA</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- SKIP LINK: Task 9 -->

  <nav class="nav" role="navigation" aria-label="Main">
    <div class="container">
      <a class="nav__logo" href="index.html">Akansha Mathur, <span>CA</span></a>
      <button class="nav__burger" aria-expanded="false" aria-label="Open menu" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" id="nav-links" role="list">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html" aria-current="page">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- MAIN: Task 8 -->

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 6: Create `controls-sox.html` shell with nav**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Internal controls and SOX/ICFR support — US SOX and UK Provision 29 readiness. Akansha Mathur CA.">
  <title>Controls &amp; SOX Support — Akansha Mathur, CA</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- SKIP LINK: Task 9 -->

  <nav class="nav" role="navigation" aria-label="Main">
    <div class="container">
      <a class="nav__logo" href="index.html">Akansha Mathur, <span>CA</span></a>
      <button class="nav__burger" aria-expanded="false" aria-label="Open menu" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" id="nav-links" role="list">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- MAIN: Task 7 -->

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 7: Open `index.html` and verify nav**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: sticky nav, logo left, links right. Resize to < 640px — hamburger appears, links hide. Click hamburger — menu slides in from right. Click a link — menu closes.

- [ ] **Step 8: Verify active state on services.html**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/services.html"
```

Expected: "Services" nav link is deep green (var(--primary)).

- [ ] **Step 9: Commit**

```bash
git add css/styles.css js/main.js index.html services.html contact.html controls-sox.html && git commit -m "feat: navigation — sticky nav, hamburger, active states"
```

---

### Task 3: Home — Hero + Profile

**Files:**
- Modify: `index.html` — add hero and profile sections inside `<main>`
- Modify: `css/styles.css` — hero and profile styles appended

**Interfaces:**
- Consumes: `.container`, `.section`, `.section--tight`, `.btn--primary` from Task 1; nav from Task 2
- Produces: `.hero`, `.hero__pill`, `.hero__name`, `.hero__qual`, `.hero__value`, `.profile` CSS classes; `<main id="main-content">` opened (closed in Task 5)

- [ ] **Step 1: Append hero + profile styles to `css/styles.css`**

```css
/* =========================================================
   HERO
   ========================================================= */
.hero {
  padding-block: var(--sp-12) var(--sp-8);
  border-bottom: 1px solid var(--border);
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-4);
}

/* Availability pill: mono, outlined, no rounded pill shape */
.hero__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.7rem;
  border-radius: 3px;
}
.hero__pill::before {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary);
}

/* Fraunces italic at display size — the defining typographic move */
.hero__name {
  font-style: italic;
  margin-bottom: var(--sp-2);
  font-weight: 700;
}

/* Qualification line in mono — signals precision, not marketing */
.hero__qual {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.02em;
  margin-bottom: var(--sp-6);
  line-height: 1.6;
}

.hero__value {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: var(--text);
  font-weight: 400;
  max-width: 54ch;
  margin-bottom: var(--sp-6);
  line-height: 1.65;
}

/* =========================================================
   PROFILE
   ========================================================= */
.profile {
  border-top: 2px solid var(--primary);
  padding-top: var(--sp-4);
}

.profile p {
  font-size: 1.05rem;
  line-height: 1.8;
}
```

- [ ] **Step 2: Replace `<!-- MAIN: Tasks 3–5 -->` comment in `index.html`**

```html
  <main id="main-content">

    <section class="hero section">
      <div class="container">
        <div class="hero__eyebrow">
          <span class="hero__pill">Available &middot; replies within a day</span>
        </div>
        <h1 class="hero__name">Akansha Mathur</h1>
        <p class="hero__qual">Chartered Accountant &middot; ICAI (India) &amp; ACA Chartered Accountants Ireland &middot; M.Sc. Trinity College Dublin</p>
        <p class="hero__value">Remote bookkeeping, accounting and controls support for UK and Irish firms — Big 4 training, delivered from India.</p>
        <a href="contact.html" class="btn btn--primary">Get in touch</a>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="profile">
          <p>I'm a dual-qualified Chartered Accountant — ICAI in India and ACA with Chartered Accountants Ireland — with six years across Big 4 firms (PwC, Deloitte) and a global bank. Much of that time was spent in internal audit and controls assurance, where accuracy and clean documentation aren't optional. I now bring that same rigour to remote bookkeeping, accounting and controls support for UK and Irish practices and small businesses, so your books and your controls are handled by a qualified professional, not outsourced to guesswork.</p>
        </div>
      </div>
    </section>

    <!-- SERVICE CARDS: Task 4 -->
    <!-- HOW IT WORKS: Task 4 -->
    <!-- TRUST STRIP: Task 5 -->
    <!-- TIMEZONE: Task 5 -->
    <!-- HOME CTA: Task 5 -->

  </main>
```

- [ ] **Step 3: Open in browser and verify**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: small mono-font outlined pill (not a pill-shaped bubble), "Akansha Mathur" in large italic Fraunces serif, qualification line in small monospace below, value prop in body sans, deep green "Get in touch" button. Profile block below separated by a top border line (not a white card).

- [ ] **Step 4: Verify content**

```bash
grep -c "Big 4 training" "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: `1`

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css && git commit -m "feat: home hero + profile section"
```

---

### Task 4: Home — Service Cards + How It Works

**Files:**
- Modify: `index.html` — service cards and how-it-works sections
- Modify: `css/styles.css` — card and steps styles appended

**Interfaces:**
- Consumes: `.container`, `.section`, `.section-label` from Task 1
- Produces: `.services-grid`, `.service-card`, `.service-card--controls`, `.how-it-works`, `.steps`, `.step`, `.step__number` CSS classes

- [ ] **Step 1: Append service card + steps styles to `css/styles.css`**

```css
/* =========================================================
   SERVICE CARDS (Home)
   ========================================================= */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--sp-3);
}

.service-card {
  display: block;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: var(--sp-4);
  transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
}
.service-card:hover,
.service-card:focus-visible {
  border-color: var(--primary);
  box-shadow: 0 4px 16px rgba(30, 92, 82, 0.1);
  transform: translateY(-2px);
}

.service-card__number {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--primary);
  margin-bottom: var(--sp-2);
}

.service-card h3 { margin-bottom: var(--sp-1); }

.service-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.service-card--controls {
  border-color: #EDD9C8;
  background: #FDF8F5;
}
.service-card--controls:hover,
.service-card--controls:focus-visible {
  border-color: var(--primary);
}

/* =========================================================
   HOW IT WORKS
   ========================================================= */
.how-it-works {
  background: var(--surface);
  border-radius: var(--r-lg);
  padding: var(--sp-8);
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--sp-6);
  margin-top: var(--sp-6);
}

.step__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: var(--sp-2);
}

.step h3 { margin-bottom: var(--sp-1); font-size: 1.05rem; }
.step p  { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }
```

- [ ] **Step 2: Replace `<!-- SERVICE CARDS: Task 4 -->` in `index.html`**

```html
    <section class="section">
      <div class="container">
        <p class="section-label">What I do</p>
        <h2 class="section__heading">Five ways I can support your practice</h2>
        <div class="services-grid">
          <a href="services.html#bookkeeping" class="service-card">
            <p class="service-card__number">01</p>
            <h3>Bookkeeping</h3>
            <p>Bank reconciliations, categorisation, ledger maintenance and clean month-end records — ready for your review.</p>
          </a>
          <a href="services.html#vat" class="service-card">
            <p class="service-card__number">02</p>
            <h3>VAT Return Preparation</h3>
            <p>MTD-compatible VAT returns prepared and returned for your review and submission.</p>
          </a>
          <a href="services.html#year-end" class="service-card">
            <p class="service-card__number">03</p>
            <h3>Year-End Accounts</h3>
            <p>From trial balance to a clean set of accounts for sole traders and small companies, ready for your finalisation.</p>
          </a>
          <a href="services.html#management" class="service-card">
            <p class="service-card__number">04</p>
            <h3>Management Reporting &amp; Payroll Support</h3>
            <p>Monthly management accounts, PAYE, RTI submissions and payslips — reliable and on time.</p>
          </a>
          <a href="controls-sox.html" class="service-card service-card--controls">
            <p class="service-card__number">05</p>
            <h3>Controls &amp; SOX Support</h3>
            <p>SOX 404, ICFR and UK Provision 29 readiness — backed by six years at PwC and Deloitte. See full detail.</p>
          </a>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Replace `<!-- HOW IT WORKS: Task 4 -->` in `index.html`**

```html
    <section class="section">
      <div class="container">
        <div class="how-it-works">
          <p class="section-label">How it works</p>
          <h2>Simple process, clean handoffs</h2>
          <div class="steps">
            <div class="step">
              <div class="step__number">1</div>
              <h3>You share the documents</h3>
              <p>Via Dext, a shared folder, or your existing client portal — whichever fits your workflow.</p>
            </div>
            <div class="step">
              <div class="step__number">2</div>
              <h3>I prepare the work</h3>
              <p>Returned within 48–72 hours, reconciled and ready for your review. Nothing to chase.</p>
            </div>
            <div class="step">
              <div class="step__number">3</div>
              <h3>You review and submit</h3>
              <p>Through your Agent Services Account. You keep the client relationship and the filing — always.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 4: Verify in browser**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: 5 service cards in responsive grid. Card 5 has warm clay tinted border. Three numbered steps inside a white rounded card. Hover on cards — they lift 2px. Card 5 click goes to controls-sox.html.

- [ ] **Step 5: Verify card 5 destination**

```bash
grep 'controls-sox.html' "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: one line with `href="controls-sox.html"`.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css && git commit -m "feat: home service cards + how-it-works"
```

---

### Task 5: Home — Trust Strip + Timezone Visual + Closing CTA

**Files:**
- Modify: `index.html` — trust strip, timezone, CTA, close `</main>`
- Modify: `css/styles.css` — trust strip, timezone, footer styles

**Interfaces:**
- Consumes: `.container`, `.section`, `.section--tight`, `.section-label`, `.btn--primary`, `.home-cta` from Task 1
- Produces: `.trust-strip`, `.trust-item`, `.timezone-visual`, `.tz-block`, `.tz-bridge`, `.timezone-caption` CSS classes

- [ ] **Step 1: Append trust strip + timezone styles to `css/styles.css`**

```css
/* =========================================================
   TRUST STRIP — stat callout style, not icon chips
   ========================================================= */
.trust-strip {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding-block: var(--sp-8);
}

.trust-strip__inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--sp-6) var(--sp-4);
}

.trust-item__stat {
  font-family: var(--font-mono);
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 0.35rem;
  letter-spacing: -0.01em;
}

.trust-item__label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.trust-item__value {
  font-size: 0.85rem;
  color: var(--text);
  line-height: 1.5;
}

/* =========================================================
   TIMEZONE VISUAL — typographic, no decorative chrome
   ========================================================= */
.timezone-section { padding-block: var(--sp-8); }

.timezone-visual {
  display: flex;
  align-items: baseline;
  gap: var(--sp-3);
  flex-wrap: wrap;
}

.tz-block__time {
  font-family: var(--font-mono);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 500;
  color: var(--primary);
  letter-spacing: -0.02em;
  line-height: 1;
}

.tz-block__loc {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 0.2rem;
}

.tz-separator {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  color: var(--border);
  align-self: center;
}

.timezone-caption {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: var(--sp-3);
}
```

- [ ] **Step 2: Replace the three placeholder comments in `index.html` with trust strip, timezone, and CTA**

Replace `<!-- TRUST STRIP: Task 5 -->`:

```html
    <section class="trust-strip">
      <div class="container">
        <div class="trust-strip__inner">
          <div class="trust-item">
            <p class="trust-item__stat">2×</p>
            <p class="trust-item__label">Qualified</p>
            <p class="trust-item__value">ICAI (India) &amp; ACA Chartered Accountants Ireland</p>
          </div>
          <div class="trust-item">
            <p class="trust-item__stat">6 yrs</p>
            <p class="trust-item__label">Experience</p>
            <p class="trust-item__value">PwC, Deloitte &amp; a global bank</p>
          </div>
          <div class="trust-item">
            <p class="trust-item__stat">B4</p>
            <p class="trust-item__label">Training</p>
            <p class="trust-item__value">Audit-grade accuracy on everyday books</p>
          </div>
          <div class="trust-item">
            <p class="trust-item__stat">DPA</p>
            <p class="trust-item__label">Data handling</p>
            <p class="trust-item__value">GDPR-aware &middot; signed on request</p>
          </div>
          <div class="trust-item">
            <p class="trust-item__label">Software</p>
            <p class="trust-item__value">Xero &middot; QuickBooks Online &middot; Dext &middot; Sage &middot; Power BI &middot; Advanced Excel &middot; DocuSign</p>
          </div>
        </div>
      </div>
    </section>
```

Replace `<!-- TIMEZONE: Task 5 -->`:

```html
    <section class="timezone-section">
      <div class="container">
        <p class="section-label">Working across time zones</p>
        <div
          class="timezone-visual"
          aria-label="Timezone overlap: your 9am London is my 2:30pm India"
        >
          <div class="tz-block">
            <p class="tz-block__time">09:00</p>
            <p class="tz-block__loc">London / Dublin</p>
          </div>
          <span class="tz-separator">/</span>
          <div class="tz-block">
            <p class="tz-block__time">14:30</p>
            <p class="tz-block__loc">India (IST)</p>
          </div>
        </div>
        <p class="timezone-caption">Your morning briefing reaches me mid-afternoon. I can turn work around the same day.</p>
      </div>
    </section>
```

Replace `<!-- HOME CTA: Task 5 -->`:

```html
    <section class="home-cta section">
      <div class="container">
        <h2>Ready to take bookkeeping off your plate?</h2>
        <p>Audit-grade accuracy, Big 4 training — at 40–60% of local cost.</p>
        <a href="contact.html" class="btn btn--primary">Get in touch</a>
      </div>
    </section>
```

- [ ] **Step 3: Verify in browser**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: five trust items in a horizontal strip (wraps on narrow screens). Timezone visual showing "9:00 · overlap · 14:30" with location labels. Caption below. Closing CTA centered at bottom.

- [ ] **Step 4: Verify trust item count**

```bash
grep -c 'class="trust-item"' "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Expected: `5`

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css && git commit -m "feat: home trust strip, timezone visual, closing CTA"
```

---

### Task 6: Services Page

**Files:**
- Modify: `services.html` — full services content
- Modify: `css/styles.css` — services page styles appended

**Interfaces:**
- Consumes: `.container`, `.section`, `.section--tight`, `.section-label`, `.btn--outline`, `.btn--primary`, `.home-cta` from Task 1
- Produces: `.services-page-hero`, `.service-entry`, `.service-entry--controls` CSS classes; anchor IDs `#bookkeeping`, `#vat`, `#year-end`, `#management`, `#controls`

- [ ] **Step 1: Append services page styles to `css/styles.css`**

```css
/* =========================================================
   SERVICES PAGE
   ========================================================= */
.services-page-hero {
  padding-block: var(--sp-8);
  border-bottom: 1px solid var(--border);
}

.services-page-hero p {
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-top: var(--sp-2);
}

.service-entry {
  padding-block: var(--sp-8);
  border-bottom: 1px solid var(--border);
}

.service-entry:last-of-type { border-bottom: none; }

.service-entry__number {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--primary);
  margin-bottom: var(--sp-1);
}

.service-entry h2   { margin-bottom: var(--sp-3); }

.service-entry p {
  color: var(--text);
  margin-bottom: var(--sp-3);
  line-height: 1.75;
  font-size: 1rem;
}

.service-entry--controls {
  background: #FDF8F5;
  border-radius: var(--r-lg);
  padding: var(--sp-8);
  border: 1px solid #EDD9C8;
  margin-block: var(--sp-4);
}
```

- [ ] **Step 2: Replace `<!-- MAIN: Task 6 -->` in `services.html`**

```html
  <main id="main-content">

    <div class="services-page-hero section--tight">
      <div class="container">
        <p class="section-label">Services</p>
        <h1>What I can do for your practice</h1>
        <p>All work is prepared and returned to you for review — you keep the client relationship and the filing.</p>
      </div>
    </div>

    <div class="container">

      <article class="service-entry" id="bookkeeping">
        <p class="service-entry__number">01</p>
        <h2>Bookkeeping</h2>
        <p>Day-to-day and monthly bookkeeping kept accurate and up to date. Bank reconciliations, categorisation, ledger maintenance, and clean month-end records ready for review.</p>
        <p>Suited to firms who want reliable books maintained without adding headcount, and to small businesses who'd rather a qualified CA kept things straight.</p>
        <a href="contact.html" class="btn btn--outline">Request a quote</a>
      </article>

      <article class="service-entry" id="vat">
        <p class="service-entry__number">02</p>
        <h2>VAT Return Preparation</h2>
        <p>Preparation of VAT returns using MTD-compatible software, ready for your review and submission. Built to fit the UK's Making Tax Digital requirements.</p>
        <p>Suited to practices that want the prep work handled so their team only has to review and file.</p>
        <a href="contact.html" class="btn btn--outline">Request a quote</a>
      </article>

      <article class="service-entry" id="year-end">
        <p class="service-entry__number">03</p>
        <h2>Year-End Accounts Preparation</h2>
        <p>Preparation of year-end accounts for sole traders and small companies — from trial balance to a clean set of accounts ready for your review and finalisation.</p>
        <p>Suited to practices managing seasonal year-end load.</p>
        <a href="contact.html" class="btn btn--outline">Request a quote</a>
      </article>

      <article class="service-entry" id="management">
        <p class="service-entry__number">04</p>
        <h2>Management Reporting &amp; Payroll Support</h2>
        <p>Monthly management accounts, and payroll support including PAYE, RTI submissions and payslips.</p>
        <p>Suited to firms and businesses that want regular, reliable reporting they can rely on.</p>
        <a href="contact.html" class="btn btn--outline">Request a quote</a>
      </article>

      <article class="service-entry service-entry--controls" id="controls">
        <p class="service-entry__number">05</p>
        <h2>Controls &amp; SOX Support</h2>
        <p>Internal controls and SOX/ICFR support for businesses with US-listed parents or group reporting obligations, and for UK/Ireland organisations preparing for the new board-level internal-controls declaration.</p>
        <p>Backed by six years of hands-on SOX, ICFR, SOC and ISAE controls work at PwC and Deloitte across insurance, banking and industrial clients.</p>
        <div style="display:flex; gap: var(--sp-2); flex-wrap: wrap; margin-top: var(--sp-2);">
          <a href="controls-sox.html" class="btn btn--primary">See full detail</a>
          <a href="contact.html" class="btn btn--outline">Request a quote</a>
        </div>
      </article>

    </div>

    <section class="home-cta section">
      <div class="container">
        <h2>Not sure which service fits?</h2>
        <p>Tell me what you need and I'll let you know how I can help.</p>
        <a href="contact.html" class="btn btn--primary">Request a quote</a>
      </div>
    </section>

  </main>
```

- [ ] **Step 3: Verify anchor links from Home**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Click "Bookkeeping" card. Expected: browser scrolls to `services.html#bookkeeping`. Click "Controls & SOX" card. Expected: navigates to `controls-sox.html`.

- [ ] **Step 4: Verify five anchor IDs exist**

```bash
grep 'id="bookkeeping"\|id="vat"\|id="year-end"\|id="management"\|id="controls"' "/Users/aasmac/Desktop/Akansha/UK Tax Website/services.html"
```

Expected: 5 matching lines.

- [ ] **Step 5: Verify no prices on page**

```bash
grep -i '£\|price\|per month\|per hour\|rate' "/Users/aasmac/Desktop/Akansha/UK Tax Website/services.html"
```

Expected: no output (zero matches).

- [ ] **Step 6: Commit**

```bash
git add services.html css/styles.css && git commit -m "feat: services page — all five services, quote CTAs"
```

---

### Task 7: Controls & SOX Sub-Page

**Files:**
- Modify: `controls-sox.html` — full content
- Modify: `css/styles.css` — SOX page styles appended

**Interfaces:**
- Consumes: `.container`, `.section`, `.section--tight`, `.section-label`, `.btn--primary` from Task 1
- Produces: `.sox-hero`, `.sox-breadcrumb`, `.sox-intro`, `.sox-regimes`, `.sox-regime`, `.sox-regime--b`, `.sox-regime__tag`, `.sox-honesty-note` CSS classes

- [ ] **Step 1: Append Controls & SOX styles to `css/styles.css`**

```css
/* =========================================================
   CONTROLS & SOX PAGE
   ========================================================= */
.sox-hero {
  padding-block: var(--sp-8);
  border-bottom: 1px solid var(--border);
}

.sox-hero p:not(.section-label) {
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-top: var(--sp-2);
}

.sox-breadcrumb {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: var(--sp-3);
}

.sox-breadcrumb a { color: var(--primary); }

.sox-intro {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-6);
  margin-block: var(--sp-6);
}

.sox-intro p {
  font-size: 1.05rem;
  line-height: 1.75;
}

.sox-regimes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
  margin-block: var(--sp-6);
}

@media (max-width: 720px) {
  .sox-regimes { grid-template-columns: 1fr; }
}

.sox-regime {
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: var(--sp-4) var(--sp-4) var(--sp-6);
  background: var(--surface);
}

.sox-regime--b {
  border-color: #EDD9C8;
  background: #FDF8F5;
}

.sox-regime__tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--primary);
  color: #fff;
  border-radius: var(--r-sm);
  padding: 0.2rem 0.55rem;
  margin-bottom: var(--sp-2);
}

.sox-regime--b .sox-regime__tag { background: var(--accent); }

.sox-regime h2 {
  font-size: 1.3rem;
  margin-bottom: var(--sp-3);
}

.sox-regime p {
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: var(--sp-2);
}

.sox-regime ul {
  margin: var(--sp-2) 0 0 var(--sp-3);
}

.sox-regime li {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.sox-honesty-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  border-left: 3px solid var(--border);
  padding-left: var(--sp-2);
  margin-top: var(--sp-3);
  line-height: 1.6;
}
```

- [ ] **Step 2: Replace `<!-- MAIN: Task 7 -->` in `controls-sox.html`**

```html
  <main id="main-content">

    <div class="sox-hero section--tight">
      <div class="container">
        <p class="sox-breadcrumb"><a href="services.html">Services</a> &rsaquo; Controls &amp; SOX Support</p>
        <p class="section-label">Service 05</p>
        <h1>Controls &amp; SOX Support</h1>
        <p>Internal controls and SOX/ICFR support — for US-listed obligations and for UK/Ireland Provision 29 readiness.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">

        <div class="sox-intro">
          <p>Controls work is where my background runs deepest. Six years across PwC and Deloitte on SOX, ICFR, SOC and ISAE engagements — designing risk and control matrices, running walkthroughs and testing, identifying deficiencies and supporting remediation, and coordinating with external auditors. Whether your client answers to a US-listed parent or is preparing for the UK's new internal-controls declaration, the underlying discipline — COSO-based, evidence-driven controls testing — is the same, and it's what I do.</p>
        </div>

        <div class="sox-regimes">

          <div class="sox-regime">
            <span class="sox-regime__tag">US SOX / ICFR</span>
            <h2>SOX 404 &amp; ICFR Support</h2>
            <p>For businesses with US-listed parents, group reporting obligations, or operations in scope of the Sarbanes-Oxley Act.</p>
            <ul>
              <li>Risk and control matrix (RCM) design — entity-level, IT general, and business-process controls</li>
              <li>Design and operating-effectiveness testing through structured walkthroughs and evidence-based sampling</li>
              <li>Deficiency identification, root cause analysis and remediation support</li>
              <li>Workpaper preparation and review</li>
              <li>Coordination with external auditors on scope, evidence and timing</li>
              <li>SOC and ISAE 3402 third-party assurance readiness</li>
            </ul>
            <p style="margin-top: var(--sp-3);">Built on direct PwC and Deloitte experience across global insurance, banking and industrial clients.</p>
          </div>

          <div class="sox-regime sox-regime--b">
            <span class="sox-regime__tag">UK &amp; Ireland</span>
            <h2>Provision 29 &amp; Internal Controls Readiness</h2>
            <p>For UK-listed organisations preparing for Provision 29 of the revised UK Corporate Governance Code 2024 — the requirement for boards to declare annually on the effectiveness of their risk management and internal control framework.</p>
            <p>Applies to accounting periods beginning on or after 1 January 2026. Covers financial, operational, reporting and compliance controls.</p>
            <ul>
              <li>Mapping and documenting material controls</li>
              <li>Designing the evidence and monitoring needed to support a board declaration</li>
              <li>Control testing and gap identification</li>
              <li>Remediation planning</li>
            </ul>
            <p class="sox-honesty-note">Provision 29 is principles-based and comply-or-explain — broader than US SOX, and not externally audited in the same way. This support is framed as readiness and uplift, not an audit opinion. The COSO framework underpins both regimes, so the controls discipline carries directly across.</p>
          </div>

        </div>

        <a href="contact.html" class="btn btn--primary">Request a quote</a>

      </div>
    </section>

  </main>
```

- [ ] **Step 3: Verify in browser**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/controls-sox.html"
```

Expected: breadcrumb (Services > Controls & SOX Support), intro card, two-column regime cards (teal tag left, clay tag right), bulleted lists, honesty note in right card, CTA button. On mobile (< 720px): cards stack.

- [ ] **Step 4: Verify honesty guardrail**

```bash
grep -c "principles-based" "/Users/aasmac/Desktop/Akansha/UK Tax Website/controls-sox.html"
```

Expected: `1`

- [ ] **Step 5: Verify no audit opinion language**

```bash
grep -i "audit opinion" "/Users/aasmac/Desktop/Akansha/UK Tax Website/controls-sox.html"
```

Expected: one line only — the disclaimer that frames work as NOT an audit opinion.

- [ ] **Step 6: Commit**

```bash
git add controls-sox.html css/styles.css && git commit -m "feat: controls & SOX sub-page — US SOX and Provision 29"
```

---

### Task 8: Contact Page

**Files:**
- Modify: `contact.html` — full content
- Modify: `js/main.js` — add mailto form handler
- Modify: `css/styles.css` — contact page styles appended

**Interfaces:**
- Consumes: `.container`, `.section`, `.section--tight`, `.section-label`, `.btn--primary` from Task 1
- Produces: `.contact-layout`, `.contact-method`, `.contact-method__icon`, `.contact-form`, `.form-group` CSS classes; `handleContactForm()` function in `js/main.js`

- [ ] **Step 1: Append contact page styles to `css/styles.css`**

```css
/* =========================================================
   CONTACT PAGE
   ========================================================= */
.contact-hero {
  padding-block: var(--sp-8);
  border-bottom: 1px solid var(--border);
}

.contact-hero p {
  color: var(--text-muted);
  margin-top: var(--sp-2);
  font-size: 1.05rem;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-8);
  padding-block: var(--sp-8);
}

@media (max-width: 720px) {
  .contact-layout { grid-template-columns: 1fr; }
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: var(--sp-3) var(--sp-4);
  transition: border-color 0.18s, box-shadow 0.18s;
}
.contact-method:hover,
.contact-method:focus-visible {
  border-color: var(--primary);
  box-shadow: 0 2px 12px rgba(30, 92, 82, 0.08);
}

.contact-method__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--r-sm);
  background: #E6F2EF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-method__icon svg {
  width: 20px;
  height: 20px;
  stroke: var(--primary);
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.contact-method__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact-method__value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  margin-top: 0.15rem;
}

/* Contact form */
.contact-form {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-6);
}

.contact-form h2 {
  font-size: 1.3rem;
  margin-bottom: var(--sp-4);
}

.form-group { margin-bottom: var(--sp-3); }

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1.5px solid var(--border);
  border-radius: var(--r-sm);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text);
  background: var(--bg);
  transition: border-color 0.15s;
  min-height: 44px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-note {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: var(--sp-2);
  line-height: 1.5;
}
```

- [ ] **Step 2: Add form handler to `js/main.js`**

Append after `initNav`:

```js
function handleContactForm(e) {
  e.preventDefault();
  var name    = document.getElementById('name').value.trim();
  var email   = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  var to      = '[email]';
  var subject = encodeURIComponent('Enquiry from ' + name);
  var body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);

  window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
}
```

- [ ] **Step 3: Replace `<!-- MAIN: Task 8 -->` in `contact.html`**

```html
  <main id="main-content">

    <div class="contact-hero section--tight">
      <div class="container">
        <p class="section-label">Contact</p>
        <h1>Get in touch</h1>
        <p>Usually replies within a day. WhatsApp and email are the fastest routes.</p>
      </div>
    </div>

    <section class="section--tight">
      <div class="container">
        <div class="contact-layout">

          <div class="contact-methods">

            <a href="mailto:[email]" class="contact-method">
              <div class="contact-method__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </div>
              <div>
                <p class="contact-method__label">Email</p>
                <p class="contact-method__value">[email]</p>
              </div>
            </a>

            <a href="tel:[phone]" class="contact-method">
              <div class="contact-method__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91A16 16 0 0 0 15 15.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
                </svg>
              </div>
              <div>
                <p class="contact-method__label">Phone / WhatsApp</p>
                <p class="contact-method__value">[phone]</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/akanshamathur" target="_blank" rel="noopener noreferrer" class="contact-method">
              <div class="contact-method__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div>
                <p class="contact-method__label">LinkedIn</p>
                <p class="contact-method__value">linkedin.com/in/akanshamathur</p>
              </div>
            </a>

          </div>

          <div class="contact-form">
            <h2>Send a message</h2>
            <!--
              This form submits via mailto: — no backend needed.
              To switch to server-side submission later, add:
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
              and remove the onsubmit attribute and handleContactForm function.
            -->
            <form id="contact-form" onsubmit="handleContactForm(event)">
              <div class="form-group">
                <label for="contact-name">Name</label>
                <input type="text" id="contact-name" name="name" required autocomplete="name" placeholder="Your name">
              </div>
              <div class="form-group">
                <label for="contact-email">Email</label>
                <input type="email" id="contact-email" name="email" required autocomplete="email" placeholder="your@email.com">
              </div>
              <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea id="contact-message" name="message" required placeholder="Tell me what you need..."></textarea>
              </div>
              <button type="submit" class="btn btn--primary">Send message</button>
              <p class="form-note">Clicking Send opens your email client with your message pre-filled.</p>
            </form>
          </div>

        </div>
      </div>
    </section>

  </main>
```

- [ ] **Step 4: Verify in browser**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/contact.html"
```

Expected: three contact method cards with SVG icons (email, phone, LinkedIn), each a clickable link. Form with three fields. Fill name/email/message, click "Send message" — default mail client opens pre-filled. Formspree comment visible in page source.

- [ ] **Step 5: Verify form handler**

```bash
grep -c "handleContactForm" "/Users/aasmac/Desktop/Akansha/UK Tax Website/js/main.js"
```

Expected: `1`

- [ ] **Step 6: Commit**

```bash
git add contact.html js/main.js css/styles.css && git commit -m "feat: contact page — methods, mailto form, Formspree comment"
```

---

### Task 9: Skip Link + Footer + Responsive Polish

**Files:**
- Modify: all four HTML files — add skip link + footer
- Modify: `css/styles.css` — skip link, footer, responsive fix-ups appended

**Interfaces:**
- Consumes: all prior CSS classes and HTML
- Produces: `.skip-link`, `.footer` CSS classes; complete, shippable 4-page site

- [ ] **Step 1: Append skip link, footer, and responsive styles to `css/styles.css`**

```css
/* =========================================================
   SKIP LINK
   ========================================================= */
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  background: var(--primary);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: var(--r-sm);
  font-weight: 600;
  z-index: 200;
  transition: top 0.1s;
}
.skip-link:focus { top: 1rem; }

/* =========================================================
   FOOTER
   ========================================================= */
.footer {
  border-top: 1px solid var(--border);
  padding-block: var(--sp-6);
  margin-top: var(--sp-8);
}

.footer .container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
}

.footer__name {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.95rem;
}

.footer__links {
  display: flex;
  gap: var(--sp-3);
  list-style: none;
}

.footer__links a {
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: color 0.15s;
}
.footer__links a:hover { color: var(--primary); }

.footer__copy {
  font-size: 0.8rem;
  color: var(--text-muted);
  width: 100%;
}

/* =========================================================
   RESPONSIVE FIX-UPS
   ========================================================= */
@media (max-width: 480px) {
  .container { padding-inline: var(--sp-3); }
  .services-grid { grid-template-columns: 1fr; }
  .how-it-works  { padding: var(--sp-4); }
  .timezone-visual {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-2);
  }
  .tz-bridge {
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  .tz-bridge__line { flex: 1; width: auto; }
}
```

- [ ] **Step 2: Add skip link and footer to `index.html`**

Add as the very first child of `<body>` (before `<nav>`), replacing `<!-- SKIP LINK: Task 9 -->`:

```html
  <a class="skip-link" href="#main-content">Skip to content</a>
```

Add footer before `<script src="js/main.js">`:

```html
  <footer class="footer">
    <div class="container">
      <span class="footer__name">Akansha Mathur, CA</span>
      <ul class="footer__links">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <p class="footer__copy">&copy; 2025 Akansha Mathur. All rights reserved.</p>
    </div>
  </footer>
```

- [ ] **Step 3: Add skip link and footer to `services.html`**

Same skip link before `<nav>`. Same footer before `<script>`.

- [ ] **Step 4: Add skip link and footer to `contact.html`**

Same as Step 3.

- [ ] **Step 5: Add skip link and footer to `controls-sox.html`**

Same as Step 3.

- [ ] **Step 6: Verify skip link on Home**

```bash
open "/Users/aasmac/Desktop/Akansha/UK Tax Website/index.html"
```

Press Tab immediately after page loads. Expected: "Skip to content" link appears at top-left. Press Enter — page jumps to hero content.

- [ ] **Step 7: Verify keyboard nav through service cards**

Tab through the five service cards on Home. Expected: each card shows a visible teal outline. Press Enter on card 1 — navigates to `services.html#bookkeeping`.

- [ ] **Step 8: Verify mobile layout at 375px**

Open DevTools, set viewport to 375px. Check `index.html`. Expected:
- Nav shows hamburger only
- Service cards stack to 1 column
- Trust items wrap naturally
- Timezone visual columns become rows

- [ ] **Step 9: Verify prefers-reduced-motion**

In DevTools > Rendering > Emulate CSS media, enable `prefers-reduced-motion: reduce`. Expected: card hover transform is instant (no 0.18s animation), nav slide-in is instant.

- [ ] **Step 10: Final commit**

```bash
git add index.html services.html contact.html controls-sox.html css/styles.css && git commit -m "feat: skip link, footer, responsive polish, accessibility"
```

---

## Self-Review

### Spec coverage

| Requirement | Task |
|---|---|
| 3 pages + Controls sub-page | Tasks 2–8 |
| Persistent nav, hamburger, mobile | Task 2 |
| Hero: name, qual line, value prop, status pill | Task 3 |
| Profile/intro paragraph | Task 3 |
| 5 service cards on Home, clickable | Task 4 |
| Card 5 links to controls-sox.html | Task 4 |
| How it works — 3 steps | Task 4 |
| Trust strip (5 items) | Task 5 |
| Timezone-overlap visual | Task 5 |
| Closing CTA on Home | Task 5 |
| Services page — 5 services flat list | Task 6 |
| "Request a quote" CTAs, no prices | Tasks 6, 7, 8 |
| Services reachable from nav AND cards | Tasks 2, 6 |
| Controls sub-page — intro + two regime sections | Task 7 |
| Provision 29 principles-based qualifier | Task 7 |
| Contact — email, phone, LinkedIn prominently | Task 8 |
| mailto form + Formspree comment | Task 8 |
| Mobile responsive | Tasks 2, 5, 9 |
| Keyboard accessible, visible focus | Tasks 1, 9 |
| prefers-reduced-motion | Tasks 1, 9 |
| Bricolage Grotesque + Instrument Sans | Task 1 |
| Teal + clay + warm off-white palette | Task 1 |
| No prices anywhere | Tasks 6, 7 |
| No Xero badge | Not added |
| White-label framing throughout | Tasks 4, 6 |

### Placeholder scan

No TBD, TODO, "implement later", or "similar to Task N" found. All code blocks are complete.

### Consistency check

- `.btn`, `.btn--primary`, `.btn--outline` defined Task 1, used Tasks 3, 5, 6, 7, 8 — consistent.
- `.section`, `.section--tight`, `.container` defined Task 1, used throughout — consistent.
- `.section-label`, `.home-cta`, `.section__heading` defined Task 1 — reused in Tasks 6, 7, 8 — consistent.
- `#main-content` id on `<main>` opened Tasks 3, 6, 7, 8; referenced by skip link Task 9 — consistent.
- `handleContactForm` defined `js/main.js` Task 8; called via `onsubmit` in `contact.html` Task 8 — consistent.
- `.service-card--controls` defined Task 4; used in Task 4 — consistent.
- LinkedIn URL hardcoded to `linkedin.com/in/akanshamathur` per spec Part 2 placeholder note.
