// Encode a graded master (16-bit TIFF) into the site's AVIF + WebP pair at each size,
// each file under its byte budget (the highest quality that fits).
//
//   node scripts/blender/encode.mjs <master.tif> <out-base> [--sizes 1600x1000:140,800x500:60] [--flip]
//   -> <out-base>.avif/.webp (first size) and <out-base>-<w>.avif/.webp (the others)
//   budgets are AVIF KB; WebP gets 1.5x. --flip mirrors the image (RTL version).
import sharp from "sharp"
import { statSync, writeFileSync } from "node:fs"

const args = process.argv.slice(2)
const [input, outBase] = args
if (!input || !outBase) {
  console.error("usage: node encode.mjs <master.tif> <out-base> [--sizes WxH:KB,...] [--flip]")
  process.exit(2)
}
const opt = (name, dflt) => {
  const i = args.indexOf(name)
  return i < 0 ? dflt : args[i + 1]
}
const flip = args.includes("--flip")
const KB = 1024
const targets = opt("--sizes", "1600x1000:140,800x500:60")
  .split(",")
  .map((spec, i) => {
    const [dim, kb] = spec.split(":")
    const [w, h] = dim.split("x").map(Number)
    return { w, h, suffix: i === 0 ? "" : `-${w}`, avif: Number(kb) * KB, webp: Number(kb) * 1.5 * KB }
  })

async function fit(make, budget, qs) {
  let last
  for (const q of qs) {
    last = { q, buf: await make(q) }
    if (last.buf.length <= budget) return last
  }
  return last // the smallest we tried; reported as over budget
}

const range = (hi, lo, step) => Array.from({ length: Math.floor((hi - lo) / step) + 1 }, (_, i) => hi - i * step)

for (const t of targets) {
  const base = () => {
    let s = sharp(input).resize(t.w, t.h, { kernel: "lanczos3", fit: "cover" })
    if (flip) s = s.flop()
    return s.toColourspace("srgb")
  }
  const avif = await fit(
    (q) => base().avif({ quality: q, effort: 7, chromaSubsampling: "4:4:4" }).toBuffer(),
    t.avif,
    range(82, 24, 3),
  )
  const webp = await fit(
    (q) => base().webp({ quality: q, effort: 6, smartSubsample: true }).toBuffer(),
    t.webp,
    range(90, 30, 4),
  )
  for (const [ext, r, budget] of [["avif", avif, t.avif], ["webp", webp, t.webp]]) {
    const file = `${outBase}${t.suffix}.${ext}`
    writeFileSync(file, r.buf)
    const size = statSync(file).size
    console.log(`${file}  ${t.w}x${t.h}  q${r.q}  ${(size / KB).toFixed(1)} KB${size > budget ? "  OVER BUDGET" : ""}`)
  }
}
