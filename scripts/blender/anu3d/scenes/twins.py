"""twins — the digital twin of a container terminal: the quay, three ship-to-shore
cranes, a ship alongside and stacks of containers in ink, clay and one blue; the left of
the terminal is still a wireframe of Signal lines that becomes solid toward the right."""
import random

from mathutils import Vector

from .. import geo as G

CW, CD, CH = 0.62, 0.25, 0.26  # one 40' container, scaled


def fade(x):
    """0 = pure wireframe, 1 = solid: the twin resolves from left to right."""
    return max(0.0, min(1.0, (x + 3.2) / 3.2))


def crane(S, x, y_quay, solid, wire, wire_glow):
    """A ship-to-shore crane: two portal legs on the quay, a boom over the water."""
    legs = []
    for dy in (-0.55, 0.55):
        for dx in (-0.45, 0.45):
            legs.append((Vector((x + dx, y_quay + dy, 0.6)), Vector((x + dx * 0.8, y_quay + dy, 3.4))))
    beams = legs[:]
    beams += [(Vector((x - 0.45, y_quay + dy, 1.8)), Vector((x + 0.45, y_quay + dy, 1.8))) for dy in (-0.55, 0.55)]
    beams += [(Vector((x + dx * 0.8, y_quay - 0.55, 3.4)), Vector((x + dx * 0.8, y_quay + 0.55, 3.4))) for dx in (-0.45, 0.45)]
    boom = G.truss_segments((x, y_quay + 1.4, 3.55), (x, y_quay - 4.2, 3.55), 0.42, 0.34, 14)
    apex = [(Vector((x + dx * 0.8, y_quay + 0.55, 3.4)), Vector((x, y_quay + 0.3, 4.7))) for dx in (-0.45, 0.45)]
    stays = [(Vector((x, y_quay + 0.3, 4.7)), Vector((x, y_quay - 3.6, 3.72))),
             (Vector((x, y_quay + 0.3, 4.7)), Vector((x, y_quay + 1.4, 3.72)))]
    allb = beams + boom + apex + stays
    if solid:
        G.beams("crane", allb, 0.035, S.mat("light" if x > 2 else "slate_light"))
    if wire:
        wire.extend((a, b, wire_glow) for a, b in allb)


def build(S):
    rnd = random.Random(91)
    S.camera(target=(0.8, 0.8, 1.2), azimuth=-58, focal=100, frame_w=13.0, shift_x=-0.16, horizon=0.66, at=0.3)
    S.sky(stars=240, seed=92, calm=0.38)
    yq = -1.2  # quay front edge line
    # the quay: a long concrete slab, its sea edge closed by the thin blue line
    G.slab("quay", (16.0, 6.0, 0.6), (1.0, yq + 3.0, 0), S.mat("concrete_dark"))
    G.box("quay-edge", (16.0, 0.03, 0.04), (1.0, yq - 0.015, 0.58), S.mat("accent"), bevel=0)
    wire = []
    # container stacks behind the cranes
    for bx in range(-6, 8):
        for by in range(4):
            x = bx * (CW + 0.06) + 0.4
            y = yq + 2.4 + by * (CD + 0.05) * 2.2
            h = rnd.choice((1, 2, 2, 3, 3, 4))
            for k in range(h):
                c = Vector((x, y, 0.6 + CH / 2 + k * CH))
                f = fade(x + rnd.uniform(-0.6, 0.6))
                if f > 0.02:
                    roll = rnd.random()
                    role = "accent" if roll < 0.04 else ("light" if roll < 0.45 else "body")
                    if f >= 0.98:
                        G.box("box", (CW, CD * 2, CH), c, S.mat(role if role != "accent" else "glyph_blue"))
                if f < 0.98:
                    wire += [(a, b, 0.25 + 0.75 * (1 - f)) for a, b in G.box_edges(c, (CW, CD * 2, CH))]
    # three cranes along the quay
    for i, x in enumerate((-3.2, 0.6, 4.2)):
        f = fade(x)
        crane(S, x, yq + 0.9, solid=f > 0.5, wire=wire if f < 0.9 else None, wire_glow=0.3 + 0.7 * (1 - f))
    # a ship alongside: dark hull, containers on deck
    hull_c = Vector((1.6, yq - 1.7, 0))
    G.slab("hull", (9.0, 2.2, 0.75), hull_c, S.mat("ink"))
    G.slab("bridge", (0.9, 1.6, 1.3), hull_c + Vector((4.0, 0, 0.75)), S.mat("light"))
    for bx in range(-6, 5):
        for k in range(rnd.choice((1, 2, 2, 3))):
            x = hull_c.x + bx * (CW + 0.04) + 0.6
            c = Vector((x, hull_c.y, 0.75 + CH / 2 + k * CH))
            f = fade(x)
            if f >= 0.6:
                G.box("box", (CW, 1.8, CH), c, S.mat("light" if rnd.random() < 0.5 else "body"))
            else:
                wire += [(a, b, 0.4 + 0.6 * (1 - f)) for a, b in G.box_edges(c, (CW, 1.8, CH))]
    if wire:
        G.beams("twin-wire", [(a, b) for a, b, _ in wire], 0.007, S.mat("line"), [g for _, _, g in wire])
    S.studio(target=(1.0, 0.5, 1.2), scale=1.5, accent=(4.0, -3.0, 2.0), accent_energy=0.2)
    S.sun(105, 22, 0.45)


def animate(S, n):
    """5 s seamless loop: a Signal-blue light sweeps the terminal from the wireframe side
    to the solid side (off-frame at both ends), the camera breathes."""
    from .. import anim

    scan = S.area("scan", (-9.0, 1.4, 4.2), (-9.0, 1.4, 0.0), 0.5, 900.0, "signal", size_y=7.0)
    for f, t in anim.frames_t(n):
        scan.location.x = -9.0 + 21.0 * t
        scan.keyframe_insert("location", frame=f)
    anim.sky_drift(S, n, yaw_deg=0.08, pitch_deg=0.03)
    anim.camera_drift(S, n, ax=0.12, az=0.04)
