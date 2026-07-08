import Link from "next/link"
import Image from "next/image"
import logoImg from "./anu_logo.png"

import { cn } from "@/lib/utils"

type AnuLogoProps = {
  className?: string
  compact?: boolean
  theme?: "dark" | "light"
}

export function AnuLogo({
  className,
  compact = false,
  theme = "light",
}: AnuLogoProps) {
  return (
    <Link
      href="/"
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
            ? "h-9 w-[112px] md:h-10 md:w-[124px]"
            : "h-10 w-[124px] md:h-11 md:w-[144px]"
        )}
      >
        <span className="anu-logo-flip-inner">
          <Image
            src={logoImg}
            alt="ANU Software Solutions"
            width={160}
            height={48}
            className="anu-logo-face anu-logo-face-front absolute inset-0 h-full w-full object-contain object-left"
            priority
          />
          <Image
            src={logoImg}
            alt=""
            aria-hidden="true"
            width={160}
            height={48}
            className="anu-logo-monochrome anu-logo-face anu-logo-face-back absolute inset-0 h-full w-full object-contain object-left"
            priority
          />
        </span>
      </span>
    </Link>
  )
}
