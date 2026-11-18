# AGENTS.md

Read this file first, then only the files your task touches. Reuse the existing blocks, tokens and content types before
creating anything new (owner rule: modular, never patchwork). The design and its reasons are in `docs/redesign/`
(`PLAN.md`, `AUDIT.md`, `RESEARCH.md`, `SKY.md`); the owner's brief is on branch `pc2/remake-brief`
(`docs/remake/BRIEF.md`). Coordination between agents: board `coord/board`, mail tags `site-mail/to-pc1|to-pc2/NNN`.

## Stack

- Next.js 16.4 App Router, React 19.3, TypeScript strict. Cache Components and partial prefetching are on; every page
  is prerendered (`ensureStatic` in `app/[locale]/layout.tsx`). CSS is inlined (`experimental.inlineCss`).
- Tailwind v4 for layout utilities only; the design lives in plain CSS under `styles/` with ANU tokens.
- No UI or animation libraries. Motion is CSS (scroll-driven `view()`/`scroll()` timelines, keyframes) plus a few
  small client islands. WebGL scenes are raw WebGL2 (`scenes/network.ts`) or a compiled bundle (`public/scenes/twin.mjs`).
- `npm` (lockfile present). Node ≥ 22.13 locally (`~/.nvm/versions/node/v22.23.4`), Node 24 in the Docker image.

## Commands

`npm run dev` · `npm run build` · `npm run start` · `npm run lint` · `npm run typecheck` (run a build first so the
route types exist).

## Map

| Path | What |
|---|---|
| `app/[locale]/layout.tsx` | html/body, tier script, font preload, the header and footer (they persist across pages), JSON-LD |
| `app/[locale]/page.tsx` | home story: hero (poster, loop, network scene), first ledger, noise, ziggurat, map, systems, method, rules, notes |
| `app/[locale]/systems/[slug]/page.tsx` | one template for every system: hero, summary, live screen, real material, five chapters with a rail, FAQ, related |
| `app/[locale]/{systems,services,method,about,contact,industries,insights}` | the other pages, all built from the story blocks |
| `app/llms.txt`, `app/llms-full.txt`, `app/robots.ts`, `app/sitemap.ts` | AI readers and search (robots and noindex differ off production) |
| `components/shell/` | header (the ink band, Popover phone menu), footer, motion switch, header-live (active link, language link, pointer light) |
| `components/story/` | the story blocks: hero, chapter + rail, road, lists, FAQ, cards, poster, loop, scene slot, system map, sky pieces, CTA |
| `components/live/` | live screens: `live-screen.tsx` (step model), `kit.tsx` (ANU theme parts), `screens/<slug>.tsx` (one per system) |
| `components/brand/` | logo (inline SVG, Signal blue), dingir, cuneiform signs |
| `lib/content/` | all copy, typed and bilingual: `systems/<slug>.ts` (+ `stars.ts`, `media.ts`, `real-media.json`), `home-story.ts`, `pages.ts`, `shell.ts`, `story-copy.ts`, industries, insights |
| `lib/` | `i18n.ts`, `seo.ts` (JSON-LD graph), `site.ts`, `tier.ts`, `llms.ts`, `contact.ts` |
| `styles/` | `tokens.css` (one source), `fonts.css`, `anu.css`, `shell.css`, `story.css`, `home.css`, `pages.css`, `editorial.css`, `sky.css`, `live.css` |
| `scenes/` | `network.ts` (sky + constellation), `twin.ts` (loads the twin-engine bundle) |
| `scripts/media/import.mjs` | PC1's masters (Forgejo `anu-web-assets`) → web posters, loops and real-media slots |
| `scripts/twin-scene/` | how the twin-engine bundle is rebuilt (its source stays outside this public repo) |
| `public/media/` | web-sized images and loops only; masters never go in git |

## Rules that hold everywhere

- **Content first.** Every page is complete server HTML without JavaScript; nothing waits at `opacity: 0` for a script.
  Motion is added per device tier (`html[data-tier]`: 0 still, 1 CSS motion, 2 + WebGL) and the reader's Motion switch.
- **One design language** (the anu_theme one): ink band with a 3px Signal edge, Signal blue only (#2563EB), bone and
  paper, radius 0, hairlines, square status glyphs, pointer light, focus/recede, the night sky (`.anu-sky`,
  `.anu-night` remaps the tokens for a whole section).
- **Arabic first.** Logical properties only; numbers, codes and phones stay LTR (`.anu-num`); never animate Arabic per
  letter; check every change in `/ar`.
- **Public repo.** No client, shop or person names, no prices, no vendor names, no internal codes, no secrets.
- **Budgets** (mobile, slow 4G): Lighthouse performance ≥ 93, LCP ≤ 2.5 s, CLS ≈ 0; posters ≤ 60 KB at 800 w;
  loops ≤ 600 KB; no new JS library on first load.
- **Commits** are plain, author Silete1, no AI attribution lines.

## Hosting and Deploy

- Production today: Vercel (anu.ltd → www.anu.ltd). Moving to ANU's Hetzner server `anu-cloud-01`, owner request
  18 Nov 2026.
- Self-hosting lives in `deploy/`: Docker image (`output: "standalone"`), compose project `anu-website` behind Coolify's
  Traefik, host rule in `deploy/hosts`. Runbook, secrets and the DNS switch: `deploy/README.md`.
- Deploy: `bash deploy/deploy.sh` (committed HEAD only, one SSH connection), run by Claude PC1 only. PC2 asks by mail
  "STAGE <sha>". Staging: https://site.brain.anu.ltd/en (noindex).
- Secrets are only on the server in `~/anu-website/site.env`, never in git.
- Remotes: `origin` = Forgejo `git.brain.anu.ltd`, `github` = GitHub `Silete1/vebanu` (public; Vercel builds `main`).
  `pc2/*` branches stay on Forgejo until the owner reviews.
