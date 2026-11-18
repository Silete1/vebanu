# anu.ltd redesign — plan

Branch `pc2/web-redesign` (from `hosting/hetzner`). Audit: `docs/redesign/AUDIT.md`. Content catalog:
`docs/redesign/CATALOG.md`. Design research: `docs/redesign/RESEARCH.md`.

## What the owner asked for (18 Nov)

A site that is an art piece in ANU's own design language — the modules, the Brain, the systems — and explains, in
animated story pages, everything ANU builds and how it is implemented; more information than before; 3D (Blender);
AI-readable; works on every phone and screen; very fast on weak devices and slow networks: instant first render, fast
page changes, animations that hold up everywhere.

## Principles

1. **Content first, motion second.** Every page is complete, readable and correct as server HTML with no JavaScript.
   Nothing starts at `opacity: 0` waiting for a script. Motion is layered on by device tier.
2. **One design language**, the one `anu_theme` carries (`Silete1/anu` `docs/anu-theme/DESIGN.md`): ink `#090B11`,
   one accent Signal `#2563EB`, white paper on a bone desk `#F8FAFC`, slate neutrals, hairlines, radius 0, the ink band
   closed by a 3px Signal edge, the square status glyphs, the pointer light, focus/recede, the line network as the only
   texture, Anu Sans (Inter Tight + Tajawal by unicode range) and Anu Mono for figures. One token source.
3. **Modular, never patchwork** (owner rule). Pages are compositions of a small set of story blocks driven by typed
   content files. A product page is a content file, not a new component tree.
4. **Proof, not claims.** Lighthouse and WebPageTest numbers before and after; screenshots at 360, 768, 1280, 1920 in
   both languages.

## Information architecture (per locale `/en`, `/ar`)

| Route | What it tells |
|---|---|
| `/` | The story of ANU in one scroll: noise → control; what ANU does; the system map; products; method; industries; proof; field notes; contact |
| `/systems` | The ANU system map ("the Brain"): Odoo at the core, ANU's modules and products around it, each a door to its story |
| `/systems/[slug]` | One story page per product or module family (see CATALOG) |
| `/services` | Process redesign, Odoo implementation, migration and opening balances, data import, training, support, hosting |
| `/method` | How ANU works: map, design, build, prove, run — with the owner's rules as the working standard |
| `/industries`, `/industries/[slug]` | Kept, restyled, linked to the systems each industry uses |
| `/insights`, `/insights/[slug]` | Kept, restyled ("Field notes") |
| `/about`, `/contact` | Who ANU is; the assessment form, WhatsApp, phone |
| `/llms.txt`, `/llms-full.txt` | Plain-text map and full text for AI readers, generated from the same content files |

## Story blocks (the only building pieces)

Server components unless noted; each takes typed content and a locale.

- `InkBand` — the character: ink strip, 3px Signal edge, the subject large and light, optional figures and actions.
- `Chapter` — a numbered section with a glyph that fills as it is read (outline → half → solid blue → solid ink).
- `StoryHero` — headline, lede, poster image (always) and an optional scene (tier-gated, client island).
- `Flow` — an animated SVG diagram of how something works (nodes, lines, glyphs), labelled text in the DOM.
- `Steps` — the method road: stages as glyphs along a line, like the theme's status bar.
- `Facts` — up to four figures in Anu Mono.
- `Screens` — real product screens in a device frame, AVIF/WebP, lazy.
- `Inside` — the implementation: modules, data model, tech, as a list with glyphs.
- `Faq` — `<details>` list; emits `FAQPage` JSON-LD.
- `NextDoor` — the next story, with the band's edge as the link.
- `SystemMap` — the Brain map (SVG, every node a link with a label).

## Motion and 3D by device tier

Decided on the device at load (`lib/tier.ts`), stored as `html[data-tier]`, never blocking render:

| Tier | Who | What moves |
|---|---|---|
| 0 | `prefers-reduced-motion`, `Save-Data`, 2G/3G, `deviceMemory` ≤ 2 | nothing beyond hover states; posters only |
| 1 | default phones and tablets | CSS scroll-driven reveals (`animation-timeline: view()` where supported), SVG line draws, glyph fills, View Transitions between pages |
| 2 | desktop and strong phones on fast links | tier 1 + WebGL scenes (procedural line network, glTF/meshopt/KTX2 from Blender) loaded on idle and on visibility; short AV1/H.264 loops instead of where a scene would be too heavy |

Rules: no animation library on first load; any scene code is a dynamic import behind the tier and an
IntersectionObserver; one scene alive at a time; DPR capped at 1.5; pause off-screen and on `visibilitychange`.

## Performance budget (mobile, slow 4G, mid phone)

| | Budget | Today |
|---|---|---|
| LCP | ≤ 1.8 s | 3.6 s |
| TBT | ≤ 150 ms | 590 ms |
| CLS | ≤ 0.02 | 0 |
| JS on first load (br) | ≤ 130 KB | ≈ 300 KB |
| CSS (br) | ≤ 25 KB | 27 KB |
| Page weight before interaction | ≤ 350 KB | 4,842 KB |
| Lighthouse performance | ≥ 95 | 71 |

## AI readability

`llms.txt` and `llms-full.txt`; JSON-LD per page (`Organization`, `WebSite`, `BreadcrumbList`, `Service`,
`SoftwareApplication`, `FAQPage`, `Article`); robots welcome named AI crawlers; every figure and diagram has its words
in the DOM; hreflang en/ar; sitemap with every story.

## Security

Strict CSP with nonces, honeypot + timing on the form, trusted proxy for the client IP, self-hosted images, no
third-party scripts.

## Phases

1. Foundation: tokens, fonts, tier detection, shell (header as the context band, footer), story blocks, CSP.
2. Home and the system map.
3. Story pages: one template, one content file per product (parallel lanes, one file set each).
4. Services, method, about, contact; restyle industries and insights onto the blocks.
5. 3D: Blender scenes → posters, loops and glTF; the procedural network scene.
6. AI layer, sitemap, JSON-LD; CSP; tests (Playwright smoke at 4 widths × 2 languages); Lighthouse budget check.
7. Hand-off to the PC1 hosting session for staging (`site.brain.anu.ltd`) and the owner's review.
