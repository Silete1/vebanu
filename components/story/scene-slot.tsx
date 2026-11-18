"use client"

import { useEffect, useRef } from "react"

import { readTier } from "@/lib/tier"

export type SceneName = "sky-of-anu" | "twin" | "furniture"

/** A scene module draws into the box it is given and returns its own teardown. */
export type SceneModule = { mount: (box: HTMLElement) => () => void }

const scenes: Partial<Record<SceneName, () => Promise<SceneModule>>> = {
  "sky-of-anu": () => import("@/scenes/sky-of-anu"),
  twin: () => import("@/scenes/twin"),
}

/**
 * The place a realtime scene may take over from the poster beneath it: only on
 * tier 2, only once it is near the screen, only after the browser is idle. The
 * scene adds `is-live` to the box when its first frame is drawn, and the poster
 * fades under it. It stops when the reader moves the motion switch down.
 */
export function SceneSlot({
  scene,
  interactive = false,
  data,
}: {
  scene: SceneName
  interactive?: boolean
  /** what the scene needs from the page (e.g. the systems its slabs stand for), read by the scene as JSON */
  data?: unknown
}) {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = box.current
    const load = scenes[scene]
    if (!element || !load) return

    let dispose: (() => void) | undefined
    let cancelled = false
    let observer: IntersectionObserver | undefined

    const start = () => {
      if (readTier() < 2 || dispose || observer) return
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          observer?.disconnect()
          const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 200))
          idle(async () => {
            const scene = await load()
            if (!cancelled) dispose = scene.mount(element)
          })
        },
        { rootMargin: "200px" }
      )
      observer.observe(element)
    }

    const stop = () => {
      observer?.disconnect()
      observer = undefined
      dispose?.()
      dispose = undefined
    }

    const onTier = () => (readTier() < 2 ? stop() : start())

    start()
    window.addEventListener("anu:tier", onTier)
    return () => {
      cancelled = true
      window.removeEventListener("anu:tier", onTier)
      stop()
    }
  }, [scene])

  return (
    <div
      ref={box}
      className={interactive ? "anu-scene anu-scene--interactive" : "anu-scene"}
      data-scene={data === undefined ? undefined : JSON.stringify(data)}
      aria-hidden="true"
    />
  )
}
