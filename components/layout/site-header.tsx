"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRightIcon, LanguagesIcon } from "lucide-react"

import { AnuLogo } from "@/components/brand/anu-logo"
import { MobileNavSheet } from "@/components/navigation/mobile-nav-sheet"
import { getNavigationItems } from "@/lib/navigation"
import { siteCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath, switchLocalePath } from "@/lib/i18n"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type HeaderTheme = "dark" | "light"

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

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const copy = siteCopy[locale]
  const availableItems = getNavigationItems(locale).filter(
    (item) => item.available
  )
  const targetLocale: Locale = locale === "ar" ? "en" : "ar"
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

          const section = element.closest<HTMLElement>("[data-header-theme]")
          if (section?.dataset.headerTheme) {
            nextTheme =
              section.dataset.headerTheme === "light" ? "light" : "dark"
            break
          }

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
        const footer = document.querySelector<HTMLElement>(
          "[data-motion-footer]"
        )
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
    (item) =>
      item.href === currentFullHref ||
      item.href === activeHash ||
      (!item.href.includes("#") && pathname.startsWith(`${item.href}/`))
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
    pathname === `/${locale}` ? scrollActiveId || routeActiveId : routeActiveId
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
      const track = navRef.current
      const visibleStart = track.scrollLeft
      const visibleEnd = visibleStart + track.clientWidth

      if (left < visibleStart || left + width > visibleEnd) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches

        track.scrollTo({
          left: Math.max(0, left - (track.clientWidth - width) / 2),
          behavior: prefersReducedMotion ? "auto" : "smooth",
        })
      }

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
        const id = item.href.split("#")[1]
        if (!id) return

        const section = document.getElementById(id)
        if (!section) return

        ScrollTrigger.create({
          trigger: section,
          start: "top top+=140",
          end: "bottom top+=140",
          onEnter: () => {
            if (pathname === `/${locale}`) setScrollActiveId(item.title)
          },
          onEnterBack: () => {
            if (pathname === `/${locale}`) setScrollActiveId(item.title)
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
        if (!item.href.includes("#")) return false

        const id = item.href.split("#")[1]
        const element = document.getElementById(id)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 140 && rect.bottom >= 140
      })

      if (pathname === `/${locale}` && currentActiveSection) {
        setScrollActiveId(currentActiveSection.title)
      }

      ScrollTrigger.refresh()
    },
    { scope: headerRef, dependencies: [locale, pathname] }
  )

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full pt-5 sm:pt-6"
      style={
        pathname === `/${locale}`
          ? { opacity: 0, visibility: "hidden" }
          : undefined
      }
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
            "pointer-events-auto transition-transform duration-300"
          )}
        >
          <AnuLogo
            align={locale === "ar" ? "right" : "left"}
            href={localizedPath(locale)}
            theme={headerTheme}
            className="header-brand"
          />
        </div>

        <div
          className={cn(
            "header-segmented-shell header-segmented-static pointer-events-auto hidden xl:flex"
          )}
          style={{ gap: 0 }}
        >
          <nav
            className="header-segmented-nav"
            aria-label={copy.primaryNavigation}
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
                    aria-current={isCurrent ? "page" : undefined}
                    data-nav-id={item.title}
                    onMouseEnter={() => setPreviewId(item.title)}
                    onMouseLeave={() => setPreviewId("")}
                    onFocus={() => setPreviewId(item.title)}
                    onBlur={() => setPreviewId("")}
                    className={cn(
                      "header-segmented-link relative shrink-0 px-4 py-3 text-[0.92rem] transition-colors duration-300 outline-none",
                      index !== 0 &&
                        "border-s border-[var(--header-segment-border)]",
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
            href={`${switchLocalePath(pathname, targetLocale)}${activeHash}`}
            hrefLang={targetLocale}
            lang={targetLocale === "ar" ? "ar-IQ" : "en-IQ"}
            dir={targetLocale === "ar" ? "rtl" : "ltr"}
            className="header-language-switch mono-label shrink-0 border-s border-[var(--header-segment-border)] px-5 py-3 text-[var(--header-link)] transition-colors outline-none hover:text-[var(--header-link-active)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={copy.languageLabel}
          >
            <LanguagesIcon className="size-3.5" aria-hidden="true" />
            {copy.languageName}
          </Link>
          <Link
            href={localizedPath(locale, "/#assessment")}
            className="header-segmented-cta mono-label relative shrink-0 border-s border-[var(--header-segment-border)] py-3 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>{copy.startAssessment}</span>
            <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
        <div className="pointer-events-auto xl:hidden">
          <MobileNavSheet items={availableItems} locale={locale} />
        </div>
      </div>
    </header>
  )
}
