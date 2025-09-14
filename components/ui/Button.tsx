"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed button-ripple",
  {
    variants: {
      intent: {
        primary:
          "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.05] hover:-translate-y-0.5 focus-visible:ring-primary-400",
        outline:
          "border-2 border-primary-500/60 text-primary-300 hover:bg-primary-500/15 hover:border-primary-400 hover:text-white hover:scale-[1.02] focus-visible:ring-primary-400 backdrop-blur-sm",
        ghost: "text-gray-300 hover:bg-gradient-to-r hover:from-secondary-800/60 hover:to-secondary-700/60 hover:text-white hover:scale-[1.02]",
        secondary: "bg-gradient-to-r from-secondary-700 to-secondary-600 text-gray-200 hover:from-secondary-600 hover:to-secondary-500 shadow-lg hover:scale-[1.02]",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base font-semibold",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, intent, size, onMouseMove, ...props }: ButtonProps & { onMouseMove?: React.MouseEventHandler<HTMLButtonElement> }) {
  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
    onMouseMove?.(e);
  };
  return (
    <button onMouseMove={handleMouseMove} className={cn(buttonVariants({ intent, size }), className)} {...props} />
  );
}
