import Link from "next/link"
import Image from "next/image"
import logoImg from "./anu_logo.png"

import { cn } from "@/lib/utils"

type AnuLogoProps = {
  align?: "left" | "right"
  className?: string
  compact?: boolean
  href?: string
  label?: string
  theme?: "dark" | "light"
}

export function AnuLogo({
  align = "left",
  className,
  compact = false,
  href = "/",
  label = "ANU Software Solutions",
  theme = "light",
}: AnuLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "pointer-events-auto flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <span
        className={cn(
          "anu-logo-flip relative block overflow-hidden",
          theme === "dark" ? "anu-logo-flip-dark" : "anu-logo-flip-light",
          compact
            ? "h-20 w-[264px] md:h-[88px] md:w-[300px]"
            : "h-[88px] w-[292px] md:h-[104px] md:w-[352px]"
        )}
      >
        <span className="anu-logo-flip-inner">
          <Image
            src={logoImg}
            alt={label}
            width={160}
            height={48}
            className={cn(
              "anu-logo-face anu-logo-face-front absolute inset-0 h-full w-full object-contain",
              align === "right" ? "object-right" : "object-left"
            )}
            priority
          />
          <Image
            src={logoImg}
            alt=""
            aria-hidden="true"
            width={160}
            height={48}
            className={cn(
              "anu-logo-monochrome anu-logo-face anu-logo-face-back absolute inset-0 h-full w-full object-contain",
              align === "right" ? "object-right" : "object-left"
            )}
            priority
          />
        </span>
      </span>
    </Link>
  )
}
