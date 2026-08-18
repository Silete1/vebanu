export type NavigationItem = {
  title: string
  href: string
  available: boolean
}

export const navigationItems: NavigationItem[] = [
  { title: "Work", href: "/#work", available: true },
  { title: "Method", href: "/#method", available: true },
  { title: "Platform", href: "/#platform", available: true },
  { title: "Industries", href: "/industries", available: true },
  { title: "Insights", href: "/insights", available: true },
  { title: "Contact", href: "/contact", available: false },
]
