# anu.ltd redesign: design, motion, performance and AI-readability research brief

Compiled 2026-11-18 for ANU Software Solutions (Iraq): Odoo ERP implementation plus own products (digital twins of ports and plants, furniture design-to-production, guided walkthroughs, support platform).
Brand constraints: ink `#090B11`, Signal blue `#2563EB` (only accent), bone `#F8FAFC`, radius 0, hairlines, line-network texture, square status glyphs, Inter Tight + Tajawal + Roboto Mono, motion that settles "like a liquid" in 280 ms.
Current codebase checked: `/home/anu/anu-src/vebanu` (Next 16.3.1, React 19.2.4, GSAP 3.15, `output: "standalone"`, `/en` + `/ar` routes, `components/motion/{page-transition,reveal}.tsx`, `components/seo/json-ld.tsx`, `app/robots.ts` allowing `*` and OAI-SearchBot).

Confidence tags: **[P]** primary source (vendor docs, caniuse, spec, studio case study). **[S]** secondary (blog or aggregator). **[U]** unverified or inferred. Awwwards and Codrops pages block automated fetching, so some award details come from search snippets.

---

## 0. TL;DR

1. **Every primitive the site needs is now native.** Scroll-driven animations became Baseline in Oct 2026 (Firefox 159, after Chrome 115 and Safari 26), with ~89% global support. Same-document View Transitions have ~93%. `linear()` easing gives the "liquid settle" curve. Build the motion system in CSS and use JS only where CSS cannot do the job. [P]
2. **Award sites that stay fast follow one pattern.** The DOM owns the content, and one optional WebGL layer adds atmosphere. That layer has GPU tiers, with tier 0 falling back to static images (Shopify Editions '26). GitHub's globe adds a poster first, a crossfade, and FPS-based downgrades. [P]
3. **Iraq is mostly Android on unstable networks.** Android has ~70–81% mobile share (StatCounter). Ookla puts the median mobile download at ~56 Mbps, but browser-based tests show ~15 Mbps, and real-world variance is high. Budget for "slow 4G" (1.6 Mbps, 150 ms RTT, 4× CPU throttle). [S]
4. **Next.js has a JS floor of roughly 150–175 KB gz** (React plus router; a third-party benchmark measured 172 KB gz on a 16.3 static blog). The app's own motion and 3D code must be small and deferred. Text and LCP must never wait for JS. [S]
5. **Upgrade Next 16.3.1 to 16.4 or later.** 16.4 brings React 19.3, where `<ViewTransition>` is stable. It also adds `cacheComponents` + `partialPrefetching` (instant navigations) and `ensureStatic = 'navigation'`, which guarantees marketing routes stay static. [P]
6. **Pre-render the hero 3D for most users.** Use Blender or Unreal output as AV1/H.264 video, AVIF image sequences and posters. Use realtime WebGL only on capable devices and only on product pages. [P/S]
7. **AI crawlers do not run JavaScript** (Vercel/MERJ study). All story text must be in server HTML, never only in canvas or client-injected DOM. [P]
8. **llms.txt is cheap but barely read.** Ahrefs saw 97% of llms.txt files get zero requests, though IDE agents do read them. Ship it along with `.md` alternates of key pages, but put the effort into clear on-page facts, which the GEO paper finds boost answer-engine visibility. [S/P]
9. **FAQ rich results are gone** (Google, May 2026), and HowTo rich results went in 2023. Keep Organization, Service, SoftwareApplication and BreadcrumbList JSON-LD. Keep FAQPage only where real Q&A exists. [S]
10. **Practitioners mostly hate scrolljacking, custom cursors and smooth-scroll libraries on touch.** They praise native scroll and crisp, fast transitions, and they praise restraint. Keep scroll native, and keep the 3D optional.

---

## 1. Reference sites (18)

Format: **Name**, URL, recognition. *Technique* (what makes it great). *Borrow* (for ANU). *Too heavy* (for weak phones).

1. **Igloo Inc**, https://www.igloo.inc. Awwwards Site of the Year and Developer SOTY 2024, by abeto with Bureaux; Webby 2026 Visual Design ([Awwwards](https://www.awwwards.com/annual-awards-2024/site-of-the-year), [Webby](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-visual-design-aesthetic/361001/igloo-inc)) [P].
   *Technique:* one continuous realtime 3D world driven by plain scroll. The text glitch runs as an SDF texture offset in a shader rather than DOM clip-path masks, and the case study calls this far cheaper ([case study](https://awwwards.com/igloo-inc-case-study.html)).
   *Borrow:* do text and line effects on the GPU, not with DOM masks; keep one camera path.
   *Too heavy:* volumetric data and fluid simulation.
2. **Lando Norris**, https://landonorris.com. Awwwards SOTY 2025 + Developer Award, by OFF+BRAND ([Codrops studio story](https://tympanus.net/codrops/2026/08/17/creativity-at-enterprise-scale-without-compromise-the-offbrand-story/)) [P/S].
   *Technique:* a depth-map "2.5D" hero that moves with the cursor, custom shaders, CSS masking and blob-like cursor overlays ([Syntax stack video digest](https://recapio.com/digest/this-website-is-insane-stack-explained-by-syntax)) [S].
   *Borrow:* a depth-map parallax gives a 3D feel from one image plus one grayscale depth map at roughly 1/50 the cost of a model. It suits plant or port photography.
   *Too heavy:* the realtime helmet model.
3. **Messenger (abeto)**, https://messenger.abeto.co. Awwwards SOTY 2025: a tiny-planet mail-delivery game in Three.js ([Korben](https://korben.info/en/abeto-messenger-mail-carrier-mini-planet.html)) [S].
   *Borrow:* the tight scope of one small world. A "mini port" or "mini plant" diorama for the twin product page is the same idea.
   *Too heavy:* it is a game, so the whole thing is too heavy.
4. **Madar** (Saudi logistics platform), https://madarplatform.com/en. Awwwards SOTD + Developer Award, FWA, CSSDA, Webby nominee, 2025; by Vide Infra ([case study](https://videinfra.com/work/madar)) [P].
   *Technique:* fully mirrored Arabic RTL. The homepage is one 3D journey along a glowing road, using custom Three.js shaders for line glow, plus small 3D scenes per capability. **Inner pages use video illustrations** instead of realtime 3D, and GPU effects such as reflections and soft light scale down on weaker devices.
   *Borrow:* this is the closest match to ANU's B2B, Arabic and line-network language. Copy the split of realtime on home and video on inner pages.
   *Too heavy:* realtime reflections on the homepage.
5. **Midwam**, https://www.midwam.com/en. Awwwards, FWA and CSSDA SOTD, by Immersive Garden ([case study](https://immersive-g.com/projects/midwam)) [P].
   *Technique:* mirrored English/Arabic experiences, scroll interactions, sound, and a long-press that intensifies visuals and sound.
   *Borrow:* bilingual parity treated as a design requirement, and long-press "focus" as a deliberate gesture on mobile.
   *Too heavy:* the sound plus 3D layers.
6. **Vallourec** (steel tubes), https://vallourec.imm-g-prod.com/fr. Awwwards, FWA and CSSDA SOTD, by Immersive Garden ([case study](https://immersive-g.com/projects/vallourec)) [P].
   *Technique:* an interactive 3D stadium you zoom into to see where the product sits (the MRV Arena roof). This is the "product in context" pattern for industrial firms.
   *Borrow:* zoom from port overview to crane to sensor glyph for the digital-twin story.
   *Too heavy:* a full stadium model. Ship it as pre-rendered video on low and mid tiers.
7. **Shopify Editions, Spring '26 "Everywhere"**, https://www.shopify.com/editions/spring2026 ([Codrops engineering write-up](https://tympanus.net/codrops/2026/06/26/engineering-the-web-experience-behind-shopifys-spring-26-edition-everywhere/)) [S, from snippets].
   *Technique:* the DOM owns content and interaction, and **one shared WebGL layer** owns atmosphere, point clouds and scroll transitions. A runtime GPU tier is the main control, and tier 0 (no WebGL or a blocklisted GPU) gets static fallbacks.
   *Borrow:* the architecture itself, adopted wholesale.
   *Too heavy:* volumetric light and point clouds on tier 1.
8. **Oryzo (Lusion)**, https://oryzo.ai ([utsubo roundup](https://www.utsubo.com/blog/best-threejs-websites-2026)) [S].
   *Technique:* a single product render with inertial easing and a scroll-driven camera along Z, built in vanilla Three.js.
   *Borrow:* one object and one camera rail fit the furniture product page (blueprint, then exploded parts, then finished piece).
   *Too heavy:* little; this is the lightest realtime pattern on the list.
9. **Explore Primland**, https://explore.ownprimland.com ([utsubo](https://www.utsubo.com/blog/best-threejs-websites-2026)) [S].
   *Technique:* a scroll-driven terrain flythrough with atmospheric fog.
   *Borrow:* the flyover narrative for a port or plant twin, pre-rendered for most users.
   *Too heavy:* a realtime terrain plus fog on low-end GPUs.
10. **GitHub homepage globe** (engineering write-up: [How we built the GitHub globe](https://github.blog/engineering/engineering-principles/how-we-built-the-github-globe/)) [P].
    *Technique:*
    - an **inline SVG poster** shows first, then crossfades over 600 ms via WAAPI;
    - ~12k dots are drawn as one `InstancedMesh`;
    - antialias is off and a halo shader hides the jagged edge;
    - **4 quality tiers**: if the average drops below 55.5 fps over 50 frames, it steps down (DPR capped at 1.5, fewer arcs, less raycasting, dot density cut to 65%);
    - the starting rotation comes from the timezone, so there is no geo-IP wait.
    *Borrow:* all of it. This is the canonical playbook for a "data network" visual.
11. **Stripe globe and gradient**, https://stripe.com ([globe write-up](https://stripe.com/blog/globe), [Connect front-end write-up](https://stripe.com/en-br/blog/connect-front-end-experience)) [P].
    *Technique:*
    - the globe had a rule to fall back to a static image if it could not hold 60 fps;
    - antialias is off;
    - dots exist only where Stripe is live (60k cut to 20k);
    - animation stops when the globe scrolls off-screen;
    - the Connect site animates only transform and opacity, uses WAAPI by default, triggers via IntersectionObserver (fire once, then disconnect), and respects `prefers-reduced-motion`.
    *Borrow:* the discipline. *Note:* the minigl gradient drains battery according to forum users ([GSAP forum](https://greensock.com/forums/topic/24837-animating-gradients/)), so pause it when off-screen.
12. **Apple product pages** (e.g. https://www.apple.com/airpods-pro/).
    *Technique:* a pre-rendered **image sequence drawn to canvas**, scrubbed by scroll, which gives "3D" with zero GL ([CSS-Tricks tutorial](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/)) [P].
    *Borrow:* an exploded view for the furniture system, at 60–90 AVIF frames.
    *Too heavy:* 150+ full-resolution frames on 3G.
13. **Linear**, https://linear.app.
    *Technique:* restrained dark-ink UI, hairline grids, monospace micro-details, quick crisp transitions, and app-speed navigation. HN users praise its speed ([HN](https://news.ycombinator.com/item?id=33200314)) [S].
    *Borrow:* the closest aesthetic match to ANU (ink, hairlines, mono, one accent). Proof that "premium" can mean fast.
14. **Cartier Watches & Wonders**, https://www.cartier.com/en-fr/watchesandwonders [S].
    *Technique:* six 3D "alcoves" built with Three.js, GLSL, GSAP, Lenis and a Web Audio score.
    *Borrow:* the chaptered rooms structure maps to ANU's products (Twin, Furniture, Walkthrough, Support, Odoo).
    *Too heavy:* audio plus six realtime rooms.
15. **Hubtown**, https://hubtown.co.in, Awwwards SOTD 2026, by Unseen Studio [S].
    *Technique:* a Three.js monolith hero with a mouse reveal (WebGL + GSAP).
    *Borrow:* pointer-reveal maps to ANU's "pointer light" over the line network.
    *Too heavy:* a full-screen GL hero as the LCP area.
16. **ON Energy**, by Studio 28K. Awwwards SOTD Mar 2026 ([element page](https://www.awwwards.com/inspiration/energy-stream-interaction-on-energy)) [U, from snippets only].
    *Technique:* an "energy stream" WebGL interaction.
    *Borrow:* flowing lines as a metaphor for data and energy (ports, plants).
17. **Aramco "The Birth of Oil"** (SOTD May 2025) and **"Shoot For The Future"** (SOTD 2026) ([Awwwards](https://www.awwwards.com/sites/aramco-shoot-for-the-future)) [U].
    These are regional energy-sector storytelling sites. The tech stack is unverified; review them for Gulf/Arabic art direction and tone.
18. **Jisr** (Saudi HR SaaS), https://www.jisr.net/en ([case study](https://www.thedigitalbunch.com/case-studies/jisr-a-marketing-site-worthy-of-saudi-arabias-1-hr-platform)) [P]. Not an award winner.
    *Technique:* Arabic was written and designed as an original, not a translation. One animation system behaves identically in LTR and RTL, and no page ships until it passes review in both languages.
    *Borrow:* the process.

Also useful for technique (not award picks):
- Codrops "ZERO" (Jul 2026, scroll-driven WebGL for desktop and mobile).
- Trionn (GSAP + Three.js + Lenis + Web Audio architecture), [Codrops](https://tympanus.net/codrops/?p=117096).
- Three.js Conference site ([Codrops, Feb 2026](https://tympanus.net/codrops/2026/02/28/when-community-becomes-ui-building-the-website-for-the-first-three-js-conference/)).

---

## 2. Motion and 3D techniques (state of the art, Nov 2026)

### 2.1 Support snapshot (caniuse, Nov 2026) [P]
| Feature | Chrome/Edge | Safari / iOS | Firefox | Samsung | Global |
|---|---|---|---|---|---|
| Scroll-driven animations (`animation-timeline: scroll()/view()`) | 115+ | 26.0+ | **159+** (Oct 2026) | 23+ | ~89% ([caniuse](https://caniuse.com/mdn-css_properties_animation-timeline_view), [web.dev Oct 2026](https://web.dev/blog/web-platform-10-2026)) |
| Same-document View Transitions | 111+ | 18.0+ | 144+ | 23+ | ~93% ([caniuse](https://caniuse.com/view-transitions)) |
| Cross-document View Transitions (`@view-transition {navigation:auto}`) | 126+ | 18.2+ | partial 144+ | no | ~90% ([caniuse](https://caniuse.com/cross-document-view-transitions)) |
| Speculation Rules (prefetch/prerender) | 109+ | **no** (through 27.3) | **no** | 21+ | ~78% ([caniuse](https://caniuse.com/wf-speculation-rules)) |
| Scroll-*triggered* animations (`animation-trigger`, `timeline-trigger`) | 146 (Mar 2026) | no | no | – | Chrome-only ([Chrome blog](https://developer.chrome.com/blog/scroll-triggered-animations)) |
| `linear()` easing (spring curves in CSS) | 113+ | 17.2+ | 112+ | yes | broad ([Chrome docs](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)) |
| AV1 video | yes | partial (17+) | 67+ | 12+ | ~96% ([caniuse](https://caniuse.com/av1)) |
| `navigator.deviceMemory`, `connection.effectiveType`, `saveData` | yes | **no** | **no** | yes | Chromium only ([web.dev adaptive loading](https://web.dev/articles/adaptive-loading-cds-2019)) |

### 2.2 View Transitions
- **Same-document** (SPA) is what Next.js App Router uses, because route changes are soft navigations.
  - Next 16.4 docs: view transitions need no config flag in the App Router; they use React 19.3 `<ViewTransition>`. Props are `name`, `enter`, `exit`, `share`, `default="none"`. Directional types come from `<Link transitionTypes={['nav-forward']}>` ([Next guide](https://unpkg.com/next@16.4.3/dist/docs/01-app/02-guides/view-transitions.md), [16.3 blog](https://nextjs.org/blog/building-app-like-experiences-with-nextjs-16-3)) [P].
  - Next 16.2.x still needed `experimental.viewTransition: true`. vebanu is on 16.3.1, so upgrade [P].
  - Put the wrapper in `page.tsx`, not `layout.tsx`, because layouts persist.
  - Anchor the fixed header with its own `view-transition-name` and `animation: none`.
  - Add `::view-transition { pointer-events: none }` so clicks reach the live page during a transition.
  - Under reduced motion, set durations to 0 or keep only the crossfade [P].
- **Cross-document** (`@view-transition { navigation: auto; }`, pure CSS) matters only for real MPA hops: locale switch with a full reload, a docs or support subdomain. Chrome skips the transition if navigation takes more than 4 s ([Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)) [P].
- **Cost:** the browser snapshots old and new states as bitmaps, so animate snapshots with transform and opacity only. Keep named shared elements to a few (≤ 10). Snapshot memory adds up on low-RAM Android [U, general guidance].

### 2.3 CSS scroll-driven animations
- `animation-timeline: view()` animates while an element crosses the viewport, and `scroll()` follows container progress. `animation-range: entry 0% cover 40%` and similar ranges shape the timing. These run **off the main thread** for transform, opacity and filter. Chrome's case study shows a CSS progress bar unaffected by heavy main-thread JS, while the JS version went janky ([Chrome case study](https://developer.chrome.com/blog/scroll-animation-performance-case-study), [WebKit guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)) [P].
- Safari 26.0 shipped support. Secondary reports say 26.3–26.4 made it threaded and accelerated ([Safari 27.3 notes](https://developer.apple.com/documentation/safari-release-notes/safari-27_3-release-notes.md)) [P/S].
- **Limitation:** there is no damping or lag; it is locked 1:1 to scroll. An HN thread on CSS-native parallax raised exactly this ([HN](https://hn.nuxt.dev/item/48368291)) [S]. For a "liquid" lag, use a JS spring on one property, or a CSS `transition` on a custom property that the scroll animation drives.
- **Progressive enhancement:** wrap in `@supports (animation-timeline: view())` and in `@media (prefers-reduced-motion: no-preference)`. The default (unsupported) state must be the *final, visible* state.

### 2.4 GSAP ScrollTrigger vs CSS vs Motion; Lenis
- **GSAP:** all plugins (ScrollTrigger, SplitText, MorphSVG, DrawSVG, Flip) are free for commercial use since the Webflow acquisition ([GSAP README](https://github.com/greensock/GSAP)) [P]. It is the most expressive timeline tool, but runs on the main thread. Motion lists GSAP's minimum at ~27 KB versus 3 KB for Motion `animate` (vendor numbers) [S]. Use it for pinned, choreographed sequences on mid and high tiers only, and lazy-import it.
- **Motion** (motion.dev): `scroll()` uses the native ScrollTimeline where available, which keeps it hardware-accelerated. The mini `animate()` is about 2.3–3.2 KB, and it is a good fit for React + WAAPI ([Motion vs GSAP](https://motion.dev/docs/gsap-vs-motion)) [P vendor].
- **Pure CSS + WAAPI** should be the default for reveals, parallax, progress, sticky-section effects and page transitions. It costs zero JS.
- **Lenis** (smooth scroll):
  - `syncTouch` defaults to false, so touch keeps native scroll.
  - `respectReducedMotion` defaults to true.
  - No CSS scroll-snap support; it stops over iframes; it is capped at 60 fps on Safari and 30 fps in Low Power mode ([README](https://github.com/darkroomengineering/lenis)) [P].
  - Thoughtworks Radar flags accessibility issues ([Radar](https://thoughtworks.com/radar/languages-and-frameworks/lenis)).
  - A Codrops case study had to disable it on mobile ([Horeca](https://tympanus.net/codrops/2026/06/10/building-horeca-advanced-motion-design-in-webflow-without-the-performance-trade-offs/)).
  - **Recommendation: no Lenis.** At most, enable it on desktop with a fine pointer on the high tier.

### 2.5 3D and illustration options by weight
| Option | Runtime cost (gz) | Use for ANU |
|---|---|---|
| SVG + CSS (stroke-dashoffset, `view()`) | ~0 | line network, glyph statuses, diagrams, maps. **Default.** |
| Pre-rendered video (AV1 + H.264 fallback, poster) | 0 JS; 300 KB–2 MB media | twin flyovers, plant/port hero loops, Unreal/Blender cinematics |
| Image sequence on canvas | ~2 KB JS; 1–4 MB frames | scrubbed exploded views (furniture). For phones, a `-g 8` video can be lighter ([guide](https://learnwithhasan.com/guide/ai-video-scroll-animation-page/), [hontran](https://www.hontran.dev/blog/scroll-scrubbed-video-stutters-fix)) [S] |
| Depth-map parallax (one image + depth map, ~60-line shader) | OGL ~20 KB or raw WebGL ~3 KB | hero photography of real sites |
| OGL | ~17–21 KB ([npm](https://npmjs.com/ogl)) [S] | line-network shader, pointer light, small scenes |
| three.js core | ~150–170 KB ([LogRocket figure](https://blog.logrocket.com/?p=203792)) [S] | realtime twin/furniture viewers (high tier, per route) |
| r3f + drei | three + ~30–60 KB [U] | only if scenes are React-heavy. Vanilla three in a client island is lighter |
| Spline runtime | ~0.5 MB+ JS before the scene ([utsubo](https://www.utsubo.com/blog/best-threejs-websites-2026)) [S] | prototyping only. Export glTF and use three or OGL |
| Lottie (dotLottie) | ~150 KB WASM player ([LottieFiles](https://lottiefiles.com/dotlottie)) [P vendor] | avoid; SVG/CSS covers ANU's needs |
| Rive | WASM runtime (size not confirmed); small `.riv` files ([Rive](https://rive.app/blog/rive-as-a-lottie-alternative)) [P vendor] | interactive state machines (e.g. walkthrough demo), lazy-loaded on interaction |

### 2.6 How top sites do 3D and stay fast (pattern checklist)
1. **Poster first.** The LCP is HTML text or an AVIF/SVG poster, never the canvas (GitHub SVG poster, Stripe static fallback).
2. **Lazy-load on visibility or idle.** Use `IntersectionObserver` with `rootMargin: 200px`, then `requestIdleCallback`, then dynamic `import('three')`. Or load on intent (hover, tap "Explore in 3D").
3. **Crossfade poster to canvas** once the first frame has rendered (GitHub: 600 ms WAAPI).
4. **Cap DPR**: `min(devicePixelRatio, 1.5)` on mobile and 2 on desktop. Turn antialias off (GitHub and Stripe both do) [P].
5. **Adapt at runtime**: measure FPS over about 50 frames and step down tiers (GitHub), or use drei `<PerformanceMonitor>`/`<AdaptiveDpr>` in r3f.
6. **Render on demand**: stop the loop when off-screen or the tab is hidden, and when nothing moves (`frameloop="demand"` in r3f).
7. **Draw calls**: instancing and merging. Mobile targets in the literature range from ≤ 50 to ≤ 150 calls per frame [S]. Measure with `renderer.info.render.calls`.
8. **Compressed assets**: glTF with Meshopt (fast decode) or Draco (smaller, with a WASM decoder), plus KTX2/Basis textures (stay compressed in GPU memory). See §6.
9. **Bake lighting** into textures or vertex colors and use unlit or Lambert materials. No realtime shadows on mobile.
10. **Offload work**: an `OffscreenCanvas` in a Worker keeps the main thread free for INP. Use a BVH for raycasting.
11. **Device-tier gate before download** (§2.7). The Shopify '26 tier 0 static fallback and Madar's GPU-effect scaling are both this pattern.
12. **Test on real phones and in-app browsers** (WhatsApp, Instagram and Facebook webviews are common in Iraq). There are reports of three.js sites crashing on iPhones because of memory ([r/threejs](https://www.reddit.com/r/threejs/comments/1k91ho7/poor_performance_webgl_on_iphone/mpaoxa8/)) [S].

### 2.7 Device-tier detection
| Signal | Support | Use |
|---|---|---|
| `prefers-reduced-motion` | all | force a static or fade-only tier (this is accessibility, not performance) |
| `navigator.connection.saveData` / `Save-Data` header | Chromium | force low; serve smaller media |
| `connection.effectiveType` (`slow-2g`/`2g`/`3g`/`4g`) | Chromium | `3g` or worse means low |
| `navigator.deviceMemory` (GB, capped at 8) | Chromium | ≤ 2 means low, ≤ 4 means mid |
| `navigator.hardwareConcurrency` | all incl. Safari 15.4+ | weak signal (cheap phones have 8 cores) |
| Client Hints (`Sec-CH-Device-Memory`, `ECT`, `Save-Data`) | Chromium, opt-in via `Accept-CH` | server-side media choices |
| GPU benchmark: `@pmndrs/detect-gpu` | WebGL | tiers 1/2/3 at ≥ 15/30/60 fps from GFXBench data. Self-host the benchmark JSON ([README](https://cdn.jsdelivr.net/npm/@pmndrs/detect-gpu@6.0.15/README.md)) [P] |
| Runtime FPS probe | all | the final arbiter. Downgrade, never upgrade mid-session |

Safari exposes none of the Chromium hints. Default iOS to **mid**, then promote to high only after a GPU probe and when the page is on a product route.

Inline head script, under 1 KB, run before first paint (sets `data-tier` and `data-motion` on `<html>`):
```html
<script>(function(){try{var d=document.documentElement,n=navigator,c=n.connection||{},m=function(q){return matchMedia(q).matches};
var t='mid',slow=['slow-2g','2g','3g'].indexOf(c.effectiveType)>-1;
if(c.saveData||slow||(n.deviceMemory&&n.deviceMemory<=2))t='low';
else if((n.deviceMemory||4)>=8&&(n.hardwareConcurrency||4)>=8&&m('(pointer:fine)'))t='high';
var o=localStorage.getItem('anu:tier');if(o)t=o; d.dataset.tier=t;
d.dataset.motion=m('(prefers-reduced-motion: reduce)')?'reduce':'full';}catch(e){}})();</script>
```
Add a visible footer toggle, "Motion: Full / Calm / Static", that writes `anu:tier`. Users on bad networks will use it.

---

## 3. Performance budgets, Core Web Vitals, Next.js 16

### 3.1 Context
- **Iraq:**
  - Ookla median mobile download ~56 Mbps, up +71% year on year to Aug 2025 ([DataReportal](https://datareportal.com/reports/digital-2026-iraq)) [S].
  - Browser-based SpeedOf.me tests give ~15 Mbps mobile for H1 2026 ([speedof.me](https://speedof.me/internet-speed/iraq)) [S].
  - Android has 69–81% of mobile share ([StatCounter](https://gs.statcounter.com/os-market-share/mobile/iraq)) [S].
  - Medians hide outages, congestion and long RTTs to EU-hosted origins. **Serve from a CDN with Gulf or Iraq PoPs** (check the provider's PoP list).
- **Global P75 device and network budget:** ~150 KB HTML/CSS/fonts + 300–350 KB JS gz (Alex Russell's "performance inequality gap" series, figure via secondary summary). Russell also warns a quarter of users are below the baseline you target ([infrequently.org](https://infrequently.org/2024/08/the-way-out)) [S]. ANU should aim well under this.

### 3.2 Core Web Vitals
- Thresholds are unchanged for 2026 at the p75 of field data (CrUX): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 ("poor" is > 4 s, > 500 ms, > 0.25) ([web.dev](https://web.dev/articles/vitals)) [P].
- Award-level targets quoted by an Awwwards-focused studio: LCP < 1.5 s, INP < 100 ms, CLS < 0.05, page < 3 MB, sustained 60 fps ([utsubo](https://www.utsubo.com/blog/award-winning-website-design-guide)) [S].
- **Awwwards weighting:** design 40%, usability 30% (performance, responsiveness and accessibility are judged here), creativity 20%, content 10%. The Developer Award goes to SOTDs scoring > 7 against the developer guidelines ([evaluation](https://awwwards.com/about-evaluation), [developer award](https://awwwards.com/developer-award)) [P]. Speed is a scoring lever, not a sacrifice.

### 3.3 Why the byte budget matters on "3G"
Lighthouse's mobile profile is ~1.6 Mbps (≈ 200 KB/s) with 150 ms RTT and a 4× CPU slowdown. So 400 KB of critical bytes is about 2 s of transfer before any parse or execute. The LCP element must be in the first HTML response, styled by CSS available in the first round trips. Fonts must not block it.

### 3.4 Next.js 16 specifics
- **Version:**
  - 16.0 (Oct 2025): Turbopack default, React Compiler stable, `proxy.ts` replaces `middleware.ts`, Cache Components introduced ([blog](https://nextjs.org/blog/next-16)).
  - 16.3 (Aug 2026): Instant Navigations = Cache Components + **Partial Prefetching**, plus experimental offline retry ([blog](https://nextjs.org/blog/building-app-like-experiences-with-nextjs-16-3)).
  - **16.4** (6 Oct 2026): React 19.3 with stable View Transitions; Cache Components recommended for every app; **`export const ensureStatic = 'navigation'`** fails the build if a route goes dynamic; `navigation()`/`prefetch()` APIs; Turbopack shared runtime chunk and export mangling for smaller bundles; improved Bundle Analyzer ([blog](https://nextjs.org/blog/next-16-4)) [P].
- **Rendering:** keep RSC by default, with client islands only for motion and 3D. Put `ensureStatic = 'navigation'` in `app/[locale]/layout.tsx` so marketing pages are guaranteed prerendered. `output: 'standalone'` (current) is fine.
  - `output: 'export'` is possible too, but it loses the default image optimizer: you need `images.unoptimized` or a build-time optimizer [S]. You also lose redirects and headers config, which vebanu uses.
- **JS floor:** about 172 KB gz measured for a static Next 16.3 blog (React + router) ([lilting.ch benchmark](https://lilting.ch/en/articles/nextjs-16-3-astro-nuxt-benchmark)) [S]. `next build` no longer prints First Load JS; read Turbopack's per-route diagnostics JSON or the 16.4 Bundle Analyzer [S].
  - Keep page content server-rendered so LCP does not depend on hydration. JS affects INP and long tasks, not first paint.
- **Images:** `next/image` with AVIF/WebP and correct `sizes`. Preload the LCP image (`priority`/`preload` depending on the version). Use static imports for blur placeholders. Hero AVIF should be ≤ 60 KB at 828 w.
- **Fonts (next/font):**
  - **Inter Tight**: variable, `subsets:['latin']`, preload.
  - **Tajawal**: static weights only, `subsets:['arabic']`, at most 2 weights (400/700), loaded **only in the `/ar` layout**.
  - **Roboto Mono**: `preload:false`, latin, one weight.
  - next/font self-hosts, subsets, defaults to `display: swap` and adds metric-adjusted fallbacks to cut CLS ([docs](https://nextjs.org/docs/app/api-reference/components/font)) [P]. With preload on, you must specify subsets.
- **Arabic typography rules** (practice; see [rtlstyling.com](https://rtlstyling.com/)):
  - `letter-spacing: 0` under `:lang(ar)` (tracking breaks cursive joining).
  - No uppercase or italic transforms.
  - Line-height 1.6–1.8.
  - About +8–12% optical size relative to Inter Tight.
  - Logical properties (`margin-inline-start`, `inset-inline`, `translate` driven by a `--dir` var).
  - Numerals: decide between Western and Eastern Arabic (`Intl.NumberFormat('ar-IQ')` yields ٠–٩).
  - **Never split Arabic text per character** for animation; split by word or line only.

### 3.5 Instant page moves
- **Within the Next app:**
  - `<Link>` prefetches when visible, with layout deduplication in 16.x ([16 beta](https://nextjs.org/blog/next-16-beta)).
  - With `partialPrefetching`, each visible link fetches a shared route shell. `prefetch={true}` pulls URL-specific cached content; use it on the main nav and product cards only, because it hits the server on viewport entry [P].
  - Pair with View Transitions for the perceived "liquid" move.
- **Speculation Rules** (`<script type="speculationrules">`, moderate eagerness prerender) help only **hard** navigations and work in Chromium only (~78%; no Safari or Firefox). Use them for cross-app hops (e.g. to a docs or support subdomain) and feature-detect with `HTMLScriptElement.supports('speculationrules')` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)) [P].
- **Caching:** immutable hashed assets, HTTP/3, Brotli, CDN-cached HTML. The 16.3 `useOffline` (experimental) retries soft navigations after connection drops, which suits Iraqi networks.

---

## 4. AI-readability and GEO

### 4.1 Server HTML is the content
- **AI crawlers don't render JavaScript.** Vercel and MERJ saw GPTBot (569 M requests per month) and ClaudeBot (370 M) fetch JS files but never execute them ([Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler)) [P].
- Every claim, product description, number and FAQ must therefore be in RSC-rendered HTML.
- Canvas and WebGL scenes need adjacent `<figure>` + `<figcaption>` text. Video needs a transcript or summary paragraph.
- Use semantic landmarks (`header/nav/main/article/section/aside/footer`), one `h1`, a real heading hierarchy, `<dl>` for spec facts, `<table>` for comparisons, `<time datetime>`, and `lang`/`dir` on `<html>` per locale.
- Avoid `opacity:0` initial states on content that waits for GSAP. Without JS (or with JS failing) the content stays hidden and LCP is delayed. Gate pre-hide styles behind a `.js`/`data-tier` class set in `<head>`, and use them only below the fold.

### 4.2 robots.txt for AI crawlers
Distinguish training bots from search and user-fetch bots ([OpenAI bots](https://platform.openai.com/docs/bots), [Anthropic crawlers](https://support.anthropic.com/en/articles/8896518), [specification.website](https://www.specification.website/spec/agent-readiness/robots-for-ai-crawlers/)) [P/S]:
- **Search and answer index (allow):** `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Googlebot`, `Bingbot`, `Applebot`.
- **User-triggered fetch (allow; may not honor robots):** `ChatGPT-User`, `Claude-User`, `Perplexity-User`.
- **Training (business choice):** `GPTBot`, `ClaudeBot`, `Google-Extended` (a token controlling Gemini training and grounding), `Applebot-Extended`, `CCBot`. For a B2B vendor that wants LLMs to "know" ANU, **allowing training is usually net-positive**.
- Disallow only `/api/`, `/admin/` and preview routes.
- Check CDN/WAF bot settings too. Some CDNs block AI bots by default, silently overriding robots.txt [S].
- vebanu's `app/robots.ts` already allows `*` + OAI-SearchBot. Add explicit groups for clarity and the sitemap.

### 4.3 llms.txt and llms-full.txt
- **Spec** ([llmstxt.org](https://llmstxt.org/)):
  - `/llms.txt` is Markdown: one H1 (required), a blockquote summary, optional prose, then H2 sections of `[name](url): note` link lists. An H2 titled "Optional" holds skippable links.
  - Pages get Markdown twins at `page.md` (or `index.html.md`), advertised via `<link rel="alternate" type="text/markdown">`.
  - `llms-full.txt` is a community convention: the full concatenated content (Mintlify and others generate it) [P].
- **Reality check:**
  - Ahrefs found 97% of llms.txt files got zero requests (May 2026).
  - One log study found 408 hits out of 500 M AI-bot visits.
  - Google says it doesn't use the file, and no major provider confirms using it.
  - IDE agents (Cursor, Cline, Continue) do read it ([ppc.land](https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/), [Ahrefs](https://ahrefs.com/blog/llms-txt/)) [S].
  - Next.js itself serves `.md` versions of its blog posts with a `docs_index: /docs/llms.txt` header; this brief fetched `nextjs.org/blog/next-16-4.md` [P].
- **For ANU:**
  - Generate `/llms.txt` (EN), `/ar/llms.txt` and `/llms-full.txt` at build time from the same content source as the pages.
  - Add `.md` routes for each service, product, case study and the FAQ.
  - Cost is about an hour. Expect little ranking effect.

### 4.4 JSON-LD (single `@graph`, stable `@id`s, per locale `inLanguage`)
- `Organization`: `name`, `alternateName` (Arabic name), `url`, `logo`, `sameAs` (LinkedIn, GitHub, Odoo partner listing if real), `address` (city, `addressCountry: IQ`), `areaServed`, `knowsAbout` (Odoo ERP, digital twin, …), `contactPoint` (sales/support, `availableLanguage: [en, ar]`).
- `WebSite` + `WebPage` (`inLanguage`, `isPartOf`, `about`), and `BreadcrumbList` (still a Google rich result).
- `Service` per offering (Odoo implementation, migration, support): `provider` → Organization `@id`, `serviceType`, `areaServed`, `offers` if there are packages.
- `SoftwareApplication` per product (Twin, Furniture, Walkthrough, Support): `applicationCategory: BusinessApplication`, `operatingSystem: Web`. Add `offers` or `aggregateRating` only if they are real; Google's software rich result needs them.
- `FAQPage`: **FAQ rich results were removed 7 May 2026**. Markup is harmless and remains valid Schema.org. One Ahrefs study found no AI-citation gain [S] ([SEJ](https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/), [jsonld.com](https://jsonld.com/google-faq-rich-results-deprecated/)). Keep it only on pages with genuine visible Q&A.
- `HowTo`: rich results deprecated in Sept 2023. Use it only for a real "implementation method" page. Value is semantic, not SERP.
- Validate with the [Schema.org validator](https://validator.schema.org/) and Google's Rich Results Test.

### 4.5 Sitemap and hreflang (en/ar)
- Use reciprocal `hreflang` for `en`, `ar` (optionally `ar-IQ`) plus `x-default` → `/en`, including a self-reference. Never point at redirecting URLs ([Google](https://developers.google.com/search/docs/specialty/international/localized-versions)) [P].
- Emit both `<link rel="alternate" hreflang>` in `<head>` (Next `metadata.alternates.languages`) and sitemap `xhtml:link` entries (Next `sitemap.ts` `alternates.languages`).
- The current `/` → `/en` permanent redirect is fine; make `x-default` point at `/en`, not `/`.
- Ensure Arabic pages are real translations with their own titles and descriptions; machine-translated stubs hurt both search and answer engines.

### 4.6 What answer engines quote
- **GEO paper** (Aggarwal et al., KDD 2024): adding **statistics, quotations and citations** raised source visibility up to ~40%, and up to 37% on Perplexity. Keyword stuffing did nothing, and lower-ranked sites gained most ([arXiv 2311.09735](https://arxiv.org/abs/2311.09735)) [P].
- **Write each service or product page answer-first:**
  - one definitional sentence ("ANU Twin is a web-based digital twin for ports and industrial plants in Iraq that…");
  - a facts block (`<dl>`: modules, Odoo versions, timeline, languages, cities served, pricing model);
  - concrete numbers from real projects, with dates;
  - question-shaped H2s that match buyer questions ("How long does an Odoo implementation take in Iraq?").
- Keep the Arabic version factually identical so Arabic-language answers cite `/ar`.
- Show a visible "Updated" date and keep entity names consistent: ANU, ANU Software Solutions, and the Arabic name.

---

## 5. What practitioners say (forums, HN, talks)

Paraphrased with links; one short verbatim quote is kept.

- **Award sites aren't the web.** In an HN thread on over-complicated web design (Jun 2025), chrismorgan wrote: "Awwwards is not representative of the web at large" ([HN 44221729](https://news.ycombinator.com/item?id=44221729); thread [44221430](https://news.ycombinator.com/item?id=44221430)). Others in the same thread said:
  - at award-chasing studios flashiness outranks load time ([44222018](https://news.ycombinator.com/item?id=44222018));
  - scrolljacking and replaced cursors are long-known harms ([44236243](https://news.ycombinator.com/item?id=44236243));
  - animation-heavy sites trade away usability ([44240897](https://news.ycombinator.com/item?id=44240897));
  - they are deliberately excessive showpieces ([44225420](https://news.ycombinator.com/item?id=44225420)).
- **Scrolljacking is the most-hated pattern, and it is still recurring in Nov 2026.**
  - Commenters called it the worst cliché in web UX ([50233049](https://news.ycombinator.com/item?id=50233049)) and said a laggy scroll handler made one site nearly unusable ([50539324](https://news.ycombinator.com/item?id=50539324)).
  - One loved the style but hated the hijack ([50538107](https://news.ycombinator.com/item?id=50538107)).
  - A minority liked that it slowed them down ([50539218](https://news.ycombinator.com/item?id=50539218)).
  - NN/g: short, well-paced hijacks are tolerated; long or mis-speed ones are not ([NN/g](https://www.nngroup.com/articles/scrolljacking-101/)).
- **Praise goes to performance and clarity.**
  - An HN user praised an abeto-adjacent WebGL piece as performant art ([45402418](https://news.ycombinator.com/item?id=45402418)).
  - Another praised a site because everything about it made sense ([46463442](https://news.ycombinator.com/item?id=46463442)).
  - Linear's speed is repeatedly cited ([33200314](https://news.ycombinator.com/item?id=33200314)).
- **Smooth-scroll libraries:**
  - Codrops' Horeca case study reports that Lenis on mobile broke sticky and pinned sections, so they disabled it on touch ([Codrops](https://tympanus.net/codrops/2026/06/10/building-horeca-advanced-motion-design-in-webflow-without-the-performance-trade-offs/)).
  - Thoughtworks Radar flags accessibility risks ([Radar](https://thoughtworks.com/radar/languages-and-frameworks/lenis)).
  - The GSAP forum notes ScrollSmoother doesn't smooth keyboard or scrollbar scrolling ([GSAP forum](https://greensock.com/forums/topic/34032-scrollsmoother-accessibility/)).
- **three.js on phones:**
  - An r/threejs developer reports that most of their three.js sites eventually crash on iPhones ([Reddit](https://www.reddit.com/r/threejs/comments/1k91ho7/poor_performance_webgl_on_iphone/mpaoxa8/)).
  - three.js forum users note KTX2 can load slower on mobile despite better GPU performance, so test the transcoder cost ([three.js forum](https://discourse.threejs.org/t/three-scene-optimization-texture-size-calculation-in-gpu-compression-merge-meshes-what-the-limits/23972)).
  - An older HN comment blames slow WebGL loads on editor formats (OBJ, DAE) and recommends glTF ([16964350](https://news.ycombinator.com/item?id=16964350)).
- **Awards don't score performance directly.**
  - A Habr Lighthouse study of ~5,000 Awwwards sites found performance isn't directly evaluated ([Habr](https://habr.com/en/articles/874094)).
  - Greenspector found a "Mobile Excellence" nominee pulling 12 MB+ and 400+ requests ([Greenspector](https://greenspector.com/en/resources/blog/analysis_sites_nominated_mobile_excellence_awwwards/)).
  - Adrian Roselli argues that rewarding only "pretty" pushes out performant, accessible sites ([We Reward the Wrong Things](https://adrianroselli.com/2016/06/we-reward-the-wrong-things.html)).
  - The Webby story on Shopify Editions frames the rich-3D-vs-performance tension as the project's defining design constraint ([Webby](https://www.webbyawards.com/winner-stories-shopify-editions)).
- **Accessibility:**
  - Parallax and zoom trigger vestibular symptoms. Replace slides, zooms and parallax with fades under reduced motion ([web.dev](https://web.dev/articles/prefers-reduced-motion), WCAG 2.3.3).
  - Cyd Stumpel's "creative developer's guide to accessible award-winning websites" covers focus states, reduced motion and WebGL fallbacks ([girl-code](https://girl-code.cydstumpel.nl)).
- **Talks and videos:**
  - Syntax, "this website is insane (stack explained)" on the Lando Norris site ([digest](https://recapio.com/digest/this-website-is-insane-stack-explained-by-syntax)).
  - Wes Bos on design in 2026 ([RedMonk](https://redmonk.com/videos/wes-bos-design-2026/)).
  - Alex Russell, "Frontend's Lost Decade" ([Conffab](https://conffab.com/presentation/frontends-lost-decade-the-market-for-lemons/)).

**Patterns praised:** native scroll; fast crisp transitions; one bold idea per page; content readable without the effect; visible controls (pause or skip); fallbacks that look intentional.
**Patterns criticized:** preloaders, scrolljacking, custom cursors, hidden navigation, text that animates in letter by letter before you can read it, 10 MB pages, and heat or battery drain on phones.

---

## 6. 3D asset pipeline

### 6.1 Blender to glTF for the web
- **Model:** real-world scale, apply transforms, clean normals, triangulate on export, remove hidden faces, and merge static objects that share a material (fewer draw calls). Use instancing for repeated items (containers, cranes, cabinets) via `EXT_mesh_gpu_instancing`.
- **Bake:** bake lighting and AO into the base color, or into a lightmap on UV2, with Cycles. Ship unlit or Lambert materials. For ANU's ink/bone/blue language, prefer **flat colors + vertex colors + edge lines** (EdgesGeometry, or lines baked as a texture). A texture-free look makes for tiny files and suits the brand.
- **Heuristic budgets** (ours; tune on devices):

  | Asset | Mobile (mid/high tier) | Desktop |
  |---|---|---|
  | Hero object | 20–60 k triangles | ≤ 200 k |
  | Whole scene | ≤ 150 k triangles, ≤ 50–100 draw calls | ≤ 500 k triangles, ≤ 150 draw calls |
  | Textures | ≤ 1024² (KTX2), ≤ 4 total | ≤ 2048² |
  | GLB per scene | ≤ 1–1.5 MB | ≤ 3 MB |

- **Compression:**
  - Meshopt (`EXT_meshopt_compression`): tiny JS decoder and fast decode, animation-friendly. A Porsche case reported Draco load-time variance of 1–5 s due to WASM decoder size [S].
  - Draco: smaller geometry, with a ~100 KB gz WASM decoder.
  - Never use both on one file. **Default to Meshopt.**
  - Textures: KTX2 with **ETC1S** for color/UI (small) and **UASTC** for normals and data (quality). Both stay compressed in VRAM ([Needle docs](https://engine.needle.tools/docs/how-to-guides/optimization/)) [S].
  - Self-host the Basis transcoder and load it only on the high tier.
- **Tools:**
  - [glTF-Transform](https://gltf-transform.dev/cli): `inspect` (reports draw-call, geometry and texture hotspots), `optimize in.glb out.glb --compress meshopt --texture-compress ktx2`, and the granular commands `dedup`, `prune`, `weld`, `simplify`, `instance`, `join`, `palette`, `flatten`, `resize`, `etc1s`, `uastc`, `webp`, `avif`. KTX2 needs KTX-Software ≥ 4.4 installed [P/S].
  - [gltfpack](https://meshoptimizer.org/gltf/): `gltfpack -i scene.glb -o out.glb -cc -tc -mi` (Meshopt + KTX2 + instancing). `-si 0.5` simplifies; `-kn`/`-km` keep named nodes and materials for scripting. three.js needs `loader.setMeshoptDecoder(MeshoptDecoder)` and `KTX2Loader` [P].
- **Spline** is good for art direction and prototyping, but its runtime is ~0.5 MB+. Export glTF and run it through the pipeline above.

### 6.2 Unreal vs Blender vs realtime
- **Pre-rendered** (Blender Cycles/EEVEE or Unreal Movie Render Queue):
  - cinematic lighting at zero runtime cost, deterministic performance, and it works on the low tier;
  - output AV1 (Chrome, Android, Firefox) + H.264/HEVC fallback, plus AVIF posters and sequences.
  - **Unreal licensing:** free for companies under $1 M annual gross revenue. Non-game companies above that pay $1,850 per seat per year (since 5.4) ([Epic](https://www.unrealengine.com/en-US/blog/we-are-updating-unreal-engine-twinmotion-and-realitycapture-pricing-in-late-april)) [P].
- **Realtime web (three.js/OGL):** only where interaction *is* the message (rotate the twin, toggle layers, explode the furniture), on the high tier, behind a poster.
- **Pixel streaming:** not suitable for a public site in Iraq because of GPU server cost and latency.

### 6.3 Headless Blender automation (posters, sequences)
- `blender -b scene.blend -E CYCLES -o //out/frame_#### -F PNG -s 1 -e 120 -a -- --cycles-device OPTIX` renders a sequence. Use `-f 1` for a single poster, and `-P script.py` to set camera, resolution, language variants and export (`bpy.ops.export_scene.gltf`) ([Blender CLI docs](https://docs.blender.org/manual/en/4.5/advanced/command_line/arguments.html)) [P].
- **Cycles** runs headless reliably (CUDA/OptiX/HIP, no display).
- **EEVEE** needs an OpenGL context. Linux gained headless EGL in 2022 ([commit](https://lists.blender.org/pipermail/bf-blender-cvs/2022-August/176810.html)), but EEVEE-Next (4.2+) on headless servers is reported flaky, and `xvfb-run` is the fallback [S/U].
- **Post-process:**
  - `ffmpeg` → AV1 (`libsvtav1`) + H.264. For scrubbing, use `-g 1` (exact seeks, large files) or `-g 8` (a compromise).
  - `avifenc`/`sharp` → AVIF frames at 720–960 px wide.
  - Generate LQIP placeholders.

### 6.4 Free and CC0 asset sources (verify per asset before shipping)
| Source | License | Notes |
|---|---|---|
| [Poly Haven](https://polyhaven.com) | CC0 | HDRIs, PBR textures, models; no attribution |
| [ambientCG](https://ambientcg.com) | CC0 | PBR materials (concrete, steel, wood for plants and furniture) |
| [Kenney](https://kenney.nl) | CC0 | low-poly kits (industrial, city); good for stylized dioramas |
| [Quaternius](https://quaternius.com) | CC0 | low-poly packs |
| [Sketchfab](https://sketchfab.com) | mixed: filter "CC0"; CC-BY needs credit; some NC (no commercial) | check each model ([license filters](https://sketchfab.com/blogs/community/refine-downloadable-model-searches-with-new-license-filters)) |

Summary from [Cinevva guide](https://app.cinevva.com/guides/game-asset-licenses) [S]. Archive downloaded assets along with their license file.

---

## 7. Recommended stack for ANU

### 7.1 Stack
- **Next.js ≥ 16.4** (from 16.3.1):
  - React 19.3 `<ViewTransition>`;
  - `cacheComponents: true, partialPrefetching: true`;
  - `export const ensureStatic = 'navigation'` in `app/[locale]/layout.tsx`;
  - RSC everywhere, with motion and 3D as small client islands;
  - keep `output: 'standalone'` behind a CDN with Gulf/Iraq PoPs.
- **CSS-first motion system:**
  - scroll-driven animations (`view()`/`scroll()`) under `@supports` + `prefers-reduced-motion: no-preference`;
  - View Transitions for page moves;
  - `@starting-style` for entry states;
  - `linear()` easing for the "liquid settle";
  - `content-visibility: auto` + `contain-intrinsic-size` for long story sections.
  - Tokens: `--dur: 280ms; --ease-settle: linear(0, 0.38 12%, 0.79 26%, 1.02 42%, 1.04 52%, 1.01 68%, 1);` (generate the real curve with [linear-easing-generator](https://linear-easing-generator.netlify.app/)).
- **JS motion:**
  - keep **GSAP** (already installed, free) for one or two pinned, choreographed sequences per page, **dynamically imported on mid and high tiers only**;
  - consider Motion `animate`/`scroll` for small React-driven bits;
  - **no Lenis.**
- **2D canvas and WebGL:**
  - **OGL** or raw WebGL2 (~3–20 KB) for the ambient line network and pointer light (mid and high);
  - **three.js** (vanilla, in an `OffscreenCanvas` worker where possible) only on product routes, high tier, after the poster;
  - `@pmndrs/detect-gpu` with a self-hosted benchmark list, plus an FPS probe.
- **Media:** AVIF/WebP via `next/image`; AV1 + H.264 videos with `preload="none"`, posters, and `playsinline muted` loops ≤ 1.5 MB.
- **Tooling:**
  - Lighthouse CI with mobile throttling;
  - CrUX/RUM (the `web-vitals` lib → endpoint);
  - Playwright on emulated Moto G-class + WebPageTest from a Middle East location;
  - the Turbopack Bundle Analyzer (16.4) with a size check in CI.

### 7.2 Performance budget (p75 mobile, enforced in CI)
| Item | Budget |
|---|---|
| LCP | ≤ 1.8 s (lab, Slow-4G, Moto G Power); field ≤ 2.5 s |
| INP | ≤ 150 ms; no task > 50 ms in first 5 s on low tier |
| CLS | ≤ 0.05 (reserve canvas and video boxes; metric-matched fallback fonts) |
| TTFB | ≤ 600 ms (CDN-cached HTML) |
| HTML per page | ≤ 35 KB gz (content in HTML, JSON-LD ≤ 5 KB) |
| CSS | ≤ 30 KB gz total |
| Fonts on first view | ≤ 3 files, ≤ 90 KB (EN: Inter Tight var + Mono later; AR: Tajawal 400/700 + Inter Tight) |
| JS initial | ≤ 180 KB gz incl. Next/React floor, so **app JS ≤ 25 KB** on first load |
| Mid-tier motion chunk | ≤ 25 KB gz, after `load` + idle |
| High-tier GL chunk | ≤ 30 KB (OGL scene) / ≤ 180 KB (three) gz, on visibility or intent |
| 3D assets per scene | first view ≤ 500 KB; full ≤ 1.5 MB (GLB+KTX2) |
| LCP image | ≤ 60 KB AVIF at mobile width; or no image (text LCP) |
| First-view transfer | low ≤ 350 KB · mid ≤ 600 KB · high ≤ 600 KB + ≤ 2 MB deferred |
| Frame rate | 60 fps desktop; ≥ 50 fps mid Android, else auto-downgrade |

### 7.3 Three-tier device strategy
| Tier | Who | What renders | What loads |
|---|---|---|---|
| **Low (static/CSS only)** | `saveData`, `effectiveType ≤ 3g`, `deviceMemory ≤ 2`, reduced motion (as "calm"), JS failure, AI crawlers | full content; static line-network SVG; posters instead of video; CSS `view()` reveals only if motion is allowed; instant page swaps (crossfade ≤ 150 ms) | HTML + CSS + fonts + Next floor. No GSAP, no GL, no autoplay video |
| **Mid (CSS + light canvas)** | default for most Android and all iOS before probing | everything in low + scroll-driven CSS choreography, View Transitions, an OGL line-network/pointer-light canvas at DPR ≤ 1.5 paused off-screen, muted loop videos on visibility, one GSAP-pinned sequence per page | + ≤ 25 KB motion + ≤ 30 KB OGL + videos on demand |
| **High (WebGL scenes)** | `deviceMemory ≥ 8`, fine pointer, detect-gpu tier ≥ 2, FPS probe passes | everything in mid + realtime twin/furniture scenes on product routes (poster, then crossfade), depth-map hero, DPR ≤ 2 | + three.js chunk + GLB/KTX2 on visibility or intent |

**Rules for all tiers:**
- The tier only ever adds decoration; content and navigation are identical across tiers.
- Use the FPS probe to downgrade mid-session.
- The footer "Motion: Full / Calm / Static" toggle overrides detection.
- Respect `prefers-reduced-motion` as **calm**: crossfades only, no parallax, zoom or slides.

### 7.4 Signature motion ideas (ANU language)
1. **Line-network wake.** The hairline network texture is a background SVG (low). On scroll, a Signal-blue pulse travels along edges via `stroke-dashoffset` + `animation-timeline: view()` (mid). On high, the network lives in an OGL shader and nodes brighten near the pointer. Pulses flow from inline-start to inline-end (mirrored in RTL).
2. **Ink band, blue edge.** Section changes and page transitions use an ink band sweep (`clip-path: inset()` driven by `view()`, or a `::view-transition` keyframe). The leading edge is a 1 px `#2563EB` hairline. The band settles in 280 ms with `--ease-settle`, and its direction flips in RTL.
3. **Glyph status machine.** Square glyphs (□ → ◧ → ■, with a blue ■ for "live") show process state: Odoo phases, ticket lifecycle, twin sensor status. Transitions use `steps()` for a mechanical feel, then a tiny 280 ms settle. They cost nothing and are readable as text (`aria-label`).
4. **Pointer light.** A soft radial "lamp" follows the pointer (CSS custom props `--px/--py`, updated in rAF) and reveals the line network under the ink. On touch it parks at the last tap, or drifts with scroll progress. It is off under reduced motion.
5. **Focus / recede.** As a card or section enters the center band (`animation-range: contain 40% contain 60%`), siblings recede (opacity 0.45, scale 0.985, no blur on low or mid). This guides the eye without hijacking scroll.
6. **Liquid settle type.** Headlines rise 10 px and settle with a slight overshoot (`linear()` spring, 280 ms) by line, not by letter, so Arabic stays joined. Above the fold, text is visible at first paint and only the hairline underline draws in.
7. **Blueprint → twin.** A port or plant appears as a hairline wireframe (SVG on low and mid, GL lines on high) that "fills" to a shaded model as you scroll. Low and mid get a pre-rendered AV1 loop or AVIF sequence with the same choreography.
8. **Exploded furniture.** A scroll-scrubbed exploded view of a cabinet, from parts list to CNC panels to assembled piece. Mid uses a 60-frame AVIF canvas sequence, and high uses glTF with real part data. A Roboto Mono BOM ticker counts parts.
9. **Ghost walkthrough.** For the guided-walkthrough product, a scripted ghost cursor and glyph markers demonstrate a flow over a static UI screenshot (WAAPI, ≤ 3 KB). It pauses on hover and has a visible "skip".
10. **Ticket pipeline.** For the support platform, tickets as glyphs slide along a hairline pipeline, with tabular Roboto Mono counters (`font-variant-numeric: tabular-nums`; Arabic-Indic digits on `/ar`) triggered by `view()`.
11. **Shared-element morph.** Product cards morph into the product hero on navigation (`<ViewTransition name="product-twin" share="morph">`), with the ink band wiping behind. Keep it to ≤ 1 morph per navigation.
12. **Grid draw-in.** On first visit, layout hairlines draw from 0 to 1 scale once (decoration only, never delaying LCP), then stay still. Never replay on soft navigations.

### 7.5 RTL motion rules
- Define `--dir: 1` (ltr) / `-1` (rtl) and multiply every horizontal `translate`, sweep and pulse direction by it.
- Mirror arrows and progress; don't mirror logos, media icons, the 3D world, or charts with explicit axes.
- Directional view-transition types map `nav-forward` to "inline-end" (left in RTL).
- QA every motion in both locales before merging, as in Jisr's process.

### 7.6 Next steps (suggested order)
1. Upgrade vebanu to Next 16.4. Enable `cacheComponents` + `partialPrefetching` and add `ensureStatic`. Baseline Lighthouse, WebPageTest and bundle size.
2. Add the head tier script, motion tokens and the reduced-motion "calm" mode. Refactor `components/motion/reveal.tsx` so content is visible without JS.
3. Build the CSS-only versions of ideas 1–6. Measure INP on a mid Android.
4. Build the content and AI layer: JSON-LD `@graph`, hreflang alternates, `robots.ts` bot groups, `/llms.txt` + `.md` twins, answer-first copy blocks.
5. Build the 3D pipeline (Blender → gltf-transform/gltfpack → KTX2/Meshopt; Blender headless → AV1 + AVIF), with one high-tier product scene (Twin) behind a poster.
6. Run real-device QA (Samsung A-series, Xiaomi Redmi, iPhone SE/11, WhatsApp webview) on Iraqi networks.
