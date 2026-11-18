"""ANU 3D style: palette, the two looks (ink / paper), materials, the night sky, light rig,
camera, render settings and the bloom compositor.

Everything a scene needs goes through a `Style` instance, so a scene only says *what*
is there (an ink slab, a clay tablet, a constellation), never how it is shaded. The
same scene renders in both looks.

The world: ANU is also Anu, the Sumerian sky. The ink look is a night over a low
horizon (sparse stars, a faint blue glow on the horizon, the ANU line network as
constellations); bone objects are unfired clay; structure is a ziggurat.
"""
import math
import random

import bpy
from mathutils import Vector

# ---------------------------------------------------------------- palette (sRGB hex)
PALETTE = {
    "ink": "#090B11",  # the band, the canvas of the ink look
    "ink_raise": "#141824",  # dark paper (dark-mode paper token)
    "ink_soft": "#1E2536",  # dark raise
    "rule_dark": "#262D3D",
    "slate800": "#1E293B",
    "slate600": "#475569",
    "slate400": "#94A3B8",
    "slate300": "#CBD5E1",
    "rule": "#E2E8F0",
    "sunken": "#F1F5F9",
    "bone": "#F8FAFC",  # the canvas of the paper look
    "paper": "#FFFFFF",
    "signal": "#2563EB",  # the one accent
    "signal_strong": "#1D4ED8",
    "signal_mid": "#3B82F6",
    "signal_light": "#60A5FA",  # blue on ink
    "star": "#E8EEF8",
    "star_blue": "#A9C4F5",
}


def _s2l(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def rgb(key_or_hex, scale=1.0):
    """Linear RGBA from a palette key or '#rrggbb'."""
    h = PALETTE.get(key_or_hex, key_or_hex).lstrip("#")
    return tuple(_s2l(int(h[i : i + 2], 16) / 255) * scale for i in (0, 2, 4)) + (1.0,)


# ---------------------------------------------------------------- material recipes
# role -> recipe per look. Scenes ask for "body", "clay", "ink", "accent", never a colour.
#   clay=True     unfired clay: matte, porous (pits + grain bump), faint tone variation
#   brick=h       mud-brick courses of height h as a shallow bump (ziggurats)
#   concrete=True precast concrete: mottled, fine grain
#   emit=...      pure emitter; attr=True multiplies strength by the per-vertex 'glow'
RECIPES = {
    "ink": {
        "ground": dict(color="#040508", rough=0.3, spec=0.45),
        "body": dict(color="#1A1F2C", rough=0.62, spec=0.38, clay=True),  # dark clay
        "body_alt": dict(color="#262D3D", rough=0.62, spec=0.38, clay=True),
        "brick": dict(color="#1C212D", rough=0.75, spec=0.3, clay=True, brick=0.09),
        "light": dict(color="#D9D6CF", rough=0.88, spec=0.25, clay=True),  # bone clay on ink
        "clay": dict(color="#D9D6CF", rough=0.9, spec=0.22, clay=True),
        "slate": dict(color="#5B6B80", rough=0.55, spec=0.4),
        "slate_light": dict(color="#94A3B8", rough=0.55, spec=0.4),
        "ink": dict(color="#06070A", rough=0.24, spec=0.6),  # the band: glossy black
        "concrete": dict(color="#8A929E", rough=0.85, spec=0.25, concrete=True),
        "concrete_dark": dict(color="#3A404B", rough=0.85, spec=0.25, concrete=True),
        "glass": dict(color="#CFE0F5", rough=0.16, spec=0.5, transmission=1.0, ior=1.45),
        "screen": dict(color="#0B0E15", rough=0.2, spec=0.6),
        "accent": dict(emit="signal", strength=12.0),
        "accent_soft": dict(emit="signal_light", strength=4.0),
        "line": dict(emit="signal_mid", strength=4.0, attr=True),
        "node": dict(emit="signal_light", strength=5.0, attr=True),
        "star": dict(emit="star", strength=6.0, attr=True),
        "star_blue": dict(emit="star_blue", strength=6.0, attr=True),
        "hair": dict(emit="slate400", strength=0.9, attr=True),
        "glyph_line": dict(color="#AEB9C9", rough=0.5, spec=0.4, emit_mix="slate400", strength=0.5),
        "glyph_fill": dict(color="#EEF2F7", rough=0.5, spec=0.4, emit_mix="bone", strength=0.7),  # done = light
        "glyph_blue": dict(color="#2563EB", rough=0.4, spec=0.4, emit_mix="signal", strength=2.6),
        "paper_sheet": dict(color="#E9EDF3", rough=0.7, spec=0.3, clay=True),
    },
    "paper": {
        "ground": dict(color="#F3F6F9", rough=0.8, spec=0.25),
        "body": dict(color="#F4F2EE", rough=0.85, spec=0.28, clay=True),
        "body_alt": dict(color="#E3E6EA", rough=0.8, spec=0.3, clay=True),
        "brick": dict(color="#E6E2DA", rough=0.85, spec=0.25, clay=True, brick=0.09),
        "light": dict(color="#F4F2EE", rough=0.88, spec=0.25, clay=True),
        "clay": dict(color="#E9E5DD", rough=0.9, spec=0.22, clay=True),
        "slate": dict(color="#94A3B8", rough=0.6, spec=0.35),
        "slate_light": dict(color="#CBD5E1", rough=0.6, spec=0.35),
        "ink": dict(color="#0A0C12", rough=0.3, spec=0.55),
        "concrete": dict(color="#C9CDD2", rough=0.88, spec=0.25, concrete=True),
        "concrete_dark": dict(color="#8C929B", rough=0.88, spec=0.25, concrete=True),
        "glass": dict(color="#EEF4FB", rough=0.15, spec=0.5, transmission=1.0, ior=1.45),
        "screen": dict(color="#0B0E15", rough=0.2, spec=0.6),
        "accent": dict(color="#2563EB", rough=0.45, spec=0.4, emit_mix="signal", strength=1.6),
        "accent_soft": dict(color="#60A5FA", rough=0.45, spec=0.4, emit_mix="signal_light", strength=0.8),
        "line": dict(emit="signal", strength=2.2, attr=True),
        "node": dict(emit="signal", strength=2.6, attr=True),
        "star": dict(emit="slate400", strength=0.0, attr=True),  # no stars by day
        "star_blue": dict(emit="slate400", strength=0.0, attr=True),
        "hair": dict(emit="slate600", strength=0.35, attr=True),
        "glyph_line": dict(color="#475569", rough=0.5, spec=0.35),
        "glyph_fill": dict(color="#0A0C12", rough=0.4, spec=0.45),  # done = ink
        "glyph_blue": dict(color="#2563EB", rough=0.45, spec=0.4, emit_mix="signal", strength=1.2),
        "paper_sheet": dict(color="#FFFFFF", rough=0.7, spec=0.3, clay=True),
    },
}

# per-look world, grading and bloom
LOOKS = {
    "ink": dict(
        sky=True,
        zenith="#020306", horizon="#1B3A7A", horizon_strength=0.1,  # faint blue on the horizon
        look="AgX - Medium High Contrast", exposure=0.0,
        key=1.0, rim=1.0, fill=1.0, accent=1.0,
        bloom_strength=0.22, bloom_size=0.5,
    ),
    "paper": dict(
        sky=False,
        world="#E4E9EF", world_strength=0.6,
        look="AgX - Base Contrast", exposure=0.35,
        key=1.0, rim=0.4, fill=1.0, accent=0.6,
        bloom_strength=0.1, bloom_size=0.45,
    ),
}


class Style:
    def __init__(self, look="ink", size=(1600, 1000)):
        assert look in LOOKS, look
        self.look = look
        self.is_ink = look == "ink"
        self.cfg = LOOKS[look]
        self.size = size
        self.aspect = size[1] / size[0]
        self._mats = {}
        self.scene = bpy.context.scene
        self.camera_info = {}
        self.glow_dir = Vector((0, 1, 0))  # where the horizon glows (set from the camera)
        self._sky_group = None

    # ------------------------------------------------------------ materials
    def mat(self, role, **override):
        key = role if not override else role + repr(sorted(override.items()))
        if key not in self._mats:
            recipe = dict(RECIPES[self.look][role])
            recipe.update(override)
            self._mats[key] = _make_material(role, recipe)
        return self._mats[key]

    # ------------------------------------------------------------ world + ground
    def world(self):
        w = bpy.data.worlds.new("ANU world")
        self.scene.world = w
        nt = w.node_tree
        for n in list(nt.nodes):
            nt.nodes.remove(n)
        bg = nt.nodes.new("ShaderNodeBackground")
        out = nt.nodes.new("ShaderNodeOutputWorld")
        nt.links.new(bg.outputs[0], out.inputs["Surface"])
        self._world_bg = bg
        if self.cfg["sky"]:
            bg.inputs["Strength"].default_value = 1.0  # wired to the sky group in _wire_sky()
        else:
            bg.inputs["Color"].default_value = rgb(self.cfg["world"])
            bg.inputs["Strength"].default_value = self.cfg["world_strength"]
        return w

    def ground(self, size=5000.0, z=0.0):
        from . import geo

        self.ground_ob = geo.box("ground", (size, size, 1.0), (0, 0, z - 0.5), self.mat("ground"), bevel=0)
        return self.ground_ob

    def _sky_color_group(self):
        """Shader group: direction -> night-sky colour (zenith + horizon glow biased
        toward glow_dir). Shared by the world and the ground fog so the horizon is seamless."""
        if self._sky_group:
            return self._sky_group
        c = self.cfg
        ng = bpy.data.node_groups.new("ANU sky colour", "ShaderNodeTree")
        ng.interface.new_socket("Direction", in_out="INPUT", socket_type="NodeSocketVector")
        ng.interface.new_socket("Horizontal", in_out="INPUT", socket_type="NodeSocketFloat")
        ng.interface.new_socket("Color", in_out="OUTPUT", socket_type="NodeSocketColor")
        N, L = ng.nodes, ng.links
        gi, go = N.new("NodeGroupInput"), N.new("NodeGroupOutput")

        def math(op, a=None, b=None, va=None, vb=None):
            n = N.new("ShaderNodeMath")
            n.operation = op
            if a is not None:
                L.new(a, n.inputs[0])
            elif va is not None:
                n.inputs[0].default_value = va
            if b is not None:
                L.new(b, n.inputs[1])
            elif vb is not None:
                n.inputs[1].default_value = vb
            return n.outputs[0]

        def vmath(op, a, b=None, vb=None):
            n = N.new("ShaderNodeVectorMath")
            n.operation = op
            L.new(a, n.inputs[0])
            if b is not None:
                L.new(b, n.inputs[1])
            elif vb is not None:
                n.inputs[1].default_value = vb
            return n

        d = vmath("NORMALIZE", gi.outputs["Direction"]).outputs[0]
        sep = N.new("ShaderNodeSeparateXYZ")
        L.new(d, sep.inputs[0])
        z = math("MAXIMUM", sep.outputs["Z"], vb=0.0)
        z = math("MULTIPLY", z, math("SUBTRACT", va=1.0, b=gi.outputs["Horizontal"]))  # Horizontal=1 -> z=0
        h1 = math("EXPONENT", math("MULTIPLY", z, vb=-1 / c.get("glow_k1", 0.022)))
        h2 = math("MULTIPLY", math("EXPONENT", math("MULTIPLY", z, vb=-1 / c.get("glow_k2", 0.09))),
                  vb=c.get("glow_w2", 0.18))
        comb = N.new("ShaderNodeCombineXYZ")
        L.new(sep.outputs["X"], comb.inputs["X"])
        L.new(sep.outputs["Y"], comb.inputs["Y"])
        xy = vmath("NORMALIZE", comb.outputs[0]).outputs[0]
        dot = vmath("DOT_PRODUCT", xy, vb=tuple(self.glow_dir.normalized()))
        bias = math("POWER", math("MULTIPLY", math("ADD", dot.outputs["Value"], vb=1.0), vb=0.5), vb=2.0)
        bias = math("ADD", math("MULTIPLY", bias, vb=0.8), vb=0.2)
        glow = math("MULTIPLY", math("ADD", h1, h2), bias)
        glow = math("MULTIPLY", glow, vb=c["horizon_strength"])
        hz = N.new("ShaderNodeVectorMath")
        hz.operation = "SCALE"
        hz.inputs[0].default_value = rgb(c["horizon"])[:3]
        L.new(glow, hz.inputs["Scale"])
        col = vmath("ADD", hz.outputs[0], vb=rgb(c["zenith"])[:3])
        L.new(col.outputs[0], go.inputs["Color"])
        self._sky_group = ng
        return ng

    def _wire_sky(self, fog_distance):
        """Connect the sky group to the world (camera sees the gradient) and blend the
        ground into the same colour with distance, so floor and sky meet softly."""
        ng = self._sky_color_group()
        nt = self.scene.world.node_tree
        tc = nt.nodes.new("ShaderNodeTexCoord")
        g = nt.nodes.new("ShaderNodeGroup")
        g.node_tree = ng
        nt.links.new(tc.outputs["Generated"], g.inputs["Direction"])
        nt.links.new(g.outputs["Color"], self._world_bg.inputs["Color"])

        m = self.mat("ground")
        mt = m.node_tree
        out = mt.nodes.get("Material Output")
        bsdf = mt.nodes.get("Principled BSDF")
        geo_n = mt.nodes.new("ShaderNodeNewGeometry")
        neg = mt.nodes.new("ShaderNodeVectorMath")
        neg.operation = "SCALE"
        neg.inputs["Scale"].default_value = -1.0
        mt.links.new(geo_n.outputs["Incoming"], neg.inputs[0])
        g2 = mt.nodes.new("ShaderNodeGroup")
        g2.node_tree = ng
        g2.inputs["Horizontal"].default_value = 1.0
        mt.links.new(neg.outputs[0], g2.inputs["Direction"])
        em = mt.nodes.new("ShaderNodeEmission")
        mt.links.new(g2.outputs["Color"], em.inputs["Color"])
        cd = mt.nodes.new("ShaderNodeCameraData")
        f1 = mt.nodes.new("ShaderNodeMath")
        f1.operation = "MULTIPLY"
        f1.inputs[1].default_value = -1.0 / fog_distance
        mt.links.new(cd.outputs["View Distance"], f1.inputs[0])
        f2 = mt.nodes.new("ShaderNodeMath")
        f2.operation = "EXPONENT"
        mt.links.new(f1.outputs[0], f2.inputs[0])
        f3 = mt.nodes.new("ShaderNodeMath")
        f3.operation = "SUBTRACT"
        f3.inputs[0].default_value = 1.0
        mt.links.new(f2.outputs[0], f3.inputs[1])
        mix = mt.nodes.new("ShaderNodeMixShader")
        mt.links.new(f3.outputs[0], mix.inputs[0])
        mt.links.new(bsdf.outputs[0], mix.inputs[1])
        mt.links.new(em.outputs[0], mix.inputs[2])
        mt.links.new(mix.outputs[0], out.inputs["Surface"])

    # ------------------------------------------------------------ camera
    def camera(self, target=(0, 0, 0), azimuth=-60.0, elevation=8.0, focal=100.0, frame_w=8.0,
               shift_x=-0.17, shift_y=None, horizon=None, at=None, roll=0.0, dof=None, focus=None):
        """Telephoto camera aimed at `target`.

        azimuth/elevation (degrees) place the camera around the target; frame_w is the
        visible width in scene units at the target distance; shift_x < 0 pushes the
        subject right and leaves the inline-start side (left in LTR) calm.
        horizon (0..1 from the bottom) sets shift_y so the horizon sits at that height;
        with `at` (where the target sits, 0..1 from the bottom) the elevation follows.
        """
        if horizon is not None and at is not None:
            elevation = math.degrees(math.atan((horizon - at) * 36.0 * self.aspect / focal))
        az, el = math.radians(azimuth), math.radians(elevation)
        d = frame_w * focal / 36.0
        t = Vector(target)
        direction = Vector((math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el)))
        sensor_h = 36.0 * self.aspect
        if horizon is not None:
            shift_y = (focal * math.tan(el) - (horizon - 0.5) * sensor_h) / 36.0
        shift_y = shift_y or 0.0
        cam_data = bpy.data.cameras.new("ANU camera")
        cam_data.lens = focal
        cam_data.sensor_fit = "HORIZONTAL"
        cam_data.sensor_width = 36.0
        cam_data.shift_x = shift_x
        cam_data.shift_y = shift_y
        cam_data.clip_start = max(0.05, d * 0.05)
        self.sky_depth = d * 45.0
        cam_data.clip_end = self.sky_depth * 3.0
        cam = bpy.data.objects.new("ANU camera", cam_data)
        self.scene.collection.objects.link(cam)
        cam.location = t + direction * d
        q = (-direction).to_track_quat("-Z", "Y")
        cam.rotation_euler = q.to_euler()
        if roll:
            cam.rotation_euler.rotate_axis("Z", math.radians(roll))
        if dof:
            cam_data.dof.use_dof = True
            cam_data.dof.aperture_fstop = dof
            cam_data.dof.focus_distance = (Vector(focus) - cam.location).length if focus else d
        self.scene.camera = cam
        self.cam = cam
        horizon_frac = 0.5 + (focal * math.tan(el) - shift_y * 36.0) / sensor_h
        self.camera_info = dict(target=t, azimuth=azimuth, elevation=elevation, distance=d, focal=focal,
                                frame_w=frame_w, horizon=horizon_frac, shift_x=shift_x, shift_y=shift_y)
        # the horizon glows behind the subject, a little toward the screen right
        back = -Vector((direction.x, direction.y, 0)).normalized()
        right = Vector((-back.y, back.x, 0)) * -1
        self.glow_dir = (back + right * 0.35).normalized()
        return cam

    def uv(self, u, v, depth=None):
        """World point seen at frame position (u, v) (0..1 from bottom-left) at `depth`
        along the camera axis (default: the sky plane, far away)."""
        ci = self.camera_info
        depth = depth or self.sky_depth
        f = ci["focal"]
        sw, sh = 36.0, 36.0 * self.aspect
        x = (u - 0.5) * sw + ci["shift_x"] * 36.0
        y = (v - 0.5) * sh + ci["shift_y"] * 36.0
        R = self.cam.rotation_euler.to_matrix()
        return self.cam.location + R @ Vector((x / f * depth, y / f * depth, -depth))

    def px(self, n=1.0, depth=None):
        """World size of n pixels (of a 1600 w frame) at `depth`."""
        depth = depth or self.sky_depth
        return n * depth * 36.0 / self.camera_info["focal"] / 1600.0

    def px_at(self, p, n=1.0):
        """World size of n pixels at point p (for lines of constant apparent width)."""
        cam = self.cam
        fwd = cam.rotation_euler.to_matrix() @ Vector((0, 0, -1))
        return self.px(n, max(0.1, (Vector(p) - cam.location).dot(fwd)))

    # ------------------------------------------------------------ the night sky
    def sky(self, stars=260, seed=1, calm=0.33, calm_side="left", fog=None, dingir=1, brightest=1.0):
        """Night sky (ink look only): gradient world + horizon glow, ground fog, and a
        sparse star field drawn on the far sky plane. `calm` = fraction of the frame
        width (text side) kept quieter. dingir = how many of the brightest stars carry
        the four-wedge glint."""
        if not self.cfg["sky"]:
            return
        self._wire_sky(fog or self.camera_info["distance"] * 3.0)
        from . import geo

        rnd = random.Random(seed)
        hz = self.camera_info["horizon"]
        pts, sizes, glow, pts_b, sizes_b, glow_b = [], [], [], [], [], []
        bright = []
        n = 0
        while n < stars:
            u, v = rnd.uniform(-0.03, 1.03), rnd.uniform(hz + 0.005, 1.04)
            in_calm = (u < calm) if calm_side == "left" else (u > 1 - calm)
            if in_calm and rnd.random() < 0.55:
                continue
            n += 1
            r = rnd.random()
            g = (0.05 + 0.95 * r ** 7) * brightest
            g *= _smooth(hz, hz + 0.18, v)  # extinction near the horizon
            if in_calm:
                g *= 0.6
            s = self.px(0.9 + 1.1 * r ** 3)
            p = self.uv(u, v)
            if rnd.random() < 0.18:
                pts_b.append(p), sizes_b.append(s), glow_b.append(g)
            else:
                pts.append(p), sizes.append(s), glow.append(g)
            if not in_calm and v > hz + 0.15:
                bright.append((g, u, v))
        geo.cubes("stars", pts, sizes, self.mat("star"), glow)
        if pts_b:
            geo.cubes("stars-blue", pts_b, sizes_b, self.mat("star_blue"), glow_b)
        for g, u, v in sorted(bright, reverse=True)[:dingir]:
            self.dingir(u, v, size_px=16, glow=0.8)

    def sky_network(self, seed, n, u=(0.4, 1.0), v=(0.5, 1.0), k=2, max_len=0.16, min_dist=0.035):
        """A constellation layout in frame space: (uv points, edges). Distances are in
        frame widths, so the pattern keeps its shape at any aspect."""
        from . import geo

        a = self.aspect
        pts, edges = geo.network(seed, n, (u, (v[0] * a, v[1] * a), (0, 0)), k=k, max_len=max_len, min_dist=min_dist)
        return [(p.x, p.y / a) for p in pts], edges

    def constellation(self, pts_uv, edges, line_px=0.9, line_glow=0.55, star_px=2.0, star_glow=1.0, depth=None,
                      name="constellation"):
        """The ANU line network as a constellation on the sky plane: stars for nodes,
        thin Signal lines between them. glow values may be lists (per edge / per star)."""
        from . import geo

        P = [self.uv(u, v, depth) for u, v in pts_uv]
        lg = line_glow if isinstance(line_glow, list) else [line_glow] * len(edges)
        sg = star_glow if isinstance(star_glow, list) else [star_glow] * len(P)
        if edges:
            geo.beams(name, [(P[i], P[j]) for i, j in edges], self.px(line_px / 2, depth), self.mat("line"), lg)
        sp = star_px if isinstance(star_px, list) else [star_px] * len(P)
        geo.cubes(name + "-stars", P, [self.px(x, depth) for x in sp], self.mat("star"), sg)
        return P

    def sky_glyphs(self, items, depth=None, name="sky-glyphs"):
        """Square status glyphs drawn flat on the sky plane, facing the camera.
        items = [(u, v, size, kind, glow)], size in frame widths; kind as geo.glyph."""
        from . import geo

        a = self.aspect
        polys = {"star": [], "line": []}

        def q(role, pts, g):
            polys[role].append(([self.uv(x, y, depth) for x, y in pts], g))

        for u, v, sz, kind, g in items:
            h, w = sz / 2, sz * 0.14
            sq = lambda hh, y0=None, y1=None: [(u - hh, (y0 if y0 is not None else v - hh / a)),
                                               (u + hh, (y0 if y0 is not None else v - hh / a)),
                                               (u + hh, (y1 if y1 is not None else v + hh / a)),
                                               (u - hh, (y1 if y1 is not None else v + hh / a))]
            if kind in ("outline", "half"):
                o, i = h, h - w
                # four bars of the ring
                q("star", [(u - o, v - o / a), (u + o, v - o / a), (u + o, v - i / a), (u - o, v - i / a)], g)
                q("star", [(u - o, v + i / a), (u + o, v + i / a), (u + o, v + o / a), (u - o, v + o / a)], g)
                q("star", [(u - o, v - i / a), (u - i, v - i / a), (u - i, v + i / a), (u - o, v + i / a)], g)
                q("star", [(u + i, v - i / a), (u + o, v - i / a), (u + o, v + i / a), (u + i, v + i / a)], g)
                if kind == "half":
                    q("star", sq(i, v - i / a, v), g * 0.8)
            elif kind == "blue":
                q("line", sq(h), g)
            else:
                q("star", sq(h), g)
        for role, ps in polys.items():
            if not ps:
                continue
            verts, faces, gl = [], [], []
            for pts, g in ps:
                o = len(verts)
                verts += [tuple(p) for p in pts]
                faces.append(tuple(range(o, o + len(pts))))
                gl += [g] * len(pts)
            geo._obj(f"{name}-{role}", geo._mesh_from(name, verts, faces, gl), mat=self.mat(role))

    def sun(self, direction_az, elevation, strength, color="#C9D6EA", skip_ground=True, angle=2.0):
        """A faint moonlight (absolute azimuth/elevation of where it comes from)."""
        ld = bpy.data.lights.new("moon", "SUN")
        ld.energy = strength
        ld.color = rgb(color)[:3]
        ld.angle = math.radians(angle)
        ob = bpy.data.objects.new("moon", ld)
        self.scene.collection.objects.link(ob)
        az, el = math.radians(direction_az), math.radians(elevation)
        d = Vector((math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el)))
        ob.rotation_euler = (-d).to_track_quat("-Z", "Y").to_euler()
        if skip_ground:
            self._skip_ground(ob)
        return ob

    def dingir(self, u, v, size_px=18.0, glow=1.0, role="star", depth=None):
        """The dingir sign (An, the sky): four crossed wedge strokes, an eight-pointed
        star, drawn as a faint glint on the sky plane (or at `depth`)."""
        from . import geo

        c = self.uv(u, v, depth)
        R = self.cam.rotation_euler.to_matrix()
        right, up = R @ Vector((1, 0, 0)), R @ Vector((0, 1, 0))
        return geo.dingir("dingir", c, right, up, self.px(size_px, depth), self.mat(role), glow)

    # ------------------------------------------------------------ lights
    def area(self, name, loc, target, size, energy, color="#FFFFFF", size_y=None, spread=None, skip_ground=False):
        ld = bpy.data.lights.new(name, "AREA")
        ld.energy = energy
        ld.color = rgb(color)[:3]
        if size_y:
            ld.shape = "RECTANGLE"
            ld.size, ld.size_y = size, size_y
        else:
            ld.shape = "SQUARE"
            ld.size = size
        if spread:
            ld.spread = math.radians(spread)
        ob = bpy.data.objects.new(name, ld)
        self.scene.collection.objects.link(ob)
        ob.location = Vector(loc)
        ob.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
        ob.visible_camera = False  # a light is never a shape in the picture
        ob.visible_transmission = False
        if skip_ground:
            self._skip_ground(ob)
        return ob

    def point(self, name, loc, energy, color="signal", radius=0.1, skip_ground=False):
        ld = bpy.data.lights.new(name, "POINT")
        ld.energy = energy
        ld.color = rgb(color)[:3]
        ld.shadow_soft_size = radius
        ob = bpy.data.objects.new(name, ld)
        self.scene.collection.objects.link(ob)
        ob.location = Vector(loc)
        if skip_ground:
            self._skip_ground(ob)
        return ob

    def _skip_ground(self, light_ob):
        """Light linking: the light leaves the floor alone (the ink floor stays ink; only
        reflections, the horizon fog and the blue accent reach it)."""
        g = getattr(self, "ground_ob", None)
        if g is None:
            return
        if not hasattr(self, "_no_ground"):
            self._no_ground = bpy.data.collections.new("no-ground")
            self._no_ground.objects.link(g)
            self._no_ground.collection_objects[0].light_linking.link_state = "EXCLUDE"
        light_ob.light_linking.receiver_collection = self._no_ground

    def _around(self, target, az_offset, elevation, dist):
        """A point around `target`, azimuth relative to the camera (0 = camera side,
        -90 = screen left, +90 = screen right, 180 = behind)."""
        az = math.radians(self.camera_info.get("azimuth", -60.0) + az_offset)
        el = math.radians(elevation)
        return Vector(target) + Vector((math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el))) * dist

    def studio(self, target=None, scale=1.0, key_az=-105.0, key_el=26.0, rim_az=150.0, rim_el=30.0,
               accent=None, accent_energy=1.0, key=1.0, rim=1.0, fill=1.0, key_pos=None, key_size=7.0):
        """Soft rig relative to the camera: a large low key from the screen-left (long
        soft shadows falling right, away from the text side), a rim from behind, a soft
        top fill, and one Signal-blue accent light (`accent` = location). In the ink look
        it is a cool night light and the floor is excluded (it stays ink)."""
        t = Vector(target if target is not None else self.camera_info.get("target", (0, 0, 0)))
        c = self.cfg
        s = scale
        d = 9.0 * s
        e = s * s
        kp = Vector(key_pos) if key_pos is not None else self._around(t, key_az, key_el, d)
        if self.is_ink:
            self.area("key", kp, t, key_size * s, 520.0 * e * key * c["key"], "#E4EAF3",
                      skip_ground=True)
            self.area("rim", self._around(t, rim_az, rim_el, d), t, 5.0 * s, 420.0 * e * rim * c["rim"], "#E3ECFA",
                      size_y=1.2 * s, skip_ground=True)
            self.area("fill", t + Vector((0, 0, 8.0 * s)), t, 9.0 * s, 110.0 * e * fill * c["fill"], "#C4D3EA",
                      skip_ground=True)
        else:
            self.area("key", kp, t, key_size * s, 900.0 * e * key * c["key"], "#FFF9F2")
            self.area("rim", self._around(t, rim_az, rim_el, d), t, 6.0 * s, 300.0 * e * rim * c["rim"], "#F4F7FB")
            self.area("fill", t + Vector((0, 0, 9.0 * s)), t, 10.0 * s, 260.0 * e * fill * c["fill"], "#F1F5FA")
        if accent is not None:
            self.area("accent", accent, t, 1.6 * s, 160.0 * e * accent_energy * c["accent"], PALETTE["signal"],
                      skip_ground=self.is_ink)

    # ------------------------------------------------------------ render settings
    def render_settings(self, samples=192, preview=False):
        sc = self.scene
        sc.render.engine = "CYCLES"
        _use_gpu()
        cy = sc.cycles
        cy.device = "GPU"
        cy.samples = samples
        cy.use_adaptive_sampling = True
        cy.adaptive_threshold = 0.02 if preview else 0.008
        cy.use_denoising = True
        cy.denoiser = "OPENIMAGEDENOISE"
        cy.denoising_input_passes = "RGB_ALBEDO_NORMAL"
        cy.denoising_prefilter = "ACCURATE"
        try:
            cy.denoising_use_gpu = True
        except Exception:
            pass
        cy.max_bounces = 8
        cy.diffuse_bounces = 3
        cy.glossy_bounces = 3
        cy.transmission_bounces = 8
        cy.transparent_max_bounces = 8
        cy.caustics_reflective = False
        cy.caustics_refractive = False
        cy.blur_glossy = 0.6
        cy.sample_clamp_indirect = 6.0
        sc.render.resolution_x, sc.render.resolution_y = self.size
        sc.render.resolution_percentage = 100
        sc.render.film_transparent = False
        sc.render.dither_intensity = 0.6
        sc.view_settings.view_transform = "AgX"
        sc.view_settings.look = self.cfg["look"]
        sc.view_settings.exposure = self.cfg["exposure"]
        sc.view_settings.gamma = 1.0
        sc.display_settings.display_device = "sRGB"
        sc.render.image_settings.file_format = "TIFF"
        sc.render.image_settings.color_depth = "16"
        sc.render.image_settings.color_mode = "RGB"
        sc.render.image_settings.tiff_codec = "NONE"
        self._compositor()

    def _compositor(self):
        """Bloom from the emission pass only: lines, stars and blue edges glow, nothing
        else does. Added in scene-linear space before AgX."""
        sc = self.scene
        vl = sc.view_layers[0]
        vl.use_pass_emit = True
        ng = bpy.data.node_groups.new("ANU comp", "CompositorNodeTree")
        ng.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
        sc.compositing_node_group = ng
        rl = ng.nodes.new("CompositorNodeRLayers")
        rl.scene = sc
        rl.layer = vl.name
        gl = ng.nodes.new("CompositorNodeGlare")
        gl.inputs["Type"].default_value = "Bloom"
        gl.inputs["Quality"].default_value = "High"
        gl.inputs["Threshold"].default_value = 0.0
        gl.inputs["Strength"].default_value = self.cfg["bloom_strength"]
        gl.inputs["Size"].default_value = self.cfg["bloom_size"]
        mix = ng.nodes.new("ShaderNodeMix")
        mix.data_type = "RGBA"
        mix.blend_type = "ADD"
        mix.inputs[0].default_value = 1.0
        out = ng.nodes.new("NodeGroupOutput")
        L = ng.links
        L.new(rl.outputs["Emission"], gl.inputs["Image"])
        L.new(rl.outputs["Image"], mix.inputs[6])
        L.new(gl.outputs["Glare"], mix.inputs[7])
        L.new(mix.outputs[2], out.inputs[0])
        sc.render.use_compositing = True


def _smooth(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def _use_gpu():
    prefs = bpy.context.preferences.addons["cycles"].preferences
    for kind in ("OPTIX", "CUDA"):
        try:
            prefs.compute_device_type = kind
            prefs.get_devices()
        except Exception:
            continue
        devs = [d for d in prefs.devices if d.type == kind]
        if devs:
            for d in prefs.devices:
                d.use = d.type == kind
            return kind
    return "CPU"


# ---------------------------------------------------------------- material builder
def _make_material(name, r):
    m = bpy.data.materials.new(name)
    nt = m.node_tree
    nodes, links = nt.nodes, nt.links
    out = nodes.get("Material Output") or nodes.new("ShaderNodeOutputMaterial")
    bsdf = nodes.get("Principled BSDF")

    def glow_factor(strength):
        """strength x per-vertex 'glow' attribute."""
        if not r.get("attr"):
            return None
        at = nodes.new("ShaderNodeAttribute")
        at.attribute_type = "GEOMETRY"
        at.attribute_name = "glow"
        mul = nodes.new("ShaderNodeMath")
        mul.operation = "MULTIPLY"
        mul.inputs[1].default_value = strength
        links.new(at.outputs["Fac"], mul.inputs[0])
        m["anu_strength_node"] = mul.name
        return mul.outputs[0]

    if "emit" in r:  # pure emitter (lines, nodes, edges, stars)
        if bsdf:
            nodes.remove(bsdf)
        em = nodes.new("ShaderNodeEmission")
        em.name = "anu-emission"
        em.inputs["Color"].default_value = rgb(r["emit"])
        em.inputs["Strength"].default_value = r["strength"]
        f = glow_factor(r["strength"])
        if f is not None:
            links.new(f, em.inputs["Strength"])
        links.new(em.outputs[0], out.inputs["Surface"])
        m["anu_emitter"] = True
        return m

    bsdf.inputs["Base Color"].default_value = rgb(r["color"])
    bsdf.inputs["Roughness"].default_value = r.get("rough", 0.6)
    bsdf.inputs["Specular IOR Level"].default_value = r.get("spec", 0.5)
    if r.get("transmission"):
        bsdf.inputs["Transmission Weight"].default_value = r["transmission"]
        bsdf.inputs["IOR"].default_value = r.get("ior", 1.45)
    if "emit_mix" in r:
        bsdf.inputs["Emission Color"].default_value = rgb(r["emit_mix"])
        bsdf.inputs["Emission Strength"].default_value = r["strength"]
    base = rgb(r["color"])
    if r.get("concrete") or r.get("clay"):
        tc = nodes.new("ShaderNodeTexCoord")
        nz = nodes.new("ShaderNodeTexNoise")
        nz.inputs["Scale"].default_value = 9.0 if r.get("concrete") else 3.0
        nz.inputs["Detail"].default_value = 8.0
        nz.inputs["Roughness"].default_value = 0.62
        links.new(tc.outputs["Object"], nz.inputs["Vector"])
        ramp = nodes.new("ShaderNodeValToRGB")
        lo, hi = (0.86, 1.08) if r.get("concrete") else (0.93, 1.04)
        ramp.color_ramp.elements[0].position = 0.35
        ramp.color_ramp.elements[0].color = tuple(c * lo for c in base[:3]) + (1,)
        ramp.color_ramp.elements[1].position = 0.7
        ramp.color_ramp.elements[1].color = tuple(min(1, c * hi) for c in base[:3]) + (1,)
        links.new(nz.outputs["Fac"], ramp.inputs["Factor"])
        links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
        # porosity: fine grain + scattered pits
        fine = nodes.new("ShaderNodeTexNoise")
        fine.inputs["Scale"].default_value = 140.0 if r.get("concrete") else 220.0
        fine.inputs["Detail"].default_value = 4.0
        links.new(tc.outputs["Object"], fine.inputs["Vector"])
        height = fine.outputs["Fac"]
        if r.get("clay"):
            vor = nodes.new("ShaderNodeTexVoronoi")
            vor.inputs["Scale"].default_value = 60.0
            links.new(tc.outputs["Object"], vor.inputs["Vector"])
            pit = nodes.new("ShaderNodeMapRange")
            pit.inputs["From Min"].default_value = 0.0
            pit.inputs["From Max"].default_value = 0.12
            pit.inputs["To Min"].default_value = -1.0
            pit.inputs["To Max"].default_value = 0.0
            links.new(vor.outputs["Distance"], pit.inputs["Value"])
            add = nodes.new("ShaderNodeMath")
            add.operation = "ADD"
            links.new(height, add.inputs[0])
            links.new(pit.outputs["Result"], add.inputs[1])
            height = add.outputs[0]
        if r.get("brick"):
            br = nodes.new("ShaderNodeTexBrick")
            br.inputs["Scale"].default_value = 1.0
            br.inputs["Row Height"].default_value = r["brick"]
            br.inputs["Brick Width"].default_value = r["brick"] * 3.2
            br.inputs["Mortar Size"].default_value = r["brick"] * 0.08
            br.inputs["Mortar Smooth"].default_value = 0.3
            br.inputs["Color1"].default_value = (1, 1, 1, 1)
            br.inputs["Color2"].default_value = (0.94, 0.94, 0.94, 1)
            br.inputs["Mortar"].default_value = (0, 0, 0, 1)
            # bricks run around the building: use world XZ for faces along X, YZ for faces along Y
            sep = nodes.new("ShaderNodeSeparateXYZ")
            links.new(tc.outputs["Object"], sep.inputs[0])
            add_xy = nodes.new("ShaderNodeMath")
            add_xy.operation = "ADD"
            links.new(sep.outputs["X"], add_xy.inputs[0])
            links.new(sep.outputs["Y"], add_xy.inputs[1])
            comb = nodes.new("ShaderNodeCombineXYZ")
            links.new(add_xy.outputs[0], comb.inputs["X"])
            links.new(sep.outputs["Z"], comb.inputs["Y"])
            links.new(comb.outputs[0], br.inputs["Vector"])
            mul = nodes.new("ShaderNodeMath")
            mul.operation = "MULTIPLY"
            links.new(height, mul.inputs[0])
            links.new(br.outputs["Fac"], mul.inputs[1])
            height = mul.outputs[0]
        bump = nodes.new("ShaderNodeBump")
        bump.inputs["Strength"].default_value = 0.12 if r.get("concrete") else 0.18
        bump.inputs["Distance"].default_value = 0.002
        links.new(height, bump.inputs["Height"])
        links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
        m["anu_bump_node"] = bump.name
    return m
