"""workshops — furniture workshops: an exploded wardrobe. The carcass boards drift apart
along their own axes, their front edges banded in Signal blue; beneath them lies the
board they were cut from, the nested parts still in place and the empty slots outlined."""
from mathutils import Vector

from .. import geo as G

W, D, H, T = 2.0, 0.62, 2.5, 0.045  # wardrobe width, depth, height, board thickness
LIFT = 1.25  # the carcass floats above the sheet
SHEET_ROT = (34, 0, 0)  # the sheet beneath tips toward the camera so its nesting reads


def board(S, name, size, centre, explode, band_axis="x", role="light"):
    """A board at centre + explode, with its front (-Y) edge banded blue."""
    c = Vector(centre) + Vector(explode)
    G.box(name, size, c, S.mat(role))
    sx, sy, sz = size
    bw = 0.006
    if band_axis == "z":  # vertical board: band runs up the front edge
        G.box(name + "-band", (sx * 0.55, bw, sz), c + Vector((0, -sy / 2 - bw / 2 + 0.001, 0)), S.mat("accent"), bevel=0)
    elif band_axis == "x":  # horizontal board: band along the front edge
        G.box(name + "-band", (sx, bw, sz * 0.55), c + Vector((0, -sy / 2 - bw / 2 + 0.001, 0)), S.mat("accent"), bevel=0)


def build(S):
    z0 = LIFT
    # carcass, exploded
    board(S, "side-l", (T, D, H), (-W / 2 + T / 2, 0, z0 + H / 2), (-0.42, 0, 0.0), "z")
    board(S, "side-r", (T, D, H), (W / 2 - T / 2, 0, z0 + H / 2), (0.42, 0, 0.0), "z")
    board(S, "top", (W - 2 * T, D, T), (0, 0, z0 + H - T / 2), (0, 0, 0.38), "x")
    board(S, "bottom", (W - 2 * T, D, T), (0, 0, z0 + T / 2 + 0.08), (0, 0, -0.28), "x")
    board(S, "shelf-1", (W - 2 * T, D - 0.05, T), (0, 0, z0 + 0.85), (0, -0.22, 0), "x")
    board(S, "shelf-2", (W - 2 * T, D - 0.05, T), (0, 0, z0 + 1.55), (0, -0.34, 0.0), "x")
    board(S, "divider", (T, D - 0.05, 0.75), (0.25, 0, z0 + 0.48), (0, -0.12, 0), "z")
    G.box("back", (W - 0.02, 0.012, H - 0.02), (0, D / 2 + 0.42, z0 + H / 2), S.mat("body_alt"))
    # hanging rail
    G.box("rail", (W * 0.48, 0.03, 0.03), (-0.45, -0.02, z0 + 2.05), S.mat("slate_light"), bevel=0.002)

    # the sheet beneath, tipped toward the camera, with nested parts and empty slots
    sheet_w, sheet_d, sheet_t = 4.0, 2.0, 0.035
    sheet = G.empty("sheet", (0.0, -0.6, 0.62), SHEET_ROT)
    G.parent(G.box("sheet", (sheet_w, sheet_d, sheet_t), (0, 0, sheet_t / 2), S.mat("body")), sheet)
    kerf = 0.035
    layout = [(0.62, [0.92, 0.92]), (0.62, [0.92, 0.92]), (0.9, [0.58, 0.58, 0.67]), (0.9, [0.58, 0.58, 0.67]),
              (0.7, [0.45, 0.45, 0.45, 0.47])]
    lifted = {(0, 0), (1, 0), (2, 0), (3, 1)}  # these are the boards in the air: their slots outlined blue
    x = -sheet_w / 2 + kerf
    segs = []
    for ci, (pw, depths) in enumerate(layout):
        y = -sheet_d / 2 + kerf
        for ri, pd in enumerate(depths):
            if y + pd > sheet_d / 2 - kerf + 1e-6:
                break
            cx, cy = x + pw / 2, y + pd / 2
            if (ci, ri) in lifted:
                z = sheet_t + 0.003
                a, b = pw / 2 - 0.01, pd / 2 - 0.01
                c = [Vector((cx - a, cy - b, z)), Vector((cx + a, cy - b, z)), Vector((cx + a, cy + b, z)),
                     Vector((cx - a, cy + b, z))]
                segs += [(c[k], c[(k + 1) % 4]) for k in range(4)]
            else:
                G.parent(G.box("part", (pw, pd, 0.014), (cx, cy, sheet_t + 0.007), S.mat("light")), sheet)
            y += pd + kerf
        x += pw + kerf
    ob = G.beams("slots", segs, 0.0045, S.mat("line"), [0.9] * len(segs))
    G.parent(ob, sheet)

    S.camera(target=(0.25, 0.0, 1.55), azimuth=-58, focal=100, frame_w=9.4, shift_x=-0.16, horizon=0.84, at=0.38)
    S.sky(stars=200, seed=31, calm=0.38)
    S.studio(target=(0, 0, 1.4), scale=1.0, accent=(2.6, 2.6, 2.8), accent_energy=0.35)
    S.sun(110, 20, 0.4)
