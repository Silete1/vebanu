"use client"

import { useActionState } from "react"
import { CheckCircle2Icon } from "lucide-react"

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

const initialAssessmentFormState: AssessmentFormState = {
  status: "idle",
  message: "",
}

export function AssessmentForm() {
  const [state, formAction, isPending] = useActionState(
    submitAssessment,
    initialAssessmentFormState
  )

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
            Assessment request received.
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
      <div
        className="absolute top-auto -left-[9999px] size-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="assessment-website">Website</label>
        <input
          id="assessment-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="assessment-name">Name</FieldLabel>
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
          <FieldLabel htmlFor="assessment-phone">Phone or WhatsApp</FieldLabel>
          <Input
            id="assessment-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+964 7XX XXX XXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? "assessment-phone-error" : undefined
            }
            className="h-13 rounded-xl bg-[var(--color-frost)] px-4 focus-visible:bg-white"
          />
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
                Sending
              </span>
            ) : (
              "Start assessment"
            )}
          </InteractiveHoverButton>
        </Field>
      </FieldGroup>
    </form>
  )
}
