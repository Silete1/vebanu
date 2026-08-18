import { cn } from "@/lib/utils"
import type { InsightVisual as InsightVisualName } from "@/lib/content/insights"
import type { Locale } from "@/lib/i18n"

type InsightVisualProps = {
  variant: InsightVisualName
  alt: string
  className?: string
  dark?: boolean
  locale?: Locale
}

const cells = Array.from({ length: 24 })

export function InsightVisual({
  variant,
  alt,
  className,
  dark = false,
  locale = "en",
}: InsightVisualProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "group/visual relative isolate min-h-64 overflow-hidden border",
        dark
          ? "border-white/16 bg-[var(--color-abyssal-ink)] text-white"
          : "border-[var(--color-lichen)] bg-[var(--color-tissue)] text-[var(--color-abyssal-ink)]",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage: dark
            ? "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)"
            : "linear-gradient(rgba(9,11,17,.075) 1px, transparent 1px), linear-gradient(90deg, rgba(9,11,17,.075) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <span className="mono-label absolute start-5 top-5 z-10 opacity-55">
        {locale === "ar" ? "أنو / رؤية" : "ANU / FIELD NOTE"}
      </span>
      <span className="mono-label absolute end-5 bottom-5 z-10 opacity-55">
        {locale === "ar" ? visualCodeAr[variant] : visualCode[variant]}
      </span>

      <VisualComposition variant={variant} dark={dark} locale={locale} />
    </div>
  )
}

const visualCode: Record<InsightVisualName, string> = {
  "control-loop": "CONTROL",
  "inventory-ledger": "STOCK",
  "management-dashboard": "VISIBILITY",
  "approval-flow": "APPROVAL",
  "module-map": "CONFIGURATION",
  "process-map": "PROCESS",
  "single-source": "EVIDENCE",
  "ownership-model": "OWNERSHIP",
}

const visualCodeAr: Record<InsightVisualName, string> = {
  "control-loop": "رقابة",
  "inventory-ledger": "مخزون",
  "management-dashboard": "إدارة",
  "approval-flow": "موافقة",
  "module-map": "وحدات",
  "process-map": "عملية",
  "single-source": "مصدر واحد",
  "ownership-model": "مسؤولية",
}

function VisualComposition({
  variant,
  dark,
  locale,
}: {
  variant: InsightVisualName
  dark: boolean
  locale: Locale
}) {
  const line = dark ? "bg-white/28" : "bg-[var(--color-graphite)]/35"
  const panel = dark
    ? "border-white/20 bg-white/5"
    : "border-[var(--color-graphite)]/25 bg-white/72"

  if (variant === "inventory-ledger") {
    return (
      <div
        className="absolute inset-x-[10%] top-[24%] bottom-[18%] grid grid-cols-6 gap-2"
        aria-hidden="true"
      >
        {cells.map((_, index) => (
          <span
            key={index}
            className={cn(
              "border transition-transform duration-500 group-hover/visual:-translate-y-1",
              panel,
              [3, 10, 16].includes(index) &&
                "bg-[var(--color-bioluminescent-lime)]",
              index === 10 && "row-span-2"
            )}
            style={{ transitionDelay: `${(index % 6) * 18}ms` }}
          />
        ))}
      </div>
    )
  }

  if (variant === "management-dashboard") {
    return (
      <div
        className="absolute inset-x-[9%] top-[25%] bottom-[18%] grid grid-cols-12 grid-rows-6 gap-2"
        aria-hidden="true"
      >
        <span className={cn("col-span-7 row-span-3 border p-4", panel)}>
          <span className="block h-1/2 w-2/5 bg-[var(--color-bioluminescent-lime)]" />
          <span className={cn("mt-3 block h-px w-full", line)} />
        </span>
        <span className={cn("col-span-5 row-span-3 border p-4", panel)}>
          <span className={cn("block h-px w-full", line)} />
          <span className={cn("mt-4 block h-px w-3/5", line)} />
          <span className="mt-4 block h-2 w-2 rounded-full bg-[var(--color-bioluminescent-lime)]" />
        </span>
        <span className={cn("col-span-4 row-span-3 border", panel)} />
        <span className={cn("col-span-8 row-span-3 border", panel)} />
      </div>
    )
  }

  if (variant === "approval-flow" || variant === "process-map") {
    const branching = variant === "process-map"
    return (
      <div
        className="absolute inset-x-[8%] top-[25%] bottom-[18%]"
        aria-hidden="true"
      >
        <span className={cn("absolute inset-x-0 top-1/2 h-px", line)} />
        {branching ? (
          <span
            className={cn("absolute top-1/2 left-1/2 h-[32%] w-px", line)}
          />
        ) : null}
        {[10, 38, 68, 92].map((position, index) => (
          <span
            key={position}
            className={cn(
              "absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center border transition-transform duration-500 group-hover/visual:scale-105",
              panel,
              index === 2 &&
                "border-[var(--color-bioluminescent-lime)] bg-[var(--color-bioluminescent-lime)] text-white"
            )}
            style={{ left: `${position}%` }}
          >
            <span className="mono-label text-[10px]">0{index + 1}</span>
          </span>
        ))}
        {branching ? (
          <span
            className={cn(
              "absolute bottom-0 left-1/2 grid h-12 w-24 -translate-x-1/2 place-items-center border",
              panel
            )}
          >
            <span className="mono-label text-[9px]">
              {locale === "ar" ? "استثناء" : "EXCEPTION"}
            </span>
          </span>
        ) : null}
      </div>
    )
  }

  if (variant === "module-map") {
    return (
      <div
        className="absolute inset-x-[10%] top-[25%] bottom-[18%] grid grid-cols-3 gap-3"
        aria-hidden="true"
      >
        {["STANDARD", "RULE", "CUSTOM"].map((label, index) => (
          <span
            key={label}
            className={cn("flex flex-col justify-end border p-4", panel)}
          >
            <span
              className={cn(
                "mb-auto block h-2",
                index === 1
                  ? "w-full bg-[var(--color-bioluminescent-lime)]"
                  : "w-2/5 bg-current opacity-25"
              )}
            />
            <span className="mono-label text-[9px] opacity-65">{label}</span>
          </span>
        ))}
      </div>
    )
  }

  if (variant === "single-source") {
    return (
      <div
        className="absolute inset-x-[8%] top-[24%] bottom-[18%]"
        aria-hidden="true"
      >
        {[22, 50, 78].map((position) => (
          <span
            key={position}
            className={cn("absolute start-0 h-px w-1/2 origin-left", line)}
            style={{ top: `${position}%`, rotate: `${(50 - position) / 3}deg` }}
          />
        ))}
        <span className="absolute end-[8%] top-1/2 grid size-32 -translate-y-1/2 place-items-center border border-[var(--color-bioluminescent-lime)] bg-[var(--color-bioluminescent-lime)] text-center text-white">
          <span className="mono-label max-w-20 text-[9px]">
            ONE GOVERNED RECORD
          </span>
        </span>
      </div>
    )
  }

  if (variant === "ownership-model") {
    return (
      <div
        className="absolute inset-x-[12%] top-[25%] bottom-[18%]"
        aria-hidden="true"
      >
        <span className={cn("absolute top-0 left-1/2 h-full w-px", line)} />
        <span className={cn("absolute inset-x-0 top-1/2 h-px", line)} />
        {(locale === "ar"
          ? ["الإدارة", "العملية", "المنصة"]
          : ["LEADER", "PROCESS", "PLATFORM"]
        ).map((label, index) => (
          <span
            key={label}
            className={cn(
              "absolute grid h-14 w-28 place-items-center border",
              panel,
              index === 1 && "border-[var(--color-bioluminescent-lime)]"
            )}
            style={{
              left: index === 0 ? "0" : index === 1 ? "50%" : "auto",
              right: index === 2 ? "0" : "auto",
              top:
                index === 1
                  ? "calc(50% - 28px)"
                  : index === 0
                    ? "0"
                    : "calc(100% - 56px)",
              transform: index === 1 ? "translateX(-50%)" : undefined,
            }}
          >
            <span className="mono-label text-[9px]">{label}</span>
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      className="absolute inset-x-[9%] top-[24%] bottom-[18%]"
      aria-hidden="true"
    >
      <span className="absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-bioluminescent-lime)] transition-transform duration-700 group-hover/visual:rotate-12" />
      <span
        className={cn(
          "absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border",
          dark ? "border-white/24" : "border-[var(--color-graphite)]/35"
        )}
      />
      <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center bg-[var(--color-bioluminescent-lime)] text-white">
        <span className="mono-label text-[9px]">
          {locale === "ar" ? "رقابة" : "CONTROL"}
        </span>
      </span>
      {[0, 90, 180, 270].map((rotation) => (
        <span
          key={rotation}
          className={cn(
            "absolute top-1/2 left-1/2 h-px w-[34%] origin-left",
            line
          )}
          style={{ rotate: `${rotation}deg` }}
        />
      ))}
    </div>
  )
}
