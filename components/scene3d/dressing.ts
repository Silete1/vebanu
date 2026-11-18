/**
 * Scale and life around the ziggurat: date palms and reed beds as instanced camera-facing cards (rendered from
 * the lab's procedural palms in Blender), small torch flames that flicker, and dust motes drifting in the
 * moonlight. Cheap on purpose: three draw calls.
 */
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  Group,
  PlaneGeometry,
  Points,
  ShaderMaterial,
  type Texture,
  Vector3,
} from "three"

import type { Quality, SceneData } from "./data"
import { toThree } from "./data"

export type DressingLayer = { group: Group; update(time: number, px: number): void; dispose(): void }

const FOG = /* glsl */ `
  uniform vec3 uHaze;
  uniform float uFog;
  vec3 hazed(vec3 c, float d) { float f = 1.0 - exp(-pow(uFog * d, 2.0)); return mix(c, uHaze, f); }
`

export function createDressing(data: SceneData, cards: Texture, q: Quality, haze: Vector3, fog: number): DressingLayer {
  const group = new Group()

  // ---------------------------------------------------------------- palms + reeds (one instanced draw)
  const offsets: number[] = []
  const sizes: number[] = []
  const cells: number[] = []
  const palms = q === "hi" ? data.palms : data.palms.filter((_, i) => i % 2 === 0)
  for (const [x, y, h, variant] of palms) {
    const p = toThree([x, y, 0])
    offsets.push(p.x, p.y, p.z)
    sizes.push((8 * h) / data.palmH, (16 * h) / data.palmH) // card = 4 x 8 m at half scale
    cells.push(variant)
  }
  for (const [x, y, r] of data.reeds) {
    for (let k = 0; k < (q === "hi" ? 3 : 1); k++) {
      const p = toThree([x + (k - 1) * r * 0.8, y + (k % 2) * r * 0.5, 0])
      offsets.push(p.x, p.y, p.z)
      sizes.push(r * 1.6, 8 * (0.8 + 0.1 * k))
      cells.push(3)
    }
  }
  const quad = new PlaneGeometry(1, 1).translate(0, 0.5, 0)
  const geo = new InstancedBufferGeometry()
  geo.index = quad.index
  geo.setAttribute("position", quad.attributes.position)
  geo.setAttribute("uv", quad.attributes.uv)
  geo.setAttribute("aOffset", new InstancedBufferAttribute(new Float32Array(offsets), 3))
  geo.setAttribute("aSize", new InstancedBufferAttribute(new Float32Array(sizes), 2))
  geo.setAttribute("aCell", new InstancedBufferAttribute(new Float32Array(cells), 1))
  geo.instanceCount = cells.length
  const cardMat = new ShaderMaterial({
    uniforms: { uMap: { value: cards }, uHaze: { value: haze }, uFog: { value: fog }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      uniform float uTime;
      attribute vec3 aOffset;
      attribute vec2 aSize;
      attribute float aCell;
      varying vec2 vUv;
      varying float vDist;
      void main() {
        // cylindrical billboard: upright, turned to face the camera
        vec3 toCam = cameraPosition - aOffset;
        vec3 right = normalize(vec3(toCam.z, 0.0, -toCam.x));
        float sway = sin(uTime * 0.6 + aOffset.x * 0.05) * 0.015 * position.y * position.y;
        vec3 p = aOffset + right * (position.x * aSize.x + sway * aSize.y) + vec3(0.0, position.y * aSize.y, 0.0);
        vUv = vec2((aCell + uv.x) * 0.25, uv.y);
        vec4 mv = viewMatrix * vec4(p, 1.0);
        vDist = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      ${FOG}
      varying vec2 vUv;
      varying float vDist;
      void main() {
        vec4 t = texture2D(uMap, vUv);
        if (t.a < 0.5) discard;
        vec3 c = pow(t.rgb, vec3(2.2)) * 0.35;      // moonlit silhouettes
        gl_FragColor = vec4(hazed(c, vDist), 1.0);
      }`,
  })
  const trees = new Mesh(geo, cardMat)
  trees.frustumCulled = false
  group.add(trees)

  // ---------------------------------------------------------------- torch flames
  const flamePos: number[] = []
  for (const t of data.flames) {
    const p = toThree(t)
    flamePos.push(p.x, p.y, p.z)
  }
  const flameGeo = new BufferGeometry()
  flameGeo.setAttribute("position", new Float32BufferAttribute(flamePos, 3))
  flameGeo.setAttribute("aSeed", new Float32BufferAttribute(data.flames.map((_, i) => i * 0.37), 1))
  const fire = new Color().setRGB(...data.torchColor)
  const flameMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 }, uFire: { value: new Vector3(fire.r, fire.g, fire.b) } },
    vertexShader: /* glsl */ `
      uniform float uTime, uScale;
      attribute float aSeed;
      varying float vSeed;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        vSeed = aSeed;
        gl_PointSize = clamp(uScale * 2.4 / -mv.z, 3.0, 60.0);   // ~2.4 m of glow at its distance
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uFire;
      varying float vSeed;
      void main() {
        vec2 p = (gl_PointCoord - 0.5) * 2.0;
        p.y = -p.y;
        float t = uTime * 7.0 + vSeed * 40.0;
        float sway = sin(t * 0.9) * 0.08 + sin(t * 2.3) * 0.04;
        vec2 q = vec2((p.x - sway * (p.y + 1.0)) * 2.6, p.y * 1.4 + 0.3);
        float flame = smoothstep(1.0, 0.2, length(q) + max(q.y, 0.0) * 0.6);
        float glow = exp(-dot(p, p) * 3.0) * 0.18;
        float fl = 0.85 + 0.15 * sin(t * 3.1) * sin(t * 1.7);
        vec3 c = mix(uFire, vec3(1.0, 0.85, 0.6), flame * flame) * (flame * 0.95 + glow) * fl;
        gl_FragColor = vec4(c, 1.0);
      }`,
  })
  const flames = new Points(flameGeo, flameMat)
  flames.frustumCulled = false
  group.add(flames)

  // ---------------------------------------------------------------- dust motes in the moonlight
  const N = q === "hi" ? 420 : 160
  const dust = new Float32Array(N * 3)
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  for (let i = 0; i < N; i++) dust.set([(rnd() - 0.5) * 220, rnd() * 26, 40 + rnd() * 230], i * 3)
  const dustGeo = new BufferGeometry()
  dustGeo.setAttribute("position", new Float32BufferAttribute(dust, 3))
  const dustMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 } },
    vertexShader: /* glsl */ `
      uniform float uTime, uScale;
      varying float vA;
      void main() {
        vec3 p = position;
        float s = fract(sin(dot(position.xz, vec2(12.9898, 78.233))) * 43758.5453);
        p.x += sin(uTime * 0.11 + s * 30.0) * 6.0 + uTime * 0.6 * (0.5 + s);
        p.x = mod(p.x + 110.0, 220.0) - 110.0;
        p.y += sin(uTime * 0.17 + s * 11.0) * 1.5;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = clamp(uScale * 0.12 / -mv.z, 1.0, 4.0);
        vA = (0.4 + 0.6 * s) * smoothstep(320.0, 60.0, -mv.z);
      }`,
    fragmentShader: /* glsl */ `
      varying float vA;
      void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        gl_FragColor = vec4(vec3(0.75, 0.78, 0.86) * 0.12 * vA * smoothstep(1.0, 0.0, r), 1.0);
      }`,
  })
  const motes = new Points(dustGeo, dustMat)
  motes.frustumCulled = false
  group.add(motes)

  return {
    group,
    update(time, px) {
      cardMat.uniforms.uTime.value = time
      flameMat.uniforms.uTime.value = time
      flameMat.uniforms.uScale.value = px
      dustMat.uniforms.uTime.value = time
      dustMat.uniforms.uScale.value = px
    },
    dispose() {
      for (const m of [trees, flames, motes]) {
        m.geometry.dispose()
        ;(m.material as ShaderMaterial).dispose()
      }
      quad.dispose()
    },
  }
}
