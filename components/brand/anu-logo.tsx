import Link from "next/link"
import Image from "next/image"
import logoImg from "./anu_logo.png"

import { cn } from "@/lib/utils"

type AnuLogoProps = {
  className?: string
}

export function AnuLogo({ className }: AnuLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "pointer-events-auto flex items-center outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <Image
        src={logoImg}
        alt="ANU Software Solutions"
        width={120}
        height={36}
        className="h-9 w-auto object-contain"
        priority
      />
    </Link>
  )
}
