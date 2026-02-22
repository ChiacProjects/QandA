import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[hsl(0,0%,10%)] group-[.toaster]:text-[hsl(0,0%,93%)] group-[.toaster]:border group-[.toaster]:border-[hsl(0,0%,15%)] group-[.toaster]:shadow-lg",

          description:
            "group-[.toast]:text-[hsl(0,0%,60%)]",

          actionButton:
            "group-[.toast]:bg-[hsl(173,70%,53%)] group-[.toast]:text-black",

          cancelButton:
            "group-[.toast]:bg-[hsl(0,0%,15%)] group-[.toast]:text-[hsl(0,0%,93%)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }