---
name: accessibility-radix-wcag
description: Implement accessible Radix and shadcn/ui interfaces that satisfy keyboard, focus, labeling, and WCAG basics. Use when building dialogs, menus, sheets, tabs, forms, or other interactive UI primitives.
---

# Accessibility Radix WCAG

Use this skill for accessible component work with Radix-based primitives.

## Verify

- Every interactive control has a visible label or an accessible name.
- Dialogs, sheets, and menus have titles and sensible focus handling.
- Keyboard flow works without a mouse.
- Focus states are visible and not clipped.
- Error, helper, and status text are associated correctly.
- Color is not the only state signal.

## Prefer

- Semantic HTML first
- Radix/shadcn defaults where they already solve the problem
- Short, descriptive labels
- Real buttons and links instead of clickable divs

## Avoid

- Custom focus traps
- Hidden titles without an accessible equivalent
- ARIA added without a clear need
- Gesture-only interactions
