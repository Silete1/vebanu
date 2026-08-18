"use server"

import { Resend } from "resend"

import { anuContact } from "@/lib/contact"

export type AssessmentFieldErrors = Partial<Record<"name" | "phone", string>>

export type AssessmentFormState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: AssessmentFieldErrors
}

function formValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
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
  const values = {
    name: formValue(formData, "name"),
    phone: formValue(formData, "phone"),
  }
  const fieldErrors: AssessmentFieldErrors = {}

  if (values.name.length < 2) {
    fieldErrors.name = "Enter your name."
  } else if (values.name.length > 80) {
    fieldErrors.name = "Keep your name under 80 characters."
  }

  const phoneDigits = values.phone.replace(/\D/g, "")
  if (phoneDigits.length < 7) {
    fieldErrors.phone = "Enter a valid phone or WhatsApp number."
  } else if (phoneDigits.length > 15) {
    fieldErrors.phone = "Enter a phone number with 15 digits or fewer."
  }

  return { values, fieldErrors }
}

export async function submitAssessment(
  _previousState: AssessmentFormState,
  formData: FormData
): Promise<AssessmentFormState> {
  const honeypot = formValue(formData, "website")

  if (honeypot) {
    return {
      status: "success",
      message: "Your details have been received.",
    }
  }

  const { values, fieldErrors } = validateAssessment(formData)

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
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
      message: `Online requests are temporarily unavailable. Message ANU on WhatsApp or call ${anuContact.phoneDisplay}.`,
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
        `Phone / WhatsApp: ${values.phone}`,
      ].join("\n"),
      html: `
        <h1>New website assessment request</h1>
        <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(values.phone)}</p>
      `,
    })

    if (error) {
      console.error("Assessment delivery failed.", error)
      return {
        status: "error",
        message: `We could not send your request. Message ANU on WhatsApp or call ${anuContact.phoneDisplay}.`,
      }
    }
  } catch (error) {
    console.error("Assessment delivery failed.", error)
    return {
      status: "error",
      message: `We could not send your request. Message ANU on WhatsApp or call ${anuContact.phoneDisplay}.`,
    }
  }

  return {
    status: "success",
    message: "Details received. ANU will contact you shortly.",
  }
}
