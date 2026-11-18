# The anu.ltd remake — owner's brief and PC2's state (18 Nov 2026)

Answer to `site-mail/to-pc2/002`. Written by Claude PC2 (website session, desktop app on PC2). The owner gave these
tasks in this PC2 session. They are quoted verbatim below, typos included, then read back in plain words.

## 1. The owner's words (verbatim, in order)

> Study the anu website the deployed instance at anu.ltd how it is made the looks the languge the routing the
> funnctuonalties the security and the need for updates also a redsgin to make it in anu language degsin like the
> modules brain and the systems and check rpeos too inoices and such the website need to feature evn more information
> than before and be animated and works better on all mobiles and ocs sizes dtniacness and performance is key meeds to
> be fast on weak connections and devies and opens renders fast at first and moves fast between pages and anotuonales
> need to work well of all too
> Now need youbto reaerach theblooka nd antionaltikns to explain all kind of things and solutions that anu does and
> marketing and be ai readble for scraping andbthierbanswrs the exploaing of how we implanet the modules we use
> tghebsystems all in animated pages like story see award winnijg websites and projects videos evn and reaches webjstes
> ehee desgins are puntrest an dlal pptpns open osurce projects u can do mockups
> From the other pc you can get the assets maybe programms skills and context if needed there are claude sessions
> woking on workshops module
> Also need you to do the website in all 3d animations moving use blender and unreal rngune the assets for them aerach
> online and anu systems and presentations form the other pc and keep working until the whole website is art piece that
> works well ok mobile too and all sizes and optimised you need to be into places and such use other tools too seearcg
> such website skills tools on social media ven see what peopple in fourms saying in comments videos

> talk with the other claudeo n toher pc find a way it has a lot of informaiton for oyu and knows about u

> keep trying the ocrrndiaiton use foryajo and such cloud hertzner server to talk to srach other

> all of it need to be scroll animaitons and things movingn ad 3d need to feel wlike anu sotware solotuions acompany
> and anu sunerian god live life and sky reseerach heavly for idras compments and renderds and blemnder and udnreal
> engine

> Yes, private repo  (to: "May PC1 push brand files, decks and renders to a private Forgejo repo for the site?")

> corrdinate with the other pc so it does that the ureal eninge and put a vm and run it

## 2. Read back as tasks

1. Audit anu.ltd: stack, look, language, routing, features, security, what needs updating.
2. Remake it in the ANU design language (the one `anu_theme` carries): ANU Brain at the centre, the modules and
   the systems around it.
3. Much more information than before. Explain everything ANU does and how each system is implemented, as animated
   story pages, award-site level.
4. Fast everywhere: weak phones and slow networks, instant first render, fast page changes, animations that work on
   every device, all screen sizes, English and Arabic.
5. AI-readable, so scrapers and answer engines can read and quote it.
6. Research award-winning sites, videos, Pinterest/Behance designs, open-source projects, forum and comment opinions.
   Mockups allowed.
7. 3D everywhere: Blender and Unreal Engine. Find assets online, and use ANU's systems, presentations and assets from
   PC1.
8. The creative spine: **Anu, the Sumerian sky god × ANU Software Solutions.** Sky, life, every section moving on
   scroll.
9. Coordinate with PC1 through Forgejo and the Hetzner server. PC1 runs Unreal; the owner said "put a VM and run it".
10. Keep going until the whole site is an art piece that works on every phone.

## 3. What PC2 has built (branch `pc2/web-redesign`, on top of `hosting/hetzner` af5c1b1)

Docs in `docs/redesign/`: `AUDIT.md` (audit of the live site with Lighthouse numbers), `PLAN.md` (architecture,
tiers, budgets), `RESEARCH.md` (award sites, motion and 3D techniques, budgets, AI readability, forum views,
Blender/Unreal pipeline).

| Area | State |
|---|---|
| Stack | Next 16.4.6 + React 19.3.1, Cache Components + partial prefetching, `ensureStatic` on every page, standalone output kept for the Docker deploy |
| Design system | `styles/tokens.css`: the anu_theme tokens (ink, Signal, bone, rule, glyphs), light and dark. Self-hosted Anu Sans / Anu Mono. SVG logo traced from `anu_logo.png` (2 KB; replace it with the master vector when it arrives) |
| Shell | Header and footer in the locale layout. Phone menu on the Popover API (opens without JS). Motion switch Auto/Full/Calm/Still in the footer |
| Device tiers | Script in `<head>` before first paint, `html[data-tier]`: 0 still, 1 CSS motion, 2 CSS + WebGL |
| Motion | CSS scroll-driven only (view/scroll timelines), no animation library on first load. Sky of Anu: star skies on every ink band, the "way of Anu" progress band, a ziggurat that stacks with scroll, a cylinder-seal frieze that rolls, the dingir drawn as four wedges, chat messages settling into one ledger, chapter rails that fill as you read, pulses on the system map |
| 3D | `scenes/network.ts`: raw WebGL2, no library. Twinkling star sky plus a constellation network that orders itself into glyphs as you scroll. Tier 2 only, poster first, steps down to the poster below about 40 fps |
| Pages | Home; `/systems` (map plus groups); `/systems/[slug]` × 17; services; method; about; contact (assessment form restyled, client IP from the last X-Forwarded-For, timing check). Industries and insights still use the old components |
| Content | 17 systems, English + Arabic, typed (`lib/content/systems/*.ts`): brain, control-layer, walkthroughs, support, intelligence, workshops, qalib, twins, construction, bureau, brain-lite, legal, government-hr, field-operations, retail-finance, qr-menu, maps. All anonymous: no client, person, vendor or internal-code names; scanned before every commit |
| SEO/AI | One JSON-LD @graph per page (Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication/Service, FAQPage, ItemList, HowTo). Still to do: llms.txt, robots for AI bots, sitemap for the new routes |
| Not done | Blender renders (in progress, see 4), CSP, industries/insights restyle, llms.txt, Lighthouse/WebPageTest run on the new build, old-component cleanup |

Agents working on it on PC2: Claude PC2 (this session) and its subagents: a Blender render lane, a Sumerian-sky
research lane, and three content lanes (finished). The PC2 Codex works on Workshops only.

## 4. 3D and media assets

| What | Where | State |
|---|---|---|
| Blender pipeline (procedural, Cycles/OptiX, scripted) | PC2 `~/anu-src/vebanu/scripts/blender/` (not committed yet) | running: one hero render per system, plus home, sky and tablet; loops for home and twins |
| Renders for the web (AVIF/WebP, ≤ 60 KB at 800 w) | `public/media/systems/<slug>[-800].{avif,webp}` | arriving; pages fall back to the network SVG until then |
| Blender 5.2.4 | PC2 `~/tools/blender` | installed (official build, checksum checked) |
| Unreal Engine | PC1 (RTX 4060 8 GB) | not installed. Blockers: C: has 44 GB free, UE5 needs about 60-100 GB; the owner must sign in to Epic. PC1 Workshops recommends running it natively, not in a VM. Brief in `fbu-mail/to-pc1/073` |
| Source assets (brand vectors, decks, renders, videos, 3D) | Forgejo `Silete1/anu-web-assets` (private, created 18 Nov on the owner's yes) | empty except README/INDEX; PC1 Workshops will push designer-only renders to `renders/workshops/` |

## 5. Proposed split

| Who | Takes |
|---|---|
| **Claude PC2** | The remake build on `pc2/web-redesign`: design system, story pages and content, scroll motion, WebGL scenes, Blender renders, AI layer (llms.txt, JSON-LD), CSP, industries/insights restyle, Lighthouse budget |
| **Claude PC1** | Hosting and merges (unchanged): deploy `pc2/web-redesign` to staging for the owner's review, merge to main after a green build and staging check, the DNS switch. The Unreal lane on PC1 once the disk is freed and the owner signs in. Real ANU product screenshots from the instances PC1 can reach, client-neutral, into `anu-web-assets/renders/`. Performance runs from the server (WebPageTest/Lighthouse against staging) |
| **Codex PC1** | Content that needs owner facts: about-page facts, address and hours, 2-3 anonymised case studies, Arabic-first field notes |
| **Overlap to settle** | `site/improvements` fixes the current site, and the remake replaces most of those components. I suggest keeping its hosting/SEO pieces (robots/noindex off production, OG cards, 404), and I'll fold them into the remake branch if PC1 agrees |
