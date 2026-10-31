# SEO.md: Findable technical SEO, AEO and GEO specification

> This website sells SEO, AEO and GEO, so it must be a perfect example of all three. Every rule here is mandatory unless marked optional. Platform behavior changes; when a rule depends on a search engine or AI platform policy, re-check the official documentation before finalizing.

## 1. Goals

1. Fully crawlable and indexable by Google and Bing within days of launch.
2. Every page has a clear purpose, a target query and unique metadata.
3. Content and markup that machines can parse: semantic HTML, structured data, direct answers.
4. Consistent brand entity across the site, schema, Google Business Profile and social profiles.
5. Core Web Vitals in the green on mobile.

## 2. Rendering and crawlability

- **Static HTML output.** All content (headings, copy, links, FAQs, schema) is in the initial HTML. Never hide primary content behind JS, tabs that need JS, or lazy-loaded text.
- **Real links.** Navigation and internal links are `<a href>` elements with crawlable URLs. No `onclick` navigation, no hash-only routes.
- **No blocking of resources.** Do not block CSS, JS or images in robots.txt.
- **Clean URLs:** lowercase, hyphen-separated, short, readable, no query parameters for content pages, no file extensions, no dates in URLs. Example: `/services/geo`, `/blog/what-is-aeo`.
- **One canonical URL per page.** Use no trailing slash everywhere (`trailingSlash: 'never'`). The canonical host is `https://TODO_DOMAIN` (choose www or non-www, redirect the other with 301). HTTP redirects to HTTPS with a single 301.
- **Status codes:** 200 for pages, 301 for permanent moves, 404 (real 404 status, not a soft 404) for missing pages, 410 optional for removed. No redirect chains.
- **Internal linking:** every indexable page reachable within 3 clicks from the homepage and linked from at least one other page (no orphans). Use descriptive anchor text.
- **Pagination (blog index):** if paginated, use crawlable links (`/blog/page/2`), self-referencing canonicals. Do not use infinite scroll.

## 3. robots.txt

Create `src/pages/robots.txt.ts` so the sitemap URL always matches the configured site:

```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://TODO_DOMAIN');
  const body = [
    '# Findable robots.txt',
    '# All crawlers (search engines and AI search bots) are welcome.',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', base).href}`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
```

Rules:

- A single `User-agent: *` group with `Allow: /` already permits Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot and others. Do **not** add per-bot groups unless the owner decides to block a specific bot (a bot with its own group ignores the `*` group).
- **Never `Disallow` a page that uses `noindex`.** Crawlers must be able to fetch the page to see the noindex tag. Use `noindex` on `/thank-you` instead of blocking it.
- Do not use robots.txt to hide pages from search. It controls crawling, not indexing.
- Business decision for the owner: whether to allow AI **training** crawlers (such as GPTBot) in addition to AI **search** crawlers (such as OAI-SearchBot). Findable allows both by default because visibility in AI answers is the goal.
- Verify at `/robots.txt` after deploy and test in Google Search Console.

## 4. XML sitemap

- Use `@astrojs/sitemap`. Output: `/sitemap-index.xml` and `/sitemap-0.xml`.
- Include only canonical, indexable, 200 pages. Exclude `/thank-you`, `/404` and any `noindex` page (use the integration's `filter` option).
- `lastmod` must reflect the **real** last meaningful update (use content frontmatter `updatedDate` or file modified date). Never fake `lastmod`. Google ignores `priority` and `changefreq`, so omit them.
- Reference the sitemap in robots.txt and submit it in Google Search Console and Bing Webmaster Tools.
- Optional: separate `sitemap-blog` is unnecessary at this size; keep one sitemap until above 1,000 URLs.

Example configuration:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://TODO_DOMAIN',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you') && !page.includes('/404'),
    }),
  ],
});
```

## 5. Head tags (BaseHead component)

Every page renders, from one `BaseHead.astro`:

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content="{description}" />
<link rel="canonical" href="{canonicalURL}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="theme-color" content="#0B0B0C" />

<!-- Favicons -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Open Graph -->
<meta property="og:type" content="website|article" />
<meta property="og:site_name" content="Findable" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:url" content="{canonicalURL}" />
<meta property="og:image" content="{absoluteOgImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="{ogImageAlt}" />
<meta property="og:locale" content="en_US" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />

<!-- Blog feed -->
<link rel="alternate" type="application/rss+xml" title="Findable blog" href="/rss.xml" />
```

Rules:

- `noindex` pages (`/thank-you`) set `<meta name="robots" content="noindex, follow">` instead and are excluded from the sitemap.
- Do **not** add `meta keywords` (ignored by search engines).
- `lang="en"` on `<html>`. Single-language site, so no `hreflang` is needed. Add hreflang only if translated versions are created later.
- Canonical URLs are absolute, built from `Astro.site`, with no trailing slash, no query strings and no tracking parameters.
- Titles: unique, about 50 to 60 characters, primary keyword near the start, brand at the end (` | Findable`). Descriptions: unique, about 140 to 155 characters, written as a benefit-led sentence with a soft CTA.
- Article pages also output `article:published_time` and `article:modified_time`.

### Page-by-page titles (write matching descriptions that follow the rules above)

| Route | Title |
|---|---|
| `/` | Findable \| SEO, AEO and GEO Agency for Local and D2C Brands |
| `/services` | SEO, AEO and GEO Services \| Findable |
| `/services/seo` | SEO Services for Local, D2C and E-commerce Brands \| Findable |
| `/services/aeo` | Answer Engine Optimization (AEO) Services \| Findable |
| `/services/geo` | Generative Engine Optimization (GEO) Agency \| Findable |
| `/services/website-development` | SEO-Friendly Website Development \| Findable |
| `/industries/local-businesses` | Local SEO and Google Business Profile Help \| Findable |
| `/industries/d2c-brands` | SEO and AI Search for D2C Brands \| Findable |
| `/industries/ecommerce-brands` | E-commerce SEO Services for Online Stores \| Findable |
| `/free-audit` | Free SEO, AEO and GEO Audit \| Findable |
| `/case-studies` | SEO and AI Visibility Case Studies \| Findable |
| `/blog` | SEO, AEO and GEO Blog \| Findable |
| `/about` | About Findable \| SEO, AEO and GEO Agency |
| `/contact` | Contact Findable \| SEO, AEO and GEO Agency |

## 6. Structured data (JSON-LD)

Implementation:

- Build all JSON-LD in `src/lib/schema.ts` and output it through `JsonLd.astro` as `<script type="application/ld+json">`, server-rendered into the HTML.
- Use one `@graph` per page with stable `@id` values so entities link together (`https://TODO_DOMAIN/#organization`, `/#website`, `/#founder`, and page-level `#webpage`/`#service`).
- Schema must match visible content. Never mark up content that users cannot see. No fake `aggregateRating`, `review`, prices or addresses.
- Validate every template with the Google Rich Results Test and validator.schema.org.

### 6.1 Site-wide entities (output on every page)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://TODO_DOMAIN/#organization",
      "name": "Findable",
      "alternateName": "Findable Agency",
      "url": "https://TODO_DOMAIN/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://TODO_DOMAIN/logo-512.png",
        "width": 512,
        "height": 512
      },
      "image": "https://TODO_DOMAIN/og-default.jpg",
      "description": "Findable is an SEO, AEO and GEO agency helping local, D2C and e-commerce brands get found on Google and cited by AI tools.",
      "email": "TODO_EMAIL",
      "telephone": "TODO_PHONE",
      "founder": { "@id": "https://TODO_DOMAIN/#founder" },
      "areaServed": ["TODO_COUNTRY", "Worldwide"],
      "knowsAbout": [
        "Search engine optimization",
        "Answer engine optimization",
        "Generative engine optimization",
        "Local SEO",
        "E-commerce SEO",
        "SEO-friendly web development"
      ],
      "sameAs": [
        "TODO_LINKEDIN_URL",
        "TODO_X_URL",
        "TODO_INSTAGRAM_URL",
        "TODO_YOUTUBE_URL",
        "TODO_GBP_URL"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://TODO_DOMAIN/#website",
      "url": "https://TODO_DOMAIN/",
      "name": "Findable",
      "description": "SEO, AEO and GEO for local, D2C and e-commerce brands.",
      "publisher": { "@id": "https://TODO_DOMAIN/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": "Person",
      "@id": "https://TODO_DOMAIN/#founder",
      "name": "TODO_FOUNDER_NAME",
      "jobTitle": "Founder",
      "url": "https://TODO_DOMAIN/about",
      "worksFor": { "@id": "https://TODO_DOMAIN/#organization" },
      "sameAs": ["TODO_LINKEDIN_URL"]
    }
  ]
}
```

Notes:
- If Findable is a service-area business with a hidden address, **omit** `address`. If a public address exists, add a `PostalAddress` that matches Google Business Profile exactly (name, address, phone).
- Remove any `sameAs` entry that is still a TODO.
- Do not add `SearchAction` unless the site gets a real search feature.

### 6.2 Per-page schema

| Page type | Add to the graph |
|---|---|
| Every page | `WebPage` (with `isPartOf` the WebSite, `about`/`primaryImageOfPage` where relevant) and `BreadcrumbList` (except the homepage) |
| Home | `WebPage` + site-wide entities |
| Service page | `Service` (see below) + `FAQPage` if FAQs are visible |
| Industry page | `Service` (audience set) + `FAQPage` if visible |
| About | `AboutPage` + `Person` details |
| Contact | `ContactPage` |
| Blog post | `BlogPosting` + `BreadcrumbList` (+ `FAQPage` only if the post has a visible FAQ section) |
| Case study | `Article` (or `BlogPosting`) with `about` |
| Blog index | `CollectionPage` / `Blog` |

**Service example**

```json
{
  "@type": "Service",
  "@id": "https://TODO_DOMAIN/services/geo#service",
  "name": "Generative engine optimization (GEO)",
  "serviceType": "Generative engine optimization",
  "description": "GEO helps your brand get mentioned and cited by AI tools such as ChatGPT, Gemini, Perplexity and Copilot.",
  "url": "https://TODO_DOMAIN/services/geo",
  "provider": { "@id": "https://TODO_DOMAIN/#organization" },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Local businesses, D2C brands and e-commerce brands"
  }
}
```

**BlogPosting example**

```json
{
  "@type": "BlogPosting",
  "@id": "https://TODO_DOMAIN/blog/what-is-aeo#article",
  "headline": "What is answer engine optimization (AEO)?",
  "description": "{meta description}",
  "image": ["https://TODO_DOMAIN/blog/what-is-aeo-og.jpg"],
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-01",
  "author": { "@id": "https://TODO_DOMAIN/#founder" },
  "publisher": { "@id": "https://TODO_DOMAIN/#organization" },
  "mainEntityOfPage": "https://TODO_DOMAIN/blog/what-is-aeo",
  "inLanguage": "en"
}
```

**BreadcrumbList example**

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TODO_DOMAIN/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://TODO_DOMAIN/services" },
    { "@type": "ListItem", "position": 3, "name": "GEO", "item": "https://TODO_DOMAIN/services/geo" }
  ]
}
```

**FAQPage**

- Only when the same questions and answers are visible on the page, word for word.
- Google now shows FAQ rich results for very few sites, so treat this markup as a machine-readable structure aid for AEO and GEO, not as a rich-result tactic.
- Do not add `HowTo` markup for rich results (Google no longer shows them).

## 7. On-page content rules (SEO + AEO)

### Headings
- One `<h1>` per page containing the primary topic. Logical `h2` to `h3` hierarchy. Headings describe the content below; many are phrased as real questions customers ask.

### Answer-first structure (AEO)
- Under each question-style heading, give a **direct answer in the first 40 to 60 words**, then expand with details, steps, examples.
- Use lists for steps and options, tables for comparisons, short paragraphs (2 to 4 sentences).
- Define key terms in plain language the first time (AEO, GEO).
- Add a visible FAQ section (5 to 8 real questions) to every service and industry page.
- Add "last updated" dates on blog posts and update them only when content genuinely changes.

### Entity clarity (GEO)
- State who Findable is, what it does, who it serves and where, in the same wording on Home, About, footer, schema, GBP and social bios.
- The About page names the founder, shows credentials and links to LinkedIn and other profiles.
- Reference authoritative sources and link to them where facts are stated. Prefer original data, real screenshots, tests and opinions from experience over generic text.
- Keep a consistent brand name (`Findable`) and descriptor line everywhere.

### Content quality
- Written for people first. No keyword stuffing, no thin or duplicated pages, no AI filler without human editing and real expertise.
- No fabricated stats, case studies or testimonials.
- Every page includes at least 3 relevant internal links with descriptive anchors and links out to credible external sources where useful.

## 8. Keyword and page mapping

One primary topic per page; avoid cannibalization.

| Page | Primary topic | Secondary topics |
|---|---|---|
| `/` | Findable, SEO AEO GEO agency | get found on Google and AI |
| `/services/seo` | SEO services | technical SEO, local SEO, content SEO |
| `/services/aeo` | answer engine optimization | featured snippets, People Also Ask, AI Overviews |
| `/services/geo` | generative engine optimization | ChatGPT visibility, Perplexity citations, AI search |
| `/services/website-development` | SEO-friendly website development | fast websites, Core Web Vitals, schema |
| `/industries/local-businesses` | local SEO | Google Business Profile, map pack |
| `/industries/d2c-brands` | SEO for D2C brands | content and AI visibility for D2C |
| `/industries/ecommerce-brands` | e-commerce SEO | product and category page SEO |
| `/free-audit` | free SEO audit | AI visibility audit |

### Starter blog plan (topical authority)

1. `/blog/what-is-aeo` (What is answer engine optimization?)
2. `/blog/what-is-geo` (What is generative engine optimization?)
3. `/blog/aeo-vs-geo-vs-seo` (Differences and what to do first)
4. `/blog/how-to-get-cited-by-chatgpt` (Practical GEO steps)
5. `/blog/optimize-for-google-ai-overviews` 
6. `/blog/technical-seo-checklist-for-developers`
7. `/blog/schema-markup-guide-for-aeo-and-geo`
8. `/blog/how-we-built-findable-for-search` (links to the case study)

Each post links to the relevant service page, and service pages link back to supporting posts.

## 9. Images and media SEO

- Descriptive, lowercase, hyphenated filenames. Meaningful `alt` text (describe the image for the user; include a keyword only where natural).
- AVIF/WebP via `astro:assets`; explicit dimensions; lazy loading below the fold; LCP image eager with `fetchpriority="high"`.
- Provide a default OG image and, for blog posts, a post-specific OG image (1200 x 630).
- Logo for schema: at least 112 x 112 px, crawlable, not blocked.
- Include images in the sitemap only if they are important and not otherwise discoverable (optional).

## 10. Performance as an SEO requirement

Targets are in AGENT.md section 5. Key points for SEO:

- Core Web Vitals on mobile: LCP under 2.5 s (target 2.0 s), INP under 200 ms, CLS under 0.1 (target 0.05).
- No render-blocking third-party scripts. GA4 and Clarity load after the `load` event or first interaction.
- Preload the primary fonts and the LCP image only. Preconnect to nothing unless a third party is truly needed.
- Use HTTP caching headers and a CDN.
- Test on real mobile conditions (PageSpeed Insights field data once available, Lighthouse lab data before that).

## 11. Indexing workflow

### Before launch
- [ ] `site` URL set; canonical host decided; HTTPS enforced
- [ ] No staging `noindex` or password protection left on production
- [ ] robots.txt and sitemap reachable
- [ ] All metadata and schema validated
- [ ] Redirects tested (http to https, www to non-www or reverse, trailing slash)

### Launch day
1. Add and verify the property in **Google Search Console** (DNS verification) and submit `sitemap-index.xml`.
2. Add and verify **Bing Webmaster Tools** (import from Search Console), submit the sitemap. Bing's index feeds several AI tools, so this matters for GEO.
3. Use **URL Inspection, Request Indexing** for the home page and each key page.
4. Set up **IndexNow** (optional but recommended): generate a key, host `https://TODO_DOMAIN/{key}.txt`, and ping `https://api.indexnow.org/indexnow` with changed URLs on each deploy (a small post-build script or CI step).
5. Create and verify the **Google Business Profile**; link the website with a UTM-tagged URL; make the NAP match the site.
6. Connect GA4 and Search Console to Looker Studio for a simple dashboard.

### Ongoing
- Weekly: check the Search Console Pages report (indexing), Performance report (queries, clicks), and Core Web Vitals.
- Fix "Crawled, currently not indexed" and "Discovered, currently not indexed" pages by improving content and internal links, then request indexing.
- Monthly: run an AI visibility test (see section 13) and a Screaming Frog crawl.
- Update `lastmod` and visible "updated" dates only for real updates.

## 12. Optional: llms.txt

- Optional low-cost file at `/llms.txt` listing the most important pages with one-line descriptions in Markdown.
- It is a community proposal, **not** a confirmed ranking or citation factor for major search engines. Do not spend significant effort on it, and do not describe it to clients as a ranking factor.

## 13. AI visibility tracking (GEO measurement)

- Maintain a spreadsheet of 20 to 30 test prompts (for example, "best GEO agency for SaaS", "what is answer engine optimization", "who can help my local business rank in ChatGPT", "what is Findable agency").
- Monthly, run them in ChatGPT (with search), Perplexity, Gemini, Copilot and Google (check AI Overviews). Record whether Findable is mentioned, whether the site is cited, which competitors or sources appear instead, and screenshots.
- In GA4, track referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com` and similar.
- Remember answers vary between runs: report trends, not single screenshots.

## 14. Analytics and privacy

- GA4 via `gtag.js` loaded with `async` after page load (or on first user interaction). Pull the ID from `PUBLIC_GA4_ID`; skip the script entirely if it is not set.
- Optional Microsoft Clarity loaded the same way.
- Include a privacy page describing analytics and form data. For international visitors, add a lightweight consent notice (small, no heavy library) that gates analytics where legally required, and keep it from causing layout shift.
- Use UTM parameters only on external links (for example, GBP and social profiles), never on internal links.

## 15. Common mistakes to avoid

- Leaving `noindex` or `Disallow: /` from staging on production.
- Blocking `noindex` pages in robots.txt.
- Client-side-only rendering for important content.
- Duplicate content through www/non-www, trailing slash, or `index.html` variants.
- Multiple H1s, or an H1 missing from the page.
- Schema that does not match visible content, or fake reviews and ratings.
- Large unoptimized images, and layout shift caused by fonts or images.
- Orphan pages, and anchor text like "click here".
- Promising guaranteed rankings in copy.
- Keyword-stuffed titles, or the same title or description on multiple pages.

## 16. SEO acceptance checklist (run before every release)

- [ ] Every indexable page: unique title, meta description, canonical, one H1, correct heading order
- [ ] robots.txt correct; sitemap lists only indexable canonical URLs with real `lastmod`
- [ ] JSON-LD valid on every template; matches visible content
- [ ] Open Graph and Twitter tags present and image resolves
- [ ] No broken links, no redirect chains, no soft 404s; 404 page returns status 404
- [ ] Images: alt text, dimensions, modern formats, lazy loading below the fold
- [ ] Lighthouse mobile 95+ on Performance, Accessibility, Best Practices, SEO
- [ ] Core Web Vitals within targets
- [ ] Page content visible with JavaScript disabled
- [ ] Brand name, descriptor, contact details consistent across site, schema, GBP and social profiles

