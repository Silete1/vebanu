"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      className="page-enter"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.classList.remove("page-enter")
          if (
            typeof window !== "undefined" &&
            "ScrollTrigger" in window &&
            window.ScrollTrigger &&
            typeof (window.ScrollTrigger as { refresh?: () => void }).refresh === "function"
          ) {
            ;(window.ScrollTrigger as { refresh: () => void }).refresh()
          }
        }
      }}
    >
      {children}
    </div>
  )
}
