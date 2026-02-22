import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils.jsx"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(217,91%,60%)] text-white border-transparent hover:bg-[hsl(217,91%,55%)]",

        secondary:
          "bg-[hsl(0,0%,15%)] text-[hsl(0,0%,93%)] border-transparent hover:bg-[hsl(0,0%,20%)]",

        destructive:
          "bg-[hsl(0,84%,60%)] text-white border-transparent hover:bg-[hsl(0,84%,55%)]",

        outline:
          "bg-transparent border-[hsl(0,0%,15%)] text-[hsl(0,0%,93%)] hover:bg-[hsl(0,0%,15%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }