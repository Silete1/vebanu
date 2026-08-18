"use client"

import { useState, useActionState } from "react"
import { CheckCircle2Icon, ChevronDownIcon } from "lucide-react"

import {
  submitAssessment,
  type AssessmentFormState,
} from "@/app/actions/submit-assessment"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { Spinner } from "@/components/ui/spinner"
import { countryCodes } from "@/lib/countries"
import { assessmentCopy } from "@/lib/content/site-copy"
import type { Locale } from "@/lib/i18n"

const initialAssessmentFormState: AssessmentFormState = {
  status: "idle",
  message: "",
}

export function AssessmentForm({ locale }: { locale: Locale }) {
  const copy = assessmentCopy[locale]
  const [selectedIso, setSelectedIso] = useState("IQ")
  const [phoneValue, setPhoneValue] = useState("")
  const [state, formAction, isPending] = useActionState(
    submitAssessment,
    initialAssessmentFormState
  )

  const selectedCountry =
    countryCodes.find((c) => c.iso === selectedIso) ?? countryCodes[0]

  if (state.status === "success") {
    return (
      <div
        className="flex min-h-48 flex-col items-start justify-center gap-4"
        role="status"
        aria-live="polite"
      >
        <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2Icon aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl leading-tight tracking-[-0.03em]">
            {copy.successTitle}
          </h3>
          <p className="max-w-md text-base leading-6 text-muted-foreground">
            {state.message}
          </p>
        </div>
      </div>
    )
  }

  const errors = state.fieldErrors ?? {}
  const hasFieldErrors = Object.keys(errors).length > 0

  return (
    <form action={formAction} noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="assessment-website">{copy.website}</label>
        <input
          id="assessment-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="countryCode" value={selectedCountry.code} />

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="assessment-name">{copy.name}</FieldLabel>
          <Input
            id="assessment-name"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "assessment-name-error" : undefined}
            className="h-13 rounded-xl bg-[var(--color-frost)] px-4 focus-visible:bg-white"
          />
          <FieldError id="assessment-name-error">{errors.name}</FieldError>
        </Field>

        <Field data-invalid={Boolean(errors.phone)}>
          <FieldLabel htmlFor="assessment-phone">{copy.phone}</FieldLabel>
          <div className="relative flex h-13 w-full rounded-xl border border-input bg-[var(--color-frost)] transition-colors focus-within:border-ring focus-within:bg-white focus-within:ring-3 focus-within:ring-ring/50">
            {/* Compact Country Code Dropdown Trigger */}
            <div className="relative flex h-full w-[90px] shrink-0 items-center border-e border-input/60 sm:w-[96px]">
              <div className="pointer-events-none flex w-full items-center justify-between ps-3 pe-5 text-sm font-medium text-foreground">
                <span className="truncate">
                  {selectedCountry.flag} {selectedCountry.code}
                </span>
              </div>
              <select
                id="assessment-country-code"
                value={selectedIso}
                onChange={(e) => setSelectedIso(e.target.value)}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
                aria-label={locale === "ar" ? "رمز الدولة" : "Country code"}
              >
                {countryCodes.map((c) => (
                  <option
                    key={c.iso}
                    value={c.iso}
                    className="bg-white text-foreground"
                  >
                    {c.flag} {c.code} — {locale === "ar" ? c.nameAr : c.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                className="pointer-events-none absolute end-1.5 size-3.5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>

            {/* Numeric Phone Number Input */}
            <input
              id="assessment-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel-national"
              required
              placeholder="7XX XXX XXXX"
              value={phoneValue}
              onChange={(e) => {
                const numericOnly = e.target.value.replace(/\D/g, "")
                setPhoneValue(numericOnly)
              }}
              onKeyDown={(e) => {
                if (
                  !/[\d]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                    "Enter",
                    "Home",
                    "End",
                  ].includes(e.key) &&
                  !e.ctrlKey &&
                  !e.metaKey
                ) {
                  e.preventDefault()
                }
              }}
              dir="ltr"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "assessment-phone-error" : undefined
              }
              className="h-full w-full min-w-0 flex-1 bg-transparent px-3 text-base text-foreground outline-none placeholder:text-muted-foreground md:text-sm"
            />
          </div>
          <FieldError id="assessment-phone-error">{errors.phone}</FieldError>
        </Field>

        {state.status === "error" && state.message && !hasFieldErrors ? (
          <p
            className="text-sm leading-5 break-words text-destructive sm:col-span-2"
            role="alert"
          >
            {state.message}
          </p>
        ) : null}

        <Field className="sm:col-span-2">
          <InteractiveHoverButton
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                <Spinner data-icon="inline-start" />
                {copy.sending}
              </span>
            ) : (
              copy.submit
            )}
          </InteractiveHoverButton>
        </Field>
      </FieldGroup>
    </form>
  )
}
