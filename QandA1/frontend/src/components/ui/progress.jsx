import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils.jsx"

const Progress = React.forwardRef(
  ({ className, value = 0, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        /* Track */
        "relative h-2 w-full overflow-hidden rounded-full",
        "bg-[hsl(0,0%,15%)]",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          /* Fill */
          "h-full w-full flex-1 transition-all",
          "bg-[hsl(173,70%,53%)]"
        )}
        style={{
          transform: `translateX(-${100 - value}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
)

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }