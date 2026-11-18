"use client"

import { type ReactNode, useEffect, useRef } from "react"

import { readTier } from "@/lib/tier"

/**
 * A module of ANU shown working, as if the visitor had opened it. The screen
 * is plain HTML: every element is there for people without script and for
 * crawlers. With motion allowed and the screen in view, a step counter runs:
 *
 *   data-at="n"         the element appears at step n (and stays)
 *   data-only="n"       the element is shown only during step n
 *   data-cursor-at="n"  the ghost cursor travels to this element at step n
 *                       and presses it (class is-pressed)
 *
 * Steps advance every `interval` ms; after the last one the screen holds,
 * then starts over. Still visitors (tier 0, reduced motion) see the last step.
 */
export function LiveScreen({
  label,
  steps,
  interval = 1400,
  device = "desktop",
  title,
  children,
}: {
  label: string
  steps: number
  interval?: number
  device?: "desktop" | "phone"
  title?: string
  children: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const items = [...el.querySelectorAll<HTMLElement>("[data-at],[data-only]")]
    const targets = [...el.querySelectorAll<HTMLElement>("[data-cursor-at]")]
    const cursor = el.querySelector<HTMLElement>(".live-cursor")
    const screen = el.querySelector<HTMLElement>(".anu-live__screen")

    const show = (step: number) => {
      el.dataset.step = String(step)
      for (const item of items) {
        const at = item.dataset.at
        const only = item.dataset.only
        item.classList.toggle("is-on", only !== undefined ? Number(only) === step : Number(at) <= step)
        item.classList.toggle("is-now", Number(at ?? only) === step)
      }
      const target = targets.find((t) => Number(t.dataset.cursorAt) === step)
      if (cursor && screen && target) {
        const a = screen.getBoundingClientRect()
        const b = target.getBoundingClientRect()
        cursor.style.translate = `${b.left - a.left + b.width / 2}px ${b.top - a.top + b.height / 2}px`
        cursor.classList.add("is-on")
        window.setTimeout(() => {
          target.classList.add("is-pressed")
          window.setTimeout(() => target.classList.remove("is-pressed"), 380)
        }, 520)
      }
    }

    const still = readTier() === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches
    if (still) {
      show(steps - 1)
      return
    }

    el.dataset.live = "on"
    let step = 0
    let timer = 0
    const tick = () => {
      show(step)
      // hold the last step a little longer, then start over
      const wait = step === steps - 1 ? interval * 2.6 : interval
      step = (step + 1) % steps
      timer = window.setTimeout(tick, wait)
    }
    const io = new IntersectionObserver(([entry]) => {
      window.clearTimeout(timer)
      if (entry?.isIntersecting) tick()
    }, { threshold: 0.35 })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [steps, interval])

  return (
    <div ref={root} className={`anu-live anu-live--${device}`} role="img" aria-label={label}>
      <div className="anu-live__chrome" aria-hidden="true">
        <span className="anu-live__mark" />
        <span className="anu-live__title">{title}</span>
        <span className="anu-live__dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="anu-live__screen">
        {children}
        <span className="live-cursor" aria-hidden="true" />
      </div>
    </div>
  )
}
