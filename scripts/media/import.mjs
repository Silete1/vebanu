// Bring PC1's renders, loops, screens and recordings (Forgejo anu-web-assets) into the site's slots.
//
//   node scripts/media/import.mjs <anu-web-assets dir> <ffmpeg binary> [--only <slug>] [--dry]
//
// Conventions in anu-web-assets (PC1 delivers masters; this script makes the web versions):
//   renders/pc1/<slug>/poster.(png|jpg|tif)      → public/media/systems/<slug>.{avif,webp} + -800 (16:10)
//   renders/pc1/home/poster.*, home-rtl/poster.*  → 1920×1080 + 960×540 (16:9)
//   video/pc1/<slug>/loop.(mp4|mov)              → public/media/loops/<slug>.{mp4,webm,jpg} (960×600, home 1280×720)
//   renders/screens/<slug>/<name>.(png|jpg)      → public/media/real/<slug>/<name>-{640,1280}.{avif,webp}
//   video/screens/<slug>/<name>.mp4              → public/media/real/<slug>/<name>.{mp4,webm,jpg} (8 s, 960×600)
// Anything INDEX.md marks "client: yes" is skipped. Descriptions in INDEX.md become the alt text
// in lib/content/systems/real-media.json (English; Arabic falls back to it until translated).
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { basename, extname, join } from "node:path"

const site = new URL("../..", import.meta.url).pathname
const sharp = createRequire(join(site, "package.json"))("sharp")
const [assets, ff, ...flags] = process.argv.slice(2)
if (!assets || !ff) throw new Error("usage: import.mjs <anu-web-assets dir> <ffmpeg> [--only slug] [--dry]")
const only = flags.includes("--only") ? flags[flags.indexOf("--only") + 1] : null
const dry = flags.includes("--dry")

// INDEX.md rows: | `path` | what | size | source | client |
const index = new Map()
for (const line of readFileSync(join(assets, "INDEX.md"), "utf8").split("\n")) {
  const cells = line.split("|").map((c) => c.trim())
  const path = cells[1]?.match(/^`(.+)`$/)?.[1]
  if (path) index.set(path, { what: cells[2] ?? "", client: /yes/i.test(cells.at(-2) ?? "") })
}
const allowed = (rel) => {
  const row = index.get(rel)
  if (!row) return { ok: false, why: "not in INDEX.md" }
  if (row.client) return { ok: false, why: "client: yes" }
  return { ok: true, what: row.what }
}

const list = (dir) => (existsSync(dir) ? readdirSync(dir) : [])
const kb = (file) => `${Math.round(statSync(file).size / 1024)} KB`
const run = (args) => execFileSync(ff, ["-hide_banner", "-loglevel", "error", "-y", ...args])
const log = []

async function poster(slug, src, out, wide) {
  const [w, h, sw, sh] = wide ? [1920, 1080, 960, 540] : [1600, 1000, 800, 500]
  for (const [ww, hh, suffix] of [[w, h, ""], [sw, sh, `-${sw}`]]) {
    const img = sharp(src).resize(ww, hh, { fit: "cover", position: "attention" })
    await img.clone().avif({ quality: 50, effort: 6 }).toFile(`${out}${suffix}.avif`)
    await img.clone().webp({ quality: 74 }).toFile(`${out}${suffix}.webp`)
  }
  log.push(`poster ${slug}: ${kb(`${out}-${sw}.avif`)} (small avif)`)
}

function clip(src, out, size, start = 0, seconds = 8) {
  const [w, h] = size
  const input = ["-ss", String(start), "-t", String(seconds), "-i", src, "-an"]
  const vf = ["-vf", `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=24`]
  // H.264 with a size cap, then VP9; first frame as the poster
  for (const crf of [28, 31, 34]) {
    run([...input, ...vf, "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", `${out}.mp4`])
    if (statSync(`${out}.mp4`).size <= 600 * 1024) break
  }
  run([...input, ...vf, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "44", "-row-mt", "1", `${out}.webm`])
  run([...input, ...vf, "-frames:v", "1", "-q:v", "5", `${out}.jpg`])
  log.push(`clip ${basename(out)}: ${kb(`${out}.mp4`)} mp4, ${kb(`${out}.webm`)} webm`)
}

const real = existsSync(join(site, "lib/content/systems/real-media.json"))
  ? JSON.parse(readFileSync(join(site, "lib/content/systems/real-media.json"), "utf8"))
  : {}

// posters and loops
for (const slug of list(join(assets, "renders/pc1"))) {
  if (only && slug !== only) continue
  const file = list(join(assets, "renders/pc1", slug)).find((f) => /^poster\.(png|jpe?g|tiff?)$/i.test(f))
  if (!file) continue
  const rel = `renders/pc1/${slug}/${file}`
  const ok = allowed(rel)
  if (!ok.ok) { log.push(`skip ${rel}: ${ok.why}`); continue }
  if (!dry) await poster(slug, join(assets, rel), join(site, "public/media/systems", slug), slug.startsWith("home"))
}
for (const slug of list(join(assets, "video/pc1"))) {
  if (only && slug !== only) continue
  const file = list(join(assets, "video/pc1", slug)).find((f) => /^loop\.(mp4|mov)$/i.test(f))
  if (!file) continue
  const rel = `video/pc1/${slug}/${file}`
  const ok = allowed(rel)
  if (!ok.ok) { log.push(`skip ${rel}: ${ok.why}`); continue }
  mkdirSync(join(site, "public/media/loops"), { recursive: true })
  if (!dry) clip(join(assets, rel), join(site, "public/media/loops", slug), slug.startsWith("home") ? [1280, 720] : [960, 600], 0, 5)
}

// real screens and recordings
for (const kind of ["renders/screens", "video/screens"]) {
  for (const slug of list(join(assets, kind))) {
    if (only && slug !== only) continue
    const out = join(site, "public/media/real", slug)
    real[slug] ??= { stills: [], clips: [] }
    for (const file of list(join(assets, kind, slug))) {
      const rel = `${kind}/${slug}/${file}`
      const name = basename(file, extname(file))
      const ok = allowed(rel)
      if (!ok.ok) { log.push(`skip ${rel}: ${ok.why}`); continue }
      const alt = { en: ok.what, ar: ok.what }
      if (dry) { log.push(`would import ${rel}`); continue }
      mkdirSync(out, { recursive: true })
      if (kind.startsWith("renders") && /\.(png|jpe?g)$/i.test(file)) {
        for (const w of [640, 1280]) {
          const img = sharp(join(assets, rel)).resize({ width: w })
          await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${out}/${name}-${w}.avif`)
          await img.clone().webp({ quality: 76 }).toFile(`${out}/${name}-${w}.webp`)
        }
        real[slug].stills = [...real[slug].stills.filter((s) => s.file !== name), { file: name, alt }]
        log.push(`still ${slug}/${name}`)
      } else if (/\.(mp4|mov)$/i.test(file)) {
        clip(join(assets, rel), `${out}/${name}`, [960, 600], 0, 8)
        real[slug].clips = [...real[slug].clips.filter((c) => c.file !== name), { file: name, alt }]
      }
    }
  }
}

if (!dry) writeFileSync(join(site, "lib/content/systems/real-media.json"), `${JSON.stringify(real, null, 2)}\n`)
console.log(log.join("\n") || "nothing to import")
