
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-transform shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95 transition-transform shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-transform shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 active:scale-95 transition-transform shadow-md",
        premium: "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 active:scale-95 transition-transform shadow-md",
        success: "bg-green-500 text-white hover:bg-green-600 active:scale-95 transition-transform shadow-sm",
        info: "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition-transform shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        mobile: "h-9 px-3 py-1.5 text-xs md:h-10 md:px-4 md:py-2 md:text-sm", // Enhanced mobile-specific size for better responsiveness
        full: "w-full h-10 px-4 py-2",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        ping: "animate-ping",
        flash: "animate-[flash_1s_ease-in-out_infinite]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
