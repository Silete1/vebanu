"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ArticleReadingProgress() {
  const barRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!barRef.current) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const isRtl = Boolean(barRef.current?.closest('[dir="rtl"]'))
      gsap.set(barRef.current, {
        scaleX: 0,
        transformOrigin: isRtl ? "right center" : "left center",
      })
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
      })
    })

    return () => mm.revert()
  })

  return (
    <span
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[var(--color-bioluminescent-lime)] motion-reduce:hidden"
    />
  )
}
