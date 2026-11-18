import type { SceneName } from "@/components/story/scene-slot"

/**
 * Which realtime scene a system's hero gets (tier 2 only, over its poster).
 * Owned by the 3D lane (PC1): add a scene to components/story/scene-slot.tsx,
 * then name it here; content files stay untouched. A system without an entry
 * keeps its poster (and loop).
 */
export const systemScenes: Partial<Record<string, SceneName>> = {
  twins: "twin",
}

/** Scenes that take the pointer once live (hover/click/drag); others stay decorative. */
export const interactiveScenes = new Set<SceneName>([])

/** The home hero's scene (tier 2, over the home poster and loop). */
export const homeScene: SceneName = "network"
