const whatsappMessage =
  "Hello ANU, I would like to discuss improving control in my business."

export const anuContact = {
  email: "info@anu.ltd",
  phoneDisplay: "+964 786 700 7030",
  phoneInternational: "+9647867007030",
  location: "Baghdad, Iraq",
  whatsappMessage,
  whatsappHref: `https://wa.me/9647867007030?text=${encodeURIComponent(whatsappMessage)}`,
  phoneHref: "tel:+9647867007030",
  emailHref: "mailto:info@anu.ltd",
  instagramHref: "https://www.instagram.com/anu.erp/",
  facebookHref: "https://www.facebook.com/anu.erp/",
  linkedinHref: "https://www.linkedin.com/company/anu-software-solutions-iq",
  odooPartnerHref: "https://www.odoo.com/partners/anutech-17264381",
} as const
