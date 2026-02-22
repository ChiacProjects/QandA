import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "../../lib/utils.jsx"

/* ============================= */
/* Panel Group */
/* ============================= */

const ResizablePanelGroup = ({
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

/* ============================= */
/* Panel */
/* ============================= */

const ResizablePanel = ResizablePrimitive.Panel

/* ============================= */
/* Handle */
/* ============================= */

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      /* Base Line */
      "relative flex w-px items-center justify-center",
      "bg-[hsl(0,0%,15%)]",

      /* Hit area */
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",

      /* Focus */
      "focus-visible:outline-none",
      "focus-visible:ring-1 focus-visible:ring-[hsl(173,70%,53%)]",

      /* Vertical mode */
      "data-[panel-group-direction=vertical]:h-px",
      "data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0",
      "data-[panel-group-direction=vertical]:after:h-1",
      "data-[panel-group-direction=vertical]:after:w-full",
      "data-[panel-group-direction=vertical]:after:-translate-y-1/2",
      "data-[panel-group-direction=vertical]:after:translate-x-0",
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",

      className
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "z-10 flex h-4 w-3 items-center justify-center rounded-sm",
          "border border-[hsl(0,0%,15%)]",
          "bg-[hsl(0,0%,7%)]"
        )}
      >
        <GripVertical className="h-2.5 w-2.5 text-[hsl(0,0%,93%)]" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }