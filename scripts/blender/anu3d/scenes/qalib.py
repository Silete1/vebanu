"""qalib — precast concrete: panels and blocks stacked with spacers, crisp concrete, and
one panel in the air on a single Signal-blue lifting line."""
import math

from mathutils import Matrix, Vector

from .. import geo as G


def build(S):
    S.camera(target=(0.6, 0.4, 1.0), azimuth=-62, focal=100, frame_w=8.4, shift_x=-0.17, horizon=0.62, at=0.3)
    S.sky(stars=230, seed=81, calm=0.38)
    con, dark = S.mat("concrete"), S.mat("concrete_dark")
    # a stack of panels on timber-like spacers (dark concrete strips)
    z = 0.0
    for i in range(4):
        for dx in (-1.1, 1.1):
            G.slab("spacer", (0.14, 1.5, 0.08), (dx, 0, z), dark)
        z += 0.08
        G.slab("panel", (3.2, 1.5, 0.18), (0.03 * i, 0.02 * i, z), con)
        z += 0.18
    # blocks stacked in a stepped pile beside them
    bx = Vector((2.7, -0.5, 0))
    for row, n in enumerate((4, 3, 2)):
        for k in range(n):
            G.slab("block", (0.78, 0.4, 0.4), bx + Vector((0.8 * k + 0.4 * row - 1.2, 0, 0.4 * row)), con)
    # a hollow-core panel standing against them
    G.slab("wall-panel", (0.2, 1.6, 2.1), (-2.0, 0.4, 0), con, rot=(0, -6, 0))
    # the panel in the air, on its slings and the one blue lifting line
    hp = Vector((0.7, 0.6, 2.35))
    G.slab("panel-lift", (3.0, 1.4, 0.18), hp, con, rot=(0, 0, 8))
    hook = hp + Vector((0, 0, 1.25))
    corners = [hp + Vector((x, y, 0.18)) for x, y in ((-1.2, -0.45), (1.2, -0.45), (1.2, 0.45), (-1.2, 0.45))]
    R = Matrix.Rotation(math.radians(8), 3, "Z")
    corners = [hp + R @ (c - hp) for c in corners]
    G.beams("slings", [(hook, c) for c in corners], 0.008, S.mat("slate_light"))
    G.cubes("anchors", corners, 0.05, S.mat("slate"))
    G.beams("lift", [(hook, hook + Vector((0, 0, 9.0)))], 0.012, S.mat("accent"))
    G.box("hook", (0.12, 0.06, 0.18), hook, S.mat("ink"), bevel=0.01)
    S.studio(target=(0.6, 0.3, 1.0), scale=1.0, accent=(2.5, 3.5, 3.5), accent_energy=0.25)
    S.sun(105, 24, 0.45)
