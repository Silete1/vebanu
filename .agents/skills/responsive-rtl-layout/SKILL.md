---
name: responsive-rtl-layout
description: Build and adjust responsive layouts for right-to-left languages such as Arabic. Use when adding RTL support, mirroring layout behavior, or fixing mixed-direction pages across desktop and mobile.
---

# Responsive RTL Layout

Use this skill when a layout must work in both left-to-right and right-to-left directions.

## Set direction

- Apply `dir="rtl"` at the page, layout, or section level as needed.
- Keep mixed-direction content explicit instead of relying on inheritance.

## Mirror carefully

- Flip navigation, spacing, and alignment where direction changes meaning.
- Preserve icons, charts, and numbers when mirroring would harm clarity.
- Use logical spacing and alignment values when possible.

## Check

- Desktop and mobile wrapping
- Form labels and inputs
- Dropdowns, drawers, and menus
- Tables, breadcrumbs, and pagination
- Inline numbers, URLs, and Latin text inside Arabic content

## Output

- RTL-safe structure
- Responsive behavior in both directions
- Minimal directional hacks
