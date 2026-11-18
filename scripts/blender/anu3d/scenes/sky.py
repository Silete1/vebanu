"""sky — the night sky alone, for section backgrounds: a low horizon with a faint blue
glow, sparse stars, one faint constellation of the ANU network and a single dingir glint.
Very dark; text sits anywhere on it."""


def build(S):
    S.camera(target=(0, 0, 1.2), azimuth=-90, elevation=1.5, focal=85, frame_w=14.0, shift_x=0.0, horizon=0.12)
    S.sky(stars=520, seed=21, calm=0.0, dingir=1, brightest=0.8)
    pts, edges = S.sky_network(seed=8, n=9, u=(0.62, 0.9), v=(0.52, 0.86), k="tree", min_dist=0.05)
    S.constellation(pts, edges, line_px=0.7, line_glow=0.28, star_px=2.0, star_glow=0.9)
