import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils.jsx"

const labelVariants = cva(
  [
    /* Typography */
    "text-sm font-medium leading-none",

    /* Color */
    "text-[hsl(0,0%,93%)]",

    /* Disabled state */
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  ].join(" ")
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }