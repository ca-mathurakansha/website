# Website Build Prompt — Akansha Mathur, Remote Accounting Practice

> Hand this whole file to an AI website builder (Claude, v0, Lovable, Bolt, Cursor, etc.).
> The first section is the build instruction. The second section is the real content to insert.
> Anything in [square brackets] is a placeholder to fill in before publishing.

---

## PART 1 — BUILD INSTRUCTION

Build a 3-page marketing website for a remote accounting practice.

**About the business:** A dual-qualified Chartered Accountant (ICAI India + ACA Chartered Accountants Ireland) with six years at Big 4 firms and a global bank, now offering remote back-office bookkeeping and accounting support to UK and Irish accounting practices and small businesses. The work is white-label friendly — UK/Irish firms can pass it to their clients under their own name. Positioning: a qualified, Big-4-trained CA who brings audit-grade accuracy to everyday books, at 40–60% of local cost.

**Audience:** UK and Irish accountants and small business owners who need to trust a stranger overseas with their financial data. The site's single job is to make a remote, India-based provider feel trustworthy, rigorous and effortless to work with.

**Visual direction:** Clean, modern, calm and friendly — not playful or startup-y, not corporate-stiff. Organised, human, reassuring. Avoid the overused AI-design clichés: no cream background with serif + terracotta accent, no dark mode with a single acid accent, no broadsheet hairline-rule layout. Use a soft daylight palette: warm off-white background, a deep considered teal-green as the primary trust colour, a muted warm clay as a secondary accent. Rounded corners but restrained. Generous whitespace. Headings in a characterful contemporary face like Bricolage Grotesque; body in a clean friendly sans like Instrument Sans — avoid plain Inter/Roboto. One signature element: a small, friendly timezone-overlap visual showing "your morning = my afternoon" so the offshore aspect reads as an advantage.

**Navigation:** Persistent top nav on every page — business name top-left, links to Home, Services, Contact. The Controls & SOX sub-page is reached by clicking the fifth service card (and may optionally also appear as a sub-item under Services in the nav). Mobile-responsive with a hamburger menu.

**Page 1 — Home.**
- Hero: name, qualification line, a one-line value proposition, and a small status pill ("Available · usually replies within a day"). Hero copy is in Part 2.
- A short profile/intro paragraph (in Part 2) establishing the Big 4 + dual-qualification credibility.
- A "What I do" section: the five services as clickable cards, shown as one flat list. Clicking any card navigates to the Services page.
- A "How it works" section, three steps: (1) You share documents via Dext, a shared folder, or your existing portal; (2) I prepare the work and return it within 48–72 hours, reconciled and ready for review; (3) You review and submit through your Agent Services Account — you keep the client relationship and the filing.
- A trust strip (content in Part 2): qualifications, experience, data-handling, software.
- Closing call-to-action button linking to Contact.

**Page 2 — Services.** Detailed description of each of the five services, shown as one flat list, each in its own clearly separated section. Content for each is in Part 2. The fifth service (Controls & SOX) links through to its own dedicated sub-page (Part 2, "Controls & SOX sub-page") which has two sub-sections: US SOX/ICFR and UK & Ireland Provision 29. Do NOT show prices anywhere — end each service section and the page with a "Request a quote" button linking to Contact. The Services page must be reachable two ways: from the clickable cards on Home, and from the Services link in the top nav.

**Page 3 — Contact.** Display three contact methods clearly and prominently: email, phone, LinkedIn. Also include a simple contact form (name, email, message) that opens the visitor's email client pre-filled via a mailto: link (no backend needed) — leave a code comment noting where a service like Formspree could be added later.

**Technical:** Static site — plain HTML/CSS + minimal JS, each page its own file. Fully responsive to mobile. Keyboard-accessible with visible focus states. Respect prefers-reduced-motion.

**Copy tone:** Warm, plain, specific, professional. No corporate jargon, no hype, no filler. Write from the client's side — what they get and how it works.

---

## PART 2 — CONTENT TO INSERT

### Placeholders to fill before publishing
- `[email]` — mathurakansha0209@gmail.com (or a new practice email if she sets one up)
- `[phone]` — her WhatsApp/phone number
- `[LinkedIn]` — linkedin.com/in/akanshamathur
- `[ICAI No.]` — ICAI membership number
- `[domain]` — if a custom domain is bought

### Business / display name
**Akansha Mathur, CA** — or a practice name if she chooses one later (e.g. "Mathur & Co." / "[Name] Accounting"). Default to her name for now.

### Hero
- **Name:** Akansha Mathur
- **Qualification line:** Chartered Accountant · ICAI (India) & ACA Chartered Accountants Ireland
- **Value proposition (one line):** "Remote bookkeeping, accounting and controls support for UK and Irish firms — Big 4 training, delivered from India."
- **Status pill:** "Available · usually replies within a day"

### Profile / intro paragraph (Home)
> I'm a dual-qualified Chartered Accountant — ICAI in India and ACA with Chartered Accountants Ireland — with six years across Big 4 firms (PwC, Deloitte) and a global bank. Much of that time was spent in internal audit and controls assurance, where accuracy and clean documentation aren't optional. I now bring that same rigour to remote bookkeeping, accounting and controls support for UK and Irish practices and small businesses, so your books and your controls are handled by a qualified professional, not outsourced to guesswork.

### The five services (for cards + Services page detail — display as one flat list)

**1. Bookkeeping**
Day-to-day and monthly bookkeeping kept accurate and up to date. Bank reconciliations, categorisation, ledger maintenance, and clean month-end records ready for review. Suited to firms who want reliable books maintained without adding headcount, and to small businesses who'd rather a qualified CA kept things straight.

**2. VAT Return Preparation**
Preparation of VAT returns using MTD-compatible software, ready for your review and submission. Built to fit the UK's Making Tax Digital requirements. Suited to practices that want the prep work handled so their team only has to review and file.

**3. Year-End Accounts Preparation**
Preparation of year-end accounts for sole traders and small companies — from trial balance to a clean set of accounts ready for your review and finalisation. Suited to practices managing seasonal year-end load.

**4. Management Reporting & Payroll Support**
Monthly management accounts, and payroll support including PAYE, RTI submissions and payslips. Suited to firms and businesses that want regular, reliable reporting they can rely on.

**5. Controls & SOX Support** *(this card opens its own dedicated sub-page — see "Controls & SOX sub-page" below)*
Internal controls and SOX/ICFR support for two kinds of client: businesses with US-listed parents or group reporting obligations (US SOX), and UK/Ireland organisations preparing for the new board-level internal-controls declaration. Backed by six years of hands-on SOX, ICFR, SOC and ISAE controls work at PwC and Deloitte across insurance, banking and industrial clients. On the card, show a short teaser and link through to the dedicated page.

> Note: every service is framed as **prep work returned for the UK/Irish firm to review and submit** — this is accurate to the white-label model and avoids implying she files directly with HMRC or holds UK tax authority she doesn't yet have.

### Controls & SOX sub-page (dedicated page, reached from service card 5 and optionally a nav sub-link)

This page has a short intro, then two clearly separated sub-sections — one per regime — then a shared "what's included" list and a "Request a quote" button.

**Page intro:**
> Controls work is where my background runs deepest. Six years across PwC and Deloitte on SOX, ICFR, SOC and ISAE engagements — designing risk and control matrices, running walkthroughs and testing, identifying deficiencies and supporting remediation, and coordinating with external auditors. Whether your client answers to a US-listed parent or is preparing for the UK's new internal-controls declaration, the underlying discipline — COSO-based, evidence-driven controls testing — is the same, and it's what I do.

**Sub-section A — US SOX / ICFR**
For businesses with US-listed parents, group reporting obligations, or operations in scope of the US Sarbanes-Oxley Act. Support across SOX 404 and ICFR: risk and control matrix (RCM) design across entity-level, IT general and business-process controls; design and operating-effectiveness testing through structured walkthroughs and evidence-based sampling; deficiency identification, root cause analysis and remediation support; workpaper preparation and review; and coordination with external auditors on scope, evidence and timing. Also covers SOC and ISAE 3402 third-party assurance readiness. Built on direct PwC and Deloitte experience delivering these engagements for global insurance, banking and industrial clients.

**Sub-section B — UK & Ireland internal controls (Provision 29)**
For UK-listed organisations and their advisors preparing for Provision 29 of the revised UK Corporate Governance Code 2024 — the new requirement, sometimes called "UK SOX," for boards to declare annually on the effectiveness of their risk management and internal control framework. It applies to accounting periods beginning on or after 1 January 2026 and covers financial, operational, reporting and compliance controls. Note clearly that Provision 29 is principles-based and comply-or-explain — broader than US SOX but not externally audited in the same way — so the support is framed as readiness and uplift, not an audit opinion. Support includes: mapping and documenting material controls, designing the evidence and monitoring needed to stand behind a board declaration, control testing and gap identification, and remediation planning. The bridge between both regimes is the COSO framework — the same global standard underpinning US SOX — which means the controls discipline carries directly across.

> Honesty guardrails for this page: describe the regimes accurately (do NOT call Provision 29 "UK SOX" without noting it is principles-based and different from US SOX). Frame all work as support, readiness, testing and remediation — NOT as issuing audit opinions or assurance she is not engaged to provide. Every claim of experience here is backed by her CV (PwC SOX/ICFR for insurance/reinsurance, Deloitte SOX 404 for a US-listed industrial multinational, PwC ISAE 3402 / SOC-II in Ireland).

### Trust strip (Home)
- **Dual-qualified:** ICAI (India) + ACA Chartered Accountants Ireland
- **Experience:** 6 years · Big 4 (PwC, Deloitte) + global bank
- **Education:** M.Sc., Trinity College Dublin
- **Data handling:** Confidential · GDPR-aware · DPA signed on request
- **Software:** Xero · QuickBooks Online · Dext · Sage · Power BI · advanced Excel · DocuSign

> Software note: Xero/QuickBooks/Dext/Sage/DocuSign are the target stack for this offering; Power BI and advanced Excel are genuinely from her CV. Keep Xero certification claims OFF until the free Xero Advisor certification is actually completed, then add a "Xero Advisor Certified" badge.

### "Who this is for" (optional supporting copy, Home or Services)
> Built for UK and Irish sole practitioners and small firms who need to offload routine bookkeeping without hiring — and for small businesses who want a qualified CA on their books at a fraction of local rates. Work is delivered white-label where preferred: your client never needs to know it was done offshore.

### Contact page
- **Email:** [email]
- **Phone / WhatsApp:** [phone]
- **LinkedIn:** [LinkedIn]
- Contact form fields: Name, Email, Message → mailto: pre-fill.

### About / credibility detail (optional — can live on Home or a short About block)
Draw only from these true facts:
- Dual-qualified CA: ICAI (Nov 2018) and ACA Chartered Accountants Ireland (May 2021)
- Six years in internal audit, controls and compliance across PwC, Deloitte, and a global bank — including hands-on SOX/ICFR, SOC and ISAE controls work (supports the Controls & SOX service directly)
- M.Sc. International Management, Trinity College Dublin (awarded Best Dissertation)
- Comfortable with compliance frameworks, data privacy, and audit-grade documentation
- Pursuing CISA (information systems audit) — signals ongoing professional development

> Do NOT state or imply any UK tax / HMRC / MTD track record or prior UK tax-market experience. The offering is forward-looking: she serves UK/Irish clients using MTD-compatible tools. Frame around qualification, Big 4 rigour, and accuracy — never around UK filing history.

---

## NOTES FOR LATER (not for the website now)
- The Controls & SOX service is now in the MVP with its own sub-page (US SOX/ICFR + UK/Ireland Provision 29). Possible later additions her CV also supports: standalone SOC / ISAE 3402 assurance readiness as its own service, data-privacy / GDPR-equivalent controls advisory (she did a PIPA readiness assessment at PwC), and GRC platform implementation support (CAMMs, Workiva).
- When the Xero Advisor certification is done, add the badge to the trust strip and Services page.
- UK target for Provision 29 work: subsidiaries/shared-service centres of US-listed parents in the UK/Ireland, and UK-listed companies' finance teams and their advisors. These are a different (higher-value) buyer than the bookkeeping SME audience — worth a tailored outreach list later.
