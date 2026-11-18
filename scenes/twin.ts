/**
 * A container terminal at night, live: three ship-to-shore cranes working a
 * vessel, trucks carrying the boxes to yard gantries, the camera on a slow
 * orbit. Built with ANU's own twin platform (the kit's rigs at real size, the
 * sim's jerk-limited crane cycles, rope sway and truck drives), so it is not
 * bundled here: it is one prebuilt, minified module served from
 * /scenes/twin.mjs (how to rebuild it: scripts/twin-scene/README.md).
 *
 * It keeps the scene contract of scenes/network.ts: DPR ≤ 1.5, no drawing off
 * screen or in a hidden tab, `is-live` after the first frame, a step down and
 * then its own removal if the first frames run under ~40 fps.
 */

type Mount = (box: HTMLElement) => () => void

// a URL, not a module path: the bundler leaves it alone and the browser fetches it when a scene is wanted
const bundle: string = "/scenes/twin.mjs"

export function mount(box: HTMLElement): () => void {
  let dispose: (() => void) | undefined
  let cancelled = false

  import(/* webpackIgnore: true */ /* turbopackIgnore: true */ bundle)
    .then((module: { mount: Mount }) => {
      if (!cancelled) dispose = module.mount(box)
    })
    .catch(() => {
      // no scene: the poster stays
    })

  return () => {
    cancelled = true
    dispose?.()
    dispose = undefined
  }
}
