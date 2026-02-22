import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cn } from "../../lib/utils.jsx"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

/* Overlay */
const AlertDialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
)
AlertDialogOverlay.displayName =
  AlertDialogPrimitive.Overlay.displayName

/* Content */
const AlertDialogContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-lg",
          "translate-x-[-50%] translate-y-[-50%]",
          "grid gap-4 p-6 sm:rounded-lg",
          "bg-[hsl(0,0%,7%)]",
          "border border-[hsl(0,0%,15%)]",
          "text-[hsl(0,0%,93%)]",
          "shadow-2xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
)
AlertDialogContent.displayName =
  AlertDialogPrimitive.Content.displayName

/* Header */
const AlertDialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

/* Footer */
const AlertDialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

/* Title */
const AlertDialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold text-[hsl(0,0%,93%)]",
        className
      )}
      {...props}
    />
  )
)
AlertDialogTitle.displayName =
  AlertDialogPrimitive.Title.displayName

/* Description */
const AlertDialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn(
        "text-sm text-[hsl(0,0%,63%)]",
        className
      )}
      {...props}
    />
  )
)
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

/* Primary Action Button */
const AlertDialogAction = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-md px-4 py-2 text-sm font-medium",
        "bg-[hsl(217,91%,60%)] text-white",
        "hover:bg-[hsl(217,91%,55%)]",
        "transition-all active:scale-[0.98]",
        className
      )}
      {...props}
    />
  )
)
AlertDialogAction.displayName =
  AlertDialogPrimitive.Action.displayName

/* Cancel Button */
const AlertDialogCancel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-md px-4 py-2 text-sm font-medium",
        "border border-[hsl(0,0%,15%)]",
        "bg-[hsl(0,0%,7%)] text-[hsl(0,0%,93%)]",
        "hover:bg-[hsl(0,0%,15%)]",
        "mt-2 sm:mt-0 transition-all",
        className
      )}
      {...props}
    />
  )
)
AlertDialogCancel.displayName =
  AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}