/**
 * The ANU logo as inline SVG: the mark in Signal blue, the wordmark in the
 * current text colour, so one component serves paper and ink. Geometry drawn
 * by PC1 (anu-web-assets brand/logo/anu_logo.svg: four quarter-ring blades,
 * round-capped A N U), matched to the brand PNG.
 */

type AnuLogoProps = {
  className?: string
  title?: string
  markOnly?: boolean
}

const MARK = "M74.2 77.5A35 35 0 0 0 74.2 28L99 3.3A70 70 0 0 1 99 102.3ZM99 77.5A35 35 0 0 0 148.5 77.5L173.2 102.3A70 70 0 0 1 74.2 102.3ZM99 102.3A35 35 0 0 0 99 151.8L74.2 176.5A70 70 0 0 1 74.2 77.5ZM74.2 102.3A35 35 0 0 0 24.7 102.3L0 77.5A70 70 0 0 1 99 77.5Z"

const WORDMARK = "M228.3 128.3L266.7 51.9L305.1 128.3A16.1 16.1 0 0 0 333.9 113.9L281.1 8.9A16.1 16.1 0 0 0 252.3 8.9L199.5 113.9A16.1 16.1 0 0 0 228.3 128.3ZM379.8 120.1V58.2L454.5 132.2A17.1 17.1 0 0 0 483.6 120.1V17.1A17.1 17.1 0 0 0 449.4 17.1V79L374.8 5A17.1 17.1 0 0 0 345.6 17.1V120.1A17.1 17.1 0 0 0 379.8 120.1ZM492.8 17.1V68.2A69 69 0 0 0 630.8 68.2V17.1A17.1 17.1 0 0 0 596.6 17.1V68.2A34.8 34.8 0 0 1 527 68.2V17.1A17.1 17.1 0 0 0 492.8 17.1Z"

export function AnuLogo({ className, title = "ANU", markOnly = false }: AnuLogoProps) {
  return (
    <svg viewBox={markOnly ? "0 0 173.2 176.5" : "0 0 630.8 176.5"} className={className} role="img" aria-label={title}>
      <path fill="var(--anu-mark-a)" d={MARK} />
      {markOnly ? null : <path fill="currentColor" d={WORDMARK} />}
    </svg>
  )
}
