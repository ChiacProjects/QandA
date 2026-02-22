import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils.jsx"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(217,91%,60%)] text-white shadow-md " +
          "hover:bg-[hsl(217,91%,55%)] active:scale-[0.98]",

        destructive:
          "bg-[hsl(0,84%,60%)] text-white shadow-sm " +
          "hover:bg-[hsl(0,84%,55%)] active:scale-[0.98]",

        outline:
          "border border-[hsl(0,0%,15%)] bg-transparent text-[hsl(0,0%,93%)] " +
          "hover:bg-[hsl(0,0%,15%)]",

        secondary:
          "bg-[hsl(0,0%,15%)] text-[hsl(0,0%,93%)] shadow-sm " +
          "hover:bg-[hsl(0,0%,20%)]",

        ghost:
          "bg-transparent text-[hsl(0,0%,93%)] " +
          "hover:bg-[hsl(0,0%,15%)]",

        link:
          "bg-transparent text-[hsl(217,91%,60%)] underline-offset-4 " +
          "hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }