"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowUpRight, Truck, Cpu, Store, Shield, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { getIndustries, type IndustrySlug } from "@/lib/content/industries"
import { industriesPageCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath } from "@/lib/i18n"
import { cn } from "@/lib/utils"

function getIndustryIcon(slug: IndustrySlug) {
  switch (slug) {
    case "distribution":
      return <Truck className="h-6 w-6 text-white/90 drop-shadow-md" />
    case "manufacturing":
      return <Cpu className="h-6 w-6 text-white/90 drop-shadow-md" />
    case "retail":
      return <Store className="h-6 w-6 text-white/90 drop-shadow-md" />
    case "logistics":
      return <Shield className="h-6 w-6 text-white/90 drop-shadow-md" />
    case "healthcare":
      return <Heart className="h-6 w-6 text-white/90 drop-shadow-md" />
  }
}

type IndustriesAccordionShowcaseProps = {
  className?: string
  compactMobile?: boolean
  locale: Locale
}

export function IndustriesAccordionShowcase({
  className,
  compactMobile = false,
  locale,
}: IndustriesAccordionShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const industries = getIndustries(locale)
  const copy = industriesPageCopy[locale]

  useGSAP(
    () => {
      if (!containerRef.current) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.fromTo(
        containerRef.current.querySelectorAll(".card"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: "power3.out",
        }
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      className={cn("mt-14 w-full", className)}
      ref={containerRef}
      data-industries-showcase
      aria-label={copy.showcaseLabel}
    >
      <div
        className={cn(
          "card-grid industry-card-grid",
          compactMobile && "industry-card-grid-home"
        )}
      >
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={localizedPath(locale, industry.href)}
            className="card industry-card rounded-[24px] outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bone-white)]"
          >
            <div className="card__background industry-card__background">
              <Image
                src={industry.visual.imageUrl}
                alt=""
                fill
                sizes="(min-width: 960px) 20vw, (min-width: 540px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Content Layer: ONLY the icon and the industry name */}
            <div className="card__content industry-card__content">
              <div className="card__category industry-card__category">
                {getIndustryIcon(industry.slug)}
              </div>
              <h3 className="card__heading industry-card__heading font-sans">
                {industry.shortName}
              </h3>
              {compactMobile ? (
                <span className="industry-card__arrow" aria-hidden="true">
                  <ArrowUpRight className="size-4" />
                </span>
              ) : null}
              <span className="sr-only">{industry.cardDescription}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
