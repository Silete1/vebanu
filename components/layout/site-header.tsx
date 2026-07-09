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

function themeFromBackgroundColor(backgroundColor: string): HeaderTheme | null {
  const match = backgroundColor.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?\)/
  )

  if (!match) return null

  const [, redValue, greenValue, blueValue, alphaValue] = match
  const alpha = alphaValue === undefined ? 1 : Number(alphaValue)

  if (alpha < 0.45) return null

  const red = Number(redValue)
  const green = Number(greenValue)
  const blue = Number(blueValue)
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255

  return luminance > 0.58 ? "light" : "dark"
}

export function SiteHeader() {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")
  const [scrollActiveId, setScrollActiveId] = useState("")
  const [previewId, setPreviewId] = useState("")
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>("dark")
  const [isCompact, setIsCompact] = useState(false)
  const [isFooterCapActive, setIsFooterCapActive] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    let frame = 0

    const updateLogoTheme = () => {
      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        if (isFooterCapActive) {
          document.documentElement.dataset.logoTheme = "light"
          setHeaderTheme((currentTheme) =>
            currentTheme === "light" ? currentTheme : "light"
          )
          return
        }

        const rect = logoRef.current?.getBoundingClientRect()
        const x = rect ? rect.left + rect.width / 2 : 48
        const y = rect ? rect.top + rect.height / 2 : 48
        const elementsUnderLogo = document.elementsFromPoint(x, y)
        let nextTheme: HeaderTheme | null = null

        for (const element of elementsUnderLogo) {
          if (!(element instanceof HTMLElement)) continue
          if (
            element.dataset.headerBackdropTheme === "light" &&
            window.getComputedStyle(element).opacity !== "0"
          ) {
            nextTheme = "light"
            break
          }
          if (headerRef.current?.contains(element)) continue

          let current: HTMLElement | null = element

          while (current) {
            const sampledTheme = themeFromBackgroundColor(
              window.getComputedStyle(current).backgroundColor
            )

            if (sampledTheme) {
              nextTheme = sampledTheme
              break
            }

            current = current.parentElement
          }

          if (nextTheme) break

          const section = element.closest<HTMLElement>("[data-header-theme]")
          if (section?.dataset.headerTheme) {
            nextTheme =
              section.dataset.headerTheme === "light" ? "light" : "dark"
            break
          }
        }

        nextTheme ??= "dark"
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
  }, [isFooterCapActive, pathname])

  useEffect(() => {
    let frame = 0

    const updateFooterCap = () => {
      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        const footer = document.querySelector<HTMLElement>("[data-motion-footer]")
        const navRect = navRef.current?.getBoundingClientRect()
        const logoRect = logoRef.current?.getBoundingClientRect()
        const footerRect = footer?.getBoundingClientRect()

        if (!footerRect) {
          setIsFooterCapActive(false)
          return
        }

        const headerBottom = Math.max(
          navRect?.bottom ?? 0,
          logoRect?.bottom ?? 0,
          112
        )

        const nextFooterCapActive =
          footerRect.top <= headerBottom && footerRect.bottom > 0

        setIsFooterCapActive(nextFooterCapActive)

        if (nextFooterCapActive) {
          document.documentElement.dataset.logoTheme = "light"
          setHeaderTheme("light")
        }
      })
    }

    updateFooterCap()
    window.addEventListener("scroll", updateFooterCap, { passive: true })
    window.addEventListener("resize", updateFooterCap)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateFooterCap)
      window.removeEventListener("resize", updateFooterCap)
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
          },
          onEnterBack: () => {
            if (pathname === "/") setScrollActiveId(item.title)
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
      <span
        aria-hidden="true"
        data-header-backdrop-theme="light"
        className={cn(
          "header-light-cap",
          isFooterCapActive && "header-light-cap-active"
        )}
      />
      <div className="relative z-10 flex items-start justify-between gap-4 px-4 sm:px-6 lg:px-10">
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
