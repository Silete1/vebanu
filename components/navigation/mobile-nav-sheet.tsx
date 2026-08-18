"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRightIcon, MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import type { NavigationItem } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { siteCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath, switchLocalePath } from "@/lib/i18n"
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
  locale: Locale
}

export function MobileNavSheet({ items, locale }: MobileNavSheetProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const copy = siteCopy[locale]
  const targetLocale: Locale = locale === "ar" ? "en" : "ar"

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="secondary"
            size="icon"
            className="size-12 rounded-[14px] border border-black/8 bg-white/94 shadow-[0_14px_30px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md xl:hidden"
            aria-label={copy.openNavigation}
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent
        className="gap-0 rounded-[20px] border border-white/12 bg-[var(--color-abyssal-ink)] px-0 text-white shadow-[0_32px_90px_-32px_rgba(0,0,0,0.8)] data-[side=left]:inset-y-2 data-[side=left]:left-2 data-[side=left]:h-auto data-[side=left]:w-[calc(100%-1rem)] data-[side=left]:max-w-[420px] data-[side=right]:inset-y-2 data-[side=right]:right-2 data-[side=right]:h-auto data-[side=right]:w-[calc(100%-1rem)] data-[side=right]:max-w-[420px]"
        side={locale === "ar" ? "left" : "right"}
      >
        <SheetHeader className="border-b border-white/14 px-6 py-6 pe-16">
          <SheetTitle className="text-[2rem] leading-none tracking-[-0.025em] text-white">
            {copy.exploreTitle}
          </SheetTitle>
          <SheetDescription className="mt-2 text-white/62">
            {copy.exploreDescription}
          </SheetDescription>
        </SheetHeader>
        <nav
          aria-label={copy.mobileNavigation}
          className="flex flex-1 flex-col px-4 py-4"
        >
          <div className="flex flex-col">
            {items.map((item) => {
              const route = item.href.split("#")[0] || "/"
              const isActive =
                (pathname === `/${locale}` && item.href.endsWith("#work")) ||
                (!item.href.includes("#") && pathname === route) ||
                (route !== "/" && pathname.startsWith(`${route}/`))

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
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex min-h-14 items-center justify-between border-b border-white/12 px-2 text-[clamp(1.45rem,5vw,1.8rem)] leading-none tracking-[-0.025em] text-white transition-colors outline-none hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
                    isActive ? "text-blue-300" : "text-white"
                  )}
                >
                  {item.title}
                  <ArrowUpRightIcon
                    className="size-4 text-white/46 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </div>
          <div className="mt-auto pt-8">
            <Link
              href={switchLocalePath(pathname, targetLocale)}
              hrefLang={targetLocale}
              lang={targetLocale === "ar" ? "ar-IQ" : "en-IQ"}
              onClick={() => setOpen(false)}
              className="mono-label mb-3 flex min-h-12 w-full items-center justify-between rounded-[14px] border border-white/18 px-5 text-white/80 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={copy.languageLabel}
            >
              {copy.languageName}
              <ArrowUpRightIcon
                className="size-4 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={localizedPath(locale, "/#assessment")}
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "flex min-h-12 w-full justify-between rounded-[14px] bg-blue-600 px-5 text-white hover:bg-blue-500"
              )}
            >
              {copy.startAssessment}
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
