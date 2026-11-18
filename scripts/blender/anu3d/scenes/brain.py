"""brain — ANU Brain: a ziggurat core in ink, closed at its base by the thin Signal-blue
edge; modules (smaller slabs, clay and dark) docked on its terraces; from each module a
line rises into the night and joins the constellation of the ANU network."""
import random

from mathutils import Vector

from .. import geo as G

# modules per terrace: (terrace index, side, offset along the side, size x, y, z, role, glyph)
DOCK = [
    (0, "front", -1.1, (0.62, 0.34, 0.24), "light", "done"),
    (0, "front", 0.55, (0.42, 0.34, 0.34), "body_alt", "blue"),
    (0, "right", -0.6, (0.34, 0.6, 0.2), "body", "half"),
    (0, "right", 0.7, (0.34, 0.42, 0.3), "light", None),
    (1, "front", -0.35, (0.5, 0.3, 0.26), "body", "outline"),
    (1, "right", 0.15, (0.3, 0.52, 0.22), "light", "done"),
    (2, "front", 0.3, (0.36, 0.28, 0.2), "light", None),
]


def build(S):
    rnd = random.Random(9)
    S.camera(target=(0.2, 0.0, 0.9), azimuth=-62, focal=100, frame_w=10.8, shift_x=-0.15, horizon=0.6, at=0.3)
    S.sky(stars=240, seed=12, calm=0.38)

    base, inset = (4.4, 3.8), 0.52
    _, tops = G.ziggurat(S, base=base, levels=4, height=(0.62, 0.52, 0.46, 0.4), inset=inset, role="ink",
                         stairs=False, bevel=0.012)
    # the blue edge closing the base, all round
    e = 0.03
    bx, by = base[0] / 2 + e * 0.1, base[1] / 2 + e * 0.1
    for sx, sy, x, y in ((base[0], e * 0.4, 0, -by), (base[0], e * 0.4, 0, by), (e * 0.4, base[1], -bx, 0),
                         (e * 0.4, base[1], bx, 0)):
        G.box("core-edge", (sx, sy, e), (x, y, e / 2 + 0.002), S.mat("accent"), bevel=0)
    top, tx, ty = tops[-1]
    G.frame("core-top", min(tx, ty) * 0.5, 0.02, 0.006, top, S.mat("accent_soft"))

    # modules docked on the terraces' ledges
    anchors = []
    for lvl, side, off, (sx, sy, sz), role, glyph in DOCK:
        c, w, d = tops[lvl]
        nw, nd = tops[lvl + 1][1], tops[lvl + 1][2]  # the next terrace's wall
        if side == "front":
            p = Vector((off, -nd / 2 - sy / 2 - 0.02, c.z))
        else:
            p = Vector((nw / 2 + sx / 2 + 0.02, off, c.z))
        G.slab("module", (sx, sy, sz), p, S.mat(role))
        if glyph:
            g = min(sx, sy) * 0.45
            G.glyph(S, glyph, (p.x, p.y, p.z + sz), s=g, t=0.01)
        anchors.append(p + Vector((0, 0, sz)))

    # lines rising from the modules to stars: the constellation of the network
    sky_pts = [(0.5 + 0.45 * (i + rnd.random() * 0.6) / len(anchors), 0.74 + 0.2 * rnd.random())
               for i in range(len(anchors))]
    P = [S.uv(u, v) for u, v in sky_pts]
    segs, radii, glow = [], [], []
    for a, b in zip(sorted(anchors, key=lambda q: 0.88 * q.x + 0.47 * q.y), P):
        segs.append((a, b))
        radii.append((S.px_at(a, 0.24), S.px_at(b, 0.3)))
        glow.append((0.42, 0.06))
    G.beams("rising", segs, radii, S.mat("line"), glow)
    G.cubes("anchors", anchors, 0.03, S.mat("node"))
    extra, _ = S.sky_network(seed=4, n=7, u=(0.5, 0.98), v=(0.78, 0.96), k="tree", min_dist=0.05)
    allp = sky_pts + extra
    edges = G.mst([(u, v * S.aspect) for u, v in allp])
    S.constellation(allp, edges, line_px=0.8, line_glow=0.3, star_px=2.2, star_glow=1.0)

    S.studio(target=(0, 0, 0.6), scale=0.9, accent=(3.2, 3.0, 0.5), accent_energy=0.18, fill=0.6)
    S.sun(110, 18, 0.5)
