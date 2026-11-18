"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useEffect } from "react"

import { type Locale, switchLocalePath } from "@/lib/i18n"

/**
 * The few things the frame needs from the browser: which section is on show,
 * the same page in the other language, closing the phone menu after a move,
 * and the pointer light. Everything else in the header is server HTML.
 */

export function NavLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const pathname = usePathname()
  const current = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link href={href} className={className} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  )
}

export function LanguageLink({
  locale,
  className,
  label,
  children,
}: {
  locale: Locale
  className?: string
  label: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const other: Locale = locale === "ar" ? "en" : "ar"

  return (
    <Link
      href={switchLocalePath(pathname, other)}
      className={className}
      hrefLang={other}
      lang={other}
      aria-label={label}
      prefetch={false}
    >
      {children}
    </Link>
  )
}

export function HeaderLive() {
  const pathname = usePathname()
  const router = useRouter()

  // 3D scenes ask for a move with an "anu:navigate" event ({ detail: { href } }),
  // so a click on a slab is a soft navigation like any link
  useEffect(() => {
    const onNavigate = (event: Event) => {
      const href = (event as CustomEvent<{ href?: string }>).detail?.href
      if (href?.startsWith("/")) router.push(href)
    }
    window.addEventListener("anu:navigate", onNavigate)
    return () => window.removeEventListener("anu:navigate", onNavigate)
  }, [router])

  // a move closes the phone menu
  useEffect(() => {
    const menu = document.getElementById("anu-menu")
    if (menu?.matches(":popover-open")) menu.hidePopover()
  }, [pathname])

  // the pointer light: one listener for the page; each .anu-lit surface gets
  // the pointer's position in its own box, once per frame
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)")
    const calm = matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || calm.matches) return

    let frame = 0
    let last: PointerEvent | null = null

    const paint = () => {
      frame = 0
      if (!last) return
      const target = (last.target as Element | null)?.closest<HTMLElement>(".anu-lit")
      if (!target) return
      const box = target.getBoundingClientRect()
      target.style.setProperty("--lx", `${last.clientX - box.left}px`)
      target.style.setProperty("--ly", `${last.clientY - box.top}px`)
    }

    const onMove = (event: PointerEvent) => {
      last = event
      if (!frame) frame = requestAnimationFrame(paint)
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
