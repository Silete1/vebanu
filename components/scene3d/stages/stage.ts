/**
 * A system's own scene ("stage"): what a system page pulls into after the shared opening beat (its slab docked on
 * the ziggurat). Every stage keeps the Sky of Anu mount contract by living inside the same mount
 * (scenes/sky-of-anu.ts), and exposes the same small surface. Register new stages in `stages` below.
 */
import type { Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"

import type { Quality } from "../data"

export type StageName = "workshops"

export type StageOptions = { rtl: boolean; locale: "en" | "ar"; quality: Quality }

export type Pointer = { x: number; y: number; inside: boolean }

export type Stage = {
  scene: Scene
  camera: PerspectiveCamera
  /** added to the shared exposure while this stage is on screen */
  exposure: number
  /** objects the pointer can pick */
  targets: Object3D[]
  resize(width: number, height: number): void
  /** what a picked object is: its label (and where to anchor it), and a link if it has one */
  describe(o: Object3D): { label: string; anchor: Vector3; href?: string } | undefined
  update(progress: number, time: number, dt: number, pointer: Pointer, pxPerMetre: number): void
  pxPerMetre(height: number): number
  dispose(): void
}

/** loaders: assets first (fetched during the opening beat), then the stage itself */
export const stages: Record<StageName, (renderer: WebGLRenderer, signal: AbortSignal, opts: StageOptions) => Promise<Stage>> = {
  workshops: async (renderer, signal, opts) => {
    const m = await import("./workshops")
    return m.createWorkshops(await m.loadWorkshops(renderer, signal, opts.quality), renderer, opts)
  },
}
