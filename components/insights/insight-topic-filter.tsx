"use client"

import { useState } from "react"
import { Menu } from "@base-ui/react/menu"
import { CheckIcon, ChevronDownIcon, ListFilterIcon } from "lucide-react"

import { categoryLabels, insightCategories } from "@/lib/content/insights"
import type { Locale } from "@/lib/i18n"

export type InsightFilterCategory = (typeof insightCategories)[number]

type InsightTopicFilterProps = {
  locale: Locale
  value: InsightFilterCategory
  counts: Record<InsightFilterCategory, number>
  label: string
  accessibleLabel: string
  onValueChange: (category: InsightFilterCategory) => void
}

export function InsightTopicFilter({
  locale,
  value,
  counts,
  label,
  accessibleLabel,
  onValueChange,
}: InsightTopicFilterProps) {
  const isRtl = locale === "ar"
  const [open, setOpen] = useState(false)
  const numberFormat = new Intl.NumberFormat(isRtl ? "ar-IQ" : "en-GB")
  const activeLabel = categoryLabels[value][locale]

  return (
    <Menu.Root modal={false} open={open} onOpenChange={setOpen}>
      <Menu.Trigger
        aria-label={`${accessibleLabel}: ${activeLabel}`}
        onClick={() => {
          if (!open) setOpen(true)
        }}
        className="group inline-grid min-h-12 min-w-[min(100%,17rem)] grid-cols-[auto_1fr_auto] items-center gap-3 border border-[var(--color-lichen)] bg-white px-3 text-start transition-colors outline-none hover:border-[var(--color-graphite)] focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-offset-2 data-popup-open:border-[var(--color-abyssal-ink)] sm:min-w-64"
      >
        <span className="grid size-8 place-items-center bg-[var(--color-abyssal-ink)] text-white">
          <ListFilterIcon aria-hidden="true" className="size-3.5" />
        </span>
        <span className="min-w-0">
          <span className="mono-label block text-[var(--color-graphite)]">
            {label}
          </span>
          <span className="mt-0.5 block truncate text-sm font-medium text-[var(--color-abyssal-ink)]">
            {activeLabel}
          </span>
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-data-popup-open:rotate-180"
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end" className="z-[70]">
          <Menu.Popup
            dir={isRtl ? "rtl" : "ltr"}
            className="w-[min(24rem,calc(100vw-2rem))] origin-[var(--transform-origin)] border border-[var(--color-abyssal-ink)] bg-white p-2 shadow-[0_18px_50px_rgba(10,28,63,0.14)] transition duration-150 outline-none data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            <Menu.RadioGroup
              value={value}
              onValueChange={(nextValue) => {
                onValueChange(nextValue as InsightFilterCategory)
                setOpen(false)
              }}
              className="grid gap-px"
            >
              <Menu.GroupLabel className="mono-label px-3 pt-2 pb-3 text-[var(--color-graphite)]">
                {accessibleLabel}
              </Menu.GroupLabel>
              {insightCategories.map((category) => (
                <Menu.RadioItem
                  key={category}
                  value={category}
                  closeOnClick
                  label={categoryLabels[category][locale]}
                  className="group/item grid min-h-11 cursor-default grid-cols-[1fr_auto_auto] items-center gap-3 px-3 text-sm text-[var(--color-abyssal-ink)] transition-colors outline-none data-highlighted:bg-[var(--color-bone-white)] data-[checked]:bg-[color-mix(in_srgb,var(--color-bioluminescent-lime)_12%,white)]"
                >
                  <span className="font-medium">
                    {categoryLabels[category][locale]}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mono-label text-[var(--color-graphite)] tabular-nums"
                  >
                    {numberFormat.format(counts[category])}
                  </span>
                  <span className="grid size-5 place-items-center border border-[var(--color-lichen)] text-[var(--color-abyssal-ink)] group-data-[checked]/item:border-[var(--color-bioluminescent-lime)] group-data-[checked]/item:bg-[var(--color-bioluminescent-lime)] group-data-[checked]/item:text-white">
                    <Menu.RadioItemIndicator>
                      <CheckIcon aria-hidden="true" className="size-3" />
                    </Menu.RadioItemIndicator>
                  </span>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
