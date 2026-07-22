# ANU Insights CMS

## Recommended setup

Use a free Sanity project with a public `production` dataset. The website reads
published Field Notes on the server using the native Next.js `fetch` cache, so
the Vercel deployment does not need a paid service, a CMS runtime dependency or
a secret API token.

Until Sanity is configured, the site automatically uses the typed entries in
`lib/content/insights.ts`. This keeps previews and new Vercel deployments
working without external setup.

## How Field Notes move through the site

1. An editor creates an `insight` document in Sanity Studio.
2. English is required. Arabic can be added in the same fields; if it is empty,
   the English text is used as a safe fallback.
3. The editor selects one of ANU's existing categories, formats and visual
   treatments, then publishes the document.
4. Vercel fetches only published documents and caches the result for five
   minutes. Drafts never appear on the public site.
5. The same typed record feeds the featured story, filters, Field Notes grid,
   latest list and article detail route.

The implementation deliberately does not use Sanity Live. Ordinary cached
reads are a better fit for a small editorial site and avoid unnecessary request
volume with Next.js 16.

## Connect a Sanity project

1. Create a free project and public `production` dataset in Sanity.
2. Create a separate Sanity Studio using the schema below. It can be hosted by
   Sanity for free; it does not need to run inside this Next.js application.
3. Add these variables to `.env.local` and to the Vercel project's environment
   variables:

   ```bash
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   ```

4. Redeploy. The website will use Sanity as soon as it finds at least one valid
   published insight. If Sanity is unavailable or the dataset is empty, it
   safely falls back to the local entries.

## Sanity schema

Add this document type to the Studio's `schemaTypes` list:

```ts
import { defineArrayMember, defineField, defineType } from "sanity"

const localizedText = (name: string, title: string, rows = 1) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "en",
        title: "English",
        type: rows > 1 ? "text" : "string",
        rows,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "ar",
        title: "Arabic",
        type: rows > 1 ? "text" : "string",
        rows,
      }),
    ],
  })

export const insight = defineType({
  name: "insight",
  title: "Field Note",
  type: "document",
  fields: [
    localizedText("title", "Title"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    localizedText("summary", "Summary", 4),
    defineField({
      name: "category",
      title: "Topic",
      type: "string",
      options: {
        list: [
          "Business Control",
          "Odoo ERP",
          "Operations",
          "Finance",
          "Inventory",
          "Digital Transformation",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contentType",
      title: "Format",
      type: "string",
      initialValue: "Field Note",
      options: { list: ["Field Note", "Analysis", "Guide", "Video Insight"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "visual",
      title: "ANU visual",
      type: "string",
      options: {
        list: [
          "control-loop",
          "inventory-ledger",
          "management-dashboard",
          "approval-flow",
          "module-map",
          "process-map",
          "single-source",
          "ownership-model",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    localizedText("visualAlt", "Visual alternative text", 2),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    localizedText("author", "Author"),
    defineField({
      name: "body",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localizedText("heading", "Heading"),
            localizedText("body", "Body", 8),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "category" },
  },
})
```

Keep only one document marked `featured`. If more than one is marked, the most
recent published item is used because the CMS query is date-sorted.
