# Sonny's Speech Studio — WordPress / Elementor Build Reference

This is the **single source of truth** for rebuilding the Sonny's Speech Studio site on WordPress + Elementor via Novamira MCP.

The static reference implementation lives in this repo:
- `index.html` — Home page
- `about.html` — About page
- `contact.html` — Contact page
- `assets/styles.css` — All shared styles (design tokens, components, responsive)
- `assets/site.js` — Mobile drawer, announcement dismiss, testimonial carousel, floating chat
- `assets/sonny-tie.jpg`, `sonny-tux.jpg`, `sonny-no-tie.jpg`, `sonny-navy.jpg`, `sonny-shirt.jpg`, `logo.png`

When in doubt, **open the static HTML/CSS — it is final and approved by the client.** Do not improvise design changes.

---

## 1. Brand & business

| Field | Value |
|---|---|
| Business name | Sonny's Speech Studio |
| Tagline | 1-on-1 Online Public Speaking Coaching |
| Phone | (337) 366-0171 — `tel:+13373660171` |
| Email | sonnysspeechstudio@gmail.com — `mailto:sonnysspeechstudio@gmail.com` |
| Availability | Monday–Friday, 9:00 AM – 5:45 PM CDT |
| Format | 100% online via Zoom |
| Pricing | Free 20-minute Zoom consultation; sessions $60 / 45 minutes |
| Production URL | https://sonnysspeechstudio.com |
| Privacy Policy URL | https://sonnysspeechstudio.com/privacy-policy/ |
| Instagram | https://www.instagram.com/sonnysspeechstudio/ |
| YouTube | https://www.youtube.com/@sonnysspeechstudio |
| LinkedIn | https://www.linkedin.com/in/sonnysspeechstudio |

### Voice & copy rules

- **Avoid Google Ads–flagged terms:** anxiety, nervous, calm, stage fright, overcome, suffer.
- **No inflated stats.** "12+ years public speaking experience" — never "12+ years coaching." Never "200+ professionals coached." Never "weekly or bi-weekly" — always "once or twice per week."
- **CTA wording sitewide:** *"Book a Free Consultation"* (preferred), or "Start with a Free Consultation" / "Request a Free Consultation". **Never** "Schedule a Call." All sessions are Zoom-only.
- **Consultation length:** always **"20 minutes"** / "20-min Zoom consultation."
- **Audience claim:** "Speaking experience across many settings, including small groups to audiences of 2,000+." Never imply Sonny regularly speaks to 2,000-person crowds.

---

## 2. Global Kit (Elementor → Site Settings)

### Colors

| Role | Hex | Use |
|---|---|---|
| Primary (Navy) | `#0a3e5c` | Headings, body text on light, navy section bg |
| Navy Deep | `#072e45` | Hover states |
| Gold | `#f6b43e` | Buttons, highlight blocks, accents, eyebrow dot |
| Gold Deep | `#e89f1e` | Button hover, eyebrow text |
| Gold Soft | `#fbd58a` | Subtle accents |
| Warm White | `#fdfdfb` | Light section bg (default) |
| Cream | `#fdfaf3` | Alternating section bg |
| Cream Warm | `#f8f1de` | Card bg variant |
| Text | `#1a2b3a` | Body copy on light |
| Muted | `#5a6c7d` | Sub-copy, lead text |
| Border | `#e8ecef` | Light dividers |
| Border Warm | `#ecdfc3` | Cream-tinted dividers |

### Typography

- **Family:** Inter Tight (Google Fonts) — weights **400, 500, 600, 700**.
- **Body:** 17 px / line-height 1.6 / weight 400 / color `#1a2b3a`.
- **H1:** `clamp(40px, calc(2.4vw + 2.4vh), 70px)` / line-height 1.08 / letter-spacing -0.025em / weight 500. Hero h1 uses a slightly larger range: `clamp(46px, calc(2.6vw + 2.8vh), 82px)`.
- **H2:** 64 px / line-height 70 px / weight 500 / letter-spacing -0.02em.
- **H3:** 32 px / line-height 40 px / weight 500.
- **Eyebrow tag:** 13 px / weight 500 / `#e89f1e` / uppercase / letter-spacing 1.5 px / preceded by a small gold `●` bullet.
- **Sub / lead:** 18 px / line-height 1.6 / `#5a6c7d`, max-width 680 px.
- **Reassure / fine print:** 14 px / `#5a6c7d`.

In Elementor: paste `clamp()` values into the heading widget's "Custom" font-size field (the slider doesn't support clamp).

### Buttons (gold pill — single style sitewide)

| Property | Value |
|---|---|
| Background | `#f6b43e` |
| Text | `#0a3e5c`, weight 600, size 16 px |
| Padding | 0 32 px |
| Height | 56 px (default) / 48 px (`btn-sm`) / 50 px (mobile <480 px) |
| Border-radius | 999 px (full pill) |
| Box-shadow | `0 4px 14px rgba(10,62,92,.14)` |
| Hover | bg `#e89f1e`, `transform: translateY(-1px)`, shadow `0 8px 22px rgba(10,62,92,.18)` |
| Arrow | inline 14×14 SVG, animates `translateX(3px)` on hover |
| Focus | `outline: 3px solid rgba(10,62,92,.35)` + 3 px offset |

### Spacing

- **Container max-width:** 1280 px / horizontal padding 32 px desktop, 20–24 px mobile.
- **Section padding:** `--section-py: 78 px` desktop. Mobile reduces to 56 px (≤820 px).
- **Section background rhythm** (alternating, never two adjacent same-color light sections):
  - White → Cream → White → Cream … then Navy for emphasis sections (testimonials, final CTA).
- **Section transitions:** 100 px linear gradients (`fade-to-cream`, `fade-to-white`) between contrasting light sections; 80 px gradients (`fade-from-navy`) before/after navy sections.
- **Anchor offset:** all sections use `scroll-margin-top: 96 px` so anchor jumps clear the sticky header.

### Signature highlight block (gold rectangle behind a word)

```
.hl   → display:inline-block; padding:0 12–14 px;
.hl::before → absolute; inset:8% 0 4% 0; bg:#f6b43e; border-radius:6–8px;
              transform:rotate(-0.4deg); z-index:-1;
```

In Elementor: implement as a custom HTML / shortcode wrapper, OR add a `.hl` class via custom CSS in the heading's Advanced → CSS Classes.

**Used on:** Hero h1 ("confidently"), "Hi, I'm Sonny" h2 ("Sonny"), Final CTA h2 ("free consultation"). Also on About hero h1 ("Sonny") and Contact hero h1 ("free consultation"). Do **not** add it to other headings — restraint matters.

---

## 3. Global components

### 3.1 Announcement bar (top of every page)

- In document flow (NOT fixed-position). When dismissed, page reflows naturally.
- Background `#0a3e5c`, text white, height 40 px desktop / auto mobile.
- Centered content: gold target dot icon + `Now accepting new 1-on-1 coaching clients` (bold) + bullet + `Free 20-minute Zoom consultation` + `×` close button (top-right, 24×24 px).
- JS: `assets/site.js` adds `.hidden` class on close → `display:none`.

### 3.2 Header (sticky)

`position: sticky; top: 0;` background white, shadow-bottom, height ≈ 105 px.

| Element | Desktop | Mobile (<1024 px) |
|---|---|---|
| Logo (left) | 85 px tall | 60 px tall |
| Nav links | Home / About / Contact (centered) | Hidden |
| Phone link `(337) 366-0171` | Visible (small, with phone icon) | Hidden |
| "Book a Free Consultation" button | Visible (gold pill, 48 px) | Hidden |
| Hamburger button | Hidden | Visible (44×44 px tap target) |

Active page: nav link gets `.active` class → gold-deep color, weight 600, light gold pill background.

### 3.3 Mobile drawer (under 1024 px)

Slide-in panel from right, width `min(86vw, 360px)`. Contents:
- Logo + close (×) button row
- Vertical nav: Home / About / Contact
- Divider
- Phone tap-target `(337) 366-0171`
- Full-width "Book a Free Consultation" gold pill

Behavior: tap-outside closes (overlay), Esc closes, clicking a link closes. JS in `assets/site.js`.

### 3.4 Footer (every page)

Cream background `#fdfaf3`, top border 2 px gold, padding 72 px / 22 px.

4-column grid (desktop):
1. **Brand** — logo (96 px) + tagline paragraph
2. **Quick Links** — Home / About / Contact
3. **Connect** — Instagram / YouTube / LinkedIn (icon + label cards)
4. **Contact** — email card + phone card + availability paragraph

Bottom strip: copyright left, Privacy Policy link right (links to `https://sonnysspeechstudio.com/privacy-policy/`).

Tablet (768–1023 px): collapse to 2 columns. Mobile (<820 px): single column.

### 3.5 Floating chat button

- Fixed bottom-right (24 px desktop / 16 px mobile, respects iOS safe-area).
- Gold circle (60 px desktop / 54 px mobile), navy chat icon, drop shadow.
- Tooltip "How can I help?" on hover (desktop only).
- JS: hidden until user scrolls past 280 px; auto-hides when the navy `.final` CTA section is in view.
- Click → `/contact`.

---

## 4. Page-by-page section map

### 4.1 Home (`/`)

SEO title: `Online Public Speaking & Presentation Coaching | Sonny's Speech Studio`
SEO description: `1-on-1 online public speaking coaching for working professionals. Build confidence, clarity, and structure. Free 20-minute Zoom consultation.`

| # | Section | Background | Layout & content |
|---|---|---|---|
| 1 | Hero | Navy `#0a3e5c` (gold gradient overlay + subtle wavy line pattern) | 2-col grid (1.55fr text / 1fr photo). Left: H1 "Speak clearly and **confidently** in meetings and presentations" (highlight on "confidently"); sub-copy; trust pill row "12+ years public speaking experience • 1-on-1 coaching • 100% online via Zoom"; gold "Book a Free Consultation" button; reassurance line with gold ✓ icon: "**Free 20-min Zoom consultation** — then $60 per 45-minute session. No pressure." Right: portrait `sonny-tie.jpg` in 3:4 frame, 2-px gold border, dashed gold ring offset, with white-card testimonial quote overlay (Alejandro S.) at bottom-left. |
| 2 | Trust badge strip | White `#fdfdfb` | 4-up grid of cream pills: "12+ years public speaking experience", "Personalized 1-on-1 coaching", "100% online via Zoom", "Structured skill-based sessions". Headline above: "Coaching for working professionals preparing for meetings, presentations, and important workplace conversations." |
| 3 | Problem | Cream `#fdfaf3` | Eyebrow "The Friction" + h2 "Does this sound like you?". 2×2 grid of "pain" cards (each: SVG icon, h3, supporting copy, gold left-border, hover lift). Closer line below: italic muted "This is exactly what coaching is designed to help with." |
| 4 | Audience fit | White | 2-col grid (0.85fr / 1fr). Left: eyebrow "Is This You?" + h2 "Coaching is for you if:" + lead + CTA. Right: 4-item checklist list (gold check circle + text in cream cards). |
| 5 | "You're ready to:" | Navy + gold gradients | Eyebrow "The Outcome" + h2 "You're **ready** to:". 3-col grid of outline-icon outcomes: (a) Mic icon + "Speak more clearly and confidently"; (b) Layout-list icon + "Communicate ideas with structure"; (c) Target icon + "Be prepared and feel composed". Centered "Book a Free Consultation" button below. |
| 6 | "How coaching helps you improve" (zigzag) | White | Eyebrow "The Coaching" + h2 "How coaching helps you improve". 3 alternating 2-col rows (text ↔ visual). Each row: numbered eyebrow ("01 — Structure" etc), h3, paragraph, paired Lucide icon visual in cream rounded card. Icons: list-ordered, mic, presentation. CTA below: "Start with a Free Consultation" — must be left-aligned on mobile. |
| 7 | "How coaching works" (timeline + photo) | Cream | 2-col grid. Left: portrait `sonny-no-tie.jpg` in 4:5 frame with gold border + dashed offset. Right: eyebrow "The Process" + h2 "How coaching **works**" + 3-step vertical timeline (numbered circles 01/02/03 connected by gold gradient line) + "Start with a Free Consultation" CTA + reassurance "Step 1 takes 2 minutes". |
| 8 | Testimonials | Navy + gold gradients | Eyebrow "In Their Words" + h2 "What clients are saying". Featured 2-up large cream-card testimonials (Alejandro S. + Shea G.) with avatar + city. Below: horizontal scrollable carousel of 4 short testimonials (Jordan C. / Bethanie M. / Reggie G. / Josh M.) with prev/next gold circular controls. Closing CTA with ask line "Ready to experience this for yourself?" + button. |
| 9 | "Hi, I'm Sonny" | Cream | 2-col grid. Left: eyebrow "Meet Your Coach" + h2 "Hi, I'm **Sonny**." + 2 paragraphs + chip row ("12+ years public speaking experience", "Small groups to audiences of 2,000+", "Online via Zoom", "Tailored 1-on-1 sessions") + "Book a Free Consultation" button. Right: portrait `sonny-tux.jpg` in 4:5 frame with gold border + dashed offset + navy floating tag bottom-left ("**Sonny** / Founder & Speaking Coach"). |
| 10 | "What makes this coaching different" | White (subtle gold radials) | Eyebrow "The Difference" + h2 "What makes this coaching different". 4-card grid (offset 2nd/4th up by 32 px on desktop): each card is cream with gold corner number, navy outline icon, h3, supporting paragraph. Centered ask line + "Book a Free Consultation" CTA below. |
| 11 | FAQ | White | Eyebrow "FAQ" + h2 "Frequently asked questions". Vertical accordion list (id `faq`): 7 questions (who is this for, how does coaching work, cost, availability, what will I learn, ongoing/one-time, not sure if it's a fit). Each `<details>` element with custom +/× toggle icon. Foot CTA: "Still have questions?" + button. |
| 12 | Final CTA | Navy + gold gradients | Eyebrow "Take the First Step" + h2 "Start improving your speaking with a **free consultation**". Sub-copy. Cream "sonny-card" row: small avatar (`sonny-no-tie.jpg`) + name/title + gold "Book a Free Consultation" button. Reassurance line: "Free 20-minute Zoom consultation • Sessions $60 / 45 min • No pressure". |

### 4.2 About (`/about`)

SEO title: `About Sonny | Sonny's Speech Studio`
SEO description: `Meet Sonny — public speaking coach with 12+ years of speaking experience. Personalized 1-on-1 coaching for working professionals via Zoom.`

| # | Section | Background | Content |
|---|---|---|---|
| 1 | Hero | Warm white `#fdfdfb` | 2-col grid. Left: eyebrow "About Sonny" + h1 "Hi, I'm **Sonny**." + sub "Founder of Sonny's Speech Studio. 1-on-1 public speaking coach for working professionals." + intro paragraph + "Book a Free Consultation" button. Right: portrait `sonny-tie.jpg` in 4:5 frame (max-height 560 px desktop / 480 px mobile), 2-px gold border, dashed offset. |
| 2 | My Journey | Cream | 2-col grid (0.8fr / 1fr). Left: eyebrow "The Story" + h2 "My journey to coaching". Right: 3 paragraphs covering 12+ years of speaking, the journey from hesitation to clarity, and today's coaching focus. Inline link CTA at the end (gold-underlined, with → arrow): "Want to work together? **Book a free consultation**". |
| 3 | What I believe about coaching | White | Eyebrow "My Approach" + h2 "What I believe about coaching" (centered head). 3-card grid: "01 Real progress comes from preparation and practice", "02 Every speaker needs a different approach", "03 Honest feedback creates real growth". Centered smaller pill CTA "Book a Free Consultation" (`btn-sm`, 48 px) below cards. |
| 4 | Experience | Cream | 2-col grid. Left: eyebrow "What I Bring" + h2 "Experience that shapes how I coach" + supporting paragraph. Right: 5-item gold-check list ("12+ years of public speaking experience" / "Speaking experience across many settings, including small groups to audiences of 2,000+" / "Talks and presentations across diverse settings" / "1-on-1 coaching for working professionals across the U.S." / "100% online via Zoom"). |
| 5 | Built for working professionals | White | Eyebrow "Why I Coach This Way" + h2 "Built for working professionals" (centered head). 3 single-column paragraphs (max-width 820 px). |
| 6 | Testimonials (`voices--light`) | Cream (lighter variant of the home testimonials) | Eyebrow "In Their Words" + h2 "What clients are saying". Featured 1-up testimonial (Shea G.). Below: 4-card horizontal carousel (Jordan C. / Bethanie M. / Reggie G. / Josh M.). Same component as home testimonials but cream-themed instead of navy so it doesn't blend with the navy Final CTA below. |
| 7 | Final CTA | Navy + gold gradients | Same component as home Final CTA: heading, sub, sonny-card with avatar + button, reassurance line. |

### 4.3 Contact (`/contact`)

SEO title: `Contact | Schedule Your Free Consultation | Sonny's Speech Studio`
SEO description: `Schedule your free 20-minute Zoom consultation with Sonny. 1-on-1 public speaking coaching for working professionals.`

| # | Section | Background | Content |
|---|---|---|---|
| 1 | Hero | Cream | Centered: eyebrow "Get In Touch" + h1 "Schedule your **free consultation**" + sub "We'll talk through your goals and see if coaching is the right fit. No pressure." |
| 2 | Form + Next steps | White | 2-col grid (1.1fr form / 1fr next steps). **Left form card** (cream bg, 20 px radius, 1 px border): h3 "Tell me about yourself" + sub "A few quick details so we can get you scheduled." + 3 fields with leading 20×20 navy icons (50% opacity → 100% on focus): (a) Name (`text`, placeholder "Jane", icon: user); (b) Preferred contact phone-or-email (`text`, placeholder "(000) 111-2222 or name@website.com", icon: phone); (c) Textarea "What would you like to improve?" (placeholder "Example: clearer presentations, stronger delivery, organizing my thoughts...", icon: pencil). Inputs 56 px tall, 1.5 px border, 12 px radius, focus shows inset glow `inset 0 0 0 4px rgba(10,62,92,.08)` + 2 px navy border. Button row: gold "Send Message" pill + reassurance "I'll personally respond within a few hours." **Right column "Next Steps":** eyebrow "What To Expect" + h3 "What happens next" + 3 numbered steps in cream cards (01 You reach out / 02 We talk / 03 We get started) + gold reassurance pill block: "Free 20-minute Zoom consultation • No commitment required". |
| 3 | Featured testimonial | Cream | Eyebrow "In Their Words" + h2 "Real words from real clients". Single white centered card (max 680 px) with gold quote glyph, Alejandro S. quote, "— Alejandro S., Houston, TX" cite. Below: small trust line "12+ years of public speaking experience • 100% online via Zoom". |
| 4 | Direct contact | White | Eyebrow "Prefer To Reach Out Directly?" + h2 "Email or call anytime". 2-card grid (cream cards, gold square icons): (a) Email card → `mailto:sonnysspeechstudio@gmail.com`; (b) Phone card → `tel:+13373660171`. Below: availability paragraph "Standard availability: Monday–Friday, 9:00 AM – 5:45 PM CDT. Sessions outside these hours may include an additional fee." |

> **Form integration:** the static site uses a `mailto:` action as a placeholder. In Elementor Pro, replace with the **Form widget** wired to (a) email Sonny at `sonnysspeechstudio@gmail.com`, (b) save entries to the WP database. Match field labels and placeholders exactly.

---

## 5. Mobile rules (apply at ≤820 px)

- All section heading blocks left-align (`align-items: flex-start; text-align: left`) — never centered text over left-aligned body. **Exception:** Final CTA section stays fully centered (heading, sub, button).
- Hero stacks single-column with photo at 4:5 ratio, max-width 90%.
- 2- and 3-up grids collapse to 1-column.
- Footer collapses to 1-column.
- Section padding reduces from 78 px to ~56 px.
- Floating chat button bottom-right with safe-area inset padding.
- Hide hero quote card overlay.
- "Hi, I'm Sonny" card (final CTA mini-card) goes column.

## 6. Tablet rules (768–1023 px)

- Hamburger menu shows (desktop nav hidden).
- Footer collapses to 2 columns.
- Zigzag visual cards shrink to ~220 px.
- "You're ready to:" stays as 3 columns, center-aligned.
- About hero stays 2-col.
- About approach grid stays 3-up.

---

## 7. Image manifest

All assets are in `/assets/`. After upload to WP Media Library, keep the same filenames (Elementor will reference by attachment ID, so original filename is for human reference).

| File | Used in |
|---|---|
| `logo.png` | Header brand, footer brand, mobile drawer header, favicon (also `apple-touch-icon`) |
| `sonny-tie.jpg` | Home hero, About hero portrait, social share preview (OG/Twitter image) |
| `sonny-tux.jpg` | Home "Hi, I'm Sonny" portrait |
| `sonny-no-tie.jpg` | Home "How coaching works" portrait + Final CTA card avatar |
| `sonny-navy.jpg` | Available, not currently placed — consider for future variant |
| `sonny-shirt.jpg` | Available, not currently placed |

Image treatment: 4:5 (or 3:4 for hero) aspect, 20 px radius, 2 px gold border, dashed 1 px gold offset ring (`inset: -14px; border-radius: 26px`).

---

## 8. SVG icon inventory

All icons are inline SVG (Lucide-style, stroke 1.6–2 px). Replicate in Elementor as Icon widgets with custom SVG, OR copy the inline SVG into HTML widgets.

- **Hero check (`.hr-check`):** check polyline, gold stroke, 16×16.
- **Trust-badge check (`.b-ico`):** check polyline in gold filled circle, 32 px circle.
- **Pain-card icons (4):** custom navy line illustrations (mind, dialogue, person, presentation) — see `index.html` lines around 1066–1107.
- **Fit-list checks:** white check on gold-filled 28-px circle.
- **"You're ready to" outcome icons:**
  - Card 1: `mic` (Lucide) — rect + path + line; navy stroke 1.6 px.
  - Card 2: `layout-list` (Lucide) — 2 rects + 4 horizontal lines.
  - Card 3: `target` (Lucide) — 3 concentric circles, innermost filled.
- **Helps zigzag visuals:** 24×24 Lucide icons inside 5/4 cream cards. Card 1: `list-ordered`. Card 2: `mic`. Card 3: `presentation` (screen + bars + person).
- **Timeline number bullets:** 44-px cream circle with 2-px gold border, navy "01"/"02"/"03" text.
- **Diff-card icons (4):** simple navy outlines (clipboard / video card / user with arrow / sun gear). Inline in `index.html`.
- **FAQ +/× toggle:** 24×24 plus icon, rotates 45° when `[open]`.
- **Footer social:** 16-px Instagram, YouTube, LinkedIn pictograms in gold-tinted 32-px squares.
- **Footer contact card icons:** 18-px envelope, phone in gold-tinted 38-px squares.
- **Floating chat:** 26-px message square icon in 60-px gold circle.
- **Hamburger (`.nav-toggle`):** 3-line menu icon, swaps to × when drawer open.
- **Contact form input icons:** 20-px Lucide outlines (`user`, `phone`, `pencil` for textarea), positioned absolute inside `.input-wrap`.

---

## 9. Animation & interaction notes

| Behavior | Trigger | Implementation |
|---|---|---|
| Reveal-on-scroll | 8% intersection | `.reveal` element gets `.in` → opacity 0→1, translateY 16px→0 (700 ms ease) |
| Smooth scroll | Anchor click | `html { scroll-behavior: smooth }` + `section { scroll-margin-top: 96px }` |
| Button hover | Mouse enter | `translateY(-1px)` + arrow `translateX(3px)` + shadow grow |
| Card hover (pain / dc / etc.) | Mouse enter | `translateY(-2 to -6 px)` + shadow grow |
| Testimonial carousel | prev/next click | `scrollBy({ left: ±cardWidth, behavior: smooth })` |
| Mobile drawer | Hamburger click | Adds `.open` to `.nav-drawer`, `.nav-open` to body. Esc / overlay click / link click close it. |
| Floating chat | Scroll past 280 px | Adds `.show`. Hides automatically when `.final` enters viewport. |
| Announcement dismiss | × button | Adds `.hidden` to `.announce`. Page reflows. |

In Elementor: most can be done with the platform's built-in Motion Effects + Custom Code blocks. The drawer and floating chat behaviors should be ported from `assets/site.js` into a small must-use plugin or theme `functions.php` enqueue.

---

## 10. SEO

- All 3 pages have unique `<title>` and `<meta name="description">` (see section 4 per page).
- Open Graph + Twitter Card meta on all pages, pointing at the appropriate hero portrait.
- Favicon + Apple touch icon use `assets/logo.png`.
- `theme-color` meta `#0a3e5c` for mobile browser chrome.
- One `<h1>` per page.
- HTML `lang="en"`.

In Elementor: use Yoast SEO (already installed on the Novamira sites) to set per-page title/description/OG image. Theme color and favicon belong in WP Site Identity.

---

## 11. Form delivery

The static site uses `<form action="mailto:…">` as a placeholder.

For production Elementor build:
- Replace with **Elementor Pro Form widget**
- Recipient: `sonnysspeechstudio@gmail.com`
- Save submissions to WP DB (Form widget → Actions After Submit → "Collect Submissions")
- Optional: Webhook to Zapier / spam protection via WP Mail SMTP Pro (already on the Novamira sites)
- Match field labels, placeholders, and validation states exactly to the static reference.

---

## 12. Things NOT to do

- Don't add the gold highlight block to any heading not specified in section 2.
- Don't centre-align section headings on mobile (left-align is the rule). Final CTA is the only exception.
- Don't introduce stock illustrations or AI imagery — only the 5 portrait files in `assets/`.
- Don't reword copy. The strings in the static HTML are final and approved.
- Don't add a phone CTA to the body of any page beyond the header trust signal and the contact page direct cards.
- Don't use weekly/bi-weekly, executive communication, "Schedule a Call", "30-min consultation," or "200+ professionals coached." All have been removed.

---

## 13. Build phase order (recommended)

1. **Recon** — confirm WP install version, Elementor Pro version, plugins present (Yoast, Novamira, WP Mail SMTP), parent theme.
2. **Global Kit** — Site Settings: colors, fonts, default body, default link color, default button. Upload logo. Set favicon.
3. **Theme Parts** — build Header (sticky), Footer, Announcement Bar, Mobile Drawer, Floating Chat as Elementor Templates / Theme Builder parts. Apply globally.
4. **Reusable widgets** — Eyebrow tag (HTML widget or shortcode), Highlight wrapper (`.hl`), Testimonial mini card, Step item, Pain card, Diff card.
5. **Home page** — sections 1 → 12 in order, using global components.
6. **About page** — sections 1 → 7.
7. **Contact page** — sections 1 → 4. Wire form widget.
8. **Responsive pass** — verify at 1280, 1024, 768, 414, 390, 375 px. Test sticky header, drawer, floating chat.
9. **Polish** — anchor offsets, motion effects, alt text, lazy-load below-fold images, Yoast meta per page.

---

## 14. Reference files (in this repo)

- **Live deployed reference:** https://sonnysspeechstudio.com (Vercel)
- **GitHub source:** https://github.com/argon-media/sonnysspeechstudio
- **HTML/CSS source of truth:** `index.html`, `about.html`, `contact.html`, `assets/styles.css`
- **JS behaviors:** `assets/site.js`

When the static site and this document conflict, **the static site wins** — it is the rendered, approved, deployed reference.
