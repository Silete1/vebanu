/**
 * Sky of Anu, live (the home hero, tier 2): an Ur-style ziggurat under the real night sky over Ur, Orion —
 * the True Shepherd of Anu — rising from the shrine through the dingir star, and ANU's systems as slabs that
 * dock on the terraces as the page scrolls. Photoreal from Blender bakes (anu-3d-lab/web), drawn with three.js.
 *
 * The scene contract (components/story/scene-slot.tsx, mail site-mail/to-pc1/011): own canvas, DPR ≤ 1.5,
 * nothing drawn off screen or in a hidden tab, `is-live` after the first frame, gone again (poster stays) if
 * the first 90 frames run under ~40 fps, every GPU object and listener freed on teardown. The box is
 * aria-hidden: every slab is also a real link in the page. `?anu3d=keep` skips the frame-rate exit (for
 * checking the scene in a software-GL browser).
 */
import { FogExp2, PMREMGenerator, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from "three"

import { disposeAssets, loadAssets } from "@/components/scene3d/assets"
import type { Quality, SlabLink } from "@/components/scene3d/data"
import { createDressing } from "@/components/scene3d/dressing"
import { createPost } from "@/components/scene3d/post"
import { createRig } from "@/components/scene3d/rig"
import { createSky } from "@/components/scene3d/sky"
import { type Slab, createSlabs } from "@/components/scene3d/slabs"
import { createZiggurat } from "@/components/scene3d/ziggurat"

type BoxData = { slabs?: SlabLink[]; brain?: SlabLink }

const HAZE = new Vector3(0.01, 0.012, 0.018)
const FOG = 0.00165 // FogExp2 density ≈ the poster's 1 − e^(−0.0009 d) at the ziggurat's distance
const EXPOSURE = 1.87 // = the poster's +0.9 EV

export function mount(box: HTMLElement): () => void {
  const quality: Quality = window.innerWidth < 768 || matchMedia("(pointer: coarse)").matches ? "lo" : "hi"
  const rtl = document.documentElement.dir === "rtl"
  const keep = /[?&]anu3d=keep/.test(location.search)
  const links: BoxData = (() => {
    try {
      return JSON.parse(box.dataset.scene ?? "{}") as BoxData
    } catch {
      return {}
    }
  })()

  const canvas = document.createElement("canvas")
  canvas.className = "anu-scene__canvas"
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" })
  } catch {
    return () => {}
  }
  box.appendChild(canvas)
  const label = document.createElement("div")
  label.className = "anu-scene__label"
  label.hidden = true
  box.appendChild(label)

  const abort = new AbortController()
  let disposed = false
  let teardown: (() => void) | undefined

  loadAssets(quality, renderer, abort.signal)
    .then((assets) => {
      if (disposed) {
        disposeAssets(assets)
        return
      }
      teardown = start(assets)
    })
    .catch(() => dispose())

  function start(assets: Awaited<ReturnType<typeof loadAssets>>) {
    const scene = new Scene()
    scene.fog = new FogExp2(0, FOG)
    scene.fog.color.setRGB(HAZE.x, HAZE.y, HAZE.z)
    const sky = createSky(assets.data, assets.sky, assets.stars, quality, HAZE, rtl)

    // the slabs' reflections: the same sky, prefiltered once
    const pmrem = new PMREMGenerator(renderer)
    const envScene = new Scene()
    envScene.add(sky.group)
    const env = pmrem.fromScene(envScene, 0.02, 1, 12000)
    pmrem.dispose()
    scene.add(sky.group, sky.world)

    const zig = createZiggurat(assets)
    const slabs = createSlabs(assets, links.slabs ?? [], env.texture)
    const dressing = createDressing(assets.data, assets.cards, quality, HAZE, FOG)
    scene.add(zig.group, slabs.group, dressing.group)
    const rig = createRig(assets.data.camera, rtl)
    // checking hook (only with ?anu3d=keep): lets a test read the scene and the renderer
    if (keep) Object.assign(window, { __anu3d: { scene, rig, renderer } })
    const post = createPost(renderer, quality, EXPOSURE)

    // ------------------------------------------------------------ size
    const size = new Vector2()
    let pxPerMetre = 1
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, quality === "hi" ? 1.5 : 1.25)
      const w = Math.max(1, box.clientWidth)
      const h = Math.max(1, box.clientHeight)
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      size.set(Math.round(w * dpr), Math.round(h * dpr))
      post.setSize(size.x, size.y)
      rig.resize(w, h)
    }
    resize()
    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(box)

    // ------------------------------------------------------------ pointer: parallax, hover, drag, click
    const ray = new Raycaster()
    const ndc = new Vector2()
    let hovered: Slab | undefined
    let shrineHover = false
    let focused: Slab | undefined
    let pointerIn = false
    let drag: { x: number; y: number; moved: boolean } | undefined
    const targets = [...slabs.slabs.map((s) => s.hit), zig.shrine]

    const onWindowPointer = (e: PointerEvent) => rig.pointer((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2)
    const pick = (e: PointerEvent) => {
      const r = box.getBoundingClientRect()
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      pointerIn = true
    }
    const onMove = (e: PointerEvent) => {
      pick(e)
      if (drag) {
        const dx = e.clientX - drag.x
        const dy = e.clientY - drag.y
        if (drag.moved || Math.hypot(dx, dy) > 5) {
          drag.moved = true
          rig.drag(dx, dy)
          drag.x = e.clientX
          drag.y = e.clientY
        }
      }
    }
    const onDown = (e: PointerEvent) => {
      pick(e)
      drag = { x: e.clientX, y: e.clientY, moved: false }
    }
    const onUp = () => {
      const wasDrag = drag?.moved
      drag = undefined
      if (wasDrag) return
      const link = hovered?.link ?? (shrineHover ? links.brain : undefined)
      if (link) window.dispatchEvent(new CustomEvent("anu:navigate", { detail: { href: link.href } }))
    }
    const onLeave = () => {
      pointerIn = false
      drag = undefined
    }
    // keyboard: a focused link to a system lights its slab (the links are the accessible path)
    const onFocus = (e: FocusEvent) => {
      const href = (e.target as HTMLElement | null)?.closest?.("a")?.getAttribute("href") ?? ""
      focused = slabs.slabs.find((s) => s.link && href.endsWith(`/systems/${s.link.slug}`))
    }
    window.addEventListener("pointermove", onWindowPointer, { passive: true })
    box.addEventListener("pointermove", onMove)
    box.addEventListener("pointerdown", onDown)
    box.addEventListener("pointerup", onUp)
    box.addEventListener("pointerleave", onLeave)
    document.addEventListener("focusin", onFocus)

    // ------------------------------------------------------------ visibility
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting
      if (visible) schedule()
    })
    io.observe(box)
    const onVisibility = () => document.visibilityState === "visible" && schedule()
    document.addEventListener("visibilitychange", onVisibility)

    // ------------------------------------------------------------ frame
    let raf = 0
    let frames = 0
    let firstAt = 0
    let last = performance.now()
    const begin = last
    const tmp = new Vector3()

    const frame = (now: number) => {
      raf = 0
      if (disposed || !visible || document.visibilityState !== "visible") return
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const t = (now - begin) / 1000
      const r = box.getBoundingClientRect()
      // the whole story plays while the hero scrolls away (done when ~55 % of it has left)
      const progress = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.55)))

      rig.update(progress, t, dt)
      const cam = rig.camera
      pxPerMetre = size.y / (2 * Math.tan((cam.fov * Math.PI) / 360))

      // hover (only where the pointer is over the box)
      hovered = undefined
      shrineHover = false
      if (pointerIn && !drag?.moved) {
        ray.setFromCamera(ndc, cam)
        const hit = ray.intersectObjects(targets, false)[0]
        if (hit?.object === zig.shrine) shrineHover = !!links.brain
        else if (hit) hovered = slabs.slabs[hit.object.userData.index as number]
      }
      const lit = hovered ?? focused
      box.style.cursor = hovered?.link || shrineHover ? "pointer" : ""

      const intro = Math.min(3, t * 1.1)
      const draw = intro + Math.min(1, Math.max(0, (progress - 0.02) / 0.6)) * (sky.segments - 3)
      sky.update(cam.position, t, draw, size)
      zig.update(t)
      slabs.update(progress, t, dt, lit)
      dressing.update(t, pxPerMetre)

      // the label sits on the lit slab (or the shrine)
      const name = lit?.link?.name ?? (shrineHover ? links.brain?.name : undefined)
      if (name) {
        if (lit) tmp.copy(lit.group.position)
        else zig.shrine.getWorldPosition(tmp)
        tmp.y += 3
        tmp.project(cam)
        label.textContent = name
        label.hidden = false
        label.style.transform = `translate(${((tmp.x + 1) / 2) * box.clientWidth}px, ${((1 - tmp.y) / 2) * box.clientHeight}px)`
      } else label.hidden = true

      post.render(scene, cam, t)

      frames++
      if (frames === 1) {
        firstAt = now
        box.classList.add("is-live")
      }
      if (frames === 90 && !keep && (now - firstAt) / 89 > 25) {
        dispose() // under ~40 fps: the poster stays
        return
      }
      schedule()
    }
    function schedule() {
      if (!raf && !disposed) raf = requestAnimationFrame(frame)
    }
    schedule()

    return () => {
      cancelAnimationFrame(raf)
      sizeObserver.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onWindowPointer)
      box.removeEventListener("pointermove", onMove)
      box.removeEventListener("pointerdown", onDown)
      box.removeEventListener("pointerup", onUp)
      box.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("focusin", onFocus)
      document.removeEventListener("visibilitychange", onVisibility)
      box.style.cursor = ""
      sky.dispose()
      zig.dispose()
      slabs.dispose()
      dressing.dispose()
      post.dispose()
      env.dispose()
      disposeAssets(assets)
    }
  }

  function dispose() {
    if (disposed) return
    disposed = true
    abort.abort()
    teardown?.()
    box.classList.remove("is-live")
    renderer.dispose()
    renderer.forceContextLoss()
    canvas.remove()
    label.remove()
  }

  return dispose
}
