import type { SceneName } from "@/components/story/scene-slot"

import { systemSlugs } from "./index"

/**
 * Which realtime scene a system's hero gets (tier 2 only, over its poster).
 * Owned by the 3D lane (PC1): add a scene to components/story/scene-slot.tsx,
 * then name it here; content files stay untouched. A system without an entry
 * keeps its poster (and loop).
 */
export const systemScenes: Partial<Record<string, SceneName>> = Object.fromEntries(
  // twins keeps PC2's port-terminal scene; every other system opens on its own slab (brain: the shrine door)
  systemSlugs.map((slug) => [slug, slug === "twins" ? "twin" : "sky-of-anu"])
)

/** Systems whose hero poster is rendered from the Sky of Anu scene (an Arabic, mirrored poster exists too). */
export const skyPosterSlugs = new Set(systemSlugs.filter((slug) => slug !== "twins"))

/** Scenes that take the pointer once live (hover/click/drag); others stay decorative. */
export const interactiveScenes = new Set<SceneName>(["sky-of-anu"])

/** The home hero's scene (tier 2, over the home poster): the ziggurat under the real sky, systems as slabs. */
export const homeScene: SceneName = "sky-of-anu"

/** The home poster: the same scene rendered in Blender (scroll 0), mirrored framing for Arabic. */
export const homePoster = { ltr: "/3d/sky-of-anu/poster", rtl: "/3d/sky-of-anu/poster-rtl" }
