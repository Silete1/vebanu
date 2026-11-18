"""brain-lite — the point of sale that keeps selling offline: a phone standing on the
plain, a receipt strip folding out of it, a few product cubes, and the dashed glyph
(waiting) that says the sale will sync when the line returns."""
from mathutils import Euler, Vector

from .. import geo as G


def build(S):
    S.camera(target=(0.45, 0.2, 0.75), azimuth=-66, focal=100, frame_w=5.4, shift_x=-0.17, horizon=0.68, at=0.36)
    S.sky(stars=220, seed=121, calm=0.38)
    # the phone: an ink slab leaning back slightly, its screen dark with a blue edge
    pw, pt, ph = 0.78, 0.08, 1.58
    tilt = 10
    c = Vector((0, 0, ph / 2 * 0.985 + 0.02))
    G.box("phone", (pw, pt, ph), c, S.mat("ink"), bevel=0.012, rot=(-tilt, 0, 0))
    R = Euler((-0.1745, 0, 0)).to_matrix()
    G.box("screen", (pw - 0.07, 0.004, ph - 0.12), c + R @ Vector((0, -pt / 2 - 0.001, 0.0)), S.mat("screen"),
          bevel=0, rot=(-tilt, 0, 0))
    # on the screen: a short list, the total in blue
    for i, w in enumerate((0.42, 0.34, 0.48, 0.3)):
        G.box("line", (w, 0.004, 0.022), c + R @ Vector((-0.12 + w / 2 - 0.12, -pt / 2 - 0.004, 0.42 - i * 0.12)),
              S.mat("slate_light"), bevel=0, rot=(-tilt, 0, 0))
    G.box("total", (0.5, 0.004, 0.05), c + R @ Vector((0.0, -pt / 2 - 0.004, -0.2)), S.mat("accent_soft"), bevel=0,
          rot=(-tilt, 0, 0))
    G.box("phone-edge", (pw - 0.07, 0.006, 0.014), c + R @ Vector((0, -pt / 2 - 0.004, -ph / 2 + 0.05)),
          S.mat("accent"), bevel=0, rot=(-tilt, 0, 0))
    # the receipt: a paper strip falling from the base and folding flat on the ground, sharp folds
    y0 = -0.18
    G.box("receipt-1", (0.3, 0.006, 0.42), (0.05, y0 - 0.16, 0.17), S.mat("paper_sheet"), bevel=0.001, rot=(-48, 0, 0))
    G.box("receipt-2", (0.3, 0.62, 0.006), (0.05, y0 - 0.62, 0.004), S.mat("paper_sheet"), bevel=0.001, rot=(0, 0, -4))
    G.box("receipt-3", (0.3, 0.5, 0.006), (0.12, y0 - 1.17, 0.012), S.mat("paper_sheet"), bevel=0.001, rot=(3, 0, -10))
    for i in range(7):
        G.box("rline", (0.18 if i % 3 else 0.12, 0.012, 0.002), (0.05 - 0.03 + (i % 2) * 0.02, y0 - 0.4 - i * 0.07, 0.008),
              S.mat("slate"), bevel=0)
    # products
    for p, s, role in ((Vector((0.85, -0.25, 0)), 0.32, "light"), (Vector((1.22, 0.1, 0)), 0.24, "body_alt"),
                       (Vector((0.95, 0.28, 0)), 0.2, "light"), (Vector((0.88, -0.25, 0.32)), 0.18, "body")):
        G.slab("product", (s, s, s), p, S.mat(role))
    # the offline glyph: dashed (waiting), standing beside the phone
    G.standing_glyph(S, "dashed", (-0.62, -0.1, 0.42), s=0.3, t=0.025, rot_z=8)
    S.studio(target=(0.3, 0, 0.6), scale=0.75, accent=(1.4, 1.6, 1.8), accent_energy=0.25)
    S.sun(105, 22, 0.3)
