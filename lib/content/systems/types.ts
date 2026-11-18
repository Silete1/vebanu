import type { SceneName } from "@/components/story/scene-slot"
import type { Locale } from "@/lib/i18n"

/**
 * One ANU system (product or module family) = one story page at
 * /[locale]/systems/[slug], one node on the system map, one entry in llms.txt.
 * Pages render this data through the story blocks in components/story; a new
 * system is a new content file, never a new page component.
 *
 * Public-site rules for every string here: no client, shop or person names,
 * no prices, no vendor software names, no internal codes (branch, PR, lane,
 * client codes); describe clients anonymously ("a container
 * terminal in southern Iraq"). Users of ANU's systems never see the word
 * "Odoo"; the site may say ANU Brain is built on Odoo.
 */

/** Where the system sits on the map. */
export type SystemGroup =
  | "core" // ANU Brain itself: the platform every client runs on
  | "layer" // what ANU adds to every Brain: theme, band, walkthroughs, support, intelligence
  | "industry" // complete systems for one kind of business

/** Maturity, drawn as a status glyph: live = done (ink), demo = due (blue), building = in progress (half). */
export type SystemStatus = "live" | "demo" | "building"

/** The picture language of the hero: a Blender render, or one of the drawn scenes. */
export type StoryVisual = {
  /** /media/systems/<slug>.avif|webp; rendered by scripts/blender, 16:10 */
  poster: string
  /** optional realtime scene for tier 2 */
  scene?: SceneName
  /** optional short loop for tier 1–2, without extension (mp4 + webm next to it) */
  loop?: string
}

export type StoryStep = { title: string; body: string }

export type StoryItem = { label: string; body: string }

export type StoryCopy = {
  /** product name, e.g. "ANU Walkthroughs" */
  name: string
  /** short label for menus and the map, ≤ 18 characters */
  short: string
  /** one line, ≤ 90 characters: what it is and for whom */
  pitch: string
  /** 2–3 sentences, answer-first: what it is, who it's for, what changes (quoted by AI readers) */
  summary: string
  /** who it is for, 2–5 short labels */
  audience: string[]
  /** the noise before ANU */
  problem: { title: string; body: string; symptoms: string[] }
  /** how it works, in order: 3–6 steps */
  how: { title: string; steps: StoryStep[] }
  /** how ANU implements it: modules, data, integrations, 3–6 items, plus the technology */
  inside: { title: string; body: string; items: StoryItem[]; stack: string[] }
  /** standout capabilities, 4–8 */
  features: StoryItem[]
  /** optional figures that can be checked, each a value and a label (no client data, no prices) */
  facts?: { value: string; label: string }[]
  /** 3–6 questions buyers and AI readers ask */
  faq: { q: string; a: string }[]
  /** SEO */
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

export type SystemStory = {
  slug: string
  group: SystemGroup
  status: SystemStatus
  /** order on the map and in lists, ascending */
  order: number
  /** slugs of systems told next to this one */
  related: string[]
  visual: StoryVisual
  copy: Record<Locale, StoryCopy>
}
