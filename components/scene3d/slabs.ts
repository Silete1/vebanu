/**
 * ANU's systems as machined slabs: dark anodised metal (fine tool scratches catch the moon) with an inset
 * Signal-blue light channel. At the top of the page each waits just off its seat on the terraces, its lit face
 * leaning to the reader; as the page scrolls they slide in and dock one by one: the channel flashes and a puff
 * of dust blows out from under it. Hover lifts a slab and names it; a click is a soft navigation to its story
 * (the same links exist in the page's DOM for keyboards and readers).
 */
import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Points,
  ShaderMaterial,
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
  update(progress: number, time: number, dt: number, hovered: Slab | undefined, px: number): void
  dispose(): void
}

const smooth = (x: number) => x * x * (3 - 2 * x)

export function createSlabs(a: Assets, links: SlabLink[], env: Texture | null, rtl: boolean): SlabLayer {
  const { data } = a
  const group = new Group()
  // geometry + its node matrix (quantized glTF dequantizes through the node transform)
  let slabSrc: Mesh | undefined
  let channelSrc: Mesh | undefined
  const source = a.movers.scene.getObjectByName("Slab")
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
  // machined finish: fine scratches along the slab (object space, no texture to load) change the roughness
  metal.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vObj;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvObj = position;")
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vObj;")
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
        float lane = floor(vObj.z * 140.0 + sin(vObj.x * 0.9) * 4.0);
        float scratch = step(0.93, fract(sin(lane * 12.9898) * 43758.5453)) * step(0.4, fract(sin(floor(vObj.x * 3.0) + lane) * 7.31));
        roughnessFactor = mix(roughnessFactor, 0.12, scratch * 0.7);`
      )
  }
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
    // Arabic mirrors the camera, so the slabs dock on the mirrored faces (the ziggurat is symmetric)
    const flip = (v: number[]) => (rtl ? [-v[0], v[1], v[2], -v[3], ...v.slice(4)] : v)
    const s = flip(data.slab.starts[i])
    const d = flip(data.slab.docks[i])
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

  // dust: 28 grains per slab, blown out from under it when it seats (spawn time per grain, -1 = idle)
  const GRAINS = 28
  const dustPos = new Float32Array(slabs.length * GRAINS * 3)
  const dustDir = new Float32Array(slabs.length * GRAINS * 3)
  const dustT0 = new Float32Array(slabs.length * GRAINS).fill(-1)
  let seed = 11
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  slabs.forEach((s, i) => {
    for (let k = 0; k < GRAINS; k++) {
      const j = i * GRAINS + k
      const a = rnd() * Math.PI * 2
      dustPos.set([s.dock.x + Math.cos(a) * sx * 0.45, s.dock.y - sz / 2, s.dock.z + Math.sin(a) * sy * 0.45], j * 3)
      dustDir.set([Math.cos(a) * (2 + rnd() * 3), 0.6 + rnd() * 1.6, Math.sin(a) * (2 + rnd() * 3)], j * 3)
    }
  })
  const dustGeo = new BufferGeometry()
  dustGeo.setAttribute("position", new Float32BufferAttribute(dustPos, 3))
  dustGeo.setAttribute("aDir", new Float32BufferAttribute(dustDir, 3))
  const t0 = new Float32BufferAttribute(dustT0, 1)
  dustGeo.setAttribute("aT0", t0)
  const dustMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPx: { value: 1 } },
    vertexShader: /* glsl */ `
      uniform float uTime, uPx;
      attribute vec3 aDir;
      attribute float aT0;
      varying float vA;
      void main() {
        float age = aT0 < 0.0 ? 99.0 : uTime - aT0;
        vec3 p = position + aDir * (1.0 - exp(-age * 1.6)) * 2.2 + vec3(0.0, -0.5 * age * age * 0.6, 0.0);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        vA = age < 2.2 ? (1.0 - age / 2.2) : 0.0;
        gl_PointSize = clamp(uPx * (0.35 + age * 0.5) / -mv.z, 1.0, 14.0);
      }`,
    fragmentShader: /* glsl */ `
      varying float vA;
      void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        gl_FragColor = vec4(vec3(0.62, 0.55, 0.46) * 0.5 * vA * smoothstep(1.0, 0.0, r), 1.0);
      }`,
  })
  const dust = new Points(dustGeo, dustMat)
  dust.frustumCulled = false
  group.add(dust)

  const ctrl = new Vector3()
  const pos = new Vector3()
  const signal = new Color(SIGNAL)
  const n = slabs.length

  return {
    group,
    slabs,
    update(progress, time, dt, hovered, px) {
      dustMat.uniforms.uTime.value = time
      dustMat.uniforms.uPx.value = px
      slabs.forEach((s, i) => {
        // each slab's own window of the scroll: the four layers first (by the shrine), then terrace by terrace
        const begin = 0.04 + (i / n) * 0.66
        const u = smooth(Math.min(1, Math.max(0, (progress - begin) / 0.16)))
        if (u >= 1 && s.docked < 1) {
          s.flash = 1
          for (let k = 0; k < GRAINS; k++) dustT0[i * GRAINS + k] = time + k * 0.004
          t0.needsUpdate = true
        }
        s.docked = u
        s.flash = Math.max(0, s.flash - dt * 1.4)
        const target = hovered === s ? 1 : 0
        s.lift += (target - s.lift) * Math.min(1, dt * 8)

        // a short glide from its waiting place onto the seat
        ctrl.copy(s.start).lerp(s.dock, 0.5)
        ctrl.y = Math.max(s.start.y, s.dock.y) + 1.5
        const k = 1 - u
        pos.copy(s.start).multiplyScalar(k * k).addScaledVector(ctrl, 2 * k * u).addScaledVector(s.dock, u * u)
        const bob = (1 - u) * Math.sin(time * 0.8 + i * 1.7) * 0.45
        pos.y += bob
        s.visual.position.y = s.lift * (u > 0.99 ? 1.2 : 2.0)
        s.group.position.copy(pos)
        s.group.rotation.set(-s.tilt0 * (1 - u) * (1 - s.lift * 0.4), s.yaw0 + (s.yaw1 - s.yaw0) * u, 0, "YXZ")

        // light: awake while hovering, a flash at the seat, steady once docked; hover brightens
        const level = 2.4 + 1.2 * u + 7 * s.flash * s.flash + 3.2 * s.lift + 0.3 * Math.sin(time * 1.6 + i)
        s.channel.color.copy(signal).multiplyScalar(level)
      })
    },
    dispose() {
      metal.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      hitBox.dispose()
      hitMaterial.dispose()
      for (const s of slabs) s.channel.dispose()
    },
  }
}
