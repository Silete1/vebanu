import { existsSync } from "node:fs"
import { join } from "node:path"

import { cn } from "@/lib/utils"

type PosterProps = {
  /** path without extension, e.g. /media/systems/workshops — 1600 w and -800 w renders in AVIF and WebP */
  src: string
  alt: string
  className?: string
  /** the page's largest picture: load it first */
  priority?: boolean
  sizes?: string
}

/**
 * A pre-rendered picture (scripts/blender) as AVIF with a WebP fallback, at two
 * widths. Until a render exists the ANU line network stands in, so a page is
 * never broken by a missing picture.
 */
export function Poster({ src, alt, className, priority = false, sizes = "(min-width: 64rem) 50vw, 100vw" }: PosterProps) {
  const rendered = existsSync(join(process.cwd(), "public", `${src}.avif`))

  if (!rendered) {
    return (
      <div className={cn("anu-poster anu-poster--network", className)} role="img" aria-label={alt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/anu_network.svg" alt="" width={640} height={420} />
      </div>
    )
  }

  return (
    <picture className={cn("anu-poster", className)}>
      <source type="image/avif" srcSet={`${src}-800.avif 800w, ${src}.avif 1600w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${src}-800.webp 800w, ${src}.webp 1600w`} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${src}-800.webp`}
        alt={alt}
        width={1600}
        height={1000}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  )
}
