import { existsSync } from "node:fs"
import { join } from "node:path"

import { VideoLoop } from "@/components/story/video-loop"

/** A rendered loop for `slug` (public/media/loops), if one exists; it plays over the poster beneath it. */
export function Loop({ slug }: { slug: string }) {
  const base = `/media/loops/${slug}`
  const has = (ext: string) => existsSync(join(process.cwd(), "public", `${base}.${ext}`))
  if (!has("mp4")) return null
  return <VideoLoop base={base} webm={has("webm")} poster={has("jpg") ? `${base}.jpg` : undefined} />
}
