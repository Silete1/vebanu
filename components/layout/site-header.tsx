"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRightIcon } from "lucide-react"

import { AnuLogo } from "@/components/brand/anu-logo"
import { navigationItems } from "@/lib/navigation"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type HeaderTheme = "dark" | "light"

const availableItems = navigationItems.filter((item) => item.available)

export function SiteHeader() {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash
  )
  const [scrollActiveId, setScrollActiveId] = useState("")
  const [previewId, setPreviewId] = useState("")
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>("dark")
  const [isCompact, setIsCompact] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    let frame = 0

    const updateLogoTheme = () => {
      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        const rect = logoRef.current?.getBoundingClientRect()
        const x = rect ? rect.left + rect.width / 2 : 48
        const y = rect ? rect.top + rect.height / 2 : 48
        const section = document
          .elementsFromPoint(x, y)
          .map((element) =>
            element instanceof HTMLElement
              ? element.closest<HTMLElement>("[data-header-theme]")
              : null
          )
          .find(Boolean)

        const nextTheme =
          section?.dataset.headerTheme === "light" ? "light" : "dark"
        document.documentElement.dataset.logoTheme = nextTheme
        setHeaderTheme((currentTheme) =>
          currentTheme === nextTheme ? currentTheme : nextTheme
        )
      })
    }

    updateLogoTheme()
    window.addEventListener("scroll", updateLogoTheme, { passive: true })
    document.addEventListener("scroll", updateLogoTheme, {
      passive: true,
      capture: true,
    })
    window.addEventListener("resize", updateLogoTheme)
    const interval = window.setInterval(updateLogoTheme, 200)

    return () => {
      cancelAnimationFrame(frame)
      window.clearInterval(interval)
      window.removeEventListener("scroll", updateLogoTheme)
      document.removeEventListener("scroll", updateLogoTheme, {
        capture: true,
      })
      window.removeEventListener("resize", updateLogoTheme)
    }
  }, [pathname])

  const currentFullHref = pathname + activeHash
  const matchedRouteItem = availableItems.find(
    (item) => item.href === currentFullHref || item.href === activeHash
  )
  const matchedHashItem = activeHash
    ? availableItems.find((item) => item.href.endsWith(activeHash))
    : null
  const routeActiveId =
    matchedRouteItem?.title ??
    matchedHashItem?.title ??
    availableItems[0]?.title ??
    ""
  const activeId =
    pathname === "/" ? scrollActiveId || routeActiveId : routeActiveId
  const displayId = previewId || activeId

  useEffect(() => {
    const updateMarker = () => {
      if (!navRef.current || !lineRef.current) return

      const activeLink = navRef.current.querySelector(
        `[data-nav-id="${displayId}"]`
      ) as HTMLElement | null

      if (!activeLink) {
        lineRef.current.style.opacity = "0"
        return
      }

      const left = activeLink.offsetLeft
      const width = activeLink.offsetWidth

      lineRef.current.style.width = `${Math.max(24, width - 18)}px`
      lineRef.current.style.transform = `translateX(${left + 9}px)`
      lineRef.current.style.opacity = "1"
    }

    updateMarker()
    window.addEventListener("resize", updateMarker)
    return () => window.removeEventListener("resize", updateMarker)
  }, [displayId, isCompact])

  useGSAP(
    () => {
      availableItems.forEach((item) => {
        const id = item.href.replace("/#", "")
        if (!id || !item.href.startsWith("/#")) return

        const section = document.getElementById(id)
        if (!section) return

        ScrollTrigger.create({
          trigger: section,
          start: "top top+=140",
          end: "bottom top+=140",
          onEnter: () => {
            if (pathname === "/") setScrollActiveId(item.title)
            const nextTheme =
              section.dataset.headerTheme === "light" ? "light" : "dark"
            document.documentElement.dataset.logoTheme = nextTheme
            setHeaderTheme(nextTheme)
          },
          onEnterBack: () => {
            if (pathname === "/") setScrollActiveId(item.title)
            const nextTheme =
              section.dataset.headerTheme === "light" ? "light" : "dark"
            document.documentElement.dataset.logoTheme = nextTheme
            setHeaderTheme(nextTheme)
          },
        })
      })

      ScrollTrigger.create({
        start: 52,
        end: "max",
        onEnter: () => setIsCompact(true),
        onLeaveBack: () => setIsCompact(false),
      })

      const currentActiveSection = availableItems.find((item) => {
        if (!item.href.startsWith("/#")) return false

        const id = item.href.replace("/#", "")
        const element = document.getElementById(id)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 140 && rect.bottom >= 140
      })

      if (pathname === "/" && currentActiveSection) {
        setScrollActiveId(currentActiveSection.title)
      }

      ScrollTrigger.refresh()
    },
    { scope: headerRef, dependencies: [pathname] }
  )

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full pt-5 sm:pt-6"
      data-intro-header
    >
      <div className="flex items-start justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div
          ref={logoRef}
          className={cn(
            "pointer-events-auto transition-transform duration-300",
            isCompact && "translate-y-[-1px] scale-[0.985]"
          )}
        >
          <AnuLogo
            theme={headerTheme}
            compact={isCompact}
            className="header-brand"
          />
        </div>

        <div
          className={cn(
            "header-segmented-shell header-segmented-static pointer-events-auto",
            isCompact && "header-segmented-shell-compact"
          )}
          style={{ gap: 0 }}
        >
          <nav
            className="header-segmented-nav"
            aria-label="Primary"
            style={{
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <div
              ref={navRef}
              className="header-segmented-track relative flex scrollbar-none items-stretch justify-end overflow-x-auto"
            >
              {availableItems.map((item, index) => {
                const isCurrent = activeId === item.title

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    data-nav-id={item.title}
                    onMouseEnter={() => setPreviewId(item.title)}
                    onMouseLeave={() => setPreviewId("")}
                    onFocus={() => setPreviewId(item.title)}
                    onBlur={() => setPreviewId("")}
                    className={cn(
                      "header-segmented-link relative shrink-0 px-4 py-3 text-[0.92rem] transition-colors duration-300 outline-none",
                      index !== 0 &&
                        "border-l border-[var(--header-segment-border)]",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isCurrent
                        ? "text-[var(--header-link-active)]"
                        : "text-[var(--header-link)] hover:text-[var(--header-link-active)]"
                    )}
                  >
                    {item.title}
                  </Link>
                )
              })}

              <span className="header-segmented-rail" aria-hidden="true" />
              <span
                ref={lineRef}
                className="header-segmented-line"
                aria-hidden="true"
              />
            </div>
          </nav>
          <Link
            href="/#assessment"
            className="header-segmented-cta mono-label relative shrink-0 py-3 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <span>Start assessment</span>
            <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
