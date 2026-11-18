"""qr-menu — the table menu: a table top under the night sky, a blocky QR tile standing
on it (a pattern, not real data) and the menu cards it opens, standing like tents."""
import random

from mathutils import Euler, Vector

from .. import geo as G


def qr_cells(n, rnd):
    """A QR-like pattern: three finder squares and noise (no data)."""
    cells = set()
    for ox, oy in ((0, 0), (n - 7, 0), (0, n - 7)):
        for i in range(7):
            for j in range(7):
                if i in (0, 6) or j in (0, 6) or (2 <= i <= 4 and 2 <= j <= 4):
                    cells.add((ox + i, oy + j))
    for i in range(n):
        for j in range(n):
            inside_finder = any(ox - 1 <= i <= ox + 7 and oy - 1 <= j <= oy + 7 for ox, oy in ((0, 0), (n - 7, 0), (0, n - 7)))
            if not inside_finder and rnd.random() < 0.46:
                cells.add((i, j))
    return cells


def build(S):
    rnd = random.Random(171)
    S.camera(target=(0.4, 0.1, 1.0), azimuth=-62, focal=100, frame_w=4.4, shift_x=-0.17, horizon=0.72, at=0.4)
    S.sky(stars=220, seed=172, calm=0.38)
    # the table: a square clay top on an ink pedestal
    top_z = 0.76
    G.slab("pedestal", (0.12, 0.12, top_z - 0.05), (0.3, 0.2, 0), S.mat("ink"))
    G.slab("foot", (0.7, 0.7, 0.03), (0.3, 0.2, 0), S.mat("ink"))
    G.slab("top", (1.7, 1.2, 0.05), (0.3, 0.2, top_z - 0.05), S.mat("light"))
    G.box("top-edge", (1.7, 0.01, 0.01), (0.3, -0.405, top_z - 0.005), S.mat("accent"), bevel=0)
    # the QR tile: an ink plate on a small stand, raised bone cells
    n, cs = 21, 0.018
    qc = Vector((0.05, 0.25, top_z + 0.24))
    G.slab("qr-stand", (0.16, 0.12, 0.05), (0.05, 0.3, top_z), S.mat("ink"))
    G.box("qr-plate", (n * cs + 0.06, 0.02, n * cs + 0.06), qc, S.mat("ink"), rot=(-12, 0, 0))
    R = Euler((-0.2094, 0, 0)).to_matrix()
    pts = [qc + R @ Vector(((i - (n - 1) / 2) * cs, -0.013, ((n - 1) / 2 - j) * cs)) for i, j in qr_cells(n, rnd)]
    G.cubes("qr-cells", pts, cs * 0.94, S.mat("light"))
    G.box("qr-edge", (n * cs + 0.06, 0.022, 0.006), qc + R @ Vector((0, 0, -(n * cs + 0.06) / 2)), S.mat("accent"),
          bevel=0, rot=(-12, 0, 0))
    # menu cards: tents of paper with hairline lines and a glyph each
    for k, (x, y, rz, glyph) in enumerate(((0.62, 0.0, -18, "blue"), (0.95, 0.42, -32, "done"))):
        for side in (-1, 1):
            G.box("card", (0.36, 0.006, 0.5), (x, y + side * 0.05, top_z + 0.24), S.mat("paper_sheet"), bevel=0.001,
                  rot=(side * 12, 0, rz))
        R2 = Euler((-0.2094, 0, rz * 0.01745)).to_matrix()
        base = Vector((x, y - 0.058, top_z + 0.24))
        for i in range(4):
            G.box("menu-line", (0.2 - 0.04 * (i % 2), 0.003, 0.012), base + R2 @ Vector((-0.02, -0.002, 0.12 - i * 0.06)),
                  S.mat("slate"), bevel=0, rot=(-12, 0, rz))
        G.standing_glyph(S, glyph, base + R2 @ Vector((0.11, -0.004, 0.12)), s=0.05, t=0.004, rot_z=rz)
    S.studio(target=(0.3, 0.1, 0.9), scale=0.65, accent=(1.4, 1.4, 1.6), accent_energy=0.3)
    S.sun(105, 22, 0.35)
