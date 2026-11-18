import { existsSync } from "node:fs"
import { join } from "node:path"
import { preload } from "react-dom"

import { cn } from "@/lib/utils"

type PosterProps = {
  /** path without extension, e.g. /media/systems/workshops — a `width` render and a `-<small>` render, AVIF and WebP */
  src: string
  alt: string
  className?: string
  /** the page's largest picture: load it first */
  priority?: boolean
  sizes?: string
  /** the small render's width (the large one is `width`) */
  small?: number
  width?: number
  height?: number
}

/**
 * A pre-rendered picture (scripts/blender) as AVIF with a WebP fallback, at two
 * widths. Until a render exists the ANU line network stands in, so a page is
 * never broken by a missing picture.
 */
export function Poster({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 64rem) 50vw, 100vw",
  small = 800,
  width = 1600,
  height = 1000,
}: PosterProps) {
  const rendered = existsSync(join(process.cwd(), "public", `${src}.avif`)) && existsSync(join(process.cwd(), "public", `${src}-${small}.avif`))

  if (!rendered) {
    if (priority) preload("/brand/anu_network.svg", { as: "image", fetchPriority: "high" })
    return (
      <div className={cn("anu-poster anu-poster--network", className)} role="img" aria-label={alt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/anu_network.svg"
          alt=""
          width={640}
          height={420}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    )
  }

  // the page's largest picture is asked for from <head>, before the CSS is read
  if (priority) {
    preload(`${src}-${small}.avif`, {
      as: "image",
      type: "image/avif",
      imageSrcSet: `${src}-${small}.avif ${small}w, ${src}.avif ${width}w`,
      imageSizes: sizes,
      fetchPriority: "high",
    })
  }

  return (
    <picture className={cn("anu-poster", className)}>
      <source type="image/avif" srcSet={`${src}-${small}.avif ${small}w, ${src}.avif ${width}w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${src}-${small}.webp ${small}w, ${src}.webp ${width}w`} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${src}-${small}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  )
}
