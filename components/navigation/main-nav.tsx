"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavigationItem } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type MainNavProps = {
  items: NavigationItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-auto hidden items-center gap-1 rounded-xl bg-[var(--color-frost)] p-1 lg:flex"
    >
      {items.map((item) => {
        const isActive = pathname === item.href

        if (!item.available) {
          return (
            <span
              key={item.title}
              className="mono-label rounded-lg border border-transparent px-5 py-3 text-[var(--color-graphite)]"
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
              "mono-label rounded-lg border border-transparent px-5 py-3 text-current transition-colors hover:border-[var(--color-lichen)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive ? "bg-[var(--color-bioluminescent-lime)] text-[var(--color-abyssal-ink)]" : undefined
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
