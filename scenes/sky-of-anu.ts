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
import { type Stage, type StageName, stages } from "@/components/scene3d/stages/stage"
import { createZiggurat } from "@/components/scene3d/ziggurat"

/**
 * from the page: the systems the slabs stand for; `focus` = a system page's close-up (a slug, or "brain");
 * `stage` = the system's own scene the page pulls into after that opening beat
 */
type BoxData = { slabs?: SlabLink[]; brain?: SlabLink; focus?: string; stage?: StageName }

/** the shared opening beat on a system page (its slab docked on the ziggurat), then the pull into its own scene */
const OPENING = 2.6
const PULL = 1.3


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

  loadAssets(quality, renderer, abort.signal, !!links.focus)
    .then((assets) => {
      if (disposed) {
        disposeAssets(assets)
        return
      }
      teardown = start(assets)
    })
    .catch(() => dispose())

  function start(assets: Awaited<ReturnType<typeof loadAssets>>) {
    const { data } = assets
    // the lab's haze is 1 − e^(−k d); FogExp2 is 1 − e^(−(k' d)²): match them at the hero distance (~262 m)
    const HAZE = new Vector3(...data.haze.color).multiplyScalar(1.8)
    const FOG = Math.sqrt(data.haze.density * 262) / 262
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
    const slabs = createSlabs(assets, links.slabs ?? [], env.texture, rtl, links.focus)
    const dressing = createDressing(assets.data, assets.cards, quality, HAZE, FOG)
    scene.add(zig.group, slabs.group, dressing.group)
    const preset = links.focus ? data.presets[links.focus] : undefined
    const rig = createRig(data.hero, data.camera, rtl, preset)
    // checking hook (only with ?anu3d=keep): lets a test read the scene and the renderer
    if (keep) Object.assign(window, { __anu3d: { scene, rig, renderer } })
    // the bar (the lab's v2 still) reads brighter than the same exposure here: +0.3 EV for the live frame
    const post = createPost(renderer, quality, 2 ** (data.exposure + 0.3))
    const baseExposure = renderer.toneMappingExposure

    // the system's own scene loads while the opening beat plays; if it fails, the close-up simply stays
    let stage: Stage | undefined
    if (links.stage) {
      const locale = document.documentElement.lang.startsWith("ar") ? "ar" : "en"
      stages[links.stage](renderer, abort.signal, { rtl, locale, quality })
        .then((s) => {
          if (disposed) s.dispose()
          else {
            stage = s
            s.resize(box.clientWidth, box.clientHeight)
          }
        })
        .catch(() => {})
    }
    let pulledAt: number | undefined
    let stageTop: number | undefined
    let stageLink: string | undefined
    const pointer = { x: 0, y: 0, inside: false }

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
      stage?.resize(w, h)
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

    const onWindowPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
      rig.pointer(pointer.x, pointer.y)
    }
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
      if (stageLink) {
        if (stageLink.startsWith("#")) location.hash = stageLink.slice(1)
        else window.dispatchEvent(new CustomEvent("anu:navigate", { detail: { href: stageLink } }))
        return
      }
      const link = hovered?.link ?? (shrineHover ? links.brain : undefined)
      if (link && link.href !== location.pathname) window.dispatchEvent(new CustomEvent("anu:navigate", { detail: { href: link.href } }))
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
      const progress = links.focus ? 1 : Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.55)))

      // a system page: the opening beat, a flash of Signal light as the camera dives into the slab, its own scene
      if (stage && pulledAt === undefined && t > OPENING) pulledAt = t
      const pull = pulledAt === undefined ? 0 : Math.min(1, (t - pulledAt) / PULL)
      const flash = pull === 0 || pull >= 1 ? 0 : pull < 0.5 ? (pull * 2) ** 2 : (1 - (pull - 0.5) * 2) ** 2
      if (stage && pull >= 0.5) {
        if (stageTop === undefined) stageTop = r.top
        // its story plays as the visitor scrolls the hero through the window
        // a sticky hero (desktop, .anu-hero--stage) gives the story ~2 viewports of scroll; elsewhere it plays while
        // the box rises to the header, so every beat is seen whole
        const hero = box.closest(".anu-hero--stage")
        const sticky = hero && getComputedStyle(box.closest(".anu-hero__visual") ?? box).position === "sticky"
        const s = hero?.getBoundingClientRect()
        const p = sticky && s
          ? Math.min(1, Math.max(0, -s.top / Math.max(1, s.height - window.innerHeight)))
          : Math.min(1, Math.max(0, (stageTop - r.top) / Math.max(160, stageTop - 70)))
        pointer.inside = pointerIn
        const px = stage.pxPerMetre(size.y)
        stage.update(p, t, dt, pointer, px)
        stageLink = undefined
        let shown = false
        if (pointerIn && !drag?.moved) {
          ray.setFromCamera(ndc, stage.camera)
          const hit = ray.intersectObjects(stage.targets, false)[0]
          const info = hit && stage.describe(hit.object)
          if (info) {
            stageLink = info.href
            tmp.copy(info.anchor)
            tmp.y += 0.25
            tmp.project(stage.camera)
            label.textContent = info.label
            label.hidden = false
            label.style.transform = `translate(${((tmp.x + 1) / 2) * box.clientWidth}px, ${((1 - tmp.y) / 2) * box.clientHeight}px)`
            shown = true
          }
        } else stage.describe(stage.scene)
        if (!shown) label.hidden = true
        box.style.cursor = stageLink ? "pointer" : ""
        renderer.toneMappingExposure = baseExposure * stage.exposure
        post.render(stage.scene, stage.camera, t, flash)
        finishFrame(now)
        return
      }
      renderer.toneMappingExposure = baseExposure

      rig.update(progress, t, dt)
      if (pulledAt !== undefined) {
        // the dive: the lens closes on the slab while the light washes in
        const k = Math.min(1, (t - pulledAt) / (PULL * 0.5))
        rig.camera.fov *= 1 - 0.7 * k * k
        rig.camera.updateProjectionMatrix()
      }
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

      // the figure draws itself in on arrival (shrine -> dingir -> Orion), line by line; scrolling never hides it
      const draw = Math.min(sky.segments, t * 1.6 + progress * sky.segments)
      sky.update(cam.position, t, draw, size)
      zig.update(t)
      slabs.update(progress, t, dt, lit, pxPerMetre)
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

      post.render(scene, cam, t, flash)
      finishFrame(now)
    }

    function finishFrame(now: number) {
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
      stage?.dispose()
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
