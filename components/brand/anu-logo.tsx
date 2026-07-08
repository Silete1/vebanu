import Link from "next/link"

import { cn } from "@/lib/utils"

type AnuLogoProps = {
  className?: string
}

export function AnuLogo({ className }: AnuLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "pointer-events-auto flex items-center gap-3 rounded-xl bg-[var(--color-frost)] px-4 py-3 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span className="mono-label flex size-7 items-center justify-center rounded-full border border-[var(--color-abyssal-ink)] text-[10px] text-[var(--color-abyssal-ink)]">
        ANU
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-2xl leading-none tracking-[-0.04em] text-current">
          ANU
        </span>
        <span className="sr-only">
          Software Solutions
        </span>
      </span>
    </Link>
  )
}
