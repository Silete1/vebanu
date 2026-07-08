---
name: design-system-tokens
description: Define and maintain design tokens for color, spacing, type, radius, shadow, and motion in code. Use when creating or refactoring a shared design system, theme variables, or Tailwind token mapping.
---

# Design System Tokens

Use this skill when component styles should come from shared tokens instead of raw values.

## Build tokens around meaning

- Use semantic names such as `background`, `surface`, `primary`, `muted`, and `danger`.
- Keep component code free of raw palette values.
- Map tokens once in the theme layer, not repeatedly in components.

## Cover the core scale

- Color
- Spacing
- Radius
- Typography
- Shadows
- Motion

## Maintain

- One source of truth
- Predictable naming
- Contrast that supports accessibility
- Scale that stays consistent across pages and components
