"""tablet — one clay tablet in three-quarter view on the ink plain under the night sky:
ruled registers of wedge impressions, the first ledgers (and the dingir sign at the start
of the first line). For the "noise -> ledger" chapter."""
import math

from mathutils import Euler, Vector

from .. import clay

ROT = (68, 0, 40)


def build(S):
    c = Vector((0.0, 0.0, 0.53))
    clay.tablet(S, size=(1.6, 1.05, 0.22), loc=c, rot=ROT, seed=7, rows=5, dingir=True, depth=0.02, res=560)
    R = Euler(tuple(math.radians(a) for a in ROT)).to_matrix()
    tangent, normal = R @ Vector((1, 0, 0)), R @ Vector((0, 0, 1))
    S.camera(target=(0.05, 0.0, 0.5), azimuth=-95, focal=100, frame_w=4.0, shift_x=-0.16, horizon=0.72, at=0.42)
    S.sky(stars=200, seed=4, calm=0.38)
    # raking key: along the face from its left end, a few degrees above the surface
    S.studio(target=c, scale=0.6, key_pos=c - tangent * 5.0 + normal * 1.2 + Vector((0, 0, 0.6)),
             rim_az=160, rim_el=35, fill=0.2, rim=0.6, accent=(1.6, 1.4, 0.3), accent_energy=0.4)
