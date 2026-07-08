# ANU Software Solutions — Enterprise Web Application

A modern, high-performance, and precision-engineered B2B web application and operations portal for **ANU Software Solutions**, an ERP implementation and business process improvement company based in Iraq.

## Core Value Proposition

> *"We do not sell modules. We rebuild operating control."*

ANU redesigns how companies operate—mapping workflows, roles, approvals, inventory discipline, and financial visibility—before implementing **Odoo ERP** as the governed control platform.

---

## Tech Stack & Architecture

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **UI & Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and [Base UI](https://base-ui.com/)
- **Motion & Animations:** [GSAP 3](https://gsap.com/) (@gsap/react) with responsive media matching and `prefers-reduced-motion` support
- **Icons & Graphics:** [Lucide React](https://lucide.dev/)
- **Code Quality:** ESLint 9 & Prettier

---

## Visual & Design System

The visual design follows an **Enterprise Control Room** aesthetic:
- **Dominant Colors:** Clean `bone-white` (`#ffffff`) background with `abyssal-ink` (`#0f172a` / `#020617`) contrast sections.
- **Accents:** Precision `bioluminescent-lime` (`#84cc16`) status indicators and `graphite` borders.
- **Typography:** Modern, structured sans-serif typography with strict hierarchy and monospaced technical labels (`mono-label`).
- **Layout:** 12-column responsive grid with restrained, purposeful transitions that reinforce operational control and architectural rigor.

---

## Project Structure

```bash
├── app/                  # Next.js App Router routes and layouts
│   ├── layout.tsx        # Root layout with global fonts and styles
│   ├── page.tsx          # Homepage composition (Hero + Body sections)
│   ├── globals.css       # Design tokens, color system, and utility classes
│   └── favicon.ico
├── components/           # UI components and feature sections
│   ├── home/             # Homepage sections (Hero, Story, Method, Platform, Industries, Assessment, Insights)
│   ├── layout/           # Shared layout components (Container, PageShell)
│   └── ui/               # shadcn/ui base primitives (Button, etc.)
├── docs/                 # Project architecture briefs, visual direction, and phase tracking
└── lib/                  # Utility functions (`cn` class merger, etc.)
```

---

## Implementation Phases

- **Phase 0:** Visual Research & Design Direction ✅
- **Phase 1:** Design Foundation & Design System Tokens ✅
- **Phase 2:** Homepage Hero & Architecture Visual ✅
- **Phase 3:** Homepage Body Sections (Work Story, Bento Grid, Method Steps, Odoo Control Layer Diagram, Industries, Assessment, Insights) ✅
- **Phase 4:** Articles System & MDX Insights Architecture *(Up Next)*
- **Phase 5:** Remaining Pages (Services, Methodology, About, Contact)
- **Phase 6:** SEO, Performance & Accessibility Optimization
- **Phase 7:** Final Polish & Production Go-Live

---

## Getting Started

### 1. Prerequisites
Ensure you have **Node.js 20+** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```
