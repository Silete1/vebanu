import type { Locale } from "@/lib/i18n"

const whatsappMessages: Record<Locale, string> = {
  en: "Hello ANU, I would like to discuss improving control in my business.",
  ar: "مرحباً أنو، أود مناقشة تحسين الرقابة في شركتي.",
}

export function getWhatsappHref(locale: Locale) {
  return `https://wa.me/9647867007030?text=${encodeURIComponent(whatsappMessages[locale])}`
}

export const anuContact = {
  email: "info@anu.ltd",
  phoneDisplay: "+964 786 700 7030",
  phoneInternational: "+9647867007030",
  location: "Baghdad, Iraq",
  phoneHref: "tel:+9647867007030",
  emailHref: "mailto:info@anu.ltd",
  instagramHref: "https://www.instagram.com/anu.erp/",
  facebookHref: "https://www.facebook.com/anu.erp/",
  linkedinHref: "https://www.linkedin.com/company/anu-software-solutions-iq",
  odooPartnerHref: "https://www.odoo.com/partners/anutech-17264381",
} as const
