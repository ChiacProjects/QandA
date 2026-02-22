import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

/* ============================= */
/* Root */
/* ============================= */

const RadioGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
)

RadioGroup.displayName =
  RadioGroupPrimitive.Root.displayName

/* ============================= */
/* Item */
/* ============================= */

const RadioGroupItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        /* Size & Shape */
        "aspect-square h-4 w-4 rounded-full",

        /* Base Surface */
        "bg-[hsl(0,0%,7%)]",

        /* Default Border */
        "border border-[hsl(0,0%,15%)]",

        /* Focus State */
        "focus:outline-none",
        "focus-visible:ring-1 focus-visible:ring-[hsl(173,70%,53%)]",

        /* Disabled */
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-[hsl(173,70%,53%)]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
)

RadioGroupItem.displayName =
  RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }