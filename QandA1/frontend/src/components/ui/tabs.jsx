import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../lib/utils.jsx"

const Tabs = TabsPrimitive.Root

/* ============================= */
/* Tabs List */
/* ============================= */

const TabsList = React.forwardRef(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg p-1",
        "bg-[hsl(0,0%,15%)]",
        "text-[hsl(0,0%,60%)]",
        className
      )}
      {...props}
    />
  )
)

TabsList.displayName = TabsPrimitive.List.displayName

/* ============================= */
/* Tabs Trigger */
/* ============================= */

const TabsTrigger = React.forwardRef(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap",
        "rounded-md px-3 py-1 text-sm font-medium",
        "transition-all",

        /* Default */
        "text-[hsl(0,0%,60%)]",

        /* Focus */
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[hsl(173,70%,53%)]",

        /* Disabled */
        "disabled:pointer-events-none disabled:opacity-50",

        /* Active */
        "data-[state=active]:bg-[hsl(0,0%,10%)]",
        "data-[state=active]:text-[hsl(0,0%,93%)]",
        "data-[state=active]:shadow",

        className
      )}
      {...props}
    />
  )
)

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/* ============================= */
/* Tabs Content */
/* ============================= */

const TabsContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2",
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[hsl(173,70%,53%)]",
        className
      )}
      {...props}
    />
  )
)

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }