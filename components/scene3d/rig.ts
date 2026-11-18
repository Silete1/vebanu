/**
 * The camera: a low telephoto view along the scroll path in scene.json (busy part in the right two-thirds,
 * the headline's calm third left — mirrored in Arabic), a slow idle drift, pointer parallax, and a gentle
 * drag-to-orbit with limits that eases home. The lens shift is Blender's (in frame heights), so the poster
 * and the live frame line up.
 */
import { MathUtils, PerspectiveCamera, Vector3 } from "three"

import { type CameraKey, toThree } from "./data"

export type Rig = {
  camera: PerspectiveCamera
  resize(width: number, height: number): void
  pointer(x: number, y: number): void
  drag(dx: number, dy: number): void
  update(progress: number, time: number, dt: number): void
}

const ease = (x: number) => x * x * (3 - 2 * x)

export function createRig(keys: CameraKey[], rtl: boolean): Rig {
  const camera = new PerspectiveCamera(28, 16 / 9, 1, 14000)
  let aspect = 16 / 9
  let aim = { x: 0, y: 0 }
  const look = { x: 0, y: 0 }
  const orbit = { yaw: 0, pitch: 0, idle: 0 }
  const pos = new Vector3()
  const target = new Vector3()
  const a = new Vector3()
  const b = new Vector3()
  const pivot = new Vector3(0, 20, 0)

  const sample = (p: number) => {
    let i = 0
    while (i < keys.length - 2 && p > keys[i + 1].at) i++
    const k0 = keys[i]
    const k1 = keys[i + 1]
    const u = ease(MathUtils.clamp((p - k0.at) / (k1.at - k0.at), 0, 1))
    const mirror = (v: number[]) => (rtl ? [-v[0], v[1], v[2]] : v)
    pos.copy(toThree(mirror(k0.pos), a)).lerp(toThree(mirror(k1.pos), b), u)
    target.copy(toThree(k0.target, a)).lerp(toThree(k1.target, b), u)
    return { fov: MathUtils.lerp(k0.fov, k1.fov, u), shift: MathUtils.lerp(k0.shift, k1.shift, u) }
  }

  return {
    camera,
    resize(width, height) {
      aspect = width / Math.max(1, height)
      camera.aspect = aspect
    },
    pointer(x, y) {
      aim = { x, y }
    },
    drag(dx, dy) {
      orbit.yaw = MathUtils.clamp(orbit.yaw - dx * 0.0035, -0.32, 0.32)
      orbit.pitch = MathUtils.clamp(orbit.pitch + dy * 0.0012, -0.05, 0.08)
      orbit.idle = 0
    },
    update(progress, time, dt) {
      const { fov, shift } = sample(progress)
      look.x += (aim.x - look.x) * Math.min(1, dt * 2.5)
      look.y += (aim.y - look.y) * Math.min(1, dt * 2.5)
      orbit.idle += dt
      if (orbit.idle > 3) {
        const k = Math.min(1, dt * 0.6)
        orbit.yaw -= orbit.yaw * k
        orbit.pitch -= orbit.pitch * k
      }
      // drift + parallax + orbit, all around the ziggurat
      const yaw = orbit.yaw + look.x * 0.035 + Math.sin(time * 0.06) * 0.03
      pos.sub(pivot).applyAxisAngle(new Vector3(0, 1, 0), yaw).add(pivot)
      pos.y += Math.sin(time * 0.09) * 0.6 + orbit.pitch * 120 + look.y * -1.2
      target.y += -look.y * 2.0
      camera.position.copy(pos)
      camera.lookAt(target)

      // phones: no side third; widen to keep the whole ziggurat, lift it above the headline
      const portrait = aspect < 1
      camera.fov = portrait ? MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(17)) / aspect)) : fov
      camera.updateProjectionMatrix()
      const e = camera.projectionMatrix.elements
      const sx = portrait ? 0 : rtl ? -shift : shift
      e[8] = (2 * sx) / aspect
      e[9] = portrait ? -0.34 : 0
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()
    },
  }
}
