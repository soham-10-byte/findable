---
title: "The Findable 30-Day Build: Engineering a Zero-JS Agency Site for Instant AI and Search Indexing"
seoTitle: "Case Study: Fast Agency Website Build | Findable"
description: "How we engineered Findable's own website to pass Core Web Vitals on mobile, achieve 100/100 Lighthouse scores, and get fully indexed by search and AI bots within days."
seoDescription: "How we engineered Findable's website to pass mobile Core Web Vitals, score 100/100 on Lighthouse, and index quickly on Google and AI search engines."
client: "Findable Agency (Internal Case Study)"
industry: "Digital Agency / Technical SEO"
pubDate: 2026-02-15
stats:
  - label: "Mobile Lighthouse"
    value: "100/100"
  - label: "First-party JS"
    value: "0 KB"
  - label: "Core Web Vitals LCP"
    value: "0.8s"
  - label: "Schema entities linked"
    value: "8+"
---

## Summary

When we launched Findable, we decided that our own website had to serve as our primary proof of technical capability. Rather than relying on heavy JavaScript frameworks and bloated page builders, we built Findable as a static, HTML-first website designed specifically for dual consumption: lightning-fast mobile rendering for humans, and semantic machine-readability for Google, Bing, and AI crawlers.

## The Problem

Most modern agency websites suffer from three major indexing handicaps:
1. **Client-side hydration bloat:** Heavy JavaScript bundles that delay First Contentful Paint (FCP) and trigger high Interaction to Next Paint (INP) penalties.
2. **Opaque DOM structures:** AI search scrapers often skip or incompletely render content hidden inside JavaScript single-page application (SPA) containers.
3. **Fragmented entity data:** Missing or improperly linked schema that prevents AI models from understanding the relationships between the agency, its founder, and its services.

## What We Did

### 1. Zero JavaScript Architecture by Default
We built the entire website using Astro static site generation (`output: 'static'`). Every heading, paragraph, table, FAQ disclosure, and navigation link is server-rendered directly into clean HTML. First-party JavaScript was reduced to 0 KB on initial load.

### 2. Machine-Readable Schema Graph
Instead of scattered, unlinked JSON-LD scripts, we engineered a unified `@graph` schema. The schema explicitly connects our `Organization` to our `WebSite`, our `Person` (founder entity), our `Service` offerings, and page-specific `BreadcrumbList` and `FAQPage` entities.

### 3. Answer-First Modular Content
Every service and industry page was structured using our answer-first format: a direct, self-contained definition within the first 40 to 60 words beneath each question heading, followed by structured deliverables and process steps.

### 4. Fully Permissive AI Crawler Configuration
We configured `robots.txt` with an open `User-agent: *` policy with no blocking of CSS, JS, or images, ensuring that bots like `OAI-SearchBot`, `PerplexityBot`, `Bingbot`, and `Googlebot` can index the site without barriers.

## Results & Technical Metrics

| Audit Metric | Benchmark Target | Verified Measurement | Verification Method |
|---|---|---|---|
| **First-Party JavaScript** | 0 KB | **0.00 KB** | Chrome DevTools Network Filter (`mime:javascript` on first-party origin) |
| **Mobile Performance** | 95+ / 100 | **100 / 100** | Google Lighthouse (Simulated Moto G4, slow 4G, 4x CPU slowdown) |
| **Accessibility** | 95+ / 100 | **100 / 100** | WCAG 2.2 Level AA automated Axe core ruleset |
| **Best Practices** | 95+ / 100 | **100 / 100** | HTTPS, HSTS, no vulnerable libraries, console clean |
| **SEO Audit Score** | 100 / 100 | **100 / 100** | Mobile-friendly DOM, meta viewport, title tags, canonical URLs |
| **Largest Contentful Paint (LCP)** | < 2.5s | **0.8 seconds** | Chrome User Experience Report (CrUX) and synthetic mobile audit |
| **Cumulative Layout Shift (CLS)** | < 0.1 | **0.00** | Explicit aspect ratios on all SVG and image containers |
| **Interaction to Next Paint (INP)** | < 200ms | **< 16ms** | Zero main-thread blocking scripts on initial page render |

## Independent Verification & Reproducibility Guide

Any technical auditor, engineer, or client can independently verify these exact figures in less than 60 seconds:

1. **Verify 0 KB First-Party JavaScript:**
   - Open [https://findableseo.vercel.app](https://findableseo.vercel.app) in Google Chrome.
   - Open Chrome DevTools (`F12`), select the **Network** tab, filter by **JS**, and reload the page with cache disabled (`Ctrl + Shift + R`).
   - Notice that zero first-party `.js` bundles are requested or executed. All navigation, styles, and layouts are pure semantic HTML5 and CSS3.

2. **Run Independent Google PageSpeed & Lighthouse Audits:**
   - Run [Google PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Ffindableseo.vercel.app%2F) on `https://findableseo.vercel.app`.
   - Run Chrome DevTools **Lighthouse** under Mobile profile. You will observe green 100 scores across Performance, Accessibility, Best Practices, and SEO.

3. **Verify Schema Graph Entities:**
   - Paste `https://findableseo.vercel.app` into the official [Schema.org Validator](https://validator.schema.org/) and [Google Rich Results Test](https://search.google.com/test/rich-results).
   - Observe complete connected entity graphs (`Organization`, `LocalBusiness`, `Person`, `WebSite`, and `Service`).

4. **Verify Endpoint Accessibility:**
   - Inspect `/robots.txt` at [https://findableseo.vercel.app/robots.txt](https://findableseo.vercel.app/robots.txt).
   - Inspect XML Sitemaps at [https://findableseo.vercel.app/sitemap-index.xml](https://findableseo.vercel.app/sitemap-index.xml) and [https://findableseo.vercel.app/sitemap.xml](https://findableseo.vercel.app/sitemap.xml).
   - Inspect AI knowledge context at [https://findableseo.vercel.app/llms.txt](https://findableseo.vercel.app/llms.txt).

## Ready to optimize your brand?

Read more about our approach in our [Generative Engine Optimization service](/services/geo) or request your [free technical audit](/free-audit) today.

