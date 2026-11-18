"""walkthroughs — guided tours inside the system: a standing screen, four square glyph
points on it, a dotted glowing path that visits them, and a cursor (a cuneiform wedge)
arriving at the third."""
from mathutils import Vector

from .. import geo as G

W, H = 2.8, 1.75


def build(S):
    S.camera(target=(0.3, 0.0, 1.05), azimuth=-66, focal=100, frame_w=6.4, shift_x=-0.17, horizon=0.68, at=0.42)
    S.sky(stars=220, seed=51, calm=0.38)
    lift = 0.2
    c = Vector((0, 0, lift + H / 2))
    G.box("screen", (W, 0.06, H), c, S.mat("ink"))
    G.box("screen-face", (W - 0.12, 0.004, H - 0.12), c + Vector((0, -0.031, 0)), S.mat("screen"), bevel=0)
    G.box("screen-edge", (W, 0.064, 0.02), c + Vector((0, 0, -H / 2 + 0.01)), S.mat("accent"), bevel=0)
    y = -0.036
    pts = [Vector((-0.95, y, c.z + 0.38)), Vector((-0.2, y, c.z - 0.3)), Vector((0.42, y, c.z + 0.26)),
           Vector((0.98, y, c.z - 0.42))]
    kinds = ["done", "done", "blue", "outline"]
    for p, k in zip(pts, kinds):
        G.standing_glyph(S, k, p, s=0.16, t=0.01)
    # the dotted path between the points, stepping around the glyphs (right angles)
    route = []
    for a, b in zip(pts[:-1], pts[1:]):
        route += [a, Vector((b.x, y, a.z)), b] if not route else [Vector((b.x, y, a.z)), b]
    segs = G.dashes(route, 0.05, 0.045)
    done_x = pts[2].x
    glow = [1.0 if max(s[0].x, s[1].x) <= done_x + 1e-3 else 0.3 for s in segs]
    G.beams("path", [(a + Vector((0, -0.004, 0)), b + Vector((0, -0.004, 0))) for a, b in segs], 0.009,
            S.mat("line"), glow)
    # the cursor: a wedge whose point reaches the third glyph's corner, standing off the screen
    tip = pts[2] + Vector((0.1, -0.09, -0.09))
    d = Vector((0.766, 0, -0.643))
    G.wedge3d(S, tip + d * 0.16, 0.32, rot=(90, 40, 0), role="light", thick=0.05)
    S.studio(target=(0.2, 0, 1.0), scale=0.85, accent=(2.0, -0.6, 2.4), accent_energy=0.25)
    S.sun(105, 22, 0.3)
