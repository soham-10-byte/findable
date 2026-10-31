# BRAND.md: Findable brand identity

## 1. Brand summary

- **Name:** Findable (lowercase wordmark: `findable`)
- **Tagline:** Be found. Be cited. Be chosen.
- **Descriptor:** SEO, AEO and GEO for local, D2C and e-commerce brands.
- **One-line pitch:** We help brands get found on Google, quoted by AI and chosen by customers.
- **Audience:** Owners and marketers of local businesses, D2C brands and e-commerce stores that are weak in search and want to be visible on Google, maps and in AI answers. Domestic (India) and international.
- **Personality:** Bold, sharp, modern, honest. Technical expertise explained in plain language. Confident, never hypey.

Tagline meaning: **Found** = SEO. **Cited** = AEO and GEO (Google and AI tools quoting you). **Chosen** = the customer picks you.

## 2. Voice and tone

- Plain words over jargon. Explain AEO and GEO the first time on every page.
- Short sentences. Active voice. Verb-first buttons.
- Direct claims backed by specifics. No guarantees of rankings, traffic or revenue.
- Sentence case for headings, buttons, labels. No ALL CAPS except small mono labels.
- Warm, collaborative, a little witty. Never salesy or pushy.
- Avoid: "leverage", "synergy", "cutting-edge", "world-class", "unlock", "revolutionary", "best-in-class", "game-changer".
- Use contractions ("we'll", "you're").

**Examples**
- Good: "Your customers are searching. Make sure they find you."
- Good: "We fix what stops Google and AI tools from understanding your site."
- Bad: "We leverage cutting-edge synergies to unlock explosive growth."

## 3. Colors

Direction: **acid lime on black** is the signature. Neon accents grab attention; olive, sage and mist keep it calm and trustworthy.

| Token | Name | HEX | Use |
|---|---|---|---|
| `--ink` | Ink | `#0B0B0C` | Dark backgrounds, body text |
| `--lime` | Acid lime | `#C8FF2E` | Signature color, highlights, SEO |
| `--paper` | Paper | `#F7F6F0` | Light backgrounds (not pure white) |
| `--cyan` | Electric cyan | `#19E3F5` | AEO, data highlights |
| `--orange` | Neon orange | `#FF5B1F` | GEO, primary CTA buttons |
| `--cobalt` | Cobalt | `#2F4BFF` | Links, trust elements |
| `--olive` | Olive | `#55612B` | Case studies, footer |
| `--sage` | Sage | `#A9B89B` | Cards, dividers, secondary shapes |
| `--mist` | Mist | `#E3E9DA` | Section backgrounds |
| `--red` | Signal red | `#E5372F` | Errors and warnings only |

### Service color coding

- **SEO** = acid lime
- **AEO** = electric cyan
- **GEO** = neon orange

Use these consistently for service tags, icons, charts, cards and section accents.

### Proportion rule

About 60% ink or paper, 30% calm neutrals (sage, mist, olive), 10% neon accents. Neon is a highlight, never the whole page.

### Contrast rules (mandatory)

- Lime and cyan: only as backgrounds with **ink text**, or as text/graphics **on ink**. Never lime or cyan text on paper or white.
- Neon orange: **ink text** on top, not white.
- Cobalt, olive and signal red: white text.
- Body text: ink on paper, or paper on ink. Minimum 4.5:1 for body text, 3:1 for large text and UI components.
- Link color on paper: cobalt with underline. Link color on ink: lime with underline.

### Tokens (copy into `src/styles/tokens.css`)

```css
:root {
  /* color */
  --ink: #0B0B0C;
  --lime: #C8FF2E;
  --paper: #F7F6F0;
  --cyan: #19E3F5;
  --orange: #FF5B1F;
  --cobalt: #2F4BFF;
  --olive: #55612B;
  --sage: #A9B89B;
  --mist: #E3E9DA;
  --red: #E5372F;

  /* semantic */
  --bg: var(--paper);
  --bg-dark: var(--ink);
  --text: var(--ink);
  --text-on-dark: var(--paper);
  --text-muted: #4A4A44;           /* muted text on paper, passes AA */
  --link: var(--cobalt);
  --focus: var(--cobalt);

  /* type */
  --font-heading: "Space Grotesk Variable", "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter Variable", "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

## 4. Typography

All fonts are open source and self-hosted (WOFF2) through `@fontsource`.

| Role | Font | Weights | Use |
|---|---|---|---|
| Headings | **Space Grotesk** | 500, 700 | H1 to H3, big statements, logo wordmark |
| Body | **Inter** | 400, 500 | Paragraphs, UI, forms |
| Labels and data | **JetBrains Mono** | 400 | Small tags, stats, service labels, code-style accents |

### Type scale

| Style | Size / line height | Font and weight |
|---|---|---|
| H1 | `clamp(2.5rem, 5vw + 1rem, 4rem)` / 1.05 | Space Grotesk 700 |
| H2 | `clamp(1.75rem, 2.5vw + 1rem, 2.5rem)` / 1.15 | Space Grotesk 700 |
| H3 | `1.5rem` / 1.25 | Space Grotesk 500 |
| Body | `1.0625rem` (17px) / 1.65 | Inter 400 |
| Small | `0.875rem` / 1.5 | Inter 400 |
| Label | `0.75rem`, uppercase, letter-spacing 0.08em | JetBrains Mono 400 |

### Typography rules

- Headings in sentence case, tight line height, max two lines where possible.
- Highlight **one key phrase per heading** with a lime background block (the signature "highlighter" look): `<mark class="hl">phrase</mark>` styled as lime background, ink text, small radius. Use sparingly, not in every heading.
- Body line length 60 to 75 characters (`max-width: 68ch`).
- Do not introduce any additional font.

### Font loading (performance and SEO)

- Install: `@fontsource-variable/space-grotesk`, `@fontsource-variable/inter`, `@fontsource/jetbrains-mono` (400 only). Import only the Latin subset and the weights used.
- `font-display: swap`. Preload the Space Grotesk and Inter WOFF2 files used above the fold.
- Define a fallback with `size-adjust` so swap causes no layout shift.
- Maximum 5 font files in total.

## 5. Logo

Primary logo: lowercase `findable` in Space Grotesk 700 where the dot of the "i" is replaced by an acid lime circle (a location dot or search target).

Secondary marks (see the Brand Identity Guide for all 10 concepts):

- **Highlighter wordmark:** `find` + `able` on a lime block. Good for headers and social graphics.
- **Lens f monogram:** lowercase "f" inside a circle with a short handle. Favicon and profile photo.
- **Three-dot service mark:** lime, cyan and orange dots before the wordmark. Represents SEO, AEO and GEO.

### Usage rules

- Clear space around the logo equal to the height of the "i" dot.
- Minimum size: wordmark 90 px wide, icon 24 px. Favicon exports: SVG, 32 px, 48 px, plus `apple-touch-icon` 180 px.
- Ink version on paper, mist and lime. Paper version on ink and olive. On photos, place the logo on a solid color block.
- Do not stretch, rotate, add shadows or outlines, or recolor outside the palette.
- Provide SVG logos in `public/` and use inline SVG in the header for speed.
- The same logo file URL goes into Organization schema (`logo`) and must be at least 112 x 112 px, square or close to it, in PNG, SVG or WebP.

## 6. Imagery and graphics

- No stock photography. Use flat color blocks, inline SVG illustrations, UI-style cards, charts, screenshots of real results, and CSS shapes.
- Graphic motifs: highlighter block, search-bar pill, radar ping rings, mono labels, lime dot accents, bracket marks.
- Screenshots of real tools (Search Console, GBP insights, Lighthouse) are the best proof imagery. Compress them and add descriptive alt text.
- Open Graph default image: 1200 x 630, ink background, paper headline, one lime highlight, wordmark. Under 200 KB.

## 7. Social handles and profiles

Use the same logo, bio and handle everywhere.

- Short bio: SEO, AEO and GEO for brands that want to be found. Google. Maps. AI answers.
- Profile image: icon (lens f or stacked tile).
- Link all profiles in the site footer and in Organization schema `sameAs`.

## 8. Quick brand checklist for any new page or asset

- [ ] Uses only tokens from section 3
- [ ] Neon colors used as accents, not as large text on light backgrounds
- [ ] Space Grotesk headings, Inter body, mono only for small labels
- [ ] Copy matches the voice rules
- [ ] No stock photos, no invented proof

