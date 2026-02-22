import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

/* ============================= */
/* Root */
/* ============================= */

const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
)
InputOTP.displayName = "InputOTP"

/* ============================= */
/* Group */
/* ============================= */

const InputOTPGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

/* ============================= */
/* Slot */
/* ============================= */

const InputOTPSlot = React.forwardRef(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const { char, hasFakeCaret, isActive } =
      inputOTPContext.slots[index]

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center text-sm shadow-sm transition-all",
          "bg-[hsl(0,0%,7%)]",
          "text-[hsl(0,0%,93%)]",
          "border-y border-r border-[hsl(0,0%,15%)]",
          "first:rounded-l-md first:border-l",
          "last:rounded-r-md",
          isActive &&
            "z-10 ring-1 ring-[hsl(173,70%,53%)] border-[hsl(173,70%,53%)]",
          className
        )}
        {...props}
      >
        {char}

        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-[hsl(0,0%,93%)] duration-1000" />
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

/* ============================= */
/* Separator */
/* ============================= */

const InputOTPSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn(
        "text-[hsl(0,0%,63%)]",
        className
      )}
      {...props}
    >
      <Minus className="h-4 w-4" />
    </div>
  )
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
}