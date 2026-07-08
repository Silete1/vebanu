---
name: performance-web-vitals
description: Optimize Core Web Vitals and front-end performance for faster loading, lower layout shift, and smoother interaction. Use when auditing or improving LCP, CLS, INP, bundle size, images, fonts, or render cost.
---

# Performance Web Vitals

Use this skill when a page needs measurable front-end performance work.

## Measure first

- Identify the slowest rendering path.
- Check LCP, CLS, and INP before changing code.
- Distinguish real bottlenecks from guesses.

## Common fixes

- Reduce image weight and reserve image dimensions
- Defer non-critical code and below-the-fold content
- Keep fonts lean and avoid layout shifts
- Remove unnecessary re-renders and large client bundles
- Prefer CSS and markup over heavy scripting where possible

## Keep

- Fast first paint
- Stable layout
- Responsive input handling
- Simple instrumentation that can be repeated
