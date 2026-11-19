"use client"

import * as React from "react"
import { cn } from "cn"

// @base-ui/react has no `table` primitive, so we render semantic HTML tables
// with Tailwind classes instead.

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="table"
      className={cn("w-full text-sm caption-medium", className)}
      {...props}
    />
  )
}

function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "text-left text-sm font-medium text-muted-foreground [&_tr]:border-b",
        className
      )}
      {...props}
    />
  )
}

function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("border-b", className)}
      {...props}
    />
  )
}

function TableCell({
  className,
  header = false,
  ...props
}: React.ComponentProps<"td"> & { header?: boolean }) {
  const Tag = header ? "th" : "td"
  return (
    <Tag
      data-slot="table-cell"
      className={cn(
        "p-4 align-middle",
        header && "font-medium",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
}
