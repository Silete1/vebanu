"use client"

import { useEffect, useRef } from "react"

import { readTier } from "@/lib/tier"

/**
 * A short rendered loop that takes over from the poster: never at tier 0 or
 * with Save-Data, fetched only when it comes near the screen, paused when it
 * leaves it, shown only once it actually plays.
 */
export function VideoLoop({ base, webm, poster }: { base: string; webm: boolean; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (!video || readTier() === 0 || saveData) return

    let loaded = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!loaded) {
            loaded = true
            video.preload = "auto"
            video.load()
          }
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "120px" }
    )
    const onPlaying = () => video.classList.add("is-live")
    // a realtime scene taking over the same box makes the loop redundant: stop it
    const scene = video.parentElement?.querySelector(".anu-scene")
    const sceneWatch = new MutationObserver(() => {
      if (scene?.classList.contains("is-live")) {
        io.disconnect()
        video.pause()
        video.classList.remove("is-live")
      }
    })
    if (scene) sceneWatch.observe(scene, { attributes: true, attributeFilter: ["class"] })
    video.addEventListener("playing", onPlaying)
    io.observe(video)
    return () => {
      io.disconnect()
      sceneWatch.disconnect()
      video.removeEventListener("playing", onPlaying)
    }
  }, [])

  return (
    <video ref={ref} className="anu-loop" muted loop playsInline preload="none" poster={poster} aria-hidden="true" tabIndex={-1}>
      {webm ? <source src={`${base}.webm`} type="video/webm" /> : null}
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  )
}
