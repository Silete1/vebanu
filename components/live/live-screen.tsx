"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"

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
const controlsCopy = {
  en: { play: "Play", pause: "Pause", prev: "Previous step", next: "Next step", step: "Step", of: "of", group: "Steps" },
  ar: { play: "تشغيل", pause: "إيقاف مؤقت", prev: "الخطوة السابقة", next: "الخطوة التالية", step: "الخطوة", of: "من", group: "الخطوات" },
}

/** Control glyphs, drawn small and square like the rest of the kit. */
function Icon({ name }: { name: "prev" | "next" | "play" | "pause" }) {
  const paths = {
    prev: "M11 3 5 8l6 5V3ZM4 3h1.6v10H4z",
    next: "m5 3 6 5-6 5V3Zm6.4 0H13v10h-1.6z",
    play: "M5 3v10l8-5-8-5Z",
    pause: "M4.5 3h2.6v10H4.5zM8.9 3h2.6v10H8.9z",
  }
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={`anu-live__icon anu-live__icon--${name}`}>
      <path d={paths[name]} fill="currentColor" />
    </svg>
  )
}

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
  const api = useRef<{ go: (step: number) => void; play: () => void; pause: () => void } | null>(null)
  // controls exist only once the script runs (server HTML stays the plain, complete screen)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(steps - 1)
  const [lang, setLang] = useState<"en" | "ar">("en")

  useEffect(() => {
    const el = root.current
    if (!el) return
    setLang(document.documentElement.lang.startsWith("ar") ? "ar" : "en")
    const items = [...el.querySelectorAll<HTMLElement>("[data-at],[data-only]")]
    const targets = [...el.querySelectorAll<HTMLElement>("[data-cursor-at]")]
    const cursor = el.querySelector<HTMLElement>(".live-cursor")
    const screen = el.querySelector<HTMLElement>(".anu-live__screen")

    const show = (step: number) => {
      el.dataset.step = String(step)
      setCurrent(step)
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
    el.dataset.live = still ? "still" : "on"
    let step = still ? steps - 1 : 0
    let timer = 0
    let auto = !still
    let visible = false

    const tick = () => {
      show(step)
      // hold the last step a little longer, then start over
      const wait = step === steps - 1 ? interval * 2.6 : interval
      step = (step + 1) % steps
      timer = window.setTimeout(tick, wait)
    }
    const stop = () => window.clearTimeout(timer)

    api.current = {
      go: (target) => {
        auto = false
        setPlaying(false)
        stop()
        step = ((target % steps) + steps) % steps
        show(step)
      },
      play: () => {
        auto = true
        setPlaying(true)
        stop()
        step = (Number(el.dataset.step ?? 0) + 1) % steps
        if (visible) tick()
      },
      pause: () => {
        auto = false
        setPlaying(false)
        stop()
      },
    }

    show(step)
    setPlaying(auto)
    setReady(true)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting
        stop()
        if (visible && auto) tick()
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop()
    }
  }, [steps, interval])

  const t = controlsCopy[lang]
  const go = (step: number) => api.current?.go(step)
  const onKey = (event: React.KeyboardEvent) => {
    const forward = lang === "ar" ? "ArrowLeft" : "ArrowRight"
    const back = lang === "ar" ? "ArrowRight" : "ArrowLeft"
    if (event.key === forward) go(current + 1)
    else if (event.key === back) go(current - 1)
    else if (event.key === " " || event.key === "Enter") return
    else return
    event.preventDefault()
  }

  return (
    <div ref={root} className={`anu-live anu-live--${device}`}>
      <div className="anu-live__chrome" aria-hidden="true">
        <span className="anu-live__mark" />
        <span className="anu-live__title">{title}</span>
        <span className="anu-live__dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      {/* a click on the screen moves it one step, like a presenter's clicker */}
      <div className="anu-live__screen" role="img" aria-label={label} onClick={ready ? () => go(current + 1) : undefined}>
        {children}
        <span className="live-cursor" aria-hidden="true" />
      </div>
      {ready ? (
        <div className="anu-live__controls" role="group" aria-label={t.group} onKeyDown={onKey}>
          <button type="button" className="anu-live__btn" aria-label={t.prev} onClick={() => go(current - 1)}>
            <Icon name="prev" />
          </button>
          <button
            type="button"
            className="anu-live__btn"
            aria-label={playing ? t.pause : t.play}
            onClick={() => (playing ? api.current?.pause() : api.current?.play())}
          >
            <Icon name={playing ? "pause" : "play"} />
          </button>
          <button type="button" className="anu-live__btn" aria-label={t.next} onClick={() => go(current + 1)}>
            <Icon name="next" />
          </button>
          <ol className="anu-live__track">
            {Array.from({ length: steps }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  aria-label={`${t.step} ${i + 1} ${t.of} ${steps}`}
                  aria-current={i === current ? "step" : undefined}
                  data-done={i < current ? "" : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ol>
          <span className="anu-live__count live-num" aria-live="polite">
            {current + 1}/{steps}
          </span>
        </div>
      ) : null}
    </div>
  )
}
