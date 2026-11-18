"""maps — a folded map laid open on the plain: panels at sharp folds, a Signal route
crossing them, square-headed pins at the stops, the grid of the sheet in hairlines."""
import math

import bpy

from mathutils import Vector

from .. import geo as G

PW, PD, N = 0.9, 2.2, 5  # panel width, depth, count
FOLD = 14
TILT = (24, 0, 0)  # the whole sheet tips toward the camera so all panels read
LIFT = 0.55  # degrees: the zig-zag of the folds


def surface_point(x, y):
    """A point on the folded map: x across the panels, y along them."""
    k = min(N - 1, max(0, int(x // PW)))
    t = x - k * PW
    rise = math.sin(math.radians(FOLD)) * PW
    z = (t if k % 2 == 0 else PW - t) / PW * rise
    return Vector((x - N * PW / 2, y, z + 0.02))


def _adopt(par, before):
    for ob in bpy.data.objects:
        if ob.name not in before and ob is not par and ob.parent is None and ob.type in ("MESH",):
            G.parent(ob, par)


def build(S):
    S.camera(target=(0.75, 0.4, 0.7), azimuth=-66, focal=100, frame_w=7.4, shift_x=-0.2, horizon=0.8, at=0.4)
    S.sky(stars=220, seed=182, calm=0.38)
    before = {o.name for o in bpy.data.objects}
    par = G.empty("map", (0, 0, LIFT), TILT)
    for k in range(N):
        a = surface_point(k * PW + 1e-4, 0)
        b = surface_point((k + 1) * PW - 1e-4, 0)
        c = (a + b) / 2
        ang = math.degrees(math.atan2(b.z - a.z, b.x - a.x))
        G.box("panel", (PW / math.cos(math.radians(FOLD)), PD, 0.012), c + Vector((0, 0, -0.012)),
              S.mat("light" if k % 2 == 0 else "paper_sheet"), bevel=0.001, rot=(0, -ang, 0))
    # the sheet grid in hairlines
    segs = []
    for gx in range(1, N * 3):
        x = gx * PW / 3
        segs.append((surface_point(x, -PD / 2 + 0.02), surface_point(x, PD / 2 - 0.02)))
    for gy in range(1, 8):
        y = -PD / 2 + gy * PD / 8
        pts = [surface_point(x * 0.05, y) for x in range(int(N * PW / 0.05) + 1)]
        segs += list(zip(pts[:-1], pts[1:]))
    G.beams("grid", segs, 0.0025, S.mat("hair"), [0.5] * len(segs))
    # the route: right-angled, crossing the folds, with pins at the stops
    stops = [(0.3, -0.7), (1.4, -0.7), (1.4, 0.35), (2.6, 0.35), (2.6, -0.2), (3.9, -0.2), (3.9, 0.75)]
    route = []
    for (x0, y0), (x1, y1) in zip(stops[:-1], stops[1:]):
        n = max(2, int(math.hypot(x1 - x0, y1 - y0) / 0.04))
        route += [surface_point(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n) + Vector((0, 0, 0.004)) for i in range(n)]
    route.append(surface_point(*stops[-1]))
    G.beams("route", list(zip(route[:-1], route[1:])), 0.008, S.mat("line"), [0.8] * (len(route) - 1))
    for i, (x, y) in enumerate(stops[::2]):
        p = surface_point(x, y)
        G.slab("pin", (0.018, 0.018, 0.36), p, S.mat("light"))  # pins stand on the sheet
        G.slab("pin-head", (0.1, 0.1, 0.1), p + Vector((0, 0, 0.36)),
               S.mat("glyph_blue" if i == len(stops[::2]) - 1 else "ink"))
    _adopt(par, before)
    S.studio(target=(0.3, 0.2, 0.4), scale=0.85, accent=(2.4, 1.8, 1.2), accent_energy=0.2)
    S.sun(105, 22, 0.35)
