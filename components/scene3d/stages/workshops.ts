/**
 * ANU Workshops, the system's own scene: a real wardrobe (2400 × 2400 × 600 mm, 18 mm boards, cream lacquer doors,
 * a mirror door, black anodised handles, plywood carcass) in a carpentry shop. On scroll it comes apart into its
 * cut boards, each board's edge band lights Signal blue, then the boards fly down and lie nested on full sheets
 * (2800 × 2070 mm) on the CNC bed. Hover a board for its name and cut size; click a sheet for the real system.
 *
 * Every number comes from public/3d/workshops/workshops.json (anu-3d-lab/web/workshops.py: the board list and a
 * guillotine nesting). Materials: the Workshops asset lane's lacquer and anodised maps, CC0 plywood and concrete,
 * the CC0 carpentry_shop_01 HDRI for light and reflections.
 */
import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  Color,
  DirectionalLight,
  EquirectangularReflectionMapping,
  Float32BufferAttribute,
  Group,
  type Material,
  MathUtils,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  NoColorSpace,
  type Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  type Texture,
  TextureLoader,
  Vector3,
  type WebGLRenderer,
} from "three"
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js"

import { SIGNAL } from "../data"
import type { Stage, StageOptions } from "./stage"

const BASE = "/3d/workshops/"

type Board = {
  nameEn: string
  nameAr: string
  size: [number, number, number]
  centre: [number, number, number]
  axis: "x" | "y" | "z"
  material: "plywood" | "lacquer" | "hdf"
  role: string
  nest: { sheet: number; x: number; y: number; length: number; width: number }
}
type Fitting = { kind: "handle" | "mirror" | "rail"; size: number[]; centre: number[]; door?: number }
type Key = { at: number; pos: number[]; target: number[]; hfov: number }
type Data = {
  boards: Board[]
  fittings: Fitting[]
  sheet: { size: [number, number]; list: { material: string; yieldRatio: number }[] }
  bed: { bedTop: number; sheets: number[][]; gantryX: number; bedSize: [number, number]; bedCentre: number[] }
  camera: Key[]
  link: string
}

const mm = (v: number[]) => new Vector3(v[0] / 1000, v[1] / 1000, v[2] / 1000)
const ease = (x: number) => x * x * (3 - 2 * x)
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

/** canonical board: length a along x, thickness t along y, width b along z; assembled orientation per axis */
function assembledQuaternion(axis: Board["axis"]) {
  const m = new Matrix4()
  if (axis === "x") m.makeBasis(new Vector3(0, 1, 0), new Vector3(-1, 0, 0), new Vector3(0, 0, 1)) // side panels
  else if (axis === "z") m.makeBasis(new Vector3(0, 1, 0), new Vector3(0, 0, 1), new Vector3(1, 0, 0)) // doors, back
  return new Quaternion().setFromRotationMatrix(m)
}

/** texture repeats at real size: scale each face's UVs by its size over the material's repeat */
function sizeUVs(geo: BoxGeometry, a: number, t: number, b: number, repeat: number) {
  const uv = geo.attributes.uv
  // BoxGeometry face order: +x, -x, +y, -y, +z, -z (4 vertices each); per face: (u span, v span)
  const spans = [[b, t], [b, t], [a, b], [a, b], [a, t], [a, t]]
  for (let f = 0; f < 6; f++)
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k
      uv.setXY(i, (uv.getX(i) * spans[f][0]) / repeat, (uv.getY(i) * spans[f][1]) / repeat)
    }
  uv.needsUpdate = true
}

export async function loadWorkshops(renderer: WebGLRenderer, signal: AbortSignal) {
  const loader = new TextureLoader()
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  const tex = async (name: string, srgb: boolean) => {
    const t = await loader.loadAsync(BASE + name + ".webp")
    t.colorSpace = srgb ? SRGBColorSpace : NoColorSpace
    t.wrapS = t.wrapT = RepeatWrapping
    t.anisotropy = aniso
    return t
  }
  const [data, env, plyDiff, plyNor, plyRough, conDiff, conNor, conRough, lacAlb, lacNor, lacOrm, anoNor, anoOrm] =
    await Promise.all([
      fetch(BASE + "workshops.json", { signal }).then((r) => r.json() as Promise<Data>),
      new HDRLoader().loadAsync(BASE + "env.hdr"),
      tex("plywood-diff", true),
      tex("plywood-nor", false),
      tex("plywood-rough", false),
      tex("concrete-diff", true),
      tex("concrete-nor", false),
      tex("concrete-rough", false),
      tex("lacquer-albedo", true),
      tex("lacquer-normal", false),
      tex("lacquer-orm", false),
      tex("anodised-normal", false),
      tex("anodised-orm", false),
    ])
  env.mapping = EquirectangularReflectionMapping
  return { data, env, maps: { plyDiff, plyNor, plyRough, conDiff, conNor, conRough, lacAlb, lacNor, lacOrm, anoNor, anoOrm } }
}

type Loaded = Awaited<ReturnType<typeof loadWorkshops>>

export function createWorkshops(loaded: Loaded, renderer: WebGLRenderer, opts: StageOptions): Stage {
  const { data, env, maps } = loaded
  const scene = new Scene()
  scene.environment = env
  scene.background = env
  scene.backgroundBlurriness = 0.35
  scene.backgroundIntensity = 0.32
  scene.environmentIntensity = 0.85
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  const owned: { dispose(): void }[] = []
  const mat = <T extends Material>(m: T) => (owned.push(m), m)

  // ------------------------------------------------------------ materials (PBR, image-lit)
  const plywood = mat(new MeshStandardMaterial({ map: maps.plyDiff, normalMap: maps.plyNor, roughnessMap: maps.plyRough, roughness: 1 }))
  const lacquer = mat(
    new MeshStandardMaterial({ map: maps.lacAlb, normalMap: maps.lacNor, roughnessMap: maps.lacOrm, roughness: 1, color: new Color(0xf4ede1) })
  )
  const hdf = mat(new MeshStandardMaterial({ color: new Color(0x6b4a30), roughness: 0.8 }))
  const anodised = mat(
    new MeshStandardMaterial({ color: new Color(0x1c1c1e), metalness: 1, roughness: 1, roughnessMap: maps.anoOrm, normalMap: maps.anoNor })
  )
  const mirror = mat(new MeshStandardMaterial({ color: new Color(0xe8ecef), metalness: 1, roughness: 0 }))
  const chrome = mat(new MeshStandardMaterial({ color: new Color(0xdfe3e6), metalness: 1, roughness: 0.12 }))
  const steel = mat(new MeshStandardMaterial({ color: new Color(0x16181b), metalness: 0.8, roughness: 0.45 }))
  const faces = { plywood, lacquer, hdf }
  const repeat = { plywood: 1.2, lacquer: 0.3, hdf: 1 }

  // ------------------------------------------------------------ the wardrobe, board by board
  const group = new Group()
  scene.add(group)
  type Piece = {
    board: Board
    mesh: Mesh
    edge: MeshStandardMaterial
    a: Vector3
    qa: Quaternion
    e: Vector3
    n: Vector3
    qn: Quaternion
    lift: number
  }
  const centre = new Vector3(0, 1.2, 0)
  const pieces: Piece[] = data.boards.map((board, i) => {
    const [a, b, t] = board.size.map((v) => v / 1000)
    const geo = new BoxGeometry(a, t, b)
    owned.push(geo)
    sizeUVs(geo, a, t, b, repeat[board.material])
    // the edge band: lit Signal blue as the wardrobe comes apart
    const edge = mat(new MeshStandardMaterial({ color: new Color(0xd9d2c4), roughness: 0.5, emissive: new Color(SIGNAL), emissiveIntensity: 0 }))
    const face = faces[board.material]
    const mesh = new Mesh(geo, [edge, edge, face, face, edge, edge])
    mesh.castShadow = mesh.receiveShadow = true
    mesh.userData.piece = i
    group.add(mesh)
    const aPos = mm(board.centre)
    const qa = assembledQuaternion(board.axis)
    // exploded: out from the wardrobe's heart, along the board's own normal where that is clear
    const out = aPos.clone().sub(centre).multiply(new Vector3(1, 0.5, 1))
    if (board.role === "door") out.set(aPos.x * 0.6, 0, 1)
    if (board.role === "back") out.set(0, 0, -1)
    const e = aPos.clone().add(out.normalize().multiplyScalar(board.role === "door" ? 1.4 : 0.9))
    // nested: flat on its sheet, long side along the sheet's 2800 mm
    const sheet = data.bed.sheets[board.nest.sheet]
    const [sw, sd] = data.sheet.size
    const n = mm([
      sheet[0] - sw / 2 + board.nest.x + board.nest.length / 2,
      data.bed.bedTop + 18 + board.size[2] / 2,
      sheet[2] - sd / 2 + board.nest.y + board.nest.width / 2,
    ])
    const qn = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), a >= b ? 0 : Math.PI / 2)
    mesh.position.copy(aPos)
    mesh.quaternion.copy(qa)
    return { board, mesh, edge, a: aPos, qa, e, n, qn, lift: 0 }
  })

  // fittings ride on their door (handles, mirror) or leave the scene (rail)
  const doors = pieces.filter((p) => p.board.role === "door")
  const fittingMeshes: Mesh[] = []
  for (const f of data.fittings) {
    const [w, h, d] = f.size.map((v) => v / 1000)
    const geo = new BoxGeometry(w, h, d)
    owned.push(geo)
    const m = new Mesh(geo, f.kind === "handle" ? anodised : f.kind === "mirror" ? mirror : chrome)
    m.castShadow = true
    const world = mm(f.centre)
    if (f.door !== undefined) {
      const door = doors[f.door].mesh
      door.updateMatrixWorld()
      door.worldToLocal(world)
      m.position.copy(world)
      m.quaternion.copy(door.quaternion).invert()
      door.add(m)
    } else {
      m.position.copy(world)
      group.add(m)
    }
    fittingMeshes.push(m)
  }
  const rail = fittingMeshes[fittingMeshes.length - 1]

  // ------------------------------------------------------------ the shop: floor, CNC bed, sheets, gantry
  const floorGeo = new PlaneGeometry(40, 40).rotateX(-Math.PI / 2)
  owned.push(floorGeo)
  const fuv = floorGeo.attributes.uv
  for (let i = 0; i < fuv.count; i++) fuv.setXY(i, fuv.getX(i) * (40 / 1.6), fuv.getY(i) * (40 / 1.6))
  // the source concrete is warm; a shop floor reads cooler and greyer
  const floor = new Mesh(
    floorGeo,
    mat(new MeshStandardMaterial({ map: maps.conDiff, normalMap: maps.conNor, roughnessMap: maps.conRough, color: new Color(0.62, 0.63, 0.66) }))
  )
  floor.receiveShadow = true
  scene.add(floor)

  const bed = data.bed
  const top = bed.bedTop / 1000
  const [bx, bz] = bed.bedSize.map((v) => v / 1000)
  const bc = mm(bed.bedCentre)
  const add = (w: number, h: number, d: number, x: number, y: number, z: number, m: Material) => {
    const g = new BoxGeometry(w, h, d)
    owned.push(g)
    const mesh = new Mesh(g, m)
    mesh.position.set(x, y, z)
    mesh.castShadow = mesh.receiveShadow = true
    scene.add(mesh)
    return mesh
  }
  add(bx, 0.08, bz, bc.x, top - 0.04, bc.z, steel)
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(0.12, top - 0.08, 0.12, bc.x + sx * (bx / 2 - 0.1), (top - 0.08) / 2, bc.z + sz * (bz / 2 - 0.1), steel)
  const [sw, sd] = data.sheet.size.map((v) => v / 1000)
  const sheets = bed.sheets.map((c, k) => {
    const g = new BoxGeometry(sw, 0.018, sd)
    owned.push(g)
    sizeUVs(g, sw, 0.018, sd, 1.2)
    const s = new Mesh(g, plywood)
    s.position.set(c[0] / 1000, top + 0.009, c[2] / 1000)
    s.receiveShadow = true
    s.userData.sheet = k
    scene.add(s)
    return s
  })
  const gantry = new Group()
  const gx = bed.gantryX / 1000
  for (const z of [bc.z - bz / 2 - 0.12, bc.z + bz / 2 + 0.12]) {
    const post = new Mesh(new BoxGeometry(0.18, 1.1, 0.18), steel)
    owned.push(post.geometry)
    post.position.set(0, top + 0.55, z)
    gantry.add(post)
  }
  const beam = new Mesh(new BoxGeometry(0.22, 0.28, bz + 0.45), steel)
  owned.push(beam.geometry)
  beam.position.set(0, top + 1.15, bc.z)
  const spindle = new Mesh(new BoxGeometry(0.16, 0.5, 0.16), steel)
  owned.push(spindle.geometry)
  spindle.position.set(0, top + 0.82, bc.z)
  gantry.add(beam, spindle)
  gantry.position.x = gx
  gantry.traverse((o) => ((o as Mesh).castShadow = true))
  scene.add(gantry)

  // key light from the shop's windows (the HDRI's bright side), soft shadows
  const sun = new DirectionalLight(new Color(1, 0.96, 0.9), 2.2)
  sun.position.set(opts.rtl ? -6 : 6, 9, 5)
  sun.target.position.set(0, 0.8, -1.5)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 30 })
  sun.shadow.bias = -0.0004
  sun.shadow.radius = 4
  scene.add(sun, sun.target)

  // sawdust: drifting in the light, and a puff where boards land
  const N = opts.quality === "hi" ? 700 : 260
  const dust = new Float32Array(N * 3)
  let seed = 5
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  for (let i = 0; i < N; i++) dust.set([(rnd() - 0.5) * 14, rnd() * 3.2, -6 + rnd() * 8], i * 3)
  const dustGeo = new BufferGeometry()
  dustGeo.setAttribute("position", new Float32BufferAttribute(dust, 3))
  owned.push(dustGeo)
  const dustMat = mat(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPx: { value: 1 }, uStir: { value: 0 } },
      vertexShader: /* glsl */ `
        uniform float uTime, uPx, uStir;
        varying float vA;
        void main() {
          vec3 p = position;
          float s = fract(sin(dot(position.xz, vec2(12.9898, 78.233))) * 43758.5453);
          p.y = mod(p.y - uTime * (0.03 + 0.05 * s), 3.2);
          p.x += sin(uTime * 0.3 + s * 20.0) * 0.25;
          p.z += cos(uTime * 0.23 + s * 11.0) * 0.25;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(uPx * 0.012 / -mv.z, 1.0, 5.0);
          vA = (0.35 + 0.65 * s) * (0.5 + uStir);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          gl_FragColor = vec4(vec3(1.0, 0.92, 0.78) * 0.18 * vA * smoothstep(1.0, 0.0, r), 1.0);
        }`,
    })
  )
  const motes = new Points(dustGeo, dustMat)
  motes.frustumCulled = false
  scene.add(motes)

  // ------------------------------------------------------------ camera: scroll keys, slow drift, parallax
  const camera = new PerspectiveCamera(40, 16 / 10, 0.05, 200)
  const mirrorX = (v: number[]) => (opts.rtl ? [-v[0], v[1], v[2]] : v)
  const keys = data.camera.map((k) => ({ at: k.at, pos: mm(mirrorX(k.pos)), target: mm(mirrorX(k.target)), hfov: k.hfov }))
  const pos = new Vector3()
  const aim = new Vector3()
  let aspect = 16 / 10
  let hovered: Piece | undefined
  const tmp = new Vector3()
  const ctrl = new Vector3()
  const q = new Quaternion()

  const locale = opts.locale
  const label = (p: Piece) => {
    const [a, b, t] = p.board.size
    const size = `${a} × ${b} × ${t} mm`
    return locale === "ar" ? `${p.board.nameAr} · ${size}` : `${p.board.nameEn} · ${size}`
  }
  const sheetLabel = locale === "ar" ? "لوح كامل 2800 × 2070 · افتح النظام الحقيقي" : "Full sheet 2800 × 2070 · see the real system"

  return {
    scene,
    camera,
    // the shared exposure is set for a moonlit night; a lit shop needs far less
    exposure: 0.4,
    targets: [...pieces.map((p) => p.mesh), ...sheets],
    resize(w, h) {
      aspect = w / Math.max(1, h)
      camera.aspect = aspect
    },
    describe(o: Object3D) {
      if (o.userData.piece !== undefined) {
        hovered = pieces[o.userData.piece as number]
        return { label: label(hovered), anchor: hovered.mesh.position }
      }
      if (o.userData.sheet !== undefined) {
        hovered = undefined
        return { label: sheetLabel, anchor: o.position, href: data.link }
      }
      hovered = undefined
      return undefined
    },
    update(progress, time, dt, pointer, pxPerMetre) {
      if (!pointer.inside) hovered = undefined
      // camera along the keys
      let i = 0
      while (i < keys.length - 2 && progress > keys[i + 1].at) i++
      const k0 = keys[i]
      const k1 = keys[i + 1]
      const u = ease(clamp01((progress - k0.at) / (k1.at - k0.at)))
      pos.copy(k0.pos).lerp(k1.pos, u)
      aim.copy(k0.target).lerp(k1.target, u)
      const yaw = Math.sin(time * 0.05) * 0.04 + pointer.x * 0.05
      pos.sub(aim).applyAxisAngle(new Vector3(0, 1, 0), yaw).add(aim)
      pos.y += -pointer.y * 0.12
      camera.position.copy(pos)
      camera.lookAt(aim)
      const hfov = MathUtils.lerp(k0.hfov, k1.hfov, u)
      camera.fov = MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(hfov / 2)) / aspect))
      camera.updateProjectionMatrix()

      // the boards: apart (0.08 -> 0.38), then down onto their sheets (0.42 -> 0.9), one after another
      const e = ease(clamp01((progress - 0.08) / 0.3))
      pieces.forEach((p, n) => {
        const f = ease(clamp01((progress - 0.42 - n * 0.014) / 0.28))
        if (f <= 0) {
          p.mesh.position.copy(p.a).lerp(p.e, e)
          p.mesh.quaternion.copy(p.qa)
        } else {
          ctrl.copy(p.e).lerp(p.n, 0.5)
          ctrl.y = Math.max(p.e.y, p.n.y) + 1.6
          const k = 1 - f
          p.mesh.position.copy(p.e).multiplyScalar(k * k).addScaledVector(ctrl, 2 * k * f).addScaledVector(p.n, f * f)
          p.mesh.quaternion.copy(q.copy(p.qa).slerp(p.qn, f))
        }
        const target = hovered === p ? 1 : 0
        p.lift += (target - p.lift) * Math.min(1, dt * 8)
        p.mesh.position.y += p.lift * 0.04
        p.edge.emissiveIntensity = 7 * e * (1 - 0.5 * f) + 6 * p.lift
      })
      rail.visible = e < 0.5
      // the gantry runs once everything lies on the bed
      const run = clamp01((progress - 0.88) / 0.12)
      gantry.position.x = MathUtils.lerp(bed.gantryX / 1000, bed.gantryX / 1000 + sw * 0.8, (Math.sin(time * 0.4) * 0.5 + 0.5) * run)
      dustMat.uniforms.uTime.value = time
      dustMat.uniforms.uPx.value = pxPerMetre
      dustMat.uniforms.uStir.value = e * (1 - run) + run
      tmp.set(0, 0, 0)
    },
    pxPerMetre(height) {
      return height / (2 * Math.tan(MathUtils.degToRad(camera.fov / 2)))
    },
    dispose() {
      for (const o of owned) o.dispose()
      env.dispose()
      for (const t of Object.values(maps)) (t as Texture).dispose()
      renderer.shadowMap.enabled = false
    },
  }
}
