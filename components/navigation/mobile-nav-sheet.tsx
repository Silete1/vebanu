"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import type { NavigationItem } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type MobileNavSheetProps = {
  items: NavigationItem[]
}

export function MobileNavSheet({ items }: MobileNavSheetProps) {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="secondary"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="w-[88vw] max-w-sm bg-[var(--color-bone-white)] px-0" side="right">
        <SheetHeader className="border-b border-border px-5 pb-4">
          <SheetTitle className="text-3xl tracking-[-0.02em]">
            Navigation
          </SheetTitle>
          <SheetDescription>
            ANU Software Solutions
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col px-3 py-4">
          <div className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = pathname === item.href

              if (!item.available) {
                return (
                  <span
                    key={item.title}
                    className="mono-label rounded-xl px-4 py-3 text-[var(--color-graphite)]"
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
                    "mono-label rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-[var(--color-graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "bg-[var(--color-bioluminescent-lime)] text-white"
                      : "text-[var(--color-graphite)]"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
          <div className="mt-auto px-2 pt-6">
            <span
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "flex w-full justify-center"
              )}
              aria-disabled="true"
            >
              WORK WITH ANU
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
