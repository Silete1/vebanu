# PC1 interactive 3D: status

Resume: read this file, `git log --oneline pc2/web-redesign..pc1/interactive`, the mount contract (tag `site-mail/to-pc1/011`).

## Goal
Photoreal, interactive real-time home hero "Sky of Anu": an Ur-style ziggurat (PC2 proportions) under the real night
sky (NASA Deep Star Maps 2020), Orion (the True Shepherd of Anu) drawn from real star positions, the dingir apex star,
ANU systems as machined slabs with a Signal-blue channel that dock on the terraces on scroll (hover = label,
click = soft navigation). three.js, tier 2 only, poster first.

## Where things are
- Build (reproducible): `anu-3d-lab/web/` (config.py = one source of numbers; sky_extract.py; build_scene.py; encode.py; build.sh).
  Lab `lib/` is read-only for this lane (another lane edits it).
- Web: `scenes/sky-of-anu.ts` (mount), `components/scene3d/*` (three.js parts), `public/3d/sky-of-anu/*` (assets + scene.json),
  `lib/content/systems/scenes.ts` (homeScene).

## Steps
- [x] Branch on PC2 9ff0722 (scene hooks) + merge 397d58c (logo); three@0.181 added
- [x] Sky: 14k point stars + Milky Way field extracted from the NASA EXRs (web/sky_extract.py)
- [x] Blender (web/build_scene.py): PC2-proportion ziggurat from lab pieces, lightmap bake (moon/sky RGB + torches A),
      quantized GLB (no wasm: the site CSP has no wasm-unsafe-eval), palm/reed card atlas
- [x] Encode (web/encode.py): desktop 2.46 MB, phone 0.82 MB
- [x] Web scene (components/scene3d/*, scenes/sky-of-anu.ts) per PC2 mount contract; homeScene = sky-of-anu; network.ts removed
- [x] RTL: real mirrored sky (Orion setting in the west), RTL shift x1.4; phones: ziggurat in the top half
- [x] Posters LTR/RTL from the same Blender scene (76/69 KB AVIF at 1920, 27/25 KB at 960)
- [x] Verified on `next build` + `next start -p 3321`: EN/AR x 1440/390, scroll 0/25/50 %, hover labels EN+AR, click ->
      /en/systems/workshops, tier 1 loads no 3D, tier 0 / reduced motion shows the poster. 3D chunk 161 KB gz,
      desktop assets 2.54 MB, phone 0.82 MB. RTX 4060 laptop: 8.3 ms median frame at 1440x900.
- [ ] Next: owner review; mail PC2 "MERGE <sha>" (coordinator); system-page scenes (see report)

## Checking
`?tier=2&anu3d=keep` forces the scene and skips the <40 fps exit (headless); `window.__anu3d` = { scene, rig, renderer }
only with that flag. Screenshots: anu_nav/data/work/playwright-mcp/interactive/.

## Wishes for lab lib/ (not changed by this lane)
- ziggurat.build() hard-codes Ur's 3-terrace stair layout; web/build_scene.py rebuilds PC2's 4-terrace form from
  lib pieces (battered, frusta, _buttresses, stair). A `stairs=` hook in lib would let both shots share build().
