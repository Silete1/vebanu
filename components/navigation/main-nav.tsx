"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BriefcaseIcon,
  CompassIcon,
  LayersIcon,
  Building2Icon,
  FileTextIcon,
} from "lucide-react"

import type { NavigationItem } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type MainNavProps = {
  items: NavigationItem[]
  isScrolled?: boolean
}

const iconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Work: BriefcaseIcon,
  Method: CompassIcon,
  Platform: LayersIcon,
  Industries: Building2Icon,
  Insights: FileTextIcon,
}

export function MainNav({ items, isScrolled = false }: MainNavProps) {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")

  const navRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  // Track hash changes in browser
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const currentFullHref = pathname + activeHash
  const matchedItem = items.find(
    (item) => item.href === currentFullHref || item.href === activeHash
  )
  const matchedHashItem = activeHash
    ? items.find((item) => item.href.endsWith(activeHash))
    : null
  const activeId =
    matchedItem?.title ?? matchedHashItem?.title ?? items[0]?.title ?? ""

  // Update active pill position and size
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current || !pillRef.current) return

      // Find the currently active button element in the nav
      const activeBtn = navRef.current.querySelector(
        `[data-nav-id="${activeId}"]`
      ) as HTMLElement

      if (activeBtn) {
        pillRef.current.style.width = `${activeBtn.offsetWidth}px`
        pillRef.current.style.transform = `translateX(${activeBtn.offsetLeft}px)`
        pillRef.current.style.opacity = "1"
      } else {
        pillRef.current.style.opacity = "0"
      }
    }

    // Run immediately
    updatePill()

    // Setup observers & listeners for window resize
    window.addEventListener("resize", updatePill)
    return () => window.removeEventListener("resize", updatePill)
  }, [activeId])

  // Mouse Move Glare Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current || !glareRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    glareRef.current.style.setProperty("--x", `${x}px`)
    glareRef.current.style.setProperty("--y", `${y}px`)
  }

  return (
    <div
      ref={navRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "liquid-nav p-2 transition-all duration-500 ease-out",
        isScrolled ? "theme-glass-light" : "theme-glass-dark"
      )}
    >
      {/* Glare container for light reflection effect */}
      <div className="liquid-glare-container">
        <div ref={glareRef} className="liquid-glare" />
      </div>

      {/* Dynamic pill moving behind links */}
      <div ref={pillRef} className="active-pill" />

      {/* Nav links */}
      <div className="nav-items flex items-center gap-1">
        {items.map((item) => {
          const isActive = activeId === item.title
          const Icon = iconsMap[item.title]

          if (!item.available) return null

          return (
            <Link
              key={item.title}
              href={item.href}
              data-nav-id={item.title}
              className={cn(
                "nav-btn relative flex h-10 items-center justify-center rounded-full px-5 font-heading text-sm font-medium transition-colors duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "active text-[var(--icon-active)]"
                  : "text-[var(--icon-color)] hover:text-[var(--icon-active)]"
              )}
            >
              <div className="btn-content flex items-center gap-2 transition-transform duration-200 active:scale-95">
                {Icon && <Icon className="size-4 shrink-0" />}
                <span>{item.title}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
