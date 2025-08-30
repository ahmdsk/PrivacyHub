import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

export function Breadcrumb({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm", className)}
      {...props}
    />
  );
}

export function BreadcrumbList({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="presentation"
      className={cn("select-none opacity-50", className)}
      {...props}
    >
      /
    </span>
  );
}

export function BreadcrumbLink({
  children,
  className,
  asChild,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }) {
  if (asChild) {
    return (
      <span className={cn("hover:text-foreground", className)} {...props}>
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href ?? "#"}
      className={cn("hover:text-foreground no-underline", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function BreadcrumbPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-current="page"
      className={cn("text-foreground", className)}
      {...props}
    />
  );
}
