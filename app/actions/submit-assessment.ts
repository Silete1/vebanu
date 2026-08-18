"use server"

import { headers } from "next/headers"
import { Resend } from "resend"

import { anuContact } from "@/lib/contact"
import { type Locale, isLocale } from "@/lib/i18n"

export type AssessmentFieldErrors = Partial<Record<"name" | "phone", string>>

export type AssessmentFormState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: AssessmentFieldErrors
}

// In-memory sliding-window rate limiter to protect Resend quota and mitigate spam.
type RateLimitRecord = {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(identifier: string): boolean {
  const now = Date.now()

  // Clean up expired records if map exceeds 500 entries
  if (rateLimitMap.size > 500) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key)
      }
    }
  }

  const existing = rateLimitMap.get(identifier)

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return false
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  existing.count += 1
  return false
}

async function getClientIp(): Promise<string> {
  try {
    const headerList = await headers()
    const forwardedFor = headerList.get("x-forwarded-for")
    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim()
    }
    const realIp = headerList.get("x-real-ip")
    if (realIp) return realIp.trim()
    const cfIp = headerList.get("cf-connecting-ip")
    if (cfIp) return cfIp.trim()
  } catch {
    // Fallback if headers() is unavailable
  }
  return "anonymous"
}

function sanitizeInput(value: unknown): string {
  if (typeof value !== "string") return ""
  // Strip control characters and CRLF to prevent email header/log injection
  return value.replace(/[\x00-\x1F\x7F\r\n\t]/g, " ").replace(/\s+/g, " ").trim()
}

function formValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return sanitizeInput(value)
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character
  )
}

function validateAssessment(formData: FormData) {
  const requestedLocale = formValue(formData, "locale")
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en"
  const messages = {
    en: {
      nameShort: "Enter your name.",
      nameLong: "Keep your name under 80 characters.",
      phoneShort: "Enter a valid phone number.",
      phoneLong: "Enter a phone number with 15 digits or fewer.",
    },
    ar: {
      nameShort: "أدخل اسمك.",
      nameLong: "يجب ألا يتجاوز الاسم 80 حرفاً.",
      phoneShort: "أدخل رقم هاتف صحيحاً.",
      phoneLong: "يجب ألا يتجاوز رقم الهاتف 15 رقماً.",
    },
  }[locale]

  const rawCountryCode = formValue(formData, "countryCode")
  const countryCode = rawCountryCode ? rawCountryCode : "+964"
  const rawPhone = formValue(formData, "phone")
  const combinedPhone = rawPhone.startsWith("+")
    ? rawPhone
    : `${countryCode} ${rawPhone}`.trim()

  const values = {
    name: formValue(formData, "name"),
    phone: combinedPhone,
  }
  const fieldErrors: AssessmentFieldErrors = {}

  if (values.name.length < 2) {
    fieldErrors.name = messages.nameShort
  } else if (values.name.length > 80) {
    fieldErrors.name = messages.nameLong
  }

  const phoneDigits = rawPhone.replace(/\D/g, "")
  if (phoneDigits.length < 7) {
    fieldErrors.phone = messages.phoneShort
  } else if (phoneDigits.length > 15) {
    fieldErrors.phone = messages.phoneLong
  }

  return { values, fieldErrors, locale }
}

export async function submitAssessment(
  _previousState: AssessmentFormState,
  formData: FormData
): Promise<AssessmentFormState> {
  const honeypot = formValue(formData, "website")
  const requestedLocale = formValue(formData, "locale")
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en"
  const messages = {
    en: {
      received: "Your details have been received.",
      check: "Check the highlighted fields and try again.",
      rateLimited: `Too many submissions. Please wait a few minutes or contact ANU directly on WhatsApp or call ${anuContact.phoneDisplay}.`,
      unavailable: `Online requests are temporarily unavailable. Message ANU on WhatsApp or call ${anuContact.phoneDisplay}.`,
      failed: `We could not send your request. Message ANU on WhatsApp or call ${anuContact.phoneDisplay}.`,
      success: "Details received. ANU will contact you shortly.",
    },
    ar: {
      received: "تم استلام بياناتك.",
      check: "راجع الحقول المحددة وحاول مرة أخرى.",
      rateLimited: `تم إرسال عدد كبير من الطلبات. يرجى الانتظار بضع دقائق أو التواصل مع ANU عبر واتساب أو الاتصال على ${anuContact.phoneDisplay}.`,
      unavailable: `الطلبات الإلكترونية غير متاحة مؤقتاً. راسل ANU عبر واتساب أو اتصل على ${anuContact.phoneDisplay}.`,
      failed: `تعذر إرسال طلبك. راسل ANU عبر واتساب أو اتصل على ${anuContact.phoneDisplay}.`,
      success: "تم استلام بياناتك. ستتواصل معك ANU قريباً.",
    },
  }[locale]

  if (honeypot) {
    return {
      status: "success",
      message: messages.received,
    }
  }

  const clientIp = await getClientIp()
  if (isRateLimited(clientIp)) {
    return {
      status: "error",
      message: messages.rateLimited,
    }
  }

  const { values, fieldErrors } = validateAssessment(formData)

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: messages.check,
      fieldErrors,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail =
    process.env.ASSESSMENT_FROM_EMAIL ?? "ANU Website <onboarding@resend.dev>"
  const toEmail = process.env.ASSESSMENT_TO_EMAIL ?? anuContact.email

  if (!apiKey) {
    console.error("Assessment delivery is not configured. Set RESEND_API_KEY.")
    return {
      status: "error",
      message: messages.unavailable,
    }
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Website assessment request from ${values.name}`,
      text: [
        "New website assessment request",
        "",
        `Name: ${values.name}`,
        `Phone: ${values.phone}`,
        `Website language: ${locale}`,
      ].join("\n"),
      html: `
        <h1>New website assessment request</h1>
        <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(values.phone)}</p>
        <p><strong>Website language:</strong> ${locale}</p>
      `,
    })

    if (error) {
      console.error("Assessment delivery failed.", error)
      return {
        status: "error",
        message: messages.failed,
      }
    }
  } catch (error) {
    console.error("Assessment delivery failed.", error)
    return {
      status: "error",
      message: messages.failed,
    }
  }

  return {
    status: "success",
    message: messages.success,
  }
}
