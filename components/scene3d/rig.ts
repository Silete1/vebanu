/**
 * The camera. Scroll 0 is the lab's v2 hero frame (85 mm, low, the ziggurat filling the right two-thirds, the
 * headline's calm third on the left; Arabic mirrors it). Scrolling rises, pushes in and lifts the aim into
 * Orion while the lens widens (keys in scene.json). On top: a slow idle drift, pointer parallax and a gentle
 * drag-to-orbit with limits that eases home. The horizontal field is kept, so every window gets the 85 mm look.
 */
import { MathUtils, PerspectiveCamera, Vector3 } from "three"

import { type CameraKey, type SceneData, toThree } from "./data"

export type Rig = {
  camera: PerspectiveCamera
  resize(width: number, height: number): void
  pointer(x: number, y: number): void
  drag(dx: number, dy: number): void
  update(progress: number, time: number, dt: number): void
}

const ease = (x: number) => x * x * (3 - 2 * x)
/** Arabic headlines run wider: the RTL frame pushes the subject further out (same factor in the Blender poster) */
const RTL_SHIFT = 1.5
const UP = new Vector3(0, 1, 0)

export function createRig(hero: SceneData["hero"], keys: CameraKey[], rtl: boolean): Rig {
  const camera = new PerspectiveCamera(14, 16 / 9, 1, 14000)
  let aspect = 16 / 9
  let aim = { x: 0, y: 0 }
  const look = { x: 0, y: 0 }
  const orbit = { yaw: 0, pitch: 0, idle: 0 }
  const mirror = (v: number[]) => (rtl ? [-v[0], v[1], v[2]] : v)
  const heroPos = toThree(mirror(hero.pos))
  const heroTarget = toThree(mirror(hero.target))
  const ahead = heroTarget.clone().sub(heroPos).setY(0).normalize()
  const pivot = new Vector3(0, 12, 4) // the ziggurat's heart
  const pos = new Vector3()
  const target = new Vector3()

  const sample = (p: number) => {
    let i = 0
    while (i < keys.length - 2 && p > keys[i + 1].at) i++
    const k0 = keys[i]
    const k1 = keys[i + 1]
    const u = ease(MathUtils.clamp((p - k0.at) / (k1.at - k0.at), 0, 1))
    const mix = (key: keyof CameraKey) => MathUtils.lerp(k0[key], k1[key], u)
    pos.copy(heroPos).addScaledVector(ahead, mix("push"))
    pos.y += mix("rise")
    target.copy(heroTarget)
    target.y += mix("look_up")
    return { hfov: mix("hfov"), shift: mix("shift") }
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
      orbit.yaw = MathUtils.clamp(orbit.yaw - dx * 0.003, -0.3, 0.3)
      orbit.pitch = MathUtils.clamp(orbit.pitch + dy * 0.0012, -0.04, 0.08)
      orbit.idle = 0
    },
    update(progress, time, dt) {
      const portrait = aspect < 1
      const lens = sample(progress)
      let hfov = lens.hfov
      // phones: no side third; frame the whole ziggurat in the top half, above the headline
      if (portrait) {
        pos.lerp(pivot, 0.56)
        target.lerp(pivot, 0.85)
        hfov = Math.max(hfov, 50)
      }
      look.x += (aim.x - look.x) * Math.min(1, dt * 2.5)
      look.y += (aim.y - look.y) * Math.min(1, dt * 2.5)
      orbit.idle += dt
      if (orbit.idle > 3) {
        const k = Math.min(1, dt * 0.6)
        orbit.yaw -= orbit.yaw * k
        orbit.pitch -= orbit.pitch * k
      }
      // drift + parallax + orbit, around the ziggurat
      const yaw = orbit.yaw + look.x * 0.025 + Math.sin(time * 0.06) * 0.018
      pos.sub(pivot).applyAxisAngle(UP, yaw).add(pivot)
      target.sub(pivot).applyAxisAngle(UP, yaw * 0.6).add(pivot)
      pos.y += Math.sin(time * 0.09) * 0.4 + orbit.pitch * 100 - look.y * 0.8
      target.y -= look.y * 1.5
      camera.position.copy(pos)
      camera.lookAt(target)
      camera.fov = MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(hfov / 2)) / aspect))
      camera.updateProjectionMatrix()
      const e = camera.projectionMatrix.elements
      // Blender's lens shift (frame widths): the poster and this frame line up; phones lift the content instead
      e[8] = portrait ? 0 : 2 * (rtl ? -lens.shift * RTL_SHIFT : lens.shift)
      e[9] = portrait ? -0.42 : 0
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()
    },
  }
}
