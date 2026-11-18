/**
 * ANU Workshops, the system's own scene: a real wardrobe (2400 × 2400 × 600 mm, 18 mm boards, cream lacquer doors,
 * a mirror door, black anodised handles, white melamine carcass) in a woodworking shop. On scroll it comes apart into
 * its cut boards, each board's edge band lights Signal blue, then the boards fly down and lie nested on full sheets
 * (2800 × 2070 mm, kerf lines drawn) on the CNC bed, and the gantry cuts the first sheet, leaving sawdust along its
 * path. Hover a board for its name and cut size; click a sheet for the real system.
 *
 * Like the ziggurat: the shop is baked in Blender Cycles (anu-3d-lab/web/build_workshops.py: window daylight + LED
 * strips) and drawn unlit; the moving parts are live PBR, lit by a cube reflection probe captured from that baked
 * room and a window key light whose shadow falls on a catcher over the baked floor. Every number comes from
 * public/3d/workshops/workshops.json (anu-3d-lab/web/workshops.py).
 */
import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  Color,
  CubeCamera,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  HalfFloatType,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NoColorSpace,
  type Object3D,
  PCFSoftShadowMap,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  ShadowMaterial,
  type Texture,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLCubeRenderTarget,
  type WebGLRenderer,
} from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

import { bakedMaterial } from "../baked"
import { type Quality, SIGNAL } from "../data"
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
  sheet: { size: [number, number]; kerf: number; list: { material: Board["material"]; yieldRatio: number }[] }
  bed: { bedTop: number; sheets: number[][]; bedSize: [number, number]; bedCentre: number[] }
  camera: Key[]
  link: string
  room: { scale: number }
  shop: {
    room: { x: number; y: number; h: number; window_sill: number; window_top: number; bay: number; window_w: number }
    sun: { elevation_deg: number; azimuth_deg: number }
  }
}

const mm = (v: number[]) => new Vector3(v[0] / 1000, v[1] / 1000, v[2] / 1000)
const ease = (x: number) => x * x * (3 - 2 * x)
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
/** board finishes as the eye reads them (the carcass is white melamine on a plywood/MDF core) */
const FINISH = { plywood: 0xe8e5de, lacquer: 0xf1e9dc, hdf: 0x6b4a30 } as const

/** canonical board: length a along x, thickness t along y, width b along z; assembled orientation per axis */
function assembledQuaternion(axis: Board["axis"]) {
  const m = new Matrix4()
  if (axis === "x") m.makeBasis(new Vector3(0, 1, 0), new Vector3(-1, 0, 0), new Vector3(0, 0, 1)) // sides, dividers
  else if (axis === "z") m.makeBasis(new Vector3(0, 1, 0), new Vector3(0, 0, 1), new Vector3(1, 0, 0)) // doors, back, plinth
  return new Quaternion().setFromRotationMatrix(m)
}

/** texture repeats at real size: scale each face's UVs by its size over the material's repeat */
function sizeUVs(geo: BoxGeometry, a: number, t: number, b: number, repeat: number) {
  const uv = geo.attributes.uv
  const spans = [[b, t], [b, t], [a, b], [a, b], [a, t], [a, t]] // +x, -x, +y, -y, +z, -z
  for (let f = 0; f < 6; f++)
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k
      uv.setXY(i, (uv.getX(i) * spans[f][0]) / repeat, (uv.getY(i) * spans[f][1]) / repeat)
    }
  uv.needsUpdate = true
}

/** a full sheet in its board colour with the nest's kerf lines drawn on it (the parts lie on top) */
function sheetTexture(data: Data, k: number) {
  const [sw, sd] = data.sheet.size
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = Math.round((1024 * sd) / sw)
  const g = canvas.getContext("2d")!
  const s = canvas.width / sw
  g.fillStyle = `#${FINISH[data.sheet.list[k].material].toString(16).padStart(6, "0")}`
  g.fillRect(0, 0, canvas.width, canvas.height)
  g.strokeStyle = "rgba(30, 24, 18, 0.85)"
  g.lineWidth = Math.max(1.5, data.sheet.kerf * s)
  for (const b of data.boards)
    if (b.nest.sheet === k) g.strokeRect(b.nest.x * s, b.nest.y * s, b.nest.length * s, b.nest.width * s)
  const t = new CanvasTexture(canvas)
  t.colorSpace = SRGBColorSpace
  t.anisotropy = 8
  return t
}

export async function loadWorkshops(renderer: WebGLRenderer, signal: AbortSignal, q: Quality) {
  const loader = new TextureLoader()
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  const tex = async (name: string, srgb: boolean, repeat = true) => {
    const t = await loader.loadAsync(BASE + name)
    t.colorSpace = srgb ? SRGBColorSpace : NoColorSpace
    if (repeat) t.wrapS = t.wrapT = RepeatWrapping
    t.anisotropy = aniso
    return t
  }
  const [data, room, bake, lacAlb, lacNor, lacOrm, anoNor, anoOrm] = await Promise.all([
    fetch(BASE + "workshops.json", { signal }).then((r) => r.json() as Promise<Data>),
    new GLTFLoader().loadAsync(BASE + "room.glb"),
    tex(`room-${q}.avif`, true, false),
    tex("lacquer-albedo.webp", true),
    tex("lacquer-normal.webp", false),
    tex("lacquer-orm.webp", false),
    tex("anodised-normal.webp", false),
    tex("anodised-orm.webp", false),
  ])
  bake.flipY = false // read through glTF UVs
  bake.needsUpdate = true
  return { data, room, bake, maps: { lacAlb, lacNor, lacOrm, anoNor, anoOrm } }
}

type Loaded = Awaited<ReturnType<typeof loadWorkshops>>

export function createWorkshops(loaded: Loaded, renderer: WebGLRenderer, opts: StageOptions): Stage {
  const { data, maps } = loaded
  const scene = new Scene()
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  const owned: { dispose(): void }[] = []
  const own = <T extends { dispose(): void }>(x: T) => (owned.push(x), x)

  // ------------------------------------------------------------ the baked shop (unlit) and its lights (emissive)
  const roomScene = new Scene()
  loaded.room.scene.updateMatrixWorld(true)
  const roomMat = own(bakedMaterial(loaded.bake, data.room.scale))
  const glowMat = own(new MeshBasicMaterial({ color: new Color(0.86, 0.93, 1.0).multiplyScalar(1.6) }))
  const meshes: Mesh[] = []
  for (const node of loaded.room.scene.children.slice())
    node.traverse((o) => {
      const mesh = o as Mesh
      if (!mesh.isMesh) return
      mesh.material = node.name === "Glow" ? glowMat : roomMat
      meshes.push(mesh)
    })
  for (const mesh of meshes) roomScene.attach(mesh)

  // a cube reflection probe of the baked room (1024), prefiltered: lacquer, mirror and steel reflect the real shop
  const cubeRT = own(new WebGLCubeRenderTarget(1024, { type: HalfFloatType }))
  const cubeCam = new CubeCamera(0.05, 60, cubeRT)
  cubeCam.position.set(0, 1.3, 1.6)
  cubeCam.update(renderer, roomScene)
  const pmrem = new PMREMGenerator(renderer)
  const envRT = own(pmrem.fromCubemap(cubeRT.texture))
  pmrem.dispose()
  scene.environment = envRT.texture
  for (const mesh of meshes) scene.attach(mesh)

  // key light through the high windows; its shadow lands on a catcher over the baked floor
  const sunEl = MathUtils.degToRad(90 - data.shop.sun.elevation_deg)
  const sunAz = MathUtils.degToRad(data.shop.sun.azimuth_deg)
  // Blender's sun (towards-light = (sin az sin t, -cos az sin t, cos t)) in three's Y-up frame (x, z, -y)
  const toSun = new Vector3(Math.sin(sunAz) * Math.sin(sunEl), Math.cos(sunEl), Math.cos(sunAz) * Math.sin(sunEl)).normalize()
  const sun = new DirectionalLight(new Color(1, 0.95, 0.86), 1.6)
  sun.position.copy(toSun).multiplyScalar(20)
  sun.target.position.set(0, 0, -1)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 50 })
  sun.shadow.bias = -0.0005
  sun.shadow.radius = 5
  scene.add(sun, sun.target)
  const catcher = new Mesh(own(new PlaneGeometry(36, 24).rotateX(-Math.PI / 2)), own(new ShadowMaterial({ opacity: 0.38 })))
  catcher.position.y = 0.002
  catcher.receiveShadow = true
  scene.add(catcher)

  // ------------------------------------------------------------ materials (PBR, lit by the probe)
  const melamine = own(
    new MeshStandardMaterial({ color: new Color(FINISH.plywood), roughness: 0.42, normalMap: maps.lacNor, normalScale: new Vector2(0.4, 0.4) })
  )
  const lacquer = own(
    new MeshStandardMaterial({ map: maps.lacAlb, normalMap: maps.lacNor, roughnessMap: maps.lacOrm, roughness: 1, color: new Color(FINISH.lacquer) })
  )
  const hdf = own(new MeshStandardMaterial({ color: new Color(FINISH.hdf), roughness: 0.8 }))
  const anodised = own(
    new MeshStandardMaterial({ color: new Color(0x1c1c1e), metalness: 1, roughness: 1, roughnessMap: maps.anoOrm, normalMap: maps.anoNor })
  )
  const mirror = own(new MeshStandardMaterial({ color: new Color(0xe9edf0), metalness: 1, roughness: 0 }))
  const chrome = own(new MeshStandardMaterial({ color: new Color(0xdfe3e6), metalness: 1, roughness: 0.12 }))
  const steel = own(new MeshStandardMaterial({ color: new Color(0x16181b), metalness: 0.8, roughness: 0.4 }))
  const faces = { plywood: melamine, lacquer, hdf }
  const repeat = { plywood: 1.2, lacquer: 0.3, hdf: 1 }

  // ------------------------------------------------------------ the wardrobe, board by board
  const group = new Group()
  scene.add(group)
  type Piece = { board: Board; mesh: Mesh; edge: MeshStandardMaterial; a: Vector3; qa: Quaternion; e: Vector3; n: Vector3; qn: Quaternion; lift: number }
  const heart = new Vector3(0, 1.2, 0)
  const pieces: Piece[] = data.boards.map((board, i) => {
    const [a, b, t] = board.size.map((v) => v / 1000)
    const geo = own(new BoxGeometry(a, t, b))
    sizeUVs(geo, a, t, b, repeat[board.material])
    // the edge band (ABS in the board's colour): it lights Signal blue as the wardrobe comes apart
    const edge = own(
      new MeshStandardMaterial({ color: new Color(FINISH[board.material]).multiplyScalar(0.93), roughness: 0.35, emissive: new Color(SIGNAL), emissiveIntensity: 0 })
    )
    const face = faces[board.material]
    const mesh = new Mesh(geo, [edge, edge, face, face, edge, edge])
    mesh.castShadow = mesh.receiveShadow = true
    mesh.userData.piece = i
    group.add(mesh)
    const aPos = mm(board.centre)
    const qa = assembledQuaternion(board.axis)
    const out = aPos.clone().sub(heart).multiply(new Vector3(1, 0.5, 1))
    if (board.role === "door") out.set(aPos.x * 0.6, 0, 1)
    if (board.role === "back") out.set(0, 0, -1)
    if (board.role === "plinth") out.set(0, -0.2, 1)
    const e = aPos.clone().add(out.normalize().multiplyScalar(board.role === "door" ? 1.4 : 0.9))
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

  // fittings ride on their door: a handle is a bar on two stand-offs (the real profile); the mirror pane; the rail
  const doors = pieces.filter((p) => p.board.role === "door")
  let rail: Object3D | undefined
  for (const f of data.fittings) {
    const [w, h, d] = f.size.map((v) => v / 1000)
    const part = new Group()
    if (f.kind === "handle") {
      const bar = new Mesh(own(new BoxGeometry(0.014, h, 0.016)), anodised)
      bar.position.z = 0.012
      part.add(bar)
      for (const y of [-h / 2 + 0.04, h / 2 - 0.04]) {
        const foot = new Mesh(own(new BoxGeometry(0.012, 0.012, 0.024)), anodised)
        foot.position.set(0, y, -0.002)
        part.add(foot)
      }
    } else part.add(new Mesh(own(new BoxGeometry(w, h, d)), f.kind === "mirror" ? mirror : chrome))
    part.traverse((o) => ((o as Mesh).castShadow = true))
    const world = mm(f.centre)
    if (f.door !== undefined) {
      const door = doors[f.door].mesh
      door.updateMatrixWorld()
      door.worldToLocal(world)
      part.position.copy(world)
      part.quaternion.copy(door.quaternion).invert()
      door.add(part)
    } else {
      part.position.copy(world)
      group.add(part)
      rail = part
    }
  }

  // ------------------------------------------------------------ the nest: full sheets on the bed, kerf lines drawn
  const bed = data.bed
  const top = bed.bedTop / 1000
  const [sw, sd] = data.sheet.size.map((v) => v / 1000)
  const sheets = bed.sheets.map((c, k) => {
    const map = own(sheetTexture(data, k))
    const s = new Mesh(own(new BoxGeometry(sw, 0.018, sd)), own(new MeshStandardMaterial({ map, roughness: 0.5 })))
    s.position.set(c[0] / 1000, top + 0.009, c[2] / 1000)
    s.receiveShadow = s.castShadow = true
    s.userData.sheet = k
    scene.add(s)
    return s
  })

  // the CNC gantry spans the bed and follows a cut path round the first sheet's parts; a spindle glow at the tool
  const bz = bed.bedSize[1] / 1000
  const bc = mm(bed.bedCentre)
  const gantry = new Group()
  for (const z of [bc.z - bz / 2 - 0.15, bc.z + bz / 2 + 0.15]) {
    const post = new Mesh(own(new BoxGeometry(0.2, 1.15, 0.22)), steel)
    post.position.set(0, top + 0.5, z)
    gantry.add(post)
  }
  const beam = new Mesh(own(new BoxGeometry(0.24, 0.3, bz + 0.5)), steel)
  beam.position.set(0, top + 1.15, bc.z)
  gantry.add(beam)
  const head = new Group()
  head.position.z = bc.z
  const spindle = new Mesh(own(new BoxGeometry(0.2, 0.55, 0.22)), steel)
  spindle.position.y = top + 0.75
  const tool = new Mesh(own(new BoxGeometry(0.02, 0.06, 0.02)), chrome)
  tool.position.y = top + 0.45
  head.add(spindle, tool)
  gantry.add(head)
  gantry.traverse((o) => ((o as Mesh).castShadow = true))
  scene.add(gantry)
  const spark = new PointLight(new Color(0.55, 0.75, 1), 0, 1.6)
  spark.position.y = top + 0.06
  head.add(spark)
  const glowSpot = new Mesh(
    own(new PlaneGeometry(0.16, 0.16)),
    own(new MeshBasicMaterial({ color: new Color(SIGNAL).multiplyScalar(3), transparent: true, opacity: 0, depthWrite: false, blending: AdditiveBlending, side: DoubleSide }))
  )
  glowSpot.rotation.x = -Math.PI / 2
  glowSpot.position.y = top + 0.03
  head.add(glowSpot)
  // the cut path: around each part on sheet 0, as the nest drew it (metres, world)
  const s0 = bed.sheets[0]
  const path: Vector3[] = []
  for (const b of data.boards.filter((b) => b.nest.sheet === 0)) {
    const x0 = (s0[0] - data.sheet.size[0] / 2 + b.nest.x) / 1000
    const z0 = (s0[2] - data.sheet.size[1] / 2 + b.nest.y) / 1000
    const L = b.nest.length / 1000
    const W = b.nest.width / 1000
    path.push(new Vector3(x0, 0, z0), new Vector3(x0 + L, 0, z0), new Vector3(x0 + L, 0, z0 + W), new Vector3(x0, 0, z0 + W), new Vector3(x0, 0, z0))
  }
  const lengths = path.slice(1).map((p, i) => p.distanceTo(path[i]))
  const total = lengths.reduce((s, l) => s + l, 0)
  const along = (d: number, out: Vector3) => {
    let r = Math.min(Math.max(d, 0), total)
    for (let i = 0; i < lengths.length; i++) {
      if (r <= lengths[i]) return out.copy(path[i]).lerp(path[i + 1], lengths[i] ? r / lengths[i] : 0)
      r -= lengths[i]
    }
    return out.copy(path[path.length - 1])
  }
  // sawdust settles along the cut behind the tool (seeded, so every visit looks the same)
  const DUST = opts.quality === "hi" ? 1800 : 700
  const cut = new Float32Array(DUST * 3)
  const cutAt = new Float32Array(DUST)
  const v = new Vector3()
  let seed = 9
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  for (let i = 0; i < DUST; i++) {
    const d = (i / DUST) * total
    along(d, v)
    cut.set([v.x + (rnd() - 0.5) * 0.03, top + 0.0185 + rnd() * 0.004, v.z + (rnd() - 0.5) * 0.03], i * 3)
    cutAt[i] = d
  }
  const cutGeo = own(new BufferGeometry())
  cutGeo.setAttribute("position", new Float32BufferAttribute(cut, 3))
  cutGeo.setAttribute("aAt", new Float32BufferAttribute(cutAt, 1))
  const cutMat = own(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uDone: { value: 0 }, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        uniform float uDone, uPx;
        attribute float aAt;
        varying float vA;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          vA = step(aAt, uDone);
          gl_PointSize = clamp(uPx * 0.012 / -mv.z, 1.0, 4.0) * vA;
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0 || vA < 0.5) discard;
          gl_FragColor = vec4(0.86, 0.80, 0.70, 0.9);
        }`,
    })
  )
  const cutDust = new Points(cutGeo, cutMat)
  cutDust.frustumCulled = false
  scene.add(cutDust)

  // light shafts from the high windows, with dust drifting in them
  const rm = data.shop.room
  const travel = toSun.clone().negate()
  const shafts = new Group()
  const shaftMat = own(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
      blending: AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
          float fall = smoothstep(0.0, 0.85, vUv.y) * smoothstep(1.0, 0.92, vUv.y);
          float flick = 0.9 + 0.1 * sin(uTime * 0.3 + vUv.x * 6.0);
          gl_FragColor = vec4(vec3(1.0, 0.95, 0.85) * 0.04 * edge * fall * flick, 1.0);
        }`,
    })
  )
  const windowY = (rm.window_sill + rm.window_top) / 2
  const reach = windowY / Math.max(0.2, -travel.y)
  const bays = Math.round((2 * rm.x) / rm.bay)
  for (let k = 0; k < bays; k++) {
    const x = -rm.x + rm.bay / 2 + k * rm.bay
    for (const turn of [0, Math.PI / 2]) {
      const m = new Mesh(own(new PlaneGeometry(rm.window_w, reach).translate(0, -reach / 2, 0)), shaftMat)
      m.position.set(x, windowY, -rm.y + 0.3)
      m.quaternion.setFromUnitVectors(new Vector3(0, -1, 0), travel)
      m.rotateY(turn)
      shafts.add(m)
    }
  }
  scene.add(shafts)
  const N = opts.quality === "hi" ? 900 : 300
  const motes = new Float32Array(N * 3)
  const p = new Vector3()
  for (let i = 0; i < N; i++) {
    const k = Math.floor(rnd() * bays)
    p.set(-rm.x + rm.bay / 2 + k * rm.bay + (rnd() - 0.5) * rm.window_w, windowY, -rm.y + 0.3).addScaledVector(travel, rnd() * reach)
    motes.set([p.x, p.y + (rnd() - 0.5) * 0.8, p.z], i * 3)
  }
  const moteGeo = own(new BufferGeometry())
  moteGeo.setAttribute("position", new Float32BufferAttribute(motes, 3))
  const moteMat = own(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        uniform float uTime, uPx;
        varying float vA;
        void main() {
          vec3 p = position;
          float s = fract(sin(dot(position.xz, vec2(12.9898, 78.233))) * 43758.5453);
          p += vec3(sin(uTime * 0.2 + s * 30.0), sin(uTime * 0.13 + s * 9.0), cos(uTime * 0.17 + s * 20.0)) * 0.3;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(uPx * 0.01 / -mv.z, 1.0, 3.5);
          vA = 0.4 + 0.6 * s;
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          gl_FragColor = vec4(vec3(1.0, 0.95, 0.85) * 0.25 * vA * smoothstep(1.0, 0.0, r), 1.0);
        }`,
    })
  )
  const moteCloud = new Points(moteGeo, moteMat)
  moteCloud.frustumCulled = false
  scene.add(moteCloud)

  // ------------------------------------------------------------ camera: scroll keys, slow drift, parallax
  const camera = new PerspectiveCamera(40, 16 / 10, 0.05, 120)
  const mirrorX = (v: number[]) => (opts.rtl ? [-v[0], v[1], v[2]] : v)
  const keys = data.camera.map((k) => ({ at: k.at, pos: mm(mirrorX(k.pos)), target: mm(mirrorX(k.target)), hfov: k.hfov }))
  const pos = new Vector3()
  const aim = new Vector3()
  let aspect = 16 / 10
  let hovered: Piece | undefined
  const ctrl = new Vector3()
  const q = new Quaternion()
  const tip = new Vector3()

  const label = (pc: Piece) => {
    const [a, b, t] = pc.board.size
    const size = `${a} × ${b} × ${t} mm`
    return opts.locale === "ar" ? `${pc.board.nameAr} · ${size}` : `${pc.board.nameEn} · ${size}`
  }
  const sheetLabel = opts.locale === "ar" ? "لوح كامل 2800 × 2070 · افتح النظام الحقيقي" : "Full sheet 2800 × 2070 · see the real system"

  return {
    scene,
    camera,
    // a lit shop next to the moonlit ziggurat: far less exposure (the bake holds real daylight levels)
    exposure: 0.42,
    targets: [...pieces.map((pc) => pc.mesh), ...sheets],
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
      let i = 0
      while (i < keys.length - 2 && progress > keys[i + 1].at) i++
      const k0 = keys[i]
      const k1 = keys[i + 1]
      const u = ease(clamp01((progress - k0.at) / (k1.at - k0.at)))
      pos.copy(k0.pos).lerp(k1.pos, u)
      aim.copy(k0.target).lerp(k1.target, u)
      const yaw = Math.sin(time * 0.05) * 0.035 + pointer.x * 0.045
      pos.sub(aim).applyAxisAngle(new Vector3(0, 1, 0), yaw).add(aim)
      pos.y += -pointer.y * 0.1
      camera.position.copy(pos)
      camera.lookAt(aim)
      const hfov = MathUtils.lerp(k0.hfov, k1.hfov, u)
      camera.fov = MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(hfov / 2)) / aspect))
      camera.updateProjectionMatrix()

      // apart (0.06 -> 0.34), then down onto the sheets (0.4 -> 0.82), one board after another
      const e = ease(clamp01((progress - 0.06) / 0.28))
      pieces.forEach((pc, n) => {
        const f = ease(clamp01((progress - 0.4 - n * 0.013) / 0.24))
        if (f <= 0) {
          pc.mesh.position.copy(pc.a).lerp(pc.e, e)
          pc.mesh.quaternion.copy(pc.qa)
        } else {
          ctrl.copy(pc.e).lerp(pc.n, 0.5)
          ctrl.y = Math.max(pc.e.y, pc.n.y) + 1.6
          const k = 1 - f
          pc.mesh.position.copy(pc.e).multiplyScalar(k * k).addScaledVector(ctrl, 2 * k * f).addScaledVector(pc.n, f * f)
          pc.mesh.quaternion.copy(q.copy(pc.qa).slerp(pc.qn, f))
        }
        pc.lift += ((hovered === pc ? 1 : 0) - pc.lift) * Math.min(1, dt * 8)
        pc.mesh.position.y += pc.lift * 0.04
        pc.edge.emissiveIntensity = 6 * e * (1 - 0.5 * f) + 6 * pc.lift
      })
      if (rail) rail.visible = e < 0.5
      // once everything lies on the bed, the gantry cuts sheet 0 along the nest's outlines (then holds, then again)
      const run = clamp01((progress - 0.84) / 0.1)
      const done = run > 0 ? (time * 0.45) % (total * 1.15) : 0
      along(done, tip)
      gantry.position.x = MathUtils.lerp(bed.sheets[0][0] / 1000 - 1.6, tip.x, ease(run))
      head.position.z = MathUtils.lerp(bc.z, tip.z, ease(run))
      spark.intensity = run * (0.6 + 0.4 * Math.sin(time * 40)) * 0.6
      ;(glowSpot.material as MeshBasicMaterial).opacity = run * 0.9 * (done < total ? 1 : 0)
      cutMat.uniforms.uDone.value = run > 0 ? done : 0
      cutMat.uniforms.uPx.value = pxPerMetre
      shaftMat.uniforms.uTime.value = time
      moteMat.uniforms.uTime.value = time
      moteMat.uniforms.uPx.value = pxPerMetre
    },
    pxPerMetre(height) {
      return height / (2 * Math.tan(MathUtils.degToRad(camera.fov / 2)))
    },
    dispose() {
      for (const o of owned) o.dispose()
      for (const t of Object.values(maps)) (t as Texture).dispose()
      loaded.bake.dispose()
      renderer.shadowMap.enabled = false
    },
  }
}
