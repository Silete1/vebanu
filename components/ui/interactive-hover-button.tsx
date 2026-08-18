import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "group relative inline-flex min-h-12 w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--color-abyssal-ink)] px-6 text-center text-sm text-white shadow-[0_14px_28px_-18px_rgba(9,11,17,0.7)] transition-[box-shadow,transform] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        className="absolute inset-0 translate-x-full bg-blue-700 transition-transform duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:hidden"
        aria-hidden="true"
      />
      <span className="relative flex items-center justify-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none">
        <span>{children}</span>
        <ArrowRightIcon className="size-4" aria-hidden="true" />
      </span>
    </button>
  )
}
