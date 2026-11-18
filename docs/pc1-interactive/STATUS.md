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
- [x] Branch on PC2 9ff0722 (scene hooks); three@0.181 added
- [x] Sky: 14k point stars + Milky Way field extracted from the NASA EXRs
- [ ] Blender: PC2-proportion ziggurat, lightmap bake (moon/sky + torches), GLB, poster LTR/RTL, palm/reed cards
- [ ] Encode: sky AVIF (desktop 4k / phone 2k), stars.bin, lightmaps WebP, textures WebP 1k/512, meshopt GLB
- [ ] Web scene: sky, stars, constellation, ziggurat, ground, slabs, torches, dust, camera, post
- [ ] Mount: homeScene, interactive, poster swap, delete scenes/network.ts
- [ ] Verify: lint, typecheck, build, Playwright 1440x900 + 390x844, /en + /ar
