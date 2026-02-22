import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "../../lib/utils.jsx"

const Switch = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center",
        "rounded-full border-2 border-transparent",
        "transition-colors shadow-sm",

        /* States */
        "data-[state=checked]:bg-[hsl(173,70%,53%)]",
        "data-[state=unchecked]:bg-[hsl(0,0%,15%)]",

        /* Focus */
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[hsl(173,70%,53%)]",

        /* Disabled */
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full",
          "bg-[hsl(0,0%,10%)]",
          "shadow-lg transition-transform",
          "data-[state=checked]:translate-x-4",
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  )
)

Switch.displayName =
  SwitchPrimitives.Root.displayName

export { Switch }