---
title: "The Findable 30-Day Build: Engineering a Zero-JS Agency Site for Instant AI and Search Indexing"
description: "How we engineered Findable's own website to pass Core Web Vitals on mobile, achieve 100/100 Lighthouse scores, and get fully indexed by search and AI bots within days."
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

- **Performance:** Perfect 100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.
- **Speed:** Largest Contentful Paint (LCP) measured under 1.0 second on throttled mobile connections.
- **Indexation:** 100% of canonical URLs indexed with zero soft-404 or redirect chain errors.
- **AI Citations:** Clean text extraction enabled seamless answers across Perplexity and ChatGPT Search tests.

## Ready to optimize your brand?

Read more about our approach in our [Generative Engine Optimization service](/services/geo) or request your [free technical audit](/free-audit) today.

