"""Seamless loops: render N frames (Blender), grade every frame like the stills, encode
H.264 MP4 and AV1 WebM under their byte budgets, and a poster (AVIF/WebP) in
public/media/loops/.

    ~/tools/venv/bin/python scripts/blender/loop.py --slug home --seconds 6
    ~/tools/venv/bin/python scripts/blender/loop.py --slug twins --seconds 5 --size 960x600
"""
import argparse
import glob
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import build  # noqa: E402
import post  # noqa: E402

LOOPS = os.path.join(build.REPO, "public", "media", "loops")
KB = 1024


def ffmpeg_bin():
    import imageio_ffmpeg

    return imageio_ffmpeg.get_ffmpeg_exe()


def encode(frames_glob, out, fps, codec, budget, crfs):
    for crf in crfs:
        if codec == "h264":
            args = ["-c:v", "libx264", "-preset", "veryslow", "-crf", str(crf), "-pix_fmt", "yuv420p",
                    "-profile:v", "high", "-movflags", "+faststart", "-g", str(fps * 2)]
        else:
            args = ["-c:v", "libsvtav1", "-preset", "4", "-crf", str(crf), "-pix_fmt", "yuv420p10le",
                    "-g", str(fps * 3), "-svtav1-params", "tune=0"]
        cmd = [ffmpeg_bin(), "-y", "-loglevel", "error", "-framerate", str(fps), "-i", frames_glob, *args, "-an", out]
        subprocess.run(cmd, check=True)
        size = os.path.getsize(out)
        if size <= budget:
            return crf, size
    return crf, size


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--slug", default="home")
    p.add_argument("--seconds", type=float, default=6.0)
    p.add_argument("--fps", type=int, default=24)
    p.add_argument("--size", default=None, help="WxH (default 960 wide in the slug's aspect)")
    p.add_argument("--samples", type=int, default=64)
    p.add_argument("--skip-render", action="store_true")
    a = p.parse_args()
    w, h = build.SIZES.get(a.slug, (1600, 1000))
    size = a.size or f"960x{960 * h // w}"
    n = int(round(a.seconds * a.fps))
    raw_dir = os.path.join(build.OUT, "raw")
    fdir = os.path.join(raw_dir, f"{a.slug}-ink-frames")
    if not a.skip_render:
        build.render(a.slug, "ink", size, a.samples, False, extra=("--frames", str(n)))
    gdir = os.path.join(build.OUT, "loops", a.slug)
    os.makedirs(gdir, exist_ok=True)
    os.makedirs(LOOPS, exist_ok=True)
    raws = sorted(glob.glob(os.path.join(fdir, "f_*.tif")))[:n]
    for i, r in enumerate(raws):
        out = post.grade(post.load(r), "ink")
        post.save(out, tif_path=os.path.join(gdir, f"g_{i + 1:04d}.tif"))
        if i == 0:
            poster = os.path.join(gdir, "poster.tif")
            post.save(out, tif_path=poster, png_path=os.path.join(gdir, "poster.png"))
    pw, ph = (int(v) for v in size.split("x"))
    r = subprocess.run([build.node_bin(), os.path.join(HERE, "encode.mjs"), poster, os.path.join(LOOPS, f"{a.slug}-poster"),
                        "--sizes", f"{pw}x{ph}:60"], cwd=build.REPO, capture_output=True, text=True)
    sys.stdout.write(r.stdout + r.stderr)
    frames = os.path.join(gdir, "g_%04d.tif")
    crf, size_mp4 = encode(frames, os.path.join(LOOPS, f"{a.slug}.mp4"), a.fps, "h264", 900 * KB, range(20, 40, 2))
    print(f"{a.slug}.mp4  {n} frames  crf {crf}  {size_mp4 / KB:.0f} KB")
    crf, size_webm = encode(frames, os.path.join(LOOPS, f"{a.slug}.webm"), a.fps, "av1", 700 * KB, range(30, 60, 3))
    print(f"{a.slug}.webm (AV1)  crf {crf}  {size_webm / KB:.0f} KB")


if __name__ == "__main__":
    main()
