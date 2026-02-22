import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "../../lib/utils.jsx"
import { Dialog, DialogContent } from "../ui/dialog.jsx"

const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md",
      "bg-[hsl(0,0%,7%)] text-[hsl(0,0%,93%)]",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 border border-[hsl(0,0%,15%)] bg-[hsl(0,0%,7%)]">
        <Command
          className="
            [&_[cmdk-group-heading]]:px-2
            [&_[cmdk-group-heading]]:font-medium
            [&_[cmdk-group-heading]]:text-[hsl(0,0%,63%)]
            [&_[cmdk-group]]:px-2
            [&_[cmdk-item]]:px-2
            [&_[cmdk-item]]:py-3
          "
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div
    className="flex items-center border-b border-[hsl(0,0%,15%)] px-3"
    cmdk-input-wrapper=""
  >
    <Search className="mr-2 h-4 w-4 shrink-0 text-[hsl(0,0%,63%)]" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none",
        "placeholder:text-[hsl(0,0%,63%)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "max-h-[300px] overflow-y-auto overflow-x-hidden",
      className
    )}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-[hsl(0,0%,63%)]"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-[hsl(0,0%,93%)]",
      "[&_[cmdk-group-heading]]:px-2",
      "[&_[cmdk-group-heading]]:py-1.5",
      "[&_[cmdk-group-heading]]:text-xs",
      "[&_[cmdk-group-heading]]:font-medium",
      "[&_[cmdk-group-heading]]:text-[hsl(0,0%,63%)]",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-[hsl(0,0%,15%)]", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm",
      "px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-[hsl(173,70%,53%)]",
      "data-[selected=true]:text-[hsl(0,0%,0%)]",
      "data-[disabled=true]:pointer-events-none",
      "data-[disabled=true]:opacity-50",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({ className, ...props }) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-[hsl(0,0%,63%)]",
      className
    )}
    {...props}
  />
)
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}