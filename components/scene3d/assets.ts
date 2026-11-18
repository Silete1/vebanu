/**
 * Loads the scene's files for one quality tier, in parallel, all inside mount (the poster stays the LCP).
 * Surfaces are Cycles bakes as plain AVIF with alpha (no transcoder to download); geometry is two quantized GLBs
 * (KHR_mesh_quantization: no WebAssembly decoder, so the site's CSP stays as it is).
 */
import { LinearFilter, NoColorSpace, SRGBColorSpace, type Texture, TextureLoader, type WebGLRenderer } from "three"
import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

import { BASE, type Quality, type SceneData } from "./data"

export type Assets = {
  data: SceneData
  /** the baked surfaces: Body, GroundNear, GroundFar, Door */
  statics: GLTF
  /** what moves or is lit live: Slab, Figure */
  movers: GLTF
  stars: Uint16Array
  sky: Texture
  beauty: Record<"body" | "near" | "far", Texture>
  cards: Texture
}

export async function loadAssets(q: Quality, renderer: WebGLRenderer, signal: AbortSignal): Promise<Assets> {
  const loader = new TextureLoader()
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy())

  const texture = async (name: string, opts: { srgb: boolean; flipY?: boolean; mips?: boolean }) => {
    const t = await loader.loadAsync(BASE + name)
    t.colorSpace = opts.srgb ? SRGBColorSpace : NoColorSpace
    t.flipY = opts.flipY ?? true
    if (opts.mips === false) {
      t.generateMipmaps = false
      t.minFilter = LinearFilter
    }
    t.anisotropy = aniso
    t.needsUpdate = true
    return t
  }

  const gltf = new GLTFLoader()
  // bakes are read through glTF UVs (v already flipped): no flip
  const baked = (part: string) => texture(`beauty-${part}-${q}.avif`, { srgb: true, flipY: false })
  const [data, statics, movers, stars, sky, body, near, far, cards] = await Promise.all([
    fetch(BASE + "scene.json", { signal }).then((r) => r.json() as Promise<SceneData>),
    gltf.loadAsync(BASE + "static.glb"),
    gltf.loadAsync(BASE + "movers.glb"),
    fetch(BASE + "stars.bin", { signal }).then(async (r) => new Uint16Array(await r.arrayBuffer())),
    texture(`sky-${q}.avif`, { srgb: false, mips: false }),
    baked("body"),
    baked("near"),
    baked("far"),
    texture(`cards-${q}.webp`, { srgb: true }),
  ])
  return { data, statics, movers, stars, sky, beauty: { body, near, far }, cards }
}

export function disposeAssets(a: Assets) {
  for (const t of [a.sky, a.cards, ...Object.values(a.beauty)]) t.dispose()
  for (const g of [a.statics, a.movers])
    g.scene.traverse((o) => {
      const mesh = o as { geometry?: { dispose(): void } }
      mesh.geometry?.dispose()
    })
}
