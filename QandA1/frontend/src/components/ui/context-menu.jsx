import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

/* ============================= */
/* Sub Trigger */
/* ============================= */

const ContextMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "text-[hsl(0,0%,93%)]",
        "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)]",
        "data-[state=open]:bg-[hsl(173,70%,53%)] data-[state=open]:text-[hsl(0,0%,0%)]",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4 text-[hsl(0,0%,63%)]" />
    </ContextMenuPrimitive.SubTrigger>
  )
)
ContextMenuSubTrigger.displayName =
  ContextMenuPrimitive.SubTrigger.displayName

/* ============================= */
/* Sub Content */
/* ============================= */

const ContextMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md p-1 shadow-lg",
        "border border-[hsl(0,0%,15%)]",
        "bg-[hsl(0,0%,7%)] text-[hsl(0,0%,93%)]",
        className
      )}
      {...props}
    />
  )
)
ContextMenuSubContent.displayName =
  ContextMenuPrimitive.SubContent.displayName

/* ============================= */
/* Main Content */
/* ============================= */

const ContextMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md p-1 shadow-md",
          "border border-[hsl(0,0%,15%)]",
          "bg-[hsl(0,0%,7%)] text-[hsl(0,0%,93%)]",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
)
ContextMenuContent.displayName =
  ContextMenuPrimitive.Content.displayName

/* ============================= */
/* Items */
/* ============================= */

const ContextMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "text-[hsl(0,0%,93%)]",
        "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
)
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

/* ============================= */
/* Checkbox Item */
/* ============================= */

const ContextMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "text-[hsl(0,0%,93%)]",
        "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-[hsl(173,70%,53%)]" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
)
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

/* ============================= */
/* Radio Item */
/* ============================= */

const ContextMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "text-[hsl(0,0%,93%)]",
        "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="h-4 w-4 fill-[hsl(173,70%,53%)]" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
)
ContextMenuRadioItem.displayName =
  ContextMenuPrimitive.RadioItem.displayName

/* ============================= */
/* Label */
/* ============================= */

const ContextMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        "text-[hsl(0,0%,93%)]",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
)
ContextMenuLabel.displayName =
  ContextMenuPrimitive.Label.displayName

/* ============================= */
/* Separator */
/* ============================= */

const ContextMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn(
        "-mx-1 my-1 h-px bg-[hsl(0,0%,15%)]",
        className
      )}
      {...props}
    />
  )
)
ContextMenuSeparator.displayName =
  ContextMenuPrimitive.Separator.displayName

/* ============================= */
/* Shortcut */
/* ============================= */

const ContextMenuShortcut = ({ className, ...props }) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-[hsl(0,0%,63%)]",
      className
    )}
    {...props}
  />
)
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}