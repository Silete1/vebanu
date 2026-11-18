"""support — ANU Support: a track of square glyph tiles coming in from the night, each
one further along (outline, half, blue, done) as it nears the desk where it is closed."""
import math

from mathutils import Vector

from .. import geo as G

KINDS = ["outline", "outline", "dashed", "half", "half", "blue", "blue", "done"]


def build(S):
    S.camera(target=(0.6, -0.2, 0.55), azimuth=-74, focal=100, frame_w=6.2, shift_x=-0.17, horizon=0.7, at=0.36)
    S.sky(stars=230, seed=61, calm=0.38)
    # the track: an ink band running in from the back-left, closed by its blue edge
    a, b = Vector((-5.5, 9.0, 0)), Vector((0.9, -0.2, 0))
    d = (b - a).normalized()
    ang = math.degrees(math.atan2(d.y, d.x))
    L = (b - a).length
    mid = (a + b) / 2
    G.ink_band(S, (L, 0.62, 0.08), mid, edge="top-front", rot_z=ang + 180)
    # tiles standing on the track, facing the camera side of the track
    n = len(KINDS)
    for i, k in enumerate(KINDS):
        t = 0.18 + 0.8 * (i / (n - 1)) ** 0.85
        p = a + (b - a) * t + Vector((0, 0, 0.08 + 0.2))
        G.standing_glyph(S, k, p + Vector((0, 0, 0.06)), s=0.48, t=0.035, rot_z=ang + 90 + 12)
    # the desk where the work is closed: a clay top on two ink legs, a ledger tablet on it
    desk = Vector((1.85, -0.95, 0))
    G.slab("desk-top", (1.6, 0.8, 0.07), desk + Vector((0, 0, 0.74)), S.mat("light"))
    for dx in (-0.7, 0.7):
        G.slab("desk-leg", (0.06, 0.72, 0.74), desk + Vector((dx, 0, 0)), S.mat("ink"))
    G.box("desk-edge", (1.6, 0.012, 0.012), desk + Vector((0, -0.41, 0.775)), S.mat("accent"), bevel=0)
    G.sheets(S, 4, (0.42, 0.3, 0.006), desk + Vector((-0.3, 0.05, 0.81)), seed=3, rot_z=8)
    G.standing_glyph(S, "done", desk + Vector((0.35, 0.0, 0.81 + 0.16)), s=0.26, t=0.03, rot_z=-10)
    S.studio(target=(0.8, -0.3, 0.5), scale=0.9, accent=(2.6, 0.6, 1.4), accent_energy=0.3)
    S.sun(100, 20, 0.35)
