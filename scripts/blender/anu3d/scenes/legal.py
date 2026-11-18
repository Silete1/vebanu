"""legal — the legal department: a stack of case documents, a cylinder seal (the oldest
signature) with the disc of its impression, and a timeline of square deadline glyphs
running out to the one that is due, in blue."""
from mathutils import Vector

from .. import geo as G

TIMELINE = ["done", "done", "done", "half", "blue", "outline", "outline"]


def build(S):
    S.camera(target=(0.5, 0.3, 0.45), azimuth=-62, focal=100, frame_w=5.0, shift_x=-0.17, horizon=0.76, at=0.34)
    S.sky(stars=220, seed=131, calm=0.38)
    top = G.sheets(S, 24, (0.9, 1.2, 0.012), (0, 0, 0), seed=4, jitter=0.02)
    G.slab("file-cover", (0.94, 1.24, 0.02), (0.01, 0.0, top), S.mat("ink"), rot=(0, 0, 2))
    G.box("cover-edge", (0.94, 0.01, 0.01), (0.01, -0.62, top + 0.015), S.mat("accent"), bevel=0, rot=(0, 0, 2))
    # the cylinder seal lying beside the stack, and its rolled impression on a clay strip
    G.cylinder("seal", 0.09, 0.42, (0.85, -0.5, 0.09), S.mat("light"), rot=(0, 90, 20))
    G.slab("clay-strip", (0.8, 0.26, 0.06), (0.85, -0.05, 0), S.mat("clay"), rot=(0, 0, 20))
    # the seal disc standing on the file, its rim a thin blue ring
    G.cylinder("seal-disc", 0.24, 0.05, (0.05, 0.2, top + 0.02 + 0.24), S.mat("ink"), rot=(90, 0, -20), verts=64)
    G.cylinder("seal-rim", 0.2, 0.052, (0.05, 0.2, top + 0.02 + 0.24), S.mat("accent_soft"), rot=(90, 0, -20),
               verts=64, bevel=0)
    G.cylinder("seal-face", 0.185, 0.054, (0.05, 0.2, top + 0.02 + 0.24), S.mat("ink"), rot=(90, 0, -20), verts=64,
               bevel=0)
    # the deadline timeline: glyphs standing along a line on the plain
    a = Vector((-0.2, 0.9, 0.0))
    step = Vector((0.55, 0.45, 0))
    pts = [a + step * i for i in range(len(TIMELINE))]
    G.beams("timeline", [(pts[0] + Vector((0, 0, 0.01)), pts[-1] + Vector((0, 0, 0.01)))], 0.006, S.mat("line"), [0.7])
    for p, k in zip(pts, TIMELINE):
        G.slab("tick", (0.02, 0.02, 0.2), p, S.mat("slate_light"))
        G.standing_glyph(S, k, p + Vector((0, 0, 0.32)), s=0.2, t=0.02, rot_z=-10)
    S.studio(target=(0.4, 0.3, 0.3), scale=0.8, accent=(1.8, 2.2, 1.2), accent_energy=0.25)
    S.sun(105, 22, 0.35)
