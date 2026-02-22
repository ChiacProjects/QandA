import * as React from "react"
import { cn } from "../../lib/utils.jsx"

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          /* Layout */
          "flex h-9 w-full rounded-md px-3 py-1 text-sm transition-all",

          /* Surface */
          "bg-[hsl(0,0%,7%)]",
          "text-[hsl(0,0%,93%)]",

          /* Border */
          "border border-[hsl(0,0%,15%)]",

          /* Placeholder */
          "placeholder:text-[hsl(0,0%,63%)]",

          /* File input */
          "file:border-0 file:bg-transparent file:text-[hsl(0,0%,93%)] file:text-sm file:font-medium",

          /* Focus */
          "focus-visible:outline-none",
          "focus-visible:ring-1 focus-visible:ring-[hsl(173,70%,53%)]",
          "focus-visible:border-[hsl(173,70%,53%)]",

          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-50",

          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }