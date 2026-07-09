"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Truck, Cpu, Store, Shield, Heart } from "lucide-react"

export interface IndustryItem {
  id: string
  title: string
  imageUrl: string
  href: string
}

const industryItems: IndustryItem[] = [
  {
    id: "distribution",
    title: "Distribution & wholesale",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    href: "/industries/distribution",
  },
  {
    id: "manufacturing",
    title: "Light manufacturing",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    href: "/industries/manufacturing",
  },
  {
    id: "retail",
    title: "Multi-branch retail",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    href: "/industries/retail",
  },
  {
    id: "logistics",
    title: "Logistics & service ops",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    href: "/industries/logistics",
  },
  {
    id: "healthcare",
    title: "Healthcare service groups",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    href: "/industries/healthcare",
  },
]

function getIndustryIcon(index: number) {
  switch (index) {
    case 0:
      return <Truck className="h-6 w-6 text-white/90 drop-shadow-md" />
    case 1:
      return <Cpu className="h-6 w-6 text-white/90 drop-shadow-md" />
    case 2:
      return <Store className="h-6 w-6 text-white/90 drop-shadow-md" />
    case 3:
      return <Shield className="h-6 w-6 text-white/90 drop-shadow-md" />
    case 4:
      return <Heart className="h-6 w-6 text-white/90 drop-shadow-md" />
    default:
      return <Truck className="h-6 w-6 text-white/90 drop-shadow-md" />
  }
}

export function IndustriesAccordionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
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
    <section className="mt-14 w-full" ref={containerRef} data-industries-showcase>
      <div className="card-grid industry-card-grid">
        {industryItems.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            className="card industry-card select-none"
          >
            {/* Exact Template Background with zero whitewashed overlay */}
            <div
              className="card__background industry-card__background"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />

            {/* Content Layer: ONLY the icon and the industry name */}
            <div className="card__content industry-card__content">
              <div className="card__category industry-card__category">
                {getIndustryIcon(index)}
              </div>
              <h3 className="card__heading industry-card__heading font-sans">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
