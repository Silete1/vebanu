"""retail-finance — money in two currencies: banknote bundles in two tones on a counter
closed by the blue edge, a cash box, and between the two stacks the counter line with
its square ticks (the rate)."""
import random

from mathutils import Vector

from .. import geo as G


def bundle_stack(S, base, n, role, seed):
    rnd = random.Random(seed)
    x, y, z = base
    for i in range(n):
        G.box("bundle", (0.62, 0.3, 0.07), (x + rnd.uniform(-0.015, 0.015), y + rnd.uniform(-0.015, 0.015),
                                             z + 0.035 + i * 0.072), S.mat(role), bevel=0.003, rot=(0, 0, rnd.uniform(-3, 3)))
        G.box("band", (0.08, 0.305, 0.072), (x, y, z + 0.035 + i * 0.072), S.mat("slate_light"), bevel=0.001)
    return z + n * 0.072


def build(S):
    S.camera(target=(0.5, 0.2, 0.95), azimuth=-64, focal=100, frame_w=5.6, shift_x=-0.17, horizon=0.7, at=0.36)
    S.sky(stars=220, seed=161, calm=0.38)
    # the counter: an ink slab on a clay plinth, the blue edge along its front
    G.slab("plinth", (2.9, 0.9, 0.78), (0.4, 0.05, 0), S.mat("body"))
    G.ink_band(S, (3.1, 1.0, 0.08), (0.4, 0.0, 0.78), edge="front")
    z = 0.86
    bundle_stack(S, (-0.35, 0.0, z), 6, "light", 1)  # one currency in clay
    bundle_stack(S, (0.75, 0.05, z), 4, "slate", 2)  # the other in slate
    # the counter line between the stacks: a thin blue rail with square ticks
    a, b = Vector((-0.35, -0.3, z + 0.004)), Vector((0.75, -0.3, z + 0.004))
    G.beams("rate", [(a, b)], 0.006, S.mat("line"))
    for i in range(6):
        p = a.lerp(b, (i + 0.5) / 6)
        G.slab("tick", (0.04, 0.04, 0.012 + 0.012 * (i % 2)), p, S.mat("glyph_blue" if i == 3 else "light"))
    # the cash box
    cb = Vector((1.55, 0.1, z))
    G.slab("cashbox", (0.52, 0.42, 0.26), cb, S.mat("ink"))
    G.box("slot", (0.3, 0.03, 0.004), cb + Vector((0, 0, 0.262)), S.mat("accent_soft"), bevel=0)
    G.slab("lid-line", (0.52, 0.006, 0.006), cb + Vector((0, -0.213, 0.2)), S.mat("slate"))
    # coins as flat squares (sharp), a small stack beside the bundles
    for i in range(5):
        G.slab("coin", (0.11, 0.11, 0.018), (0.2, -0.22, z + i * 0.02), S.mat("slate_light"), rot=(0, 0, i * 9))
    S.studio(target=(0.4, 0.1, 0.9), scale=0.8, accent=(2.0, 1.8, 1.6), accent_energy=0.25)
    S.sun(105, 22, 0.35)
