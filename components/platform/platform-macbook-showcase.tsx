"use client"

import { useEffect, useRef, useState } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

type OdooTabId = "sales" | "inventory" | "accounting" | "manufacturing"

const tabs: Array<{
  id: OdooTabId
  label: string
  shortLabel: string
  image: string
  alt: string
  compactLabel: string
  compactImage: string
  compactAlt: string
}> = [
  {
    id: "sales",
    label: "Sales & CRM",
    shortLabel: "Sales",
    image: "/odoo-snapshot/odoo19-desktop-sales.png",
    alt: "Odoo 19 Enterprise desktop Sales quotations list",
    compactLabel: "Sales",
    compactImage: "/odoo-snapshot/odoo19-mobile-sales.png",
    compactAlt: "Odoo 19 mobile sales quotations",
  },
  {
    id: "inventory",
    label: "Inventory & PO",
    shortLabel: "Inventory",
    image: "/odoo-snapshot/odoo19-desktop-inventory.png",
    alt: "Odoo 19 Enterprise desktop Inventory overview",
    compactLabel: "Inventory",
    compactImage: "/odoo-snapshot/odoo19-mobile-inventory.png",
    compactAlt: "Odoo 19 mobile inventory overview",
  },
  {
    id: "accounting",
    label: "Accounting & P&L",
    shortLabel: "Accounting",
    image: "/odoo-snapshot/odoo19-desktop-accounting.png",
    alt: "Odoo 19 Enterprise desktop Accounting dashboard",
    compactLabel: "Accounting",
    compactImage: "/odoo-snapshot/odoo19-mobile-accounting.png",
    compactAlt: "Odoo 19 mobile accounting dashboard",
  },
  {
    id: "manufacturing",
    label: "Manufacturing & MRP",
    shortLabel: "Manufacturing",
    image: "/odoo-snapshot/odoo19-desktop-manufacturing.png",
    alt: "Odoo 19 Enterprise desktop Manufacturing work centers overview",
    compactLabel: "Manufacturing",
    compactImage: "/odoo-snapshot/odoo19-mobile-manufacturing.png",
    compactAlt: "Odoo 19 mobile manufacturing work centers overview",
  },
]

type ScreenStackProps = {
  activeId: OdooTabId
  sizes: string
  compact?: boolean
}

function ScreenStack({ activeId, sizes, compact = false }: ScreenStackProps) {
  return tabs.map((tab) => (
    <Image
      key={tab.id}
      src={compact ? tab.compactImage : tab.image}
      alt=""
      aria-hidden="true"
      fill
      sizes={sizes}
      className={`absolute inset-0 h-full w-full object-top transition-opacity duration-500 motion-reduce:transition-none ${
        compact ? "object-contain" : "object-cover"
      } ${tab.id === activeId ? "opacity-100" : "opacity-0"}`}
      draggable={false}
    />
  ))
}

type ModuleSwitcherProps = {
  activeId: OdooTabId
  onSelect: (id: OdooTabId) => void
  compact?: boolean
}

function ModuleSwitcher({
  activeId,
  onSelect,
  compact = false,
}: ModuleSwitcherProps) {
  const activeIndex = tabs.findIndex((tab) => tab.id === activeId)

  if (compact) {
    return (
      <div
        className="mx-auto mt-7 grid w-full max-w-[430px] grid-cols-2 gap-2 sm:grid-cols-4"
        aria-label="Choose an Odoo module preview"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelect(tab.id)}
              aria-pressed={isActive}
              className={`mono-label min-h-12 rounded-xl border px-3 py-2.5 text-[10px] font-semibold tracking-[0.06em] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-3 motion-reduce:transition-none ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-[var(--color-lichen)] bg-white text-[var(--color-graphite)] active:bg-blue-50"
              }`}
            >
              {tab.compactLabel}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 w-[74%] max-w-[760px] min-w-[320px] px-1">
      <div
        className="grid items-start"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
        aria-label="Choose an Odoo module preview"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId
          const isComplete = index < activeIndex
          const isLast = index === tabs.length - 1

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelect(tab.id)}
              aria-pressed={isActive}
              className="group relative min-h-12 min-w-0 pt-4 text-center focus-visible:outline-none"
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`absolute top-[20px] left-1/2 h-px w-full transition-colors duration-300 ${
                    isComplete ? "bg-[#2563eb]" : "bg-black/12"
                  }`}
                />
              )}
              <span
                aria-hidden="true"
                className={`relative z-10 mx-auto block h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-[#2563eb] bg-[#2563eb] shadow-[0_0_0_5px_rgba(37,99,235,0.12)]"
                    : isComplete
                      ? "border-[#2563eb] bg-white"
                      : "border-black/25 bg-white group-hover:border-black/45"
                }`}
              />
              <span
                className={`mono-label mt-3 block truncate text-[10px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-[#2563eb]"
                    : "text-[var(--color-graphite)]/70 group-hover:text-[var(--color-graphite)]"
                }`}
              >
                {tab.shortLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function PlatformMacbookShowcase() {
  const [activeTab, setActiveTab] = useState<OdooTabId>("sales")
  const sectionRef = useRef<HTMLDivElement>(null)
  const macbookRef = useRef<HTMLDivElement>(null)
  const latestTabRef = useRef<OdooTabId>("sales")
  const hasTouchedCompactPreviewRef = useRef(false)
  const activeScreen = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  const selectTab = (id: OdooTabId) => {
    latestTabRef.current = id
    hasTouchedCompactPreviewRef.current = true
    setActiveTab(id)
  }

  useEffect(() => {
    latestTabRef.current = activeTab
  }, [activeTab])

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 1279px)")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let interval: number | undefined

    const syncAutoRotation = () => {
      if (interval !== undefined) window.clearInterval(interval)
      interval = undefined

      if (!compact.matches || reduceMotion.matches) return

      interval = window.setInterval(() => {
        if (hasTouchedCompactPreviewRef.current || document.hidden) return

        const activeIndex = tabs.findIndex(
          (tab) => tab.id === latestTabRef.current
        )
        const nextTab = tabs[(activeIndex + 1) % tabs.length]

        latestTabRef.current = nextTab.id
        setActiveTab(nextTab.id)
      }, 4200)
    }

    syncAutoRotation()
    compact.addEventListener("change", syncAutoRotation)
    reduceMotion.addEventListener("change", syncAutoRotation)

    return () => {
      if (interval !== undefined) window.clearInterval(interval)
      compact.removeEventListener("change", syncAutoRotation)
      reduceMotion.removeEventListener("change", syncAutoRotation)
    }
  }, [])

  useGSAP(
    () => {
      if (!macbookRef.current || !sectionRef.current) return

      const mm = gsap.matchMedia()

      mm.add(
        "(min-width: 1280px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            macbookRef.current,
            { rotateX: 20, scale: 0.94 },
            {
              rotateX: 0,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "top 10%",
                scrub: 0.5,
              },
            }
          )

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom-=20%",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress

              if (progress < 0.25) {
                setActiveTab("sales")
              } else if (progress < 0.5) {
                setActiveTab("inventory")
              } else if (progress < 0.75) {
                setActiveTab("accounting")
              } else {
                setActiveTab("manufacturing")
              }
            },
          })
        }
      )

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <div ref={sectionRef} data-platform-showcase className="relative w-full">
      <div className="xl:hidden" data-compact-device>
        <div className="mx-auto w-[min(72vw,300px)]">
          <div className="relative rounded-[42px] bg-[#141824] p-2 shadow-[0_30px_65px_-24px_rgba(0,0,0,0.55)] ring-1 ring-[#303746]">
            <div
              role="img"
              aria-label={activeScreen.compactAlt}
              className="relative aspect-[6/13] w-full overflow-hidden rounded-[35px] bg-[#603552]"
            >
              <ScreenStack
                activeId={activeScreen.id}
                sizes="(max-width: 1279px) 300px, 0px"
                compact
              />
            </div>
          </div>
        </div>

        <ModuleSwitcher
          activeId={activeScreen.id}
          onSelect={selectTab}
          compact
        />
      </div>

      <div className="hidden xl:block" data-desktop-device>
        <div className="mx-auto max-w-[1100px] px-4 [perspective:2000px]">
          <div
            ref={macbookRef}
            className="mx-auto w-full origin-bottom [transform-style:preserve-3d]"
          >
            <div className="relative rounded-t-[24px] border-[3px] border-[#2a303c] bg-[#141824] p-3 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.45)] sm:p-4.5">
              <div className="absolute top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-white/20 bg-[#0a0d14]" />

              <div
                role="img"
                aria-label={activeScreen.alt}
                className="relative h-[460px] overflow-hidden rounded-[10px] border border-black/20 bg-[#f8f9fa] sm:h-[540px]"
              >
                <ScreenStack
                  activeId={activeScreen.id}
                  sizes="(min-width: 1280px) 1030px, 0px"
                />
              </div>
            </div>

            <div className="relative mx-[-18px] h-[16px] rounded-b-[20px] bg-gradient-to-b from-[#2a303c] to-[#141824] shadow-[0_15px_35px_rgba(0,0,0,0.6)] sm:mx-[-28px] sm:h-[20px]">
              <div className="mx-auto h-[5px] w-[110px] rounded-b-[6px] bg-[#0d1017]" />
            </div>
          </div>

          <ModuleSwitcher activeId={activeScreen.id} onSelect={selectTab} />
        </div>
      </div>
    </div>
  )
}
