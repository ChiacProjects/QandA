import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm",
      "border border-[hsl(0,0%,15%)]",
      "bg-[hsl(0,0%,7%)]",
      "shadow-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(217,91%,60%)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[hsl(217,91%,60%)]",
      "data-[state=checked]:border-[hsl(217,91%,60%)]",
      "data-[state=checked]:text-[hsl(0,0%,100%)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3.5 w-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }