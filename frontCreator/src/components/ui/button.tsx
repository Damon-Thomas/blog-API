import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center margintopsmall hover:border-grey  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-darkprimary shadow hover:bg-lightsecondary ",
        destructive: "bg-warning text-white shadow-sm hover:bg-red ",
        outline:
          "border border-zinc-200 bg-light shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        secondary:
          "bg-primary text-light shadow-sm hover:bg-lightsecondary hover:text-darkprimary",
        ghost:
          "hover:bg-light hover:text-darkprimary dark:hover:bg-zinc-800 dark:hover:text-zinc-50 text-secondary",
        link: "font-bold text-darkprimary underline-offset-4 hover:underline dark:text-zinc-50 bg-transparent hover:border-none focus-visible:underline focus-visible:ring-opacity-1 border-none",
      },
      size: {
        default: "w-30 h-9 px-4 py-2 font-bold",
        sm: "w-20 h-8 rounded-md px-3 text-xs",
        lg: "w-40 h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
