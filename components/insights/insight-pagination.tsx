"use client"

import { useState } from "react"
import { Menu } from "@base-ui/react/menu"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
} from "lucide-react"

import type { Locale } from "@/lib/i18n"

type InsightPaginationProps = {
  locale: Locale
  currentPage: number
  pageCount: number
  pageLabel: string
  previousLabel: string
  nextLabel: string
  paginationLabel: string
  choosePageLabel: string
  onPageChange: (page: number) => void
}

export function InsightPagination({
  locale,
  currentPage,
  pageCount,
  pageLabel,
  previousLabel,
  nextLabel,
  paginationLabel,
  choosePageLabel,
  onPageChange,
}: InsightPaginationProps) {
  const isRtl = locale === "ar"
  const [open, setOpen] = useState(false)
  const numberFormat = new Intl.NumberFormat(isRtl ? "ar-IQ" : "en-GB", {
    minimumIntegerDigits: 2,
  })
  const progress = `${(currentPage / pageCount) * 100}%`

  return (
    <nav
      aria-label={paginationLabel}
      className="mt-14 grid grid-cols-[1fr_auto_1fr] items-stretch border-y border-[var(--color-abyssal-ink)]"
    >
      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group mono-label inline-flex min-h-16 w-fit items-center gap-3 px-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-30 sm:px-4"
      >
        <ArrowLeftIcon
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-x-1 group-disabled:translate-x-0 rtl:-scale-x-100 rtl:group-hover:translate-x-1"
        />
        <span className="hidden sm:inline">{previousLabel}</span>
      </button>

      <Menu.Root modal={false} open={open} onOpenChange={setOpen}>
        <Menu.Trigger
          aria-label={`${choosePageLabel}: ${numberFormat.format(currentPage)} / ${numberFormat.format(pageCount)}`}
          onClick={() => {
            if (!open) setOpen(true)
          }}
          className="group relative flex min-h-16 min-w-36 items-center justify-center gap-3 border-x border-[var(--color-lichen)] px-4 transition-colors outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-inset data-popup-open:bg-white sm:min-w-52 sm:px-7"
        >
          <span className="text-start">
            <span className="mono-label block text-[var(--color-graphite)]">
              {pageLabel}
            </span>
            <span className="mt-1 block text-base font-medium text-[var(--color-abyssal-ink)] tabular-nums">
              {numberFormat.format(currentPage)}
              <span className="mx-1.5 text-[var(--color-lichen)]">/</span>
              {numberFormat.format(pageCount)}
            </span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-data-popup-open:rotate-180"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-lichen)]"
          >
            <span
              className="block h-full bg-[var(--color-bioluminescent-lime)] transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: progress }}
            />
          </span>
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="center" className="z-[70]">
            <Menu.Popup
              dir={isRtl ? "rtl" : "ltr"}
              className="w-[min(23rem,calc(100vw-2rem))] origin-[var(--transform-origin)] border border-[var(--color-abyssal-ink)] bg-white p-3 shadow-[0_18px_50px_rgba(10,28,63,0.14)] transition duration-150 outline-none data-ending-style:translate-y-1 data-ending-style:opacity-0 data-starting-style:translate-y-1 data-starting-style:opacity-0 motion-reduce:transition-none"
            >
              <Menu.RadioGroup
                value={currentPage}
                onValueChange={(nextValue) => {
                  onPageChange(Number(nextValue))
                  setOpen(false)
                }}
                className="grid max-h-72 grid-cols-4 gap-1 overflow-y-auto pe-1 sm:grid-cols-5"
              >
                <Menu.GroupLabel className="mono-label col-span-full px-1 pt-1 pb-3 text-[var(--color-graphite)]">
                  {choosePageLabel}
                </Menu.GroupLabel>
                {Array.from({ length: pageCount }, (_, index) => {
                  const page = index + 1

                  return (
                    <Menu.RadioItem
                      key={page}
                      value={page}
                      closeOnClick
                      label={`${pageLabel} ${numberFormat.format(page)}`}
                      className="group/item relative grid aspect-square min-h-12 cursor-default place-items-center border border-[var(--color-lichen)] text-sm font-medium text-[var(--color-abyssal-ink)] tabular-nums transition-colors outline-none data-highlighted:border-[var(--color-abyssal-ink)] data-highlighted:bg-[var(--color-bone-white)] data-[checked]:border-[var(--color-abyssal-ink)] data-[checked]:bg-[var(--color-abyssal-ink)] data-[checked]:text-white"
                    >
                      {numberFormat.format(page)}
                      <Menu.RadioItemIndicator className="absolute end-1.5 top-1.5">
                        <CheckIcon aria-hidden="true" className="size-2.5" />
                      </Menu.RadioItemIndicator>
                    </Menu.RadioItem>
                  )
                })}
              </Menu.RadioGroup>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="group mono-label inline-flex min-h-16 w-fit items-center gap-3 justify-self-end px-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-30 sm:px-4"
      >
        <span className="hidden sm:inline">{nextLabel}</span>
        <ArrowRightIcon
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-1 group-disabled:translate-x-0 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        />
      </button>
    </nav>
  )
}
