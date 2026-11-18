# anu.ltd audit — 18 Nov 2026

Live: `https://www.anu.ltd` (Vercel, Next.js 16 App Router, Turbopack build, prerendered, last build about 22 Oct).
Staging on ANU's own server: `https://site.brain.anu.ltd` (branch `hosting/hetzner`, container `anu-website-web-1` on
`anu-cloud-01`, deployed 18 Nov 11:41). Source: GitHub `Silete1/vebanu`.

## How it is made

| Area | Today |
|---|---|
| Stack | Next.js 16.3, React 19.2, TypeScript, Tailwind v4, Base UI (shadcn), GSAP + ScrollTrigger, Lucide |
| Routing | `/[locale]` with `en` and `ar` (RTL); `/` → `/en` (308); `anu.ltd` → `www` (307); legacy unprefixed paths redirect |
| Pages | home, services, industries (+5: distribution, manufacturing, retail, logistics, healthcare), insights (+8 articles). 36 URLs in the sitemap |
| Content | TypeScript objects in `lib/content/*` (≈3,700 lines, en + ar) |
| Motion | GSAP timelines per section (`home-scroll-motion`, `method-scroll-story`, `platform-macbook-showcase`), page transition wrapper |
| Forms | assessment form → Server Action → Resend e-mail, in-memory rate limit (5 per 10 min per IP) |
| SEO | per-page metadata, canonicals + hreflang, Organization + WebSite JSON-LD, robots allows all, sitemap |
| Hosting | Vercel today; Docker + Traefik on `anu-cloud-01` ready, waiting for secrets and the DNS switch (`deploy/README.md`) |

## Look and language

- Dark hero: a full-screen video of a blue line network under a dark gradient, rounded 20px frame, large light
  Inter Tight headline ("Business control, implemented."), glass capsule menu, pill buttons.
- Body: bone/white paper sections, mono labels, cards with rounded corners.
- It drifts from the ANU design language the Odoo theme now carries (`Silete1/anu` `docs/anu-theme/DESIGN.md`):
  radius 0, ink band with a 3px Signal edge, glyph statuses, pointer light, focus/recede. The site still uses
  rounded frames, pills, lime accents in the README and an Unsplash photo set.
- Message: "We do not sell modules. We rebuild operating control." Only Odoo implementation is told. None of ANU's
  own products (Walkthroughs, Workshops, twins, ANU Theme and Context Band, Support, Brain Lite, Legal, Bureau…)
  appear on the site.

## Performance (Lighthouse 12.8, mobile, simulated slow 4G)

| Page | Perf | FCP | LCP | TBT | Speed index | Weight | DOM |
|---|---|---|---|---|---|---|---|
| `/en` | 71 | 1.9 s | 3.6 s | 590 ms | 4.9 s | 4,842 KiB | 1,372 |
| `/ar` | 75 | 1.3 s | 3.7 s | 350 ms | 6.5 s | 4,866 KiB | 739 |

Accessibility 96 (colour contrast fails), best practices 100, SEO 100. Measured TTFB from Baghdad-side network: 5.4 s on
one run (Vercel `arn1`, cache HIT); the HTML is 268 KB raw / 29 KB br because the RSC payload is inlined.

Causes, in order of weight:

1. **The hero video**: `public/anu-architectural-background.mp4` is 4.45 MB, `preload="auto"`, no poster, on every
   home visit and on every phone. On 3G it competes with the page for half a minute.
2. **The first paint is empty**: the intro clips the hero to a dot (`clip-path: inset(50% 50% …)`) and reveals it in
   JavaScript, so the screen is grey until the GSAP bundle has loaded and run (seen in the browser: blank, then the
   hero after about 4 s).
3. **JavaScript**: 343 KB of compressed JS+CSS on first load (11 files; GSAP + ScrollTrigger on every page), 3.5–4.7 s
   main-thread work on a mid phone, 590 ms blocking.
4. **Images**: Unsplash photos via `/_next/image` at `w=3840` for cards; Odoo screenshots as PNG.
5. **Fonts**: Tajawal in five weights is declared for every page, Latin pages included.

## Security

Good: HSTS preload, `X-Frame-Options: DENY`, `nosniff`, referrer policy, permissions policy, `poweredByHeader: false`,
server-side rate limit, Resend key server-only.

To fix:

- **No Content-Security-Policy.** Add a strict CSP (self, nonce or hashes for the JSON-LD and Next inline scripts,
  `img-src` limited, `frame-ancestors 'none'`, `form-action 'self'`).
- The in-memory rate limit resets on each deploy and is per instance; `x-forwarded-for` must be read from Traefik's
  trusted hop only, or a client can rotate it. Add a honeypot and a timing check on the form.
- `access-control-allow-origin: *` on HTML pages (Vercel default) is harmless for static pages but should not follow to
  any API route.
- Third-party image host (Unsplash) at runtime: self-host the few pictures used.
- Dependencies: Next 16.3 / React 19.2 are current; keep `npm audit` in CI. `netlify-cms` and the old Vite site live in
  `Silete1/website2`, not here.

## AI readability

- No `llms.txt` / `llms-full.txt`; robots names only `OAI-SearchBot`. No `Service`, `SoftwareApplication`, `FAQPage`,
  `BreadcrumbList` or `Article` schema. Most copy is server-rendered (good), but sections that animate in from
  `opacity:0` stay invisible to screenshot-based readers until scripts run.

## Needs updates

- Tell what ANU builds: one story page per product and system, with how it is implemented.
- Bring the site to the ANU design language of `anu_theme` (radius 0, ink band, Signal edge, glyph statuses, pointer
  light, focus/recede), one token source.
- Render instantly without JavaScript; motion as enhancement by device tier; video and 3D only on capable devices and
  only after the first paint.
- CSP, form hardening, self-hosted images, `llms.txt`, richer JSON-LD.
- Finish the move to `anu-cloud-01` (secrets, DNS) — owned by the PC1 hosting session.
