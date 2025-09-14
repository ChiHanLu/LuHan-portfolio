"use client";
import { cn } from "@/lib/cn";

export function Callout({ type = "info", title, children, className }: {
  type?: "info" | "success" | "warning" | "danger";
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const color: Record<string, string> = {
    info: "border-primary/30 bg-primary/10",
    success: "border-green-500/30 bg-green-500/10",
    warning: "border-yellow-500/30 bg-yellow-500/10",
    danger: "border-red-500/30 bg-red-500/10",
  };
  return (
    <div className={cn("rounded-lg border p-4 text-sm", color[type], className)}>
      {title && <div className="font-medium mb-1">{title}</div>}
      <div className="opacity-90">{children}</div>
    </div>
  );
}
