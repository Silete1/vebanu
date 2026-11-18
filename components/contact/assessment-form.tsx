"use client"

import { useActionState, useEffect, useState } from "react"

import { type AssessmentFormState, submitAssessment } from "@/app/actions/submit-assessment"
import { Glyph } from "@/components/story/glyph"
import { countryCodes } from "@/lib/countries"
import { assessmentCopy } from "@/lib/content/site-copy"
import type { Locale } from "@/lib/i18n"

const idle: AssessmentFormState = { status: "idle", message: "" }

/**
 * The assessment request: a name and a phone number, nothing more. Square
 * fields with a Signal focus ring; the status speaks in glyphs. A hidden
 * field and the time since render keep scripts out.
 */
export function AssessmentForm({ locale }: { locale: Locale }) {
  const copy = assessmentCopy[locale]
  const [iso, setIso] = useState("IQ")
  const [renderedAt, setRenderedAt] = useState(0)
  const [state, action, pending] = useActionState(submitAssessment, idle)
  const country = countryCodes.find((c) => c.iso === iso) ?? countryCodes[0]
  const errors = state.fieldErrors ?? {}

  useEffect(() => setRenderedAt(Date.now()), [])

  if (state.status === "success") {
    return (
      <div className="anu-form__done" role="status">
        <Glyph state="done" large />
        <h3>{copy.successTitle}</h3>
        <p>{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} noValidate className="anu-form">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="assessment-website">{copy.website}</label>
        <input id="assessment-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="countryCode" value={country.code} />
      <input type="hidden" name="t" value={renderedAt} />

      <div className="anu-field">
        <label htmlFor="assessment-name">{copy.name}</label>
        <input
          id="assessment-name"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "assessment-name-error" : undefined}
        />
        {errors.name ? (
          <p id="assessment-name-error" className="anu-field__error">
            <Glyph state="alarm" />
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="anu-field">
        <label htmlFor="assessment-phone">{copy.phone}</label>
        <div className="anu-field__phone" dir="ltr">
          <select aria-label={copy.phone} value={iso} onChange={(event) => setIso(event.target.value)}>
            {countryCodes.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.iso} {c.code}
              </option>
            ))}
          </select>
          <input
            id="assessment-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required
            maxLength={20}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "assessment-phone-error" : undefined}
          />
        </div>
        {errors.phone ? (
          <p id="assessment-phone-error" className="anu-field__error">
            <Glyph state="alarm" />
            {errors.phone}
          </p>
        ) : null}
      </div>

      {state.status === "error" && !Object.keys(errors).length ? (
        <p className="anu-field__error" role="alert">
          <Glyph state="alarm" />
          {state.message}
        </p>
      ) : null}

      <button type="submit" className="anu-action anu-form__submit" disabled={pending}>
        {pending ? <Glyph state="progress" /> : null}
        {pending ? copy.sending : copy.submit}
        <span className="anu-action__arrow" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  )
}
