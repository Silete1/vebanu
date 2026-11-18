"""control-layer — the ANU layer over every Brain: thin screens stacked in depth like
sheets of glass; the one in front is paper under an ink band closed by the thin blue
edge, with rows of square status glyphs, the theme's own list."""
import random

from mathutils import Vector

from .. import geo as G

W, H = 2.5, 1.6
ROWS = ["blue", "half", "done", "outline", "done"]


def build(S):
    rnd = random.Random(5)
    S.camera(target=(0.5, 0.6, 1.05), azimuth=-62, focal=100, frame_w=6.4, shift_x=-0.17, horizon=0.66, at=0.42)
    S.sky(stars=220, seed=41, calm=0.38)
    lift = 0.22
    # the glass layers behind, each offset back and to the right
    for i in range(1, 4):
        c = Vector((0.32 * i, 0.5 * i, lift + H / 2 + 0.06 * i))
        G.box("layer", (W, 0.025, H), c, S.mat("glass"), bevel=0.003)
        # a hairline frame on each layer's edge
        G.beams("layer-edge", _rect(c, W, H, -0.014), 0.003, S.mat("hair"), [0.5 - 0.1 * i] * 4)
    # the front sheet: paper under an ink band with its blue edge
    c = Vector((0, 0, lift + H / 2))
    G.box("sheet", (W, 0.03, H), c, S.mat("light"))
    band_h = H * 0.24
    G.box("band", (W + 0.002, 0.034, band_h), c + Vector((0, -0.003, H / 2 - band_h / 2)), S.mat("ink"))
    G.box("band-edge", (W + 0.002, 0.036, 0.018), c + Vector((0, -0.004, H / 2 - band_h - 0.009)), S.mat("accent"),
          bevel=0)
    # rows: glyph + a hairline of text
    top = c.z + H / 2 - band_h - 0.16
    for r, kind in enumerate(ROWS):
        z = top - r * 0.22
        G.standing_glyph(S, kind, (c.x - W / 2 + 0.2, -0.016, z), s=0.12, t=0.008)
        L = rnd.uniform(0.7, 1.6)
        G.box("text", (L, 0.006, 0.026), (c.x - W / 2 + 0.36 + L / 2, -0.018, z), S.mat("slate"), bevel=0)
        G.box("rule", (W - 0.2, 0.004, 0.004), (c.x, -0.017, z - 0.11), S.mat("slate_light"), bevel=0)
    S.studio(target=(0.4, 0.4, 1.0), scale=0.85, accent=(2.4, 2.6, 0.4), accent_energy=0.3)
    S.sun(110, 22, 0.3)


def _rect(c, w, h, dy):
    p = [c + Vector((x, dy, z)) for x, z in ((-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2))]
    return [(p[k], p[(k + 1) % 4]) for k in range(4)]
