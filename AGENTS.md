# AGENTS.md

Read this file first. Do not begin each task with a full repository scan. Use this map to inspect only the files and dependencies directly relevant to the requested change. Expand investigation only when a task crosses multiple systems, the code conflicts with this document, or required context is missing. Reuse existing components, utilities, styles, animation patterns, and abstractions before creating new ones. Preserve the current architecture unless the task requires a justified change. Avoid unrelated refactoring. Run only verification relevant to the files you changed. Update this file only when stable architecture, commands, conventions, or repository structure change.

## Stack and Tooling

- Framework: Next.js 16 App Router (`next`, `react`, `react-dom`).
- Language: TypeScript 5 with `strict` enabled.
- Package manager: `npm` (`package-lock.json` present).
- Styling: Tailwind CSS v4 via `@tailwindcss/postcss`, global CSS in [`app/globals.css`](/C:/Users/Lenovo/Documents/vebanu/app/globals.css).
- UI primitives: Base UI (`@base-ui/react`) wrapped in [`components/ui`](/C:/Users/Lenovo/Documents/vebanu/components/ui).
- Variant/class utilities: `class-variance-authority`, `clsx`, `tailwind-merge`, shared `cn()` in [`lib/utils.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/utils.ts).
- Motion: GSAP 3, `@gsap/react`, `ScrollTrigger`.
- Icons: `lucide-react`.
- Lint/format: ESLint 9 flat config, Prettier 3 with `prettier-plugin-tailwindcss`.
- Testing tooling present: `@playwright/test` dependency only. No Playwright test files or other automated test suites were verified in the repo.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Format TS/TSX: `npm run format`

## Repository Map

- [`app`](/C:/Users/Lenovo/Documents/vebanu/app): App Router entrypoints, root layout, global CSS.
- [`components`](/C:/Users/Lenovo/Documents/vebanu/components): UI, layout, motion, route sections, and feature components.
- [`lib`](/C:/Users/Lenovo/Documents/vebanu/lib): navigation config, locale helpers, site copy, shared utilities, structured content.
- [`public`](/C:/Users/Lenovo/Documents/vebanu/public): runtime static assets and demo HTML files.
- [`docs`](/C:/Users/Lenovo/Documents/vebanu/docs): non-runtime reference screenshots and document deliverables.

## Entry Points and Routing

- Locale layout: [`app/[locale]/layout.tsx`](/C:/Users/Lenovo/Documents/vebanu/app/[locale]/layout.tsx)
- Localized routes live under `/en` and `/ar`; unprefixed legacy routes redirect to English in [`next.config.ts`](/C:/Users/Lenovo/Documents/vebanu/next.config.ts).
- Home route: [`app/[locale]/page.tsx`](/C:/Users/Lenovo/Documents/vebanu/app/[locale]/page.tsx)
- Services route: [`app/[locale]/services/page.tsx`](/C:/Users/Lenovo/Documents/vebanu/app/[locale]/services/page.tsx)
- Industry routes: [`app/[locale]/industries`](/C:/Users/Lenovo/Documents/vebanu/app/[locale]/industries)
- Insight routes: [`app/[locale]/insights`](/C:/Users/Lenovo/Documents/vebanu/app/[locale]/insights)
- Shared page shell: [`components/layout/page-shell.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/page-shell.tsx)
- Primary navigation item source: [`lib/navigation.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/navigation.ts)

## Main Page and Layout Locations

- Root HTML/body, font setup, and route-level `lang`/`dir`: [`app/[locale]/layout.tsx`](/C:/Users/Lenovo/Documents/vebanu/app/[locale]/layout.tsx)
- Global shell with header/footer/main transition: [`components/layout/page-shell.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/page-shell.tsx)
- Header: [`components/layout/site-header.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/site-header.tsx)
- Footer: [`components/layout/site-footer.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/site-footer.tsx)
- Shared width wrapper: [`components/layout/container.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/container.tsx)
- Generic section wrapper: [`components/layout/section.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/section.tsx)
- Current home composition:
  - Hero: [`components/home/home-hero.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/home/home-hero.tsx)
  - Body sections: [`components/home/home-body.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/home/home-body.tsx)
  - Scroll/page motion orchestration: [`components/home/home-scroll-motion.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/home/home-scroll-motion.tsx)
  - Assessment/contact experience: [`components/home/assessment-cta-section.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/home/assessment-cta-section.tsx), [`components/home/assessment-form.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/home/assessment-form.tsx)

## Component Inventory

- `components/ui`: Base UI wrappers such as `button`, `sheet`, `tabs`, `card`, `badge`, `separator`, `field`, and `input`.
- `components/layout`: shared structural shell pieces.
- `components/motion`: lightweight wrappers such as `PageTransition` and `Reveal`.
- `components/brand`: ANU logo component and embedded logo image.
- `components/home`: current homepage-specific implementation.
- `components/platform`, `components/industries`, `components/method`: interactive feature components used by the current homepage.
- `components/sections`, `components/services`: content-driven section system backed by [`lib/content/home.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/content/home.ts). These components exist in the repo, but the current `/` route is composed primarily from `components/home/*` plus selected feature components.
- `components/navigation`: alternate navigation components present in the repo; the active page shell uses [`components/layout/site-header.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/site-header.tsx).

## Styling and Tokens

- Global design tokens, utility classes, keyframes, and custom responsive CSS live in [`app/globals.css`](/C:/Users/Lenovo/Documents/vebanu/app/globals.css).
- Tailwind is configured through CSS-first Tailwind v4 usage; there is no separate `tailwind.config.*`.
- PostCSS plugin setup: [`postcss.config.mjs`](/C:/Users/Lenovo/Documents/vebanu/postcss.config.mjs)
- shadcn/base-nova settings and aliases: [`components.json`](/C:/Users/Lenovo/Documents/vebanu/components.json)
- Common style patterns:
  - CSS variables for colors, radii, and typography.
  - Utility classes such as `mono-label`, `body-copy`, `section-headline`, `display-headline`, `flat-card`, `dark-card`.
  - Tailwind classes are sorted by Prettier using the configured stylesheet.

## Motion

- Route/page transition: [`components/motion/page-transition.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/motion/page-transition.tsx)
- Home scroll and intro motion orchestration: [`components/home/home-scroll-motion.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/home/home-scroll-motion.tsx)
- Header scroll state and section tracking: [`components/layout/site-header.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/layout/site-header.tsx)
- Method card stack motion: [`components/method/method-card-stack.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/method/method-card-stack.tsx)
- Platform showcase motion: [`components/platform/platform-macbook-showcase.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/platform/platform-macbook-showcase.tsx)
- Industries reveal motion: [`components/industries/industries-accordion-showcase.tsx`](/C:/Users/Lenovo/Documents/vebanu/components/industries/industries-accordion-showcase.tsx)
- Pattern: interactive/animated files are client components and use GSAP `useGSAP()` with `ScrollTrigger` or `matchMedia()`.

## Assets and Images

- Brand image used by the logo component: [`components/brand/anu_logo.png`](/C:/Users/Lenovo/Documents/vebanu/components/brand/anu_logo.png)
- Odoo screenshots used at runtime by the platform showcase: [`public/odoo-snapshot`](/C:/Users/Lenovo/Documents/vebanu/public/odoo-snapshot)
- Demo static HTML: [`docs/demos/demo-industries.html`](/C:/Users/Lenovo/Documents/vebanu/docs/demos/demo-industries.html), [`docs/demos/demo-platform-laptop.html`](/C:/Users/Lenovo/Documents/vebanu/docs/demos/demo-platform-laptop.html)
- Reference screenshots in [`docs/reference-screenshots`](/C:/Users/Lenovo/Documents/vebanu/docs/reference-screenshots) are documentation assets, not runtime app assets.
- Industry content and image URLs are centralized in [`lib/content/industries.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/content/industries.ts); Arabic industry content lives in [`lib/content/industries-ar.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/content/industries-ar.ts).

## Content and Localization

- Locale helpers: [`lib/i18n.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/i18n.ts)
- Site-level localized strings: [`lib/site.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/site.ts)
- Shared active-interface copy: [`lib/content/site-copy.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/content/site-copy.ts)
- Structured bilingual home content: [`lib/content/home.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/content/home.ts)
- Supported locales in code: `en`, `ar`.
- Default locale: `en`.
- `app/[locale]/layout.tsx` validates the locale and applies language-specific `lang`, `dir`, metadata, canonicals, and alternates.
- Arabic font variables and `[lang^="ar"]` CSS styling are present.
- The shared language switcher is in the desktop header and mobile navigation sheet.

## Integrations

- Verified external libraries used directly in app code:
  - Base UI for primitives
  - GSAP for motion
  - Lucide for icons
- No API route handlers were verified under `app/api`.
- Assessment lead delivery uses a Next.js Server Action in [`app/actions/submit-assessment.ts`](/C:/Users/Lenovo/Documents/vebanu/app/actions/submit-assessment.ts) and calls the Resend HTTP API when configured.
- Public ANU phone, WhatsApp, and email links are centralized in [`lib/contact.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/contact.ts).
- Assessment email delivery reads `RESEND_API_KEY`, `ASSESSMENT_FROM_EMAIL`, and optional `ASSESSMENT_TO_EMAIL`; see [`.env.example`](/C:/Users/Lenovo/Documents/vebanu/.env.example).
- No CMS write clients or database clients were verified in application source.

## Environment and Config Files

- [`package.json`](/C:/Users/Lenovo/Documents/vebanu/package.json)
- [`package-lock.json`](/C:/Users/Lenovo/Documents/vebanu/package-lock.json)
- [`tsconfig.json`](/C:/Users/Lenovo/Documents/vebanu/tsconfig.json)
- [`next.config.ts`](/C:/Users/Lenovo/Documents/vebanu/next.config.ts)
- [`eslint.config.mjs`](/C:/Users/Lenovo/Documents/vebanu/eslint.config.mjs)
- [`postcss.config.mjs`](/C:/Users/Lenovo/Documents/vebanu/postcss.config.mjs)
- [`components.json`](/C:/Users/Lenovo/Documents/vebanu/components.json)
- [`.prettierrc`](/C:/Users/Lenovo/Documents/vebanu/.prettierrc)

## Architecture and Coding Conventions

- Use App Router patterns with route files under `app/`.
- Keep shared helpers in `lib/` and shared structural components in `components/layout/`.
- Use Base UI wrappers from `components/ui` instead of importing primitives directly into feature code unless extending the design system.
- Use `cn()` from [`lib/utils.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/utils.ts) for class merging.
- Use `cva()` for component variants where already established (`button`, `tabs`).
- Prefer server components by default; mark components with `"use client"` only when hooks, browser APIs, GSAP, or client-side interactivity are required.
- Current implementation uses a mix of:
  - route-specific section composition in `components/home/*`
  - reusable content-driven sections in `components/sections/*`
- Reuse the existing shell (`PageShell`, `SiteHeader`, `SiteFooter`, `Container`) before introducing new page framing.

## Naming and Imports

- Import alias: `@/*` -> repository root from [`tsconfig.json`](/C:/Users/Lenovo/Documents/vebanu/tsconfig.json)
- Additional alias conventions in [`components.json`](/C:/Users/Lenovo/Documents/vebanu/components.json):
  - `components` -> `@/components`
  - `ui` -> `@/components/ui`
  - `lib` -> `@/lib`
  - `utils` -> `@/lib/utils`
- File naming is predominantly kebab-case for components and utilities.
- Exported React components use PascalCase.
- Local constants and content objects use camelCase.

## RTL/LTR and Responsive Behavior

- Locale metadata in [`lib/i18n.ts`](/C:/Users/Lenovo/Documents/vebanu/lib/i18n.ts) defines `dir` for `en` and `ar`.
- The locale layout applies `dir` and regional language tags (`en-IQ`, `ar-IQ`) on `<html>`.
- Prefer logical Tailwind properties (`s`/`e`, `ps`/`pe`, `border-s`/`border-e`) for shared LTR/RTL components.
- Responsive implementation is primarily Tailwind breakpoint classes (`sm`, `md`, `lg`) plus custom CSS media queries in [`app/globals.css`](/C:/Users/Lenovo/Documents/vebanu/app/globals.css).
- Motion code also uses GSAP `matchMedia()` for desktop/mobile and reduced-motion handling.

## Verification

- For code changes, run only the commands relevant to the touched files.
- Typical repo-level verification:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build` when changes affect routes, layout, production bundling, or static assets
- No automated unit/integration/e2e test suite was verified beyond the presence of the Playwright package.
