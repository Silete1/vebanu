"""Clay tablets: unfired clay slabs with crisp wedge impressions (procedural, cuneiform-
like marks, never real text), ruled into registers like the first ledgers. Toward the
end of a tablet the marks can turn into square status glyphs (noise -> ledger), and one
pressed square can hold a Signal-blue inlay.

The marks are a height map drawn with numpy and displaced into a real grid mesh, so a
raking light casts true shadows into every wedge."""
import math
import random

import bpy
import numpy as np


from . import geo as G


class HeightMap:
    """Depth map in pixels (row 0 = bottom, like Blender images); positive = pressed in."""

    def __init__(self, w, h):
        self.w, self.h = w, h
        self.H = np.zeros((h, w), np.float32)

    def _region(self, x, y, r):
        x0, x1 = max(0, int(x - r)), min(self.w, int(x + r) + 2)
        y0, y1 = max(0, int(y - r)), min(self.h, int(y + r) + 2)
        if x0 >= x1 or y0 >= y1:
            return None
        X, Y = np.meshgrid(np.arange(x0, x1, dtype=np.float32), np.arange(y0, y1, dtype=np.float32))
        return (slice(y0, y1), slice(x0, x1)), X, Y

    def _put(self, sl, d):
        self.H[sl] = np.maximum(self.H[sl], d)

    def wedge(self, x, y, length, head, ang, depth, shaft_ratio=0.22):
        """A stylus wedge: triangular head at (x, y), tail along `ang` (degrees)."""
        reg = self._region(x, y, length + head)
        if reg is None:
            return
        sl, X, Y = reg
        c, s = math.cos(math.radians(ang)), math.sin(math.radians(ang))
        du = (X - x) * c + (Y - y) * s
        dv = -(X - x) * s + (Y - y) * c
        a = min(head * 0.95, length)
        shaft = head * shaft_ratio
        tail = max(length - a, 1e-3)
        hw = np.where(du < a, head / 2 - (head / 2 - shaft / 2) * du / a, shaft / 2 * (1 - (du - a) / tail))
        hw = np.maximum(hw, 1e-3)
        inside = (du >= 0) & (du <= length) & (np.abs(dv) < hw)
        prof = 1 - np.abs(dv) / hw
        along = np.where(du < a, 1 - 0.3 * du / a, 0.7 * (1 - (du - a) / tail))
        self._put(sl, np.where(inside, depth * prof * along, 0))

    def ring(self, cx, cy, size, width, depth):
        """Square outline groove (the 'outline' glyph)."""
        reg = self._region(cx, cy, size)
        if reg is None:
            return
        sl, X, Y = reg
        dist = np.maximum(np.abs(X - cx), np.abs(Y - cy))  # Chebyshev: square rings
        off = np.abs(dist - (size / 2 - width / 2))
        self._put(sl, np.where(off < width / 2, depth * (1 - off / (width / 2)), 0))

    def square(self, cx, cy, size, depth, wall=None, half=False):
        """Pressed square with sloped walls ('done' glyph); half=True presses the lower half."""
        wall = wall or size * 0.12
        reg = self._region(cx, cy, size)
        if reg is None:
            return
        sl, X, Y = reg
        y_top = cy if half else cy + size / 2
        inner = np.minimum.reduce([X - (cx - size / 2), (cx + size / 2) - X, Y - (cy - size / 2), y_top - Y])
        self._put(sl, np.where(inner > 0, depth * np.clip(inner / wall, 0, 1), 0))

    def rule(self, y, x0, x1, width, depth):
        """A ruled line between registers (V groove)."""
        y0, y1 = max(0, int(y - width)), min(self.h, int(y + width) + 2)
        X0, X1 = max(0, int(x0)), min(self.w, int(x1))
        Y = np.arange(y0, y1, dtype=np.float32)[:, None]
        off = np.abs(Y - y)
        d = np.where(off < width / 2, depth * (1 - off / (width / 2)), 0) * np.ones((1, X1 - X0), np.float32)
        self._put((slice(y0, y1), slice(X0, X1)), d)

    def dingir(self, cx, cy, size, depth):
        """The dingir sign impressed: four wedges crossing at the centre."""
        for k in range(4):
            ang = 45 * k + (180 if k % 2 else 0)
            hx = cx - math.cos(math.radians(ang)) * size / 2
            hy = cy - math.sin(math.radians(ang)) * size / 2
            self.wedge(hx, hy, size, size * 0.26, ang, depth)


def _sign(hm, rnd, x, y, rh, depth):
    """One cuneiform-like sign in a cell of height rh starting at x (row centre y).
    Returns the cell width used."""
    kind = rnd.random()
    hd = rh * 0.3
    if kind < 0.28:  # a number: 2..5 vertical wedges in up to two tiers
        n = rnd.randint(2, 5)
        top = min(n, 3)
        for i in range(n):
            tier = 0 if i < top else 1
            xi = x + hd * 0.6 + (i if tier == 0 else i - top) * hd * 0.85
            yi = y + rh * 0.38 - tier * rh * 0.42
            hm.wedge(xi, yi, rh * (0.75 if n <= 3 else 0.4), hd * 0.9, -90, depth)
        return top * hd * 0.85 + hd * 0.9
    if kind < 0.5:  # horizontals stacked + a vertical
        for k in range(rnd.randint(1, 3)):
            hm.wedge(x, y + rh * 0.3 - k * rh * 0.3, rh * 0.9, hd, 0, depth)
        hm.wedge(x + rh * 0.95, y + rh * 0.42, rh * 0.84, hd, -90, depth)
        return rh * 1.15
    if kind < 0.7:  # winkelhaken pair + horizontal
        hm.wedge(x, y + rh * 0.15, hd * 1.1, hd * 1.1, 0, depth)
        hm.wedge(x, y - rh * 0.22, hd * 1.1, hd * 1.1, 0, depth)
        hm.wedge(x + hd * 1.4, y, rh * 0.8, hd, 0, depth)
        return hd * 1.4 + rh * 0.85
    if kind < 0.85:  # diagonal + vertical
        hm.wedge(x, y + rh * 0.4, rh * 0.75, hd, -45, depth)
        hm.wedge(x + rh * 0.62, y + rh * 0.42, rh * 0.84, hd, -90, depth)
        return rh * 0.85
    # a long horizontal with two verticals across it
    hm.wedge(x, y, rh * 1.5, hd, 0, depth)
    for k in range(2):
        hm.wedge(x + rh * (0.45 + 0.5 * k), y + rh * 0.42, rh * 0.84, hd * 0.95, -90, depth)
    return rh * 1.55


def tablet_map(w, h, seed=1, rows=6, glyphs_from=None, dingir=True, inlays=1):
    """Draw a tablet face. glyphs_from (0..1 along the row) turns wedges into square
    glyph impressions toward the end of each register. Returns (HeightMap, inlay px list)."""
    rnd = random.Random(seed)
    hm = HeightMap(w, h)
    margin = int(min(w, h) * 0.08)
    reg_h = (h - 2 * margin) / rows
    depth = 1.0
    inl = []
    for r in range(rows):
        y_top = h - margin - r * reg_h
        if r > 0:
            hm.rule(y_top, margin * 0.6, w - margin * 0.6, max(2.0, reg_h * 0.05), depth * 0.45)
        yc = y_top - reg_h / 2
        rh = reg_h * 0.62
        x = margin
        if r == 0 and dingir:
            hm.dingir(x + rh * 0.5, yc, rh * 0.95, depth)
            x += rh * 1.3
        while x < w - margin - rh * 0.6:
            f = x / w
            if glyphs_from is not None and f > glyphs_from and rnd.random() < min(1.0, (f - glyphs_from) * 3.2):
                s = rh * 0.78
                cx = x + s / 2
                state = rnd.random()
                g = (f - glyphs_from) / (1 - glyphs_from)
                if state < 0.45 - 0.3 * g:
                    hm.ring(cx, yc, s, s * 0.16, depth * 0.8)
                elif state < 0.7 - 0.2 * g:
                    hm.ring(cx, yc, s, s * 0.16, depth * 0.8)
                    hm.square(cx, yc, s * 0.8, depth * 0.6, half=True)
                else:
                    hm.square(cx, yc, s, depth * 0.7)
                    inl.append((cx, yc, s))
                x += s * 1.45
            else:
                x += _sign(hm, rnd, x, yc, rh, depth) + rh * rnd.uniform(0.3, 0.6)
    rnd.shuffle(inl)
    return hm, inl[:inlays]


def tablet(S, size=(1.6, 1.05, 0.2), loc=(0, 0, 0), rot=(0, 0, 0), seed=1, rows=6, glyphs_from=None,
           dingir=True, inlays=0, res=480, depth=0.012, edge=0.035, role="clay"):
    """A clay tablet object (top face = marked face, local +Z). Returns the parent empty."""
    sx, sy, sz = size
    nx = res
    ny = max(8, int(res * sy / sx))
    px_w, px_h = nx * 3, ny * 3  # draw the marks at 3x the mesh resolution, then sample
    hm, inl = tablet_map(px_w, px_h, seed, rows, glyphs_from, dingir, inlays)
    H = hm.H
    # sample the map at the grid vertices (box filter 3x3)
    Hs = H[: ny * 3, : nx * 3].reshape(ny, 3, nx, 3).mean(axis=(1, 3))
    xs = np.linspace(-sx / 2, sx / 2, nx)
    ys = np.linspace(-sy / 2, sy / 2, ny)
    X, Y = np.meshgrid(xs, ys)
    # a crisp, slightly softened edge: the face falls away within `edge` of the border
    dx = np.minimum(X + sx / 2, sx / 2 - X)
    dy = np.minimum(Y + sy / 2, sy / 2 - Y)
    e = np.clip(np.minimum(dx, dy) / edge, 0, 1)
    fall = (1 - e) ** 2 * edge * 0.55
    Z = sz / 2 - Hs * depth - fall
    verts = np.stack([X, Y, Z], axis=-1).reshape(-1, 3)
    idx = np.arange(nx * ny).reshape(ny, nx)
    q = np.stack([idx[:-1, :-1], idx[:-1, 1:], idx[1:, 1:], idx[1:, :-1]], axis=-1).reshape(-1, 4)
    # side walls and bottom
    ring = list(idx[0, :]) + list(idx[1:, -1]) + list(idx[-1, -2::-1]) + list(idx[-2:0:-1, 0])
    base = len(verts)
    bottom = np.array([[verts[i][0], verts[i][1], -sz / 2] for i in ring])
    all_verts = np.concatenate([verts, bottom])
    faces = [tuple(f) for f in q.tolist()]
    n = len(ring)
    for k in range(n):
        a, b = ring[k], ring[(k + 1) % n]
        faces.append((b, a, base + k, base + (k + 1) % n))
    faces.append(tuple(base + k for k in reversed(range(n))))
    me = bpy.data.meshes.new("tablet")
    me.from_pydata(all_verts.tolist(), [], faces)
    me.update()
    par = G.empty("tablet", loc, rot)
    ob = bpy.data.objects.new("tablet", me)
    G.link(ob)
    me.materials.append(S.mat(role))
    G.parent(ob, par)
    for cx, cy, s in inl:  # Signal-blue inlays in pressed squares
        lx = -sx / 2 + cx / px_w * sx
        ly = -sy / 2 + cy / px_h * sy
        w = s / px_w * sx * 0.72
        ib = G.box("inlay", (w, w, depth * 0.3), (lx, ly, sz / 2 - depth * 0.62), S.mat("accent"), bevel=0)
        G.parent(ib, par)
    return par
