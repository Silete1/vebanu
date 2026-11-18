import type { ComponentType } from "react"

import type { Locale } from "@/lib/i18n"

import { Screen as brain } from "./brain"
import { Screen as controlLayer } from "./control-layer"
import { Screen as walkthroughs } from "./walkthroughs"
import { Screen as support } from "./support"
import { Screen as intelligence } from "./intelligence"
import { Screen as workshops } from "./workshops"
import { Screen as qalib } from "./qalib"
import { Screen as twins } from "./twins"
import { Screen as construction } from "./construction"
import { Screen as bureau } from "./bureau"
import { Screen as brainLite } from "./brain-lite"
import { Screen as legal } from "./legal"
import { Screen as governmentHr } from "./government-hr"
import { Screen as fieldOperations } from "./field-operations"
import { Screen as retailFinance } from "./retail-finance"
import { Screen as qrMenu } from "./qr-menu"
import { Screen as maps } from "./maps"

/** slug → live screen. A lane replaces its own screens/<slug>.tsx; this map does not change. */
export const screens: Record<string, ComponentType<{ locale: Locale }>> = {
  "brain": brain,
  "control-layer": controlLayer,
  "walkthroughs": walkthroughs,
  "support": support,
  "intelligence": intelligence,
  "workshops": workshops,
  "qalib": qalib,
  "twins": twins,
  "construction": construction,
  "bureau": bureau,
  "brain-lite": brainLite,
  "legal": legal,
  "government-hr": governmentHr,
  "field-operations": fieldOperations,
  "retail-finance": retailFinance,
  "qr-menu": qrMenu,
  "maps": maps,
}
