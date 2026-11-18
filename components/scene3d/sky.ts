/**
 * The real night over Ur: NASA Deep Star Maps 2020 (public domain) as the Milky Way and the faint field, the
 * 14,000 brightest stars as twinkling points at their catalogue positions, and Orion — the True Shepherd of
 * Anu — drawn from the shrine through the dingir star, line by line as the reader scrolls.
 * Everything here sits "at infinity": the group follows the camera.
 */
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Matrix3,
  Mesh,
  Points,
  ShaderMaterial,
  SphereGeometry,
  type Texture,
  Vector2,
  Vector3,
} from "three"

import { type Quality, type SceneData, toThree } from "./data"

const R = 8000 // sky radius (camera far is beyond it)

export type SkyLayer = {
  group: Group
  /** objects drawn at world positions (the line from the shrine), not following the camera */
  world: Group
  update(camera: Vector3, time: number, draw: number, size: Vector2): void
  segments: number
  dispose(): void
}

/** scene frame (Blender) → equatorial, as a mat3 for GLSL */
function toEquatorial(m: number[][]) {
  return new Matrix3().set(m[0][0], m[1][0], m[2][0], m[0][1], m[1][1], m[2][1], m[0][2], m[1][2], m[2][2])
}

export function createSky(data: SceneData, map: Texture, packed: Uint16Array, q: Quality, haze: Vector3, rtl: boolean): SkyLayer {
  const group = new Group()
  const world = new Group()
  const m = rtl ? data.sky.matrixRtl : data.sky.matrix
  const toEq = toEquatorial(m)

  // ---------------------------------------------------------------- dome: Milky Way + faint field
  const dome = new Mesh(
    new SphereGeometry(R, 64, 32),
    new ShaderMaterial({
      side: BackSide,
      depthWrite: false,
      uniforms: {
        uMap: { value: map },
        uToEq: { value: toEq },
        uGain: { value: data.skyMap.scale * 0.32 },
        uHaze: { value: haze },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        uniform mat3 uToEq;
        uniform float uGain;
        uniform vec3 uHaze;
        varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir);
          vec3 b = vec3(d.x, -d.z, d.y);            // three -> Blender frame
          vec3 e = uToEq * b;                       // -> equatorial (x to RA 0, z to the pole)
          float ra = atan(e.y, e.x);
          float dec = asin(clamp(e.z, -1.0, 1.0));
          vec2 uv = vec2(fract(0.5 - ra * 0.15915494), 0.5 + dec * 0.31830989);
          // decode (2.2), then deepen the faint field while the Milky Way's bright core keeps its level
          vec3 c = pow(textureLod(uMap, uv, 0.0).rgb, vec3(2.2 * 1.45)) * uGain * 1.6;
          float alt = b.z;
          c *= 0.45 + 0.55 * smoothstep(-0.02, 0.22, alt);   // extinction near the horizon
          c = mix(c, uHaze, smoothstep(0.14, -0.01, alt));   // the plain's haze carries on into the sky
          gl_FragColor = vec4(c, 1.0);
        }`,
    })
  )
  dome.renderOrder = -2
  group.add(dome)

  // ---------------------------------------------------------------- point stars (real positions)
  const count = Math.min(data.stars.count, q === "hi" ? 14000 : 6000)
  const pos = new Float32Array(count * 3)
  const mag = new Float32Array(count)
  const col = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  const v = new Vector3()
  for (let i = 0; i < count; i++) {
    const ra = (packed[i * 4] / 65535) * Math.PI * 2
    const dec = (packed[i * 4 + 1] / 65535) * Math.PI - Math.PI / 2
    const e = [Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec)]
    const s = [0, 1, 2].map((r) => m[r][0] * e[0] + m[r][1] * e[1] + m[r][2] * e[2])
    toThree(s, v).multiplyScalar(R * 0.98)
    pos.set([v.x, v.y, v.z], i * 3)
    mag[i] = packed[i * 4 + 2] / 65535
    const rb = packed[i * 4 + 3]
    const r = (rb >> 8) / 255
    const b = (rb & 255) / 255
    col.set([r, Math.min(1, (r + b) * 0.55), b], i * 3)
    seed[i] = (i * 0.618034) % 1
  }
  const starGeo = new BufferGeometry()
  starGeo.setAttribute("position", new Float32BufferAttribute(pos, 3))
  starGeo.setAttribute("aMag", new Float32BufferAttribute(mag, 1))
  starGeo.setAttribute("aCol", new Float32BufferAttribute(col, 3))
  starGeo.setAttribute("aSeed", new Float32BufferAttribute(seed, 1))
  const starMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPx: { value: 1 },
      uLmin: { value: data.stars.log2FluxMin },
      uLmax: { value: data.stars.log2FluxMax },
      uGain: { value: 0.32 * 0.9 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime, uPx, uLmin, uLmax, uGain;
      attribute float aMag, aSeed;
      attribute vec3 aCol;
      varying vec3 vCol;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        float alt = normalize(position).y;
        float low = 1.0 - smoothstep(0.0, 0.45, alt);
        // scintillation: stronger through the thick air near the horizon
        float tw = 1.0 + (0.12 + 0.55 * low) * sin(uTime * (2.3 + aSeed * 6.0) + aSeed * 61.0)
                       * sin(uTime * (0.7 + aSeed * 1.3) + aSeed * 13.0);
        float flux = exp2(mix(uLmin, uLmax, aMag));
        float size = 1.6 + 5.5 * aMag * aMag;
        // the sprite's gaussian spreads the star's light: keep its total, not its peak
        float area = size * size * 0.26;
        vCol = aCol * flux * uGain * tw * 9.0 / area * smoothstep(-0.01, 0.12, alt);
        gl_PointSize = size * uPx;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vCol;
      void main() {
        vec2 p = gl_PointCoord - 0.5;
        float g = exp(-dot(p, p) * 18.0);
        gl_FragColor = vec4(vCol * g, 1.0);
      }`,
  })
  const stars = new Points(starGeo, starMat)
  stars.frustumCulled = false
  stars.renderOrder = -1
  group.add(stars)

  // ---------------------------------------------------------------- the figure: shrine -> dingir -> Orion
  const sky = rtl ? data.orion.starsRtl : data.orion.stars
  type End = { p: Vec3Like; sky: boolean }
  type Vec3Like = [number, number, number]
  const roof: End = { p: data.roof, sky: false }
  const dingir: End = { p: data.dingir, sky: false }
  const at = (k: string): End => ({ p: sky[k], sky: true })
  const links: [End, End][] = [
    [roof, dingir],
    [dingir, at("saiph")],
    [dingir, at("rigel")],
    ...data.orion.lines.map(([a, b]) => [at(a), at(b)] as [End, End]),
  ]
  const A: number[] = []
  const B: number[] = []
  const flags: number[] = []
  const side: number[] = []
  const t: number[] = []
  const idx: number[] = []
  const index: number[] = []
  links.forEach(([a, b], i) => {
    const pa = toThree(a.p)
    const pb = toThree(b.p)
    for (const [tt, ss] of [
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 1],
    ]) {
      A.push(pa.x, pa.y, pa.z)
      B.push(pb.x, pb.y, pb.z)
      flags.push(a.sky ? 1 : 0, b.sky ? 1 : 0)
      t.push(tt)
      side.push(ss)
      idx.push(i)
    }
    const o = i * 4
    index.push(o, o + 1, o + 2, o + 2, o + 1, o + 3)
  })
  const lineGeo = new BufferGeometry()
  lineGeo.setAttribute("position", new Float32BufferAttribute(A, 3)) // A doubles as position (bounds only)
  lineGeo.setAttribute("aB", new Float32BufferAttribute(B, 3))
  lineGeo.setAttribute("aSky", new Float32BufferAttribute(flags, 2))
  lineGeo.setAttribute("aT", new Float32BufferAttribute(t, 1))
  lineGeo.setAttribute("aSide", new Float32BufferAttribute(side, 1))
  lineGeo.setAttribute("aIdx", new Float32BufferAttribute(idx, 1))
  lineGeo.setIndex(index)
  const lineMat = new ShaderMaterial({
    side: DoubleSide, // screen-space quads: either winding
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uCam: { value: new Vector3() },
      uDraw: { value: 0 },
      uRes: { value: new Vector2(1, 1) },
      uWidth: { value: 2.2 },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      uniform vec3 uCam;
      uniform float uDraw, uWidth;
      uniform vec2 uRes;
      attribute vec3 aB;
      attribute vec2 aSky;
      attribute float aT, aSide, aIdx;
      varying float vSide, vAlong, vHead, vF;
      const float R = ${(R * 0.97).toFixed(1)};
      vec3 place(vec3 p, float sky) { return sky > 0.5 ? uCam + p * R : p; }
      vec4 clip(vec3 p) { return projectionMatrix * viewMatrix * vec4(p, 1.0); }
      void main() {
        vec3 a = place(position, aSky.x);
        vec3 b = place(aB, aSky.y);
        float f = clamp(uDraw - aIdx, 0.0, 1.0);
        vec3 bf = mix(a, b, max(f, 0.001));
        vec4 ca = clip(a), cb = clip(bf), cw = clip(mix(a, bf, aT));
        vec2 dir = normalize((cb.xy / cb.w - ca.xy / ca.w) * uRes + vec2(1e-5));
        cw.xy += vec2(-dir.y, dir.x) * aSide * uWidth / uRes * cw.w;
        gl_Position = cw;
        vSide = aSide; vAlong = aT; vF = f;
        vHead = f < 1.0 ? aT : 0.0;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying float vSide, vAlong, vHead, vF;
      void main() {
        if (vF <= 0.0) discard;
        float core = 1.0 - smoothstep(0.0, 1.0, abs(vSide));
        vec3 blue = vec3(0.235, 0.51, 0.96);            // #3B82F6, the constellation line
        float pulse = 0.85 + 0.15 * sin(uTime * 1.3 - vAlong * 6.0);
        vec3 c = blue * core * 1.6 * pulse + vec3(0.55, 0.75, 1.0) * core * vHead * vHead * 1.6;
        gl_FragColor = vec4(c, 1.0);
      }`,
  })
  const lines = new Mesh(lineGeo, lineMat)
  lines.frustumCulled = false
  world.add(lines)

  // node halos on Orion's stars (blue, faint) and the dingir: the apex star, eight wedges
  const nodePos: number[] = []
  const nodeIdx: number[] = []
  const firstLine: Record<string, number> = {}
  links.forEach(([, b], i) => {
    const key = Object.keys(sky).find((k) => b.sky && sky[k] === b.p)
    if (key && firstLine[key] === undefined) firstLine[key] = i
  })
  for (const [k, dir] of Object.entries(sky)) {
    const p = toThree(dir)
    nodePos.push(p.x, p.y, p.z)
    nodeIdx.push(firstLine[k] ?? 0)
  }
  const nodeGeo = new BufferGeometry()
  nodeGeo.setAttribute("position", new Float32BufferAttribute(nodePos, 3))
  nodeGeo.setAttribute("aIdx", new Float32BufferAttribute(nodeIdx, 1))
  const nodeMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uDraw: { value: 0 }, uPx: { value: 1 }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      uniform float uDraw, uPx;
      attribute float aIdx;
      varying float vOn;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position * ${(R * 0.97).toFixed(1)}, 1.0);
        vOn = clamp(uDraw - aIdx - 0.6, 0.0, 1.0);
        gl_PointSize = 16.0 * uPx;
      }`,
    fragmentShader: /* glsl */ `
      varying float vOn;
      void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float ring = smoothstep(0.62, 0.5, r) * smoothstep(0.28, 0.42, r);
        gl_FragColor = vec4(vec3(0.376, 0.647, 0.98) * ring * vOn * 0.9, 1.0);
      }`,
  })
  const nodes = new Points(nodeGeo, nodeMat)
  nodes.frustumCulled = false
  group.add(nodes)

  const dingirGeo = new BufferGeometry()
  const dp = toThree(data.dingir)
  dingirGeo.setAttribute("position", new Float32BufferAttribute([dp.x, dp.y, dp.z], 3))
  const dingirMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uPx: { value: 1 }, uTime: { value: 0 }, uOn: { value: 0 } },
    vertexShader: /* glsl */ `
      uniform float uPx;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 46.0 * uPx;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime, uOn;
      void main() {
        vec2 p = (gl_PointCoord - 0.5) * 2.0;
        float r = length(p);
        float a = atan(p.y, p.x);
        // eight cuneiform wedges: broad at the heart, tapering to their tips
        float k = abs(cos(a * 4.0));
        float wedge = smoothstep(0.82, 0.98, k) * smoothstep(0.92, 0.2, r) * (1.0 - r * 0.6);
        float core = exp(-r * r * 40.0);
        float halo = exp(-r * r * 6.0) * 0.12;
        float breathe = 0.9 + 0.1 * sin(uTime * 0.9);
        vec3 c = vec3(0.93, 0.96, 1.0) * (wedge * 2.6 + core * 4.0) + vec3(0.376, 0.647, 0.98) * halo;
        gl_FragColor = vec4(c * breathe * uOn, 1.0);
      }`,
  })
  const dingirStar = new Points(dingirGeo, dingirMat)
  dingirStar.frustumCulled = false
  world.add(dingirStar)

  return {
    group,
    world,
    segments: links.length,
    update(camera, time, draw, size) {
      group.position.copy(camera)
      const px = size.x / Math.max(1, size.y) > 0 ? Math.min(2, size.y / 900) * 1.0 : 1
      starMat.uniforms.uTime.value = time
      starMat.uniforms.uPx.value = Math.max(0.8, px)
      lineMat.uniforms.uCam.value.copy(camera)
      lineMat.uniforms.uDraw.value = draw
      lineMat.uniforms.uRes.value.copy(size)
      lineMat.uniforms.uWidth.value = Math.max(1.6, 2.2 * px)
      lineMat.uniforms.uTime.value = time
      nodeMat.uniforms.uDraw.value = draw
      nodeMat.uniforms.uPx.value = Math.max(0.8, px)
      dingirMat.uniforms.uPx.value = Math.max(0.8, px)
      dingirMat.uniforms.uTime.value = time
      dingirMat.uniforms.uOn.value = Math.min(1, draw)
    },
    dispose() {
      for (const o of [dome, stars, lines, nodes, dingirStar]) {
        o.geometry.dispose()
        ;(o.material as ShaderMaterial).dispose()
      }
    },
  }
}
