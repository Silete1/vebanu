"""The whole pipeline for one slug, a list, or all: render (Blender) -> grade (post.py)
-> encode (encode.mjs) into public/media/systems.

    ~/tools/venv/bin/python scripts/blender/build.py --slug home              # final, ink
    ~/tools/venv/bin/python scripts/blender/build.py --slug all
    ~/tools/venv/bin/python scripts/blender/build.py --slug brain --preview   # 640x400, 32 spp
    ~/tools/venv/bin/python scripts/blender/build.py --slug twins --look paper --samples 256

Finals in the ink look are written as <slug>.avif/.webp (+ -800); the paper look as
<slug>-paper.*. Previews only land in scripts/blender/.out/preview/.
Environment: BLENDER (default ~/tools/blender), NODE (default: node on PATH, else nvm's).
"""
import argparse
import glob
import os
import shutil
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)

import post  # noqa: E402
from anu3d.scenes import SIZES, SLUGS  # noqa: E402

OUT = os.path.join(HERE, ".out")
MEDIA = os.path.join(REPO, "public", "media", "systems")

# AVIF budgets in KB per output size (WebP gets 1.5x); 16:9 slugs ship at 1920 + 960
BUDGETS = {"home": "1920x1080:140,960x540:60", "sky": "1920x1080:80,960x540:40"}
DEFAULT_BUDGET = "1600x1000:140,800x500:60"
MIRRORED = {"home": "home-rtl"}  # an RTL twin with the calm side on the right


def blender_bin():
    return os.environ.get("BLENDER") or os.path.expanduser("~/tools/blender")


def node_bin():
    if os.environ.get("NODE"):
        return os.environ["NODE"]
    found = sorted(glob.glob(os.path.expanduser("~/.nvm/versions/node/v22*/bin/node")))
    return found[-1] if found else (shutil.which("node") or "node")


def render(slug, look, size, samples, preview, extra=()):
    raw_dir = os.path.join(OUT, "raw")
    cmd = [blender_bin(), "-b", "--factory-startup", "-P", os.path.join(HERE, "render.py"), "--",
           "--slug", slug, "--look", look, "--size", size, "--samples", str(samples), "--out", raw_dir, *extra]
    if preview:
        cmd.append("--preview")
    t0 = time.time()
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0 or "ANU-RENDERED" not in r.stdout:
        sys.stderr.write(r.stdout[-4000:] + r.stderr[-4000:])
        raise SystemExit(f"render failed: {slug}")
    return os.path.join(raw_dir, f"{slug}-{look}.tif"), time.time() - t0


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--slug", default="home", help="slug, comma list, or 'all'")
    p.add_argument("--look", default="ink", choices=["ink", "paper"])
    p.add_argument("--size", default=None, help="WxH (default per slug: 1600x1000 or 1920x1080; preview 40%%)")
    p.add_argument("--samples", type=int, default=None, help="default 192, preview 32")
    p.add_argument("--preview", action="store_true")
    p.add_argument("--no-encode", action="store_true")
    p.add_argument("--encode-only", action="store_true", help="re-encode existing masters, no render")
    p.add_argument("--feather", type=float, default=0.06)
    a = p.parse_args()

    slugs = SLUGS if a.slug == "all" else a.slug.split(",")
    samples = a.samples or (32 if a.preview else 192)
    for d in ("raw", "master", "preview"):
        os.makedirs(os.path.join(OUT, d), exist_ok=True)
    os.makedirs(MEDIA, exist_ok=True)

    for slug in slugs:
        w, h = SIZES.get(slug, (1600, 1000))
        size = a.size or (f"{w * 2 // 5}x{h * 2 // 5}" if a.preview else f"{w}x{h}")
        name = f"{slug}-{a.look}"
        png = os.path.join(OUT, "preview", f"{name}{'-p' if a.preview else ''}.png")
        master = None if a.preview else os.path.join(OUT, "master", f"{name}.tif")
        if not a.encode_only:
            raw, secs = render(slug, a.look, size, samples, a.preview)
            out = post.grade(post.load(raw), a.look, a.feather)
            post.save(out, master, png)
            print(f"{slug:18s} {a.look:5s} {size} {samples}spp  render {secs:5.1f}s  corners {post.corners(out)}  {png}")
        if master and not a.no_encode:
            sfx = "" if a.look == "ink" else "-paper"
            jobs = [(slug + sfx, [])]
            if slug in MIRRORED:
                jobs.append((MIRRORED[slug] + sfx, ["--flip"]))
            for name_out, extra in jobs:
                cmd = [node_bin(), os.path.join(HERE, "encode.mjs"), master, os.path.join(MEDIA, name_out),
                       "--sizes", BUDGETS.get(slug, DEFAULT_BUDGET), *extra]
                r = subprocess.run(cmd, cwd=REPO, capture_output=True, text=True)
                sys.stdout.write(r.stdout)
                if r.returncode:
                    sys.stderr.write(r.stderr)
                    raise SystemExit(f"encode failed: {slug}")


if __name__ == "__main__":
    main()
