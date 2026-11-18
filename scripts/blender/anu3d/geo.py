"""Procedural geometry in the ANU language: sharp slabs with tiny chamfers, square status
glyphs, thin emissive lines (one mesh per family, brightness per segment through the
'glow' attribute), the ink band with its blue edge, the line network, trusses."""
import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector

_MESH_CACHE = {}


def reset():
    _MESH_CACHE.clear()


def link(ob):
    bpy.context.scene.collection.objects.link(ob)
    return ob


def _obj(name, me, loc=(0, 0, 0), rot=(0, 0, 0), mat=None, shadow=True):
    ob = bpy.data.objects.new(name, me)
    ob.location = Vector(loc)
    ob.rotation_euler = tuple(math.radians(a) for a in rot)
    if mat is not None:
        if not me.materials:
            me.materials.append(mat)
        slot = ob.material_slots[0]
        slot.link = "OBJECT"
        slot.material = mat
        if mat.get("anu_emitter"):
            ob.visible_shadow = False
    if not shadow:
        ob.visible_shadow = False
    return link(ob)


# ---------------------------------------------------------------- slabs
def _box_mesh(sx, sy, sz, bevel):
    key = ("box", round(sx, 5), round(sy, 5), round(sz, 5), round(bevel, 5))
    if key in _MESH_CACHE:
        return _MESH_CACHE[key]
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=(sx, sy, sz), verts=bm.verts)
    if bevel > 0:
        bmesh.ops.bevel(bm, geom=bm.edges[:] + bm.verts[:], offset=bevel, segments=1, affect="EDGES",
                        profile=0.5, clamp_overlap=True)
    me = bpy.data.meshes.new("box")
    bm.to_mesh(me)
    bm.free()
    _MESH_CACHE[key] = me
    return me


def default_bevel(size):
    return min(0.007, 0.22 * min(size))


def box(name, size, loc, mat, bevel=None, rot=(0, 0, 0), shadow=True):
    """Axis box centred at loc (size = full extents)."""
    b = default_bevel(size) if bevel is None else bevel
    return _obj(name, _box_mesh(*size, b), loc, rot, mat, shadow)


def slab(name, size, base, mat, bevel=None, rot=(0, 0, 0)):
    """Box standing on a point: base = (x, y, z_bottom)."""
    x, y, z = base
    return box(name, size, (x, y, z + size[2] / 2), mat, bevel, rot)


# ---------------------------------------------------------------- mesh batches
def _mesh_from(name, verts, faces, glow=None):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    if glow is not None:
        a = me.attributes.new("glow", "FLOAT", "POINT")
        a.data.foreach_set("value", glow)
    return me


def _frame(d):
    d = Vector(d).normalized()
    ref = Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((1, 0, 0))
    u = d.cross(ref).normalized()
    v = d.cross(u).normalized()
    return u, v


def beams(name, segments, radius, mat, glow=None, square=True):
    """Many thin prisms (lines) as one mesh. segments = [(a, b), ...]; glow = per segment,
    a number or an (at_a, at_b) pair for a gradient along the line. radius = a number,
    or a list of (r_a, r_b) per segment (tapered: constant apparent width in depth)."""
    verts, faces, g = [], [], []
    for i, (a, b) in enumerate(segments):
        a, b = Vector(a), Vector(b)
        if (b - a).length < 1e-6:
            continue
        ra, rb = radius[i] if isinstance(radius, (list, tuple)) else (radius, radius)
        u, v = _frame(b - a)
        unit = [u + v, -u + v, -u - v, u - v] if square else \
            [(u * math.cos(t) + v * math.sin(t)) for t in (0, 2.094, 4.189)]
        ring_a = [r * ra for r in unit]
        ring_b = [r * rb for r in unit]
        n = len(unit)
        o = len(verts)
        verts += [tuple(a + r) for r in ring_a] + [tuple(b + r) for r in ring_b]
        for k in range(n):
            faces.append((o + k, o + (k + 1) % n, o + n + (k + 1) % n, o + n + k))
        faces.append(tuple(o + k for k in reversed(range(n))))
        faces.append(tuple(o + n + k for k in range(n)))
        gv = 1.0 if glow is None else glow[i]
        ga, gb = gv if isinstance(gv, (tuple, list)) else (gv, gv)
        g += [ga] * n + [gb] * n
    if not verts:
        return None
    return _obj(name, _mesh_from(name, verts, faces, g), mat=mat)


def cubes(name, points, size, mat, glow=None, rot_z=0.0):
    """Many small cubes (nodes) as one mesh; size scalar or per point."""
    verts, faces, g = [], [], []
    c, s_ = math.cos(math.radians(rot_z)), math.sin(math.radians(rot_z))
    for i, p in enumerate(points):
        h = (size[i] if isinstance(size, (list, tuple)) else size) / 2
        o = len(verts)
        for dz in (-h, h):
            for dx, dy in ((-h, -h), (h, -h), (h, h), (-h, h)):
                x, y = dx * c - dy * s_, dx * s_ + dy * c
                verts.append((p[0] + x, p[1] + y, p[2] + dz))
        faces += [(o, o + 3, o + 2, o + 1), (o + 4, o + 5, o + 6, o + 7), (o, o + 1, o + 5, o + 4),
                  (o + 1, o + 2, o + 6, o + 5), (o + 2, o + 3, o + 7, o + 6), (o + 3, o, o + 4, o + 7)]
        g += [1.0 if glow is None else glow[i]] * 8
    return _obj(name, _mesh_from(name, verts, faces, g), mat=mat)


# ---------------------------------------------------------------- glyphs
def _frame_mesh(s, w, t):
    key = ("frame", round(s, 5), round(w, 5), round(t, 5))
    if key in _MESH_CACHE:
        return _MESH_CACHE[key]
    a, b = s / 2, s / 2 - w
    outer = [(-a, -a), (a, -a), (a, a), (-a, a)]
    inner = [(-b, -b), (b, -b), (b, b), (-b, b)]
    verts = [(x, y, 0) for x, y in outer] + [(x, y, 0) for x, y in inner] + \
            [(x, y, t) for x, y in outer] + [(x, y, t) for x, y in inner]
    faces = []
    for k in range(4):
        k1 = (k + 1) % 4
        faces.append((8 + k, 8 + k1, 12 + k1, 12 + k))  # top ring
        faces.append((k, 4 + k, 4 + k1, k1))  # bottom ring
        faces.append((k, k1, 8 + k1, 8 + k))  # outer wall
        faces.append((4 + k, 12 + k, 12 + k1, 4 + k1))  # inner wall
    me = _mesh_from("frame", verts, faces)
    _MESH_CACHE[key] = me
    return me


def frame(name, s, w, t, loc, mat, rot=(0, 0, 0)):
    """Square outline (ring) lying in XY, bottom at loc.z."""
    return _obj(name, _frame_mesh(s, w, t), loc, rot, mat)


def glyph(S, kind, loc, s=0.4, t=0.03, rot=(0, 0, 0), base=True):
    """ANU status glyph as a square tile lying in XY (bottom at loc.z), rotated by rot.
    kind: outline (neutral) | half (in progress) | dashed (waiting) | blue (due) | done (ink)."""
    w = s * 0.13
    x, y, z = loc
    objs = []
    if kind in ("outline", "half"):
        objs.append(frame(f"glyph-{kind}", s, w, t, (x, y, z), S.mat("glyph_line"), rot))
        if kind == "half":
            inner = s - 2 * w
            hb = box("glyph-half-fill", (inner, inner / 2, t * 0.8), (0, 0, 0), S.mat("glyph_fill"), bevel=0)
            _place_local(hb, (x, y, z), rot, (0, -inner / 4, t * 0.4))
            objs.append(hb)
    elif kind == "dashed":
        n = 3
        seg = s / (2 * n - 1)
        for side in range(4):
            for i in range(n):
                off = -s / 2 + seg / 2 + i * 2 * seg
                lx, ly = ((off, -s / 2 + w / 2), (s / 2 - w / 2, off), (-off, s / 2 - w / 2), (-s / 2 + w / 2, -off))[side]
                sz = (seg, w, t) if side % 2 == 0 else (w, seg, t)
                d = box("glyph-dash", sz, (0, 0, 0), S.mat("glyph_line"), bevel=0)
                _place_local(d, (x, y, z), rot, (lx, ly, t / 2))
                objs.append(d)
    else:
        m = S.mat("glyph_blue" if kind == "blue" else "glyph_fill")
        bx = box(f"glyph-{kind}", (s, s, t), (0, 0, 0), m)
        _place_local(bx, (x, y, z), rot, (0, 0, t / 2))
        objs.append(bx)
    return objs


def _place_local(ob, origin, rot_deg, local):
    R = Matrix.Identity(3)
    e = tuple(math.radians(a) for a in rot_deg)
    from mathutils import Euler

    R = Euler(e).to_matrix()
    ob.location = Vector(origin) + R @ Vector(local)
    ob.rotation_euler = Euler(e)


# ---------------------------------------------------------------- the ink band
def ink_band(S, size, base, edge="front", edge_w=None, rot_z=0.0, edge_mat="accent"):
    """The ink band: a black slab closed by a thin Signal-blue edge.

    size = (x, y, z) extents, base = bottom centre. edge: 'front' (blue line along the
    -Y face, at its top), 'top-front' (on the top face, along the -Y edge), 'bottom'
    (along the -Y face at the bottom, like the site's band)."""
    sx, sy, sz = size
    ew = edge_w or max(0.012, min(sx, sy, sz) * 0.06)
    x, y, z = base
    slab_ob = box("ink-band", size, (0, 0, 0), S.mat("ink"))
    R = Matrix.Rotation(math.radians(rot_z), 3, "Z")
    o = Vector((x, y, z + sz / 2))
    slab_ob.location = o
    slab_ob.rotation_euler = (0, 0, math.radians(rot_z))
    if edge == "front":
        local, esz = Vector((0, -sy / 2 - ew * 0.15, sz / 2 - ew / 2)), (sx, ew * 0.5, ew)
    elif edge == "bottom":
        local, esz = Vector((0, -sy / 2 - ew * 0.15, -sz / 2 + ew / 2)), (sx, ew * 0.5, ew)
    else:  # top-front
        local, esz = Vector((0, -sy / 2 + ew / 2, sz / 2 + ew * 0.15)), (sx, ew, ew * 0.5)
    e = box("ink-band-edge", esz, o + R @ local, S.mat(edge_mat), bevel=0, rot=(0, 0, rot_z))
    return slab_ob, e


# ---------------------------------------------------------------- the line network
def network(seed, n, bounds, k=3, max_len=None, min_dist=0.0):
    """Random nodes in an axis box and edges to their k nearest neighbours (like the
    site's anu_network.svg). Returns (points, edges as index pairs)."""
    rnd = random.Random(seed)
    (x0, x1), (y0, y1), (z0, z1) = bounds
    pts = []
    tries = 0
    while len(pts) < n and tries < n * 60:
        tries += 1
        p = Vector((rnd.uniform(x0, x1), rnd.uniform(y0, y1), rnd.uniform(z0, z1)))
        if all((p - q).length >= min_dist for q in pts):
            pts.append(p)
    edges = set()
    if k == "tree":  # constellation: a minimum spanning tree (no closed polygons)
        inside, rest = {0}, set(range(1, len(pts)))
        while rest:
            i, j = min(((i, j) for i in inside for j in rest), key=lambda e: (pts[e[0]] - pts[e[1]]).length)
            edges.add((min(i, j), max(i, j)))
            inside.add(j)
            rest.discard(j)
        return pts, sorted(edges)
    for i, p in enumerate(pts):
        near = sorted(range(len(pts)), key=lambda j: (pts[j] - p).length)[1 : k + 1]
        for j in near:
            if max_len and (pts[j] - p).length > max_len:
                continue
            edges.add((min(i, j), max(i, j)))
    return pts, sorted(edges)


def mst(points):
    """Minimum spanning tree edges over points (tuples or Vectors, any dimension <= 3)."""
    P = [Vector(tuple(p) + (0,) * (3 - len(p))) for p in points]
    if len(P) < 2:
        return []
    edges, inside, rest = [], {0}, set(range(1, len(P)))
    while rest:
        i, j = min(((i, j) for i in inside for j in rest), key=lambda e: (P[e[0]] - P[e[1]]).length)
        edges.append((i, j))
        inside.add(j)
        rest.discard(j)
    return edges


def dashes(points, dash, gap):
    """Split a polyline into dash segments."""
    segs = []
    carry = 0.0
    on = True
    for a, b in zip(points[:-1], points[1:]):
        a, b = Vector(a), Vector(b)
        L = (b - a).length
        if L < 1e-9:
            continue
        d = (b - a) / L
        t = -carry
        while t < L:
            step = dash if on else gap
            t0, t1 = max(t, 0.0), min(t + step, L)
            if on and t1 > t0:
                segs.append((a + d * t0, a + d * t1))
            if t + step > L:
                carry = L - t
                break
            t += step
            on = not on
        else:
            carry = 0.0
    return segs


def ortho_route(a, b, z=None, first="x"):
    """L-shaped route a -> b on a plane (sharp corners, no curves)."""
    a, b = Vector(a), Vector(b)
    zz = a.z if z is None else z
    a, b = Vector((a.x, a.y, zz)), Vector((b.x, b.y, zz))
    mid = Vector((b.x, a.y, zz)) if first == "x" else Vector((a.x, b.y, zz))
    return [a, mid, b]


def polyline(points):
    return [(Vector(a), Vector(b)) for a, b in zip(points[:-1], points[1:])]


# ---------------------------------------------------------------- trusses
def truss_segments(p0, p1, width, height, bays):
    """A box truss from p0 to p1 (centre line), returns segments for beams()."""
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    u, v = _frame(d)
    if abs(d.normalized().z) < 0.9:
        v = Vector((0, 0, 1))
        u = d.normalized().cross(v).normalized()
    hw, hh = width / 2, height / 2
    corners = [u * hw + v * hh, -u * hw + v * hh, -u * hw - v * hh, u * hw - v * hh]
    segs = []
    for c in corners:
        segs.append((p0 + c, p1 + c))
    for i in range(bays + 1):
        t = p0 + d * (i / bays)
        for k in range(4):
            segs.append((t + corners[k], t + corners[(k + 1) % 4]))
        if i < bays:
            t2 = p0 + d * ((i + 1) / bays)
            for k in range(4):
                a, b = (corners[k], corners[(k + 1) % 4]) if i % 2 == 0 else (corners[(k + 1) % 4], corners[k])
                segs.append((t + a, t2 + b))
    return segs


def lerp(a, b, t):
    return a + (b - a) * t


def parent(child, par):
    child.parent = par
    child.matrix_parent_inverse.identity()
    return child


def empty(name, loc=(0, 0, 0), rot=(0, 0, 0)):
    ob = bpy.data.objects.new(name, None)
    ob.location = Vector(loc)
    ob.rotation_euler = tuple(math.radians(a) for a in rot)
    return link(ob)


# ---------------------------------------------------------------- dingir: four crossed wedges
def wedge_outline(length, head, shaft):
    """2D outline of one cuneiform wedge (a nail): broad flat head at +x, thin point at -x."""
    L = length / 2
    return [(-L, 0.0), (L * 0.42, shaft / 2), (L, head / 2), (L, -head / 2), (L * 0.42, -shaft / 2)]


def dingir(name, centre, right, up, size, mat, glow=1.0, thin=0.075):
    """The dingir sign: four wedge strokes crossing at the centre (an eight-pointed
    star, heads and points alternating), flat in the plane (right, up)."""
    verts, faces, g = [], [], []
    c = Vector(centre)
    for k in range(4):
        ang = math.radians(45 * k)
        ca, sa = math.cos(ang), math.sin(ang)
        flip = -1 if k % 2 else 1
        outline = wedge_outline(size, size * thin * 2.6, size * thin)
        o = len(verts)
        for x, y in outline:
            x *= flip
            rx, ry = x * ca - y * sa, x * sa + y * ca
            verts.append(tuple(c + right * rx + up * ry))
        faces.append(tuple(range(o, o + len(outline))))
        g += [glow] * len(outline)
    return _obj(name, _mesh_from(name, verts, faces, g), mat=mat)


# ---------------------------------------------------------------- the ziggurat
def ziggurat(S, base=(6.0, 5.0), levels=4, height=(0.9, 0.75, 0.6, 0.5), inset=0.8, loc=(0, 0, 0),
             role="brick", stairs=True, rot_z=0.0, bevel=0.02):
    """Stepped, sharp-edged terraces (mud brick) with a central stair on the front (-Y).
    Returns [(centre_top, size_x, size_y)] per terrace (in world space)."""
    par = empty("ziggurat", loc, (0, 0, rot_z))
    z = 0.0
    sx, sy = base
    tops = []
    for i in range(levels):
        h = height[i] if isinstance(height, (list, tuple)) else height
        ob = box(f"terrace-{i}", (sx, sy, h), (0, 0, z + h / 2), S.mat(role), bevel=bevel)
        parent(ob, par)
        z += h
        tops.append((Vector((0, 0, z)), sx, sy))
        sx, sy = sx - 2 * inset, sy - 2 * inset
    if stairs:
        # one straight stair up the front, from the ground to the second terrace
        h_total = tops[min(1, levels - 1)][0].z
        run = (base[1] / 2) - (base[1] / 2 - inset * min(2, levels)) + inset * 2.2
        steps = 22
        sw = base[0] * 0.16
        for k in range(steps):
            zz = h_total * (k + 1) / steps
            yy = -base[1] / 2 - inset * 2.2 + run * (k + 0.5) / steps
            ob = box("stair", (sw, run / steps + 0.002, zz), (0, yy, zz / 2), S.mat(role), bevel=0.003)
            parent(ob, par)
    out = []
    import mathutils

    R = mathutils.Matrix.Rotation(math.radians(rot_z), 3, "Z")
    for c, a, b in tops:
        out.append((Vector(loc) + R @ c, a, b))
    return par, out


# ---------------------------------------------------------------- small kit
def standing_glyph(S, kind, centre, s=0.3, t=0.02, rot_z=0.0):
    """A glyph standing up, facing -Y (rotated by rot_z), centred at `centre`."""
    return glyph(S, kind, centre, s=s, t=t, rot=(90, 0, rot_z))


def prism(name, outline, thick, loc, rot, mat):
    """Extrude a 2D outline (in local XY) by thick along local Z (centred)."""
    n = len(outline)
    verts = [(x, y, -thick / 2) for x, y in outline] + [(x, y, thick / 2) for x, y in outline]
    faces = [tuple(reversed(range(n))), tuple(range(n, 2 * n))]
    for k in range(n):
        faces.append((k, (k + 1) % n, n + (k + 1) % n, n + k))
    return _obj(name, _mesh_from(name, verts, faces), loc, rot, mat)


def wedge3d(S, loc, length, rot=(0, 0, 0), role="light", thick=None):
    """A cuneiform wedge as a solid (used as the cursor, a stylus mark, a pointer)."""
    out = wedge_outline(length, length * 0.42, length * 0.1)
    return prism("wedge", out, thick or length * 0.16, loc, rot, S.mat(role))


def box_edges(centre, size, rot_z=0.0):
    """The 12 edges of a box as segments (for wireframes)."""
    c = Vector(centre)
    hx, hy, hz = (s / 2 for s in size)
    R = Matrix.Rotation(math.radians(rot_z), 3, "Z")
    P = [c + R @ Vector((x, y, z)) for z in (-hz, hz) for x, y in ((-hx, -hy), (hx, -hy), (hx, hy), (-hx, hy))]
    E = [(0, 1), (1, 2), (2, 3), (3, 0), (4, 5), (5, 6), (6, 7), (7, 4), (0, 4), (1, 5), (2, 6), (3, 7)]
    return [(P[a], P[b]) for a, b in E]


def sheets(S, n, size, base, role="paper_sheet", gap=0.004, jitter=0.03, seed=0, rot_z=0.0):
    """A stack of paper sheets (documents), slightly misaligned."""
    rnd = random.Random(seed)
    x, y, z = base
    out = []
    for i in range(n):
        dx, dy = rnd.uniform(-jitter, jitter), rnd.uniform(-jitter, jitter)
        dr = rnd.uniform(-3, 3)
        out.append(box("sheet", size, (x + dx, y + dy, z + size[2] / 2 + i * (size[2] + gap)), S.mat(role),
                       bevel=0.0015, rot=(0, 0, rot_z + dr)))
    return z + n * (size[2] + gap)


def cylinder(name, r, h, loc, mat, rot=(0, 0, 0), verts=48, bevel=0.004):
    """A sharp cylinder (seals, discs, pins); bottom at loc.z before rotation."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=verts, radius1=r, radius2=r, depth=h)
    bmesh.ops.translate(bm, vec=(0, 0, h / 2), verts=bm.verts)
    if bevel:
        sharp = [e for e in bm.edges if len(e.link_faces) == 2 and e.calc_face_angle(0) > 0.6]
        bmesh.ops.bevel(bm, geom=sharp, offset=bevel, segments=1, affect="EDGES", clamp_overlap=True)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = len(p.vertices) == 4 and abs(p.normal.z) < 0.5
    return _obj(name, me, loc, rot, mat)
