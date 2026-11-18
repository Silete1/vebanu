"use client"

import { useEffect, useState } from "react"

import type { Locale } from "@/lib/i18n"
import { detectTier, tierKey } from "@/lib/tier"

const labels: Record<Locale, { title: string; options: [string, string, string, string] }> = {
  en: { title: "Motion", options: ["Auto", "Full", "Calm", "Still"] },
  ar: { title: "الحركة", options: ["تلقائية", "كاملة", "هادئة", "ثابتة"] },
}

// option index → stored tier (null = auto)
const tiers = [null, "2", "1", "0"] as const

/** Motion: Auto / Full / Calm / Still — the reader's own choice beats detection. */
export function MotionSwitch({ locale }: { locale: Locale }) {
  const [choice, setChoice] = useState(0)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(tierKey)
      const index = tiers.indexOf(stored as (typeof tiers)[number])
      setChoice(index > 0 ? index : 0)
    } catch {
      // storage blocked: the switch still works for this page
    }
  }, [])

  const pick = (index: number) => {
    setChoice(index)
    const tier = tiers[index]
    try {
      if (tier === null) localStorage.removeItem(tierKey)
      else localStorage.setItem(tierKey, tier)
    } catch {
      // storage blocked: apply to this page only
    }
    document.documentElement.dataset.tier = tier ?? String(detectTier())
    window.dispatchEvent(new Event("anu:tier"))
  }

  const copy = labels[locale]

  return (
    <div role="radiogroup" aria-label={copy.title} className="anu-segmented">
      <span className="anu-segmented__title">{copy.title}</span>
      {copy.options.map((option, index) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={choice === index}
          onClick={() => pick(index)}
          className="anu-segmented__option"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
