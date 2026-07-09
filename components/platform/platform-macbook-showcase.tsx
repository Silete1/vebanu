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
}> = [
  {
    id: "sales",
    label: "Sales & CRM",
    shortLabel: "Sales",
    image: "/odoo-snapshot/odoo19-sales-populated.png",
    alt: "Odoo 19 Enterprise Sales quotations list",
  },
  {
    id: "inventory",
    label: "Inventory & PO",
    shortLabel: "Inventory",
    image: "/odoo-snapshot/odoo19-inventory-populated.png",
    alt: "Odoo 19 Enterprise Inventory overview",
  },
  {
    id: "accounting",
    label: "Accounting & P&L",
    shortLabel: "Accounting",
    image: "/odoo-snapshot/odoo19-accounting-populated.png",
    alt: "Odoo 19 Enterprise Invoicing dashboard",
  },
  {
    id: "manufacturing",
    label: "Manufacturing & MRP",
    shortLabel: "Manufacturing",
    image: "/odoo-snapshot/odoo19-manufacturing-populated.png",
    alt: "Odoo 19 Enterprise Manufacturing work centers overview",
  },
]

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function PlatformMacbookShowcase() {
  const [activeTab, setActiveTab] = useState<OdooTabId>("sales")
  const sectionRef = useRef<HTMLDivElement>(null)
  const macbookRef = useRef<HTMLDivElement>(null)
  const latestTabRef = useRef<OdooTabId>("sales")
  const activeScreen = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]
  const activeIndex = tabs.findIndex((tab) => tab.id === activeScreen.id)

  useEffect(() => {
    latestTabRef.current = activeTab
  }, [activeTab])

  useEffect(() => {
    const interval = window.setInterval(() => {
      const activeIndex = tabs.findIndex((tab) => tab.id === latestTabRef.current)
      const nextTab = tabs[(activeIndex + 1) % tabs.length]

      setActiveTab(nextTab.id)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [])

  useGSAP(
    () => {
      if (!macbookRef.current || !sectionRef.current) return

      gsap.to(macbookRef.current, {
        rotateX: 0,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 10%",
          scrub: 0.5,
        },
      })

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
    },
    { scope: sectionRef }
  )

  return (
    <div ref={sectionRef} data-macbook-showcase className="relative w-full py-12">
      <div className="mx-auto max-w-[1100px] px-4 [perspective:2000px]">
        <div
          ref={macbookRef}
          style={{
            transform: "rotateX(24deg) scale(0.92)",
          }}
          className="mx-auto w-full origin-bottom [transform-style:preserve-3d]"
        >
          <div className="relative rounded-t-[24px] border-[3px] border-[#2a303c] bg-[#141824] p-3 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.45)] sm:p-4.5">
            <div className="absolute top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-white/20 bg-[#0a0d14]" />

            <div className="relative h-[460px] overflow-hidden rounded-[10px] border border-black/20 bg-[#f8f9fa] sm:h-[540px]">
              {tabs.map((tab) => {
                const isActive = tab.id === activeScreen.id

                return (
                  <Image
                    key={tab.id}
                    src={tab.image}
                    alt={tab.alt}
                    fill
                    sizes="(min-width: 1024px) 1030px, calc(100vw - 2rem)"
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    draggable={false}
                  />
                )
              })}
            </div>
          </div>

          <div className="relative mx-[-18px] h-[16px] rounded-b-[20px] bg-gradient-to-b from-[#2a303c] to-[#141824] shadow-[0_15px_35px_rgba(0,0,0,0.6)] sm:mx-[-28px] sm:h-[20px]">
            <div className="mx-auto h-[5px] w-[110px] rounded-b-[6px] bg-[#0d1017]" />
          </div>
        </div>

        <div className="mx-auto mt-8 w-[74%] min-w-[320px] max-w-[760px] px-1">
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
            }}
          >
            {tabs.map((tab, index) => {
              const isActive = tab.id === activeScreen.id
              const isComplete = index < activeIndex
              const isLast = index === tabs.length - 1

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? "step" : undefined}
                  className="group relative min-w-0 pt-4 text-center focus-visible:outline-none"
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
                    className={`mono-label mt-3 block truncate text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
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
      </div>
    </div>
  )
}
