"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "cn";

// Root
function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

// Trigger
function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

// Content
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Popup>) {
  return (
    <AlertDialogPrimitive.Portal>
      {/* Background Overlay */}
      <AlertDialogPrimitive.Backdrop
        className={cn(
          `
            fixed inset-0 z-50
            bg-black/35
            backdrop-blur-[3px]
            transition-all duration-200
            data-[open]:animate-in
            data-[closed]:animate-out
            data-[closed]:fade-out-0
            data-[open]:fade-in-0
          `,
        )}
      />

      {/* Dialog Popup */}
      <AlertDialogPrimitive.Popup
        className={cn(
          `
            fixed left-1/2 top-1/2 z-50
            w-[calc(100%-2rem)] max-w-md
            -translate-x-1/2 -translate-y-1/2
            rounded-xl
            border border-border
            bg-card p-6
            text-card-foreground
            shadow-2xl
            outline-none
            duration-200
            data-[open]:animate-in
            data-[closed]:animate-out
            data-[open]:fade-in-0
            data-[closed]:fade-out-0
            data-[open]:zoom-in-95
            data-[closed]:zoom-out-95
            sm:max-w-md
          `,
          className,
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

// Title
function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

// Description
function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
};
