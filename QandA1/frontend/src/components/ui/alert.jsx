import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils.jsx"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(0,0%,7%)] border-[hsl(0,0%,15%)] text-[hsl(0,0%,93%)] [&>svg]:text-[hsl(0,0%,93%)]",
        destructive:
          "bg-[hsl(0,0%,7%)] border-[hsl(0,84%,60%)] text-[hsl(0,84%,60%)] [&>svg]:text-[hsl(0,84%,60%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(
        "mb-1 font-medium leading-none tracking-tight text-[hsl(0,0%,93%)]",
        className
      )}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-sm text-[hsl(0,0%,63%)] [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }