"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils.jsx"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-[hsl(0,0%,93%)] " +
          "hover:bg-[hsl(0,0%,15%)] " +
          "hover:text-[hsl(0,0%,93%)] " +
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(173,70%,53%)] " +
          "data-[state=on]:bg-[hsl(173,70%,53%)] " +
          "data-[state=on]:text-[hsl(0,0%,7%)]",

        outline:
          "border border-[hsl(0,0%,15%)] bg-transparent text-[hsl(0,0%,93%)] shadow-sm " +
          "hover:bg-[hsl(173,70%,53%)] hover:text-[hsl(0,0%,7%)] " +
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(173,70%,53%)] " +
          "data-[state=on]:bg-[hsl(173,70%,53%)] " +
          "data-[state=on]:text-[hsl(0,0%,7%)]",
      },

      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
)

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }