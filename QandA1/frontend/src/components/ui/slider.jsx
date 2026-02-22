import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils.jsx"

const Slider = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      {/* Track */}
      <SliderPrimitive.Track
        className={cn(
          "relative h-1.5 w-full grow overflow-hidden rounded-full",
          "bg-[hsl(0,0%,15%)]"
        )}
      >
        {/* Range */}
        <SliderPrimitive.Range
          className="absolute h-full bg-[hsl(173,70%,53%)]"
        />
      </SliderPrimitive.Track>

      {/* Thumb */}
      <SliderPrimitive.Thumb
        className={cn(
          "block h-4 w-4 rounded-full",
          "bg-[hsl(0,0%,10%)]",
          "border border-[hsl(173,70%,53%)]",
          "shadow",
          "transition-colors",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[hsl(173,70%,53%)]",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      />
    </SliderPrimitive.Root>
  )
)

Slider.displayName =
  SliderPrimitive.Root.displayName

export { Slider }