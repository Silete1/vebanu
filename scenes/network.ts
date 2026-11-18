/**
 * The ANU line network, live: nodes drift as noise, then settle into an
 * ordered grid of square glyphs as the reader scrolls past — from noise to
 * control. Raw WebGL2, no library, no assets: every vertex comes from code.
 *
 * Guards: DPR ≤ 1.5, drawing stops off-screen and in a hidden tab, and if the
 * first 90 frames run under ~40 fps the scene removes itself and the poster
 * stays.
 */

const SIDE = 12 // grid of SIDE × SIDE nodes when ordered
const NEAR = 3 // lines from each node to its nearest neighbours

const vertex = `#version 300 es
in vec3 aNoise;
in vec3 aOrder;
in float aSeed;
uniform mat4 uView;
uniform float uTime;
uniform float uOrder;
uniform float uSize;
out float vDepth;
out float vSeed;
void main() {
  vec3 drift = vec3(sin(uTime * 0.21 + aSeed * 6.2), cos(uTime * 0.17 + aSeed * 4.1), sin(uTime * 0.13 + aSeed * 2.3)) * 0.08;
  float k = smoothstep(0.0, 1.0, clamp(uOrder * 1.25 - aSeed * 0.25, 0.0, 1.0));
  vec3 p = mix(aNoise + drift, aOrder, k);
  vec4 clip = uView * vec4(p, 1.0);
  gl_Position = clip;
  vDepth = clamp(1.0 - (clip.z - 1.0) / 4.0, 0.15, 1.0);
  vSeed = k;
  gl_PointSize = uSize * vDepth;
}`

const lineFragment = `#version 300 es
precision mediump float;
in float vDepth;
in float vSeed;
uniform float uFade;
out vec4 color;
void main() {
  color = vec4(0.376, 0.647, 0.98, (0.12 + 0.38 * vDepth) * (1.0 - vSeed * 0.55) * uFade);
}`

const pointFragment = `#version 300 es
precision mediump float;
in float vDepth;
in float vSeed;
uniform float uFade;
out vec4 color;
void main() {
  // a square glyph: outline while it is noise, filled once it is in order
  vec2 q = abs(gl_PointCoord - 0.5);
  float edge = max(q.x, q.y);
  float ring = step(0.5 - 0.18 / (1.0 + vSeed * 2.0), edge);
  float fill = mix(ring, 1.0, vSeed);
  vec3 tone = mix(vec3(0.58, 0.64, 0.72), vec3(0.145, 0.388, 0.922), vSeed);
  color = vec4(tone, fill * (0.35 + 0.65 * vDepth) * uFade);
}`

// the sky of Anu behind the network: far stars that twinkle and turn slowly
const starVertex = `#version 300 es
in vec3 aStar;
in float aTwinkle;
uniform mat4 uView;
uniform float uTime;
uniform float uSize;
out float vLight;
void main() {
  gl_Position = uView * vec4(aStar, 1.0);
  vLight = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.6 + aTwinkle * 1.7) + aTwinkle * 40.0));
  gl_PointSize = uSize * (0.6 + aTwinkle);
}`

const starFragment = `#version 300 es
precision mediump float;
in float vLight;
uniform float uFade;
out vec4 color;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  color = vec4(0.86, 0.91, 1.0, a * a * vLight * 0.85 * uFade);
}`

const STARS = 420

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader")
  return shader
}

function program(gl: WebGL2RenderingContext, fragment: string, vertexSource = vertex) {
  const p = gl.createProgram()!
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vertexSource))
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fragment))
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "program")
  return p
}

/** A seeded random, so the network is the same shape on every visit. */
function random(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

function buildNetwork() {
  const rand = random(20261118)
  const count = SIDE * SIDE
  const noise: number[][] = []
  const order: number[][] = []
  const seeds: number[] = []
  for (let i = 0; i < count; i++) {
    const r = 1.6 * Math.cbrt(rand())
    const a = rand() * Math.PI * 2
    const b = Math.acos(2 * rand() - 1)
    noise.push([r * Math.sin(b) * Math.cos(a) * 1.5, r * Math.cos(b) * 0.9, r * Math.sin(b) * Math.sin(a)])
    const gx = (i % SIDE) / (SIDE - 1) - 0.5
    const gy = Math.floor(i / SIDE) / (SIDE - 1) - 0.5
    order.push([gx * 2.4, gy * 2.4 * 0.62, 0])
    seeds.push(rand())
  }
  // lines: each node to its nearest neighbours in the noise
  const pairs: [number, number][] = []
  for (let i = 0; i < count; i++) {
    const near = noise
      .map((p, j) => [j, (p[0] - noise[i][0]) ** 2 + (p[1] - noise[i][1]) ** 2 + (p[2] - noise[i][2]) ** 2] as const)
      .filter(([j]) => j !== i)
      .sort((x, y) => x[1] - y[1])
      .slice(0, NEAR)
    for (const [j] of near) if (i < j || !pairs.some(([a, b]) => a === j && b === i)) pairs.push([i, j])
  }
  const pack = (indices: number[]) => {
    const data = new Float32Array(indices.length * 7)
    indices.forEach((n, k) => data.set([...noise[n], ...order[n], seeds[n]], k * 7))
    return data
  }
  return {
    points: pack([...Array(count).keys()]),
    lines: pack(pairs.flat()),
    pointCount: count,
    lineCount: pairs.length * 2,
  }
}

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2)
  const nf = 1 / (near - far)
  return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]
}

function multiply(a: number[], b: number[]) {
  const out = new Array<number>(16).fill(0)
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) out[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]
  return out
}

function view(yaw: number, pitch: number, distance: number) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
  // rotate Y then X, then push back along Z
  return [cy, sp * sy, -cp * sy, 0, 0, cp, sp, 0, sy, -sp * cy, cp * cy, 0, 0, 0, -distance, 1]
}

export function mount(box: HTMLElement) {
  const canvas = document.createElement("canvas")
  canvas.className = "anu-scene__canvas"
  const context = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: "low-power" })
  if (!context) return () => {}
  const gl: WebGL2RenderingContext = context
  box.appendChild(canvas)

  const net = buildNetwork()
  const lineProgram = program(gl, lineFragment)
  const pointProgram = program(gl, pointFragment)
  const starProgram = program(gl, starFragment, starVertex)

  // stars on a far shell, so they turn with the camera but never cross the network
  const rand = random(4013)
  const starData = new Float32Array(STARS * 4)
  for (let i = 0; i < STARS; i++) {
    const a = rand() * Math.PI * 2
    const z = rand() * 2 - 1
    const r = Math.sqrt(1 - z * z) * 9
    starData.set([Math.cos(a) * r, z * 5 + 1.5, Math.sin(a) * r, rand()], i * 4)
  }
  const starVao = gl.createVertexArray()!
  gl.bindVertexArray(starVao)
  const starBuffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, starData, gl.STATIC_DRAW)
  const starLoc = gl.getAttribLocation(starProgram, "aStar")
  gl.enableVertexAttribArray(starLoc)
  gl.vertexAttribPointer(starLoc, 3, gl.FLOAT, false, 16, 0)
  const twinkleLoc = gl.getAttribLocation(starProgram, "aTwinkle")
  gl.enableVertexAttribArray(twinkleLoc)
  gl.vertexAttribPointer(twinkleLoc, 1, gl.FLOAT, false, 16, 12)
  const starU = {
    view: gl.getUniformLocation(starProgram, "uView"),
    time: gl.getUniformLocation(starProgram, "uTime"),
    size: gl.getUniformLocation(starProgram, "uSize"),
    fade: gl.getUniformLocation(starProgram, "uFade"),
  }

  const setup = (p: WebGLProgram, data: Float32Array) => {
    const vao = gl.createVertexArray()!
    gl.bindVertexArray(vao)
    const buffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    const attr = (name: string, size: number, offset: number) => {
      const loc = gl.getAttribLocation(p, name)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 28, offset * 4)
    }
    attr("aNoise", 3, 0)
    attr("aOrder", 3, 3)
    attr("aSeed", 1, 6)
    return { vao, buffer }
  }
  const lines = setup(lineProgram, net.lines)
  const points = setup(pointProgram, net.points)

  const uniforms = (p: WebGLProgram) => ({
    view: gl.getUniformLocation(p, "uView"),
    time: gl.getUniformLocation(p, "uTime"),
    order: gl.getUniformLocation(p, "uOrder"),
    size: gl.getUniformLocation(p, "uSize"),
    fade: gl.getUniformLocation(p, "uFade"),
  })
  const lineU = uniforms(lineProgram)
  const pointU = uniforms(pointProgram)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  const rtl = document.documentElement.dir === "rtl"
  let width = 0, height = 0, dpr = 1
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    width = box.clientWidth
    height = box.clientHeight
    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    gl.viewport(0, 0, canvas.width, canvas.height)
  }
  resize()
  const sizeObserver = new ResizeObserver(resize)
  sizeObserver.observe(box)

  let pointerX = 0, pointerY = 0, aimX = 0, aimY = 0
  const onPointer = (event: PointerEvent) => {
    aimX = (event.clientX / window.innerWidth - 0.5) * 2
    aimY = (event.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener("pointermove", onPointer, { passive: true })

  let visible = true
  const visibility = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    if (visible) schedule()
  })
  visibility.observe(box)
  const onHidden = () => document.visibilityState === "visible" && schedule()
  document.addEventListener("visibilitychange", onHidden)

  let raf = 0, frames = 0, startedAt = 0, fade = 0, disposed = false
  const begin = performance.now()

  const draw = (now: number) => {
    raf = 0
    if (disposed || !visible || document.visibilityState !== "visible") return
    const t = (now - begin) / 1000

    // order follows the box's way through the viewport: noise above, order as it leaves
    const rect = box.getBoundingClientRect()
    const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * 0.8)))

    pointerX += (aimX - pointerX) * 0.05
    pointerY += (aimY - pointerY) * 0.05
    fade = Math.min(1, fade + 0.03)

    const yaw = (rtl ? -1 : 1) * (t * 0.05 + pointerX * 0.25) * (1 - progress * 0.85)
    const pitch = 0.18 + pointerY * 0.12 * (1 - progress)
    const matrix = multiply(perspective(0.75, width / Math.max(1, height), 0.1, 20), view(yaw, pitch, 3.6))

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const common = (u: ReturnType<typeof uniforms>) => {
      gl.uniformMatrix4fv(u.view, false, matrix)
      gl.uniform1f(u.time, t)
      gl.uniform1f(u.order, progress)
      gl.uniform1f(u.fade, fade)
    }

    gl.useProgram(starProgram)
    gl.uniformMatrix4fv(starU.view, false, multiply(perspective(0.75, width / Math.max(1, height), 0.1, 30), view(yaw * 0.4, pitch * 0.5, 0)))
    gl.uniform1f(starU.time, t)
    gl.uniform1f(starU.size, 3.2 * dpr)
    gl.uniform1f(starU.fade, fade)
    gl.bindVertexArray(starVao)
    gl.drawArrays(gl.POINTS, 0, STARS)

    gl.useProgram(lineProgram)
    common(lineU)
    gl.bindVertexArray(lines.vao)
    gl.drawArrays(gl.LINES, 0, net.lineCount)

    gl.useProgram(pointProgram)
    common(pointU)
    gl.uniform1f(pointU.size, 9 * dpr)
    gl.bindVertexArray(points.vao)
    gl.drawArrays(gl.POINTS, 0, net.pointCount)

    frames++
    if (frames === 1) {
      startedAt = now
      box.classList.add("is-live")
    }
    if (frames === 90 && (now - startedAt) / 89 > 25) {
      // under ~40 fps: give the page back to the poster
      dispose()
      return
    }
    schedule()
  }

  function schedule() {
    if (!raf && !disposed) raf = requestAnimationFrame(draw)
  }
  schedule()

  function dispose() {
    if (disposed) return
    disposed = true
    cancelAnimationFrame(raf)
    sizeObserver.disconnect()
    visibility.disconnect()
    window.removeEventListener("pointermove", onPointer)
    document.removeEventListener("visibilitychange", onHidden)
    box.classList.remove("is-live")
    gl.deleteBuffer(lines.buffer)
    gl.deleteBuffer(points.buffer)
    gl.deleteBuffer(starBuffer)
    gl.getExtension("WEBGL_lose_context")?.loseContext()
    canvas.remove()
  }

  return dispose
}
