# ANU 3D renders (Blender pipeline)

Scripted, reproducible hero art for anu.ltd: one procedural scene per system slug, rendered
in Cycles, graded to sit seamlessly on the site's ink band, and encoded to AVIF + WebP under
fixed byte budgets. No downloaded assets: every model, material and texture is generated in
Python here (so there is no CREDITS file to keep).

## The look

ANU's design language (ink `#090B11`, one accent Signal `#2563EB`, bone/paper, sharp edges with
tiny chamfers, square status glyphs, the line network as the only texture), set in one world:
**Anu, the Sumerian sky, over a Mesopotamian plain at night.**

- **Sky** (ink look): a deep night with sparse stars of varied brightness, a faint blue glow on a
  low horizon, the ANU line network drawn as constellations (stars for nodes, thin Signal lines).
- **Dingir** 𒀭: the brightest star of each sky is a faint glint of four crossed wedge strokes; the
  same sign is pressed at the start of each tablet. A motif, never a logo.
- **Clay**: bone/paper objects are unfired clay (matte, porous); tablets carry crisp procedural
  wedge impressions ruled into registers, the first ledgers. On the home tablet the wedges turn
  into square glyphs.
- **Ziggurat**: stepped, sharp terraces for structure (the home hero, ANU Brain).
- **One blue light per scene**, the 3 px blue edge on ink slabs, long low telephoto views
  (85–100 mm) with the inline-start side (left) calm for text.

## Requirements

- Blender 5.2 (headless) at `~/tools/blender` (or `BLENDER=/path/to/blender`); Cycles uses OptiX,
  falls back to CUDA, then CPU.
- Python venv at `~/tools/venv` with `numpy pillow tifffile imageio-ffmpeg` (`pyflakes` for lint).
- Node 22 with the repo's `sharp` (`NODE=` to override; nvm's v22 is found automatically).

## Commands (from the repo root)

```sh
PY=~/tools/venv/bin/python

$PY scripts/blender/build.py --slug brain --preview          # 640x400, 32 spp -> .out/preview/brain-ink-p.png
$PY scripts/blender/build.py --slug home,brain,workshops      # final: render, grade, encode
$PY scripts/blender/build.py --slug all                       # every slug (~10 s render each on an RTX 3060)
$PY scripts/blender/build.py --slug twins --look paper        # the paper look -> twins-paper.avif/.webp
$PY scripts/blender/build.py --slug all --encode-only         # re-encode existing masters (budget changes)
$PY scripts/blender/build.py --slug maps --samples 256 --size 3200x2000 --no-encode   # a print master

$PY scripts/blender/loop.py --slug home --seconds 6           # 960x540 loop -> public/media/loops/
$PY scripts/blender/loop.py --slug twins --seconds 5          # 960x600 loop

# Blender alone (one scene, raw 16-bit TIFF, optional .blend to inspect):
~/tools/blender -b --factory-startup -P scripts/blender/render.py -- --slug qalib --look ink \
    --size 1600x1000 --samples 192 --out /tmp/raw --blend
```

`build.py` flags: `--slug` (one, comma list, or `all`), `--look ink|paper`, `--size WxH`
(default per slug), `--samples` (default 192, preview 32), `--preview`, `--no-encode`,
`--encode-only`, `--feather` (edge feather, fraction of the width, default 0.06).

## Pipeline

1. `render.py` (inside Blender): a fresh empty scene, then `Style` (world, ground) and the slug's
   `build(S)`; Cycles GPU, adaptive sampling, OpenImageDenoise (albedo + normal), AgX
   "Medium High Contrast", bloom from the **emission pass only** (compositor Glare/Bloom added
   before the view transform), 16-bit TIFF to `.out/raw/`.
2. `post.py`: the ink look lifts the black point to ink (nothing is darker than `#090B11`) and
   feathers the frame edges to exactly `#090B11`, so the image has no visible edge on the band
   (the build prints the four corner pixels; they must read `#090B11`). The paper look scales the
   ground to bone `#F8FAFC` and feathers to it. Masters go to `.out/master/`.
3. `encode.mjs` (sharp): AVIF (4:4:4, effort 7) and WebP, each at the highest quality that fits
   the budget; `home` is also written mirrored as `home-rtl` (calm side on the right for Arabic).
4. `loop.py`: renders N frames keyed by periodic functions (`anim.py`), grades each like a still,
   encodes H.264 MP4 (≤ 900 KB) and AV1 WebM, 10-bit (≤ 700 KB), plus a poster.

`.out/` holds intermediates and is git-ignored.

## Outputs and budgets

| Files | Size | AVIF budget | WebP budget |
|---|---|---|---|
| `public/media/systems/<slug>.avif/.webp` | 1600×1000 | 140 KB | 210 KB |
| `public/media/systems/<slug>-800.avif/.webp` | 800×500 | 60 KB | 90 KB |
| `home`, `home-rtl` `.avif/.webp` | 1920×1080 | 140 KB | 210 KB |
| `home-960`, `home-rtl-960` | 960×540 | 60 KB | 90 KB |
| `sky.avif/.webp` (+ `-960`) | 1920×1080 | 80 KB (40 KB) | 120 KB (60 KB) |
| `public/media/loops/<slug>.mp4 / .webm / -poster.*` | 960 w | MP4 900 KB, WebM 700 KB | poster 60 KB |

Slugs: home, brain, control-layer, walkthroughs, support, intelligence, workshops, qalib, twins,
construction, bureau, brain-lite, legal, government-hr, field-operations, retail-finance, qr-menu,
maps, plus the chapter images `sky` (night sky alone, for section backgrounds) and `tablet` (one
clay tablet, for "noise → ledger").

## Code

- `anu3d/style.py` — palette, material recipes per look (scenes ask for roles: `body`, `light`,
  `clay`, `brick`, `ink`, `accent`, `line`, `star`, `glyph_*` …), the night sky (world gradient,
  horizon glow shared with the ground fog, stars and constellations drawn on a far sky plane in
  frame coordinates: `S.uv(u, v)`), lights (`studio`, `sun`, `point`, light-linked so the ink floor
  stays ink), the telephoto camera (`horizon=` and `at=` place the horizon and the subject in the
  frame), render settings and the bloom compositor.
- `anu3d/geo.py` — sharp chamfered boxes (meshes cached and instanced), status glyphs (outline,
  half, dashed, blue, done; lying or standing), thin emissive lines as one mesh per family with a
  per-vertex `glow`, the ink band with its blue edge, networks/MST constellations, trusses,
  ziggurats, the dingir star, wedges, cylinders, paper stacks.
- `anu3d/clay.py` — clay tablets: a numpy height map of wedges, signs, ruled lines and square
  glyph impressions, displaced into a real mesh so raking light casts true shadows in each wedge.
- `anu3d/anim.py` — seamless-loop helpers (sky drift, camera breathing, pulses).
- `anu3d/scenes/<slug>.py` — one small `build(S)` per slug (`animate(S, n)` for loops).

To add a scene: create `anu3d/scenes/<slug_with_underscores>.py` with `build(S)` (geometry, then
`S.camera(...)`, `S.sky(...)`, `S.studio(...)`), add the slug to `SLUGS` in
`anu3d/scenes/__init__.py`, preview with `--preview`, then build. Everything is seeded, so a
re-render gives the same picture.
