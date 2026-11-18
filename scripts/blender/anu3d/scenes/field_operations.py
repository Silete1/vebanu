"""field-operations — work in the field: a tile of terrain with a survey grid and field
markers; data sheets rise from it, one above the other, into a clean report slab."""
import random

import bpy
import numpy as np
from mathutils import Vector

from .. import geo as G

T = 3.2  # tile size


def terrain(S, n=160, height=0.32, base=0.25, seed=3):
    """A square tile of rolling relief with sharp vertical sides."""
    rnd = np.random.default_rng(seed)
    xs = np.linspace(-T / 2, T / 2, n)
    X, Y = np.meshgrid(xs, xs)
    Z = np.zeros_like(X)
    for _ in range(9):
        cx, cy = rnd.uniform(-T / 2, T / 2, 2)
        r = rnd.uniform(0.4, 1.2)
        Z += rnd.uniform(-0.6, 1.0) * np.exp(-((X - cx) ** 2 + (Y - cy) ** 2) / (2 * r * r))
    Z = (Z - Z.min()) / (Z.max() - Z.min()) * height + base
    idx = np.arange(n * n).reshape(n, n)
    verts = np.stack([X, Y, Z], -1).reshape(-1, 3).tolist()
    faces = np.stack([idx[:-1, :-1], idx[:-1, 1:], idx[1:, 1:], idx[1:, :-1]], -1).reshape(-1, 4).tolist()
    ring = list(idx[0, :]) + list(idx[1:, -1]) + list(idx[-1, -2::-1]) + list(idx[-2:0:-1, 0])
    b0 = len(verts)
    verts += [[verts[i][0], verts[i][1], 0.0] for i in ring]
    m = len(ring)
    faces += [[ring[(k + 1) % m], ring[k], b0 + k, b0 + (k + 1) % m] for k in range(m)]
    faces.append([b0 + k for k in reversed(range(m))])
    me = bpy.data.meshes.new("terrain")
    me.from_pydata(verts, [], faces)
    me.update()
    for p in me.polygons:
        p.use_smooth = True
    ob = bpy.data.objects.new("terrain", me)
    G.link(ob)
    me.materials.append(S.mat("clay"))
    return lambda x, y: float(Z[int(round((y + T / 2) / T * (n - 1))), int(round((x + T / 2) / T * (n - 1)))])


def build(S):
    rnd = random.Random(151)
    S.camera(target=(0.7, 0.5, 0.9), azimuth=-60, focal=100, frame_w=8.6, shift_x=-0.17, horizon=0.78, at=0.3)
    S.sky(stars=220, seed=152, calm=0.38)
    h = terrain(S)
    # the survey grid draped on the relief (hairlines)
    segs = []
    k = 8
    for i in range(k + 1):
        t = -T / 2 + T * i / k
        line_a = [Vector((t, -T / 2 + T * j / 40, 0)) for j in range(41)]
        line_b = [Vector((-T / 2 + T * j / 40, t, 0)) for j in range(41)]
        for line in (line_a, line_b):
            pts = [Vector((p.x, p.y, h(p.x, p.y) + 0.006)) for p in line]
            segs += list(zip(pts[:-1], pts[1:]))
    G.beams("grid", segs, 0.0035, S.mat("hair"), [0.6] * len(segs))
    # field markers: thin posts with square flags
    marks = []
    for i in range(7):
        x, y = rnd.uniform(-1.3, 1.3), rnd.uniform(-1.3, 1.3)
        z = h(x, y)
        G.slab("post", (0.025, 0.025, 0.42), (x, y, z), S.mat("light"))
        G.standing_glyph(S, "blue" if i == 2 else "done", (x + 0.07, y, z + 0.38), s=0.12, t=0.012)
        marks.append(Vector((x, y, z + 0.42)))
    # data sheets rising into the report slab, up and to the right
    rep = Vector((2.4, 1.2, 2.5))
    for i in range(5):
        t = (i + 1) / 6
        p = Vector((0.4, 0.2, 0.9)).lerp(rep - Vector((0, 0, 0.3)), t)
        G.box("sheet", (0.5, 0.36, 0.008), p, S.mat("paper_sheet"), bevel=0.001, rot=(62 + rnd.uniform(-6, 6), 0, 20))
    G.box("report", (1.3, 0.9, 0.07), rep, S.mat("ink"), rot=(72, 0, 22))
    G.box("report-face", (1.18, 0.78, 0.004), rep + Vector((0.01, -0.04, 0.0)), S.mat("light"), bevel=0, rot=(72, 0, 22))
    from mathutils import Euler

    R = Euler((1.2566, 0, 0.384)).to_matrix()
    G.box("report-edge", (1.3, 0.016, 0.075), rep + R @ Vector((0, -0.45, 0)), S.mat("accent"), bevel=0, rot=(72, 0, 22))
    G.beams("rise", [(m, rep) for m in marks[:3]], [(S.px_at(m, 0.4), S.px_at(rep, 0.4)) for m in marks[:3]],
            S.mat("line"), [(0.6, 0.2)] * 3)
    S.studio(target=(0.5, 0.3, 0.6), scale=1.0, accent=(3.0, 3.0, 2.6), accent_energy=0.25)
    S.sun(105, 22, 0.4)
