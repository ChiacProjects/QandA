import * as React from "react"
import { cn } from "../../lib/utils.jsx"

/* ============================= */
/* Table Wrapper */
/* ============================= */

const Table = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
)

Table.displayName = "Table"

/* ============================= */
/* Sections */
/* ============================= */

const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        "[&_tr]:border-b [&_tr]:border-[hsl(0,0%,15%)]",
        className
      )}
      {...props}
    />
  )
)

const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        "[&_tr:last-child]:border-0",
        className
      )}
      {...props}
    />
  )
)

const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-[hsl(0,0%,15%)]",
        "bg-[hsl(0,0%,10%)]",
        "font-medium",
        className
      )}
      {...props}
    />
  )
)

/* ============================= */
/* Rows */
/* ============================= */

const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-[hsl(0,0%,15%)]",
        "transition-colors",
        "hover:bg-[hsl(0,0%,10%)]",
        "data-[state=selected]:bg-[hsl(173,70%,53%)/0.15]",
        className
      )}
      {...props}
    />
  )
)

/* ============================= */
/* Cells */
/* ============================= */

const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium",
        "text-[hsl(0,0%,60%)]",
        "[&:has([role=checkbox])]:pr-0",
        "[&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
)

const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-2 align-middle",
        "[&:has([role=checkbox])]:pr-0",
        "[&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
)

/* ============================= */
/* Caption */
/* ============================= */

const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn(
        "mt-4 text-sm",
        "text-[hsl(0,0%,60%)]",
        className
      )}
      {...props}
    />
  )
)

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}