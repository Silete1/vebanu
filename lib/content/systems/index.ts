import type { Locale } from "@/lib/i18n"

import type { StoryCopy, SystemGroup, SystemStory } from "./types"
import { brainLite } from "./brain-lite"
import { brain } from "./brain"
import { bureau } from "./bureau"
import { construction } from "./construction"
import { controlLayer } from "./control-layer"
import { fieldOperations } from "./field-operations"
import { governmentHr } from "./government-hr"
import { intelligence } from "./intelligence"
import { legal } from "./legal"
import { maps } from "./maps"
import { qalib } from "./qalib"
import { qrMenu } from "./qr-menu"
import { retailFinance } from "./retail-finance"
import { support } from "./support"
import { twins } from "./twins"
import { walkthroughs } from "./walkthroughs"
import { workshops } from "./workshops"

export type { StoryCopy, SystemGroup, SystemStatus, SystemStory } from "./types"

/** Every system the site tells, in map order. Adding a system = adding its file here. */
const registry: SystemStory[] = [
  brainLite,
  brain,
  bureau,
  construction,
  controlLayer,
  fieldOperations,
  governmentHr,
  intelligence,
  legal,
  maps,
  qalib,
  qrMenu,
  retailFinance,
  support,
  twins,
  walkthroughs,
  workshops,
].sort((a, b) => a.order - b.order)

export type LocalizedSystem = Omit<SystemStory, "copy"> & { copy: StoryCopy }

function localize(system: SystemStory, locale: Locale): LocalizedSystem {
  return { ...system, copy: system.copy[locale] }
}

export function getSystems(locale: Locale, group?: SystemGroup): LocalizedSystem[] {
  return registry.filter((system) => !group || system.group === group).map((system) => localize(system, locale))
}

export function getSystem(locale: Locale, slug: string): LocalizedSystem | undefined {
  const system = registry.find((entry) => entry.slug === slug)
  return system && localize(system, locale)
}

export const systemSlugs = registry.map((system) => system.slug)
