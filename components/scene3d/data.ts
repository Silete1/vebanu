/**
 * Sky of Anu: what the scene reads. Every number comes from public/3d/sky-of-anu/scene.json, written by the
 * build in anu-3d-lab/web (config.py is its one source), so the Blender poster and this scene agree.
 * Positions there are in Blender's frame (metres, Z up); `toThree` turns them into three.js Y-up.
 */
import { Vector3 } from "three"

export type Vec3 = [number, number, number]

/** scroll keys, offsets from the hero camera: hfov (deg), rise/push (m), look_up (m on the aim) */
export type CameraKey = { at: number; hfov: number; rise: number; push: number; look_up: number; shift: number }

export type SkyFrame = { matrix: number[][]; orion: Record<string, Vec3> }

export type SceneData = {
  /** equatorial → scene: LTR = Orion rising in the east, RTL = the same figure setting in the west (mirrored, and real) */
  sky: { ltr: SkyFrame; rtl: SkyFrame }
  orionLines: [string, string][]
  skyMap: { scale: number; gamma: number }
  stars: { count: number; log2FluxMin: number; log2FluxMax: number }
  /** Cycles bakes: RGB everything but the torches, A the torches (scales to undo the 8-bit encode) */
  beauty: Record<"body" | "near" | "far", { moon: number; torch: number; gamma: number }>
  roof: Vec3
  dingir: Vec3
  /** the lab's v2 hero camera (85 mm), LTR; RTL mirrors x */
  hero: { pos: Vec3; target: Vec3 }
  camera: CameraKey[]
  slab: { size: Vec3; slugs: string[]; docks: number[][]; starts: number[][] }
  /** pilgrims on the stair: x, y, z, yaw (rad), height */
  figures: number[][]
  flames: Vec3[]
  torchColor: Vec3
  moon: { elevation_deg: number; azimuth_deg: number; strength: number; color: Vec3 }
  exposure: number
  haze: { color: Vec3; density: number }
  palms: number[][]
  reeds: number[][]
  palmH: number
}

/** One system the slabs stand for, from the page (the box's data-scene). */
export type SlabLink = { slug: string; name: string; href: string }

/** Quality: "hi" desktop files, "lo" phone files (smaller maps, fewer stars and instances). */
export type Quality = "hi" | "lo"

export const BASE = "/3d/sky-of-anu/"

/** Blender (x, y, z) Z-up → three.js (x, z, −y) Y-up. */
export function toThree(v: ArrayLike<number>, out = new Vector3()) {
  return out.set(v[0], v[2], -v[1])
}

export const SIGNAL = 0x2563eb
export const SIGNAL_GLOW = 0x60a5fa

/** The moon's direction (towards the moon) in three.js space, from the Blender sun's elevation/azimuth. */
export function moonDirection(moon: SceneData["moon"]) {
  const t = ((90 - moon.elevation_deg) * Math.PI) / 180
  const a = (moon.azimuth_deg * Math.PI) / 180
  return toThree([Math.sin(a) * Math.sin(t), -Math.cos(a) * Math.sin(t), Math.cos(t)]).normalize()
}
