"""intelligence — market intelligence: a field of small company nodes running to the
horizon; a square lens hangs over one cluster and lights it, and thin lines carry the
cluster into a folder in the foreground."""
import random

from mathutils import Vector

from .. import geo as G


def build(S):
    rnd = random.Random(71)
    S.camera(target=(1.0, 1.2, 0.7), azimuth=-70, focal=100, frame_w=7.2, shift_x=-0.17, horizon=0.72, at=0.34)
    S.sky(stars=230, seed=72, calm=0.38)
    lens_c = Vector((1.6, 3.2, 0))
    cluster, field = [], []
    for gx in range(-14, 22):
        for gy in range(-4, 30):
            p = Vector((gx * 0.42 + rnd.uniform(-0.12, 0.12), gy * 0.42 + rnd.uniform(-0.12, 0.12), 0))
            thin = 0.45 if p.x > -1.0 else 0.8  # quieter toward the text side
            if rnd.random() < thin or (p - Vector((0.3, -1.2, 0))).length < 1.6:
                continue
            h = rnd.choice((0.08, 0.12, 0.12, 0.18, 0.26))
            s = rnd.choice((0.12, 0.14, 0.16))
            if (p - lens_c).length < 0.95:
                cluster.append((p, s, h))
            else:
                field.append((p, s, h))
    for p, s, h in field:
        G.slab("co", (s, s, h), p, S.mat("body"))
    for p, s, h in cluster:
        G.slab("co-lit", (s, s, h), p, S.mat("light"))
    # the lens: a square frame of ink with a blue inner edge, hanging over the cluster
    # the lens tips toward the camera so its square reads
    lz = 1.2
    lr = (48, 0, 0)
    G.frame("lens", 1.5, 0.06, 0.04, lens_c + Vector((0, 0, lz)), S.mat("ink"), rot=lr)
    G.frame("lens-edge", 1.38, 0.012, 0.042, lens_c + Vector((0, -0.001, lz)), S.mat("accent_soft"), rot=lr)
    S.area("lens-light", lens_c + Vector((0, 0.4, lz + 0.9)), lens_c, 1.2, 120.0, "#7FA6F0")
    # the folder in the foreground: two ink slabs and a tab
    f = Vector((0.3, -1.2, 0))
    G.slab("folder-back", (1.3, 0.95, 0.04), f, S.mat("ink"))
    G.slab("folder-tab", (0.42, 0.12, 0.04), f + Vector((-0.38, 0.52, 0)), S.mat("ink"))
    G.sheets(S, 3, (1.18, 0.86, 0.006), f + Vector((0.02, -0.01, 0.04)), seed=5, jitter=0.012)
    G.slab("folder-front", (1.3, 0.95, 0.03), f + Vector((0.03, -0.03, 0.065)), S.mat("body_alt"))
    G.box("folder-edge", (1.3, 0.012, 0.012), f + Vector((0.03, -0.506, 0.09)), S.mat("accent"), bevel=0)
    # lines from the lit companies to the folder, running on the ground at right angles
    segs = []
    tgt = f + Vector((0.2, 0.47, 0.02))
    for p, s, h in cluster[::2]:
        q = Vector((p.x, p.y, 0.01))
        segs += G.polyline([q, Vector((q.x, tgt.y + 0.6 + (q.x - lens_c.x) * 0.2, 0.01)),
                            Vector((tgt.x, tgt.y + 0.6 + (q.x - lens_c.x) * 0.2, 0.01)), Vector((tgt.x, tgt.y, 0.01))])
    G.beams("feeds", segs, 0.006, S.mat("line"), [0.7] * len(segs))
    S.studio(target=(1.0, 1.5, 0.3), scale=1.0, accent=(3.0, 4.0, 0.8), accent_energy=0.2, fill=0.8)
    S.sun(100, 20, 0.35)
