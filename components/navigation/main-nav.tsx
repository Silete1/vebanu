"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavigationItem } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type MainNavProps = {
  items: NavigationItem[]
  isScrolled?: boolean
}

export function MainNav({ items, isScrolled = false }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "pointer-events-auto hidden items-center gap-1 rounded-xl p-1 transition-all duration-300 lg:flex",
        isScrolled
          ? "bg-slate-100/80 border border-slate-200/30"
          : "bg-black/20 backdrop-blur-md border border-white/10"
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href

        if (!item.available) {
          return (
            <span
              key={item.title}
              className={cn(
                "mono-label rounded-lg px-5 py-2.5 text-xs transition-colors",
                isScrolled ? "text-slate-400" : "text-white/40"
              )}
            >
              {item.title}
            </span>
          )
        }

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "mono-label rounded-lg px-5 py-2.5 text-xs transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-[var(--color-bioluminescent-lime)] text-white shadow-sm"
                : isScrolled
                  ? "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
