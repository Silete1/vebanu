/**
 * The film: the scene renders to a half-float target; bloom takes only what is brighter than paper white (the
 * blue channels, the apex star, the brightest stars), then AgX tone mapping, a soft vignette and fine grain.
 * Hand-written passes on one fullscreen triangle: no post-processing library.
 */
import {
  AddEquation,
  AgXToneMapping,
  BufferGeometry,
  CustomBlending,
  Float32BufferAttribute,
  HalfFloatType,
  LinearFilter,
  Mesh,
  NoBlending,
  OneFactor,
  OrthographicCamera,
  type PerspectiveCamera,
  type Scene,
  ShaderMaterial,
  Vector2,
  type WebGLRenderer,
  WebGLRenderTarget,
} from "three"

import type { Quality } from "./data"

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`

export type Post = {
  setSize(w: number, h: number): void
  /** flash 0..1: the frame washes to Signal-blue light (the pull from the slab into a system's own scene) */
  render(scene: Scene, camera: PerspectiveCamera, time: number, flash?: number): void
  dispose(): void
}

export function createPost(renderer: WebGLRenderer, q: Quality, exposure: number): Post {
  renderer.toneMapping = AgXToneMapping
  renderer.toneMappingExposure = exposure
  const levels = q === "hi" ? 5 : 4
  const main = new WebGLRenderTarget(1, 1, { type: HalfFloatType, samples: q === "hi" ? 4 : 0 })
  const chain = Array.from({ length: levels }, () => new WebGLRenderTarget(1, 1, { type: HalfFloatType, minFilter: LinearFilter, magFilter: LinearFilter, depthBuffer: false }))

  const tri = new BufferGeometry()
  tri.setAttribute("position", new Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3))
  const quad = new Mesh(tri)
  quad.frustumCulled = false
  const cam = new OrthographicCamera()

  const down = new ShaderMaterial({
    blending: NoBlending,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: { uSrc: { value: null }, uTexel: { value: new Vector2() }, uThreshold: { value: 0 } },
    vertexShader: VERT,
    fragmentShader: /* glsl */ `
      uniform sampler2D uSrc;
      uniform vec2 uTexel;
      uniform float uThreshold;
      varying vec2 vUv;
      vec3 tap(vec2 o) { return texture2D(uSrc, vUv + o * uTexel).rgb; }
      void main() {
        vec3 c = (tap(vec2(-1.0, -1.0)) + tap(vec2(1.0, -1.0)) + tap(vec2(-1.0, 1.0)) + tap(vec2(1.0, 1.0))) * 0.25;
        if (uThreshold > 0.0) {
          float l = max(c.r, max(c.g, c.b));
          c *= max(l - uThreshold, 0.0) / max(l, 1e-4);   // only light above paper white
        }
        gl_FragColor = vec4(c, 1.0);
      }`,
  })
  const up = new ShaderMaterial({
    blending: CustomBlending,
    blendEquation: AddEquation,
    blendSrc: OneFactor,
    blendDst: OneFactor,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: { uSrc: { value: null }, uTexel: { value: new Vector2() } },
    vertexShader: VERT,
    fragmentShader: /* glsl */ `
      uniform sampler2D uSrc;
      uniform vec2 uTexel;
      varying vec2 vUv;
      void main() {
        vec3 c = vec3(0.0);
        c += texture2D(uSrc, vUv + vec2(-1.0, -1.0) * uTexel).rgb;
        c += texture2D(uSrc, vUv + vec2(1.0, -1.0) * uTexel).rgb;
        c += texture2D(uSrc, vUv + vec2(-1.0, 1.0) * uTexel).rgb;
        c += texture2D(uSrc, vUv + vec2(1.0, 1.0) * uTexel).rgb;
        gl_FragColor = vec4(c * 0.25 * 0.8, 1.0);
      }`,
  })
  const composite = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    toneMapped: true,
    uniforms: {
      uScene: { value: main.texture },
      uBloom: { value: chain[0].texture },
      uStrength: { value: 0.9 },
      uTime: { value: 0 },
      uFlash: { value: 0 },
      uRes: { value: new Vector2(1, 1) },
    },
    vertexShader: VERT,
    fragmentShader: /* glsl */ `
      uniform sampler2D uScene, uBloom;
      uniform float uStrength, uTime, uFlash;
      uniform vec2 uRes;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      void main() {
        vec3 c = texture2D(uScene, vUv).rgb + texture2D(uBloom, vUv).rgb * uStrength;
        vec2 v = vUv - 0.5;
        c *= 1.0 - dot(v, v) * 0.55;                      // vignette
        c = pow(max(c, 0.0) / 0.18, vec3(1.18)) * 0.18;    // filmic contrast about mid-grey
        c *= mix(vec3(0.94, 0.97, 1.06), vec3(1.04, 1.0, 0.95), smoothstep(0.02, 0.4, dot(c, vec3(0.3, 0.59, 0.11))));  // cool shadows, warm lights
        c = mix(c, vec3(0.38, 0.62, 1.0) * 3.0, uFlash);
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        float g = hash(vUv * uRes + fract(uTime * 7.0) * 113.0) - 0.5;
        gl_FragColor.rgb += g * 0.022;                     // film grain, after the curve
      }`,
  })

  const pass = (material: ShaderMaterial, target: WebGLRenderTarget | null) => {
    quad.material = material
    renderer.setRenderTarget(target)
    renderer.render(quad, cam)
  }

  return {
    setSize(w, h) {
      main.setSize(w, h)
      chain.forEach((t, i) => t.setSize(Math.max(1, w >> (i + 1)), Math.max(1, h >> (i + 1))))
      composite.uniforms.uRes.value.set(w, h)
    },
    render(scene, camera, time, flash = 0) {
      renderer.setRenderTarget(main)
      renderer.render(scene, camera)
      // bloom: threshold + downsample, then upsample back up adding each level
      let src = main
      chain.forEach((t, i) => {
        down.uniforms.uSrc.value = src.texture
        down.uniforms.uTexel.value.set(0.5 / src.width, 0.5 / src.height).multiplyScalar(2)
        down.uniforms.uThreshold.value = i === 0 ? 0.85 : 0
        pass(down, t)
        src = t
      })
      for (let i = levels - 1; i > 0; i--) {
        up.uniforms.uSrc.value = chain[i].texture
        up.uniforms.uTexel.value.set(1 / chain[i].width, 1 / chain[i].height)
        renderer.autoClear = false
        pass(up, chain[i - 1])
        renderer.autoClear = true
      }
      composite.uniforms.uTime.value = time
      composite.uniforms.uFlash.value = flash
      pass(composite, null)
    },
    dispose() {
      main.dispose()
      chain.forEach((t) => t.dispose())
      tri.dispose()
      for (const m of [down, up, composite]) m.dispose()
    },
  }
}
