"""bureau — a pharmaceutical scientific bureau: boxes and blister packs on an ink shelf,
and a route line running out across the plain to the reps' stops."""
import random

from mathutils import Vector

from .. import geo as G


def blister(S, base, rot_z=0.0):
    """A blister pack: a thin plate with a grid of small raised cells."""
    G.slab("blister", (0.36, 0.2, 0.012), base, S.mat("slate_light"), rot=(0, 0, rot_z))
    cells = [Vector(base) + Vector((-0.12 + 0.08 * i, -0.05 + 0.1 * j, 0.012 + 0.012)) for i in range(4) for j in range(2)]
    G.cubes("cells", cells, 0.05, S.mat("light"))


def build(S):
    rnd = random.Random(111)
    S.camera(target=(0.6, 0.6, 0.85), azimuth=-64, focal=100, frame_w=6.6, shift_x=-0.17, horizon=0.7, at=0.38)
    S.sky(stars=230, seed=112, calm=0.38)
    # the shelf: ink posts and boards
    sw, sd, levels = 2.0, 0.5, 4
    for x in (-sw / 2, sw / 2):
        for y in (-sd / 2, sd / 2):
            G.slab("post", (0.04, 0.04, 1.9), (x, y, 0), S.mat("ink"))
    for k in range(levels):
        z = 0.1 + k * 0.45
        G.slab("board", (sw + 0.04, sd + 0.04, 0.03), (0, 0, z), S.mat("ink"))
        G.box("board-edge", (sw + 0.04, 0.008, 0.008), (0, -sd / 2 - 0.024, z + 0.026), S.mat("accent"), bevel=0)
        x = -sw / 2 + 0.12
        while x < sw / 2 - 0.25:
            if rnd.random() < 0.2 and k > 0:
                blister(S, (x + 0.18, -0.05, z + 0.03), rnd.uniform(-6, 6))
                x += 0.42
                continue
            bw, bh, bd = rnd.choice(((0.2, 0.3, 0.12), (0.14, 0.24, 0.1), (0.26, 0.16, 0.16)))
            G.slab("box", (bw, bd, bh), (x + bw / 2, rnd.uniform(-0.08, 0.04), z + 0.03),
                   S.mat("light" if rnd.random() < 0.8 else "body_alt"))
            if rnd.random() < 0.25:
                G.box("box-mark", (bw * 0.8, 0.004, 0.02), (x + bw / 2, -0.17, z + 0.03 + bh * 0.7), S.mat("accent_soft"),
                      bevel=0)
            x += bw + 0.03
    # the route: from the shelf out to the reps' stops (square-headed markers)
    stops = [Vector((1.9, -0.7, 0)), Vector((3.1, 1.2, 0)), Vector((2.2, 3.4, 0)), Vector((4.4, 5.2, 0))]
    route = [Vector((sw / 2 + 0.1, -0.3, 0.01))]
    for s in stops:
        route += [Vector((s.x, route[-1].y, 0.01)), Vector((s.x, s.y, 0.01))]
    segs = G.dashes(route, 0.12, 0.08)
    G.beams("route", segs, 0.007, S.mat("line"), [1.0] * len(segs))
    for i, s in enumerate(stops):
        G.slab("stop-post", (0.03, 0.03, 0.55), s, S.mat("light"))
        G.standing_glyph(S, "blue" if i == 1 else ("done" if i == 0 else "outline"), s + Vector((0, -0.02, 0.62)),
                         s=0.16, t=0.02)
    S.studio(target=(0.6, 0.4, 0.8), scale=0.95, accent=(2.4, 1.8, 0.6), accent_energy=0.2)
    S.sun(105, 22, 0.35)
