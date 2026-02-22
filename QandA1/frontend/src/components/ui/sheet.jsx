import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

/* ============================= */
/* Overlay */
/* ============================= */

const SheetOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50",
        "bg-black/80",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      )}
      {...props}
    />
  )
)

SheetOverlay.displayName =
  SheetPrimitive.Overlay.displayName

/* ============================= */
/* Variants */
/* ============================= */

const sheetVariants = cva(
  "fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

/* ============================= */
/* Content */
/* ============================= */

const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          sheetVariants({ side }),
          "bg-[hsl(0,0%,10%)]",
          "border-[hsl(0,0%,15%)]",
          className
        )}
        {...props}
      >
        <SheetPrimitive.Close
          className={cn(
            "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity",
            "hover:opacity-100",
            "focus:outline-none",
            "focus:ring-2 focus:ring-[hsl(173,70%,53%)]",
            "disabled:pointer-events-none"
          )}
        >
          <X className="h-4 w-4 text-[hsl(0,0%,93%)]" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>

        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
)

SheetContent.displayName =
  SheetPrimitive.Content.displayName

/* ============================= */
/* Layout Helpers */
/* ============================= */

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)

/* ============================= */
/* Typography */
/* ============================= */

const SheetTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold",
        "text-[hsl(0,0%,93%)]",
        className
      )}
      {...props}
    />
  )
)

const SheetDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Description
      ref={ref}
      className={cn(
        "text-sm",
        "text-[hsl(0,0%,60%)]",
        className
      )}
      {...props}
    />
  )
)

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}