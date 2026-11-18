"""home — the hero. Night over a low horizon: a sharp ziggurat on the plain with one
Signal-blue light at its top; above it the ANU line network as a constellation that,
toward the top of the sky, resolves into an ordered grid of square glyphs (noise to
control); in the foreground a clay tablet whose wedge marks turn into square glyphs.
16:9, the left third calm sky for the headline (home-rtl is the mirror)."""
import math
import random

from mathutils import Euler, Vector

from .. import clay
from .. import geo as G

HORIZON = 0.3
TABLET = Vector((0.0, 0.0, 0.5))
TABLET_ROT = (71, 0, 16)


def lattice(S, rnd, u0, u1, v0, v1, cols, rows):
    """Constellation lattice: jittered (chaos) at the bottom, exact (order) at the top."""
    nodes = {}
    pu = (u1 - u0) / (cols - 1)
    pv = (v1 - v0) / (rows - 1)
    for r in range(rows):
        o = (r / (rows - 1)) ** 1.15  # order grows with height
        for c in range(cols):
            if o < 0.5 and rnd.random() < 0.45 * (1 - o):  # the noise is sparse
                continue
            ju = (rnd.random() - 0.5) * pu * 2.2 * (1 - o) ** 1.5
            jv = (rnd.random() - 0.5) * pv * 2.2 * (1 - o) ** 1.5
            nodes[(r, c)] = (u0 + c * pu + ju, v0 + r * pv + jv, o)
    edges = []
    for r, c in sorted(nodes):
        o = nodes[(r, c)][2]
        for dr, dc in ((0, 1), (1, 0)):
            n = (r + dr, c + dc)
            if n in nodes and rnd.random() < 0.3 + 0.6 * o:
                edges.append(((r, c), n))
        if o < 0.45:  # chaotic diagonals in the noise
            for n in ((r + 1, c + 1), (r + 1, c - 1), (r, c + 2)):
                if n in nodes and rnd.random() < 0.3:
                    edges.append(((r, c), n))
    return nodes, edges, pu


def build(S):
    rnd = random.Random(42)
    S.cfg = dict(S.cfg, horizon_strength=0.2, glow_k1=0.03, glow_k2=0.12, glow_w2=0.25)
    S.camera(target=TABLET, azimuth=-90, focal=100, frame_w=8.6, shift_x=-0.24, horizon=HORIZON, at=0.17)
    S.sky(stars=330, seed=17, calm=0.36, dingir=1, brightest=0.9)

    # the ziggurat on the horizon, two-thirds across
    zp = S.uv(0.62, HORIZON, depth=78.0)
    zp.z = 0.0
    ZB = (8.4, 6.8)
    _, tops = G.ziggurat(S, base=ZB, levels=4, height=(1.15, 0.92, 0.76, 0.6), inset=0.95,
                         loc=zp, role="brick", rot_z=-6, bevel=0.04)
    Rz = Euler((0, 0, math.radians(-6))).to_matrix()
    top, tx, ty = tops[-1]
    # the shrine on the top terrace and its Signal-blue light
    sw = min(tx, ty) * 0.42
    G.slab("shrine", (sw, sw, 0.6), top, S.mat("brick"), rot=(0, 0, -6))
    beacon = G.box("beacon", (sw * 0.55, sw * 0.55, sw * 0.55), top + Vector((0, 0, 0.6 + sw * 0.275)),
                   S.mat("accent", strength=30.0), bevel=0)
    # the light washes the terraces' fronts from the top, fading downward
    signal = S.point("signal", top + Rz @ Vector((0, -ty / 2 - 1.4, 1.1)), 3400.0, "signal", radius=0.3,
                     skip_ground=True)
    # the base of the ziggurat closed by the thin blue edge (the band's edge, at monument scale)
    base_front = Vector(zp) + Rz @ Vector((0, -ZB[1] / 2 - 0.95 * 2.2 - 0.03, 0.03))
    G.box("zig-edge", (ZB[0], 0.03, 0.06), base_front, S.mat("accent_soft"), bevel=0, rot=(0, 0, -6))

    # the constellation: noise above the ziggurat resolving into a glyph grid at the top
    nodes, edges, pitch = lattice(S, rnd, 0.52, 0.92, 0.6, 0.87, cols=9, rows=7)
    pts, star_px, star_glow, glyphs, index = [], [], [], [], {}
    for key, (u, v, o) in nodes.items():
        if o > 0.7:  # ordered: square glyphs
            roll = rnd.random()
            if o > 0.97:
                kind = "done" if roll < 0.55 else ("blue" if roll < 0.75 else "half")
            else:
                kind = "blue" if roll < 0.18 else ("half" if roll < 0.5 else "outline")
            glyphs.append((u, v, pitch * (0.13 + 0.06 * o), kind, {"outline": 0.07, "half": 0.08, "done": 0.09,
                                                                  "blue": 0.24}[kind]))
        index[key] = len(pts)
        pts.append((u, v))
        star_px.append(1.6 + 1.6 * rnd.random() if o <= 0.7 else 0.01)
        star_glow.append(0.5 + 0.7 * rnd.random() if o <= 0.7 else 0.0)
    E, line_glow = [], []
    for a, b in edges:
        E.append((index[a], index[b]))
        oo = (nodes[a][2] + nodes[b][2]) / 2
        line_glow.append(0.28 - 0.14 * oo)  # the noise glows, the order is quiet
    S.constellation(pts, E, line_px=0.8, line_glow=line_glow, star_px=star_px, star_glow=star_glow)
    S.sky_glyphs(glyphs)

    # the clay tablet in the foreground: wedge marks becoming square glyphs, one blue inlay
    clay.tablet(S, size=(1.7, 1.12, 0.22), loc=TABLET, rot=TABLET_ROT, seed=3, rows=5, glyphs_from=0.5,
                dingir=True, inlays=1, depth=0.02, res=560)
    R = Euler(tuple(math.radians(a) for a in TABLET_ROT)).to_matrix()
    tangent, normal = R @ Vector((1, 0, 0)), R @ Vector((0, 0, 1))
    S.studio(target=TABLET, scale=0.6, key_pos=TABLET - tangent * 5.0 + normal * 1.3 + Vector((0, 0, 0.7)),
             key_size=3.0, rim_az=160, rim_el=30, rim=0.5, fill=0.15)
    S.sun(-125, 38, 0.9)  # faint moonlight from the front-left: the terraces just read
    # kept for the loop
    S.home = dict(beacon=beacon, signal=signal, spark_edge=_spark_edge(pts, E, nodes, index))


def _spark_edge(pts, E, nodes, index):
    """The constellation line the shooting light runs along: a long one in the noise."""
    rev = {i: k for k, i in index.items()}
    best = max((e for e in E if nodes[rev[e[0]]][2] < 0.5 and nodes[rev[e[1]]][2] < 0.5),
               key=lambda e: (pts[e[0]][0] - pts[e[1]][0]) ** 2 + (pts[e[0]][1] - pts[e[1]][1]) ** 2)
    return pts[best[0]], pts[best[1]]


def animate(S, n):
    """6 s seamless loop: the sky drifts, a light runs along one constellation line, the
    blue light on the ziggurat breathes."""
    from .. import anim
    from .. import geo as G2

    h = S.home
    # the shooting light: a bright point with a short tail, crossing in the middle of the loop
    (u0, v0), (u1, v1) = h["spark_edge"]
    sparks = []
    for k in range(5):
        ob = G2.cubes(f"spark-{k}", [S.uv(0.5, 0.5)], S.px(3.2 - 0.45 * k), S.mat("star"), [2.2 - 0.4 * k])
        sparks.append(ob)
    start, dur = 0.38, 0.2
    for f, t in anim.frames_t(n):
        for k, ob in enumerate(sparks):
            s = (t - start) / dur - 0.06 * k
            vis = 0.0 <= s <= 1.0
            s = min(1.0, max(0.0, s))
            ease = s * s * (3 - 2 * s)
            target = S.uv(u0 + (u1 - u0) * ease, v0 + (v1 - v0) * ease)
            ob.location = target - S.uv(0.5, 0.5)
            ob.scale = (1, 1, 1) if vis else (0.0001, 0.0001, 0.0001)
            ob.keyframe_insert("location", frame=f)
            ob.keyframe_insert("scale", frame=f)
    anim.sky_drift(S, n, yaw_deg=0.1, pitch_deg=0.05)
    anim.camera_drift(S, n, ax=0.05, az=0.02)
    sig = h["signal"].data
    em = h["beacon"].material_slots[0].material.node_tree.nodes["anu-emission"].inputs["Strength"]

    def set_light(v, f):
        sig.energy = 3400.0 * v
        sig.keyframe_insert("energy", frame=f)
        em.default_value = 30.0 * v
        em.keyframe_insert("default_value", frame=f)

    anim.pulse(n, set_light, 0.55, 1.15)
