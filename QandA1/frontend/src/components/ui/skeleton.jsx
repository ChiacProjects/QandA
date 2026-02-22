import { cn } from "../../lib/utils.jsx"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md",
        "bg-[hsl(0,0%,15%)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }