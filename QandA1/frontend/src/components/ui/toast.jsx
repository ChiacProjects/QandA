import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../../lib/utils.jsx"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4",
      "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md p-4 pr-6 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default:
          "border border-[hsl(0,0%,15%)] " +
          "bg-[hsl(0,0%,10%)] " +
          "text-[hsl(0,0%,93%)]",

        destructive:
          "group destructive border border-[hsl(0,75%,55%)] " +
          "bg-[hsl(0,75%,55%)] " +
          "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
))
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
      
      /* Border */
      "border border-[hsl(0,0%,15%)]",

      /* Default */
      "bg-transparent text-[hsl(0,0%,93%)]",

      /* Hover */
      "hover:bg-[hsl(0,0%,15%)]",

      /* Focus */
      "focus:outline-none focus:ring-1 focus:ring-[hsl(173,70%,53%)]",

      /* Destructive variant overrides */
      "group-[.destructive]:border-white/40",
      "group-[.destructive]:hover:bg-white/10",
      "group-[.destructive]:focus:ring-white",

      "disabled:pointer-events-none disabled:opacity-50",

      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 transition-opacity",
      
      /* Default */
      "text-[hsl(0,0%,60%)] opacity-0",
      "hover:text-[hsl(0,0%,93%)]",

      /* Focus */
      "focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-[hsl(173,70%,53%)]",

      /* Show on hover */
      "group-hover:opacity-100",

      /* Destructive */
      "group-[.destructive]:text-white/70",
      "group-[.destructive]:hover:text-white",
      "group-[.destructive]:focus:ring-white",

      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}