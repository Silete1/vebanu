# ANU Visual Direction

Reading this as: a serious B2B ERP implementation site for Iraqi business owners and operations managers, with a white enterprise-control language, leaning toward a shadcn foundation, disciplined SaaS layout patterns, restrained process-oriented motion, and early bilingual English/Arabic readiness.

## 1. Reference Audit

### Current ANU Website

- URL/name: `https://www.anu.ltd/`
- Useful visual pattern: limited from text extraction; the main value is the current bilingual ERP positioning and Iraq-specific service language.
- Useful animation pattern: none identified.
- Avoid: current positioning is still too broad, with custom apps/software language diluting the ERP/process-control story.
- ANU section influence: overall positioning audit, SEO baseline, bilingual direction.
- Licensing/use note: ANU-owned content can inform strategy, but the current structure and look should not be reused by default.

### Cruip Open React Template

- URL/name: `https://github.com/cruip/open-react-template`
- Useful visual pattern: clean landing-page rhythm, measured section spacing, CTA placement, footer composition.
- Useful animation pattern: restrained marketing-site reveal timing and hero/product storytelling pacing.
- Avoid: GPL-licensed template copying, startup-template feel, generic open-source hero composition.
- ANU section influence: homepage rhythm, CTA blocks, footer shell.
- Licensing/use note: repository indicates GPL; use for structural inspiration only, not direct code reuse.

### Untitled UI Free Figma Kit

- URL/name: `https://www.untitledui.com/free-figma-ui-kit`
- Useful visual pattern: enterprise typography hierarchy, serious card proportions, disciplined spacing, form and article layout consistency.
- Useful animation pattern: none primary; value is static system discipline.
- Avoid: copying kit screens or relying on its identity as a finished design.
- ANU section influence: article cards, forms, content sections, dashboard card proportions.
- Licensing/use note: use as visual-system inspiration; do not copy proprietary kit assets.

### Relume Figma Library

- URL/name: `https://www.relume.io/figma-library`
- Useful visual pattern: section composition, sitemap thinking, repeatable page skeletons, service-page layout patterns.
- Useful animation pattern: none primary.
- Avoid: templated block-by-block assembly and overly generic conversion-funnel composition.
- ANU section influence: homepage wireframe, future Services/Industries/Articles page structure.
- Licensing/use note: structure inspiration only.

### ixartz/SaaS-Boilerplate

- URL/name: `https://github.com/ixartz/SaaS-Boilerplate`
- Useful visual pattern: not a visual reference first; its value is production-ready Next.js structure with metadata and shadcn integration.
- Useful animation pattern: none primary.
- Avoid: copying the whole boilerplate scope, auth stack, or unrelated product patterns.
- ANU section influence: app structure, metadata setup, future sitemap/robots/schema patterns.
- Licensing/use note: GitHub page shows MIT license, so code ideas are adaptable with attribution discipline.

### Magic UI

- URL/name: `https://magicui.design/docs`
- Useful visual pattern: grid pattern, dotted backgrounds, bento composition, beam-style process connectors, polished diagram surfaces.
- Useful animation pattern: animated beams, blur fade, subtle reveal primitives, grid motion.
- Avoid: orbiting circles, decorative cursors, loud gimmick components, anything that reads as startup flash.
- ANU section influence: hero background system, architecture-stack connector logic, dashboard/storytelling accents.
- Licensing/use note: inspect component-level license before copying code; select only sober components.

### shadcn/ui

- URL/name: `https://ui.shadcn.com/`
- Useful visual pattern: open-code component foundation, calm defaults for cards, badges, sheets, navigation, buttons, tables.
- Useful animation pattern: none primary; value is composable UI foundation.
- Avoid: shipping unchanged demo surfaces or the sample dashboard style as-is.
- ANU section influence: navbar, mobile sheet, buttons, cards, badges, footer primitives, future forms.
- Licensing/use note: explicitly presented as open source/open code; appropriate as the core foundation.

### Aceternity UI

- URL/name: `https://ui.aceternity.com/`
- Useful visual pattern: premium hero composition, stronger bento contrast, subtle glow containment.
- Useful animation pattern: refined reveal sequences and hover lighting ideas.
- Avoid: heavy glow, parallax, flashy showcase effects, dark-tech tone.
- ANU section influence: selected hero polish cues, controlled hover accents.
- Licensing/use note: use as inspiration only unless a specific component’s terms are confirmed.

### Motion For React

- URL/name: `https://motion.dev/docs/react`
- Useful visual pattern: none directly; value is implementation support for precise reveal, hover, layout, and scroll-linked motion.
- Useful animation pattern: `useInView`, `useScroll`, `useSpring`, `useReducedMotion`, and transform-based transitions.
- Avoid: complex timeline demos, gratuitous gestures, or animation where CSS is sufficient.
- ANU section influence: hero architecture animation, card hover, section reveals, nav active-state transitions.
- Licensing/use note: official docs only; dependency should be added only when Phase 2+ needs it.

### ServiceNow

- URL/name: `https://www.servicenow.com/`
- Useful visual pattern: enterprise nav structure with products, industries, and workflows grouped clearly; information architecture that scales without clutter.
- Useful animation pattern: minimal; value is menu hierarchy and workflow language.
- Avoid: bloated mega-menu complexity and enterprise-software sprawl.
- ANU section influence: navbar strategy, future Services/Industries information architecture.
- Licensing/use note: inspiration only.

### Celonis

- URL/name: `https://www.celonis.com/`
- Useful visual pattern: process-first business language, structured hero framing around operational outcomes, function/industry narrative.
- Useful animation pattern: restrained emphasis around process intelligence storytelling.
- Avoid: abstract AI positioning that becomes too broad, or opaque enterprise jargon.
- ANU section influence: problem framing, method narrative, proof/result messaging, process-before-system story.
- Licensing/use note: inspiration only.

### Linear

- URL/name: `https://linear.app/`
- Useful visual pattern: exact spacing, premium white-space discipline, high-trust navigation, clean product-surface storytelling.
- Useful animation pattern: calm transitions, quiet interactions, no wasted motion.
- Avoid: dark product-dev identity and issue-tracker visual language.
- ANU section influence: navbar precision, dashboard storytelling, typography restraint.
- Licensing/use note: inspiration only.

### Odoo

- URL/name: `https://www.odoo.com/`
- Useful visual pattern: module taxonomy, industry segmentation, ERP service labeling.
- Useful animation pattern: none primary.
- Avoid: Odoo visual identity, purple branding, or positioning ANU as the software vendor instead of the implementation partner.
- ANU section influence: Odoo ERP page taxonomy, services naming, industries naming.
- Licensing/use note: taxonomy reference only.

## 2. Final Design Direction

### Color Palette

- `--background`: `#ffffff`
- `--foreground`: `#0f172a`
- `--heading`: `#020617`
- `--primary`: `#2563eb`
- `--primary-strong`: `#1d4ed8`
- `--primary-soft`: `#dbeafe`
- `--surface-blue`: `#eff6ff`
- `--surface-muted`: `#f8fafc`
- `--border`: `#e2e8f0`
- `--muted`: `#475569`
- `--shadow-tint`: `rgba(37, 99, 235, 0.10)`

Direction:

- White is the dominant field.
- Blue is the only accent family.
- Dark navy carries trust and operational seriousness.
- Light blue appears only in selected surfaces, diagrams, and emphasis bands.

### Typography Direction

- Display/body family: `Plus Jakarta Sans`
- Data/utility family: `IBM Plex Mono`
- Arabic companion family: use a clean sans family such as `Noto Sans Arabic`, `IBM Plex Sans Arabic`, or `Tajawal`

Why:

- `Plus Jakarta Sans` reads more polished than system/Inter defaults while staying business-safe.
- `IBM Plex Mono` gives dashboards, labels, and metrics a more operational feel without turning the whole site technical.
- Arabic text should use a purpose-built Arabic sans and not inherit a Latin-only font stack.

### Spacing Scale

- Container max width: `1280px`
- Content width for long text: `720px`
- Desktop section padding: `112px` to `136px`
- Mobile section padding: `64px` to `80px`
- Grid gap baseline: `24px`
- Large content gap: `32px` to `40px`

### Border Radius Style

- Cards and panels: `14px`
- Inputs and badges: `10px`
- Buttons: pill or `9999px` for primary CTA, `12px` for secondary buttons where needed

Rule:

- Soft but controlled; no playful rounded-card look.

### Shadow Style

- Primary shadow: large, soft, blue-tinted ambient shadow at low opacity.
- Default cards rely on border first, shadow second.
- Hover shadow increases subtly with a matching blue border/focus ring.

### Icon Style

- Lightweight outline icons only.
- Use a single icon family across the project.
- Icons should suggest operations, approvals, reporting, inventory, finance, and workflows rather than generic startup metaphors.

### Grid Style

- Strict 12-column desktop system.
- Sections alternate between:
  - balanced split layout for narrative
  - asymmetric 7/5 or 8/4 layout for process storytelling
  - disciplined 3-column or mixed-span grids for services/dashboard previews

### Animation Style

- Transform and opacity only.
- Motion feels calm, precise, and subordinate to content.
- Default reveal: short fade-up with slight blur removal only where it adds hierarchy.
- Signature motion: connector-line progress and architecture-stack state emphasis in the hero.

### Page Rhythm

- White section
- selected pale-blue section
- white section
- dashboard/mockup section with subtle grid background

This creates cadence without dropping into dark-mode contrast blocks.

## 3. Navbar Design

Chosen direction:

- White sticky navbar inside a centered max-width shell, not a floating glass capsule.
- Height: `72px` desktop, `64px` mobile.
- Base state: white background, thin bottom border, no blur.
- Scrolled state: white with `backdrop-blur-sm`, slightly stronger border and shadow.

Layout:

- Left: ANU wordmark or logo mark plus `Software Solutions` lockup.
- Center/left-center: nav links on desktop.
- Right: `Request Assessment` primary CTA.
- Reserve space in the right-side control cluster for a future language switcher without changing the navbar architecture.
- Mobile: shadcn `Sheet` with vertical navigation and CTA at top.

Active state:

- Blue underline for desktop links.
- Blue-tinted pill or left border for mobile active item.

Reasoning:

- A floating-pill navbar was rejected because it reads too product-startup and weakens the enterprise-control tone.
- A heavy mega-menu was rejected because ANU’s current scope does not justify ServiceNow-level complexity yet.

## 4. Hero Design

Composition:

- Two-column layout on desktop, stacked on mobile.
- Left column width: about 5 grid columns.
- Right column width: about 7 grid columns.

Left column:

- Small badge: `Enterprise Architecture + Odoo ERP`
- Headline
- Subheadline
- Primary CTA
- Secondary CTA
- Small trust strip using text chips such as `Process redesign`, `Workflow control`, `Owner visibility`

Right column:

- Signature ANU architecture visual.
- Six vertically stepped cards:
  - Business Capabilities
  - Processes
  - Controls
  - Odoo Modules
  - Dashboards
  - Improvement Loop
- Cards connected by thin blue lines.
- Selected cards use slightly different blue tint to indicate flow progression.
- Background includes:
  - subtle grid pattern
  - soft radial blue glow behind the center-right
  - faint dashboard/chart accents behind the stack

Animation:

- Slow connector-line sweep or pulse.
- Individual cards fade in with short stagger on first load.
- Hover can slightly lift a card, but the hero should not behave like an interactive toy.

Locale direction requirement:

- The hero content structure must support both English (`ltr`) and Arabic (`rtl`) from the implementation phase onward.
- English remains visible by default at first.
- Arabic content should come from typed content objects rather than inline translation inside the hero component.

Why this direction:

- It explains ANU’s method visually, which the text-only SaaS hero pattern does not.
- It is more specific to ERP/process architecture than a generic browser mockup.

## 5. Card / Grid System

### Core Card Language

- White background
- `1px` slate-tinted border
- subtle ambient shadow
- compact top icon area
- strong title
- restrained body copy
- optional bottom CTA or metadata row

### Service Cards

- Use a mixed-span bento grid, not nine identical cards.
- Priority services get wider cards:
  - Odoo ERP Implementation
  - Business Process Redesign
  - Enterprise Architecture Assessment
- Secondary services use smaller cards.

### Industry Cards

- Uniform grid with small operational icons.
- Cleaner and more regular than service cards.
- Focus on scanning, not visual spectacle.

### Article Cards

- White cards with category badge, title, description, date, and reading time.
- No lifestyle-blog styling.
- Featured article spans wider columns with image or visual header region later.

### Dashboard Cards

- Dense but readable.
- Use mono data labels, status chips, mini bars, or compact chart placeholders.
- Must look like control surfaces, not startup KPI brag panels.

## 6. Animation Rules

### Allowed

- Fade-up section reveal
- 30-70ms stagger between adjacent cards
- Active nav underline slide
- Card hover lift between `2px` and `4px`
- Connector-line animation in hero/process visuals
- Subtle number or status transitions in dashboard mocks
- Reduced-motion fallback for all significant movement

### Forbidden

- Spinning objects
- Orbit animations
- Hero parallax
- Long marquee strips
- Flashy neon glow
- Section-level dark/light theme flipping
- Heavy glassmorphism
- Cursor gimmicks
- Scroll-jacking
- Animating layout properties such as `top`, `left`, `width`, `height`

## 7. Homepage Wireframe

1. Navbar
   White sticky shell with CTA and mobile sheet.
2. Hero
   Left thesis and CTAs, right architecture stack.
3. Problem
   Process failure versus controlled operations split layout.
4. Method
   Sequence/timeline explaining discover, map, redesign, configure, train, measure.
5. Services
   Mixed-span bento grid.
6. Industries
   Regular scan-friendly card grid.
7. Control Dashboard
   Demo operational dashboard surfaces.
8. Proof / Results
   Safe outcome statements only, no fake client stories.
9. Articles Preview
   One featured article plus smaller cards.
10. Final CTA
   Clear assessment invitation.
11. Footer
   Company, pages, contact, legal placeholders.

## 8. Proposed File / Component Structure

Assuming a fresh Next.js App Router setup in Phase 1:

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
    site-header.tsx
    site-footer.tsx
    page-shell.tsx
    section.tsx
    container.tsx
  navigation/
    main-nav.tsx
    mobile-nav-sheet.tsx
  ui/
    button.tsx
    card.tsx
    badge.tsx
    sheet.tsx
    separator.tsx
  brand/
    anu-logo.tsx
lib/
  site.ts
  navigation.ts
  cn.ts
```

Phase 1 should implement only the shell, not the hero/body sections.

## 9. Open Questions Or Assumptions

- Assumption: there is no existing production codebase to preserve, so Phase 1 will scaffold the project foundation from scratch.
- Assumption: ANU branding assets are not yet present, so Phase 1 will use a text-based ANU wordmark placeholder rather than inventing a full logo system.
- Assumption: English remains the visible default first, but Arabic readiness must be built structurally into shared layout and hero content from Phase 2 onward.
- Assumption: Motion will be deferred until Phase 2 unless the navbar needs a small, contained interaction utility.
- Open question for later phases: whether ANU wants a simple Services dropdown in desktop nav or flat top-level navigation only.
