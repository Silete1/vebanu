"""Blender side of the pipeline: build one scene and render it to a 16-bit TIFF.

    ~/tools/blender -b -P scripts/blender/render.py -- --slug home --look ink \
        --size 1600x1000 --samples 192 --out scripts/blender/.out/raw

Usually called by build.py, which then grades (post.py) and encodes (encode.mjs).
--slug accepts one slug, a comma list, or 'all'. --frames N renders an N-frame loop
(scene modules may define animate(S, frames)) as numbered TIFFs instead of a still.
--blend saves the built scene as a .blend next to the render for inspection.
"""
import argparse
import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import bpy  # noqa: E402

from anu3d import geo, scenes  # noqa: E402
from anu3d.style import Style  # noqa: E402


def parse():
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--slug", default="home")
    p.add_argument("--look", default="ink", choices=["ink", "paper"])
    p.add_argument("--size", default="1600x1000")
    p.add_argument("--samples", type=int, default=192)
    p.add_argument("--out", default=os.path.join(HERE, ".out", "raw"))
    p.add_argument("--preview", action="store_true")
    p.add_argument("--frames", type=int, default=0)
    p.add_argument("--blend", action="store_true")
    return p.parse_args(argv)


def build(slug, look, size, samples, preview, frames=0):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    geo.reset()
    S = Style(look, size)
    S.world()
    S.ground()
    mod_build = scenes.get(slug)
    mod_build(S)
    S.render_settings(samples=samples, preview=preview)
    if frames:
        import importlib

        mod = importlib.import_module(f"anu3d.scenes.{slug.replace('-', '_')}")
        if not hasattr(mod, "animate"):
            raise SystemExit(f"{slug} has no animate()")
        mod.animate(S, frames)
    return S


def main():
    a = parse()
    size = tuple(int(v) for v in a.size.lower().split("x"))
    slugs = scenes.SLUGS if a.slug == "all" else a.slug.split(",")
    os.makedirs(a.out, exist_ok=True)
    for slug in slugs:
        t0 = time.time()
        build(slug, a.look, size, a.samples, a.preview, a.frames)
        sc = bpy.context.scene
        if a.blend:
            bpy.ops.wm.save_as_mainfile(filepath=os.path.join(a.out, f"{slug}-{a.look}.blend"))
        if a.frames:
            fdir = os.path.join(a.out, f"{slug}-{a.look}-frames")
            os.makedirs(fdir, exist_ok=True)
            sc.frame_start, sc.frame_end = 1, a.frames
            sc.render.filepath = os.path.join(fdir, "f_####")
            bpy.ops.render.render(animation=True)
        else:
            sc.render.filepath = os.path.join(a.out, f"{slug}-{a.look}.tif")
            bpy.ops.render.render(write_still=True)
        print(f"ANU-RENDERED {slug} {a.look} {size[0]}x{size[1]} {a.samples}spp {time.time() - t0:.1f}s", flush=True)


main()
