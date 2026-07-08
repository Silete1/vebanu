# ANU Website Brief

## Company Positioning

ANU Software Solutions is an ERP implementation and business process improvement company in Iraq.

ANU is not a generic software agency. The website must position ANU as an ERP implementation partner that improves how companies run their operations through:

- Enterprise Architecture
- process redesign
- CMMI-style process maturity
- Odoo ERP implementation
- operational dashboards
- workflow control
- staff training
- continuous improvement

Core message:

> We redesign how the company runs, then implement Odoo as the control platform.

Secondary message:

> Enterprise Architecture is the method. Odoo is the operating system. Dashboards and process evidence are how we improve.

## Website Style

The site should be clean, modern, professional, premium B2B, and operational. It should feel like an enterprise operations control room on a white background.

The visual language must communicate:

- control
- visibility
- process
- architecture
- ERP
- dashboards
- workflow
- approvals
- maturity

Avoid:

- dark SaaS neon style
- childish AI animations
- crypto/Web3 visual style
- generic agency templates
- excessive glassmorphism
- overanimated sections

Use:

- white-dominant backgrounds
- blue gradients and accents
- clean cards
- soft shadows
- structured grids
- subtle diagrams
- dashboard visuals
- process-flow visuals
- smooth, restrained transitions

## Technology Preference

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- selected Magic UI-style components where useful
- Motion/Framer Motion only where useful
- MDX or content-file based article system
- SEO metadata, sitemap, robots, and JSON-LD

Keep performance strong. Keep components reusable. Keep code clean. Do not over-engineer unless needed.

## Required Pages

- Home
- Services
- Industries
- Methodology
- Odoo ERP
- Case Studies or Results
- Articles
- Article Detail Page
- About
- Contact

## Article System

Create a professional articles/insights area where ANU can publish business content.

Prefer a simple MDX or content-file based system first.

Articles must support:

- title
- slug
- description
- date
- category
- author
- optional cover image
- SEO metadata
- reading time
- related articles later if possible

Arabic and English support should be possible later, but start with an English structure unless otherwise needed.

From the hero phase onward, the site foundation must support both English and Arabic.

- English remains the visible default language for now.
- Arabic must be supported structurally with proper RTL direction.
- Do not use broken machine-style Arabic.
- Prefer simple typed content objects first, such as `en` and `ar`.
- Do not implement full i18n routing until a later dedicated Arabic phase unless the existing setup strongly supports it.
- Do not treat Arabic support as a later patch over English-only components.

Article categories:

- ERP Implementation
- Odoo
- Enterprise Architecture
- Process Improvement
- Business Control
- Operations
- Digital Transformation
- CMMI and Maturity
- Dashboards and Reporting

The articles section should look like serious business insights, not a personal blog.

Articles page design:

- featured article
- category filters
- article grid
- clean white cards
- blue category badges
- date
- reading time
- article description
- optional search/filter later

Article detail page design:

- title
- description
- date
- author
- reading time
- category
- clean typography
- table of contents if article is long
- related articles if simple to implement
- CTA at the bottom

## SEO Requirements

The website must be built to appear in search results.

Implement:

- proper metadata per page
- Open Graph metadata
- Twitter/social preview metadata
- sitemap.xml
- robots.txt
- clean URLs
- canonical URLs
- article schema
- organization schema
- local business schema where appropriate
- service schema where appropriate
- semantic HTML
- accessible heading structure
- optimized images
- descriptive alt text
- strong internal linking
- fast loading
- responsive design
- clear service pages targeting search intent

Main SEO keywords to support naturally:

- Odoo implementation Iraq
- ERP implementation Iraq
- ERP consultant Iraq
- Odoo partner Iraq
- business process improvement Iraq
- enterprise architecture Iraq
- digital transformation Iraq
- operational dashboards Iraq
- inventory control system Iraq
- accounting and ERP system Iraq
- distribution ERP Iraq
- manufacturing ERP Iraq
- retail ERP Iraq
- logistics ERP Iraq
- Odoo ERP Iraq
- business control system Iraq

Do not keyword-stuff. Use natural, useful copy.

## Copy Tone

Copy should be:

- professional
- direct
- business-focused
- clear for Iraqi business owners and managers
- not too academic
- not too technical
- not generic agency language

Use these words naturally:

- control
- visibility
- process
- approval
- dashboard
- inventory
- finance
- workflow
- owner oversight
- operations
- reporting
- implementation
- maturity
- architecture
- evidence

## Visual System

Color palette direction:

- background: `#ffffff`
- foreground: `#0f172a` or similar dark navy
- primary blue: `#2563eb` or similar
- deeper blue: `#1d4ed8`
- light blue surface: `#eff6ff`
- border gray: `#e5e7eb`
- muted text: `#475569` or similar
- dark support: `#020617` or similar

Dominant color: white.
Secondary color: blue.
Support colors: black, dark navy, dark gray, light gray.

Typography:

- modern sans-serif
- strong, clear headings
- readable body copy
- avoid playful fonts
- use strong hierarchy
- keep line length controlled
- prepare a clean Arabic-capable companion font for later use

Layout grid:

- 12-column desktop grid
- 6-column tablet grid
- 1-column mobile grid
- max container width around 1200-1280px
- section vertical spacing around 96-140px desktop
- section vertical spacing around 56-80px mobile
- strict card alignment
- heavy use of whitespace
- light blue backgrounds only for selected sections

## Navbar Rules

The navbar should be:

- sticky at top
- white background
- subtle bottom border
- slight blur/glass effect only after scrolling
- ANU logo on the left
- main nav center or left-center
- CTA button on the right
- mobile menu using shadcn Sheet
- active link using blue underline or blue pill
- dropdown/mega menu for Services or Industries only if useful
- not heavy
- max width around 1200-1280px
- desktop height around 72px
- clean spacing
- never a dark navbar

Suggested nav items:

- Home
- Services
- Industries
- Methodology
- Odoo ERP
- Articles
- About
- Contact

CTA: Request Assessment.

The navbar/header must be structurally ready to support a future language switcher without being redesigned later.

## Hero Rules

The hero must not be only text and buttons. It must include a visual that explains ANU's methodology.

Hero headline:

> ERP implementation built on process architecture.

Hero subheadline:

> ANU Software Solutions redesigns how your company runs, then implements Odoo as the control platform for operations, finance, inventory, sales, and reporting.

Arabic hero copy must also be supported structurally later, using proper RTL direction and a clean Arabic-capable font, even if English remains the visible default during initial implementation.

CTA buttons:

- Request a Business Control Assessment
- See Our Method

Hero layout:

Left side:

- small badge
- headline
- subheadline
- CTA buttons
- small trust/proof badges

Right side:

Animated architecture stack:

1. Business Capabilities
2. Processes
3. Controls
4. Odoo Modules
5. Dashboards
6. Improvement Loop

Visual direction:

- clean blue/white dashboard cards
- thin blue animated connector lines
- subtle grid background
- soft radial blue glow behind the visual
- no heavy 3D
- no neon
- no spinning objects

## Card Rules

Cards should be:

- white
- thin gray border
- soft shadow on hover
- slight blue border/glow on hover
- rounded but not playful
- icon or small visual on top
- title
- short description
- optional CTA
- hover movement limited to 2-4px
- transition duration around 200-400ms

Needed card types:

- service card
- industry card
- method step card
- article card
- proof/result card
- dashboard metric card

## Animation Rules

Use animation only to explain the business idea.

Allowed:

- fade-up on section entry
- subtle stagger for cards
- animated line between process steps
- slow moving grid or dots in hero
- hover glow on cards
- active navbar underline transition
- article cards lifting slightly on hover
- subtle CTA border beam if appropriate
- dashboard numbers can count up if performance-safe
- animated architecture stack connections

Avoid:

- spinning objects
- aggressive parallax
- heavy 3D
- excessive blur
- too many moving gradients
- dark neon glow
- animations that slow page load
- animations that distract from copy
- scroll-jacking
- page-flip effects

Motion style:

- calm
- precise
- enterprise-grade
- controlled
- smooth

Support `prefers-reduced-motion` where relevant.

## Homepage Structure

1. Hero
   - Left: badge, headline, subheadline, CTA buttons, trust/proof badges.
   - Right: animated architecture stack.

2. Problem
   - Title: "Most ERP projects fail because the process was never designed."
   - Message: Companies do not only need software. They need clear workflows, approval rules, reliable data, and dashboards that show what is actually happening.
   - Visual: split layout showing messy manual workflow versus controlled ERP workflow.

3. Method
   - Title: "Our method: Architecture before implementation."
   - Steps: Discover, Map, Identify control gaps, Redesign, Configure Odoo, Train, Measure and improve.
   - Mention Enterprise Architecture, CMMI-style maturity thinking, Odoo ERP, dashboards, and process evidence naturally.

4. Services
   - Bento-style card grid.
   - Cards: Odoo ERP Implementation, Business Process Redesign, Enterprise Architecture Assessment, Inventory and Purchasing Control, Accounting and Finance Workflows, Sales and CRM Automation, Operational Dashboards, Integration and Automation, Training and Support.

5. Industries
   - Clean card grid with small operational icons.
   - Industries: Distribution and Wholesale, Light Manufacturing, Multi-Branch Retail, Logistics and Service Operations, Healthcare and Clinics, E-commerce and Trading.

6. Control Dashboard
   - Mock dashboard cards showing inventory visibility, approval status, receivables, purchase requests, sales pipeline, and operational bottlenecks.
   - Use demo labels or neutral placeholder data only.

7. Proof / Results
   - Avoid fake case studies and fake client names.
   - Safe placeholders: Improved operational visibility, reduced manual follow-up, faster reporting cycles, cleaner inventory and purchasing control, better owner-level oversight.

8. Articles Preview
   - Show latest articles with category, date, reading time, short description, and CTA: "Read Insights".

9. Final CTA
   - Title: "Want to know where your operations are losing control?"
   - Button: "Request a Business Control Assessment"

## Screenshot Rules

Use screenshots only when genuinely useful for visual inspection.

Allowed screenshot use:

- inspect `anu.ltd` if available
- inspect live visual references when layout, spacing, animation, or navbar behavior cannot be understood from text
- inspect a reference homepage or section for visual analysis
- inspect implemented local pages during QA
- compare the built page against the approved visual direction

Do not take screenshots for:

- GitHub README pages unless visual layout is important
- documentation pages unless a component preview is needed
- every reference by default
- sources used only for text, SEO, or structure

Screenshot limits:

- use the minimum number needed
- prefer 1-3 screenshots per important visual reference
- record why each screenshot was taken
- if saving screenshots locally, place them under `docs/reference-screenshots/`
- do not commit large unnecessary screenshots unless useful for project documentation
- do not treat screenshots as assets to copy

## Copyright And Licensing Rules

- Do not clone proprietary websites.
- Do not copy paid Figma kits or premium components unless already licensed.
- Do not copy exact brand identity, illustrations, copy, images, or layouts from references.
- Use open-source/public components only where licenses allow it.
- Record license notes for any GitHub/template/component source used.
- Build ANU's own visual identity from the references.

## Phase Workflow

Phase -1: project instruction, agent memory, and approved skills installation only.

Phase 0: visual research and design direction only.

Phase 1: design foundation only.

Phase 2: homepage hero only.

Phase 3: homepage body sections.

Phase 4: articles system.

Phase 5: remaining pages.

Phase 6: SEO, performance, security, and accessibility.

Phase 7: final polish and deployment preparation.

Codex must stop after each phase and wait for explicit user approval before continuing.
