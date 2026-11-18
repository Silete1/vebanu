"""construction — a building frame rising floor by floor (columns and slabs), the floor
being built now drawn in Signal-blue lines, and in front the ledger it is kept in: a clay
tablet whose marks are square glyphs."""
from mathutils import Vector

from .. import clay
from .. import geo as G

NX, NY, BAY, FH = 4, 3, 1.1, 0.72


def build(S):
    S.camera(target=(0.9, 0.0, 1.5), azimuth=-60, focal=100, frame_w=10.0, shift_x=-0.17, horizon=0.64, at=0.36)
    S.sky(stars=230, seed=101, calm=0.38)
    w, d = NX * BAY, NY * BAY
    ox, oy = -w / 2 + 0.6, -d / 2 + 1.0
    floors_done, floor_now = 3, 3
    for f in range(floors_done + 1):
        z = f * FH
        if f <= floors_done:
            G.slab("floor", (w + 0.2, d + 0.2, 0.1), (ox + w / 2, oy + d / 2, z), S.mat("concrete"))
        if f == floors_done:
            break
        for i in range(NX + 1):
            for j in range(NY + 1):
                G.slab("col", (0.1, 0.1, FH - 0.1), (ox + i * BAY, oy + j * BAY, z + 0.1), S.mat("concrete"))
    # the floor being built: its columns and slab outline in blue lines, with a few columns standing
    z0 = floor_now * FH + 0.1
    segs = []
    for i in range(NX + 1):
        for j in range(NY + 1):
            p = Vector((ox + i * BAY, oy + j * BAY, z0))
            if (i + j) % 3 == 0:
                G.slab("col-new", (0.1, 0.1, FH - 0.1), p, S.mat("concrete"))
            else:
                segs.append((p, p + Vector((0, 0, FH - 0.1))))
    top = z0 + FH - 0.1
    segs += G.box_edges((ox + w / 2, oy + d / 2, top + 0.05), (w + 0.2, d + 0.2, 0.1))
    for i in range(NX + 1):
        segs.append((Vector((ox + i * BAY, oy - 0.1, top + 0.1)), Vector((ox + i * BAY, oy + d + 0.1, top + 0.1))))
    G.beams("floor-now", segs, 0.008, S.mat("line"), [0.9] * len(segs))
    # crane mast at the back for scale
    G.beams("mast", G.truss_segments((ox + w + 0.8, oy + d + 0.4, 0), (ox + w + 0.8, oy + d + 0.4, 5.2), 0.3, 0.3, 12),
            0.014, S.mat("slate"))
    G.beams("jib", G.truss_segments((ox + w + 2.2, oy + d + 0.4, 5.2), (ox - 1.5, oy + d + 0.4, 5.2), 0.24, 0.24, 18),
            0.012, S.mat("slate"))
    # the ledger in front: a tablet of square glyphs
    clay.tablet(S, size=(1.3, 0.85, 0.16), loc=(2.3, -2.6, 0.38), rot=(66, 0, 18), seed=11, rows=4,
                glyphs_from=0.0, dingir=False, inlays=1, depth=0.016, res=420)
    S.studio(target=(0.6, 0.0, 1.3), scale=1.1, accent=(3.5, -1.5, 3.0), accent_energy=0.2)
    S.sun(105, 24, 0.45)
