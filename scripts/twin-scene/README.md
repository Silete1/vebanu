# Twin scene bundle

`public/scenes/twin.mjs` is the live port-terminal scene on `/systems/twins`
(the hero of the ANU Twin page, tier 2 only). `scenes/twin.ts` fetches it as a
URL when the scene slot asks for it, so the site's bundler never sees it.

It is built from ANU's private twin platform (`@anu-twin/engine`, `kit` and
`sim`), which must not be copied into this public repository. What is committed
here is the compiled, minified result only.

## What it is

A made-up container terminal at night in the Sky of Anu: three ship-to-shore
cranes dual-cycling a vessel, trucks carrying the boxes to three yard blocks
where rubber-tyred gantries swap them, a slow camera orbit that leans toward the
pointer. No client names, marks, coordinates, ship names or real layouts.

- Rigs at real dimensions from the kit; crane cycles (jerk-limited axes,
  anti-sway, rope sway), truck drives and trailer tracking from the sim.
- Materials: plain physically based ones in the site palette (ink, bone, Signal
  blue) instead of the engine's baked texture sets; no downloaded assets.
- Contract of `scenes/network.ts`: `mount(box)` returns its teardown, DPR ≤ 1.5,
  no drawing off screen or in a hidden tab, `is-live` after the first frame, one
  step down (DPR 1, no shadows) and then removal if it runs under ~40 fps.
- Size: about 753 KB raw, 210 KB gzip (three.js included).

## Rebuild

The build project lives outside this repository, next to the platform checkout:
`/home/anu/anu-src/site-twin/` (PC2). It holds the scene source (`entry.ts`), the
web materials (`web-surfaces.ts`), the build script (`build.mjs`) and a small
lab (`lab/`). It reads the platform packages by path from
`/home/anu/anu-src/anu-twin` (or `$ANU_TWIN`) and never changes them. Last built
from anu-twin `main` at `222b626`.

```sh
cd /home/anu/anu-src/site-twin
npm install            # esbuild, three 0.186.1, typescript, terser
node build.mjs entry.ts /path/to/vebanu/public/scenes/twin.mjs
```

`build.mjs` runs esbuild (`--bundle --format=esm --minify --target=es2022`,
three.js resolved from its own `node_modules`) and then one safe terser pass.
At bundle time only (the platform sources stay as they are) it:

- imports three.js directly in each kit module, so only the classes used are
  bundled (the kit passes three around as a namespace);
- gives the kit's surface seam (`kit/src/deps.ts`) the web materials;
- treats the platform modules as side-effect free;
- leaves out the citations that sourced values carry in words.

`LAB=1 node build.mjs` keeps the lab's inspection hooks (close views, a fixed
start time); the page's bundle is built without them.

## Check

```sh
npx next build && npx next start -p 5398
# then open /en/systems/twins?tier=2 (?tier=2 forces the live tier)
```

`.anu-scene` gets `is-live` and a canvas once the scene draws. Before
committing a new bundle, scan it for client names and coordinates, as the
platform's brand-leak scan does.
