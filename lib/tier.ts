/**
 * Device tier, decided in <head> before the first paint and written to
 * html[data-tier] so CSS and scene loaders read one answer:
 *
 *   0 — still: reduced motion, Save-Data, 2G/3G, ≤ 2 GB memory
 *   1 — CSS motion (also what a browser without the script gets)
 *   2 — CSS motion + WebGL scenes: 6+ cores, ≥ 4 GB when known, fast link when known
 *
 * The reader can pin a tier in the footer (Motion: Auto / Full / Calm / Still), or with
 * `?tier=0|1|2` on a real phone; the choice is kept in localStorage "anu-tier".
 */

export type Tier = 0 | 1 | 2

export const tierScript = `(function(){try{var d=document.documentElement,n=navigator,c=n.connection||{},s=localStorage,q=/[?&]tier=([012])/.exec(location.search),t;if(q){s.setItem("anu-tier",q[1])}t=s.getItem("anu-tier");if(t===null){var m=n.deviceMemory,e=c.effectiveType||"";t=matchMedia("(prefers-reduced-motion: reduce)").matches||c.saveData||/2g|3g/.test(e)||(m&&m<=2)?0:(n.hardwareConcurrency||2)>=6&&(!m||m>=4)&&(!e||e==="4g")?2:1}d.dataset.tier=t}catch(_){}})()`

export const tierKey = "anu-tier"

/** The tier the device would get with no choice made (the same rule as the script). */
export function detectTier(): Tier {
  const n = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } }
  const c = n.connection ?? {}
  const m = n.deviceMemory
  const e = c.effectiveType ?? ""
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || c.saveData || /2g|3g/.test(e) || (m && m <= 2)) return 0
  return (n.hardwareConcurrency || 2) >= 6 && (!m || m >= 4) && (!e || e === "4g") ? 2 : 1
}

export function readTier(): Tier {
  if (typeof document === "undefined") return 1
  const value = Number(document.documentElement.dataset.tier ?? 1)
  return value === 0 || value === 2 ? value : 1
}
