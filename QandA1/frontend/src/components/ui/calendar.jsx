import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils.jsx"
import { buttonVariants } from "../ui/button.jsx"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3 bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,15%)] rounded-lg text-[hsl(0,0%,93%)]",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",

        month: "space-y-4",

        caption: "flex justify-center pt-1 relative items-center",

        caption_label: "text-sm font-medium text-[hsl(0,0%,93%)]",

        nav: "space-x-1 flex items-center",

        nav_button: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),

        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse space-y-1",

        head_row: "flex",

        head_cell:
          "rounded-md w-8 font-normal text-[0.8rem] text-[hsl(0,0%,63%)]",

        row: "flex w-full mt-2",

        cell: cn(
          "relative p-0 text-center text-sm focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),

        day: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),

        day_range_start: "day-range-start",
        day_range_end: "day-range-end",

        day_selected:
          "bg-[hsl(217,91%,60%)] text-white hover:bg-[hsl(217,91%,55%)]",

        day_today:
          "bg-[hsl(173,70%,53%)] text-black",

        day_outside:
          "text-[hsl(0,0%,63%)] aria-selected:bg-[hsl(173,70%,40%)] aria-selected:text-white",

        day_disabled:
          "text-[hsl(0,0%,63%)] opacity-50",

        day_range_middle:
          "aria-selected:bg-[hsl(173,70%,40%)] aria-selected:text-white",

        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn("h-4 w-4 text-[hsl(0,0%,63%)]", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("h-4 w-4 text-[hsl(0,0%,63%)]", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }