# DESIGN-PRINCIPLES.md: Findable website design system

> Colors, fonts and voice live in BRAND.md. This file defines layout, components, spacing, responsiveness, motion and accessibility. Design is subordinate to performance and SEO: if a design idea needs heavy JS or heavy images, drop the idea.

## 1. Design philosophy

1. **Bold but light.** High-contrast ink and lime with plenty of white space. Few elements, large type, strong hierarchy.
2. **Content is the interface.** Pages are read and scanned. Clear headings, short paragraphs, obvious CTAs.
3. **Proof over decoration.** Use real screenshots, numbers and process steps instead of ornaments.
4. **Fast by design.** Flat colors, no gradients or shadows that need rasterizing, minimal images, system-friendly animations.
5. **Machine-readable layout.** Visual order matches DOM order. Headings and sections reflect the real structure of the content, which helps both users and crawlers.

## 2. Layout system

- **Container:** `max-width: 72rem` (1152px), horizontal padding `clamp(1rem, 4vw, 2rem)`, centered.
- **Reading width:** long text columns `max-width: 68ch`.
- **Grid:** CSS Grid and Flexbox only. 12-column mental model, but build with `repeat(auto-fit, minmax(16rem, 1fr))` for card grids.
- **Breakpoints (mobile-first):** base (up to 639px), `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Use `min-width` media queries.
- **Section rhythm:** vertical padding `clamp(3rem, 8vw, 6rem)` per section. Alternate section backgrounds: ink (hero, CTA), paper (default), mist (secondary), olive (case study or footer accents).

### Spacing scale (tokens)

```css
:root {
  --space-1: 0.25rem;  --space-2: 0.5rem;  --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;  --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;    --space-9: 6rem;
  --radius-sm: 6px;    --radius-md: 12px;  --radius-lg: 20px;  --radius-pill: 999px;
  --border: 1px solid color-mix(in srgb, var(--ink) 15%, transparent);
}
```

Use only these spacing and radius values.

## 3. Visual style rules

- **Flat.** Solid fills, 1px borders. No drop shadows, glows, blurs or gradients. If elevation is needed, use a border and a contrasting background.
- **Corners:** cards `--radius-md`, buttons `--radius-sm` or `--radius-pill`, tags `--radius-pill`.
- **Signature elements:**
  - Lime highlighter behind a key phrase in headings (`<mark class="hl">`).
  - Mono uppercase labels above section headings (e.g. `SEO`, `AEO`, `GEO`, `PROCESS`).
  - Search-bar pill used for the free audit input and for decorative search motifs.
  - Radar rings or dot motifs as background shapes made with inline SVG or CSS.
- **Icons:** simple outline icons, 24px grid, 1.5px stroke, inline SVG via `Icon.astro`. Maximum 20 unique icons.
- **Charts and data:** simple inline SVG or HTML/CSS bars, lime and cyan on ink, ink and orange on paper.

## 4. Components

Build each as a reusable Astro component with typed props. All must work without JavaScript.

### Header
- Left: logo (inline SVG). Right: nav links (Services, Industries, Case studies, Blog, About) and a primary CTA button ("Free audit").
- Sticky is optional; if sticky, use `position: sticky; top: 0` only (no scroll listeners).
- Mobile: a `<details>`/`<summary>` or a CSS-only toggle; if JS is needed, an inline script under 1 KB using `aria-expanded`. Touch targets at least 44 x 44 px.
- Include a visible "Skip to content" link as the first focusable element.

### Hero (home and service pages)
- Ink background. Mono label, H1 with one lime highlight, 1 to 2 sentence subhead, primary CTA (orange) and secondary link.
- Right or below: a lightweight visual built from CSS/SVG (for example a stylized search result card showing "findable.com" ranking and an AI-answer card citing it). Not a photograph.
- The H1 text is the LCP element. Make sure it renders immediately with no image or font blocking it.

### Buttons
- **Primary:** neon orange background, ink text, bold. **Secondary:** transparent with 1.5px ink border (paper border on ink). **Text link:** underline.
- Min height 44px, padding `0.75rem 1.25rem`, clear `:hover` and `:focus-visible` states (2px cobalt or lime outline, 2px offset).
- Only one primary button per viewport region.

### Cards
- Border, `--radius-md`, padding `--space-5`, mono label tag with service color (SEO lime, AEO cyan, GEO orange), H3, short text, "Learn more" link. Whole card clickable via a stretched link on the heading anchor.

### Service tags
- Pill with service color background and ink text: `SEO`, `AEO`, `GEO`.

### Process steps
- Numbered list (`<ol>`), large mono numbers, short title and sentence. Use on service pages: Audit, Plan, Build, Measure.

### FAQ
- `<details><summary>` list. Questions are real customer questions, answers 40 to 80 words with the direct answer in the first sentence. FAQ text must be fully present in the HTML. If FAQ schema is added, it must match the visible text exactly.

### Proof/stat blocks
- Large Space Grotesk numbers with small labels. Use real data only; placeholder `TODO:` otherwise.

### Forms
- Labels always visible (no placeholder-only labels), inline error text, large inputs (min 44px), honeypot field hidden with CSS (not `display:none` on the input's label for screen readers; use an off-screen technique and `aria-hidden`/`tabindex="-1"`), clear success page.
- Fields (free audit): name, email, website URL, business type (local business, D2C, e-commerce, other), optional message. Consent note linking to the privacy page.

### CTA band
- Ink or lime section: strong headline, one button. Repeated at the bottom of every key page.

### Breadcrumbs
- Visible breadcrumb trail on inner pages, matching BreadcrumbList schema.

### Footer
- Ink or olive background. Logo, short descriptor, nav columns (Services, Industries, Company, Resources), contact details, social links, legal links, and the same NAP (name, area, contact) used in schema and GBP.

## 5. Page templates (wireframe order)

### Home
1. Hero (promise, CTA)
2. "The problem" (3 short points: invisible on Google, missing from AI answers, site not built for search)
3. Services: SEO, AEO, GEO cards (+ website development card)
4. Who we help: local businesses, D2C brands, e-commerce brands (3 cards linking to industry pages)
5. Process: Audit, Plan, Build, Measure
6. Proof: link to the Findable 30-day case study, real metrics when available
7. FAQ (5 questions, including "What is AEO?" and "What is GEO?")
8. CTA band

### Service page (SEO, AEO, GEO, Website development)
1. Hero with mono label and H1 containing the primary keyword naturally
2. Short direct-answer paragraph defining the service (40 to 60 words)
3. Who it is for
4. What is included (deliverables list)
5. Process
6. Results we measure
7. FAQ (6 to 8 questions)
8. Related services and related blog posts (internal links)
9. CTA band

### Industry page
1. Hero tailored to the audience
2. Their specific problems
3. What we do for them (mapped to SEO, AEO, GEO)
4. Example plan or checklist
5. FAQ, CTA band

### Blog post
- Breadcrumbs, H1, author byline with link to About, published and updated dates, table of contents for long posts, direct answer first, headings as questions where natural, related posts, CTA. Use `<article>` and `<time datetime>`.

### Case study
- Summary stats, starting point, what we did, timeline, results with screenshots (real), lessons, CTA.

## 6. Responsive and mobile rules

- Mobile-first. Test at 360px, 390px, 768px, 1024px, 1440px.
- No horizontal scroll on the page body. Tables and code blocks scroll inside their own `overflow-x: auto` wrapper.
- Fluid type with `clamp()`. Never smaller than 16px for body text on mobile.
- Tap targets at least 44 x 44 px with spacing between them.
- Images use `sizes` correctly so mobile downloads small variants.

## 7. Motion

- Default: none. Allowed: simple CSS transitions (color, background, transform) of 150 to 200 ms on hover and focus.
- Optional subtle entrance effects only if done in CSS without layout shift, and always wrapped in `@media (prefers-reduced-motion: no-preference)`.
- No parallax, scroll-jacking, auto-playing carousels, or animation libraries.

## 8. Accessibility (WCAG 2.2 AA)

- Semantic landmarks, one H1, no skipped heading levels.
- Color contrast per BRAND.md; never use color alone to convey meaning (service tags also include text).
- Visible `:focus-visible` styles on all interactive elements; logical tab order; skip link.
- All images have meaningful `alt` or empty `alt` if decorative; SVGs that convey meaning have `<title>` or `aria-label`.
- Forms: labels, `autocomplete` attributes, error messages tied via `aria-describedby`.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` (the site is light/ink by design; no dark-mode toggle needed, but never produce unreadable combinations).
- `lang="en"` on `<html>`. Descriptive link text.

## 9. Images, icons and media

- Format: AVIF and WebP with fallback via `<Picture>`; SVG for logos, icons and illustrations (optimize with SVGO).
- Always set `width` and `height` (or aspect-ratio) to prevent layout shift.
- LCP image (if any): eager, `fetchpriority="high"`. All others: `loading="lazy"`, `decoding="async"`.
- Max source width 2000px; generate `srcset` for 400, 800, 1200, 1600.
- Descriptive filenames (`search-console-impressions-chart.png`), descriptive alt text.
- No video on landing pages. If a video is ever needed, use a click-to-load poster (no iframe until clicked).

## 10. Design QA checklist

- [ ] Only brand tokens used; spacing and radius from the scale
- [ ] Lime/cyan never used as text on light backgrounds
- [ ] One primary CTA per section, consistent button styles
- [ ] Layout works at 360px and 1440px; no horizontal scroll
- [ ] Keyboard-only navigation works end to end
- [ ] No layout shift when fonts load or images appear
- [ ] Page is readable and fully functional with JavaScript disabled
- [ ] Lighthouse mobile scores meet the budgets in AGENT.md

