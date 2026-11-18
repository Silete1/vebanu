import { aboutCopy, methodCopy, servicesCopy } from "@/lib/content/pages"
import { getSystems, type SystemGroup } from "@/lib/content/systems"
import { storyCopy } from "@/lib/content/story-copy"
import { type Locale, localizedPath } from "@/lib/i18n"
import { getSiteContent, siteUrl } from "@/lib/site"

/**
 * The site as plain Markdown for AI readers (llms.txt convention), generated
 * from the same content files the pages render, so the two never disagree.
 */

const url = (locale: Locale, path: string) => `${siteUrl}${localizedPath(locale, path)}`
const groups: SystemGroup[] = ["core", "layer", "industry"]

export function llmsIndex(): string {
  const locale: Locale = "en"
  const site = getSiteContent(locale)
  const systems = getSystems(locale)
  const copy = storyCopy[locale]
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "ANU is a software company in Baghdad, Iraq, named for Anu, the Sumerian god of the sky. Every page exists in English and Arabic (replace /en/ with /ar/). Contact: info@anu.ltd, +964 786 700 7030.",
    "",
    "## Systems",
  ]
  for (const group of groups) {
    for (const system of systems.filter((s) => s.group === group)) {
      lines.push(`- [${system.copy.name}](${url(locale, `/systems/${system.slug}`)}): ${system.copy.pitch} (${copy.group[group]}, ${copy.status[system.status]})`)
    }
  }
  lines.push(
    "",
    "## Company",
    `- [Services](${url(locale, "/services")}): ${servicesCopy[locale].lede}`,
    `- [Method](${url(locale, "/method")}): ${methodCopy[locale].lede}`,
    `- [About](${url(locale, "/about")}): ${aboutCopy[locale].lede}`,
    `- [Contact](${url(locale, "/contact")}): book a Business Control Assessment`,
    "",
    "## Optional",
    `- [Full text of every system page](${siteUrl}/llms-full.txt)`,
    `- [Industries](${url(locale, "/industries")})`,
    `- [Field notes](${url(locale, "/insights")})`,
    ""
  )
  return lines.join("\n")
}

export function llmsFull(): string {
  const out: string[] = [llmsIndex(), "---", ""]
  for (const locale of ["en", "ar"] as const) {
    const copy = storyCopy[locale]
    for (const system of getSystems(locale)) {
      const s = system.copy
      out.push(
        `## ${s.name}`,
        "",
        `URL: ${url(locale, `/systems/${system.slug}`)}`,
        `${copy.status[system.status]} · ${copy.group[system.group]}`,
        "",
        s.summary,
        "",
        `${copy.forWhom}: ${s.audience.join("; ")}`,
        "",
        `### ${s.problem.title}`,
        s.problem.body,
        ...s.problem.symptoms.map((x) => `- ${x}`),
        "",
        `### ${s.how.title}`,
        ...s.how.steps.map((x, i) => `${i + 1}. ${x.title}: ${x.body}`),
        "",
        `### ${s.inside.title}`,
        s.inside.body,
        ...s.inside.items.map((x) => `- ${x.label}: ${x.body}`),
        `${copy.stack}: ${s.inside.stack.join(", ")}`,
        "",
        `### ${copy.chapters.features}`,
        ...s.features.map((x) => `- ${x.label}: ${x.body}`),
        ...(s.facts?.length ? ["", ...s.facts.map((f) => `- ${f.value}: ${f.label}`)] : []),
        "",
        `### ${copy.chapters.faq}`,
        ...s.faq.flatMap((x) => [`**${x.q}**`, x.a, ""]),
        ""
      )
    }
  }
  return out.join("\n")
}
