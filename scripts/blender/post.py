"""Grade a raw render so it sits seamlessly on the site.

ink look:   lift the black point to ink #090B11 (nothing in the image is darker than the
            band it sits on), then feather the frame edges to exactly #090B11.
paper look: scale so the ground reads as bone #F8FAFC, then feather the edges to it.

Input: 16-bit TIFF from render.py (AgX already applied). Output: 16-bit master TIFF
(for encode.mjs) and an 8-bit PNG preview. Run with ~/tools/venv/bin/python.
"""
import argparse

import numpy as np
import tifffile
from PIL import Image

BG = {"ink": "#090B11", "paper": "#F8FAFC"}


def hex01(h):
    h = h.lstrip("#")
    return np.array([int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)], dtype=np.float32)


def load(path):
    a = tifffile.imread(path)
    a = a.astype(np.float32) / (65535.0 if a.dtype == np.uint16 else 255.0)
    return a[..., :3]


def edge_mask(h, w, feather=0.06):
    """1 inside, 0 on the frame edge; smooth over `feather` x width."""
    x = np.minimum(np.arange(w), w - 1 - np.arange(w))[None, :].astype(np.float32)
    y = np.minimum(np.arange(h), h - 1 - np.arange(h))[:, None].astype(np.float32)
    f = feather * w
    mx = np.clip(x / f, 0, 1)
    my = np.clip(y / f, 0, 1)
    m = mx * my
    return (m * m * (3 - 2 * m))[..., None]


def border_median(img, frac=0.03):
    h, w, _ = img.shape
    b = max(2, int(frac * w))
    ring = np.concatenate([img[:b].reshape(-1, 3), img[-b:].reshape(-1, 3),
                           img[:, :b].reshape(-1, 3), img[:, -b:].reshape(-1, 3)])
    return np.median(ring, axis=0)


def grade(img, look, feather=0.06):
    T = hex01(BG[look])
    if look == "ink":
        out = T + img * (1 - T)
    else:
        med = border_median(img)
        g = np.clip(T / np.maximum(med, 1e-3), 0.8, 1.6)
        out = np.clip(img * g, 0, 1)
    m = edge_mask(*img.shape[:2], feather=feather)
    return T + (out - T) * m


def save(out, tif_path=None, png_path=None):
    if tif_path:
        tifffile.imwrite(tif_path, (np.clip(out, 0, 1) * 65535 + 0.5).astype(np.uint16), photometric="rgb")
    if png_path:
        rng = np.random.default_rng(7)
        d = (rng.random(out.shape[:2], dtype=np.float32)[..., None] - 0.5) / 255.0  # dither
        Image.fromarray((np.clip(out + d, 0, 1) * 255 + 0.5).astype(np.uint8)).save(png_path)


def corners(out):
    px = [out[2, 2], out[2, -3], out[-3, 2], out[-3, -3]]
    return ["#%02X%02X%02X" % tuple(int(round(c * 255)) for c in p) for p in px]


def main():
    p = argparse.ArgumentParser()
    p.add_argument("raw")
    p.add_argument("look", choices=["ink", "paper"])
    p.add_argument("--tif")
    p.add_argument("--png")
    p.add_argument("--feather", type=float, default=0.06)
    a = p.parse_args()
    out = grade(load(a.raw), a.look, a.feather)
    save(out, a.tif, a.png)
    print("corners", corners(out))


if __name__ == "__main__":
    main()
