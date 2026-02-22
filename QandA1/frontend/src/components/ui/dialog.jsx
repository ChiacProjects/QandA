import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

/* ============================= */
/* Overlay */
/* ============================= */

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50",
      "bg-black/80 backdrop-blur-sm",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/* ============================= */
/* Content */
/* ============================= */

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg",
          "translate-x-[-50%] translate-y-[-50%] gap-4 p-6",
          "border border-[hsl(0,0%,15%)]",
          "bg-[hsl(0,0%,7%)] text-[hsl(0,0%,93%)]",
          "shadow-2xl sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}

        {/* Close Button */}
        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4 rounded-sm",
            "opacity-70 transition-opacity hover:opacity-100",
            "focus:outline-none focus:ring-2",
            "focus:ring-[hsl(217,91%,60%)]",
            "disabled:pointer-events-none"
          )}
        >
          <X className="h-4 w-4 text-[hsl(0,0%,63%)]" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

/* ============================= */
/* Header */
/* ============================= */

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

/* ============================= */
/* Footer */
/* ============================= */

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

/* ============================= */
/* Title */
/* ============================= */

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      "text-[hsl(0,0%,93%)]",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/* ============================= */
/* Description */
/* ============================= */

const DialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(
        "text-sm text-[hsl(0,0%,63%)]",
        className
      )}
      {...props}
    />
  )
)
DialogDescription.displayName =
  DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}