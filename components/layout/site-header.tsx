"use client"

import { useEffect, useState } from "react"
import { navigationItems } from "@/lib/navigation"
import { AnuLogo } from "@/components/brand/anu-logo"
import { Container } from "@/components/layout/container"
import { MainNav } from "@/components/navigation/main-nav"
import { MobileNavSheet } from "@/components/navigation/mobile-nav-sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Toggle scrolled state
      setIsScrolled(currentScrollY > 25)

      // Toggle show/hide state based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false) // Scrolling down - hide
      } else {
        setIsVisible(true) // Scrolling up - show
      }

      setLastScrollY(currentScrollY)
    };

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-white/90 py-3 border-b border-slate-100 shadow-sm backdrop-blur-md"
          : "py-6 bg-transparent"
      )}
      data-intro-header
    >
      <Container className="flex items-center justify-between gap-4">
        {/* Logo wrapper - frames the black text logo in a white capsule at the top */}
        <div
          className={cn(
            "rounded-xl px-4 py-2 transition-all duration-300",
            isScrolled
              ? "bg-transparent shadow-none"
              : "bg-white shadow-sm border border-slate-200/20"
          )}
        >
          <AnuLogo />
        </div>

        {/* Main Navigation */}
        <div className="hidden lg:block">
          <MainNav items={navigationItems} isScrolled={isScrolled} />
        </div>

        {/* Right Call-To-Action buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="lg"
            className={cn(
              "hidden transition-all duration-300 lg:inline-flex",
              isScrolled
                ? "bg-[var(--color-abyssal-ink)] text-white hover:bg-slate-800"
                : "bg-white text-[var(--color-abyssal-ink)] hover:bg-slate-100 shadow-sm border border-slate-200/20"
            )}
          >
            WORK WITH ANU
          </Button>
          
          <div
            className={cn(
              "rounded-xl p-1 transition-all duration-300",
              !isScrolled && "bg-white shadow-sm border border-slate-200/20"
            )}
          >
            <MobileNavSheet items={navigationItems} />
          </div>
        </div>
      </Container>
    </header>
  )
}
