import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

/* ============================= */
/* Root */
/* ============================= */

const NavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
)
NavigationMenu.displayName =
  NavigationMenuPrimitive.Root.displayName

/* ============================= */
/* List */
/* ============================= */

const NavigationMenuList = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "group flex flex-1 list-none items-center justify-center space-x-1",
        className
      )}
      {...props}
    />
  )
)
NavigationMenuList.displayName =
  NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

/* ============================= */
/* Trigger Style */
/* ============================= */

const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
    "bg-[hsl(0,0%,7%)]",
    "text-[hsl(0,0%,93%)]",
    "hover:bg-[hsl(173,70%,53%)] hover:text-[hsl(0,0%,0%)]",
    "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)] focus:outline-none",
    "data-[state=open]:bg-[hsl(173,70%,53%)] data-[state=open]:text-[hsl(0,0%,0%)]",
    "disabled:pointer-events-none disabled:opacity-50"
  ].join(" ")
)

/* ============================= */
/* Trigger */
/* ============================= */

const NavigationMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 text-[hsl(0,0%,63%)] transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
)
NavigationMenuTrigger.displayName =
  NavigationMenuPrimitive.Trigger.displayName

/* ============================= */
/* Content */
/* ============================= */

const NavigationMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full md:absolute md:w-auto",
        className
      )}
      {...props}
    />
  )
)
NavigationMenuContent.displayName =
  NavigationMenuPrimitive.Content.displayName

/* ============================= */
/* Viewport */
/* ============================= */

const NavigationMenuViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(
          "relative mt-1.5 overflow-hidden rounded-md shadow",
          "bg-[hsl(0,0%,7%)]",
          "border border-[hsl(0,0%,15%)]",
          "text-[hsl(0,0%,93%)]",
          "md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
)
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

/* ============================= */
/* Indicator */
/* ============================= */

const NavigationMenuIndicator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md"
        style={{ background: "hsl(0,0%,15%)" }}
      />
    </NavigationMenuPrimitive.Indicator>
  )
)
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}