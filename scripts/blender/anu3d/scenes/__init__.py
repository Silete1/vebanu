"""One small scene function per slug. Each module defines build(S) and registers it
under its slug; build() places geometry, the camera and the lights through the Style S."""
import importlib

SLUGS = [
    "home", "brain", "control-layer", "walkthroughs", "support", "intelligence", "workshops",
    "qalib", "twins", "construction", "bureau", "brain-lite", "legal", "government-hr",
    "field-operations", "retail-finance", "qr-menu", "maps",
    "sky", "tablet",  # chapter images: the night sky alone, one clay tablet
]

# frame per slug (default 1600x1000, 16:10); the home hero is 16:9
SIZES = {"home": (1920, 1080), "sky": (1920, 1080)}


def get(slug):
    mod = importlib.import_module(f".{slug.replace('-', '_')}", __name__)
    return mod.build
