/**
 * ANU's systems as machined slabs: dark anodised metal with an inset Signal-blue light channel. At the top of
 * the page they hover over the plain, leaning their lit face to the reader; as the page scrolls they rise and
 * dock on the terraces one by one (a flash when each seats). Hover lifts a slab and names it; a click is a soft
 * navigation to its story (the same links exist in the page's DOM for keyboards and readers).
 */
import {
  BoxGeometry,
  Color,
  Group,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  type Texture,
  Vector3,
} from "three"

import type { Assets } from "./assets"
import { SIGNAL, type SlabLink, toThree } from "./data"

export type Slab = {
  group: Group
  /** what lifts on hover */
  visual: Group
  /** the pointer's target: a slightly larger box that does not lift (no hover flicker) */
  hit: Mesh
  channel: MeshBasicMaterial
  link?: SlabLink
  start: Vector3
  dock: Vector3
  yaw0: number
  yaw1: number
  tilt0: number
  lift: number
  docked: number
  flash: number
}

export type SlabLayer = {
  group: Group
  slabs: Slab[]
  update(progress: number, time: number, dt: number, hovered: Slab | undefined): void
  dispose(): void
}

const smooth = (x: number) => x * x * (3 - 2 * x)

export function createSlabs(a: Assets, links: SlabLink[], env: Texture | null): SlabLayer {
  const { data } = a
  const group = new Group()
  // geometry + its node matrix (quantized glTF dequantizes through the node transform)
  let slabSrc: Mesh | undefined
  let channelSrc: Mesh | undefined
  const source = a.gltf.scene.getObjectByName("Slab")
  source?.updateMatrixWorld(true)
  source?.traverse((o) => {
    const mesh = o as Mesh
    if (!mesh.isMesh) return
    if ((mesh.material as MeshStandardMaterial).name.split(".")[0] === "channel") channelSrc = mesh
    else slabSrc = mesh
  })
  const part = (src: Mesh | undefined, material: Material) => {
    const mesh = new Mesh(src?.geometry, material)
    if (src) mesh.applyMatrix4(src.matrixWorld)
    return mesh
  }
  const metal = new MeshStandardMaterial({
    color: new Color(0x0d0f13),
    metalness: 0.82,
    roughness: 0.3,
    envMap: env,
    envMapIntensity: 1.6,
  })
  const [sx, sy, sz] = data.slab.size
  const hitBox = new BoxGeometry(sx * 1.15, sz * 3.5, sy * 1.3)
  const hitMaterial = new MeshBasicMaterial({ visible: false })
  const bySlug = new Map(links.map((l) => [l.slug, l]))
  const slabs: Slab[] = data.slab.slugs.map((slug, i) => {
    const g = new Group()
    const visual = new Group()
    const channel = new MeshBasicMaterial({ color: new Color(SIGNAL) })
    visual.add(part(slabSrc, metal), part(channelSrc, channel))
    const hit = new Mesh(hitBox, hitMaterial)
    hit.userData.index = i
    g.add(visual, hit)
    group.add(g)
    const s = data.slab.starts[i]
    const d = data.slab.docks[i]
    return {
      group: g,
      visual,
      hit,
      channel,
      link: bySlug.get(slug),
      start: toThree(s),
      dock: toThree(d),
      yaw0: (s[3] * Math.PI) / 180,
      yaw1: (d[3] * Math.PI) / 180,
      tilt0: ((s[4] ?? 0) * Math.PI) / 180,
      lift: 0,
      docked: 0,
      flash: 0,
    }
  })

  const ctrl = new Vector3()
  const pos = new Vector3()
  const signal = new Color(SIGNAL)
  const n = slabs.length

  return {
    group,
    slabs,
    update(progress, time, dt, hovered) {
      slabs.forEach((s, i) => {
        // each slab's own window of the scroll: the four layers first (by the shrine), then terrace by terrace
        const begin = 0.04 + (i / n) * 0.66
        const u = smooth(Math.min(1, Math.max(0, (progress - begin) / 0.16)))
        if (u >= 1 && s.docked < 1) s.flash = 1
        s.docked = u
        s.flash = Math.max(0, s.flash - dt * 1.4)
        const target = hovered === s ? 1 : 0
        s.lift += (target - s.lift) * Math.min(1, dt * 8)

        // a rising arc: up from the plain, over, and down onto the terrace
        ctrl.copy(s.start).lerp(s.dock, 0.5)
        ctrl.y = Math.max(s.start.y, s.dock.y) + 22
        const k = 1 - u
        pos.copy(s.start).multiplyScalar(k * k).addScaledVector(ctrl, 2 * k * u).addScaledVector(s.dock, u * u)
        const bob = (1 - u) * Math.sin(time * 0.8 + i * 1.7) * 0.45
        pos.y += bob
        s.visual.position.y = s.lift * (u > 0.99 ? 1.2 : 2.0)
        s.group.position.copy(pos)
        s.group.rotation.set(-s.tilt0 * (1 - u) * (1 - s.lift * 0.4), s.yaw0 + (s.yaw1 - s.yaw0) * u, 0, "YXZ")

        // light: awake while hovering, a flash at the seat, steady once docked; hover brightens
        const level = 1.6 + 1.4 * u + 5 * s.flash + 3.2 * s.lift + 0.25 * Math.sin(time * 1.6 + i)
        s.channel.color.copy(signal).multiplyScalar(level)
      })
    },
    dispose() {
      metal.dispose()
      hitBox.dispose()
      hitMaterial.dispose()
      for (const s of slabs) s.channel.dispose()
    },
  }
}
