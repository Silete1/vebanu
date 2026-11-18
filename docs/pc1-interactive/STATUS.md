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

## v2 pass (coordinator review, 18 Nov): bar = lab shot d v2 still 01_hero
- Scene now = the lab's shot d v2 itself (shots/d-brain-ziggurat/shot.py imported as a module by web/build_scene.py):
  lib Ur ziggurat with the triple stairway, v2 materials, procession + braziers, palms/reeds, dunes, 85 mm hero.
  PC2's 4-terrace proportions are dropped for the v2 Ur form (coordinator's bar).
- Surfaces: Cycles COMBINED bakes of the v2 materials (bump, erosion, courses, dust) on the realtime meshes:
  RGB = moon + sky + door, A = torches (flickered live). Unlit in the web; no tiling textures any more.
- Geometry: static.glb (no normals: unlit) + movers.glb (slab 6.4 x 3.0 x 1.0 m, pilgrim figure).
- Slabs wait just off their seats on faces the camera sees; dock with a channel flash and a dust puff.
- Camera: v2 hero position/aim, 68 mm (hfov 28) + lens shift -0.09 widths (poster uses the same shift).
- [x] full bake (4096 body) + posters, verified EN/AR 1440/390 on next build; comparisons in anu_nav/data/work/playwright-mcp/interactive/cmp-*.png

## Round 3 (coordinator, 18 Nov): polish + system pages
- Atlas: hidden terrace-top cells dropped and the rest cut into their own UV islands (packer fills the gaps).
- Scroll 0: five slabs wait in view (top + right); the rest fly in from the sky as the page scrolls.
- Orion: web/frame_orion.py picks the real sky time/azimuth (LTR -5.5 h / -10 deg, RTL -5.1 h / +10 deg): no star
  or line enters the headline block; the whole figure cannot fit a 68 mm frame (>= 0.8 of its height at any
  hour), so the belt and shoulders show at scroll 0 and the feet arrive with the scroll. The figure draws in on load.
- Torches x2.8 brighter layer, flames 4 m, dust puffs larger/brighter; phones: closer camera, lighter gradient.
- System pages: systemScenes = sky-of-anu for every slug but twins (PC2's "twin"); story-hero passes
  { slabs: [own link], focus: slug } (brain: { brain, focus: "brain" }); scene.json `presets` = close-up camera
  per slug (and the shrine door), slow orbit; posters public/media/systems/<slug>[-rtl][-800] from
  web/build_scene.py --stage systems (AVIF <= 60 KB). Arabic system pages use the -rtl poster.

## Round 4 (coordinator, 18 Nov): system pages get their own scenes
- Opening beat (2.6 s, the slab close-up) -> a 1.3 s dive (lens closes, Signal-blue flash) -> the system's stage.
- Stages: components/scene3d/stages (stage.ts = the contract + registry; workshops.ts first). systemStages in
  lib/content/systems/scenes.ts; story-hero passes `stage`. Each stage lives inside the same mount.
- Workshops: wardrobe 2400 x 2400 x 600 mm from anu-3d-lab/web/workshops.py (board list + guillotine nesting on
  2800 x 2070 sheets, 7 sheets on a 4 x 2 CNC bed), Workshops lane maps (lacquer, anodised), CC0 plywood/concrete,
  carpentry_shop_01 HDR env; scroll: explode with glowing edge bands -> boards fly onto their nested sheets ->
  gantry runs; hover = board name + cut size (EN/AR); click a sheet -> #from-the-real-system. 0.89 MB.
- Close-ups: tiling brick/plaster detail layer (world scale, albedo/mean + normal lit by the bake's moon) on the
  body within ~70 m of the camera; loaded on system pages only (0.42 MB).
- Swap-in of the Workshops session's own model later: replace wardrobe() in web/workshops.py (same board dicts).
