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

import { navigationItems } from "@/lib/navigation"
import { AnuLogo } from "@/components/brand/anu-logo"
import { Container } from "@/components/layout/container"
import { MobileNavSheet } from "@/components/navigation/mobile-nav-sheet"
import { cn } from "@/lib/utils"

const iconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Work: BriefcaseIcon,
  Method: CompassIcon,
  Platform: LayersIcon,
  Industries: Building2Icon,
  Insights: FileTextIcon,
}

export function SiteHeader() {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")
  const [activeId, setActiveId] = useState("")

  const navRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  // Track hash changes in browser
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    setActiveHash(window.location.hash)
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Determine active item id
  useEffect(() => {
    const currentFullHref = pathname + activeHash
    const matchedItem = navigationItems.find(
      (item) => item.href === currentFullHref || item.href === activeHash
    )

    if (matchedItem) {
      setActiveId(matchedItem.title)
    } else if (activeHash) {
      const hashItem = navigationItems.find((item) => item.href.endsWith(activeHash))
      if (hashItem) setActiveId(hashItem.title)
    } else {
      setActiveId(navigationItems[0]?.title || "")
    }
  }, [pathname, activeHash])

  // Update active pill position and size
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current || !pillRef.current) return

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

    updatePill()
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
    <header className="absolute inset-x-0 top-0 z-50 pt-6 w-full" data-intro-header>
      <Container>
        {/* Single Cohesive Liquid Glass Capsule Navbar */}
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          className="liquid-nav theme-glass-dark p-2 flex items-center justify-between gap-4 w-full"
        >
          {/* Glare effect */}
          <div className="liquid-glare-container">
            <div ref={glareRef} className="liquid-glare" />
          </div>

          {/* Left Block: Logo (framed within the same capsule) */}
          <div className="flex items-center pl-3 pr-2 border-r border-white/10">
            <AnuLogo className="h-8" />
          </div>

          {/* Center Block: Main Navigation Links (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-1 relative flex-1 pl-2">
            <div ref={pillRef} className="active-pill" />
            
            {navigationItems.map((item) => {
              const isActive = activeId === item.title
              const Icon = iconsMap[item.title]

              if (!item.available) return null

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  data-nav-id={item.title}
                  className={cn(
                    "nav-btn relative flex h-10 items-center justify-center rounded-full px-5 font-heading font-medium text-sm transition-colors duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive ? "active text-[var(--icon-active)]" : "text-[var(--icon-color)] hover:text-[var(--icon-active)]"
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

          {/* Right Block: Distinct Solid CTA Button (Desktop Only) */}
          <div className="hidden lg:block pr-1.5">
            <Link
              href="/contact"
              className="mono-label flex h-10 items-center justify-center rounded-full bg-white text-[var(--color-abyssal-ink)] px-6 text-xs font-bold shadow-sm transition-all duration-200 hover:bg-slate-100 active:scale-95"
            >
              WORK WITH ANU
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden pr-1.5 flex items-center">
            <MobileNavSheet items={navigationItems} />
          </div>
        </div>
      </Container>
    </header>
  )
}
