"""government-hr — a public-sector HR workflow as a sequence on one line: the memo, two
approval stamps, the sealed document. The line runs along the ink band and turns blue
from the moment the document is sealed."""
import math

from mathutils import Matrix, Vector

from .. import geo as G


def build(S):
    S.camera(target=(1.0, 0.3, 0.55), azimuth=-72, focal=100, frame_w=6.0, shift_x=-0.16, horizon=0.72, at=0.36)
    S.sky(stars=220, seed=141, calm=0.38)
    a, b = Vector((-0.9, 1.6, 0)), Vector((2.9, -0.4, 0))
    d = (b - a).normalized()
    ang = math.degrees(math.atan2(d.y, d.x))
    G.ink_band(S, ((b - a).length + 0.5, 0.42, 0.05), (a + b) / 2, edge="top-front", rot_z=ang + 180)

    def at(t, lift=0.05):
        return a + (b - a) * t + Vector((0, 0, lift))

    face = -14  # every piece faces the camera, turned a little
    R = Matrix.Rotation(math.radians(face), 3, "Z")
    # 1 the memo: a sheet standing, lines of text
    m = at(0.1)
    G.box("memo", (0.56, 0.012, 0.78), m + Vector((0, 0, 0.39)), S.mat("paper_sheet"), bevel=0.002, rot=(0, 0, face))
    for i in range(6):
        G.box("text", (0.34 - 0.08 * (i % 2), 0.004, 0.018), m + R @ Vector((-0.04, -0.008, 0.66 - i * 0.07)),
              S.mat("slate"), bevel=0, rot=(0, 0, face))
    # 2-3 the approvals: stamps (clay block, ink grip) and the 'done' glyph they leave
    for t in (0.36, 0.56):
        p = at(t)
        G.slab("stamp", (0.26, 0.26, 0.16), p, S.mat("light"), rot=(0, 0, face))
        G.slab("stamp-grip", (0.09, 0.09, 0.22), p + Vector((0, 0, 0.16)), S.mat("ink"), rot=(0, 0, face))
        G.standing_glyph(S, "done", p + Vector((0, 0, 0.56)), s=0.15, t=0.02, rot_z=face)
    # 4 the sealed document: a heavier sheet with the blue seal
    p = at(0.86)
    G.box("doc", (0.66, 0.02, 0.92), p + Vector((0, 0, 0.46)), S.mat("light"), bevel=0.003, rot=(0, 0, face))
    for i in range(6):
        G.box("text", (0.4 - 0.08 * (i % 2), 0.004, 0.018), p + R @ Vector((-0.06, -0.012, 0.8 - i * 0.07)),
              S.mat("slate"), bevel=0, rot=(0, 0, face))
    G.cylinder("seal", 0.085, 0.022, p + R @ Vector((0.16, -0.01, 0.22)), S.mat("glyph_blue"), rot=(90, 0, face),
               verts=48)
    G.beams("sealed", [(at(0.74, 0.056), at(1.0, 0.056))], 0.009, S.mat("accent"))
    S.studio(target=(1.0, 0.4, 0.5), scale=0.85, accent=(2.6, 1.6, 1.4), accent_energy=0.15)
    S.sun(105, 22, 0.35)
