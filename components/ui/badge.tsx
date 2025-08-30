import * as React from "react";
import { cn } from "../../lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "destructive" | "outline" }) {
  const styles = {
    default: "bg-primary/10 text-primary border-transparent",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    destructive: "bg-destructive/10 text-destructive border-transparent",
    outline: "border bg-transparent",
  }[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles,
        className
      )}
      {...props}
    />
  );
}
