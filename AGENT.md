# AGENT.md: Findable website build instructions

> Read this file first. Then read BRAND.md, DESIGN-PRINCIPLES.md and SEO.md before writing any code. If two files conflict, the priority order is: SEO.md (crawlability and indexing) > AGENT.md (architecture and performance) > DESIGN-PRINCIPLES.md > BRAND.md.

## 1. Project summary

**Findable** is an SEO, AEO (answer engine optimization) and GEO (generative engine optimization) agency, plus SEO-first website development. It serves local businesses, D2C brands and e-commerce brands, in India and internationally.

This website has three jobs:

1. **Rank** on Google and Bing for brand and long-tail service queries.
2. **Be readable and citable** by AI tools (ChatGPT search, Perplexity, Gemini, Copilot, Google AI Overviews).
3. **Convert** visitors into free audit requests and contact enquiries.

The website is also Findable's own portfolio piece. Prospects will inspect its code, speed, schema and indexing. It must be a flawless example of what the agency sells.

**Tagline:** Be found. Be cited. Be chosen.
**Descriptor:** SEO, AEO and GEO for local, D2C and e-commerce brands.

## 2. Non-negotiable principles

1. **HTML-first.** Every page ships fully rendered static HTML. All important content must exist in the initial HTML response (many AI crawlers do not run JavaScript).
2. **Zero JavaScript by default.** Add JS only when there is no HTML/CSS alternative, and keep the total first-party JS under 5 KB gzipped per page.
3. **Lightweight.** Follow the performance budgets in section 5. Never add a dependency without justifying it.
4. **One source of truth for SEO.** All titles, descriptions, canonicals, Open Graph tags and JSON-LD come from one `SEO`/`BaseHead` component and one `schema` helper. No per-page ad-hoc head code.
5. **Accessible and semantic.** Correct landmarks, one `<h1>` per page, logical heading order, keyboard navigable, WCAG 2.2 AA contrast.
6. **No invented facts.** Never fabricate clients, testimonials, ratings, awards, metrics, addresses or phone numbers. Use clearly marked `TODO:` placeholders (see section 9).

## 3. Tech stack (decided, do not change without asking)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro** (latest stable), static output (`output: 'static'`) | Ships HTML with almost no JS, best-in-class for content and SEO sites |
| Language | **TypeScript** (strict) for components, config and helpers | Safer schema and metadata helpers |
| Styling | **Plain CSS with custom properties** (design tokens), scoped styles in Astro components, one global `tokens.css` and `base.css` | Smallest CSS output, no framework overhead. Do not add Tailwind, Bootstrap or UI kits |
| Content | **Astro Content Collections** (Markdown/MDX) for blog posts and case studies, validated with Zod schemas | Typed frontmatter, easy authoring |
| Images | **astro:assets** (`<Image />` / `<Picture />`) with sharp, output AVIF + WebP + fallback | Automatic responsive, lightweight images |
| Fonts | **Self-hosted WOFF2 via `@fontsource`** packages (Space Grotesk, Inter, JetBrains Mono) | No third-party font request, fast, GDPR-friendly |
| Icons | Inline SVG (small hand-picked set, via an `Icon.astro` component) | No icon font, no icon library |
| Sitemap | `@astrojs/sitemap` | Auto-generated XML sitemap |
| Forms | Plain HTML `<form>` posting to a configurable endpoint (`PUBLIC_FORM_ENDPOINT`, e.g. Formspree or Web3Forms) with honeypot field and a `noindex` thank-you page | Works without a backend |
| Analytics | GA4 and (optional) Microsoft Clarity, loaded after page load, never render-blocking | Measurement without hurting speed |
| Hosting | **Cloudflare Pages** (preferred) or Vercel, global CDN, HTTPS, HTTP/2+ | Fast TTFB everywhere |
| Package manager | `pnpm` (or `npm` if unavailable) | |
| Linting | ESLint + Prettier + `astro check` | |
| Optional later | MDX for rich posts, Pagefind for on-site search, Satori for generated OG images | Only when needed |

**Do not use:** React/Vue/Svelte islands for marketing pages, jQuery, animation libraries (GSAP, Framer Motion, AOS), sliders/carousels, Google Fonts runtime links, icon fonts, tag-manager bloat, popups, chat widgets, cookie-banner libraries over 5 KB.

## 4. Project structure

```
findable-website/
├─ AGENT.md  BRAND.md  DESIGN-PRINCIPLES.md  SEO.md  PROMPTS.md
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ .env.example                 # PUBLIC_SITE_URL, PUBLIC_GA4_ID, PUBLIC_FORM_ENDPOINT, PUBLIC_CONTACT_EMAIL
├─ public/
│  ├─ favicon.svg  favicon.ico  apple-touch-icon.png
│  ├─ og-default.jpg            # 1200x630, under 200 KB
│  ├─ llms.txt                  # optional, low-priority
│  └─ _headers                  # Cloudflare Pages caching and security headers
├─ src/
│  ├─ config/site.ts            # name, url, tagline, contact, socials, nav (single source of truth)
│  ├─ styles/tokens.css  base.css
│  ├─ layouts/BaseLayout.astro
│  ├─ components/
│  │  ├─ seo/BaseHead.astro  JsonLd.astro  Breadcrumbs.astro
│  │  ├─ ui/Button.astro  Card.astro  Tag.astro  Icon.astro  Faq.astro  Cta.astro
│  │  └─ layout/Header.astro  Footer.astro
│  ├─ lib/schema.ts             # JSON-LD builders (Organization, WebSite, Service, FAQPage, BlogPosting, BreadcrumbList, Person, ProfessionalService)
│  ├─ content/
│  │  ├─ config.ts              # collections + Zod schemas
│  │  ├─ blog/*.md
│  │  └─ case-studies/*.md
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ services/index.astro  seo.astro  aeo.astro  geo.astro  website-development.astro
│  │  ├─ industries/local-businesses.astro  d2c-brands.astro  ecommerce-brands.astro
│  │  ├─ free-audit.astro  about.astro  contact.astro  thank-you.astro (noindex)
│  │  ├─ blog/index.astro  blog/[slug].astro
│  │  ├─ case-studies/index.astro  case-studies/[slug].astro
│  │  ├─ privacy.astro  terms.astro  404.astro
│  │  └─ robots.txt.ts          # generated robots.txt using the site URL
│  └─ assets/images/            # source images (optimized at build)
```

## 5. Performance budgets (hard limits)

| Metric | Target |
|---|---|
| Lighthouse (mobile) | Performance, Accessibility, Best Practices, SEO all **95+** (aim 100) |
| LCP | under **2.0 s** on mobile (Lighthouse default throttling); never above 2.5 s |
| INP | under **200 ms** |
| CLS | under **0.05** |
| TTFB | under 200 ms from the CDN edge |
| HTML per page | under 30 KB gzipped |
| CSS total | under 25 KB gzipped |
| JS per page | **0 KB** by default; hard cap 5 KB gzipped first-party |
| Fonts | max 5 WOFF2 files, under 100 KB total, `font-display: swap`, preload only the heading and body files used above the fold, use `size-adjust`/fallback metrics to avoid layout shift |
| Hero or LCP image | under 100 KB, `fetchpriority="high"`, `loading="eager"`, explicit width/height |
| Other images | AVIF/WebP, lazy loaded, explicit width/height, under 60 KB each where possible |
| Total page weight | under 300 KB for text pages (excluding optional video), under 500 KB for the heaviest page |
| Requests | under 20 per page on first load |
| Third parties | GA4 (deferred) and optionally Clarity (deferred). Nothing else |

Prefer CSS shapes, inline SVG and gradients-free flat color blocks over photographs. Avoid stock photos entirely. No autoplay video.

## 6. Delivery configuration

- `astro.config.mjs`: set `site` to the production URL, `output: 'static'`, `trailingSlash: 'never'`, `build: { format: 'file' }` (matches Cloudflare Pages clean URLs), `compressHTML: true`, sitemap integration, and image service defaults. After deploy, verify with `curl -I` that `/about` returns 200 directly and `/about/` redirects once to `/about`, with no redirect chains.
- `public/_headers` (Cloudflare Pages):

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```

- Enforce one canonical host (non-www or www, pick one) with a 301 from the other, and HTTPS only.
- HTML pages: short cache with revalidation. Hashed assets: immutable one-year cache.

## 7. Coding conventions

- TypeScript strict. No `any` without a comment.
- Astro components only. Props typed with `interface Props`.
- One `<h1>` per page, set in the page file (not the layout).
- Semantic HTML first: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `details/summary` for FAQs and disclosure.
- Class naming: simple BEM-like (`.card`, `.card__title`) or scoped styles. No utility-class frameworks.
- Colors, spacing, type sizes only from design tokens in `tokens.css`. No hard-coded hex values in components.
- Links: descriptive anchor text (never "click here"). External links get `rel="noopener"`; add `nofollow` only for untrusted or paid links.
- Every image needs `alt` text (empty `alt=""` only for decorative images), width, height.
- Commit small, with clear messages (`feat:`, `fix:`, `perf:`, `seo:`, `content:`).

## 8. Pages to build

| Route | Purpose | Primary keyword theme |
|---|---|---|
| `/` | Brand, services overview, proof, CTA | Findable, SEO AEO GEO agency |
| `/services` | Overview of the three services and web dev | SEO, AEO and GEO services |
| `/services/seo` | SEO service | SEO services for local and e-commerce brands |
| `/services/aeo` | AEO service | answer engine optimization services |
| `/services/geo` | GEO service | generative engine optimization agency |
| `/services/website-development` | SEO-first websites | SEO-friendly website development |
| `/industries/local-businesses` | Local SEO and Google Business Profile | local SEO for small businesses |
| `/industries/d2c-brands` | D2C growth through search and AI | SEO for D2C brands |
| `/industries/ecommerce-brands` | Product, category and store SEO | e-commerce SEO services |
| `/free-audit` | Lead magnet landing page with form | free SEO audit |
| `/case-studies` and `/case-studies/findable-30-day-build` | Proof: how Findable's own site was built and grew | |
| `/blog` and posts | Topical authority (AEO/GEO guides) | what is AEO, what is GEO, etc. |
| `/about` | Entity and trust page (founder, mission, approach) | |
| `/contact` | Contact form, email, service area | |
| `/thank-you` | Form success (noindex, excluded from sitemap) | |
| `/privacy`, `/terms` | Legal | |
| `/404` | Helpful not-found page with links | |

## 9. Placeholders (never invent these)

Use these exact tokens in `src/config/site.ts` and content. Do not guess values.

```
TODO_LEGAL_NAME, TODO_FOUNDER_NAME, TODO_EMAIL, TODO_PHONE,
TODO_CITY, TODO_STATE, TODO_COUNTRY, TODO_SERVICE_AREAS,
TODO_LINKEDIN_URL, TODO_X_URL, TODO_INSTAGRAM_URL, TODO_YOUTUBE_URL,
TODO_GBP_URL, TODO_DOMAIN, TODO_GA4_ID
```

If a service-area business hides its address, omit `streetAddress` from schema and show only the city, region and country.

## 10. Content rules

- Follow the voice in BRAND.md: plain language, short sentences, direct, honest.
- Never promise guaranteed rankings or traffic.
- Explain AEO and GEO in plain terms the first time they appear on any page.
- Every page: one clear primary CTA ("Get your free audit") and one secondary (contact).
- Do not publish fake testimonials, fake logos or fake numbers. Use `TODO:` markers instead, and list them in the final summary.
- Each service page needs: who it is for, the problem, what is included, process, deliverables, FAQs (visible on the page), and a CTA.

## 11. Definition of done (check before finishing any task)

- [ ] `pnpm build` and `astro check` pass with zero errors and zero warnings
- [ ] All pages meet the performance budgets (run Lighthouse mobile)
- [ ] Each page has a unique title (under about 60 characters), unique meta description (about 150 characters), canonical, one H1
- [ ] JSON-LD validates (Rich Results Test and validator.schema.org)
- [ ] `robots.txt` and `sitemap-index.xml` resolve and are correct
- [ ] No broken internal links; no redirect chains; no orphan pages
- [ ] Images have alt, width, height, modern formats
- [ ] Contrast and keyboard navigation checked
- [ ] No `TODO:` text leaks into production pages unintentionally (list all remaining TODOs in the summary)
- [ ] A short changelog of what was done and what the owner must still provide

## 12. How to work

1. Plan briefly, then build in small, reviewable steps.
2. After each step, run the build and fix issues before moving on.
3. Ask the owner a question only when blocked by a missing business fact; otherwise use a `TODO:` placeholder and continue.
4. Finish every task with a summary: files changed, checks run, open TODOs.

