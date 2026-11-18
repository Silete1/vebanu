/**
 * Loads the scene's files for one quality tier, in parallel, all inside mount (the poster stays the LCP).
 * Textures are plain AVIF/WebP images (no transcoder to download); geometry is one quantized GLB
 * (KHR_mesh_quantization: no WebAssembly decoder, so the site's CSP stays as it is).
 */
import { LinearFilter, NoColorSpace, RepeatWrapping, SRGBColorSpace, type Texture, TextureLoader, type WebGLRenderer } from "three"
import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

import { BASE, type Quality, type SceneData } from "./data"

export type Assets = {
  data: SceneData
  gltf: GLTF
  stars: Uint16Array
  sky: Texture
  lightmap: { body: Texture; ground: Texture }
  tex: Record<"wallDiff" | "wallNor" | "topDiff" | "topNor" | "groundDiff" | "groundNor", Texture>
  cards: Texture
}

export async function loadAssets(q: Quality, renderer: WebGLRenderer, signal: AbortSignal): Promise<Assets> {
  const loader = new TextureLoader()
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy())

  const texture = async (name: string, opts: { srgb: boolean; repeat?: boolean; flipY?: boolean; mips?: boolean }) => {
    const t = await loader.loadAsync(BASE + name)
    t.colorSpace = opts.srgb ? SRGBColorSpace : NoColorSpace
    t.flipY = opts.flipY ?? true
    if (opts.repeat) t.wrapS = t.wrapT = RepeatWrapping
    if (opts.mips === false) {
      t.generateMipmaps = false
      t.minFilter = LinearFilter
    }
    t.anisotropy = aniso
    t.needsUpdate = true
    return t
  }

  const gltfLoader = new GLTFLoader()
  const [data, gltf, stars, sky, body, ground, wallDiff, wallNor, topDiff, topNor, groundDiff, groundNor, cards] =
    await Promise.all([
      fetch(BASE + "scene.json", { signal }).then((r) => r.json() as Promise<SceneData>),
      gltfLoader.loadAsync(BASE + "sky-of-anu.glb"),
      fetch(BASE + "stars.bin", { signal }).then(async (r) => new Uint16Array(await r.arrayBuffer())),
      texture(`sky-${q}.avif`, { srgb: false, mips: false }),
      // body UVs come from glTF (v already flipped), the ground's are computed: different flips
      texture(`lm-body-${q}.webp`, { srgb: true, flipY: false }),
      texture(`lm-ground-${q}.webp`, { srgb: true }),
      texture(`tex-wall-diff-${q}.webp`, { srgb: true, repeat: true }),
      texture(`tex-wall-nor-${q}.webp`, { srgb: false, repeat: true }),
      texture(`tex-top-diff-${q}.webp`, { srgb: true, repeat: true }),
      texture(`tex-top-nor-${q}.webp`, { srgb: false, repeat: true }),
      texture(`tex-ground-diff-${q}.webp`, { srgb: true, repeat: true }),
      texture(`tex-ground-nor-${q}.webp`, { srgb: false, repeat: true }),
      texture(`cards-${q}.webp`, { srgb: true }),
    ])
  return {
    data,
    gltf,
    stars,
    sky,
    lightmap: { body, ground },
    tex: { wallDiff, wallNor, topDiff, topNor, groundDiff, groundNor },
    cards,
  }
}

export function disposeAssets(a: Assets) {
  for (const t of [a.sky, a.lightmap.body, a.lightmap.ground, a.cards, ...Object.values(a.tex)]) t.dispose()
  a.gltf.scene.traverse((o) => {
    const mesh = o as { geometry?: { dispose(): void } }
    mesh.geometry?.dispose()
  })
}
