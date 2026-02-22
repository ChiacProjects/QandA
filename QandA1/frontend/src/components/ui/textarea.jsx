import * as React from "react"
import { cn } from "../../lib/utils.jsx"

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[60px] w-full rounded-md px-3 py-2 text-base md:text-sm",
          
          /* Surface */
          "bg-[hsl(0,0%,7%)]",
          
          /* Border */
          "border border-[hsl(0,0%,15%)]",

          /* Text */
          "text-[hsl(0,0%,93%)]",
          "placeholder:text-[hsl(0,0%,60%)]",

          /* Focus */
          "focus-visible:outline-none",
          "focus-visible:ring-1 focus-visible:ring-[hsl(173,70%,53%)]",

          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-50",

          "shadow-sm",

          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }