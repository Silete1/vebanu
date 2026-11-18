/**
 * Sky of Anu: what the scene reads. Every number comes from public/3d/sky-of-anu/scene.json, written by the
 * build in anu-3d-lab/web (config.py is its one source), so the Blender poster and this scene agree.
 * Positions there are in Blender's frame (metres, Z up); `toThree` turns them into three.js Y-up.
 */
import { Vector3 } from "three"

export type Vec3 = [number, number, number]

export type CameraKey = { at: number; pos: Vec3; target: Vec3; fov: number; shift: number }

export type SceneData = {
  yawDeg: number
  sky: { matrix: number[][] }
  skyMap: { scale: number; gamma: number }
  stars: { count: number; log2FluxMin: number; log2FluxMax: number }
  lightmaps: Record<"body" | "ground", { moon: number; torch: number; gamma: number }>
  orion: { stars: Record<string, Vec3>; lines: [string, string][] }
  roof: Vec3
  dingir: Vec3
  slab: { size: Vec3; slugs: string[]; docks: number[][]; starts: number[][] }
  torches: Vec3[]
  torchColor: Vec3
  moon: { elevation_deg: number; azimuth_deg: number; strength: number; color: Vec3 }
  groundPatch: number
  tile: { wall: number; top: number; ground: number }
  camera: CameraKey[]
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
