import { ArrowDownIcon, LineChartIcon } from "lucide-react"

import type { Locale } from "@/lib/i18n"
import { getLocaleAttributes, isRtlLocale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type ArchitectureStackProps = {
  items: string[]
  locale: Locale
}

const levelAccents = [
  "bg-white",
  "bg-accent",
  "bg-white",
  "bg-accent",
  "bg-white",
  "bg-accent",
]

export function ArchitectureStack({
  items,
  locale,
}: ArchitectureStackProps) {
  const localeAttributes = getLocaleAttributes(locale)
  const rtl = isRtlLocale(locale)

  return (
    <div
      {...localeAttributes}
      className="relative isolate mx-auto flex w-full max-w-[42rem] items-center justify-center"
    >
      <div className="absolute inset-x-6 inset-y-8 rounded-[2rem] border border-border bg-white" />
      <div className="absolute inset-x-10 inset-y-12 rounded-[2rem] bg-grid-subtle opacity-40" />

      <div className="relative z-10 w-full rounded-[2rem] border border-border bg-white p-3 sm:p-4">
        <div className="rounded-[calc(2rem-0.75rem)] border border-border bg-white p-4 sm:p-5">
          <div
            className={cn(
              "mb-6 flex items-center justify-between gap-3",
              rtl ? "flex-row-reverse" : undefined
            )}
          >
            <Badge
              variant="outline"
              className="border-primary/20 bg-accent text-primary"
            >
              {rtl ? "تسلسل السيطرة" : "Control sequence"}
            </Badge>
            <div
              className={cn(
                "flex items-center gap-2 text-xs text-muted-foreground",
                rtl ? "flex-row-reverse" : undefined
              )}
            >
              <LineChartIcon className="size-3.5" />
              <span>
                {rtl ? "رؤية تشغيلية" : "Operational visibility"}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-4 bottom-4 left-1/2 hidden w-px -translate-x-1/2 bg-primary/20 md:block" />
            <div className="absolute top-10 bottom-10 left-1/2 hidden w-1 -translate-x-1/2 rounded-full bg-primary/35 md:block hero-flow-pulse motion-reduce:animate-none" />

            <div className="grid gap-3">
              {items.map((item, index) => {
                const alignRight = index % 2 === 0
                const visualAlignClass = rtl
                  ? alignRight
                    ? "md:mr-0 md:ml-auto"
                    : "md:mr-auto md:ml-0"
                  : alignRight
                    ? "md:ml-0 md:mr-auto"
                    : "md:ml-auto md:mr-0"

                return (
                  <div
                    key={item}
                    className={cn(
                      "hero-stack-item relative w-full md:w-[77%]",
                      visualAlignClass
                    )}
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div
                      className={cn(
                        "rounded-[1.4rem] border border-border p-1",
                        levelAccents[index] ?? levelAccents[0]
                      )}
                    >
                      <div className="rounded-[calc(1.4rem-0.25rem)] bg-white px-4 py-3">
                        <div
                          className={cn(
                            "flex items-center gap-3",
                            rtl ? "flex-row-reverse text-right" : undefined
                          )}
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-accent text-white">
                            {index < items.length - 1 ? (
                              <ArrowDownIcon className="size-4" />
                            ) : (
                              <LineChartIcon className="size-4" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="eyebrow text-primary">
                              {rtl ? `المرحلة ${index + 1}` : `Stage ${index + 1}`}
                            </p>
                            <p className="mt-1 font-heading text-[1.25rem] leading-[0.95] text-heading uppercase sm:text-[1.4rem]">
                              {item}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
