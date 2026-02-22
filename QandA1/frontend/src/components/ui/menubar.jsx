import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "../../lib/utils.jsx"

/* ============================= */
/* Base Wrappers */
/* ============================= */

function MenubarMenu(props) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup(props) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal(props) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup(props) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub(props) {
  return <MenubarPrimitive.Sub {...props} />
}

/* ============================= */
/* Root */
/* ============================= */

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md p-1 shadow-sm",
      "bg-[hsl(0,0%,7%)]",
      "border border-[hsl(0,0%,15%)]",
      "text-[hsl(0,0%,93%)]",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

/* ============================= */
/* Trigger */
/* ============================= */

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none",
      "text-[hsl(0,0%,93%)]",
      "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)]",
      "data-[state=open]:bg-[hsl(173,70%,53%)] data-[state=open]:text-[hsl(0,0%,0%)]",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

/* ============================= */
/* Content */
/* ============================= */

const MenubarContent = React.forwardRef(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md p-1 shadow-md",
          "bg-[hsl(0,0%,7%)]",
          "border border-[hsl(0,0%,15%)]",
          "text-[hsl(0,0%,93%)]",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

/* ============================= */
/* Sub Trigger */
/* ============================= */

const MenubarSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <MenubarPrimitive.SubTrigger
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
    </MenubarPrimitive.SubTrigger>
  )
)
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

/* ============================= */
/* Sub Content */
/* ============================= */

const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md p-1 shadow-lg",
      "bg-[hsl(0,0%,7%)]",
      "border border-[hsl(0,0%,15%)]",
      "text-[hsl(0,0%,93%)]",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

/* ============================= */
/* Item */
/* ============================= */

const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
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
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

/* ============================= */
/* Checkbox Item */
/* ============================= */

const MenubarCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "text-[hsl(0,0%,93%)]",
        "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)]",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-[hsl(173,70%,53%)]" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
)
MenubarCheckboxItem.displayName =
  MenubarPrimitive.CheckboxItem.displayName

/* ============================= */
/* Radio Item */
/* ============================= */

const MenubarRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "text-[hsl(0,0%,93%)]",
        "focus:bg-[hsl(173,70%,53%)] focus:text-[hsl(0,0%,0%)]",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-4 w-4 fill-[hsl(173,70%,53%)]" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
)
MenubarRadioItem.displayName =
  MenubarPrimitive.RadioItem.displayName

/* ============================= */
/* Label */
/* ============================= */

const MenubarLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-[hsl(0,0%,93%)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

/* ============================= */
/* Separator */
/* ============================= */

const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-[hsl(0,0%,15%)]",
      className
    )}
    {...props}
  />
))
MenubarSeparator.displayName =
  MenubarPrimitive.Separator.displayName

/* ============================= */
/* Shortcut */
/* ============================= */

const MenubarShortcut = ({ className, ...props }) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-[hsl(0,0%,63%)]",
      className
    )}
    {...props}
  />
)

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}