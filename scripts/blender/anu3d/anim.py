"""Seamless loop helpers: everything is keyed per frame from a periodic function of
t = (frame - 1) / frames, so frame N+1 would equal frame 1 and the video loops cleanly."""
import math

import bpy
from mathutils import Vector

SKY_PREFIXES = ("stars", "constellation", "sky-glyphs", "dingir", "spark")


def frames_t(n):
    for f in range(1, n + 1):
        yield f, (f - 1) / n


def sky_root(S):
    """Parent every sky-plane object to one empty at the camera, so the sky can drift."""
    root = bpy.data.objects.new("sky-root", None)
    S.scene.collection.objects.link(root)
    root.location = S.cam.location.copy()
    bpy.context.view_layer.update()
    for ob in list(S.scene.objects):
        if ob.name.startswith(SKY_PREFIXES) and ob.parent is None:
            mw = ob.matrix_world.copy()
            ob.parent = root
            ob.matrix_parent_inverse = root.matrix_world.inverted()
            ob.matrix_world = mw
    return root


def sky_drift(S, n, yaw_deg=0.12, pitch_deg=0.04):
    """A very slow sway of the whole sky around the camera (a closed path)."""
    root = sky_root(S)
    for f, t in frames_t(n):
        root.rotation_euler = (math.radians(pitch_deg) * math.sin(4 * math.pi * t) * 0.5, 0.0,
                               math.radians(yaw_deg) * math.sin(2 * math.pi * t))
        root.keyframe_insert("rotation_euler", frame=f)
    return root


def camera_drift(S, n, ax=0.0, az=0.0):
    """The camera breathes on a small closed ellipse (world units)."""
    cam = S.cam
    base = cam.location.copy()
    right = cam.rotation_euler.to_matrix() @ Vector((1, 0, 0))
    for f, t in frames_t(n):
        cam.location = base + right * (ax * math.sin(2 * math.pi * t)) + Vector((0, 0, az * math.sin(4 * math.pi * t)))
        cam.keyframe_insert("location", frame=f)


def pulse(n, setter, lo, hi, phase=0.0):
    """Key a value pulsing once per loop between lo and hi."""
    for f, t in frames_t(n):
        k = 0.5 - 0.5 * math.cos(2 * math.pi * (t + phase))
        setter(lo + (hi - lo) * k, f)


def linear(n):
    for f, t in frames_t(n):
        yield f, t
